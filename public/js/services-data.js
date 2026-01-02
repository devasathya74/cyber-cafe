/* =================================
   Services Data - Local Defaults
   ================================= */

// Local Services Data
const localServices = {
    // Identity
    aadhaar_up: { id: "aadhaar_up", category: "identity", title: "आधार अपडेट", icon: "fingerprint", docs: "आधार कार्ड / मोबाइल (OTP) / बायोमेट्रिक", time: "3-7 दिन", fee: "₹50 - ₹100" },
    pan_link: { id: "pan_link", category: "identity", title: "पैन कार्ड (नया/सुधार)", icon: "credit-card", docs: "आधार कार्ड / फोटो / हस्ताक्षर", time: "7-10 दिन", fee: "₹150 - ₹200" },
    dl: { id: "dl", category: "identity", title: "ड्राइविंग लाइसेंस (DL)", icon: "car", docs: "आधार / फोटो / मार्कशीट (अगर है)", time: "15-30 दिन", fee: "₹500+" },
    passport: { id: "passport", category: "identity", title: "पासपोर्ट आवेदन", icon: "book-user", docs: "आधार / पैन / 10th मार्कशीट", time: "15-20 दिन", fee: "₹1500+" },
    voter: { id: "voter", category: "identity", title: "वोटर & राशन कार्ड", icon: "vote", docs: "आधार / फोटो / परिवार विवरण", time: "10-15 दिन", fee: "₹50 - ₹100" },
    
    // Banking
    balance: { id: "balance", category: "banking", title: "बैलेंस / स्टेटमेंट", icon: "banknote", docs: "आधार नंबर / बैंक का नाम", time: "तुरंत", fee: "₹10 - ₹20" },
    aeps_dep: { id: "aeps_dep", category: "banking", title: "नकद जमा (AEPS)", icon: "arrow-down-circle", docs: "बैंक नाम / आधार / कैश", time: "तुरंत", fee: "न्यूनतम" },
    ac_seed: { id: "ac_seed", category: "banking", title: "DBT लिंकिंग", icon: "link-2", docs: "आधार कार्ड / बैंक पासबुक", time: "24-48 घंटे", fee: "₹50" },
    upi_act: { id: "upi_act", category: "banking", title: "UPI / बैंकिंग चालू", icon: "smartphone", docs: "ATM कार्ड / मोबाइल / आधार", time: "10 मिनट", fee: "₹50" },
    atmpin: { id: "atmpin", category: "banking", title: "ATM पिन", icon: "key", docs: "ATM कार्ड / पासबुक / मोबाइल", time: "तुरंत", fee: "₹30" },
    
    // Land
    bhulekh: { id: "bhulekh", category: "land", title: "खतौनी / भूलेख", icon: "map", docs: "गाटा संख्या / नाम", time: "तुरंत", fee: "₹20 - ₹40" },
    income: { id: "income", category: "land", title: "आय / जाति / निवास", icon: "file-badge", docs: "आधार / फोटो / घोषणा पत्र", time: "7-10 दिन", fee: "₹100" },
    police_ver: { id: "police_ver", category: "land", title: "पुलिस वेरिफिकेशन", icon: "shield-alert", docs: "आधार / फोटो", time: "5-10 दिन", fee: "₹100" },
    birth_death: { id: "birth_death", category: "land", title: "जन्म / मृत्यु प्रमाण", icon: "file-text", docs: "अस्पताल की रसीद / आधार", time: "15-20 दिन", fee: "₹100+" },
    marriage: { id: "marriage", category: "land", title: "विवाह पंजीकरण", icon: "heart-handshake", docs: "आधार (दोनों) / फोटो / कार्ड", time: "20-30 दिन", fee: "Govt + ₹200" },
    
    // Vehicle
    challan: { id: "challan", category: "vehicle", title: "चालान स्टेटस / भुगतान", icon: "file-warning", docs: "गाड़ी नंबर / चेचिस नंबर", time: "तुरंत", fee: "चालान राशि + ₹30" },
    rc_print: { id: "rc_print", category: "vehicle", title: "RC प्रिंट (Smart Card)", icon: "printer", docs: "गाड़ी नंबर / आधार", time: "तुरंत", fee: "₹50" },
    rc_mobile: { id: "rc_mobile", category: "vehicle", title: "RC मोबाइल अपडेट", icon: "smartphone", docs: "RC / आधार / नया मोबाइल", time: "24 घंटे", fee: "₹50" },
    vehicle_ins: { id: "vehicle_ins", category: "vehicle", title: "वाहन बीमा (Insurance)", icon: "shield-check", docs: "RC / पुरानी पॉलिसी (यदि है)", time: "तुरंत", fee: "पॉलिसी अनुसार" },
    fastag: { id: "fastag", category: "vehicle", title: "FASTag रिचार्ज/इशू", icon: "zap", docs: "RC की कॉपी / मोबाइल", time: "तुरंत", fee: "₹100 + रिचार्ज" },
    
    // Education
    exam_reg: { id: "exam_reg", category: "education", title: "सरकारी फॉर्म", icon: "edit-3", docs: "मार्कशीट / फोटो / सिग्नेचर", time: "30 मिनट", fee: "₹50 - ₹100" },
    scholarship: { id: "scholarship", category: "education", title: "स्कॉलरशिप", icon: "graduation-cap", docs: "आधार / मार्कशीट / आय / फीस रसीद", time: "30 मिनट", fee: "₹80 - ₹100" },
    ans_key: { id: "ans_key", category: "education", title: "एडमिट कार्ड & रिजल्ट", icon: "clipboard-check", docs: "रोल नंबर / जन्म तिथि", time: "तुरंत", fee: "₹20" },
    admission: { id: "admission", category: "education", title: "यूनिवर्सिटी एडमिशन", icon: "school", docs: "मार्कशीट / फोटो / आधार", time: "तुरंत", fee: "₹50 - ₹100" },
    rojgar: { id: "rojgar", category: "education", title: "रोजगार पंजीकरण", icon: "briefcase", docs: "आधार / शैक्षिक प्रमाण पत्र", time: "तुरंत", fee: "₹50" },
    
    // Schemes
    pmkisan: { id: "pmkisan", category: "schemes", title: "PM किसान KYC", icon: "sprout", docs: "आधार / मोबाइल / खतौनी", time: "तुरंत", fee: "₹50" },
    pmawas: { id: "pmawas", category: "schemes", title: "PM आवास आवेदन", icon: "home", docs: "आधार / बैंक / जमीन के कागज", time: "Govt Process", fee: "₹100" },
    labourcard: { id: "labourcard", category: "schemes", title: "लेबर कार्ड पंजी.", icon: "hard-hat", docs: "आधार / बैंक पासबुक / फोटो", time: "15-20 दिन", fee: "₹100" },
    nrega: { id: "nrega", category: "schemes", title: "नरेगा जॉब कार्ड", icon: "shovel", docs: "आधार / बैंक / फोटो", time: "15 दिन", fee: "₹50" },
    toilet: { id: "toilet", category: "schemes", title: "शौचालय योजना", icon: "archive", docs: "आधार / बैंक / फोटो", time: "सरकारी प्रक्रिया", fee: "₹50" },
    
    // Health
    healthcards: { id: "healthcards", category: "health", title: "आयुष्मान / ABHA", icon: "heart-pulse", docs: "आधार / मोबाइल (OTP हेतु)", time: "तुरंत", fee: "₹30 - ₹50" },
    eshram: { id: "eshram", category: "health", title: "ई-श्रम कार्ड", icon: "shield-plus", docs: "आधार / मोबाइल (OTP) / बैंक", time: "तुरंत", fee: "₹50" },
    pension: { id: "pension", category: "health", title: "वृद्धा / विधवा पेंशन", icon: "users", docs: "आधार / पासबुक / आय / फोटो", time: "15-20 दिन", fee: "₹100" },
    familyid: { id: "familyid", category: "health", title: "फैमिली ID (UP)", icon: "users", docs: "सभी का आधार / मोबाइल", time: "10-15 दिन", fee: "₹50" },
    pf_withdraw: { id: "pf_withdraw", category: "health", title: "PF निकासी", icon: "indian-rupee", docs: "UAN / आधार / बैंक", time: "7-10 दिन", fee: "₹100" },
    
    // Ticket
    irctc: { id: "irctc", category: "ticket", title: "रेलवे टिकट (IRCTC)", icon: "train", docs: "आधार / यात्रा विवरण", time: "तुरंत", fee: "टिकट + ₹50" },
    flight: { id: "flight", category: "ticket", title: "हवाई जहाज टिकट", icon: "plane", docs: "आधार / यात्रा विवरण", time: "तुरंत", fee: "टिकट + ₹100" },
    bus: { id: "bus", category: "ticket", title: "बस टिकट बुकिंग", icon: "bus", docs: "यात्रा विवरण", time: "तुरंत", fee: "टिकट + ₹20" },
    
    // Other
    pvccard: { id: "pvccard", category: "other", title: "PVC स्मार्ट कार्ड", icon: "credit-card", docs: "PDF या कार्ड नंबर", time: "10 मिनट", fee: "₹50 - ₹100" },
    photo: { id: "photo", category: "other", title: "अर्जेंट फोटो", icon: "camera", docs: "स्टूडियो में आएं", time: "5 मिनट", fee: "₹50 (32 फोटो)" },
    photocopy: { id: "photocopy", category: "other", title: "फोटोकॉपी & टाइपिंग", icon: "files", docs: "हार्डकॉपी", time: "तुरंत", fee: "₹2/page" },
    bill: { id: "bill", category: "other", title: "बिजली / पानी बिल", icon: "calculator", docs: "कंज्यूमर नंबर / रसीद", time: "तुरंत", fee: "₹10" },
    insurance: { id: "insurance", category: "other", title: "CSC पोर्टल सहायता", icon: "help-circle", docs: "एप्लीकेशन डिटेल्स", time: "तुरंत", fee: "निशुल्क" }
};

// Category Metadata
const categoryMeta = {
    identity: { title: "दस्तावेज & लाइसेंस", icon: "id-card", color: "orange" },
    banking: { title: "बैंकिंग सेवा", icon: "landmark", color: "blue" },
    land: { title: "भूलेख एवं राजस्व", icon: "file-check", color: "emerald" },
    vehicle: { title: "वाहन सेवाएं", icon: "car", color: "red" },
    education: { title: "शिक्षा एवं भर्ती", icon: "graduation-cap", color: "indigo" },
    schemes: { title: "सरकारी योजनाएं", icon: "sprout", color: "green" },
    health: { title: "स्वास्थ्य एवं कल्याण", icon: "heart-pulse", color: "amber" },
    ticket: { title: "टिकट बुकिंग", icon: "ticket", color: "teal" },
    other: { title: "बिल एवं प्रिंटिंग", icon: "printer", color: "purple" }
};

// Export for use
window.localServices = localServices;
window.categoryMeta = categoryMeta;
