/**
 * Freefire.vip - Ultra Simple High-Converting CPA Generator Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher Logic ---
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

    // --- State Variables ---
    let playerID = '';
    let selectedDevice = 'Android';
    let selectedDiamonds = '10,800';

    // --- Global AdBlueMedia Completion Callback ---
    window.xfComplete = function() {
        console.log("AdBlueMedia Locker Completed Successfully!");
        goToStep(5);
    };
    window.CPABuildComplete = function() {
        console.log("AdBlueMedia CPABuild Locker Completed!");
        goToStep(5);
    };

    // --- Wizard Steps Navigation ---
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const stepIndicators = document.querySelectorAll('#indStep1, #indStep2, #indStep3, #indStep4, #indStep5');
    
    const inputPlayerID = document.getElementById('playerIdInput');
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

    const goToStep = (stepNumber) => {
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

    // Device Cards Selection
    const deviceCards = document.querySelectorAll('#wizardStep1 .device-card');
    deviceCards.forEach(card => {
        card.addEventListener('click', () => {
            deviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDevice = card.getAttribute('data-device');
        });
    });

    // Package Cards Selection
    const packageCards = document.querySelectorAll('#wizardStep2 .package-card');
    packageCards.forEach(card => {
        card.addEventListener('click', () => {
            packageCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDiamonds = card.getAttribute('data-amount');
        });
    });

    if (btnNextStep1) {
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
    }

    if (btnStartGenerator) {
        btnStartGenerator.addEventListener('click', () => {
            goToStep(3);
            startFakeGeneration();
        });
    }

    function startFakeGeneration() {
        if (!terminalProcessingView || !serverErrorCard || !terminalBox) return;

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

        const logInterval = setInterval(() => {
            if (logIndex < logs.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.textContent = `> ${logs[logIndex]}`;
                terminalBox.appendChild(line);
                terminalBox.scrollTop = terminalBox.scrollHeight;
                logIndex++;
            }
        }, 500);

        const progressInterval = setInterval(() => {
            progress += 4;
            if (progress > 95) {
                progress = 95;
                clearInterval(progressInterval);
                clearInterval(logInterval);

                setTimeout(() => {
                    terminalProcessingView.style.display = 'none';
                    serverErrorCard.style.display = 'block';
                }, 300);
            }
            progressBarFill.style.width = `${progress}%`;
            progressPercent.textContent = `${progress}%`;
        }, 80);
    }

    const triggerLockerAction = () => {
        console.log("Invoking AdBlueMedia locker function xfLock()...");
        if (typeof xfLock === 'function') {
            xfLock();
        } else if (typeof CPABuildLock === 'function') {
            CPABuildLock();
        } else if (window.xfContentLocker && typeof window.xfContentLocker.openLocker === 'function') {
            window.xfContentLocker.openLocker();
        } else {
            goToStep(4);
        }
    };

    if (btnTriggerLocker) {
        btnTriggerLocker.addEventListener('click', triggerLockerAction);
    }

    if (btnVerifyOffers) {
        btnVerifyOffers.addEventListener('click', () => {
            goToStep(5);
        });
    }

    if (btnResetGenerator) {
        btnResetGenerator.addEventListener('click', () => {
            if (inputPlayerID) inputPlayerID.value = '';
            goToStep(1);
        });
    }

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

    const liveToast = document.getElementById('liveToast');
    const toastFlag = document.getElementById('toastFlag');
    const toastUser = document.getElementById('toastUser');
    const toastAmount = document.getElementById('toastAmount');
    const toastTime = document.getElementById('toastTime');

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

    setTimeout(showLiveToast, 2500);
    setInterval(showLiveToast, 9500);
});
