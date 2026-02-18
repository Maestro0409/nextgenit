document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('.nav-item');
    const globalBg = document.querySelector('.global-bg');

    // Elements to animate/parallax
    const clouds = document.querySelectorAll('.nebula-cloud');
    const astronaut = document.querySelector('.floating-astronaut');
    const slideContent = document.querySelectorAll('.content-wrapper');

    let currentSlideIndex = 0;
    let isAnimating = false;
    let lastScrollTime = 0;

    // --- Translations ---
    const translations = {
        en: {
            nav_home: "HOME",
            nav_services: "SERVICES",
            nav_cloud: "CLOUD",
            nav_security: "SECURITY",
            btn_quote: "GET QUOTE",
            hero_subtitle: "DIGITAL EVOLUTION",
            hero_title: "NEXT GEN<br><span class='text-neon-blue'>WEB & AI</span>",
            hero_desc: "Premium websites, intelligent automation, and custom CRM solutions. We build the future of your business.",
            hero_cta: "LAUNCH MISSION",
            services_title: "OUR <span class='text-neon-blue'>EXPERTISE</span>",
            srv_web_title: "PREMIUM WEB",
            srv_web_desc: "High-performance websites with stunning visuals. We combine aesthetics with robust functionality to captivate your audience.",
            srv_crm_title: "CUSTOM CRM",
            srv_crm_desc: "Tailored CRM systems to manage your clients and sales pipeline. Automate your business logic and save time.",
            srv_bot_title: "TELEGRAM BOTS",
            srv_bot_desc: "Interactive bots for support, sales, and community management. Automate interactions directly in your messenger.",
            srv_ai_title: "AI AUTOMATION",
            srv_ai_desc: "Integrate LLMs and smart agents into your workflow. From content generation to intelligent data analysis.",
            recent_work_title: "RECENT <span class='text-neon-pink'>WORK</span>",
            footer_copyright: "&copy; 2026 NexGen IT. All rights reserved. Transforming the future.",
            modal_title: "INITIATE <span class='text-neon-blue'>CONTACT</span>",
            lbl_name: "IDENTIFIER (NAME)",
            lbl_email: "COMMUNICATION CHANNEL (EMAIL)",
            lbl_objective: "OBJECTIVE",
            btn_transmit: "TRANSMIT DATA"
        },
        ru: {
            nav_home: "ГЛАВНАЯ",
            nav_services: "УСЛУГИ",
            nav_cloud: "ОБЛАКО",
            nav_security: "БЕЗОПАСНОСТЬ",
            btn_quote: "ЗАКАЗАТЬ",
            hero_subtitle: "ЦИФРОВАЯ ЭВОЛЮЦИЯ",
            hero_title: "НОВОЕ ПОКОЛЕНИЕ<br><span class='text-neon-blue'>WEB & AI</span>",
            hero_desc: "Премиальные сайты, интеллектуальная автоматизация и кастомные CRM. Мы строим будущее вашего бизнеса.",
            hero_cta: "ЗАПУСТИТЬ МИССИЮ",
            services_title: "НАША <span class='text-neon-blue'>ЭКСПЕРТИЗА</span>",
            srv_web_title: "ПРЕМИУМ ВЕБ",
            srv_web_desc: "Высокопроизводительные сайты с потрясающим визуалом. Эстетика и функциональность для захвата аудитории.",
            srv_crm_title: "КАСТОМНЫЕ CRM",
            srv_crm_desc: "CRM-системы под ваши задачи. Автоматизируйте бизнес-логику и экономьте время.",
            srv_bot_title: "ТЕЛЕГРАМ БОТЫ",
            srv_bot_desc: "Интерактивные боты для поддержки и продаж. Автоматизация прямо в мессенджере.",
            srv_ai_title: "AI АВТОМАТИЗАЦИЯ",
            srv_ai_desc: "Интеграция LLM и умных агентов. От генерации контента до анализа данных.",
            recent_work_title: "НЕДАВНИЕ <span class='text-neon-pink'>РАБОТЫ</span>",
            footer_copyright: "&copy; 2026 NexGen IT. Все права защищены. Трансформируем будущее.",
            modal_title: "НАЧАТЬ <span class='text-neon-blue'>СВЯЗЬ</span>",
            lbl_name: "ИДЕНТИФИКАТОР (ИМЯ)",
            lbl_email: "КАНАЛ СВЯЗИ (EMAIL)",
            lbl_objective: "ЦЕЛЬ",
            btn_transmit: "ПЕРЕДАТЬ ДАННЫЕ"
        }
    };

    let currentLang = 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Update active class on switcher
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
        document.getElementById('lang-ru').classList.toggle('active', lang === 'ru');
    }

    // Event Listeners for Language Switch
    const langEnBtn = document.getElementById('lang-en');
    const langRuBtn = document.getElementById('lang-ru');

    if (langEnBtn && langRuBtn) {
        langEnBtn.addEventListener('click', () => updateLanguage('en'));
        langRuBtn.addEventListener('click', () => updateLanguage('ru'));
    }

    // --- Subtle Parallax Effect ---
    // User Requirement: "Mouse should not stick. Background should move slightly."
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2);

        // Very subtle movement for the global background/clouds (Speed 0.02)
        // Clouds removed for video background

        // Slightly more movement for the astronaut (Speed 0.03)
        // Astronaut removed

        // Parallax for active slide content (Speed 0.01 - very subtle)
        const activeContent = slides[currentSlideIndex].querySelector('.content-wrapper');
        if (activeContent) {
            gsap.to(activeContent, {
                x: x * 0.01,
                y: y * 0.01,
                duration: 1,
                ease: 'power1.out'
            });
        }
    });

    // --- Slider Logic ---
    function changeSlide(index) {
        if (index === currentSlideIndex || isAnimating) return;
        if (index < 0 || index >= slides.length) return; // Bounds check

        isAnimating = true;

        const nextSlide = slides[index];
        const currentSlide = slides[currentSlideIndex];

        // Update Nav
        navItems.forEach(item => item.classList.remove('active'));
        navItems[index].classList.add('active');

        // Animation Timeline
        const tl = gsap.timeline({
            onComplete: () => {
                currentSlide.classList.remove('active');
                currentSlideIndex = index;
                isAnimating = false;
            }
        });

        // Animate OUT current slide content
        const currentContent = currentSlide.querySelector('.content-wrapper');
        tl.to(currentContent, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        });

        // Slight interaction with background on slide change (Neon Pulse/Shift)
        // Move clouds slightly to simulate travel
        tl.to(globalBg, {
            scale: 1.05,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut"
        }, "<");

        // Animate OUT current slide container
        tl.to(currentSlide, {
            opacity: 0,
            duration: 0.5
        }, "<");

        // Prepare Next Slide
        nextSlide.classList.add('active');
        gsap.set(nextSlide, { opacity: 0 });

        const nextContent = nextSlide.querySelector('.content-wrapper');
        gsap.set(nextContent, { y: 50, opacity: 0 });

        // Animate IN next slide
        tl.to(nextSlide, {
            opacity: 1,
            duration: 0.5
        });

        // Animate IN next content
        tl.to(nextContent, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.3");

        // --- Video Switching Logic ---
        const video0 = document.getElementById('video-0');
        const video1 = document.getElementById('video-1');

        // Remove active class from all videos first
        // video0.classList.remove('active');
        // video1.classList.remove('active');

        // Logic: Slide 1 (index 1) gets Video 1, others get Video 0
        if (index === 1) {
            video0.classList.remove('active');
            video1.classList.add('active');
        } else {
            video1.classList.remove('active');
            video0.classList.add('active');
        }
    }

    // --- Scroll Interaction ---
    // Disabled to allow page scrolling to new sections.
    // window.addEventListener('wheel', (e) => { ... });

    // Nav Click Events
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            changeSlide(index);
        });
    });

    // --- Button & Modal Interactions ---
    const modal = document.getElementById('contactModal');
    const btnQuote = document.querySelector('.btn-quote');
    const closeModal = document.querySelector('.close-modal');

    // Open Modal Function
    function openModal(e) {
        if (e) e.preventDefault();
        modal.classList.add('active');
    }

    // Close Modal Function
    function closeModalFunc() {
        modal.classList.remove('active');
    }

    // Nav "GET QUOTE"
    if (btnQuote) btnQuote.addEventListener('click', openModal);

    // Close Button
    if (closeModal) closeModal.addEventListener('click', closeModalFunc);

    // Close on Outside Click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalFunc();
        });
    }

    // Slide 1 "LAUNCH MISSION" -> Go to Slide 2
    const btnLaunch = document.querySelector('#slide-0 .btn-neon');
    if (btnLaunch) {
        btnLaunch.addEventListener('click', (e) => {
            e.preventDefault();
            changeSlide(1); // Go to Development Slide
        });
    }

    // Other Slide Buttons -> Open Modal
    const serviceButtons = document.querySelectorAll('#slide-1 .btn-neon, #slide-2 .btn-neon, #slide-3 .btn-neon');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // --- Bottom Info Slider Logic ---
    const infoTrack = document.querySelector('.info-track');
    const infoCards = document.querySelectorAll('.info-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Config
    // const cardWidth = 350 + 30; // Width + Gap (approximate, better to measure)
    let scrollPosition = 0;

    function moveSlider(direction) {
        if (!infoTrack || infoCards.length === 0) return;

        const cardStyle = window.getComputedStyle(infoCards[0]);
        const cardWidth = infoCards[0].offsetWidth + parseInt(window.getComputedStyle(infoTrack).gap || 30);
        const maxScroll = -(infoCards.length * cardWidth - infoTrack.parentElement.offsetWidth);

        if (direction === 'next') {
            scrollPosition -= cardWidth;
        } else {
            scrollPosition += cardWidth;
        }

        // Bounds check (Simple version: infinite scroll logic is complex, so we stick to stops)
        // Or loop? Let's just clamp for now to ensure reliability.
        if (scrollPosition > 0) scrollPosition = 0;
        // Allow overscrolling slightly? No, clamp to max.
        // Approx max scroll check needs container width which varies.
        // We'll just check if we've scrolled past the total width.

        const containerWidth = document.querySelector('.info-slider-container').offsetWidth;
        const totalWidth = infoCards.length * cardWidth;

        if (-scrollPosition > (totalWidth - containerWidth)) {
            // Loop back to start or stop?
            // Let's loop back to start for smooth UX
            scrollPosition = 0;
        }

        gsap.to(infoTrack, {
            x: scrollPosition,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => moveSlider('next'));
        prevBtn.addEventListener('click', () => moveSlider('prev'));
    }

    // --- WALL-E Chatbot Logic ---
    const walleBtn = document.getElementById('walleBtn');
    const walleChatWindow = document.getElementById('walleChatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');

    function toggleChat() {
        walleChatWindow.classList.toggle('active');
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // WARNING: Replace with your actual Google Gemini API Key
    const GEMINI_API_KEY = "AIzaSyCEbOCj1kpW1-IgZUeuvbEQov1fWqINKbs";
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    async function callGeminiAPI(userMessage) {
        // System Prompt tailored for Sales & Lead Gen
        const systemPrompt = `
        You are WALL-E, a Sales Manager for NextGen IT Solutions.
        Current Language: ${currentLang.toUpperCase()} (Reply in this language).
        
        Your Goal: Help the client and collect their details to generate a project report.
        
        Steps:
        1. Answer questions about our services:
           - Premium Web Development
           - Custom CRM Systems
           - Telegram Bots
           - AI Automation
        2. If the user expresses interest, ask for:
           - Name
           - Contact Info (Email or Phone)
           - Brief Project Details
        3. Once you have ALL three (Name, Contact, Details), confirm with the user.
        4. If verified, output EXACTLY this tag at the end of your message: [GENERATE_REPORT: { "name": "...", "contact": "...", "details": "..." }]
        
        Keep responses concise and professional.
        `;

        try {
            const response = await fetch(GEMINI_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: systemPrompt + "\n\nUser: " + userMessage
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            let botReply = data.candidates[0].content.parts[0].text;

            // Check for Report Generation Trigger
            // Regex to find [GENERATE_REPORT: {...}]
            const reportMatch = botReply.match(/\[GENERATE_REPORT: (\{.*\})\]/);

            if (reportMatch) {
                try {
                    const reportData = JSON.parse(reportMatch[1]);
                    // Clean the tag from the message shown to user
                    botReply = botReply.replace(reportMatch[0], "").trim();

                    // Trigger Email Logic
                    generateEmailReport(reportData);

                    botReply += "\n\n(Opening your email client with the report...)";
                } catch (e) {
                    console.error("Error parsing report JSON", e);
                }
            }

            return botReply;

        } catch (error) {
            console.error("Gemini API Error:", error);
            return `Error: Unable to connect to mainframe. Details: ${error.message}`;
        }
    }

    function generateEmailReport(data) {
        const subject = `New Lead: ${data.name} - ${data.details.substring(0, 30)}...`;
        const body = `
PROJECT REPORT - NEXTGEN IT
---------------------------
CLIENT NAME: ${data.name}
CONTACT: ${data.contact}

PROJECT DETAILS:
${data.details}

---------------------------
Generated by WALL-E AI Agent
        `;

        const mailtoLink = `mailto:info@nexgen.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open in new tab/window
        window.open(mailtoLink, '_blank');
    }

    async function handleSendMessage() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';

            // Show typing indicator
            const loadingMsg = document.createElement('div');
            loadingMsg.classList.add('message', 'bot-message');
            loadingMsg.textContent = "Processing...";
            loadingMsg.id = "temp-loading";
            chatMessages.appendChild(loadingMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Call API
            const response = await callGeminiAPI(text);

            // Remove loading message
            const tempLoading = document.getElementById("temp-loading");
            if (tempLoading) tempLoading.remove();

            addMessage(response, 'bot');
        }
    }

    if (walleBtn) {
        walleBtn.addEventListener('click', toggleChat);
        closeChatBtn.addEventListener('click', toggleChat);

        sendMessageBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

});
