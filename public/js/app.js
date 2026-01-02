/* =================================
   Main Application JavaScript
   ================================= */

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDocs, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWXYvY8FqhVaAfQRtZShCCkEHYsxOtitE",
    authDomain: "rohit-cyber.firebaseapp.com",
    projectId: "rohit-cyber",
    storageBucket: "rohit-cyber.firebasestorage.app",
    messagingSenderId: "55303679856",
    appId: "1:55303679856:web:870886641d23af677369b5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_EMAIL = "romiorohit86@gmail.com";
const appId = "rohitcafe-default";

// Service State
let firestoreServices = {};
let finalServices = {};

/* ================= AUTH FLOW ================= */

async function initApp() {
    try {
        await signInAnonymously(auth);
        loadFirestoreServices();
        console.log("Anonymous session started");
    } catch (e) {
        console.error("Auth Error:", e);
    }
}

onAuthStateChanged(auth, user => {
    if (user && user.email === ADMIN_EMAIL) {
        document.getElementById("public-view")?.classList.add("hidden");
        document.getElementById("admin-view")?.classList.add("active");
    } else {
        document.getElementById("admin-view")?.classList.remove("active");
        document.getElementById("public-view")?.classList.remove("hidden");
        if(!user) initApp();
    }
    loadFirestoreServices();
});

/* ================= FIRESTORE LOGIC ================= */

async function loadFirestoreServices() {
    firestoreServices = {};
    const ref = collection(db, "artifacts", appId, "public", "data", "services");
    const snap = await getDocs(ref);

    snap.forEach(d => {
        firestoreServices[d.id] = { id: d.id, ...d.data() };
    });

    mergeServices();
}

function mergeServices() {
    finalServices = { ...window.localServices };
    
    Object.keys(firestoreServices).forEach(id => {
        finalServices[id] = { id: id, ...firestoreServices[id] };
    });

    renderPublicServices(finalServices);
    renderAdminTable(finalServices);
}

/* ================= RENDERING ================= */

function renderPublicServices(services) {
    const grid = document.getElementById('services-grid');
    if(!grid) return;
    grid.innerHTML = '';

    const grouped = {};
    const allServices = Object.values(services);
    
    allServices.forEach(service => {
        if (!grouped[service.category]) grouped[service.category] = [];
        grouped[service.category].push(service);
    });

    Object.keys(window.categoryMeta).forEach(catKey => {
        if (grouped[catKey]) {
            const meta = window.categoryMeta[catKey];
            const items = grouped[catKey];
            
            const card = document.createElement('div');
            card.className = `service-card group p-6 bg-${getBgColor(meta.color)} rounded-2xl border border-${meta.color}-100 hover:shadow-xl hover:border-${meta.color}-300 transition-all`;
            
            let itemsHtml = '';
            items.forEach(item => {
                itemsHtml += `
                    <li class="service-list-item flex items-center gap-2 text-slate-600" onclick="handleServiceClick('${item.id}')" data-service-key='${item.id}'>
                        <i data-lucide="chevron-right" class="w-4 h-4 text-bob"></i> ${item.title}
                    </li>
                `;
            });

            card.innerHTML = `
                <div class="flex items-center gap-4 mb-5">
                    <div class="bg-${meta.color}-100 text-${meta.color}-600 p-3 rounded-xl"><i data-lucide="${meta.icon}"></i></div>
                    <h3 class="text-xl font-bold text-slate-800">${meta.title}</h3>
                </div>
                <ul class="space-y-2">
                    ${itemsHtml}
                </ul>
            `;
            grid.appendChild(card);
        }
    });

    lucide.createIcons();
}

function getBgColor(color) {
    if(color === 'slate' || color === 'white') return 'slate-50';
    return `${color}-50`;
}

function renderAdminTable(services) {
    const tbody = document.getElementById('admin-service-table');
    if(!tbody) return;
    tbody.innerHTML = '';

    const allServices = Object.values(services);

    allServices.forEach(service => {
        const tr = document.createElement('tr');
        tr.className = "bg-white border-b hover:bg-slate-50";
        
        tr.innerHTML = `
            <td class="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                <i data-lucide="${service.icon}" class="w-4 h-4 text-slate-400"></i> ${service.title}
            </td>
            <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border border-blue-400">${window.categoryMeta[service.category]?.title || service.category}</span>
            </td>
            <td class="px-6 py-4 text-green-600 font-bold">${service.fee}</td>
            <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button onclick="window.editService('${service.id}')" class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Edit">
                        <i data-lucide="pencil" class="w-4 h-4"></i>
                    </button>
                    <button onclick="window.deleteService('${service.id}')" class="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Delete">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    lucide.createIcons();
}

/* ================= UI INTERACTIONS ================= */

// Mobile Menu Toggle
window.toggleMenu = () => {
    document.getElementById('mobile-menu').classList.toggle('active');
};

// Search Services
window.filterServices = () => {
    const term = document.getElementById('service-search').value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');
    let hasResult = false;

    cards.forEach(card => {
        const items = card.querySelectorAll('.service-list-item');
        let cardMatch = false;

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if(text.includes(term)) {
                item.style.display = 'flex';
                cardMatch = true;
                hasResult = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        card.style.display = cardMatch ? 'block' : 'none';
    });

    document.getElementById('no-results').style.display = hasResult ? 'none' : 'block';
};

// Service Popup
window.handleServiceClick = (serviceId) => {
    const service = finalServices[serviceId];
    if(!service) return;

    document.getElementById('popup-icon').innerHTML = `<i data-lucide="${service.icon}" class="w-6 h-6"></i>`;
    document.getElementById('popup-title').textContent = service.title;
    document.getElementById('popup-docs').textContent = service.docs;
    document.getElementById('popup-time').textContent = service.time;
    document.getElementById('popup-fee').textContent = service.fee;

    const popup = document.getElementById('service-popup');
    const overlay = document.getElementById('popup-overlay');
    
    popup.style.display = 'block';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    overlay.style.display = 'block';

    lucide.createIcons();
};

window.closePopup = () => {
    document.getElementById('service-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
};

/* ================= ADMIN FUNCTIONS ================= */

let currentEditId = null;

window.openLoginModal = () => {
    document.getElementById('login-modal').style.display = 'block';
    document.getElementById('login-modal-overlay').style.display = 'block';
};

window.closeLoginModal = () => {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('login-modal-overlay').style.display = 'none';
};

window.handleAdminLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const pass = document.getElementById('admin-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        showToast("Login Successful!");
        closeLoginModal();
    } catch (error) {
        showToast("Login Failed: " + error.message);
    }
};

window.requestAdminAccess = window.openLoginModal;

window.logoutAdmin = async () => {
    await signOut(auth);
    await signInAnonymously(auth);
    showToast("Logged out successfully.");
};

window.openEditModal = (isNew = false) => {
    if (isNew) {
        currentEditId = null;
        document.getElementById('edit-modal-title').textContent = 'Add New Service';
        document.querySelectorAll('#edit-form input, #edit-form select').forEach(el => el.value = '');
    }
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
};

window.closeEditModal = () => {
    document.getElementById('edit-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
    currentEditId = null;
};

window.editService = (id) => {
    currentEditId = id;
    const service = finalServices[id];
    if(!service) return;

    document.getElementById('edit-modal-title').textContent = 'Edit Service';
    document.getElementById('edit-title').value = service.title;
    document.getElementById('edit-category').value = service.category;
    document.getElementById('edit-icon').value = service.icon;
    document.getElementById('edit-docs').value = service.docs;
    document.getElementById('edit-time').value = service.time;
    document.getElementById('edit-fee').value = service.fee;

    openEditModal();
};

window.saveService = async () => {
    const title = document.getElementById('edit-title').value.trim();
    const category = document.getElementById('edit-category').value;
    const icon = document.getElementById('edit-icon').value.trim() || 'file-text';
    const docs = document.getElementById('edit-docs').value.trim();
    const time = document.getElementById('edit-time').value.trim();
    const fee = document.getElementById('edit-fee').value.trim();

    if (!title || !category || !fee) {
        showToast("कृपया शीर्षक, श्रेणी और शुल्क भरें।");
        return;
    }

    const id = currentEditId || title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

    const serviceData = { category, title, icon, docs, time, fee };

    try {
        const ref = doc(db, "artifacts", appId, "public", "data", "services", id);
        await setDoc(ref, serviceData);
        showToast(currentEditId ? "Service Updated!" : "Service Added!");
        closeEditModal();
        loadFirestoreServices();
    } catch (error) {
        showToast("Error: " + error.message);
    }
};

window.deleteService = async (id) => {
    if (!confirm(`क्या आप '${finalServices[id]?.title}' को हटाना चाहते हैं?`)) return;

    try {
        const ref = doc(db, "artifacts", appId, "public", "data", "services", id);
        await deleteDoc(ref);
        showToast("Service Deleted!");
        loadFirestoreServices();
    } catch (error) {
        showToast("Error: " + error.message);
    }
};

/* ================= NEWS TICKER ================= */

window.updateNewsTicker = async () => {
    const text = document.getElementById('admin-ticker-text').value.trim();
    if (!text) {
        showToast("Please enter news text.");
        return;
    }

    try {
        const ref = doc(db, "artifacts", appId, "public", "settings", "ticker");
        await setDoc(ref, { text: text });
        showToast("News Ticker Updated!");
        document.getElementById('marquee-text').textContent = text;
    } catch (error) {
        showToast("Error: " + error.message);
    }
};

async function loadNewsTicker() {
    try {
        const ref = collection(db, "artifacts", appId, "public", "settings");
        const snap = await getDocs(ref);
        snap.forEach(d => {
            if (d.id === 'ticker' && d.data().text) {
                document.getElementById('marquee-text').textContent = d.data().text;
            }
        });
    } catch (e) {
        console.log("Ticker load error:", e);
    }
}

/* ================= TOAST NOTIFICATION ================= */

window.showToast = (msg) => {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

/* ================= SHOP STATUS ================= */

let adminStatusMode = 'auto';

window.setAdminStatus = (mode) => {
    adminStatusMode = mode;
    document.getElementById('admin-status-text').innerText = "Current Mode: " + mode.toUpperCase();
    updateShopStatus();
    showToast("Shop status set to: " + mode.toUpperCase());
};

function updateShopStatus() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    let isOpen = (hour >= 8 && hour < 20.5);
    if (day === 0) isOpen = false;

    if (adminStatusMode === 'open') isOpen = true;
    if (adminStatusMode === 'closed') isOpen = false;
    
    const badges = [document.getElementById('shop-status'), document.getElementById('mobile-shop-status')];
    
    badges.forEach(badge => {
        if(!badge) return;
        if (isOpen) {
            badge.className = "px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 bg-green-100 text-green-700 border-green-200";
            badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> अभी खुला है`;
        } else {
            badge.className = "px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 bg-red-100 text-red-700 border-red-200";
            badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-red-500"></span> अभी बंद है`;
        }
    });
}

updateShopStatus();
setInterval(updateShopStatus, 60000);

/* ================= AI LOGIC ================= */

window.openAiModal = () => {
    const modal = document.getElementById('ai-modal');
    const overlay = document.getElementById('ai-modal-overlay');
    
    if (!modal || !overlay) {
        console.error("AI Modal elements not found in DOM");
        if(window.showToast) window.showToast("AI सिस्टम लोड नहीं हो सका, पेज रिफ्रेश करें।");
        return;
    }

    modal.style.display = 'flex';
    overlay.style.display = 'block';
};

window.closeAiModal = () => {
    const modal = document.getElementById('ai-modal');
    const overlay = document.getElementById('ai-modal-overlay');
    
    if (modal) modal.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
};

window.switchAiTab = (tab) => {
    const chatContent = document.getElementById('content-chat');
    const letterContent = document.getElementById('content-letter');
    const chatTab = document.getElementById('tab-chat');
    const letterTab = document.getElementById('tab-letter');

    if(tab === 'chat') {
        chatContent.classList.remove('hidden');
        letterContent.classList.add('hidden');
        chatTab.className = "flex-1 py-3 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 transition-colors";
        letterTab.className = "flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors";
    } else {
        chatContent.classList.add('hidden');
        letterContent.classList.remove('hidden');
        letterContent.style.display = "flex";
        
        chatTab.className = "flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors";
        letterTab.className = "flex-1 py-3 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 transition-colors";
    }
};

// Chat Logic
window.handleChatEnter = (e) => {
    if(e.key === 'Enter') window.sendChatMessage();
};

window.sendChatMessage = async () => {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if(!message) return;

    appendMessage(message, 'user');
    input.value = '';

    const loadingId = appendLoading();

    try {
        const responseText = await callBackendAi(message);
        removeLoading(loadingId);
        appendMessage(responseText, 'ai');
    } catch (error) {
        removeLoading(loadingId);
        appendMessage("माफ़ कीजिये, अभी सर्वर व्यस्त है। कृपया थोड़ी देर बाद प्रयास करें।", 'ai');
        console.error(error);
    }
};

function appendMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender === 'user' ? 'chat-user' : 'chat-ai'}`;
    div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function appendLoading() {
    const container = document.getElementById('chat-messages');
    const id = 'loading-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = "chat-bubble chat-ai flex gap-1 items-center py-4";
    div.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeLoading(id) {
    const el = document.getElementById(id);
    if(el) el.remove();
}

async function callBackendAi(userQuery) {
    const serviceList = Object.values(finalServices);
    const contextData = JSON.stringify(serviceList.map(s => ({ title: s.title, fee: s.fee, docs: s.docs, time: s.time })));
    
    const systemPrompt = `You are a helpful AI assistant for 'Rohit Jan Seva Kendra' (a CSC center). 
    Your name is 'Sahayak'. You speak primarily in Hindi (using Devanagari script).
    
    Here is the list of services we provide with their details:
    ${contextData}

    Rules:
    1. Answer questions about fees, documents, and time based strictly on the provided data.
    2. If a user asks about a service not in the list, say we might not offer it but they can call 9125471187 to confirm.
    3. Keep answers concise, polite and helpful.
    4. If asked about shop timing, say 8:30 AM to 8:30 PM.
    5. Use formatting like bullet points for lists.`;

    try {
        const res = await fetch('/api/ai-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: userQuery,
                context: systemPrompt
            })
        });

        if (!res.ok) throw new Error("API Error: " + res.status);

        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    } catch (error) {
        console.error("Backend Call Failed:", error);
        if (window.location.hostname.includes('usercontent') || window.location.protocol === 'blob:') {
            return "⚠️ **नोट:** मैं अभी Preview मोड में हूँ। असली AI जवाब के लिए कृपया इस ऐप को Vercel पर Deploy करें। (Backend '/api/ai-chat' अभी उपलब्ध नहीं है)।";
        }
        throw error;
    }
}

// Letter Writer Logic
window.generateLetter = async () => {
    const subject = document.getElementById('letter-subject').value;
    const name = document.getElementById('letter-name').value;
    
    if(!subject || !name) {
        showToast("कृपया विषय और नाम भरें।");
        return;
    }

    const btn = document.querySelector('#content-letter button');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> लिख रहा हूँ...`;
    btn.disabled = true;
    lucide.createIcons();

    try {
        const prompt = `Write a formal application letter in Hindi.
        Sender Name: ${name}
        Subject/Reason: ${subject}
        
        The letter should be formal, addressed to the appropriate authority (Bank Manager, Police Station In-charge, or District Magistrate based on the subject).
        Include placeholders like [Date] or [Account Number] where necessary.
        Do not include any explanations, just the letter body.`;

        try {
            const res = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: prompt,
                    context: "You are a professional letter writer."
                })
            });

            if (!res.ok) throw new Error("API Error");

            const data = await res.json();
            const letter = data.candidates?.[0]?.content?.parts?.[0]?.text;

            document.getElementById('letter-output').value = letter;
            document.getElementById('letter-output-container').classList.remove('hidden');
        } catch (error) {
            if (window.location.hostname.includes('usercontent') || window.location.protocol === 'blob:') {
                document.getElementById('letter-output').value = "⚠️ Preview Mode: Backend API unavailable. Deploy to Vercel to use AI Letter Writer.";
                document.getElementById('letter-output-container').classList.remove('hidden');
            } else {
                throw error;
            }
        }

    } catch (error) {
        showToast("Error generating letter. Please try again.");
        console.error(error);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
        lucide.createIcons();
    }
};

window.copyLetter = () => {
    const text = document.getElementById('letter-output');
    text.select();
    document.execCommand('copy');
    showToast("पत्र कॉपी कर लिया गया!");
};

/* ================= FALLING IMAGES ================= */

document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "images/image1.png", "images/image2.png", "images/image3.jpg",
        "images/image4.png", "images/image5.jpg", "images/image6.jpg",
        "images/image7.jpg", "images/image8.jpg", "images/image9.png",
        "images/image10.jpg", "images/image11.jpg", "images/image12.jpg",
        "images/image13.jpg", "images/image14.jpg", "images/image15.jpg",
        "images/image16.jpg", "images/image17.png", "images/image18.png",
        "images/image19.jpg", "images/image20.png"
    ];

    const container = document.getElementById("falling-container");
    if (!container) return;

    let index = 0;

    function showFallingImage() {
        const img = document.createElement("img");
        img.src = images[index];
        img.className = "falling-item";
        img.alt = "Partner Logo";
        
        img.onerror = () => {
            img.remove();
            index = (index + 1) % images.length;
        };

        container.innerHTML = "";
        container.appendChild(img);

        index = (index + 1) % images.length;
    }

    showFallingImage();
    setInterval(showFallingImage, 4000);
});

/* ================= INTRO POPUP ================= */

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("intro-popup");
    if (!popup) return;

    popup.addEventListener("click", () => {
        popup.style.display = "none";
    });
});

/* ================= START APP ================= */
initApp();
loadNewsTicker();
