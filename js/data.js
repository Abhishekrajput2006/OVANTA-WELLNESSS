// ===== Site config =====
window.CONFIG = {
  brand: "OVNTA WELLNESS",
  email: "Support@ovntawellness.com",
  phone: "+91 91151-11553",
  address: "St. No. 34, Kot Mangal Singh, Ludhiana, Punjab, India.",
  freeShippingAbove: 499,
  shippingFee: 49,
  codFee: 29,
  // Real online payments: yahan apni Razorpay Key ID daalo (rzp_test_xxx / rzp_live_xxx).
  // Khali chhodoge to payment demo (simulated) mode mein chalega.
  RAZORPAY_KEY: "",
  coupons: {
    OVNTA10: { type: "percent", value: 10, min: 0, label: "10% off" },
    WELCOME50: { type: "flat", value: 50, min: 399, label: "₹50 off on orders above ₹399" }
  }
};

// ===== Products =====
// image: real photo path, or null => generated bottle (label colour in `color`)
window.PRODUCTS = [
  { id: "aabha-drops", name: "Aabha Drops", cat: "Daily Wellness", price: 499, mrp: 599, size: "30 ml", color: "#5b0a73", image: "images/aabha-drops.jpg", best: true,
    short: "An Ayurvedic daily-care drop from OVNTA.", tags: ["Ayurvedic", "Daily care"] },
  { id: "alkaline-drops", name: "Alkaline Drops", cat: "Digestion & Balance", price: 449, mrp: 549, size: "30 ml", color: "#0f6b6b", image: "images/alkaline-drops.jpg", best: true,
    short: "Ayurvedic drops for everyday balance and digestive comfort.", tags: ["Ayurvedic", "Digestive comfort"] },
  { id: "balam-kheera-drops", name: "Balam Kheera Drops", cat: "Vitality", price: 399, mrp: 499, size: "30 ml", color: "#b85c00", image: "images/balam-kheera-drops.jpg", best: true,
    short: "Traditional herb-based drops to support everyday strength.", tags: ["Ayurvedic", "Vitality"] },
  { id: "fat-free-drops", name: "Fat Free Drops", cat: "Weight Care", price: 549, mrp: 699, size: "30 ml", color: "#1c7c2d", image: "images/fat-free-drops.jpg", best: true,
    short: "Herbal drops to go with your active, balanced lifestyle.", tags: ["Ayurvedic", "Lifestyle"] },
  { id: "female-care-drops", name: "Female Care Drops", cat: "Women's Care", price: 599, mrp: 749, size: "30 ml", color: "#c2185b", image: "images/female-care-drops.jpg",
    short: "Gentle Ayurvedic care designed with women's wellness in mind.", tags: ["Ayurvedic", "Women's care"] },
  { id: "re-en-drops", name: "RE-EN Drops", cat: "Daily Wellness", price: 499, mrp: 649, size: "30 ml", color: "#1565c0", image: "images/re-en-drops.jpg",
    short: "Renew your routine with herbal everyday support.", tags: ["Ayurvedic", "Daily care"] },
  { id: "rehnocin-drops", name: "REHNOCIN Drops", cat: "Daily Wellness", price: 549, mrp: 699, size: "30 ml", color: "#37474f", image: "images/rehnocin-drops.jpg",
    short: "A considered Ayurvedic formulation for everyday wellness.", tags: ["Ayurvedic", "Daily care"] },
  { id: "heart-preuro-drops", name: "Heart Preuro Drops", cat: "Heart Care", price: 649, mrp: 799, size: "30 ml", color: "#9b0f2b", image: "images/heart-preuro-drops.jpg", best: true,
    short: "Ayurvedic drops to complement a heart-friendly lifestyle.", tags: ["Ayurvedic", "Heart care"] },

  // ---- New products ----
  { id: "immunity-drops", name: "Giloy Tulsi Immunity Drops", cat: "Immunity", price: 399, mrp: 499, size: "30 ml", color: "#2e7d32", image: null, isNew: true,
    short: "Giloy and Tulsi, the classic Ayurvedic pair for everyday immunity support.", tags: ["Ayurvedic", "Immunity"] },
  { id: "digest-care-drops", name: "Digest Care Drops", cat: "Digestion & Balance", price: 349, mrp: 449, size: "30 ml", color: "#ef6c00", image: null, isNew: true,
    short: "Herbal after-meal drops for a comfortable stomach.", tags: ["Ayurvedic", "Digestive comfort"] },
  { id: "hair-skin-glow-drops", name: "Hair & Skin Glow Drops", cat: "Beauty", price: 449, mrp: 579, size: "30 ml", color: "#ad1457", image: null, isNew: true,
    short: "Nourishing herbal drops for your daily beauty routine.", tags: ["Ayurvedic", "Beauty"] },
  { id: "joint-ease-drops", name: "Joint Ease Drops", cat: "Mobility", price: 599, mrp: 749, size: "30 ml", color: "#4e342e", image: null, isNew: true,
    short: "Traditional herbs to keep you moving comfortably.", tags: ["Ayurvedic", "Mobility"] },
  { id: "sleep-calm-drops", name: "Sleep Calm Drops", cat: "Stress & Sleep", price: 449, mrp: 549, size: "30 ml", color: "#283593", image: null, isNew: true,
    short: "Ashwagandha-inspired calm for a relaxed evening routine.", tags: ["Ayurvedic", "Relaxation"] },
  { id: "energy-vigor-drops", name: "Energy Vigor Drops", cat: "Vitality", price: 499, mrp: 629, size: "30 ml", color: "#f9a825", image: null, isNew: true,
    short: "A herbal pick-me-up for busy days.", tags: ["Ayurvedic", "Energy"] },
  { id: "daily-care-combo", name: "Daily Care Combo (2 bottles)", cat: "Combos", price: 849, mrp: 1098, size: "2 × 30 ml", color: "#0C831F", image: null, combo: 2, isNew: true, best: false,
    short: "Aabha Drops + Alkaline Drops together. Save more on your daily routine.", tags: ["Combo", "Save ₹249"] },
  { id: "family-wellness-pack", name: "Family Wellness Pack (4 bottles)", cat: "Combos", price: 1599, mrp: 2196, size: "4 × 30 ml", color: "#0C831F", image: null, combo: 4, isNew: true,
    short: "Four of our most-loved drops in one pack for the whole family.", tags: ["Combo", "Best value"] }
];

window.PRODUCTS.forEach(function (p) {
  p.desc = p.short + " Made by OVNTA WELLNESS, an Ayurvedic property. Our drops come in a convenient 30 ml bottle that is easy to carry and easy to use.";
  p.how = "Use as directed on the product label, or as advised by your Ayurvedic practitioner. Store in a cool, dry place away from direct sunlight. Keep out of reach of children.";
  p.info = [["Brand", "OVNTA WELLNESS"], ["Form", "Liquid drops"], ["Pack size", p.size], ["Type", "Ayurvedic proprietary product"], ["Shelf life", "As printed on the bottle"], ["Origin", "Ludhiana, Punjab, India"]];
});

window.CATEGORIES = [
  { name: "Heart Care", icon: "❤️" },
  { name: "Women's Care", icon: "🌸" },
  { name: "Vitality", icon: "⚡" },
  { name: "Digestion & Balance", icon: "🌿" },
  { name: "Immunity", icon: "🛡️" },
  { name: "Weight Care", icon: "🏃" },
  { name: "Beauty", icon: "✨" },
  { name: "Combos", icon: "🎁" }
];

window.FAQS = [
  ["How long does delivery take?", "Orders are dispatched within 24 hours. Delivery usually takes 3–5 working days across India."],
  ["Is Cash on Delivery available?", "Yes. COD is available on most pincodes with a small handling fee of ₹29."],
  ["Which payment methods do you accept?", "UPI (GPay, PhonePe, Paytm), debit/credit cards, net banking and Cash on Delivery."],
  ["What is your return policy?", "If you receive a damaged or wrong product, contact us within 7 days of delivery and we will replace it or refund you."],
  ["Are the products safe to use with other medicines?", "Please check the label and consult your doctor or Ayurvedic practitioner before using any product alongside other medication."],
  ["How can I track my order?", "Open 'My orders' from the account icon in the header to see your order status."],
  ["How do I contact customer care?", "Write to Support@ovntawellness.com or call +91 91151-11553."]
];

// ===== Reviews =====
// IMPORTANT: Neeche ke reviews SAMPLE (placeholder) hain. Apne asli customers ke reviews se replace karo
// aur `sample: true` hata do (ya showSampleTag false kar do) tab "Sample" tag dikhna band ho jayega.
window.REVIEWS = [
  ["Sample Customer", "Ludhiana", "Aabha Drops", 5, "Bottle ka packaging neat tha aur order time par pahunch gaya. 30 ml size carry karne mein easy hai."],
  ["Sample Customer", "Chandigarh", "Alkaline Drops", 5, "Checkout bahut smooth tha, UPI se payment ek minute mein ho gaya."],
  ["Sample Customer", "Delhi", "Heart Preuro Drops", 4, "Product information clear likhi thi. Delivery 4 din mein aa gayi."],
  ["Sample Customer", "Jalandhar", "Balam Kheera Drops", 5, "Seal pack tha aur bottle sahi condition mein mila. Customer care ne call ka jawab diya."],
  ["Sample Customer", "Amritsar", "Fat Free Drops", 4, "Website use karna aasaan hai, COD ka option mujhe pasand aaya."],
  ["Sample Customer", "Patiala", "Female Care Drops", 5, "Packing achhi thi aur label par saari details saaf padhi ja rahi thi."],
  ["Sample Customer", "Jaipur", "Giloy Tulsi Immunity Drops", 5, "Combo offer se achhi bachat hui. Free delivery bhi mil gayi."],
  ["Sample Customer", "Mumbai", "RE-EN Drops", 4, "Order ka status aur invoice details ek jagah mil gayi, tracking easy thi."],
  ["Sample Customer", "Lucknow", "REHNOCIN Drops", 5, "Dispatch jaldi hua aur delivery partner ne time par call kiya."],
  ["Sample Customer", "Bengaluru", "Digest Care Drops", 4, "Price clear thi, koi hidden charge nahi laga. Coupon code bhi chal gaya."],
  ["Sample Customer", "Ludhiana", "Daily Care Combo", 5, "Combo pack gift ke liye liya, packaging presentable thi."],
  ["Sample Customer", "Gurugram", "Sleep Calm Drops", 5, "Mobile par site fast chalti hai aur product pages mein saari jaankari mili."],
  ["Sample Customer", "Pune", "Joint Ease Drops", 4, "Return policy clearly likhi thi, isliye order karne mein bharosa laga."]
];
window.CONFIG.showSampleTag = true;
