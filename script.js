/**
 * Freefire.vip - High Converting Article & Interactive Generator Logic
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
        goToModalStep(5);
        goToPageStep(5);
    };
    window.CPABuildComplete = function() {
        console.log("AdBlueMedia CPABuild Locker Completed!");
        goToModalStep(5);
        goToPageStep(5);
    };

    // --- 1. PAGE-EMBEDDED GENERATOR WIZARD ---
    const pageSteps = document.querySelectorAll('.page-step');
    const pageIndicators = document.querySelectorAll('#indPageStep1, #indPageStep2, #indPageStep3, #indPageStep4, #indPageStep5');
    
    const pagePlayerIdInput = document.getElementById('pagePlayerIdInput');
    const btnNextPageStep1 = document.getElementById('btnNextPageStep1');
    const btnStartPageGenerator = document.getElementById('btnStartPageGenerator');
    const btnPageTriggerLocker = document.getElementById('btnPageTriggerLocker');
    const btnPageVerifyOffers = document.getElementById('btnPageVerifyOffers');
    const btnResetPageGenerator = document.getElementById('btnResetPageGenerator');

    const pageTerminalProcessingView = document.getElementById('pageTerminalProcessingView');
    const pageServerErrorCard = document.getElementById('pageServerErrorCard');
    const pageTerminalBox = document.getElementById('pageTerminalBox');
    const pageProgressBarFill = document.getElementById('pageProgressBarFill');
    const pageProgressPercent = document.getElementById('pageProgressPercent');

    const goToPageStep = (stepNum) => {
        pageSteps.forEach((step, idx) => {
            if (idx + 1 === stepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        pageIndicators.forEach((ind, idx) => {
            const num = idx + 1;
            ind.classList.remove('active', 'completed');
            if (num === stepNum) {
                ind.classList.add('active');
            } else if (num < stepNum) {
                ind.classList.add('completed');
                ind.textContent = '✓';
            } else {
                ind.textContent = num;
            }
        });
    };

    // Device Cards Selection for Page
    const pageDeviceCards = document.querySelectorAll('#pageStep1 .device-card');
    pageDeviceCards.forEach(card => {
        card.addEventListener('click', () => {
            pageDeviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDevice = card.getAttribute('data-device');
        });
    });

    // Package Cards Selection for Page
    const pagePackageCards = document.querySelectorAll('#pageStep2 .package-card');
    pagePackageCards.forEach(card => {
        card.addEventListener('click', () => {
            pagePackageCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDiamonds = card.getAttribute('data-amount');
        });
    });

    if (btnNextPageStep1) {
        btnNextPageStep1.addEventListener('click', () => {
            const val = pagePlayerIdInput.value.trim();
            if (!val || val.length < 5) {
                alert('يرجى إدخال معرف لاعب فري فاير (ID) صحيح يتكون من 6 أرقام على الأقل.');
                pagePlayerIdInput.focus();
                return;
            }
            playerID = val;
            goToPageStep(2);
        });
    }

    if (btnStartPageGenerator) {
        btnStartPageGenerator.addEventListener('click', () => {
            goToPageStep(3);
            startPageFakeGeneration();
        });
    }

    function startPageFakeGeneration() {
        if (!pageTerminalProcessingView || !pageServerErrorCard || !pageTerminalBox) return;
        
        pageTerminalProcessingView.style.display = 'block';
        pageServerErrorCard.style.display = 'none';
        pageTerminalBox.innerHTML = '';
        pageProgressBarFill.style.width = '0%';
        pageProgressPercent.textContent = '0%';

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
                pageTerminalBox.appendChild(line);
                pageTerminalBox.scrollTop = pageTerminalBox.scrollHeight;
                logIndex++;
            }
        }, 700);

        const progressInterval = setInterval(() => {
            progress += 3;
            if (progress > 95) {
                progress = 95;
                clearInterval(progressInterval);
                clearInterval(logInterval);

                setTimeout(() => {
                    pageTerminalProcessingView.style.display = 'none';
                    pageServerErrorCard.style.display = 'block';
                }, 400);
            }
            pageProgressBarFill.style.width = `${progress}%`;
            pageProgressPercent.textContent = `${progress}%`;
        }, 100);
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
            goToPageStep(4);
            goToModalStep(4);
        }
    };

    if (btnPageTriggerLocker) {
        btnPageTriggerLocker.addEventListener('click', triggerLockerAction);
    }

    if (btnPageVerifyOffers) {
        btnPageVerifyOffers.addEventListener('click', () => {
            goToPageStep(5);
        });
    }

    if (btnResetPageGenerator) {
        btnResetPageGenerator.addEventListener('click', () => {
            pagePlayerIdInput.value = '';
            goToPageStep(1);
        });
    }

    // --- 2. MODAL GENERATOR WIZARD ---
    const modalOverlay = document.getElementById('generatorModal');
    const openModalBtns = document.querySelectorAll('.trigger-modal');
    const closeModalBtn = document.getElementById('closeModal');

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

    const openModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
        // Only open modal if clicking on header trigger or element without specific inline anchor
        if (btn.getAttribute('href') === '#generator-box') return;
        e.preventDefault();
        openModal();
    }));

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    const goToModalStep = (stepNumber) => {
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

    const modalDeviceCards = document.querySelectorAll('#wizardStep1 .device-card');
    modalDeviceCards.forEach(card => {
        card.addEventListener('click', () => {
            modalDeviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDevice = card.getAttribute('data-device');
        });
    });

    const modalPackageCards = document.querySelectorAll('#wizardStep2 .package-card');
    modalPackageCards.forEach(card => {
        card.addEventListener('click', () => {
            modalPackageCards.forEach(c => c.classList.remove('selected'));
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
            goToModalStep(2);
        });
    }

    if (btnStartGenerator) {
        btnStartGenerator.addEventListener('click', () => {
            goToModalStep(3);
            startModalFakeGeneration();
        });
    }

    function startModalFakeGeneration() {
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
        }, 700);

        const progressInterval = setInterval(() => {
            progress += 3;
            if (progress > 95) {
                progress = 95;
                clearInterval(progressInterval);
                clearInterval(logInterval);

                setTimeout(() => {
                    terminalProcessingView.style.display = 'none';
                    serverErrorCard.style.display = 'block';
                }, 400);
            }
            progressBarFill.style.width = `${progress}%`;
            progressPercent.textContent = `${progress}%`;
        }, 100);
    }

    if (btnTriggerLocker) {
        btnTriggerLocker.addEventListener('click', triggerLockerAction);
    }

    if (btnVerifyOffers) {
        btnVerifyOffers.addEventListener('click', () => {
            goToModalStep(5);
        });
    }

    if (btnResetGenerator) {
        btnResetGenerator.addEventListener('click', () => {
            if (inputPlayerID) inputPlayerID.value = '';
            goToModalStep(1);
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
