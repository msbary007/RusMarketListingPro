// RusMarket Listing Pro - Unified Main Logic
let currentLang = "EN";
let currentReportData = null;
let examplesData = [];

const i18n = {
    EN: {
        appSubtitle: "AI-Powered Optimization for Russian E-commerce",
        loadExample: "📋 Load Example Listing",
        examplePlaceHolder: "Select an example...",
        descriptionLabel: "Product Description",
        placeholderText: "Paste your Russian listing here...",
        category: "Category",
        catElectronics: "Electronics & Gadgets",
        catClothing: "Clothing & Fashion",
        catCosmetics: "Beauty & Cosmetics",
        catHousehold: "Home & Household",
        catGeneral: "General Analysis",
        analyzeBtn: "Analyze & Optimize",
        analyzing: "Analyzing...",
        origScoreLabel: "Original Score",
        optScoreLabel: "Optimized Score",
        tabOrig: "Original",
        tabOpt: "Optimized",
        tabErr: "Grammar Fixes",
        trustLabel: "✨ Trust Signals",
        chatTitle: "🤖 AI Assistant",
        startMsg: "Привет! I'm ready to help with your listing.",
        btnSend: "Send",
        chatPlaceholder: "Type your message...",
        btnCopy: "Copy",
        downloadJson: "Download JSON Report",
        emptyMsg: "No text to analyze. Please paste a Russian listing above.",
        copyMsg: "Copied!",
        typingText: "AI is typing...",
        errorOriginalPhrase: "Original:",
        errorSuggestedCorrection: "Correction:",
        errorType: "Type:",
        errorAnalyzing: "Error analyzing text.",
        noErrors: "✨ No errors found!"
    },
    RU: {
        appSubtitle: "AI-оптимизация описаний для площадок РФ",
        loadExample: "📋 Пример описания",
        examplePlaceHolder: "Выберите пример...",
        descriptionLabel: "Описание товара",
        placeholderText: "Вставьте текст объявления на русском...",
        category: "Категория",
        catElectronics: "Электроника и гаджеты",
        catClothing: "Одежда и мода",
        catCosmetics: "Красота и косметика",
        catHousehold: "Дом и быт",
        catGeneral: "Общий анализ",
        analyzeBtn: "Анализировать",
        analyzing: "Анализируем...",
        origScoreLabel: "Исходная оценка",
        optScoreLabel: "Оптимальная оценка",
        tabOrig: "Оригинал",
        tabOpt: "Оптимизация",
        tabErr: "Правки",
        trustLabel: "✨ Сигналы доверия",
        chatTitle: "🤖 ИИ Помощник",
        startMsg: "Привет! Я готов помочь с вашим объявлением.",
        btnSend: "Отправить",
        chatPlaceholder: "Введите сообщение...",
        btnCopy: "Копировать",
        downloadJson: "Скачать JSON отчет",
        emptyMsg: "Нет текста для анализа. Вставьте текст выше.",
        copyMsg: "Скопировано!",
        typingText: "ИИ печатает...",
        errorOriginalPhrase: "Оригинал:",
        errorSuggestedCorrection: "Исправление:",
        errorType: "Тип:",
        errorAnalyzing: "Ошибка при анализе текста.",
        noErrors: "✨ Ошибок не найдено!"
    },
    TR: {
        appSubtitle: "Rusya E-ticareti için Yapay Zeka Destekli Optimizasyon",
        loadExample: "📋 Örnek Yükle",
        examplePlaceHolder: "Bir örnek seçin...",
        descriptionLabel: "Ürün Açıklaması",
        placeholderText: "Rusça ürün metnini buraya girin...",
        category: "Kategori",
        catElectronics: "Elektronik ve Gadget'lar",
        catClothing: "Giyim ve Moda",
        catCosmetics: "Güzellik ve Kozmetik",
        catHousehold: "Ev ve Ev Eşyaları",
        catGeneral: "Genel Analiz",
        analyzeBtn: "Analiz Et ve Optimize Et",
        analyzing: "Analiz ediliyor...",
        origScoreLabel: "Orijinal Puan",
        optScoreLabel: "Optimize Edilmiş Puan",
        tabOrig: "Orijinal",
        tabOpt: "Optimize Edilmiş",
        tabErr: "Dilbilgisi Düzeltmeleri",
        trustLabel: "✨ Güven Sinyalleri",
        chatTitle: "🤖 Yapay Zeka Asistanı",
        startMsg: "Merhaba! İlanınıza yardımcı olmaya hazırım.",
        btnSend: "Gönder",
        chatPlaceholder: "Mesajınızı yazın...",
        btnCopy: "Kopyala",
        downloadJson: "JSON Raporunu İndir",
        emptyMsg: "Analiz edilecek metin yok. Lütfen yukarıya Rusça bir ilan yapıştırın.",
        copyMsg: "Kopyalandı!",
        typingText: "Yapay zeka yazıyor...",
        errorOriginalPhrase: "Orijinal:",
        errorSuggestedCorrection: "Düzeltme:",
        errorType: "Tür:",
        errorAnalyzing: "Metin analiz edilirken hata oluştu.",
        noErrors: "✨ Hata bulunamadı!"
    },
    ZH: {
        appSubtitle: "俄罗斯电子商务的 AI 驱动优化",
        loadExample: "📋 加载示例列表",
        examplePlaceHolder: "选择一个示例...",
        descriptionLabel: "产品描述",
        placeholderText: "在此处粘贴您的俄语列表...",
        category: "类别",
        catElectronics: "电子与小工具",
        catClothing: "服装与时尚",
        catCosmetics: "美容与化妆品",
        catHousehold: "家居与家政",
        catGeneral: "综合分析",
        analyzeBtn: "分析并优化",
        analyzing: "分析中...",
        origScoreLabel: "原始得分",
        optScoreLabel: "优化后得分",
        tabOrig: "原文",
        tabOpt: "优化后",
        tabErr: "语法修复",
        trustLabel: "✨ 信任信号",
        chatTitle: "🤖 AI 助手",
        startMsg: "你好！我准备好为您的列表提供帮助了。",
        btnSend: "发送",
        chatPlaceholder: "输入您的消息...",
        btnCopy: "复制",
        downloadJson: "下载 JSON 报告",
        emptyMsg: "没有可分析的文本。请在上方粘贴俄语列表。",
        copyMsg: "已复制！",
        typingText: "AI 正在输入...",
        errorOriginalPhrase: "原文:",
        errorSuggestedCorrection: "修改建议:",
        errorType: "类型:",
        errorAnalyzing: "分析文本时出错。",
        noErrors: "✨ 未发现错误！"
    },
    BN: {
        appSubtitle: "রাশিয়ান ই-কমার্সের জন্য এআই অপ্টিমাইজেশন",
        loadExample: "📋 উদাহরণ লোড করুন",
        examplePlaceHolder: "একটি নির্বাচন করুন...",
        descriptionLabel: "পণ্যের বিবরণ",
        placeholderText: "এখানে রাশিয়ান লিস্টিং টেক্সট লিখুন...",
        category: "বিভাগ",
        catElectronics: "ইলেকট্রনিক্স",
        catClothing: "পোশাক",
        catCosmetics: "প্রসাধনী",
        catHousehold: "গৃহস্থালি",
        catGeneral: "সাধারণ বিশ্লেষণ",
        analyzeBtn: "বিশ্লেষণ করুন",
        analyzing: "বিশ্লেষণ করা হচ্ছে...",
        origScoreLabel: "মূল স্কোর",
        optScoreLabel: "উন্নত স্কোর",
        tabOrig: "মূল",
        tabOpt: "উন্নত",
        tabErr: "সংশোধন",
        trustLabel: "✨ বিশ্বাসযোগ্যতা সংকেত",
        chatTitle: "🤖 এআই সহকারী",
        startMsg: "হ্যালো! আমি সাহায্য করতে প্রস্তুত।",
        btnSend: "পাঠান",
        chatPlaceholder: "আপনার বার্তা লিখুন...",
        btnCopy: "কপি",
        downloadJson: "JSON রিপোর্ট ডাউনলোড",
        emptyMsg: "বিশ্লেষণের জন্য কোনো পাঠ্য নেই।",
        copyMsg: "কপি করা হয়েছে!",
        typingText: "এআই টাইপ করছে...",
        errorOriginalPhrase: "আসল বাক্য:",
        errorSuggestedCorrection: "সংশোধিত প্রস্তাবনা:",
        errorType: "ধরন:",
        errorAnalyzing: "টেক্সট বিশ্লেষণ করতে ত্রুটি।",
        noErrors: "✨ কোনো ত্রুটি পাওয়া যায়নি!"
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
    });

    if (lang === 'BN') document.getElementById('body').classList.add('bn');
    else document.getElementById('body').classList.remove('bn');

    const dict = i18n[lang];

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    // Handle initial state if empty
    if (document.getElementById('text-input').value === '') {
        showEmptyState();
    }
}

function showEmptyState() {
    const dict = i18n[currentLang];
    document.getElementById('original-text').innerText = '';
    document.getElementById('optimized-text').innerText = '';
    document.getElementById('score-original').innerText = '0';
    document.getElementById('score-optimized').innerText = '0';
    document.getElementById('bar-original').style.width = '0%';
    document.getElementById('bar-optimized').style.width = '0%';
    document.getElementById('errors-list').innerHTML = `
        <div class="empty-state">
            <div style="font-size: 48px;">📝</div>
            <p>${dict.emptyMsg}</p>
        </div>
    `;
    document.getElementById('trust-signals').innerHTML = '';
}

// Global scope functions for HTML onclicks
window.setLanguage = setLanguage;

window.openTab = function(evt, tabName) {
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
};

window.copyToClipboard = function(elementId) {
    const el = document.getElementById(elementId);
    const text = el.innerText || el.value;
    navigator.clipboard.writeText(text).then(() => {
        showToast(i18n[currentLang].copyMsg);
    });
};

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2000);
}

window.downloadFullReport = function() {
    if (!currentReportData) {
        alert(i18n[currentLang].emptyMsg);
        return;
    }
    const blob = new Blob([JSON.stringify(currentReportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RM_Report.json';
    a.click();
    URL.revokeObjectURL(url);
};

// Chat Logic
window.handleChatSend = function() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    addChatMessage(msg, 'user');
    input.value = '';

    const typing = showTypingIndicator();
    
    // Simulate AI response based on context
    setTimeout(() => {
        typing.remove();
        const advice = getContextualAdvice(msg);
        addChatMessage(advice, 'ai');
    }, 1000);
};

function addChatMessage(text, sender) {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    div.innerHTML = `<div>${text}</div><span class="message-time">${time}</span>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showTypingIndicator() {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'typing';
    div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
}

function getContextualAdvice(msg) {
    const dict = i18n[currentLang];
    const text = msg.toLowerCase();
    const score = parseInt(document.getElementById('score-optimized').innerText) || 0;
    
    if (text.includes('score') || text.includes('балл') || text.includes('স্কোর')) {
        if (score < 70) return "Ваш балл можно улучшить! Попробуйте добавить ключевые слова: 'оригинал', 'гарантия'.";
        return "Ваше описание выглядит отлично! Оно должно привлечь покупателей.";
    }
    
    return "Я готов помочь с анализом! Просто нажмите кнопку 'Анализировать'.";
}

// Initial Setup
document.addEventListener('DOMContentLoaded', async () => {
    setLanguage('RU'); // Default to RU as per original

    // Word/Char count listeners
    const textInput = document.getElementById('text-input');
    textInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        const words = val ? val.split(/\s+/).length : 0;
        document.getElementById('wordCount').innerText = `Words: ${words} | Characters: ${val.length}`;
    });

    // Form Submission
    const form = document.getElementById('optimizeForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('analyzeBtn');
        const originalBtnText = btn.innerText;
        
        const text = textInput.value.trim();
        const category = document.getElementById('category-select').value;

        if (!text) {
            alert(i18n[currentLang].emptyMsg);
            return;
        }

        // Set Loading
        btn.innerHTML = `<span class="btn-content"><span class="spinner"></span><span>${i18n[currentLang].analyzing}</span></span>`;
        btn.disabled = true;

        try {
            const res = await fetch('/api/optimize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, category })
            });

            if (res.ok) {
                const data = await res.json();
                currentReportData = data;

                // Update UI
                document.getElementById('original-text').innerText = data.original;
                document.getElementById('optimized-text').innerText = data.optimized;
                
                updateScore('score-original', 'bar-original', data.persuasion_score_original);
                updateScore('score-optimized', 'bar-optimized', data.persuasion_score_optimized);

                renderErrors(data.errors);
                renderTrustSignals(data.trust_signals_added);

                showToast("Success!");
            } else {
                throw new Error("API Failure");
            }
        } catch (err) {
            console.error(err);
            alert(i18n[currentLang].errorAnalyzing);
        } finally {
            btn.innerText = originalBtnText;
            btn.disabled = false;
        }
    });

    // Populate Examples
    try {
        const res = await fetch('/api/examples');
        if (res.ok) {
            examplesData = await res.json();
            const exSelect = document.getElementById('example-select');
            examplesData.forEach((ex, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = `[${ex.category}] ${ex.text.substring(0, 40)}...`;
                exSelect.appendChild(opt);
            });

            exSelect.addEventListener('change', (e) => {
                const ex = examplesData[e.target.value];
                if (ex) {
                    textInput.value = ex.text;
                    document.getElementById('category-select').value = ex.category;
                    textInput.dispatchEvent(new Event('input'));
                }
            });
        }
    } catch (e) {
        console.error("Failed to load examples", e);
    }
});

function updateScore(scoreId, barId, val) {
    document.getElementById(scoreId).innerText = val;
    const bar = document.getElementById(barId);
    bar.style.width = val + '%';
    
    // Color mapping
    const el = document.getElementById(scoreId);
    el.classList.remove('score-high', 'score-medium', 'score-low');
    if (val >= 80) el.classList.add('score-high');
    else if (val >= 50) el.classList.add('score-medium');
    else el.classList.add('score-low');
}

function renderErrors(errors) {
    const list = document.getElementById('errors-list');
    const dict = i18n[currentLang];
    
    if (!errors || errors.length === 0) {
        list.innerHTML = `<div class="empty-state">✨ <p>${dict.noErrors}</p></div>`;
        return;
    }

    list.innerHTML = errors.map(err => `
        <div class="error-item">
            <div><strong>${dict.errorOriginalPhrase}</strong> <span>${err.original_phrase}</span></div>
            <div><strong>${dict.errorSuggestedCorrection}</strong> <span>${err.suggested_correction}</span></div>
            <div style="font-size: 13px; color: #666; margin-top: 5px;">${err.explanation_ru}</div>
        </div>
    `).join('');
}

function renderTrustSignals(signals) {
    const box = document.getElementById('trust-signals');
    if (!signals || signals.length === 0) {
        box.innerHTML = '';
        return;
    }
    box.innerHTML = signals.map(s => `<span class="trust-badge">${s}</span>`).join('');
}
