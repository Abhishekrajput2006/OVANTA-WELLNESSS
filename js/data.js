// ===== Site config =====
window.CONFIG = {
  brand: "OVNTA Wellnesss",
  tagline: "Nature se Future tak",
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
// Har product ki details (naam, pack size, ingredients, benefits, sevan vidhi) OVNTA ki di hui detail se hain.
// image: asli photo ka path (images/ folder mein), ya null => generated pack artwork (form + color se).
// Nayi photo aaye to bas file images/ mein daalo aur `image: "images/xxx.jpg"` likh do.
// !! price / mrp: jin products ke aage "// PRICE?" likha hai unki price abhi placeholder hai, apni asli price daal do.
var HINDI_STD = "चिकित्सक की सलाह अथवा उत्पाद लेबल पर दिए गए निर्देशों के अनुसार।";
var HINDI_STD2 = "चिकित्सक की सलाह एवं उत्पाद लेबल पर दिए गए निर्देशों के अनुसार।";

window.PRODUCTS = [
  { id: "heppa-good-drops", name: "Heppa Good Drops", cat: "Liver & Digestion", price: 499, mrp: 649, size: "30 ml", form: "drops", color: "#1f56b5", image: "images/heppa-good-drops.jpg", isNew: true, // PRICE?
    short: "आपके लिवर का भरोसेमंद साथी।", tags: ["Ayurvedic", "Liver care"], kw: "liver jigar digestion detox gas pet bharipan kutki punarnava bhui amla triphala",
    desc: "आपके लिवर का भरोसेमंद साथी। कुटकी, पुनर्नवा, भुई आँवला, त्रिफला एवं अन्य आयुर्वेदिक जड़ी-बूटियों से तैयार एक विशेष हर्बल फॉर्मूला, जो लिवर के स्वास्थ्य और बेहतर पाचन को प्राकृतिक सहयोग देने के लिए बनाया गया है।",
    ing: "कुटकी, पुनर्नवा, भुई आँवला, त्रिफला एवं अन्य आयुर्वेदिक जड़ी-बूटियाँ",
    benefits: ["लिवर के स्वस्थ कार्यों को समर्थन।", "प्राकृतिक डिटॉक्स प्रक्रिया में सहायक।", "पाचन क्रिया को बेहतर बनाने में सहायक।", "गैस और पेट के भारीपन में राहत के लिए उपयोगी।", "संपूर्ण स्वास्थ्य को प्राकृतिक सहयोग।"],
    how: HINDI_STD },

  { id: "men-ton-tablet", name: "Men-Ton Tablet", cat: "Men's Health", price: 599, mrp: 799, size: "15 Tablets", form: "tablet", color: "#d50000", image: "images/men-ton-tablet.jpg", isNew: true, // PRICE?
    short: "आयुर्वेद की ताकत, पुरुषों के आत्मविश्वास के साथ।", tags: ["Ayurvedic", "Men's health"], kw: "men purush stamina energy shakti ashwagandha shilajit musli gokhru kaunch weakness kamzori thakan",
    desc: "आयुर्वेद की ताकत, पुरुषों के आत्मविश्वास के साथ। अश्वगंधा, शिलाजीत, सफेद मूसली, गोखरू, कौंच बीज, विदारीकंद और आंवला से तैयार विशेष आयुर्वेदिक फॉर्मूला, जो पुरुषों की शारीरिक शक्ति, ऊर्जा, स्टैमिना और मानसिक स्वास्थ्य को प्राकृतिक सहयोग देने के लिए बनाया गया है।",
    ing: "अश्वगंधा, शिलाजीत, सफेद मूसली, गोखरू, कौंच बीज, विदारीकंद, आंवला",
    benefits: ["शारीरिक शक्ति और ऊर्जा बढ़ाने में सहायक।", "स्टैमिना और कार्यक्षमता को प्राकृतिक सहयोग।", "थकान और कमजोरी कम करने में सहायक।", "मानसिक तनाव के प्रबंधन में सहायक।", "शारीरिक एवं मानसिक संतुलन को समर्थन।", "पुरुषों के संपूर्ण स्वास्थ्य के लिए उपयोगी।"],
    how: HINDI_STD },

  { id: "aabha-drops", name: "Aabha Drops", cat: "Joint & Bone Care", price: 499, mrp: 599, size: "30 ml", form: "drops", color: "#5b0a73", image: "images/aabha-drops.jpg", best: true,
    short: "यूरिक एसिड, आर्थराइटिस (गठिया) और जोड़ों की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Uric acid", "Joint care"], kw: "uric acid arthritis gathiya gout joint jodo dard sujan jakdan neem atis chirayata giloy",
    desc: "यूरिक एसिड, आर्थराइटिस (गठिया) और जोड़ों की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला। नीम छाल, अतीस, चिरायता, मुंडी, दारु हरिद्रा, रक्त चंदन, खदिर छाल और गिलोय जैसी आयुर्वेदिक जड़ी-बूटियों से तैयार।",
    ing: "नीम छाल, अतीस, चिरायता, मुंडी, दारु हरिद्रा, रक्त चंदन, खदिर छाल, गिलोय",
    benefits: ["बढ़े हुए यूरिक एसिड से जुड़ी समस्याओं में आयुर्वेदिक सहयोग के लिए तैयार।", "आर्थराइटिस (Arthritis) एवं गाउट (Gout) में जोड़ों की देखभाल के लिए उपयोगी।", "जोड़ों के दर्द, सूजन और जकड़न में राहत के उद्देश्य से तैयार।", "जोड़ों की गतिशीलता और लचीलेपन को प्राकृतिक सहयोग।", "हड्डियों एवं मांसपेशियों के स्वास्थ्य को समर्थन।", "चलने-फिरने और दैनिक गतिविधियों में सहजता के लिए सहायक।"],
    how: HINDI_STD2 },

  { id: "alkaline-drops", name: "Alkaline Drops", cat: "Liver & Digestion", price: 449, mrp: 549, size: "30 ml", form: "drops", color: "#1fa3dc", image: "images/alkaline-drops.jpg", best: true,
    short: "स्वस्थ जीवन की शुरुआत Alkaline की हर बूंद के साथ!", tags: ["Ayurvedic", "Digestive health"], kw: "alkaline acidity gas apach liver kidney detox weight green tea moringa sahjan makoy",
    desc: "स्वस्थ जीवन की शुरुआत Alkaline की हर बूंद के साथ! ग्रीन टी अर्क, अंगूर के बीज का अर्क, मकोय, पुनर्नवा, भृंगराज, मोरिंगा (सहजन) और भूमि आँवला से तैयार विशेष आयुर्वेदिक हर्बल फॉर्मूला, जो पाचन स्वास्थ्य एवं संपूर्ण स्वास्थ्य की देखभाल के लिए बनाया गया है।",
    ing: "ग्रीन टी अर्क, अंगूर के बीज का अर्क, मकोय, पुनर्नवा, भृंगराज, मोरिंगा (सहजन), भूमि आँवला",
    benefits: ["एसिडिटी, गैस और अपच में राहत के उद्देश्य से तैयार।", "पाचन क्रिया को प्राकृतिक सहयोग।", "लिवर एवं किडनी के स्वास्थ्य की देखभाल।", "शरीर की प्राकृतिक डिटॉक्स प्रक्रिया को समर्थन।", "वजन प्रबंधन एवं स्वस्थ जीवनशैली के लिए हर्बल सहयोग।", "ऊर्जा एवं संपूर्ण स्वास्थ्य की देखभाल।"],
    how: "7 से 8 बूंदें एक गिलास गुनगुने पानी में मिलाकर, चिकित्सक की सलाह एवं उत्पाद लेबल के निर्देशों के अनुसार लें।" },

  { id: "ashmod-drops", name: "Ashmod Drops", cat: "Thyroid & Glands", price: 549, mrp: 699, size: "30 ml", form: "drops", color: "#7b1fa2", image: null, isNew: true, // PRICE?
    short: "गाँठ, रसौली, सिस्ट और फाइब्रॉइड से जुड़ी समस्याओं में पारंपरिक आयुर्वेदिक देखभाल।", tags: ["Ayurvedic", "Gland care"], kw: "ashmod gaanth gath rasauli cyst fibroid granthi ashwagandha nagkesar lodhra jivanti shatavari kalonji ajwain",
    desc: "अश्वगंधा, नागकेसर, लोध्र छाल, जीवंती, पुनर्नवा, शतावरी, कलौंजी और अजवाइन से तैयार विशेष आयुर्वेदिक हर्बल फॉर्मूला। शरीर की प्राकृतिक देखभाल एवं आंतरिक संतुलन को ध्यान में रखकर विकसित किया गया है।",
    ing: "अश्वगंधा, नागकेसर, लोध्र छाल, जीवंती, पुनर्नवा, शतावरी, कलौंजी, अजवाइन",
    benefits: ["गाँठ, रसौली, सिस्ट और फाइब्रॉइड से जुड़ी समस्याओं में पारंपरिक आयुर्वेदिक देखभाल के उद्देश्य से तैयार।", "ग्रंथियों के स्वास्थ्य की देखभाल के लिए हर्बल संयोजन।", "शरीर के प्राकृतिक संतुलन को समर्थन देने के उद्देश्य से तैयार।", "प्राकृतिक जड़ी-बूटियों का विशेष आयुर्वेदिक मिश्रण।"],
    how: HINDI_STD2, caution: "शरीर में किसी भी प्रकार की गाँठ, रसौली या सिस्ट होने पर चिकित्सकीय जांच अवश्य करवाएं।" },

  { id: "balam-kheera-drops", name: "Balam Kheera Drops", cat: "Kidney & Urinary", price: 399, mrp: 499, size: "30 ml", form: "drops", color: "#c62828", image: "images/balam-kheera-drops.jpg", best: true,
    short: "किडनी स्टोन (पथरी) और मूत्र संबंधी समस्याओं में पारंपरिक आयुर्वेदिक देखभाल।", tags: ["Ayurvedic", "Kidney stone care"], kw: "balam kheera kidney stone pathri mutra urine jalan peshab apamarg gokhru varun punarnava gular",
    desc: "किडनी स्टोन (पथरी) और मूत्र संबंधी समस्याओं में पारंपरिक आयुर्वेदिक देखभाल के लिए विशेष हर्बल फॉर्मूला। अपामार्ग, गोखरू, वरुण छाल, पुनर्नवा और गूलर जैसी आयुर्वेदिक जड़ी-बूटियों से तैयार।",
    ing: "अपामार्ग, गोखरू, वरुण छाल, पुनर्नवा, गूलर",
    benefits: ["किडनी एवं मूत्राशय की पथरी से जुड़ी समस्याओं में आयुर्वेदिक सहयोग के लिए तैयार।", "पेशाब के दौरान जलन और दर्द में राहत के उद्देश्य से विकसित।", "किडनी एवं मूत्राशय के स्वास्थ्य की देखभाल।", "स्वस्थ मूत्र प्रवाह को प्राकृतिक सहयोग।", "मूत्र तंत्र (Urinary System) के स्वास्थ्य को समर्थन।", "प्राकृतिक जड़ी-बूटियों का विशेष आयुर्वेदिक संयोजन।"],
    how: HINDI_STD2 },

  { id: "fat-free-drops", name: "Fat Free Drops", cat: "Weight Care", price: 549, mrp: 699, size: "30 ml", form: "drops", color: "#1b5e20", image: "images/fat-free-drops.jpg", best: true,
    short: "स्वस्थ वजन और बेहतर फिटनेस की ओर एक प्राकृतिक कदम।", tags: ["Ayurvedic", "Weight care"], kw: "fat free weight loss motapa vajan charbi medohar guggul arogyavardhini kalonji chitrak amla pineapple",
    desc: "स्वस्थ वजन और बेहतर फिटनेस की ओर एक प्राकृतिक कदम। अनानास, मेदोहर गुग्गुल, आरोग्यवर्धिनी वटी, कलौंजी, चित्रक मूल और आंवला से तैयार विशेष आयुर्वेदिक फॉर्मूला, जो वजन प्रबंधन, बेहतर पाचन और मेटाबॉलिक स्वास्थ्य को ध्यान में रखकर विकसित किया गया है।",
    ing: "अनानास, मेदोहर गुग्गुल, आरोग्यवर्धिनी वटी, कलौंजी, चित्रक मूल, आंवला",
    benefits: ["शरीर की अतिरिक्त चर्बी के प्रबंधन के उद्देश्य से तैयार।", "भूख को संतुलित रखने में हर्बल सहयोग।", "स्वस्थ मेटाबॉलिज्म को समर्थन।", "पाचन क्रिया को बेहतर बनाने में सहायक।", "शरीर की प्राकृतिक डिटॉक्स प्रक्रिया को सहयोग।", "संतुलित वजन और बेहतर फिटनेस के लिए आयुर्वेदिक सहयोग।"],
    how: HINDI_STD2, tip: "संतुलित आहार और नियमित व्यायाम के साथ उपयोग करें।" },

  { id: "hair-growth-serum", name: "Hair Growth Serum", cat: "Hair Care", price: 449, mrp: 599, size: "100 ml", form: "serum", color: "#00796b", image: "images/hair-growth-serum.jpg", isNew: true, // PRICE?
    short: "जड़ों को पोषण, बालों को मजबूती और प्राकृतिक चमक।", tags: ["Herbal", "Hair care", "External use"], kw: "hair growth serum baal jhadna balo dandruff roosi sir scalp white hair safed bhringraj amla jatamansi brahmi rosemary",
    desc: "जड़ों को पोषण, बालों को मजबूती और प्राकृतिक चमक। आंवला, भृंगराज, अर्जुन छाल, गुड़हल, नीम, जटामांसी, तुलसी, ब्राह्मी और रोजमेरी से तैयार विशेष हर्बल हेयर केयर फॉर्मूला, जो बालों और स्कैल्प की संपूर्ण देखभाल के लिए विकसित किया गया है।",
    ing: "आंवला, भृंगराज, अर्जुन छाल, गुड़हल, नीम, जटामांसी, तुलसी, ब्राह्मी, रोजमेरी",
    benefits: ["बालों की जड़ों को पोषण और मजबूती देने में सहायक।", "बालों के झड़ने और टूटने की समस्या कम करने के उद्देश्य से तैयार।", "प्राकृतिक हेयर ग्रोथ और बालों के घनत्व को समर्थन।", "रूसी और स्कैल्प की खुजली में राहत के लिए हर्बल देखभाल।", "समय से पहले सफेद होते बालों की देखभाल।", "दोमुंहे, रूखे और बेजान बालों की देखभाल।", "बालों को मुलायम, चमकदार और फ्रिज़-फ्री बनाने में सहायक।", "स्कैल्प के स्वास्थ्य को प्राकृतिक सहयोग।"],
    how: "स्कैल्प और बालों की जड़ों पर लगाकर हल्के हाथों से मालिश करें। उत्पाद लेबल पर दिए गए निर्देशों के अनुसार इस्तेमाल करें।", caution: "केवल बाहरी उपयोग के लिए।", external: true },

  { id: "heart-preuro-drops", name: "Heart Preuro Drops", cat: "Heart Care", price: 649, mrp: 799, size: "30 ml", form: "drops", color: "#8e0f2b", image: "images/heart-preuro-drops.jpg", best: true,
    short: "स्वस्थ हृदय और बेहतर जीवनशैली के लिए आयुर्वेदिक देखभाल।", tags: ["Ayurvedic", "Heart care"], kw: "heart preuro dil hriday cholesterol triglyceride bp blood pressure arjun lahsun garlic guggul giloy triphala",
    desc: "स्वस्थ हृदय और बेहतर जीवनशैली के लिए आयुर्वेदिक देखभाल। अर्जुन, लहसुन, आंवला, गुग्गुल, गिलोय, त्रिफला, गोखरू, सौंफ और इलायची से तैयार विशेष आयुर्वेदिक हर्बल फॉर्मूला, जो हृदय एवं रक्त संचार के स्वास्थ्य को ध्यान में रखकर विकसित किया गया है।",
    ing: "अर्जुन, लहसुन, आंवला, गुग्गुल, गिलोय, त्रिफला, गोखरू, सौंफ, इलायची",
    benefits: ["हृदय की मांसपेशियों के स्वास्थ्य को प्राकृतिक सहयोग।", "कोलेस्ट्रॉल एवं ट्राइग्लिसराइड्स के प्रबंधन के उद्देश्य से तैयार।", "स्वस्थ रक्तचाप बनाए रखने के लिए आयुर्वेदिक सहयोग।", "स्वस्थ रक्त संचार एवं धमनियों की देखभाल।", "हृदय एवं संपूर्ण कार्डियोवैस्कुलर स्वास्थ्य को समर्थन।", "पाचन क्रिया एवं संपूर्ण स्वास्थ्य की देखभाल।"],
    how: HINDI_STD2 },

  { id: "piles-nas-drops", name: "Piles Nas Drops", cat: "Liver & Digestion", price: 449, mrp: 599, size: "30 ml", form: "drops", color: "#e65100", image: "images/piles-nas-drops.jpg", isNew: true, // PRICE?
    short: "बवासीर (Piles), कब्ज, आंतों के स्वास्थ्य और गुदा क्षेत्र की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Piles care"], kw: "piles nas bawasir bavasir khooni constipation kabj gudha anal atis tankan daruhaldi aloe vera senna jaiphal neem",
    desc: "बवासीर (Piles), कब्ज, आंतों के स्वास्थ्य और गुदा क्षेत्र की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला। अतीस, टंकण भस्म, दारुहल्दी, एलोवेरा, सनाय, जायफल, नीम एवं अन्य पारंपरिक आयुर्वेदिक सामग्रियों से तैयार।",
    ing: "अतीस, टंकण भस्म, दारुहल्दी, एलोवेरा, सनाय, जायफल, नीम एवं अन्य पारंपरिक आयुर्वेदिक सामग्रियाँ",
    benefits: ["बवासीर (Piles) से जुड़ी समस्याओं में आयुर्वेदिक देखभाल के लिए तैयार।", "कब्ज में राहत एवं मल त्याग को सुगम बनाने में सहायक।", "गुदा क्षेत्र में दर्द, सूजन और जलन से राहत के उद्देश्य से विकसित।", "खूनी बवासीर से जुड़ी समस्याओं में पारंपरिक आयुर्वेदिक सहयोग के लिए तैयार।", "खुजली एवं असहजता में राहत के लिए हर्बल देखभाल।", "आंतों एवं पाचन स्वास्थ्य को प्राकृतिक सहयोग।"],
    how: HINDI_STD2 },

  { id: "rehnocin-drops", name: "REHNOCIN Drops", cat: "Respiratory Care", price: 549, mrp: 699, size: "30 ml", form: "drops", color: "#0d3b9e", image: "images/rehnocin-drops.jpg",
    short: "बदलते मौसम में श्वसन तंत्र की प्राकृतिक देखभाल।", tags: ["Ayurvedic", "Seasonal allergy"], kw: "rehnocin allergy sardi jukam cold cough khansi chheenk naak band gala respiratory ajwain neem tulsi pippali shatavari",
    desc: "बदलते मौसम में श्वसन तंत्र की प्राकृतिक देखभाल। अजवाइन, नीम, तुलसी, पीपली, शतावरी एवं अन्य आयुर्वेदिक जड़ी-बूटियों से तैयार विशेष हर्बल फॉर्मूला, जो मौसमी एलर्जी, सर्दी-जुकाम और श्वसन संबंधी समस्याओं में आयुर्वेदिक सहयोग के लिए विकसित किया गया है।",
    ing: "अजवाइन, नीम, तुलसी, पीपली, शतावरी एवं अन्य आयुर्वेदिक जड़ी-बूटियाँ",
    benefits: ["मौसमी एलर्जी (Seasonal Allergy) में राहत के उद्देश्य से तैयार।", "बार-बार छींक आने और नाक बहने की समस्या में आयुर्वेदिक सहयोग।", "नाक बंद होने और सर्दी-जुकाम में राहत के लिए हर्बल देखभाल।", "गले की खराश, जलन और खांसी में प्राकृतिक सहयोग।", "श्वसन तंत्र (Respiratory System) के स्वास्थ्य को समर्थन।", "बदलते मौसम में श्वसन स्वास्थ्य की देखभाल।"],
    how: HINDI_STD2 },

  { id: "salmon-fish-oil", name: "Salmon Fish Oil (Omega 3, 6, 9)", cat: "Heart Care", price: 599, mrp: 799, size: "30 Softgels", form: "softgel", color: "#ef6c00", image: "images/salmon-fish-oil.jpg", isNew: true, labelLine: "OMEGA 3 · 6 · 9", // PRICE?
    short: "स्वस्थ हृदय, बेहतर मस्तिष्क स्वास्थ्य और सक्रिय जीवनशैली के लिए पोषण का विशेष संयोजन।", tags: ["Omega 3, 6, 9", "Heart & brain"], kw: "salmon fish oil omega 3 6 9 epa dha softgel heart brain cholesterol dil dimag aankh",
    desc: "स्वस्थ हृदय, बेहतर मस्तिष्क स्वास्थ्य और सक्रिय जीवनशैली के लिए पोषण का विशेष संयोजन। ओमेगा-3 फैटी एसिड्स, EPA और DHA युक्त Salmon Fish Oil शरीर की आवश्यक पोषण संबंधी जरूरतों एवं संपूर्ण स्वास्थ्य को ध्यान में रखकर तैयार किया गया है।",
    ing: "ओमेगा-3 फैटी एसिड्स, EPA और DHA युक्त Salmon Fish Oil (Omega 3, 6, 9)",
    benefits: ["हृदय एवं कार्डियोवैस्कुलर स्वास्थ्य को पोषण संबंधी सहयोग।", "स्वस्थ कोलेस्ट्रॉल और ट्राइग्लिसराइड्स के प्रबंधन के लिए पोषण सहयोग।", "मस्तिष्क स्वास्थ्य एवं मानसिक कार्यक्षमता को समर्थन।", "जोड़ों के स्वास्थ्य और गतिशीलता की देखभाल।", "आंखों के स्वास्थ्य को पोषण संबंधी सहयोग।", "स्वस्थ त्वचा और मजबूत बालों की देखभाल।", "रोग प्रतिरोधक क्षमता के सामान्य कार्यों को समर्थन।", "संपूर्ण स्वास्थ्य एवं सक्रिय जीवनशैली के लिए उपयोगी।"],
    how: "सुबह-शाम भोजन के बाद एक सॉफ्टजेल पानी के साथ, चिकित्सक की सलाह एवं उत्पाद लेबल के निर्देशों के अनुसार लें।", strength: "1000 MG", type: "Nutritional supplement" },

  { id: "shamla-cough-syrup", name: "Shamla Cough Syrup", cat: "Respiratory Care", price: 249, mrp: 329, size: "100 ml", form: "syrup", color: "#6d4c41", image: "images/shamla-cough-syrup.jpg", isNew: true, // PRICE?
    short: "खांसी, सर्दी और गले की खराश में प्राकृतिक आयुर्वेदिक देखभाल।", tags: ["Ayurvedic", "Cough & cold"], kw: "shamla cough syrup khansi sardi jukam gala kharash balgam mulethi amaltas babchi vasa talispatra laung banafsha saunf",
    desc: "खांसी, सर्दी और गले की खराश में प्राकृतिक आयुर्वेदिक देखभाल। मुलेठी, अमलतास, बाबची, वासा, तालीसपत्र, लौंग, बनफशा और सौंफ जैसी पारंपरिक आयुर्वेदिक जड़ी-बूटियों से तैयार विशेष हर्बल फॉर्मूला, जो गले एवं श्वसन तंत्र के स्वास्थ्य को ध्यान में रखकर विकसित किया गया है।",
    ing: "मुलेठी, अमलतास, बाबची, वासा, तालीसपत्र, लौंग, बनफशा, सौंफ",
    benefits: ["सूखी और बलगम वाली खांसी में राहत के उद्देश्य से तैयार।", "सर्दी-जुकाम और गले की खराश में आयुर्वेदिक सहयोग।", "जमा हुए बलगम को बाहर निकालने में सहयोग के लिए तैयार।", "गले की जलन और असहजता में प्राकृतिक देखभाल।", "श्वसन तंत्र एवं फेफड़ों के स्वास्थ्य को समर्थन।", "बदलते मौसम में श्वसन स्वास्थ्य की देखभाल।"],
    how: HINDI_STD2 },

  { id: "thyro-relief", name: "Thyro Relief", cat: "Thyroid & Glands", price: 649, mrp: 849, size: "60 Capsules", form: "capsule", color: "#00838f", image: null, isNew: true, // PRICE?
    short: "थायरॉयड स्वास्थ्य और बेहतर जीवनशैली की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Thyroid care"], kw: "thyro relief thyroid hormone metabolism weight ashwagandha guggul kanchnar triphala brahmi shatavari jatamansi tulsi lauh bhasma",
    desc: "थायरॉयड स्वास्थ्य और बेहतर जीवनशैली की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला। अश्वगंधा, गुग्गुल, कांचनार, त्रिफला, ब्राह्मी, शतावरी, जटामांसी, तुलसी और लौह भस्म से तैयार विशेष संयोजन।",
    ing: "अश्वगंधा, गुग्गुल, कांचनार, त्रिफला, ब्राह्मी, शतावरी, जटामांसी, तुलसी, लौह भस्म",
    benefits: ["थायरॉयड स्वास्थ्य की आयुर्वेदिक देखभाल के लिए तैयार।", "प्राकृतिक हार्मोनल संतुलन को ध्यान में रखकर विकसित फॉर्मूला।", "स्वस्थ मेटाबॉलिज्म एवं वजन प्रबंधन के लिए पोषण सहयोग।", "थकान, कमजोरी और सुस्ती से जुड़ी समस्याओं में आयुर्वेदिक देखभाल।", "शारीरिक ऊर्जा एवं मानसिक स्वास्थ्य को समर्थन देने के उद्देश्य से तैयार।", "बालों, त्वचा और नाखूनों के स्वास्थ्य की देखभाल।", "संपूर्ण स्वास्थ्य एवं बेहतर जीवनशैली के लिए हर्बल सहयोग।"],
    how: HINDI_STD2 },

  { id: "uric-nas-drops", name: "Uric Nas Drops", cat: "Joint & Bone Care", price: 549, mrp: 699, size: "30 ml", form: "drops", color: "#455a64", image: "images/uric-nas-drops.jpg", isNew: true, // PRICE?
    short: "साइटिका, कमर दर्द, गर्दन दर्द और जोड़ों के स्वास्थ्य की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Sciatica & back pain"], kw: "uric nas sciatica sayatika kamar dard back pain gardan neck joint jodo L4 L5 disc sonth pippali kali mirch dalchini tejpatta guggul aloe",
    desc: "साइटिका, कमर दर्द, गर्दन दर्द और जोड़ों के स्वास्थ्य की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला। सोंठ, पीपली, काली मिर्च, दालचीनी, तेजपत्ता, शुद्ध गुग्गुल और एलोवेरा जैसी पारंपरिक आयुर्वेदिक सामग्रियों से तैयार।",
    ing: "सोंठ, पीपली, काली मिर्च, दालचीनी, तेजपत्ता, शुद्ध गुग्गुल, एलोवेरा",
    benefits: ["साइटिका और कमर दर्द में आयुर्वेदिक देखभाल के लिए तैयार।", "गर्दन एवं पीठ दर्द में सहायक देखभाल।", "L4-L5 डिस्क से जुड़ी परेशानियों में चिकित्सकीय देखरेख के साथ उपयोग।", "जोड़ों के दर्द, सूजन और जकड़न में आराम के उद्देश्य से तैयार।", "मांसपेशियों एवं जोड़ों के स्वास्थ्य को समर्थन।", "शरीर की गतिशीलता और लचीलेपन को बेहतर बनाए रखने के लिए आयुर्वेदिक सहयोग।"],
    how: HINDI_STD2 },

  { id: "calom-peuri-plus-drops", name: "Calom Peuri+ Drops", cat: "Joint & Bone Care", price: 499, mrp: 649, size: "30 ml", form: "drops", color: "#8d6e63", image: "images/calom-peuri-plus-drops.jpg", isNew: true, // PRICE?
    short: "हड्डियों की मजबूती, कैल्शियम की कमी और जोड़ों की बेहतर देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Bone & calcium"], kw: "calom peuri calcium haddi bones kamzori joint jodo ashwagandha giloy amla saunf tulsi gokhru mulethi shatavari muktashukti shankh bhasma chuna",
    desc: "हड्डियों की मजबूती, कैल्शियम की कमी से जुड़ी स्वास्थ्य आवश्यकताओं और जोड़ों की बेहतर देखभाल के लिए तैयार विशेष आयुर्वेदिक फॉर्मूला। अश्वगंधा, गिलोय, आंवला, सौंफ, तुलसी, गोखरू, मुलेठी, शतावरी, मुक्ताशुक्ति भस्म, शंख भस्म और शुद्ध चूने का आयुर्वेदिक संयोजन।",
    ing: "अश्वगंधा, गिलोय, आंवला, सौंफ, तुलसी, गोखरू, मुलेठी, शतावरी, मुक्ताशुक्ति भस्म, शंख भस्म, शुद्ध चूना",
    benefits: ["हड्डियों की मजबूती और स्वास्थ्य के लिए आयुर्वेदिक सहयोग।", "कैल्शियम की कमी से जुड़ी समस्याओं में सहायक देखभाल के उद्देश्य से तैयार।", "जोड़ों की लचक और गतिशीलता को समर्थन।", "मांसपेशियों और शारीरिक शक्ति की देखभाल।", "शारीरिक सक्रियता एवं सहनशक्ति के लिए आयुर्वेदिक सहयोग।", "हड्डियों और जोड़ों के समग्र स्वास्थ्य की देखभाल।"],
    how: HINDI_STD2 },

  { id: "iro-drops", name: "IRO Drops", cat: "Energy & Mind", price: 449, mrp: 599, size: "30 ml", form: "drops", color: "#b71c1c", image: "images/iro-drops.jpg", isNew: true, // PRICE?
    short: "खून की कमी (Anemia), आयरन की कमी, शारीरिक कमजोरी और थकान से जुड़ी स्वास्थ्य आवश्यकताओं के लिए आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Iron & anemia"], kw: "iro iron anemia khoon ki kami hemoglobin haemoglobin kamzori thakan mandur bhasma lauh amla shatavari brahmi shankhpushpi draksha gulab",
    desc: "खून की कमी (Anemia), आयरन की कमी, शारीरिक कमजोरी और थकान से जुड़ी स्वास्थ्य आवश्यकताओं को ध्यान में रखकर तैयार विशेष आयुर्वेदिक फॉर्मूला। इसमें मांडूर भस्म, लौह भस्म, आंवला, शतावरी, ब्राह्मी, शंखपुष्पी, द्राक्षा और गुलाब फूल जैसे आयुर्वेदिक घटकों का संयोजन है।",
    ing: "मांडूर भस्म, लौह भस्म, आंवला, शतावरी, ब्राह्मी, शंखपुष्पी, द्राक्षा, गुलाब फूल",
    benefits: ["आयरन की कमी से जुड़ी समस्याओं में सहायक देखभाल के लिए तैयार।", "हीमोग्लोबिन एवं लाल रक्त कोशिकाओं के स्वास्थ्य को समर्थन देने के उद्देश्य से निर्मित।", "शारीरिक कमजोरी और थकान में आयुर्वेदिक सहयोग।", "शरीर की ऊर्जा और स्फूर्ति के लिए पोषण संबंधी समर्थन।", "पाचन स्वास्थ्य की देखभाल।", "त्वचा, बालों एवं समग्र स्वास्थ्य के लिए पोषक सहयोग।"],
    how: HINDI_STD2 },

  { id: "green-tea-tablets", name: "Green Tea Tablets", cat: "Weight Care", price: 349, mrp: 449, size: "30 Tablets", form: "tablet", color: "#33691e", image: "images/green-tea-tablets.jpg", isNew: true, // PRICE?
    short: "वजन प्रबंधन, बेहतर मेटाबॉलिज्म, पाचन स्वास्थ्य और रोजमर्रा की ऊर्जा के लिए विशेष हर्बल फॉर्मूला।", tags: ["Herbal", "Weight management"], kw: "green tea tablets weight loss vajan metabolism antioxidant tulsi kali mirch kala namak adrak nimbu lemon ginger",
    desc: "वजन प्रबंधन, बेहतर मेटाबॉलिज्म, पाचन स्वास्थ्य और रोजमर्रा की ऊर्जा को ध्यान में रखकर तैयार विशेष हर्बल फॉर्मूला। ग्रीन टी एक्सट्रेक्ट, तुलसी एक्सट्रेक्ट, काली मिर्च, काला नमक, अदरक एक्सट्रेक्ट और नींबू एक्सट्रेक्ट का प्राकृतिक संयोजन।",
    ing: "ग्रीन टी एक्सट्रेक्ट, तुलसी एक्सट्रेक्ट, काली मिर्च, काला नमक, अदरक एक्सट्रेक्ट, नींबू एक्सट्रेक्ट",
    benefits: ["स्वस्थ वजन प्रबंधन में सहायक पोषण संबंधी सहयोग।", "मेटाबॉलिज्म को सपोर्ट करने के उद्देश्य से तैयार।", "शरीर को एंटीऑक्सीडेंट सपोर्ट प्रदान करने में सहायक।", "ऊर्जा, ताजगी और शारीरिक सक्रियता के लिए सहयोग।", "पाचन स्वास्थ्य की बेहतर देखभाल।", "थकान और सुस्ती में सहायक देखभाल।", "स्वस्थ एवं सक्रिय जीवनशैली के लिए हर्बल सहयोग।"],
    how: HINDI_STD2, type: "Herbal supplement" },

  { id: "re-en-drops", name: "RE-EN Drops", cat: "Energy & Mind", price: 499, mrp: 649, size: "30 ml", form: "drops", color: "#ef6c00", image: "images/re-en-drops.jpg",
    short: "शारीरिक कमजोरी, थकान, सुस्ती और मानसिक तनाव के लिए आयुर्वेदिक एनर्जी फॉर्मूला।", tags: ["Ayurvedic", "Energy"], kw: "re-en reen energy kamzori thakan sustee stress tanav stamina immunity ashwagandha shilajit amla safed musli tulsi",
    desc: "शारीरिक कमजोरी, थकान, सुस्ती और मानसिक तनाव से जुड़ी स्वास्थ्य आवश्यकताओं को ध्यान में रखकर तैयार विशेष आयुर्वेदिक एनर्जी फॉर्मूला। अश्वगंधा, शिलाजीत, आंवला, सफेद मूसली और तुलसी जैसी आयुर्वेदिक सामग्री का संयोजन।",
    ing: "अश्वगंधा, शिलाजीत, आंवला, सफेद मूसली, तुलसी",
    benefits: ["शरीर में ऊर्जा, ताजगी और स्फूर्ति के लिए आयुर्वेदिक सहयोग।", "शारीरिक कमजोरी, थकान और सुस्ती में सहायक देखभाल।", "मानसिक तनाव को कम करने और मन को शांत रखने के लिए सहयोग।", "शारीरिक एवं मानसिक स्टैमिना को सपोर्ट करने के उद्देश्य से तैयार।", "रोग प्रतिरोधक क्षमता के लिए पोषण संबंधी सहयोग।", "दैनिक सक्रियता और समग्र स्वास्थ्य की देखभाल।"],
    how: HINDI_STD2 },

  { id: "memovino-drops", name: "Memovino Drops", cat: "Energy & Mind", price: 499, mrp: 649, size: "30 ml", form: "drops", color: "#3949ab", image: "images/memovino-drops.jpg", isNew: true, // PRICE? + pack size (30 ml?) confirm karo
    short: "याददाश्त, एकाग्रता, मानसिक तनाव, ओवरथिंकिंग और नींद के लिए आयुर्वेदिक ब्रेन हेल्थ फॉर्मूला।", tags: ["Ayurvedic", "Brain health"], kw: "memovino memory yaddasht concentration ekagrata stress tanav overthinking neend sleep dimag brain shankhpushpi ashwagandha brahmi vach jatamansi shatavari",
    desc: "याददाश्त, एकाग्रता, मानसिक तनाव, ओवरथिंकिंग और नींद से जुड़ी समस्याओं में सहायक देखभाल के लिए तैयार विशेष आयुर्वेदिक ब्रेन हेल्थ फॉर्मूला। शंखपुष्पी, अश्वगंधा, ब्राह्मी, वच, जटामांसी और शतावरी जैसी आयुर्वेदिक जड़ी-बूटियों का संयोजन।",
    ing: "शंखपुष्पी, अश्वगंधा, ब्राह्मी, वच, जटामांसी, शतावरी",
    benefits: ["याददाश्त और स्मरण शक्ति के लिए आयुर्वेदिक सहयोग।", "एकाग्रता और मानसिक कार्यक्षमता को समर्थन।", "मानसिक तनाव, बेचैनी और ओवरथिंकिंग में सहायक देखभाल।", "बेहतर नींद और मानसिक शांति के लिए सहयोग।", "सिर में भारीपन और मानसिक थकान में आराम के उद्देश्य से तैयार।", "मस्तिष्क एवं तंत्रिका तंत्र के स्वास्थ्य की देखभाल।", "मानसिक ताजगी और भावनात्मक संतुलन के लिए आयुर्वेदिक सहयोग।"],
    how: HINDI_STD2 },

  { id: "shudh-shilajit-resin", name: "Shudh Shilajit Resin", cat: "Men's Health", price: 699, mrp: 899, size: "20 gm", form: "resin", color: "#4e342e", image: null, isNew: true, // PRICE?
    short: "शारीरिक शक्ति, ऊर्जा, स्टैमिना और पुरुषों के समग्र स्वास्थ्य के लिए आयुर्वेदिक शिलाजीत रेजिन।", tags: ["Ayurvedic", "Shilajit"], kw: "shilajit shudh resin paste stamina energy shakti men purush kamzori thakan sexual health vitality",
    desc: "शारीरिक शक्ति, ऊर्जा, स्टैमिना और पुरुषों के समग्र स्वास्थ्य को ध्यान में रखकर तैयार आयुर्वेदिक शिलाजीत रेजिन। उच्च पर्वतीय क्षेत्रों से प्राप्त शिलाजीत को आयुर्वेदिक विधि से प्रोसेस करके रेजिन (Paste) के रूप में तैयार किया गया है।",
    ing: "शुद्ध शिलाजीत (उच्च पर्वतीय क्षेत्रों से प्राप्त)",
    benefits: ["शारीरिक शक्ति, ऊर्जा और स्फूर्ति के लिए आयुर्वेदिक सहयोग।", "स्टैमिना और शारीरिक सहनशक्ति को समर्थन।", "थकान, कमजोरी और सुस्ती में सहायक देखभाल।", "पुरुषों के यौन स्वास्थ्य एवं जीवनशक्ति के लिए आयुर्वेदिक सहयोग।", "शारीरिक एवं मानसिक सक्रियता को समर्थन।", "रोग प्रतिरोधक क्षमता और समग्र स्वास्थ्य के लिए पोषण संबंधी सहयोग।"],
    how: "गुनगुने दूध या पानी के साथ चिकित्सक की सलाह एवं उत्पाद लेबल पर दिए गए निर्देशों के अनुसार सेवन करें।", formLabel: "Shilajit Resin (Paste)" },

  { id: "e-care-drops", name: "E-Care Drops", cat: "Eye & Oral Care", price: 199, mrp: 249, size: "10 ml", form: "drops", color: "#00897b", image: "images/e-care-drops.jpg", isNew: true, // PRICE?
    short: "आँखों के स्वास्थ्य और देखभाल को ध्यान में रखकर तैयार आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Eye care"], kw: "e-care ecare eye aankh aankhon thakan jalan khujli screen mobile computer amla haritaki tulsi kapoor saptaparnika",
    desc: "आँखों के स्वास्थ्य और देखभाल को ध्यान में रखकर तैयार आयुर्वेदिक फॉर्मूला। आंवला, हरितकी, तुलसी एवं अन्य प्राकृतिक घटकों का विशेष संयोजन।",
    ing: "आंवला, हरितकी, सप्तपर्णिका, तुलसी, कपूर, एक्वा (शुद्ध जल)", tagline: "आँखें हैं कीमती – E-CARE रखेगी इनका ध्यान!",
    benefits: ["आँखों की थकान और असहजता में सहायक देखभाल।", "आँखों में ठंडक और आराम प्रदान करने के उद्देश्य से तैयार।", "आँखों में जलन, खुजली और सूखेपन की समस्या में सहायक देखभाल।", "मोबाइल और कंप्यूटर स्क्रीन के अधिक इस्तेमाल से होने वाली असुविधा को ध्यान में रखकर तैयार।", "धूल और प्रदूषण से प्रभावित आँखों की देखभाल के लिए।", "समग्र नेत्र स्वास्थ्य को समर्थन देने के उद्देश्य से तैयार आयुर्वेदिक फॉर्मूला।"],
    how: "नेत्र चिकित्सक की सलाह एवं उत्पाद लेबल पर दिए गए निर्देशों के अनुसार उपयोग करें।" },

  { id: "denta-care-drops", name: "Denta Care Drops", cat: "Eye & Oral Care", price: 249, mrp: 349, size: "30 ml", form: "drops", color: "#0277bd", image: "images/denta-care-drops.jpg", isNew: true, // PRICE?
    short: "दाँतों, मसूड़ों और संपूर्ण मुख स्वास्थ्य की देखभाल के लिए विशेष आयुर्वेदिक फॉर्मूला।", tags: ["Ayurvedic", "Oral care"], kw: "denta care dant daant masude gums dard toothache bad breath badboo muh chhale mouth ulcer laung kapoor thymol menthol glycerin",
    desc: "दाँतों, मसूड़ों और संपूर्ण मुख स्वास्थ्य की देखभाल के लिए तैयार विशेष आयुर्वेदिक फॉर्मूला। लौंग, कपूर, थाइमोल और मेंथॉल जैसे घटकों का विशेष संयोजन।",
    ing: "ग्लिसरीन, लौंग, कपूर, थाइमोल, मेंथॉल", tagline: "स्वस्थ दाँत, मजबूत मसूड़े और ताज़गी भरी मुस्कान!",
    benefits: ["दाँतों और मसूड़ों की देखभाल में सहायक।", "मसूड़ों की असहजता और सूजन में सहायक देखभाल।", "दाँतों के दर्द और संवेदनशीलता में आराम देने के उद्देश्य से तैयार।", "मुँह की दुर्गंध कम करने और ताज़गी बनाए रखने में सहायक।", "दाँतों की प्राकृतिक चमक और साफ-सफाई बनाए रखने में मददगार।", "मुँह के छालों और मसूड़ों से जुड़ी समस्याओं में सहायक देखभाल।", "संपूर्ण ओरल हेल्थ और ओरल हाइजीन के लिए उपयोगी फॉर्मूला।"],
    how: "उत्पाद के अनुमोदित लेबल के अनुसार टूथब्रश पर 2 से 3 बूँदें लगाकर दिन में दो बार ब्रश करें। निगलें नहीं। बच्चों में दंत चिकित्सक की सलाह के अनुसार ही उपयोग करें." },

  // ---- Combos (price/offer aap apne hisaab se badal sakte ho) ----
  { id: "daily-care-combo", name: "Daily Care Combo (2 bottles)", cat: "Combos", price: 849, mrp: 1098, size: "2 × 30 ml", color: "#0C831F", image: null, combo: 2, isNew: true, best: false,
    short: "Aabha Drops + Alkaline Drops together. Save more on your order.", tags: ["Combo", "Save ₹249"], kw: "combo aabha alkaline uric acid acidity" },
  { id: "family-wellness-pack", name: "Family Wellness Pack (4 bottles)", cat: "Combos", price: 1599, mrp: 2196, size: "4 × 30 ml", color: "#0C831F", image: null, combo: 4, isNew: true,
    short: "Aabha, Alkaline, Heart Preuro and Fat Free Drops in one pack.", tags: ["Combo", "Best value"], kw: "combo family pack aabha alkaline heart preuro fat free" }
];

window.PRODUCTS.forEach(function (p) {
  var isCombo = !!p.combo;
  if (isCombo) p.desc = p.short + " Made by OVNTA Wellnesss – Nature se Future tak. Each bottle comes in a convenient 30 ml pack that is easy to carry and easy to use.";
  if (!p.benefits) p.benefits = [];
  if (!p.how) p.how = "Use as directed on the product label, or as advised by your Ayurvedic practitioner. Store in a cool, dry place away from direct sunlight. Keep out of reach of children.";
  var formName = { drops: "Liquid drops", tablet: "Tablets", capsule: "Capsules", softgel: "Softgels", syrup: "Syrup", serum: "Hair serum (liquid)", resin: "Resin (paste)" }[p.form] || "Liquid drops";
  p.info = [["Brand", "OVNTA Wellnesss"], ["Product", p.name], ["Form", p.formLabel || formName], ["Pack size", p.size]];
  if (p.strength) p.info.push(["Strength", p.strength]);
  if (p.ing) p.info.push(["Key ingredients", p.ing]);
  p.info.push(["Type", p.type || "Ayurvedic proprietary product"]);
  if (p.external) p.info.push(["Use", "केवल बाहरी उपयोग के लिए (External use only)"]);
  p.info.push(["Shelf life", "As printed on the pack"], ["Origin", "Ludhiana, Punjab, India"]);
});

window.CATEGORIES = [
  { name: "Liver & Digestion", icon: "🌿" },
  { name: "Heart Care", icon: "❤️" },
  { name: "Joint & Bone Care", icon: "🦴" },
  { name: "Men's Health", icon: "💪" },
  { name: "Kidney & Urinary", icon: "💧" },
  { name: "Weight Care", icon: "🏃" },
  { name: "Respiratory Care", icon: "🫁" },
  { name: "Energy & Mind", icon: "⚡" },
  { name: "Thyroid & Glands", icon: "🦋" },
  { name: "Hair Care", icon: "✨" },
  { name: "Eye & Oral Care", icon: "👁️" },
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
  ["Sample Customer", "Patiala", "Calom Peuri+ Drops", 5, "Packing achhi thi aur label par saari details saaf padhi ja rahi thi."],
  ["Sample Customer", "Jaipur", "Family Wellness Pack", 5, "Combo offer se achhi bachat hui. Free delivery bhi mil gayi."],
  ["Sample Customer", "Mumbai", "RE-EN Drops", 4, "Order ka status aur invoice details ek jagah mil gayi, tracking easy thi."],
  ["Sample Customer", "Lucknow", "REHNOCIN Drops", 5, "Dispatch jaldi hua aur delivery partner ne time par call kiya."],
  ["Sample Customer", "Bengaluru", "Green Tea Tablets", 4, "Price clear thi, koi hidden charge nahi laga. Coupon code bhi chal gaya."],
  ["Sample Customer", "Ludhiana", "Daily Care Combo", 5, "Combo pack gift ke liye liya, packaging presentable thi."],
  ["Sample Customer", "Gurugram", "Memovino Drops", 5, "Mobile par site fast chalti hai aur product pages mein saari jaankari mili."],
  ["Sample Customer", "Pune", "Uric Nas Drops", 4, "Return policy clearly likhi thi, isliye order karne mein bharosa laga."]
];
window.CONFIG.showSampleTag = true;
