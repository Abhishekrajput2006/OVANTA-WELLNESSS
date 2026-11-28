(function () {
  "use strict";
  var C = window.CONFIG, P = window.PRODUCTS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var app = $("#app");

  // ---------- storage ----------
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var cart = load("ovnta_cart", []);      // [{id, qty}]
  var wish = load("ovnta_wish", []);      // [id]
  var coupon = load("ovnta_coupon", "");  // code
  var orders = load("ovnta_orders", []);
  function persist() { save("ovnta_cart", cart); save("ovnta_wish", wish); save("ovnta_coupon", coupon); save("ovnta_orders", orders); }

  // ---------- helpers ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
  function prod(id) { return P.filter(function (p) { return p.id === id; })[0]; }
  function pct(p) { return Math.round((1 - p.price / p.mrp) * 100); }
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 2200); }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }

  // generated bottle artwork for products without a photo
  function bottle(x, y, s, color, title, form, size, line2) {
    form = form || "drops"; size = size || "30 ml";
    var FL = { drops: "DROPS", tablet: "TABLETS", capsule: "CAPSULES", softgel: "SOFTGELS", syrup: "SYRUP", serum: "SERUM", resin: "RESIN" }[form] || "DROPS";
    var jar = form === "tablet" || form === "capsule" || form === "softgel" || form === "resin";
    var t = title.toUpperCase(), fs = t.length > 11 ? 21 : t.length > 8 ? 26 : 32;
    var words = t.split(" "), lines = [t];
    if (t.length > 9 && words.length > 1) { var h = Math.ceil(words.length / 2); lines = [words.slice(0, h).join(" "), words.slice(h).join(" ")]; fs = Math.min(fs + 4, 30); }
    var tx = lines.map(function (l, i) { return '<text x="150" y="' + (330 + i * (fs + 2) - (lines.length - 1) * (fs / 2)) + '" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="' + fs + '" fill="#fff">' + esc(l) + "</text>"; }).join("");
    return '<g transform="translate(' + x + " " + y + ") scale(" + s + ')">' +
      '<ellipse cx="150" cy="535" rx="95" ry="12" fill="rgba(0,0,0,.12)"/>' +
      (jar
        ? '<rect x="70" y="60" width="160" height="62" rx="12" fill="' + color + '"/><rect x="70" y="60" width="160" height="10" rx="5" fill="rgba(255,255,255,.28)"/><rect x="80" y="122" width="140" height="10" fill="#e8e0dc"/>' +
          '<path d="M52 150c0-14 10-22 24-22h148c14 0 24 8 24 22v318c0 32-18 54-50 54h-96c-32 0-50-22-50-54z" fill="#fff" stroke="#e8e0dc"/>' +
          '<path d="M52 255c60 38 136-40 196 0v150c-60-38-136 40-196 0z" fill="' + color + '"/>' +
          '<path d="M52 255c60 38 136-40 196 0" fill="none" stroke="#e0b030" stroke-width="4"/><path d="M52 405c60 38 136-40 196 0" fill="none" stroke="#e0b030" stroke-width="4"/>'
        : '<rect x="105" y="40" width="90" height="62" rx="14" fill="#fff" stroke="#e8e0dc"/><rect x="118" y="52" width="40" height="22" rx="8" fill="#eee9e5"/>' +
          '<path d="M112 100h76c30 14 52 40 52 78v300c0 30-20 52-52 52h-76c-32 0-52-22-52-52V178c0-38 22-64 52-78z" fill="#fff" stroke="#e8e0dc"/>' +
          '<path d="M60 255c60 38 120-40 180 0v150c-60-38-120 40-180 0z" fill="' + color + '"/>' +
          '<path d="M60 255c60 38 120-40 180 0" fill="none" stroke="#e0b030" stroke-width="4"/><path d="M60 405c60 38 120-40 180 0" fill="none" stroke="#e0b030" stroke-width="4"/>') +
      '<text x="150" y="215" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="26" fill="#1d5a2a">OVNTA</text><text x="150" y="236" text-anchor="middle" font-family="Arial" font-size="12" fill="#6b5a1e">Wellnesss</text>' +
      tx + '<text x="150" y="' + (352 + (lines.length - 1) * 18) + '" text-anchor="middle" font-family="Arial" font-size="13" letter-spacing="4" fill="#fff">' + FL + '</text>' +
      '<text x="150" y="448" text-anchor="middle" font-family="Arial" font-weight="700" font-size="12" fill="#222">' + esc(line2 || "AN AYURVEDIC PROPERTY") + '</text><text x="150" y="468" text-anchor="middle" font-family="Arial" font-weight="700" font-size="15" fill="#1d5a2a">' + esc(size) + '</text></g>';
  }
  var artCache = {};
  function art(p) {
    if (p.image) return p.image;
    if (artCache[p.id]) return artCache[p.id];
    var name = p.name.replace(/\s*\(.*\)/, "").replace(/\s+(Drops|Tablets?|Capsules|Softgels|Syrup|Serum|Resin)$/i, "");
    var inner;
    if (p.combo) {
      var cols = ["#5b0a73", "#1fa3dc", "#8e0f2b", "#1b5e20"], n = p.combo, s = n === 2 ? 0.85 : 0.7, labels = ["Aabha", "Alkaline", "Heart Preuro", "Fat Free"];
      inner = ""; for (var i = 0; i < n; i++) inner += bottle(600 * (i + 0.5) / n - 150 * s, (600 - 520 * s) / 2 - 40 * s, s, cols[i], labels[i]);
    } else inner = bottle(150, 20, 1, p.color, name, p.form, p.size, p.labelLine);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbeeea"/><stop offset="1" stop-color="#f1e2dc"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><path d="M0 0c60 20 90 70 70 130-30-20-70-40-70-130z" fill="#4f9d3a"/><path d="M600 600c-70-10-120-50-120-100 60 0 110 40 120 100z" fill="#5fae45"/>' + inner + "</svg>";
    return (artCache[p.id] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  }

  // ---------- cart math ----------
  function lines(items) { return items.map(function (i) { return { p: prod(i.id), qty: i.qty }; }).filter(function (l) { return l.p; }); }
  function totals(items, method, code) {
    var ls = lines(items), sub = ls.reduce(function (a, l) { return a + l.p.price * l.qty; }, 0), mrp = ls.reduce(function (a, l) { return a + l.p.mrp * l.qty; }, 0);
    var disc = 0, cp = code && C.coupons[code];
    if (cp && sub >= cp.min) disc = cp.type === "percent" ? Math.round(sub * cp.value / 100) : Math.min(cp.value, sub);
    var after = sub - disc, ship = ls.length === 0 ? 0 : (after >= C.freeShippingAbove ? 0 : C.shippingFee);
    var cod = method === "cod" && ls.length ? C.codFee : 0;
    return { ls: ls, sub: sub, mrp: mrp, save: mrp - sub, disc: disc, ship: ship, cod: cod, total: after + ship + cod, count: ls.reduce(function (a, l) { return a + l.qty; }, 0), after: after };
  }
  function couponMsg(code, sub) {
    if (!code) return "";
    var cp = C.coupons[code];
    if (!cp) return '<div class="cmsg bad">Invalid coupon code</div>';
    if (sub < cp.min) return '<div class="cmsg bad">' + esc(code) + " needs a minimum order of " + money(cp.min) + "</div>";
    return '<div class="cmsg ok">✓ ' + esc(code) + " applied: " + cp.label + "</div>";
  }
  function inCart(id) { var c = cart.filter(function (i) { return i.id === id; })[0]; return c ? c.qty : 0; }
  function setQty(id, q) {
    cart = cart.filter(function (i) { return i.id !== id; });
    if (q > 0) cart.push({ id: id, qty: Math.min(q, 20) });
    persist(); refresh();
  }
  function addToCart(id, n) { setQty(id, inCart(id) + (n || 1)); }

  // ---------- reusable HTML ----------
  function heart(id) { return '<button class="wish ' + (wish.indexOf(id) > -1 ? "on" : "") + '" data-wish="' + id + '" aria-label="Save to wishlist"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg></button>'; }
  function addCtl(id) {
    var q = inCart(id);
    return q ? '<div class="stepper" data-stop><button data-dec="' + id + '" aria-label="Decrease">−</button><span>' + q + '</span><button data-inc="' + id + '" aria-label="Increase">+</button></div>'
      : '<button class="add" data-add="' + id + '">Add</button>';
  }
  function card(p) {
    return '<article class="pcard" data-open="' + p.id + '" tabindex="0" role="link" aria-label="' + esc(p.name) + '"><div class="pimg">' + heart(p.id) +
      (p.best ? '<span class="badge">Best seller</span>' : p.isNew ? '<span class="badge new">New</span>' : "") +
      '<img src="' + art(p) + '" alt="' + esc(p.name) + " " + esc(p.size) + ' pack by OVNTA Wellnesss" loading="lazy"></div>' +
      '<div class="pbody"><span class="size">' + esc(p.size) + '</span><h3>' + esc(p.name) + '</h3><span class="cat-t">' + esc(p.cat) + '</span>' +
      '<div class="pfoot"><div class="price"><b>' + money(p.price) + "</b><s>" + money(p.mrp) + "</s><small>" + pct(p) + "% OFF</small></div>" + '<span data-ctl="' + p.id + '">' + addCtl(p.id) + "</span></div></div></article>";
  }
  function grid(list) { return list.length ? '<div class="pgrid">' + list.map(card).join("") + "</div>" : '<div class="empty"><h3>No products found</h3><p>Try a different search or category.</p><br><a class="btn btn-primary" href="#/shop">View all products</a></div>'; }
  function head(title, sub, crumb) { return '<section class="phero"><div class="container"><div class="crumb"><a href="#/">Home</a> / ' + esc(crumb || title) + "</div><h1>" + esc(title) + "</h1>" + (sub ? "<p>" + esc(sub) + "</p>" : "") + "</div></section>"; }

  // ---------- views ----------
  function heroHTML() {
    var fam = prod("family-wellness-pack"), imm = prod("hair-growth-serum");
    var slides = [
      { cls: "hs-1", pill: "🌿 Ayurvedic · Made in Ludhiana, Punjab", h: "Nature se <em>Future</em> tak. Wellness, <em>delivered</em>.", p: "Thoughtfully made Ayurvedic drops, tablets, capsules and more for everyday care. Clear information and fast delivery across India.", b1: ["Shop all products →", "#/shop"], b2: ["Our story", "#/about"], img: "images/aabha-drops.jpg", href: "#/product/aabha-drops", alt: "Aabha Drops bottle", tag: "Best seller" },
      { cls: "hs-2", pill: "🎁 Combo offers", h: "Bundle &amp; <em>save up to " + money(fam.mrp - fam.price) + "</em>", p: "Pick the Family Wellness Pack of 4 bottles or the Daily Care Combo and pay less on every order.", b1: ["Shop combos →", "#/shop?cat=Combos"], b2: ["View family pack", "#/product/family-wellness-pack"], img: art(fam), href: "#/product/family-wellness-pack", alt: "Family Wellness Pack", tag: "Save " + pct(fam) + "%" },
      { cls: "hs-3", pill: "✨ Just launched", h: "New arrivals: <em>Hair Growth Serum</em> &amp; more", p: "Men-Ton Tablet, Thyro Relief, Memovino, Shilajit Resin, Denta Care and more are now in store.", b1: ["See new arrivals →", "#/shop?sort=new"], b2: ["Hair Growth Serum", "#/product/hair-growth-serum"], img: "images/hair-growth-serum-hero.jpg", href: "#/product/hair-growth-serum", alt: "Hair Growth Serum", tag: "New" },
      { cls: "hs-4", pill: "🚚 Free delivery above ₹499", h: "Extra <em>10% off</em> with code OVNTA10", p: "Pay with UPI, cards or net banking, or choose Cash on Delivery. Fast dispatch, easy 7-day support.", b1: ["Start shopping →", "#/shop"], b2: ["Heart Preuro Drops", "#/product/heart-preuro-drops"], img: "images/heart-preuro-drops.jpg", href: "#/product/heart-preuro-drops", alt: "Heart Preuro Drops bottle", tag: "OVNTA10" }
    ];
    return '<section class="hero" id="hero" aria-roledescription="carousel" aria-label="Featured offers"><div class="hero-track">' + slides.map(function (s, i) {
      return '<div class="hslide ' + s.cls + (i === 0 ? " on" : "") + '" aria-hidden="' + (i !== 0) + '"><div class="container hero-in"><div><span class="pill">' + s.pill + "</span><h1>" + s.h + "</h1><p>" + s.p + '</p><div class="hero-btns"><a class="btn btn-yellow" href="' + s.b1[1] + '">' + s.b1[0] + '</a><a class="btn btn-outline" href="' + s.b2[1] + '">' + s.b2[0] + "</a></div>" +
        '<div class="hero-stats"><div><b>' + P.length + '+</b><span>Products</span></div><div><b>3–5 days</b><span>Pan-India delivery</span></div><div><b>COD</b><span>+ UPI &amp; cards</span></div></div></div>' +
        '<a class="hero-img" href="' + s.href + '" aria-label="' + esc(s.alt) + '"><div class="frame"><img src="' + s.img + '" alt="' + esc(s.alt) + ' by OVNTA Wellnesss"' + (i ? ' loading="lazy"' : "") + '></div><span class="hbadge">' + esc(s.tag) + "</span></a></div></div>";
    }).join("") + '</div><button class="hnav prev" aria-label="Previous slide">‹</button><button class="hnav next" aria-label="Next slide">›</button><div class="hdots">' + slides.map(function (_, i) { return '<button aria-label="Go to slide ' + (i + 1) + '"' + (i === 0 ? ' class="on"' : "") + "></button>"; }).join("") + "</div></section>";
  }
  var heroTimer = null, revTimer = null;
  function initHero() {
    clearInterval(heroTimer);
    var hero = $("#hero"); if (!hero) return;
    var sl = $$(".hslide", hero), dots = $$(".hdots button", hero), cur = 0;
    function show(n) { cur = (n + sl.length) % sl.length; sl.forEach(function (s, i) { s.classList.toggle("on", i === cur); s.setAttribute("aria-hidden", i !== cur); }); dots.forEach(function (d, i) { d.classList.toggle("on", i === cur); }); }
    function play() { clearInterval(heroTimer); heroTimer = setInterval(function () { show(cur + 1); }, 5000); }
    $(".prev", hero).onclick = function () { show(cur - 1); play(); };
    $(".next", hero).onclick = function () { show(cur + 1); play(); };
    dots.forEach(function (d, i) { d.onclick = function () { show(i); play(); }; });
    hero.onmouseenter = function () { clearInterval(heroTimer); }; hero.onmouseleave = play;
    var x0 = null; hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) { show(cur + (dx < 0 ? 1 : -1)); play(); } x0 = null; }, { passive: true });
    play();
  }
  function reviewsHTML() {
    return '<section class="section alt"><div class="container"><div class="sec-head"><div><div class="eyebrow">Customer reviews</div><h2>What our customers say</h2><p>Feedback from people who ordered from OVNTA Wellnesss.</p></div><div class="rev-ctl"><button id="rprev" aria-label="Previous reviews">‹</button><button id="rnext" aria-label="Next reviews">›</button></div></div>' +
      '<div class="rev-wrap"><div class="rev-track" id="revtrack">' + window.REVIEWS.map(function (r) {
        return '<article class="rev"><div class="stars" aria-label="' + r[3] + ' out of 5 stars">' + "★".repeat(r[3]) + '<span style="color:#d8d8d8">' + "★".repeat(5 - r[3]) + "</span></div><p>“" + esc(r[4]) + '”</p><div class="who"><div class="av">' + esc(r[0].charAt(0)) + "</div><div><b>" + esc(r[0]) + "</b><span>" + esc(r[1]) + " · " + esc(r[2]) + "</span></div>" + (C.showSampleTag ? '<span class="smp">Sample</span>' : "") + "</div></article>";
      }).join("") + "</div></div></div></section>";
  }
  function initReviews() {
    clearInterval(revTimer);
    var tr = $("#revtrack"); if (!tr) return;
    function step(dir) { var c = tr.firstElementChild, w = c.offsetWidth + 18; if (dir > 0 && tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 8) tr.scrollTo({ left: 0 }); else if (dir < 0 && tr.scrollLeft <= 4) tr.scrollTo({ left: tr.scrollWidth }); else tr.scrollBy({ left: dir * w }); }
    function play() { clearInterval(revTimer); revTimer = setInterval(function () { step(1); }, 4500); }
    $("#rprev").onclick = function () { step(-1); play(); }; $("#rnext").onclick = function () { step(1); play(); };
    tr.onmouseenter = function () { clearInterval(revTimer); }; tr.onmouseleave = play; tr.addEventListener("touchstart", function () { clearInterval(revTimer); }, { passive: true }); play();
  }
  function dealsHTML() {
    return '<section class="section"><div class="container"><div class="sec-head"><div><div class="eyebrow">Offers for you</div><h2>Today’s deals &amp; coupons</h2><p>Tap a code to copy it, then apply at checkout.</p></div></div><div class="deal-grid">' +
      [["10% OFF", "On your entire order. No minimum purchase.", "OVNTA10"], ["₹50 OFF", "On orders of ₹399 and above.", "WELCOME50"], ["FREE DELIVERY", "Automatically on orders above ₹499.", "FREESHIP"]].map(function (d) { return '<div class="deal"><div class="big">' + d[0] + "</div><p>" + d[1] + '</p><div class="code"><b>' + (d[2] === "FREESHIP" ? "AUTO APPLIED" : d[2]) + "</b>" + (d[2] === "FREESHIP" ? "" : '<button class="copy-b" data-copy="' + d[2] + '">Copy code</button>') + "</div></div>"; }).join("") + "</div></div></section>";
  }
  function ingredientsHTML() {
    return '<section class="section"><div class="container"><div class="sec-head"><div><div class="eyebrow">Rooted in tradition</div><h2>Herbs from Ayurveda</h2><p>A few of the time-honoured botanicals used in Ayurvedic practice.</p></div></div><div class="ing-grid">' +
      [["🌿", "Tulsi", "Holy basil"], ["🍃", "Giloy", "Guduchi vine"], ["🌱", "Ashwagandha", "Winter cherry"], ["🍋", "Amla", "Indian gooseberry"], ["🌾", "Triphala", "Three-fruit blend"], ["🌼", "Shatavari", "Asparagus racemosus"]].map(function (x) { return '<div class="ing"><div class="e">' + x[0] + "</div><b>" + x[1] + "</b><span>" + x[2] + "</span></div>"; }).join("") + '</div><p style="font-size:12.5px;color:var(--muted);margin-top:14px">Ingredient list varies by product. Please refer to the label on each bottle.</p></div></section>';
  }
  function howHTML() {
    return '<section class="section alt"><div class="container"><div class="sec-head"><div><div class="eyebrow">Simple &amp; quick</div><h2>How to order</h2></div></div><div class="steps">' +
      [["Choose your drops", "Browse by need or search for a product."], ["Add to cart", "Pick quantity, apply a coupon code."], ["Pay your way", "UPI, card, net banking or Cash on Delivery."], ["Get it delivered", "Dispatched in 24 hours, delivered in 3–5 days."]].map(function (x) { return '<div class="step"><h3>' + x[0] + "</h3><p>" + x[1] + "</p></div>"; }).join("") + "</div></div></section>";
  }
  function promiseHTML() {
    return '<section class="section" style="padding-top:20px"><div class="container"><div class="promise"><div><div class="eyebrow" style="color:var(--yellow)">The OVNTA promise</div><h2>Thoughtful care. Everyday wellness.</h2><p>From our home in Ludhiana to yours: clear information, honest pricing and a customer care team that picks up the phone.</p><br><a class="btn btn-yellow" href="#/contact">Talk to us</a></div><ul><li>✔ Clear product information</li><li>✔ Secure payments</li><li>✔ Fast dispatch</li><li>✔ 7-day support</li></ul></div></div></section>';
  }
  function viewHome() {
    var best = P.filter(function (p) { return p.best && !p.combo; }).slice(0, 4);
    var fresh = P.filter(function (p) { return p.isNew && !p.combo; }).slice(0, 4);
    var c1 = prod("daily-care-combo"), c2 = prod("family-wellness-pack");
    return '<div class="view">' +
      heroHTML() +

      '<section class="strip"><div class="container strip-in">' +
      [["🚚", "Fast delivery", "Dispatch in 24 hours"], ["💳", "Secure payments", "UPI · Cards · COD"], ["🌿", "Ayurvedic range", "Traditional herbs"], ["↩️", "Easy returns", "7-day support"]].map(function (x) { return '<div class="strip-item"><div class="ic">' + x[0] + "</div><div><b>" + x[1] + "</b><span>" + x[2] + "</span></div></div>"; }).join("") + "</div></section>" +

      dealsHTML() + '<section class="section"><div class="container"><div class="sec-head"><div><div class="eyebrow">Shop by need</div><h2>What are you looking for?</h2><p>Pick a category to find the right drops quickly.</p></div></div><div class="cat-grid">' +
      window.CATEGORIES.map(function (c) { return '<a class="cat" href="#/shop?cat=' + encodeURIComponent(c.name) + '"><div class="e">' + c.icon + "</div><b>" + esc(c.name) + "</b></a>"; }).join("") + "</div></div></section>" +

      '<section class="section alt"><div class="container"><div class="sec-head"><div><div class="eyebrow">Most loved</div><h2>Best sellers</h2><p>The drops our customers reorder the most.</p></div><a class="link-more" href="#/shop">See all →</a></div>' + grid(best) + "</div></section>" +

      '<section class="section"><div class="container"><div class="sec-head"><div><div class="eyebrow">Just launched</div><h2>New arrivals</h2><p>Fresh additions to the OVNTA range.</p></div><a class="link-more" href="#/shop?sort=new">See all →</a></div>' + grid(fresh) + "</div></section>" +

      '<section class="section alt"><div class="container"><div class="sec-head"><div><div class="eyebrow">Save more</div><h2>Combo offers</h2><p>Bundle your favourites and pay less.</p></div></div><div class="combo-grid">' +
      [[c1, "c1"], [c2, "c2"]].map(function (x) { var p = x[0]; return '<div class="combo ' + x[1] + '" data-open="' + p.id + '"><div><span class="tagp">Save ' + money(p.mrp - p.price) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(p.short) + '</p><div style="font-weight:800;font-size:22px;margin-bottom:14px">' + money(p.price) + ' <s style="opacity:.7;font-size:15px;font-weight:500">' + money(p.mrp) + '</s></div><button class="btn btn-sm" data-add="' + p.id + '">Add to cart</button></div><div class="cimg"><img src="' + art(p) + '" alt="' + esc(p.name) + '" loading="lazy"></div></div>'; }).join("") + "</div></div></section>" +

      '<section class="section"><div class="container"><div class="sec-head"><div><div class="eyebrow">Why OVNTA</div><h2>Care, with clarity.</h2><p>What you can expect every time you order from us.</p></div></div><div class="why-grid">' +
      [["🌿", "Ayurvedic roots", "Inspired by traditional Ayurvedic knowledge and prepared with care in Punjab."], ["📋", "Clear information", "Plain-language product details with no unsupported promises."], ["🚚", "Delivered to your door", "Quick dispatch with free shipping above ₹499 and Cash on Delivery."], ["🤝", "Real human support", "Talk to our customer care team on call or email whenever you need."]].map(function (x) { return '<div class="why"><div class="ic">' + x[0] + "</div><h3>" + x[1] + "</h3><p>" + x[2] + "</p></div>"; }).join("") + "</div></div></section>" +

      ingredientsHTML() + reviewsHTML() + howHTML() + promiseHTML() +
      '<section class="section" style="padding-top:0"><div class="container"><div class="news"><div><h2>Get 10% off your first order</h2><p>Join our list for new launches and offers. Use code <b>OVNTA10</b> at checkout.</p></div><form id="newsf"><input type="email" required placeholder="Your email address" aria-label="Email"><button class="btn btn-yellow">Subscribe</button></form></div></div></section></div>';
  }

  function sortList(list, s) {
    var l = list.slice();
    if (s === "low") l.sort(function (a, b) { return a.price - b.price; });
    else if (s === "high") l.sort(function (a, b) { return b.price - a.price; });
    else if (s === "az") l.sort(function (a, b) { return a.name.localeCompare(b.name); });
    else if (s === "new") l.sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); });
    return l;
  }
  function shopList(q) {
    var l = P.filter(function (p) {
      if (q.cat && p.cat !== q.cat) return false;
      if (q.q) { var s = (p.name + " " + p.cat + " " + p.tags.join(" ") + " " + p.short + " " + (p.kw || "")).toLowerCase(); if (q.q.toLowerCase().split(/\s+/).some(function (w) { return s.indexOf(w) < 0; })) return false; }
      return true;
    });
    return sortList(l, q.sort);
  }
  function viewShop(q) {
    var cats = ["All"].concat(window.CATEGORIES.map(function (c) { return c.name; }));
    var list = shopList(q);
    return '<div class="view">' + head("The wellness collection.", "Explore the complete OVNTA Wellnesss range.", "Shop all") + '<section class="container"><div class="tools"><input class="field" id="shopq" placeholder="Search the collection…" value="' + esc(q.q || "") + '" aria-label="Search"><select class="field" id="shops" aria-label="Sort"><option value="">Featured</option><option value="low"' + (q.sort === "low" ? " selected" : "") + '>Price: Low to High</option><option value="high"' + (q.sort === "high" ? " selected" : "") + '>Price: High to Low</option><option value="az"' + (q.sort === "az" ? " selected" : "") + '>Name: A to Z</option><option value="new"' + (q.sort === "new" ? " selected" : "") + ">Newest first</option></select></div>" +
      '<div class="chips">' + cats.map(function (c) { var on = (c === "All" && !q.cat) || c === q.cat; return '<button class="chip ' + (on ? "on" : "") + '" data-cat="' + (c === "All" ? "" : esc(c)) + '">' + esc(c) + "</button>"; }).join("") + '</div><p style="color:var(--muted);font-size:13px;margin-bottom:14px" id="shopcount">' + list.length + ' products</p><div id="shopgrid">' + grid(list) + '</div></section><div style="height:40px"></div></div>';
  }
  function viewWish() {
    var list = P.filter(function (p) { return wish.indexOf(p.id) > -1; });
    return '<div class="view">' + head("Your wishlist", "Products you have saved.", "Wishlist") + '<section class="container" style="padding:30px 0">' + (list.length ? grid(list) : '<div class="empty"><h3>Your wishlist is empty</h3><p>Tap the heart on any product to save it here.</p><br><a class="btn btn-primary" href="#/shop">Browse products</a></div>') + "</section></div>";
  }

  var pdTab = "desc";
  function viewProduct(id) {
    var p = prod(id);
    if (!p) return '<div class="container empty"><h3>Product not found</h3><br><a class="btn btn-primary" href="#/shop">Back to shop</a></div>';
    var rel = P.filter(function (x) { return x.id !== p.id && !x.combo && (x.cat === p.cat || x.best); }).slice(0, 4);
    if (rel.length < 4) rel = P.filter(function (x) { return x.id !== p.id && !x.combo; }).slice(0, 4);
    return '<div class="view"><div class="container"><div class="crumb" style="padding-top:18px"><a href="#/">Home</a> / <a href="#/shop">Shop</a> / <a href="#/shop?cat=' + encodeURIComponent(p.cat) + '">' + esc(p.cat) + "</a> / " + esc(p.name) + "</div>" +
      '<div class="pd"><div class="pd-img"><img src="' + art(p) + '" alt="' + esc(p.name) + ' by OVNTA Wellnesss"></div><div>' +
      '<span class="eyebrow">' + esc(p.cat) + "</span><h1>" + esc(p.name) + '</h1><div class="rating">' + esc(p.size) + " · by OVNTA Wellnesss</div>" +
      '<div class="price-l"><b>' + money(p.price) + "</b><s>" + money(p.mrp) + '</s><span class="save">' + pct(p) + "% OFF</span></div><div class=\"tax\">Inclusive of all taxes · " + (p.price >= C.freeShippingAbove ? "<b style='color:var(--green)'>Free delivery</b>" : "Free delivery above " + money(C.freeShippingAbove)) + "</div>" +
      '<p style="margin-top:14px;color:#444">' + esc(p.short) + '</p><div class="pd-tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
      '<div class="qty-row"><div class="qty"><button id="qm" aria-label="Decrease">−</button><span id="qv">1</span><button id="qp" aria-label="Increase">+</button></div><span style="color:var(--muted);font-size:13px">In stock · Ships in 24 hrs</span></div>' +
      '<div class="pd-btns"><button class="btn btn-outline" id="pd-add" data-id="' + p.id + '">🛒 Add to cart</button><button class="btn btn-primary" id="pd-buy" data-id="' + p.id + '">⚡ Buy now</button></div>' +
      '<div style="margin-top:12px">' + heart(p.id).replace('class="wish', 'style="position:static;display:inline-grid;vertical-align:middle;margin-right:8px;border:1px solid var(--line);box-shadow:none" class="wish') + '<span style="font-size:13.5px;font-weight:600">Save to wishlist</span></div>' +
      '<div class="pin"><b style="font-size:14px">📍 Check delivery</b><div class="pin-row"><input class="field" id="pin" maxlength="6" inputmode="numeric" placeholder="Enter 6-digit pincode"><button class="btn btn-primary btn-sm" id="pin-go" style="height:46px">Check</button></div><div class="pin-res" id="pin-res"></div></div>' +
      '<div class="trust"><div><i>🚚</i>Fast delivery</div><div><i>💵</i>COD available</div><div><i>↩️</i>7-day support</div></div></div></div>' +
      '<div class="tabs" id="tabs">' + [["desc", "Description"], ["how", "How to use"], ["info", "Product info"]].map(function (t) { return '<button class="tab ' + (pdTab === t[0] ? "on" : "") + '" data-tab="' + t[0] + '">' + t[1] + "</button>"; }).join("") + '</div><div class="tab-body" id="tabbody">' + tabBody(p) + "</div>" +
      '<div class="sec-head" style="margin-top:34px"><div><h2>You may also like</h2></div></div>' + grid(rel) + '<div style="height:50px"></div></div>' +
      '<div class="m-bar"><button class="btn btn-outline" id="m-add" data-id="' + p.id + '">Add to cart</button><button class="btn btn-primary" id="m-buy" data-id="' + p.id + '">Buy now · ' + money(p.price) + "</button></div></div>";
  }
  function tabBody(p) {
    var disc = '<div class="note">These statements have not been evaluated by FSSAI/AYUSH. This product is not intended to diagnose, treat, cure or prevent any disease.</div>';
    if (pdTab === "how") {
      return "<p><b>सेवन / उपयोग विधि:</b> " + esc(p.how) + "</p>" + (p.tip ? '<p style="margin-top:10px"><b>बेहतर परिणामों के लिए:</b> ' + esc(p.tip) + "</p>" : "") +
        (p.caution ? '<div class="note"><b>विशेष सावधानी:</b> ' + esc(p.caution) + "</div>" : "") +
        '<div class="note">Please read the label carefully. Consult your doctor if you are pregnant, nursing, taking other medication, or have a medical condition.</div>';
    }
    if (pdTab === "info") return "<table>" + p.info.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td><b>" + esc(r[1]) + "</b></td></tr>"; }).join("") + '</table><div class="note">Ingredients and exact composition are as printed on the product label.</div>';
    return "<p>" + esc(p.desc) + "</p>" +
      (p.benefits && p.benefits.length ? '<h4 style="margin:18px 0 8px">मुख्य लाभ एवं उपयोग</h4><ul class="benefits" style="padding-left:20px;line-height:1.7">' + p.benefits.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" : "") +
      (p.tagline ? '<p style="margin-top:14px"><b>' + esc(p.tagline) + "</b></p>" : "") +
      (p.caution ? '<div class="note"><b>विशेष सावधानी:</b> ' + esc(p.caution) + "</div>" : "") + disc;
  }

  // ----- cart drawer -----
  function renderDrawer() {
    var t = totals(cart, "", coupon), d = $("#drawer");
    var left = Math.max(0, C.freeShippingAbove - t.after), pctBar = Math.min(100, Math.round(t.after / C.freeShippingAbove * 100));
    d.innerHTML = '<div class="dh"><h3>My Cart (' + t.count + ')</h3><button class="icon-btn" id="dclose" aria-label="Close">✕</button></div><div class="db">' +
      (t.ls.length ? '<div class="ship-bar">' + (left ? "Add " + money(left) + " more for <b style='color:var(--green)'>FREE delivery</b>" : "🎉 You've unlocked <b style='color:var(--green)'>FREE delivery</b>") + '<div class="bar"><i style="width:' + pctBar + '%"></i></div></div>' +
        t.ls.map(function (l) { return '<div class="ci"><img src="' + art(l.p) + '" alt="' + esc(l.p.name) + '"><div class="m"><h4 data-open="' + l.p.id + '">' + esc(l.p.name) + "</h4><small>" + esc(l.p.size) + '</small><div class="r"><div class="stepper"><button data-dec="' + l.p.id + '">−</button><span>' + l.qty + '</span><button data-inc="' + l.p.id + '">+</button></div><b>' + money(l.p.price * l.qty) + '</b></div><button class="rm" data-rm="' + l.p.id + '">Remove</button></div></div>'; }).join("")
        : '<div class="empty"><div style="font-size:54px">🛒</div><h3>Your cart is empty</h3><p>Add some products to get started.</p><br><a class="btn btn-primary" href="#/shop" data-closedrawer>Shop now</a></div>') + "</div>" +
      (t.ls.length ? '<div class="df"><div class="coupon"><input id="dcode" placeholder="Coupon code" value="' + esc(coupon) + '"><button class="btn btn-outline btn-sm" id="dapply">Apply</button></div>' + couponMsg(coupon, t.sub) +
        '<div class="row"><span>Subtotal</span><span>' + money(t.sub) + "</span></div>" + (t.save ? '<div class="row"><span>You save</span><span class="g">' + money(t.save) + "</span></div>" : "") + (t.disc ? '<div class="row"><span>Coupon discount</span><span class="g">−' + money(t.disc) + "</span></div>" : "") +
        '<div class="row"><span>Delivery</span><span>' + (t.ship ? money(t.ship) : '<span class="g">FREE</span>') + '</span></div><div class="row total"><span>Total</span><span>' + money(t.total) + '</span></div><button class="btn btn-primary btn-block" id="dcheckout" style="margin-top:12px;height:52px">Proceed to checkout →</button></div>' : "");
  }
  function openDrawer() { renderDrawer(); $("#drawer").classList.add("open"); $("#overlay").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeDrawer() { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("open"); document.body.style.overflow = ""; }

  // ----- checkout -----
  var STATES = ["Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other"];
  var BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Yes Bank", "IDFC First Bank"];
  var coItems = [], coMethod = "upi";
  function checkoutItems(q) {
    if (q.buy && prod(q.buy)) return [{ id: q.buy, qty: Math.max(1, Math.min(20, parseInt(q.qty, 10) || 1)) }];
    return cart;
  }
  function fld(id, label, attrs, full) { return '<div class="' + (full ? "full" : "") + '"><label class="lbl" for="' + id + '">' + label + '</label><input class="field" id="' + id + '" name="' + id + '" ' + (attrs || "") + '><div class="ferr" data-err="' + id + '"></div></div>'; }
  function viewCheckout(q) {
    coItems = checkoutItems(q); coMethod = "upi";
    if (!coItems.length) return '<div class="container"><div class="empty" style="padding:90px 0"><div style="font-size:54px">🛒</div><h3>Your cart is empty</h3><p>Add products to continue to checkout.</p><br><a class="btn btn-primary" href="#/shop">Shop now</a></div></div>';
    var saved = load("ovnta_addr", {});
    function v(k) { return 'value="' + esc(saved[k] || "") + '"'; }
    return '<div class="view"><div class="container"><div class="crumb" style="padding-top:18px"><a href="#/">Home</a> / Checkout</div><h1 style="font-size:30px;font-weight:800">Secure checkout</h1>' +
      '<form class="co" id="coform" novalidate><div>' +
      '<div class="box"><h3><span>1</span> Delivery address</h3><div class="fg">' + fld("name", "Full name", 'autocomplete="name" ' + v("name"), true) + fld("phone", "Mobile number", 'inputmode="numeric" maxlength="10" placeholder="10-digit number" autocomplete="tel-national" ' + v("phone")) + fld("email", "Email", 'type="email" autocomplete="email" ' + v("email")) +
      fld("address", "Address (house no., street, area)", 'autocomplete="street-address" ' + v("address"), true) + fld("city", "City", 'autocomplete="address-level2" ' + v("city")) + fld("pincode", "Pincode", 'inputmode="numeric" maxlength="6" ' + v("pincode")) +
      '<div class="full"><label class="lbl" for="state">State</label><select class="field" id="state" name="state"><option value="">Select state</option>' + STATES.map(function (s) { return "<option" + (saved.state === s ? " selected" : "") + ">" + s + "</option>"; }).join("") + '</select><div class="ferr" data-err="state"></div></div></div></div>' +
      '<div class="box"><h3><span>2</span> Payment method</h3>' +
      payOpt("upi", "UPI", "GPay · PhonePe · Paytm", '<div class="upi-apps">' + ["GPay", "PhonePe", "Paytm", "BHIM"].map(function (a) { return '<button type="button" data-upiapp="' + a + '">' + a + "</button>"; }).join("") + '</div><label class="lbl" for="upiid">UPI ID</label><input class="field" id="upiid" placeholder="yourname@okhdfcbank" autocomplete="off"><div class="ferr" data-err="upiid"></div>') +
      payOpt("card", "Credit / Debit card", "Visa · Mastercard · RuPay", '<div class="fg"><div class="full"><label class="lbl" for="cardno">Card number</label><input class="field" id="cardno" inputmode="numeric" maxlength="23" placeholder="1234 5678 9012 3456" autocomplete="cc-number"><div class="ferr" data-err="cardno"></div></div><div class="full"><label class="lbl" for="cardname">Name on card</label><input class="field" id="cardname" autocomplete="cc-name"><div class="ferr" data-err="cardname"></div></div><div><label class="lbl" for="exp">Expiry (MM/YY)</label><input class="field" id="exp" inputmode="numeric" maxlength="5" placeholder="MM/YY" autocomplete="cc-exp"><div class="ferr" data-err="exp"></div></div><div><label class="lbl" for="cvv">CVV</label><input class="field" id="cvv" inputmode="numeric" maxlength="4" type="password" placeholder="•••" autocomplete="cc-csc"><div class="ferr" data-err="cvv"></div></div></div>') +
      payOpt("nb", "Net banking", "All major banks", '<label class="lbl" for="bank">Select your bank</label><select class="field" id="bank"><option value="">Choose bank</option>' + BANKS.map(function (b) { return "<option>" + b + "</option>"; }).join("") + '</select><div class="ferr" data-err="bank"></div>') +
      payOpt("cod", "Cash on Delivery", "+" + money(C.codFee) + " handling fee", '<p style="font-size:13.5px;color:#444">Pay in cash or UPI to the delivery partner when your order arrives.</p>') +
      "</div></div>" +
      '<aside class="sticky"><div class="box"><h3>Order summary</h3><div id="sumbox"></div><div class="coupon"><input id="ccode" placeholder="Coupon code"><button type="button" class="btn btn-outline btn-sm" id="capply">Apply</button></div><div id="cmsg"></div>' +
      '<button class="btn btn-primary btn-block" id="placebtn" style="height:54px;margin-top:10px"></button><div class="secure">🔒 Your details are safe and encrypted</div></div></aside></form></div></div>';
  }
  function payOpt(id, title, sub, body) {
    return '<div class="pay ' + (id === "upi" ? "on" : "") + '" data-pay="' + id + '"><label class="pay-h"><input type="radio" name="pm" value="' + id + '"' + (id === "upi" ? " checked" : "") + "> " + title + "<small>" + sub + '</small></label><div class="pay-b">' + body + "</div></div>";
  }
  function coCode() { return load("ovnta_cocode", coupon); }
  function updateSummary() {
    var code = coCode(), t = totals(coItems, coMethod, code);
    $("#sumbox").innerHTML = t.ls.map(function (l) { return '<div class="sum-item"><img src="' + art(l.p) + '" alt=""><div class="n">' + esc(l.p.name) + '<br><small style="color:var(--muted)">Qty ' + l.qty + "</small></div><b>" + money(l.p.price * l.qty) + "</b></div>"; }).join("") +
      '<div class="row"><span>Subtotal</span><span>' + money(t.sub) + "</span></div>" + (t.save ? '<div class="row"><span>You save</span><span class="g">' + money(t.save) + "</span></div>" : "") + (t.disc ? '<div class="row"><span>Coupon</span><span class="g">−' + money(t.disc) + "</span></div>" : "") +
      '<div class="row"><span>Delivery</span><span>' + (t.ship ? money(t.ship) : '<span class="g">FREE</span>') + "</span></div>" + (t.cod ? '<div class="row"><span>COD fee</span><span>' + money(t.cod) + "</span></div>" : "") + '<div class="row total"><span>Total</span><span>' + money(t.total) + "</span></div>";
    $("#cmsg").innerHTML = couponMsg(code, t.sub);
    $("#ccode").value = code || "";
    $("#placebtn").textContent = coMethod === "cod" ? "Place order · " + money(t.total) : "Pay " + money(t.total) + " securely";
  }

  function luhn(n) { var s = 0, alt = false; for (var i = n.length - 1; i >= 0; i--) { var d = +n[i]; if (alt) { d *= 2; if (d > 9) d -= 9; } s += d; alt = !alt; } return s % 10 === 0; }
  function validate() {
    var errs = {}, g = function (id) { return ($("#" + id).value || "").trim(); };
    if (g("name").length < 2) errs.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(g("phone"))) errs.phone = "Enter a valid 10-digit mobile number";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(g("email"))) errs.email = "Enter a valid email address";
    if (g("address").length < 8) errs.address = "Please enter your full address";
    if (g("city").length < 2) errs.city = "Enter your city";
    if (!/^[1-9]\d{5}$/.test(g("pincode"))) errs.pincode = "Enter a valid 6-digit pincode";
    if (!g("state")) errs.state = "Select your state";
    if (coMethod === "upi" && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(g("upiid"))) errs.upiid = "Enter a valid UPI ID (e.g. name@okhdfcbank)";
    if (coMethod === "card") {
      var num = g("cardno").replace(/\s/g, "");
      if (!/^\d{13,19}$/.test(num) || !luhn(num)) errs.cardno = "Enter a valid card number";
      if (g("cardname").length < 2) errs.cardname = "Enter the name on your card";
      var m = g("exp").match(/^(\d{2})\/(\d{2})$/), now = new Date();
      if (!m || +m[1] < 1 || +m[1] > 12 || (2000 + +m[2]) * 12 + +m[1] < now.getFullYear() * 12 + now.getMonth() + 1) errs.exp = "Enter a valid, future expiry date";
      if (!/^\d{3,4}$/.test(g("cvv"))) errs.cvv = "Enter a valid CVV";
    }
    if (coMethod === "nb" && !g("bank")) errs.bank = "Please choose your bank";
    $$("[data-err]").forEach(function (e) { e.textContent = errs[e.dataset.err] || ""; var f = $("#" + e.dataset.err); if (f) f.classList.toggle("err", !!errs[e.dataset.err]); });
    return errs;
  }

  function placeOrder() {
    var errs = validate(), keys = Object.keys(errs);
    if (keys.length) { var el = $("#" + keys[0]); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus(); } toast("Please fix the highlighted fields"); return; }
    var g = function (id) { return ($("#" + id).value || "").trim(); };
    var addr = { name: g("name"), phone: g("phone"), email: g("email"), address: g("address"), city: g("city"), pincode: g("pincode"), state: g("state") };
    save("ovnta_addr", addr);
    var t = totals(coItems, coMethod, coCode());
    var methodLabel = { upi: "UPI (" + g("upiid") + ")", card: "Card ending " + g("cardno").replace(/\s/g, "").slice(-4), nb: "Net banking (" + g("bank") + ")", cod: "Cash on Delivery" }[coMethod];
    var finish = function (payId) {
      var order = { id: "OVN" + Date.now().toString().slice(-8), date: new Date().toISOString(), items: t.ls.map(function (l) { return { id: l.p.id, name: l.p.name, price: l.p.price, qty: l.qty }; }), sub: t.sub, disc: t.disc, ship: t.ship, cod: t.cod, total: t.total, addr: addr, method: methodLabel, payId: payId || "", paid: coMethod !== "cod", status: coMethod === "cod" ? "Confirmed · Pay on delivery" : "Paid · Processing" };
      orders.unshift(order);
      if (!location.hash.match(/buy=/)) { cart = []; coupon = ""; }
      save("ovnta_cocode", ""); persist(); refresh();
      $("#proc").classList.remove("show");
      go("#/success/" + order.id);
    };
    var pay = function () {
      $("#proc-t").textContent = coMethod === "cod" ? "Placing your order…" : coMethod === "upi" ? "Waiting for UPI approval…" : coMethod === "nb" ? "Redirecting to your bank…" : "Processing payment…";
      $("#proc").classList.add("show");
      setTimeout(function () { finish(coMethod === "cod" ? "" : "PAY" + Math.random().toString(36).slice(2, 10).toUpperCase()); }, 1900);
    };
    if (C.RAZORPAY_KEY && coMethod !== "cod") {
      var open = function () {
        var rz = new window.Razorpay({ key: C.RAZORPAY_KEY, amount: t.total * 100, currency: "INR", name: "OVNTA Wellnesss", description: "Order payment", prefill: { name: addr.name, email: addr.email, contact: addr.phone }, theme: { color: "#0C831F" },
          handler: function (r) { finish(r.razorpay_payment_id); }, modal: { ondismiss: function () { toast("Payment cancelled"); } } });
        rz.on("payment.failed", function () { toast("Payment failed. Please try again."); }); rz.open();
      };
      if (window.Razorpay) open(); else { var s = document.createElement("script"); s.src = "https://checkout.razorpay.com/v1/checkout.js"; s.onload = open; s.onerror = function () { toast("Could not load payment gateway"); }; document.head.appendChild(s); }
    } else pay();
  }

  function viewSuccess(id) {
    var o = orders.filter(function (x) { return x.id === id; })[0];
    if (!o) return '<div class="container empty" style="padding:90px 0"><h3>Order not found</h3><br><a class="btn btn-primary" href="#/shop">Continue shopping</a></div>';
    return '<div class="view"><div class="container"><div class="ok-wrap"><div class="tick"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg></div><h1>Order placed successfully!</h1><p style="color:var(--muted)">Thank you, ' + esc(o.addr.name.split(" ")[0]) + '. We have sent the details to ' + esc(o.addr.email) + '.</p><div class="id">Order ID: ' + o.id + '</div>' + orderBox(o) + '<div style="display:flex;gap:12px;justify-content:center;margin-top:22px;flex-wrap:wrap"><a class="btn btn-primary" href="#/shop">Continue shopping</a><a class="btn btn-outline" href="#/orders">View my orders</a></div></div></div></div>';
  }
  function orderBox(o) {
    return '<div class="box ok-box"><div style="font-weight:700;margin-bottom:8px">' + esc(o.status) + "</div>" + o.items.map(function (i) { return '<div class="row"><span>' + esc(i.name) + " × " + i.qty + "</span><span>" + money(i.price * i.qty) + "</span></div>"; }).join("") +
      (o.disc ? '<div class="row"><span>Discount</span><span class="g">−' + money(o.disc) + "</span></div>" : "") + '<div class="row"><span>Delivery</span><span>' + (o.ship ? money(o.ship) : "FREE") + "</span></div>" + (o.cod ? '<div class="row"><span>COD fee</span><span>' + money(o.cod) + "</span></div>" : "") + '<div class="row total"><span>' + (o.paid ? "Paid" : "To pay on delivery") + "</span><span>" + money(o.total) + '</span></div><hr style="border:0;border-top:1px solid var(--line);margin:12px 0"><p style="font-size:13.5px"><b>Deliver to:</b> ' + esc(o.addr.name) + ", " + esc(o.addr.address) + ", " + esc(o.addr.city) + ", " + esc(o.addr.state) + " - " + esc(o.addr.pincode) + " · " + esc(o.addr.phone) + '</p><p style="font-size:13.5px;margin-top:4px"><b>Payment:</b> ' + esc(o.method) + (o.payId ? " · Ref " + esc(o.payId) : "") + '</p><p style="font-size:13.5px;margin-top:4px"><b>Expected delivery:</b> ' + eta() + "</p></div>";
  }
  function eta() { var a = new Date(), b = new Date(); a.setDate(a.getDate() + 3); b.setDate(b.getDate() + 5); var f = function (d) { return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }); }; return f(a) + " – " + f(b); }
  function viewOrders() {
    return '<div class="view">' + head("My orders", "Your recent purchases on this device.", "My orders") + '<section class="container" style="padding:30px 0 50px">' + (orders.length ? orders.map(function (o) { return '<div class="order"><div class="order-h"><div><b>' + o.id + '</b><div style="font-size:12.5px;color:var(--muted)">' + new Date(o.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) + '</div></div><span class="status">' + esc(o.status) + "</span></div>" + orderBox(o).replace("box ok-box", "ok-box").replace('style="', 'style="') + '<button class="btn btn-outline btn-sm" data-reorder="' + o.id + '">Reorder</button></div>'; }).join("") : '<div class="empty"><h3>No orders yet</h3><p>Once you place an order, it will show up here.</p><br><a class="btn btn-primary" href="#/shop">Start shopping</a></div>') + "</section></div>";
  }

  function viewAbout() { return '<div class="view">' + head("Our story", "Nature se Future tak.", "Our story") + '<div class="container prose"><h2>Rooted in Ayurveda</h2><p>OVNTA Wellnesss began in Ludhiana, Punjab, with a simple idea: everyday wellness should feel considered, clear and calm. Our range of Ayurvedic drops brings traditional herbal knowledge into a simple 30 ml bottle you can carry anywhere.</p><h2>What we believe</h2><p><b>Thoughtful choices.</b> An invitation to make space for care in your everyday routine.</p><p><b>Clear information.</b> Product details you can understand, with no unsupported promises.</p><p><b>Care that connects.</b> Personal assistance from our customer care team.</p><p><b>Your own rhythm.</b> A considered approach to your individual wellness journey.</p><br><a class="btn btn-primary" href="#/shop">Explore the range</a></div></div>'; }
  function viewFaq() { return '<div class="view">' + head("FAQs & support", "Quick answers about orders, delivery and payments.", "FAQs") + '<div class="container prose">' + window.FAQS.map(function (f) { return '<div class="faq"><button>' + esc(f[0]) + "</button><div>" + esc(f[1]) + "</div></div>"; }).join("") + '<p style="margin-top:24px">Still need help? <a href="#/contact" style="color:var(--green);font-weight:700">Contact us →</a></p></div></div>'; }
  function viewContact() { return '<div class="view">' + head("Get in touch", "We usually reply within one working day.", "Contact") + '<div class="container contact"><div class="cinfo"><p><b>Email</b><a href="mailto:' + C.email + '">' + C.email + '</a></p><p><b>Phone</b><a href="tel:+919115111553">' + C.phone + '</a></p><p><b>Address</b>' + C.address + '</p></div><form class="box" id="contactf"><div class="fg">' + fld("cname", "Your name", "required", true) + fld("cmail", "Email", 'type="email" required') + fld("cphone", "Phone (optional)") + '<div class="full"><label class="lbl" for="cmsgt">Message</label><textarea class="field" id="cmsgt" rows="5" required></textarea></div></div><button class="btn btn-primary" style="margin-top:14px">Send message</button></form></div></div>'; }

  // ---------- router ----------
  function parse() {
    var h = location.hash.replace(/^#/, "") || "/", qi = h.indexOf("?"), path = qi > -1 ? h.slice(0, qi) : h, q = {};
    if (qi > -1) h.slice(qi + 1).split("&").forEach(function (kv) { var a = kv.split("="); if (a[0]) q[decodeURIComponent(a[0])] = decodeURIComponent((a[1] || "").replace(/\+/g, " ")); });
    return { parts: path.split("/").filter(Boolean), q: q };
  }
  function route() {
    var r = parse(), a = r.parts[0] || "", html, nav = a || "home";
    closeDrawer();
    document.body.classList.remove("has-mbar");
    if (a === "" ) html = viewHome();
    else if (a === "shop") html = viewShop(r.q);
    else if (a === "wishlist") html = viewWish();
    else if (a === "product") { pdTab = "desc"; html = viewProduct(r.parts[1]); document.body.classList.add("has-mbar"); var pp = prod(r.parts[1]); document.title = (pp ? pp.name + " | " : "") + "OVNTA Wellnesss"; }
    else if (a === "checkout") html = viewCheckout(r.q);
    else if (a === "success") html = viewSuccess(r.parts[1]);
    else if (a === "orders") html = viewOrders();
    else if (a === "about") html = viewAbout();
    else if (a === "faq") html = viewFaq();
    else if (a === "contact") html = viewContact();
    else html = '<div class="container empty" style="padding:90px 0"><h3>Page not found</h3><br><a class="btn btn-primary" href="#/">Go home</a></div>';
    if (a !== "product") document.title = "OVNTA Wellnesss | Ayurvedic Drops, Delivered";
    app.innerHTML = html;
    $$("[data-nav]").forEach(function (n) { n.classList.toggle("active", n.dataset.nav === nav); });
    $("#mnav").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "instant" });
    clearInterval(heroTimer); clearInterval(revTimer);
    if (a === "") { initHero(); initReviews(); }
    if (a === "checkout" && $("#coform")) { save("ovnta_cocode", coupon); updateSummary(); }
    if (a === "shop") { var hq = $("#hq"); if (hq && r.q.q) hq.value = r.q.q; }
    refresh();
  }
  // update counters + any live card controls without a full re-render
  function refresh() {
    var n = cart.reduce(function (a, i) { return a + i.qty; }, 0), t = totals(cart, "", coupon);
    $("#carttxt").textContent = n ? n + " item" + (n > 1 ? "s" : "") + " · " + money(t.total) : "My Cart";
    var w = $("#wcount"); w.textContent = wish.length; w.classList.toggle("hidden", !wish.length);
    $$("[data-ctl]").forEach(function (el) { el.innerHTML = addCtl(el.dataset.ctl); });
    $$("[data-wish]").forEach(function (b) { b.classList.toggle("on", wish.indexOf(b.dataset.wish) > -1); });
    if ($("#drawer").classList.contains("open")) renderDrawer();
  }

  // ---------- events ----------
  function applyCoupon(code, inCheckout) {
    code = (code || "").trim().toUpperCase();
    if (code && !C.coupons[code]) { toast("Invalid coupon code"); }
    if (inCheckout) { save("ovnta_cocode", code); updateSummary(); } else { coupon = code; persist(); refresh(); }
    if (code && C.coupons[code]) { var sub = totals(inCheckout ? coItems : cart, "", "").sub; if (sub >= C.coupons[code].min) toast("Coupon applied 🎉"); }
  }
  document.addEventListener("click", function (e) {
    var t = e.target, el;
    if ((el = t.closest("[data-wish]"))) { e.stopPropagation(); var id = el.dataset.wish, i = wish.indexOf(id); if (i > -1) { wish.splice(i, 1); toast("Removed from wishlist"); } else { wish.push(id); toast("Saved to wishlist ♥"); } persist(); refresh(); if (parse().parts[0] === "wishlist") route(); return; }
    if ((el = t.closest("[data-add]"))) { e.stopPropagation(); addToCart(el.dataset.add); toast(prod(el.dataset.add).name + " added to cart"); return; }
    if ((el = t.closest("[data-inc]"))) { e.stopPropagation(); addToCart(el.dataset.inc); return; }
    if ((el = t.closest("[data-dec]"))) { e.stopPropagation(); setQty(el.dataset.dec, inCart(el.dataset.dec) - 1); return; }
    if ((el = t.closest("[data-rm]"))) { setQty(el.dataset.rm, 0); return; }
    if (t.closest("[data-stop]")) { e.stopPropagation(); return; }
    if (t.closest("[data-closedrawer]")) { closeDrawer(); return; }
    if (t.closest("#dclose") || t.id === "overlay") { closeDrawer(); return; }
    if (t.closest("#cartbtn")) { openDrawer(); return; }
    if (t.closest("#dcheckout")) { go("#/checkout"); return; }
    if (t.closest("#dapply")) { applyCoupon($("#dcode").value, false); return; }
    if (t.closest("#capply")) { applyCoupon($("#ccode").value, true); return; }
    if (t.closest("#burger")) { $("#mnav").classList.toggle("open"); return; }
    if ((el = t.closest("[data-cat]"))) { var cat = el.dataset.cat; var r = parse(); go("#/shop" + (cat ? "?cat=" + encodeURIComponent(cat) : "") + (r.q.q ? (cat ? "&" : "?") + "q=" + encodeURIComponent(r.q.q) : "")); return; }
    if ((el = t.closest("[data-tab]"))) { pdTab = el.dataset.tab; $$(".tab").forEach(function (b) { b.classList.toggle("on", b === el); }); $("#tabbody").innerHTML = tabBody(prod(parse().parts[1])); return; }
    if ((el = t.closest(".faq button"))) { el.parentNode.classList.toggle("on"); return; }
    if ((el = t.closest("#pd-add,#m-add"))) { var q = pdQty(); addToCart(el.dataset.id, q); toast(q + " × added to cart"); openDrawer(); return; }
    if ((el = t.closest("#pd-buy,#m-buy"))) { go("#/checkout?buy=" + el.dataset.id + "&qty=" + pdQty()); return; }
    if (t.closest("#qm")) { $("#qv").textContent = Math.max(1, pdQty() - 1); return; }
    if (t.closest("#qp")) { $("#qv").textContent = Math.min(20, pdQty() + 1); return; }
    if (t.closest("#pin-go")) { var pv = $("#pin").value.trim(), res = $("#pin-res"); if (/^[1-9]\d{5}$/.test(pv)) { res.style.color = "var(--green)"; res.textContent = "✓ Delivery available to " + pv + " · Expected by " + eta() + " · COD available"; } else { res.style.color = "var(--red)"; res.textContent = "Please enter a valid 6-digit pincode"; } return; }
    if ((el = t.closest("[data-upiapp]"))) { $$("[data-upiapp]").forEach(function (b) { b.classList.toggle("on", b === el); }); var u = $("#upiid"); if (!u.value) u.placeholder = "yourname@" + ({ GPay: "okhdfcbank", PhonePe: "ybl", Paytm: "paytm", BHIM: "upi" })[el.dataset.upiapp]; u.focus(); return; }
    if ((el = t.closest("[data-copy]"))) { var cd = el.dataset.copy; if (navigator.clipboard) navigator.clipboard.writeText(cd).catch(function () {}); coupon = cd; persist(); refresh(); toast("Code " + cd + " copied & saved for your cart"); return; }
    if ((el = t.closest("[data-reorder]"))) { var o = orders.filter(function (x) { return x.id === el.dataset.reorder; })[0]; if (o) { o.items.forEach(function (i) { if (prod(i.id)) addToCart(i.id, i.qty); }); openDrawer(); } return; }
    if ((el = t.closest("[data-open]"))) { go("#/product/" + el.dataset.open); return; }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(".pcard")) { e.preventDefault(); go("#/product/" + e.target.dataset.open); }
  });
  function pdQty() { var v = $("#qv"); return v ? parseInt(v.textContent, 10) || 1 : 1; }
  document.addEventListener("change", function (e) {
    if (e.target.name === "pm") { coMethod = e.target.value; $$(".pay").forEach(function (p) { p.classList.toggle("on", p.dataset.pay === coMethod); }); updateSummary(); }
    if (e.target.id === "shops") { var r = parse(); go("#/shop?" + qs({ cat: r.q.cat, q: r.q.q, sort: e.target.value })); }
  });
  function qs(o) { return Object.keys(o).filter(function (k) { return o[k]; }).map(function (k) { return k + "=" + encodeURIComponent(o[k]); }).join("&"); }
  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.id === "shopq") { var r = parse(); r.q.q = t.value; $("#shopgrid").innerHTML = grid(shopList(r.q)); $("#shopcount").textContent = shopList(r.q).length + " products"; history.replaceState(null, "", "#/shop?" + qs({ cat: r.q.cat, q: t.value, sort: r.q.sort })); refresh(); }
    if (t.id === "cardno") { t.value = t.value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim(); }
    if (t.id === "exp") { var d = t.value.replace(/\D/g, "").slice(0, 4); t.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; }
    if (t.id === "phone" || t.id === "pincode" || t.id === "cvv" || t.id === "pin") t.value = t.value.replace(/\D/g, "");
    if (t.classList && t.classList.contains("err")) { t.classList.remove("err"); var er = $('[data-err="' + t.id + '"]'); if (er) er.textContent = ""; }
  });
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.id === "coform") { e.preventDefault(); placeOrder(); }
    else if (f.id === "hsearch" || f.id === "msearch") { e.preventDefault(); var v = $(f.id === "hsearch" ? "#hq" : "#mq").value.trim(); go("#/shop" + (v ? "?q=" + encodeURIComponent(v) : "")); }
    else if (f.id === "newsf") { e.preventDefault(); var em = $("input", f).value; f.reset(); toast("Subscribed! Use OVNTA10 for 10% off."); var m = load("ovnta_subs", []); m.push(em); save("ovnta_subs", m); }
    else if (f.id === "contactf") { e.preventDefault(); var msgs = load("ovnta_msgs", []); msgs.push({ n: $("#cname").value, e: $("#cmail").value, p: $("#cphone").value, m: $("#cmsgt").value, d: new Date().toISOString() }); save("ovnta_msgs", msgs); f.reset(); toast("Thanks! We'll get back to you soon."); }
  });
  window.addEventListener("hashchange", route);
  route();
})();
