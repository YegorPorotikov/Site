// =============================================
// script.js — 10 функцій для Star Raker
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    console.log('%c🚀 Star Raker JS loaded with 10 functions!', 'color: #00ffff; font-size: 16px;');

    // ====================== 1. ПЛАВНИЙ СКРОЛ ======================
    function smoothScroll() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.getElementById(href.substring(1));
                    if (target) {
                        const offset = 80;
                        const topPos = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: topPos, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // ====================== 2. ПІДСВІТКА АКТИВНОГО МЕНЮ ======================
    function highlightActiveNav() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                if (scrollY >= section.offsetTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ====================== 3. АНІМАЦІЯ ПОЯВИ СЕКЦІЙ ======================
    function animateSections() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.9s ease';
            observer.observe(section);
        });
    }

    // ====================== 4. ПУЛЬСАЦІЯ КНОПКИ PLAY DEMO ======================
    function pulseDemoButton() {
        const btn = document.querySelector('.btn-primary');
        if (btn) {
            setInterval(() => {
                btn.style.transform = 'scale(1.08)';
                setTimeout(() => btn.style.transform = 'scale(1)', 280);
            }, 1500);
        }
    }

    // ====================== 5. ЖИВИЙ ТАЙМЕР ======================
    function startRelativeCountdown() {
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;

        let timeLeft = 12 * 60 * 60 * 1000; // 12 годин у мілісекундах

        function update() {
            timeLeft -= 1000;

            if (timeLeft <= 0) {
                countdownEl.textContent = "Offer ended!";
                countdownEl.style.color = "#ff4500";
                return;
            }

            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownEl.textContent =
                `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
        }

        update();
        setInterval(update, 1000);
    }

    // ====================== 6. ПЕРЕМИКАЧ РЕЖИМІВ ======================
    function initModeSwitcher() {
        const tabs = document.querySelectorAll('.mode-tab');
        const panels = document.querySelectorAll('.mode-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const mode = tab.getAttribute('data-mode');
                document.getElementById(mode + '-panel').classList.add('active');
            });
        });
    }

    // ====================== 7. ПІДТВЕРДЖЕННЯ ПРИ КУПІВЛІ ======================
    function confirmPurchase() {
        document.querySelectorAll('.btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!confirm('Ви дійсно хочете купити гру Star Raker?')) {
                    e.preventDefault();
                }
            });
        });
    }

    // ====================== 8. КНОПКА "ВГОРУ" ======================
    function addBackToTop() {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.className = 'back-to-top';
        btn.style.cssText = `
            position: fixed; bottom: 30px; right: 30px; width: 55px; height: 55px;
            background: #00ffff; color: #000; border: none; border-radius: 50%;
            font-size: 28px; cursor: pointer; display: none; z-index: 999;
            box-shadow: 0 0 25px rgba(0,255,255,0.6);
        `;
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            btn.style.display = window.scrollY > 700 ? 'block' : 'none';
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ====================== 9. ЗВУК ПРИ КЛІКУ (опціонально) ======================
    function addClickSound() {
         const clickSound = new Audio('assets/sounds/click.mp3');
        document.querySelectorAll('button, .btn').forEach(el => {
             el.addEventListener('click', () => {
        clickSound.currentTime = 0;
                 clickSound.play().catch(() => {});
             });
             });
        console.log('Click sound ready (uncomment if needed)');
    }

    

    // ====================== ЗАПУСК ВСІХ ФУНКЦІЙ ======================
    smoothScroll();
    highlightActiveNav();
    animateSections();
    pulseDemoButton();
    startRelativeCountdown();
    initModeSwitcher();
    confirmPurchase();
    addBackToTop();
    addClickSound();
    

});