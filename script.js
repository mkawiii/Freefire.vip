/**
 * Freefire.vip - Ultra-Easy 1-Screen Generator & Live Verification Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Switcher Logic ---
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

    // --- 2. State Variables ---
    let playerID = '';
    let selectedDevice = 'Android';
    let selectedDiamonds = '10,800';

    // --- 3. DOM Elements ---
    const inputPlayerID = document.getElementById('playerIdInput');
    const idStatusIcon = document.getElementById('idStatusIcon');
    const deviceCards = document.querySelectorAll('.device-card');
    const packageCards = document.querySelectorAll('.package-card');
    const btnInstantGenerate = document.getElementById('btnInstantGenerate');

    // Modal Elements
    const generatorModal = document.getElementById('generatorModal');
    const closeModal = document.getElementById('closeModal');
    const modalProcessingView = document.getElementById('modalProcessingView');
    const modalErrorCard = document.getElementById('modalErrorCard');
    const modalSuccessScreen = document.getElementById('modalSuccessScreen');
    const modalTerminalBox = document.getElementById('modalTerminalBox');
    const modalProgressBarFill = document.getElementById('modalProgressBarFill');
    const modalProgressPercent = document.getElementById('modalProgressPercent');
    const processTitle = document.getElementById('processTitle');
    const processDesc = document.getElementById('processDesc');
    const lockedDiamondCount = document.getElementById('lockedDiamondCount');
    const lockedPlayerId = document.getElementById('lockedPlayerId');

    const btnTriggerLocker = document.getElementById('btnTriggerLocker');
    const myLocker = document.getElementById('my-locker');
    const btnVerifyOffers = document.getElementById('btnVerifyOffers');
    const btnResetGenerator = document.getElementById('btnResetGenerator');

    // --- 4. Interactive Live Feedback on Player ID Input ---
    if (inputPlayerID && idStatusIcon) {
        inputPlayerID.addEventListener('input', () => {
            const val = inputPlayerID.value.trim();
            if (val.length >= 6) {
                idStatusIcon.textContent = '✅';
                idStatusIcon.style.color = '#16A34A';
            } else {
                idStatusIcon.textContent = '🆔';
                idStatusIcon.style.color = '';
            }
        });
    }

    // --- 5. Device Selection ---
    deviceCards.forEach(card => {
        card.addEventListener('click', () => {
            deviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDevice = card.getAttribute('data-device') || 'Android';
        });
    });

    // --- 6. Diamond Package Selection ---
    packageCards.forEach(card => {
        card.addEventListener('click', () => {
            packageCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedDiamonds = card.getAttribute('data-amount') || '10,800';
        });
    });

    // --- 7. Modal Control Helpers ---
    const openModalWindow = () => {
        if (generatorModal) {
            generatorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModalWindow = () => {
        if (generatorModal) {
            generatorModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (closeModal) closeModal.addEventListener('click', closeModalWindow);
    if (generatorModal) {
        generatorModal.addEventListener('click', (e) => {
            if (e.target === generatorModal) closeModalWindow();
        });
    }

    // --- 8. Global AdBlueMedia Callbacks ---
    window.xfComplete = function() {
        console.log("AdBlueMedia Locker Completed Successfully!");
        showSuccessScreen();
    };
    window.CPABuildComplete = function() {
        console.log("AdBlueMedia CPABuild Locker Completed!");
        showSuccessScreen();
    };

    function showSuccessScreen() {
        if (modalProcessingView) modalProcessingView.style.display = 'none';
        if (modalErrorCard) modalErrorCard.style.display = 'none';
        if (modalSuccessScreen) modalSuccessScreen.style.display = 'block';
    }

    // --- 9. Start Fast 3-Second Processing Engine ---
    if (btnInstantGenerate) {
        btnInstantGenerate.addEventListener('click', () => {
            const val = inputPlayerID ? inputPlayerID.value.trim() : '';
            if (!val || val.length < 5) {
                alert('يرجى إدخال معرّف لاعب فري فاير (Player ID) صحيح يتكون من 6 أرقام على الأقل.');
                if (inputPlayerID) inputPlayerID.focus();
                return;
            }

            playerID = val;
            if (lockedPlayerId) lockedPlayerId.textContent = playerID;
            if (lockedDiamondCount) lockedDiamondCount.textContent = `${selectedDiamonds} جوهرة`;

            // Reset modal views
            if (modalProcessingView) modalProcessingView.style.display = 'block';
            if (modalErrorCard) modalErrorCard.style.display = 'none';
            if (modalSuccessScreen) modalSuccessScreen.style.display = 'none';
            if (myLocker) myLocker.style.display = 'none';

            openModalWindow();
            startFastProcessing();
        });
    }

    function startFastProcessing() {
        if (!modalTerminalBox || !modalProgressBarFill || !modalProgressPercent) return;

        modalTerminalBox.innerHTML = '';
        modalProgressBarFill.style.width = '0%';
        modalProgressPercent.textContent = '0%';

        const logs = [
            `[الاتصال] جاري ربط السيرفر بحساب فري فاير: ${playerID}...`,
            `[التحقق] تم التحقق من الحساب بنجاح (الجهاز: ${selectedDevice})`,
            `[الحماية] تفعيل درع الأمان والتشفير 256-bit Anti-Ban`,
            `[تجهيز الحزمة] حجز ${selectedDiamonds} جوهرة لحساب اللاعب...`,
            `[السيرفر] توجيه الحزمة إلى طابور التسليم النهائي...`
        ];

        let progress = 0;
        let logIndex = 0;

        // Terminal Log Animation
        const logTimer = setInterval(() => {
            if (logIndex < logs.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.textContent = `> ${logs[logIndex]}`;
                modalTerminalBox.appendChild(line);
                modalTerminalBox.scrollTop = modalTerminalBox.scrollHeight;
                logIndex++;
            }
        }, 500);

        // Smooth Fast Progress Bar (3 seconds total)
        const progressTimer = setInterval(() => {
            progress += 5;
            if (progress > 95) {
                progress = 95;
                clearInterval(progressTimer);
                clearInterval(logTimer);

                // Switch to Error/Verification Card
                setTimeout(() => {
                    if (modalProcessingView) modalProcessingView.style.display = 'none';
                    if (modalErrorCard) modalErrorCard.style.display = 'block';
                }, 350);
            }
            modalProgressBarFill.style.width = `${progress}%`;
            modalProgressPercent.textContent = `${progress}%`;
        }, 100);
    }

    // --- 10. Trigger AdBlueMedia Content Locker ---
    const triggerLockerAction = () => {
        console.log("Triggering AdBlueMedia Locker via xfLock()...");
        if (typeof xfLock === 'function') {
            xfLock();
        } else if (typeof CPABuildLock === 'function') {
            CPABuildLock();
        } else if (window.xfContentLocker && typeof window.xfContentLocker.openLocker === 'function') {
            window.xfContentLocker.openLocker();
        } else {
            // Fallback if locker script is blocked by extension
            if (myLocker) myLocker.style.display = 'block';
        }
    };

    if (btnTriggerLocker) {
        btnTriggerLocker.addEventListener('click', triggerLockerAction);
    }

    if (btnVerifyOffers) {
        btnVerifyOffers.addEventListener('click', () => {
            showSuccessScreen();
        });
    }

    if (btnResetGenerator) {
        btnResetGenerator.addEventListener('click', () => {
            if (inputPlayerID) inputPlayerID.value = '';
            if (idStatusIcon) idStatusIcon.textContent = '🆔';
            closeModalWindow();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 11. FAQ Accordions ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });

    // --- 12. Dynamic Persuasive Live Toast Notification Feed ---
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
