/* ============================================================
   script.js — Emu's Cake Bakery
   ============================================================ */

/* ─────────── CAKE DATA ─────────────────────────────────────────────────────
   To add YOUR photo to a cake:
   1. Copy the photo into the  images/  folder
   2. Set  img: "images/your-photo-name.jpg"  for that cake entry
   Leave  img: ""  for any cake that doesn't have a photo yet (emoji shows instead)
   ─────────────────────────────────────────────────────────────────────────── */
let CAKES = [
  { id: 101, name: "Chocolate Truffle Cake", name_bn: "চকলেট ট্রাফল কেক", price: 1200, cat: "birthday", badge: "popular", emoji: "🍫", img: "images/chocolate.png", bg: "#FEE9D0", desc: "Rich and creamy chocolate truffle with premium ganache.", desc_bn: "প্রিমিয়াম গ্যানাশ দিয়ে তৈরি অতুলনীয় চকোলেট ট্রাফল কেক।" },
  { id: 102, name: "Red Velvet Cake", name_bn: "রেড ভেলভেট কেক", price: 1400, cat: "birthday", badge: "new", emoji: "❤️", img: "images/redvelvet.png", bg: "#FFF0F0", desc: "Classic red velvet with cream cheese frosting.", desc_bn: "ক্রিম চিজ ফ্রস্টিং দিয়ে তৈরি ক্লাসিক রেড ভেলভেট কেক।" },
  { id: 103, name: "Elegant Wedding Cake", name_bn: "এলিগ্যান্ট ওয়েডিং কেক", price: 2500, cat: "wedding", badge: "custom", emoji: "💍", img: "images/wedding.png", bg: "#FDF6EE", desc: "Multi-tiered elegant design for your special day.", desc_bn: "আপনার বিশেষ দিনের জন্য আকর্ষণীয় মাল্টি-টিয়ার ওয়েডিং কেক।" }
];

/* ─────────── LANGUAGE / TRANSLATIONS ─────────── */
let currentLang = localStorage.getItem('emusLang') || 'en';

const TRANSLATIONS = {
  en: {
    /* navbar */ 'nav-home':'Home','nav-menu':'Menu','nav-gallery':'Gallery','nav-review':'Reviews','nav-contact':'Contact','nav-order':'Order Now',
    /* mobile menu */ 'mob-home':'🏠 Home','mob-menu':'🎂 Menu','mob-gallery':'🖼 Gallery','mob-review':'⭐ Reviews','mob-order':'📋 Order Now','mob-contact':'📞 Contact','mob-cart':'🛒 View Cart',
    /* fb banner */ 'fb-title':'Follow us on Facebook for daily updates & latest prices!','fb-sub':'New cake designs, seasonal specials & price updates — place your order directly on our page 🎂','fb-btn':'Visit Facebook Page →',
    /* hero */ 'hero-eyebrow':'🍰 Homemade · Maijdee, Noakhali','hero-h1':'Homemade Cakes<br>Baked with <em>Pure Love</em><br>in Noakhali','hero-sub':'Every cake is lovingly baked at home using the finest ingredients — no factory, no shortcuts. Just real homemade goodness delivered fresh to your door across Noakhali.','btn-explore':'🎂 Explore Menu','btn-wa-hero':'💬 WhatsApp Order','btn-fb-hero':'📘 Facebook Page','stat-cust':'Happy Customers','stat-rating':'Avg. Rating','stat-designs':'Cake Designs','stat-years':'Of Baking','badge-title':'Fresh Homemade','badge-sub':'Made to order daily',
    /* features */ 'feat-eyebrow':'Why Choose Us','feat-title':"Noakhali's Most Loved Bakery",'feat-sub':'Quality you can taste, service you can trust','feat1-t':'Fresh Ingredients','feat1-d':'We source only the finest local and imported ingredients, baked fresh every day to order.','feat2-t':'Custom Designs','feat2-d':'Your vision, our craft. We bring any cake design to life for any occasion — big or small.','feat3-t':'Noakhali Delivery','feat3-d':'Fast, safe home delivery across Maijdee, Chowmuhani, Begumganj, Sonaimuri and nearby areas.','feat4-t':'Made with Love','feat4-d':'Every homemade cake is crafted in our home kitchen with genuine passion and meticulous care.',
    /* popular */ 'pop-eyebrow':'Best Sellers','pop-title':'Our Most Popular Cakes','pop-sub':'Add to cart and order directly via WhatsApp','pop-btn':'View Full Menu →',
    /* testimonials */ 'testi-eyebrow':'Customer Love','testi-title':'What Noakhali Says About Us','t1-text':"Birthday cake for my son was absolutely gorgeous! Everyone kept asking where we got it. Best bakery in Maijdee without a doubt!",'t1-name':'Fatima Begum','t1-loc':'Maijdee Court, Noakhali','t2-text':"Ordered a custom wedding cake and it exceeded all our expectations. Taste was divine and delivery was right on time. Highly recommended!",'t2-name':'Rakib Hossain','t2-loc':'Chowmuhani, Noakhali','t3-text':"Best chocolate cake in all of Noakhali! Delivery was super fast and incredibly fresh. Will always order from Emu's Cake Bakery!",'t3-name':'Nadia Sultana','t3-loc':'Begumganj, Noakhali',
    /* screenshot reviews */ 'ss-eyebrow':'Real Feedback', 'ss-title':'Genuine Customer Reviews', 'ss-sub':'Screenshots from our happy customers on Facebook & WhatsApp',
    /* cta */ 'cta-title':'Ready to Order Your Dream Cake?','cta-sub':'Place your order today and get a fresh cake delivered anywhere in Noakhali!','cta-btn1':'📋 Place an Order','cta-btn2':'💬 WhatsApp Us','cta-btn3':'📘 Message on Facebook',
    /* menu */ 'menu-eyebrow':'Our Offerings','menu-title':'Fresh Baked Cakes Menu','menu-sub':'Message us on Facebook or WhatsApp for the updated price · Prices in BDT (per kg)','filter-all':'All Cakes','filter-bday':'🎂 Birthday','filter-wed':'💍 Wedding','filter-cust':'🎨 Custom',
    /* order */ 'order-eyebrow':'Place an Order','order-title':'Order Your Cake Today','order-sub':'Message us on Facebook or WhatsApp for the updated price and order confirmation! 💬','form-title':'📋 Order Details','form-req':'Fields marked with * are required','lbl-name':'Full Name *','lbl-phone':'WhatsApp Number *','lbl-addr':'Delivery Address *','lbl-type':'Cake Type *','lbl-size':'Cake Size','lbl-date':'Delivery Date *','lbl-time':'Preferred Time','lbl-notes':'Cake Message / Design Notes','btn-wa-ord':'💬 WhatsApp Order','btn-fb-ord':'📘 Facebook Order','cart-sum-title':'🛒 Cart Summary','success-msg':'🎉 Thank you! Redirecting to confirm your order...',
    /* gallery */ 'gal-eyebrow':'Our Creations','gal-title':'A Taste of Our Work','gal-sub':'Handcrafted with love right here in Maijdee, Noakhali 🍰','gal-social':'Follow us on social media for daily sweet creations from Maijdee, Noakhali!',
    /* contact */ 'con-eyebrow':'Get in Touch','con-title':"We're Based in Maijdee, Noakhali",'con-sub':'Open 7 days a week','del-title':'🚚 Delivery Areas in Noakhali','wa-box-title':'Order Directly on WhatsApp','wa-box-sub':'The fastest way to place your order!<br>We respond within minutes from Maijdee.','wa-box-btn':'💬 Chat on WhatsApp','fb-box-title':'Contact on Facebook','fb-box-sub':'Contact on Facebook for fast order! We reply instantly.','fb-box-btn':'📘 Message on Facebook',
    /* cart */ 'cart-title':'🛒 Your Cart','cart-subtotal':'Subtotal','cart-note':'💡 Message us on Facebook or WhatsApp for the updated price. Prices shown are per kg.','cart-wa':'💬 WhatsApp','cart-fb':'📘 Facebook','cart-clear':'🗑 Clear Cart',
    /* footer */ 'foot-about':'Homemade cakes baked with love in Maijdee, Noakhali, Bangladesh. Making every celebration sweeter since 2019.','foot-links':'Quick Links','foot-types':'Cake Types','foot-areas':'Delivery Areas','foot-copy':'© 2026 Emu\'s Cake Bakery · Maijdee, Noakhali, Bangladesh','foot-love':'Made with Love and a lot of sugar',
    /* misc */ 'loader-sub':'Maijdee, Noakhali · Est. 2019','wa-tip':'Order on WhatsApp','fb-tip':'Message on Facebook',
  },
  bn: {
    /* navbar */ 'nav-home':'হোম','nav-menu':'মেনু','nav-gallery':'গ্যালারি','nav-review':'রিভিউ','nav-contact':'যোগাযোগ','nav-order':'অর্ডার করুন',
    /* mobile menu */ 'mob-home':'🏠 হোম','mob-menu':'🎂 মেনু','mob-gallery':'🖼 গ্যালারি','mob-review':'⭐ রিভিউ','mob-order':'📋 অর্ডার করুন','mob-contact':'📞 যোগাযোগ','mob-cart':'🛒 কার্ট দেখুন',
    /* fb banner */ 'fb-title':'আপডেট ও সর্বশেষ মূল্যের জন্য আমাদের ফেসবুকে ফলো করুন!','fb-sub':'নতুন কেক ডিজাইন, বিশেষ অফার ও মূল্য আপডেট — সরাসরি আমাদের পেজে অর্ডার করুন 🎂','fb-btn':'ফেসবুক পেজ দেখুন →',
    /* hero */ 'hero-eyebrow':'🍰 হোমমেইড · মাইজদী, নোয়াখালী','hero-h1':'হোমমেইড কেক তৈরি হয়<br><em>খাঁটি ভালোবাসায়</em><br>নোয়াখালীতে','hero-sub':'প্রতিটি কেক সেরা উপাদান দিয়ে অত্যন্ত যত্নে বাড়িতেই তৈরি করা হয় — কোনো কারখানা বা শর্টকাট নেই। খাঁটি হোমমেইড স্বাদ একদম ফ্রেশ নোয়াখালী জুড়ে আপনার দরজায় পৌঁছে দেওয়া হয়।','btn-explore':'🎂 মেনু দেখুন','btn-wa-hero':'💬 হোয়াটসঅ্যাপ অর্ডার','btn-fb-hero':'📘 ফেসবুক পেজ','stat-cust':'সন্তুষ্ট গ্রাহক','stat-rating':'গড় রেটিং','stat-designs':'কেক ডিজাইন','stat-years':'বেকিং অভিজ্ঞতা','badge-title':'ফ্রেশ হোমমেইড','badge-sub':'প্রতিদিন অর্ডারে তৈরি',
    /* features */ 'feat-eyebrow':'কেন আমাদের বেছে নেবেন','feat-title':'নোয়াখালীর সবচেয়ে প্রিয় বেকারি','feat-sub':'স্বাদে মান, সেবায় বিশ্বাস','feat1-t':'তাজা উপাদান','feat1-d':'আমরা শুধুমাত্র সেরা স্থানীয় ও আমদানি করা উপাদান ব্যবহার করি, প্রতিদিন অর্ডারে তাজা বেক করা হয়।','feat2-t':'কাস্টম ডিজাইন','feat2-d':'আপনার স্বপ্ন, আমাদের কারিগরি। যেকোনো অনুষ্ঠানে যেকোনো কেক ডিজাইন বাস্তবে রূপ দিই।','feat3-t':'নোয়াখালী ডেলিভারি','feat3-d':'মাইজদী, চৌমুহনী, বেগমগঞ্জ, সোনাইমুড়ী ও আশেপাশের এলাকায় দ্রুত ও নিরাপদ হোম ডেলিভারি।','feat4-t':'ভালোবাসায় তৈরি','feat4-d':'আমাদের বাড়ির রান্নাঘরে প্রতিটি হোমমেইড কেক খাঁটি আবেগ ও সূক্ষ্ম যত্ন দিয়ে তৈরি করা হয়।',
    /* popular */ 'pop-eyebrow':'সেরা বিক্রিত','pop-title':'আমাদের সবচেয়ে জনপ্রিয় কেক','pop-sub':'কার্টে যোগ করুন এবং সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন','pop-btn':'সম্পূর্ণ মেনু দেখুন →',
    /* testimonials */ 'testi-eyebrow':'গ্রাহকদের ভালোবাসা','testi-title':'নোয়াখালীবাসী আমাদের সম্পর্কে কী বলেন','t1-text':'আমার ছেলের জন্মদিনের কেক ছিল অসাধারণ সুন্দর! সবাই জানতে চাইছিল কোথা থেকে নিয়েছি। মাইজদীর সেরা বেকারি নিঃসন্দেহে!','t1-name':'ফাতিমা বেগম','t1-loc':'মাইজদী কোর্ট, নোয়াখালী','t2-text':'কাস্টম বিয়ের কেক অর্ডার করেছিলাম, আমাদের প্রত্যাশার চেয়েও বেশি হয়েছে। স্বাদ অসাধারণ, সময়মতো ডেলিভারি। সবাইকে সুপারিশ করি!','t2-name':'রাকিব হোসেন','t2-loc':'চৌমুহনী, নোয়াখালী','t3-text':"সারা নোয়াখালীতে সেরা চকলেট কেক! ডেলিভারি অনেক দ্রুত ও তাজা। সবসময় ইমুর কেক বেকারি থেকেই অর্ডার করব!",'t3-name':'নাদিয়া সুলতানা','t3-loc':'বেগমগঞ্জ, নোয়াখালী',
    /* screenshot reviews */ 'ss-eyebrow':'প্রকৃত প্রতিক্রিয়া', 'ss-title':'গ্রাহকদের জেনুইন রিভিউ', 'ss-sub':'ফেসবুক এবং হোয়াটসঅ্যাপ থেকে আমাদের খুশি গ্রাহকদের স্ক্রিনশট',
    /* cta */ 'cta-title':'আপনার স্বপ্নের কেক অর্ডার করতে প্রস্তুত?','cta-sub':'আজই অর্ডার করুন এবং নোয়াখালী যেকোনো জায়গায় তাজা কেক পান!','cta-btn1':'📋 অর্ডার করুন','cta-btn2':'💬 হোয়াটসঅ্যাপ','cta-btn3':'📘 ফেসবুকে মেসেজ',
    /* menu */ 'menu-eyebrow':'আমাদের অফার','menu-title':'তাজা বেকড কেকের মেনু','menu-sub':'আপডেট মূল্যের জন্য ফেসবুক বা হোয়াটসঅ্যাপে মেসেজ করুন · প্রতি কেজি মূল্য (BDT)','filter-all':'সব কেক','filter-bday':'🎂 জন্মদিন','filter-wed':'💍 বিয়ে','filter-cust':'🎨 কাস্টম',
    /* order */ 'order-eyebrow':'অর্ডার করুন','order-title':'আজই আপনার কেক অর্ডার করুন','order-sub':'আপডেট মূল্য ও অর্ডার নিশ্চিত করতে ফেসবুক বা হোয়াটসঅ্যাপে মেসেজ করুন! 💬','form-title':'📋 অর্ডারের বিস্তারিত','form-req':'* চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক','lbl-name':'পূর্ণ নাম *','lbl-phone':'হোয়াটসঅ্যাপ নম্বর *','lbl-addr':'ডেলিভারি ঠিকানা *','lbl-type':'কেকের ধরন *','lbl-size':'কেকের আকার','lbl-date':'ডেলিভারির তারিখ *','lbl-time':'পছন্দের সময়','lbl-notes':'কেকের বার্তা / ডিজাইন নোট','btn-wa-ord':'💬 হোয়াটসঅ্যাপ অর্ডার','btn-fb-ord':'📘 ফেসবুক অর্ডার','cart-sum-title':'🛒 কার্ট সারসংক্ষেপ','success-msg':'🎉 ধন্যবাদ! আপনার অর্ডার নিশ্চিত করতে রিডাইরেক্ট হচ্ছে...',
    /* gallery */ 'gal-eyebrow':'আমাদের তৈরি','gal-title':'আমাদের কাজের কিছু নমুনা','gal-sub':'মাইজদী, নোয়াখালীতে ভালোবাসায় হাতে তৈরি 🍰','gal-social':'মাইজদী, নোয়াখালী থেকে প্রতিদিনের মিষ্টি তৈরির জন্য আমাদের সোশ্যাল মিডিয়ায় ফলো করুন!',
    /* contact */ 'con-eyebrow':'যোগাযোগ করুন','con-title':'আমরা মাইজদী, নোয়াখালীতে অবস্থিত','con-sub':'সপ্তাহে ৭ দিন খোলা','del-title':'🚚 নোয়াখালীতে ডেলিভারি এলাকা','wa-box-title':'সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন','wa-box-sub':'অর্ডার দেওয়ার সবচেয়ে দ্রুত উপায়!<br>মাইজদী থেকে মিনিটের মধ্যে সাড়া দিই।','wa-box-btn':'💬 হোয়াটসঅ্যাপে চ্যাট করুন','fb-box-title':'ফেসবুকে যোগাযোগ করুন','fb-box-sub':'দ্রুত অর্ডারের জন্য ফেসবুকে যোগাযোগ করুন! আমরা সাথে সাথেই উত্তর দেই।','fb-box-btn':'📘 ফেসবুকে মেসেজ দিন',
    /* cart */ 'cart-title':'🛒 আপনার কার্ট','cart-subtotal':'সাবটোটাল','cart-note':'💡 আপডেট মূল্যের জন্য ফেসবুক বা হোয়াটসঅ্যাপে মেসেজ করুন। মূল্য প্রতি কেজি।','cart-wa':'💬 হোয়াটসঅ্যাপ','cart-fb':'📘 ফেসবুক','cart-clear':'🗑 কার্ট খালি করুন',
    /* footer */ 'foot-about':'মাইজদী, নোয়াখালী, বাংলাদেশে ভালোবাসায় হাতে তৈরি হোমমেইড কেক। ২০১৯ সাল থেকে প্রতিটি উৎসবকে মিষ্টি করে তুলছি।','foot-links':'দ্রুত লিঙ্ক','foot-types':'কেকের ধরন','foot-areas':'ডেলিভারি এলাকা','foot-copy':'© ২০২৬ ইমুর কেক বেকারি · মাইজদী, নোয়াখালী, বাংলাদেশ','foot-love':'ভালোবাসা ও অনেক চিনি দিয়ে তৈরি',
    /* misc */ 'loader-sub':'মাইজদী, নোয়াখালী · প্রতিষ্ঠিত ২০১৯','wa-tip':'হোয়াটসঅ্যাপে অর্ডার করুন','fb-tip':'ফেসবুকে মেসেজ করুন',
  }
};

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || (TRANSLATIONS.en[key]) || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('emusLang', lang);
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang === 'bn' ? 'English' : 'বাংলা';
  // Update text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  // Update innerHTML (for elements with HTML tags like <br>, <em>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = t(key);
  });
  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-ph'));
  });
  // Re-render dynamic content
  renderCakeGrid('home-cakes-grid', 'popular');
  renderCakeGrid('cakes-grid', currentFilter);
  updateCartUI();
}

function toggleLanguage() { setLanguage(currentLang === 'en' ? 'bn' : 'en'); }

let currentFilter = 'all';
let searchQuery = '';

/* ─────────── CART STATE ─────────── */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('emusCart') || '[]'); } catch (e) { cart = []; }

function saveCart() { try { localStorage.setItem('emusCart', JSON.stringify(cart)); } catch (e) { } }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

function addToCart(id) {
  const cake = CAKES.find(c => c.id === id);
  if (!cake) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
    showToast(`Added another ${cake.name} 🛒`, 'success');
  } else {
    cart.push({ id: cake.id, name: cake.name, price: cake.price, emoji: cake.emoji, img: cake.img, qty: 1 });
    showToast(`${cake.name} added to cart! 🎂`, 'success');
  }
  saveCart();
  updateCartUI();
  document.querySelectorAll(`[data-cake-id="${id}"]`).forEach(btn => {
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = '+ Add'; btn.classList.remove('added'); }, 1400);
  });
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartUI();
  showToast('Item removed from cart', 'info');
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart(); updateCartUI();
}

function clearCart() {
  if (!cart.length) return;
  cart = [];
  saveCart(); updateCartUI();
  showToast('Cart cleared', 'info');
}

function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById('nav-cart-badge');
  badge.textContent = count;
  count > 0 ? badge.classList.add('show') : badge.classList.remove('show');
  renderCartSidebar();
  renderOrderSummary();
}

function renderCartSidebar() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <span class="empty-icon">🛒</span>
        <p>Your cart is empty!<br>Browse our menu and add some delicious cakes.</p>
        <button class="btn-primary" onclick="closeCart(); showPage('menu')" style="font-size:13px;padding:10px 24px;">Browse Menu 🎂</button>
      </div>`;
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-thumb">
        ${item.img
      ? `<img src="${item.img}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"><span style="display:none;font-size:28px;">${item.emoji}</span>`
      : `<span style="font-size:28px;">${item.emoji}</span>`
    }
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">৳ ${item.price.toLocaleString()} / kg</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">🗑</button>
    </div>`).join('');
  document.getElementById('cart-subtotal').textContent = `৳ ${getCartTotal().toLocaleString()}`;
}

function renderOrderSummary() {
  const ocsItems = document.getElementById('ocs-items');
  const ocsTotal = document.getElementById('ocs-total');
  const ocsTotalVal = document.getElementById('ocs-total-val');
  if (!ocsItems) return;
  if (!cart.length) {
    ocsItems.innerHTML = '<div class="ocs-empty">No items yet.<br>Add cakes from the Menu page! 🎂</div><button class="ocs-browse-btn" onclick="showPage(\'menu\')">Go to Menu →</button>';
    if (ocsTotal) ocsTotal.style.display = 'none';
    return;
  }
  ocsItems.innerHTML = cart.map(item => `
    <div class="ocs-item">
      <span class="ocs-name">${item.emoji} ${item.name}</span>
      <span class="ocs-qty">×${item.qty}</span>
      <span class="ocs-price">৳ ${(item.price * item.qty).toLocaleString()}</span>
    </div>`).join('');
  if (ocsTotal) { ocsTotal.style.display = 'flex'; ocsTotalVal.textContent = `৳ ${getCartTotal().toLocaleString()}`; }
}

function orderFromCart() {
  if (!cart.length) { showToast('Add some cakes to your cart first!', 'error'); return; }
  const items = cart.map(i => `  ${i.emoji} ${i.name} x${i.qty} -> BDT ${(i.price * i.qty).toLocaleString()}`).join('\n');
  const total = getCartTotal();
  const msg = encodeURIComponent(
    `*New Order - Emu's Cake Bakery*\nMaijdee, Noakhali\n\n` +
    `*Cart Items:*\n${items}\n\n` +
    `*Total: BDT ${total.toLocaleString()}*\n\nPlease confirm my order. Thank you!`
  );
  window.open(`https://wa.me/8801576742531?text=${msg}`, '_blank');
}

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.classList.remove('no-scroll');
}

/* ─────────── TOAST ─────────── */
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ─────────── LIGHTBOX ─────────── */
function openLightbox(imgSrc, emoji, caption) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  if (imgSrc) {
    content.innerHTML = `<img src="${imgSrc}" alt="${caption}" onerror="this.style.display='none';this.nextElementSibling.style.display='block';"><div class="lb-emoji" style="display:none;">${emoji || '🎂'}</div>`;
  } else {
    content.innerHTML = `<div class="lb-emoji">${emoji}</div>`;
  }
  document.getElementById('lb-caption').textContent = caption || '';
  lb.classList.add('show');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('show');
  document.body.classList.remove('no-scroll');
}

document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});

/* ─────────── PAGE NAVIGATION ─────────── */
const navMap = {
  home: 'nav-home',
  menu: 'nav-menu',
  gallery: 'nav-gallery',
  contact: 'nav-contact',
  order: 'nav-order'
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById(navMap[id]);
  if (navEl) navEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'menu') {
    document.getElementById('cake-search').value = '';
    searchQuery = '';
    renderCakeGrid('cakes-grid', currentFilter);
  }
  if (id === 'home') renderCakeGrid('home-cakes-grid', 'popular');
  if (id === 'order') renderOrderSummary();

  setTimeout(initScrollReveal, 50);
}

/* ─────────── RENDER CAKES ─────────── */
function getCakeCard(c) {
  const badgeLbl = c.badge === 'popular' ? (currentLang === 'bn' ? '🔥 বেস্ট সেলার' : '🔥 Best Seller')
                 : c.badge === 'new'     ? (currentLang === 'bn' ? '✨ নতুন' : '✨ New')
                 : c.badge === 'custom'  ? (currentLang === 'bn' ? '🎨 কাস্টম' : '🎨 Custom') : '';
  const badgeHtml = c.badge ? `<span class="cake-badge badge-${c.badge}">${badgeLbl}</span>` : '';
  const name = (currentLang === 'bn' && c.name_bn) ? c.name_bn : c.name;
  const desc = (currentLang === 'bn' && c.desc_bn) ? c.desc_bn : c.desc;
  const addLabel = currentLang === 'bn' ? '+ যোগ করুন' : '+ Add';
  const imgHtml = c.img
    ? `<img src="${c.img}" alt="${name}" onerror="this.style.display='none';" loading="lazy"><span class="cake-fallback">${c.emoji}</span>`
    : `<span class="cake-fallback">${c.emoji}</span>`;
  return `
    <div class="cake-card reveal">
      <div class="cake-thumb" style="background:${c.bg};">
        ${badgeHtml}${imgHtml}
      </div>
      <div class="cake-body">
        <div class="cake-name">${name}</div>
        <div class="cake-desc">${desc}</div>
        <div class="cake-footer">
          <div class="cake-price">৳ ${c.price.toLocaleString()}</div>
          <button class="add-btn" data-cake-id="${c.id}" onclick="addToCart(${c.id})">${addLabel}</button>
        </div>
      </div>
    </div>`;
}

function renderCakeGrid(gridId, filter) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  let list = CAKES;
  if (filter === 'popular') {
    list = CAKES.filter(c => c.badge === 'popular');
  } else if (filter !== 'all') {
    list = CAKES.filter(c => c.cat === filter);
  }
  if (searchQuery) {
    list = list.filter(c =>
      c.name.toLowerCase().includes(searchQuery) ||
      c.desc.toLowerCase().includes(searchQuery)
    );
  }
  if (!list.length) {
    grid.innerHTML = '<div class="no-results">No cakes found. Try a different search or filter.</div>';
    return;
  }
  grid.innerHTML = list.map(getCakeCard).join('');
  setTimeout(initScrollReveal, 30);
}

function filterCakes(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCakeGrid('cakes-grid', filter);
}

function searchCakes() {
  searchQuery = document.getElementById('cake-search').value.toLowerCase().trim();
  renderCakeGrid('cakes-grid', currentFilter);
}

/* ─────────── ORDER FORM ─────────── */
function validateField(inputId, groupId) {
  const val = document.getElementById(inputId).value.trim();
  const group = document.getElementById(groupId);
  if (!val) { group.classList.add('error'); return false; }
  group.classList.remove('error');
  return true;
}

function submitOrder() {
  let valid = true;
  valid = validateField('o-name', 'fg-name') && valid;
  valid = validateField('o-phone', 'fg-phone') && valid;
  valid = validateField('o-address', 'fg-address') && valid;
  valid = validateField('o-type', 'fg-type') && valid;
  valid = validateField('o-date', 'fg-date') && valid;
  if (!valid) { showToast('Please fill in all required fields', 'error'); return; }

  const name = document.getElementById('o-name').value.trim();
  const phone = document.getElementById('o-phone').value.trim();
  const address = document.getElementById('o-address').value.trim();
  const type = document.getElementById('o-type').value;
  const size = document.getElementById('o-size').value;
  const date = document.getElementById('o-date').value;
  const time = document.getElementById('o-time').value;
  const notes = document.getElementById('o-notes').value.trim();

  let cartLine = '';
  if (cart.length) {
    const items = cart.map(i => `  ${i.emoji} ${i.name} x${i.qty}`).join('\n');
    cartLine = `\n\nCart Items:\n${items}\nCart Total: BDT ${getCartTotal().toLocaleString()}`;
  }

  const msg = encodeURIComponent(
    `*New Order - Emu's Cake Bakery*\nMaijdee, Noakhali\n\n` +
    `Name: ${name}\nPhone: ${phone}\nAddress: ${address}\n` +
    `Cake: ${type}\nSize: ${size}\nDate: ${date}\nTime: ${time}` +
    cartLine +
    `\n\nNotes: ${notes || 'None'}`
  );

  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  document.getElementById('success-msg').style.display = 'block';

  setTimeout(() => {
    window.open(`https://wa.me/8801576742531?text=${msg}`, '_blank');
    btn.innerHTML = '💬 Confirm Order via WhatsApp';
    btn.disabled = false;
  }, 1000);
}

// Remove error highlight on input
['o-name', 'o-phone', 'o-address', 'o-type', 'o-date'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => {
    const fg = el.closest('[id^="fg-"]');
    if (fg) fg.classList.remove('error');
  });
});

/* ─────────── MOBILE MENU ─────────── */
function toggleMobile() {
  document.getElementById('mobile-menu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ─────────── SCROLL REVEAL ─────────── */
let roObserver;

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  if (!roObserver) {
    roObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          roObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  }
  els.forEach(el => roObserver.observe(el));
}

/* ─────────── COUNTER ANIMATION ─────────── */
function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 38);
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

/* ─────────── NAVBAR & BACK-TO-TOP SCROLL ─────────── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  window.scrollY > 60
    ? navbar.classList.add('scrolled')
    : navbar.classList.remove('scrolled');

  const backTop = document.getElementById('back-top');
  window.scrollY > 400
    ? backTop.classList.add('show')
    : backTop.classList.remove('show');
}, { passive: true });

/* ─────────── WHATSAPP ─────────── */
function openWhatsApp() {
  window.open(
    "https://wa.me/8801576742531?text=Hello!%20I%20would%20like%20to%20order%20a%20cake%20from%20Emu's%20Cake%20Bakery%2C%20Maijdee%2C%20Noakhali.",
    '_blank'
  );
}

/* ─────────── INIT ─────────── */
// Set min date for delivery
const dateInput = document.getElementById('o-date');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

// Initial renders
setLanguage(currentLang);
initCounters();

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAvPkDSeCRPhjb5IdChFwehn7Xk-5OAQxMIHyLEJuh1AvjN0yWs_8AE6JlCU8RAmFH/exec";

async function fetchGoogleSheetsData() {
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        console.log("Full Data from Google Sheets:", data);

        // 1. Cakes
        if(data.cakes && data.cakes.length > 0) {
            CAKES = data.cakes.reverse(); // Reverse to show newest first!
            renderCakeGrid('home-cakes-grid', 'popular');
            renderCakeGrid('cakes-grid', 'all');
            
            // Populate dropdown
            const oType = document.getElementById('o-type');
            if(oType) {
                oType.innerHTML = '<option value="">Select a cake...</option>';
                CAKES.forEach(c => {
                    oType.innerHTML += `<option value="${c.id}">${c.name} (৳${c.price})</option>`;
                });
            }
        } else {
            console.warn("No cakes in Google Sheets.");
        }

        // Helper to find image property dynamically (handling different header naming)
        const getImg = (obj) => {
            const keys = Object.keys(obj);
            const imgKey = keys.find(k => k.toLowerCase() === 'img' || k.toLowerCase() === 'image' || k.toLowerCase() === 'photo');
            let path = imgKey ? obj[imgKey] : '';
            if (path && !path.startsWith('http') && !path.startsWith('images/')) {
                path = 'images/' + path;
            }
            return path;
        };

        // 2. Reviews
        const reviewsGrid = document.querySelector('.screenshot-reviews-grid');
        if(reviewsGrid && data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
            reviewsGrid.innerHTML = '';
            let dc = 0;
            data.reviews.reverse().forEach(r => {
                let imgPath = getImg(r);
                if(imgPath) {
                    const fallbackPath = imgPath.includes('/') ? imgPath.split('/').pop() : imgPath;
                    reviewsGrid.innerHTML += `
                    <div class="ss-review-card reveal reveal-delay-${dc % 3}">
                    <img src="${imgPath}" alt="Customer Review" loading="lazy" 
                         onerror="if(this.src.includes('images/')) { this.src='${fallbackPath}'; } else { this.parentElement.style.display='none'; }">
                    </div>`;
                    dc++;
                }
            });
        }

        // 3. Gallery
        const galleryGrid = document.getElementById('gallery-grid');
        if(galleryGrid && data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
            galleryGrid.innerHTML = '';
            data.gallery.reverse().forEach(g => {
                let imgPath = getImg(g);
                if(imgPath) {
                    const fallbackPath = imgPath.includes('/') ? imgPath.split('/').pop() : imgPath;
                    galleryGrid.innerHTML += `
                    <div class="gallery-item" onclick="openLightbox('${imgPath}', null, 'Cake Gallery')">
                        <img src="${imgPath}" alt="Gallery Cake" 
                             onerror="if(this.src.includes('images/')) { this.src='${fallbackPath}'; }">
                        <div class="gallery-overlay"><span>🔍</span></div>
                    </div>`;
                }
            });
        }
        
        setTimeout(initScrollReveal, 100);
    } catch(e) {
        console.error("Error fetching Sheets data:", e);
    } finally {
        setTimeout(() => {
           const loader = document.getElementById('loader');
           if(loader) loader.classList.add('hidden');
        }, 500);
    }
}

fetchGoogleSheetsData();
