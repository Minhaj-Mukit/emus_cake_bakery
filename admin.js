const GEMINI_API_KEY = "AIzaSyBcscyzkhiD6suFe9VtQSl7m-xs61QgjOk";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAvPkDSeCRPhjb5IdChFwehn7Xk-5OAQxMIHyLEJuh1AvjN0yWs_8AE6JlCU8RAmFH/exec";

let base64Image = null;
let mimeType = null;

// --- Sidebar Navigation ---
function showSection(sec) {
    document.querySelectorAll('.admin-section').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active'));
    document.getElementById(`sec-${sec}`).style.display = 'block';
    document.getElementById(`nav-${sec}`).classList.add('active');
}

// --- Image Preview & Base64 ---
document.getElementById('ai-cake-image').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if(!file) return;

    mimeType = file.type;
    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('preview-img').src = event.target.result;
        document.getElementById('preview-img').style.display = 'block';
        // Remove the data:image/jpeg;base64, prefix for Gemini
        base64Image = event.target.result.split(',')[1]; 
        
        // Auto-fill a guess for the image path name
        document.getElementById('cake-img-name').value = "images/" + file.name;
    };
    reader.readAsDataURL(file);
});

// --- Reviews & Gallery File Select ---
document.getElementById('review-image').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    if(files.length > 0) {
        document.getElementById('review-count').textContent = `✅ ${files.length} files selected.`;
        document.getElementById('review-img-name').value = files.map(f => "images/" + f.name).join(", ");
    }
});

document.getElementById('gallery-image').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if(file) document.getElementById('gallery-img-name').value = "images/" + file.name;
});

// --- Gemini AI Scan ---
document.getElementById('ai-scan-btn').addEventListener('click', async function() {
    if(!base64Image) {
        alert("Please select an image first!");
        return;
    }

    const btn = document.getElementById('ai-scan-btn');
    const status = document.getElementById('ai-status');
    btn.textContent = "Scanning... ✨";
    btn.disabled = true;
    status.textContent = "Asking Google Gemini... this takes about 5 seconds.";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        {text: "Look at this cake image. You are an expert baker. Generate a strictly formatted JSON response WITHOUT markdown codeblocks. The JSON must contain these exact keys: 'name' (English name), 'name_bn' (Bangla name), 'desc' (Short appetizing English description), 'desc_bn' (Short appetizing Bangla description), 'emoji' (One suitable emoji symbol), 'cat' (choose either 'birthday', 'wedding', or 'custom')."},
                        {inline_data: { mime_type: mimeType, data: base64Image }}
                    ]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);
        
        let textResult = data.candidates[0].content.parts[0].text;
        
        // Clean up markdown block if Gemini accidentally wraps it
        textResult = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const aiData = JSON.parse(textResult);

        // Populate fields
        document.getElementById('cake-name').value = aiData.name || '';
        document.getElementById('cake-name-bn').value = aiData.name_bn || '';
        document.getElementById('cake-desc').value = aiData.desc || '';
        document.getElementById('cake-desc-bn').value = aiData.desc_bn || '';
        document.getElementById('cake-emoji').value = aiData.emoji || '';
        
        if(aiData.cat) {
            const catSelect = document.getElementById('cake-cat');
            for(let i=0; i<catSelect.options.length; i++){
                if(catSelect.options[i].value === aiData.cat.toLowerCase()) {
                    catSelect.selectedIndex = i;
                    break;
                }
            }
        }
        
        status.textContent = "Success! Please set the Price and save.";
        status.style.color = "#28a745";
    } catch (err) {
        console.error(err);
        status.textContent = "Error: " + err.message;
        status.style.color = "#dc3545";
    } finally {
        btn.textContent = "✨ Scan with AI";
        btn.disabled = false;
    }
});

// --- Save to Google Sheets (POST) ---
async function saveToSheet(sheetName, rowArray, btnId, statusId) {
    const btn = document.getElementById(btnId);
    const status = document.getElementById(statusId);
    const originalText = btn.textContent;
    
    btn.textContent = "Saving... ⏳";
    btn.disabled = true;
    status.style.display = 'none';

    try {
        const payload = {
            sheetName: sheetName,
            data: rowArray // Array representing one row of columns
        };

        const res = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload) // Needs to be text
        });
        
        const resData = await res.json();
        if(resData.status === "success") {
            status.style.display = 'block';
            status.style.color = "#28a745";
            status.textContent = "Successfully saved to Database!";
            // Reset form if Cake
            if(sheetName === 'Cakes') {
                document.getElementById('cake-form').reset();
                document.getElementById('preview-img').style.display='none';
                base64Image = null;
            } else if (sheetName === 'Reviews') {
                document.getElementById('review-form').reset();
            } else if (sheetName === 'Gallery') {
                document.getElementById('gallery-form').reset();
            }
        } else {
            throw new Error("Failed to save.");
        }
    } catch(err) {
        alert("Error saving: " + err.message);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
        setTimeout(() => { status.style.display = 'none'; }, 5000);
    }
}

// Submit Events
document.getElementById('cake-form').addEventListener('submit', function(e) {
    e.preventDefault();
    /* Google Sheet column order MUST be exactly:
       A: id (we'll generate timestamp)
       B: name
       C: name_bn
       D: desc
       E: desc_bn
       F: price
       G: emoji
       H: img
       I: cat
       J: badge
       K: bg
    */
    const rowData = [
        Date.now(), // id
        document.getElementById('cake-name').value,
        document.getElementById('cake-name-bn').value,
        document.getElementById('cake-desc').value,
        document.getElementById('cake-desc-bn').value,
        document.getElementById('cake-price').value,
        document.getElementById('cake-emoji').value,
        document.getElementById('cake-img-name').value,
        document.getElementById('cake-cat').value,
        document.getElementById('cake-badge').value, // badge from dropdown
        "#FFF0F0" // bg
    ];
    saveToSheet('Cakes', rowData, 'cake-save-btn', 'save-status');
});

document.getElementById('review-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const paths = document.getElementById('review-img-name').value.split(',').map(s => s.trim()).filter(s => s !== "");
    const btn = document.getElementById('review-save-btn');
    const status = document.getElementById('save-status-review');
    
    if (paths.length === 0) {
        alert("Please select at least one photo first!");
        return;
    }

    const originalText = btn.textContent;
    btn.disabled = true;
    
    try {
        for (let i = 0; i < paths.length; i++) {
            btn.textContent = `Saving ${i+1}/${paths.length}... ⏳`;
            const rowData = [paths[i], Date.now()];
            await saveToSheet('Reviews', rowData, 'review-save-btn', 'save-status-review');
        }
        document.getElementById('review-count').textContent = "";
        document.getElementById('review-form').reset();
    } catch (err) {
        console.error(err);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
});

document.getElementById('gallery-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('gallery-save-btn');
    const pathInput = document.getElementById('gallery-img-name');
    
    if (!pathInput.value) {
        alert("Please select a gallery photo first!");
        return;
    }

    const originalText = btn.textContent;
    btn.disabled = true;

    try {
        // Gallery Sheet column order: A: img, B: timestamp
        const rowData = [pathInput.value, Date.now()];
        await saveToSheet('Gallery', rowData, 'gallery-save-btn', 'save-status-gallery');
        document.getElementById('gallery-form').reset();
    } catch (err) {
        console.error(err);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
});
