/**
 * Free Fire Diamonds Generator - Light/Dark Theme Switcher & AdBlueMedia Integration
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic (Light Default vs Dark Toggle) ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    const initTheme = () => {
        const savedTheme = localStorage.getItem('ff_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<span>☀️</span> <span>الوضع الفاتح</span>';
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggleBtn) themeToggleBtn.innerHTML = '<span>🌙</span> <span>الوضع الداكن</span>';
        }
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('ff_theme', isDark ? 'dark' : 'light');
            themeToggleBtn.innerHTML = isDark ? '<span>☀️</span> <span>الوضع الفاتح</span>' : '<span>🌙</span> <span>الوضع الداكن</span>';
        });
    }

    initTheme();

    // --- Generator State Variables ---
    let currentStep = 1;
    let selectedDevice = 'Android';
    let selectedDiamonds = '10,800';
    let playerID = '';

    // --- DOM Elements ---
    const modalOverlay = document.getElementById('generatorModal');
    const openModalBtns = document.querySelectorAll('.trigger-modal');
    const closeModalBtn = document.getElementById('closeModal');

    const stepIndicators = document.querySelectorAll('.step-indicator');
    const wizardSteps = document.querySelectorAll('.wizard-step');

    const inputPlayerID = document.getElementById('playerIdInput');
    const deviceCards = document.querySelectorAll('.device-card');
    const packageCards = document.querySelectorAll('.package-card');

    const btnNextStep1 = document.getElementById('btnNextStep1');
    const btnStartGenerator = document.getElementById('btnStartGenerator');
    const btnTriggerLocker = document.getElementById('btnTriggerLocker');
    const btnVerifyOffers = document.getElementById('btnVerifyOffers');
    const btnResetGenerator = document.getElementById('btnResetGenerator');

    const terminalProcessingView = document.getElementById('terminalProcessingView');
    const serverErrorCard = document.getElementById('serverErrorCard');
    const terminalBox = document.getElementById('terminalBox');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercent = document.getElementById('progressPercent');

    const liveToast = document.getElementById('liveToast');
    const toastFlag = document.getElementById('toastFlag');
    const toastUser = document.getElementById('toastUser');
    const toastAmount = document.getElementById('toastAmount');
    const toastTime = document.getElementById('toastTime');

    // --- Modal Controls ---
    const openModal = () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // --- Step Navigation Helper ---
    const goToStep = (stepNumber) => {
        currentStep = stepNumber;
        wizardSteps.forEach((step, idx) => {
            if (idx + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        stepIndicators.forEach((ind, idx) => {
            const stepNum = idx + 1;
            ind.classList.remove('active', 'completed');
            if (stepNum === stepNumber) {
                ind.classList.add('active');
            } else if (stepNum < stepNumber) {
                ind.classList.add('completed');
                ind.textContent = '✓';
            } else {
                ind.textContent = stepNum;
            }
        });
    };

    // Make completion callback global for AdBlueMedia script
    window.xfComplete = function() {
        console.log("AdBlueMedia Locker Completed Successfully!");
        goToStep(5);
    };
    window.CPABuildComplete = function() {
        console.log("AdBlueMedia CPABuild Locker Completed!");
        goToStep(5);
    };

    // --- Step 1: Device Selection & Player ID ---
    deviceCards.forEach(card => {
        card.addEventListener('click', () => {
            deviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDevice = card.getAttribute('data-device');
        });
    });

    btnNextStep1.addEventListener('click', () => {
        const val = inputPlayerID.value.trim();
        if (!val || val.length < 5) {
            alert('يرجى إدخال معرف لاعب فري فاير (ID) صحيح يتكون من 6 أرقام على الأقل.');
            inputPlayerID.focus();
            return;
        }
        playerID = val;
        goToStep(2);
    });

    // --- Step 2: Diamonds Package Selection ---
    packageCards.forEach(card => {
        card.addEventListener('click', () => {
            packageCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDiamonds = card.getAttribute('data-amount');
        });
    });

    btnStartGenerator.addEventListener('click', () => {
        goToStep(3);
        startFakeGeneration();
    });

    // --- Step 3: 5-Second Fake Generation & Server Error Card ---
    function startFakeGeneration() {
        terminalProcessingView.style.display = 'block';
        serverErrorCard.style.display = 'none';
        terminalBox.innerHTML = '';
        progressBarFill.style.width = '0%';
        progressPercent.textContent = '0%';

        const logs = [
            `[System] Connecting to official Garena Free Fire API...`,
            `[Auth] Validating Player ID: ${playerID} (${selectedDevice})`,
            `[Database] User profile found. Status: VERIFIED`,
            `[Injection] Preparing package: ${selectedDiamonds} Diamonds + Bonus`,
            `[Security] Encrypting SSL 256-bit Anti-Ban Session...`,
            `[Server] Dispatching diamond tokens to queue...`
        ];

        let progress = 0;
        let logIndex = 0;

        // Terminal text log loop
        const logInterval = setInterval(() => {
            if (logIndex < logs.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.textContent = `> ${logs[logIndex]}`;
                terminalBox.appendChild(line);
                terminalBox.scrollTop = terminalBox.scrollHeight;
                logIndex++;
            }
        }, 750);

        // Progress bar smooth 5-second interval
        const progressInterval = setInterval(() => {
            progress += 2;
            if (progress > 94) {
                progress = 94; // Pause right before completion to trigger error
                clearInterval(progressInterval);
                clearInterval(logInterval);

                // Show Server Congestion Error Card after 5 seconds
                setTimeout(() => {
                    terminalProcessingView.style.display = 'none';
                    serverErrorCard.style.display = 'block';
                }, 400);
            }
            progressBarFill.style.width = `${progress}%`;
            progressPercent.textContent = `${progress}%`;
        }, 100);
    }

    // --- Handle Click on "🔐 اضغط هنا للتحقق واستلام جواهرك" ---
    if (btnTriggerLocker) {
        btnTriggerLocker.addEventListener('click', () => {
            console.log("Triggering AdBlueMedia Locker Script via xfLock()...");
            
            // Invoke official AdBlueMedia locker function
            if (typeof xfLock === 'function') {
                xfLock();
            } else if (typeof CPABuildLock === 'function') {
                CPABuildLock();
            } else if (window.xfContentLocker && typeof window.xfContentLocker.openLocker === 'function') {
                window.xfContentLocker.openLocker();
            } else {
                goToStep(4);
            }
        });
    }

    // Handle verification completion -> Move to Step 5
    if (btnVerifyOffers) {
        btnVerifyOffers.addEventListener('click', () => {
            goToStep(5);
        });
    }

    // Handle Reset Button on Success Screen
    if (btnResetGenerator) {
        btnResetGenerator.addEventListener('click', () => {
            inputPlayerID.value = '';
            goToStep(1);
        });
    }

    // --- FAQ Accordions ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // --- Dynamic Persuasive Live Toast Notification Feed ---
    const fakeUsers = [
        { name: 'محمد العتيبي', id: '8492****21', flag: '🇸🇦', amount: '10,800' },
        { name: 'أحمد الكردي', id: '5920****48', flag: '🇪🇬', amount: '56,000' },
        { name: 'ياسين بن زيمة', id: '3918****05', flag: '🇩🇿', amount: '10,800' },
        { name: 'عمر آل علي', id: '7104****93', flag: '🇦🇪', amount: '56,000' },
        { name: 'سفيان المرابط', id: '2840****17', flag: '🇲🇦', amount: '5,600' },
        { name: 'فهد العازمي', id: '9031****88', flag: '🇰🇼', amount: '10,800' },
        { name: 'علي العراقي', id: '6482****30', flag: '🇮🇶', amount: '2,100' },
        { name: 'حمزة الأردني', id: '1593****66', flag: '🇯🇴', amount: '10,800' }
    ];

    function showLiveToast() {
        if (!liveToast) return;
        const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        const randomSec = Math.floor(Math.random() * 15) + 3;

        if (toastFlag) toastFlag.textContent = randomUser.flag;
        if (toastUser) toastUser.textContent = `${randomUser.name} (ID: ${randomUser.id})`;
        if (toastAmount) toastAmount.textContent = `💎 ${randomUser.amount} جوهرة`;
        if (toastTime) toastTime.textContent = `قبل ${randomSec} ثوانٍ`;

        liveToast.classList.add('active');

        setTimeout(() => {
            liveToast.classList.remove('active');
        }, 4500);
    }

    // Trigger toast periodically
    setTimeout(showLiveToast, 2500);
    setInterval(showLiveToast, 9500);
});
