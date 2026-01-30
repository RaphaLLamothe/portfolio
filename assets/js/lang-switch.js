document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.getElementById('langSwitch');
    const body = document.body;

    const savedLang = localStorage.getItem('lang') || 'en';
    body.classList.toggle('lang-fr', savedLang === 'fr');
    switcher.checked = savedLang === 'fr';

    const cvLinks = {
        fr: [
            { href: "assets/pdf/LAMOTHE_Raphael_CV_Web_FR.pdf", text: "Développeur Web" },
            { href: "assets/pdf/LAMOTHE_Raphael_CV_Dev_FR.pdf", text: "Développeur Full-Stack" }
        ],
        en: [
            { href: "assets/pdf/LAMOTHE_Raphael_CV_Web_EN.pdf", text: "Web Developer" },
            { href: "assets/pdf/LAMOTHE_Raphael_CV_Dev_EN.pdf", text: "Full-Stack Developer" }
        ]
    };

    const cvBtnText = document.getElementById('cvBtnText');
    const cvPanel = document.getElementById('cvDropdownPanel');

    // Cache les sélecteurs pour éviter les requêtes DOM répétées
    const elementsWithLang = document.querySelectorAll('[data-en]');
    const imagesWithLang = document.querySelectorAll('img[data-en]');
    const textareasWithLang = document.querySelectorAll('textarea[data-en]');
    const inputsWithLang = document.querySelectorAll('input[data-en]');
    const buttonsWithLang = document.querySelectorAll('button[data-en]');

    function updateLanguage(lang) {
        // Utiliser les sélecteurs cachés
        elementsWithLang.forEach(el => {
            const tag = el.tagName;
            if (!["INPUT", "TEXTAREA", "IMG", "BUTTON"].includes(tag)) {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        });

        imagesWithLang.forEach(img => {
            img.alt = img.getAttribute(`data-${lang}`);
        });

        textareasWithLang.forEach(ta => {
            ta.placeholder = ta.getAttribute(`data-${lang}`);
        });

        inputsWithLang.forEach(inp => {
            inp.placeholder = inp.getAttribute(`data-${lang}`);
        });

        buttonsWithLang.forEach(btn => {
            btn.textContent = btn.getAttribute(`data-${lang}`);
        });

        if (cvBtnText) {
            cvBtnText.textContent = cvBtnText.dataset[lang];
        }

        if (cvPanel) {
            // Utiliser DocumentFragment pour réduire les reflows
            const fragment = document.createDocumentFragment();
            cvPanel.innerHTML = "";
            
            cvLinks[lang].forEach(cv => {
                const a = document.createElement('a');
                a.href = cv.href;
                a.download = "";
                a.textContent = cv.text;

                // TODO: Remove when English resumes available
                if (lang === "en") {
                    a.addEventListener("click", (e) => {
                        e.preventDefault();
                        alert("English resumes are currently unavailable.");
                    });
                }

                fragment.appendChild(a);
            });
            
            cvPanel.appendChild(fragment);
        }
    }

    updateLanguage(savedLang);

    switcher.addEventListener('change', () => {
        const lang = switcher.checked ? 'fr' : 'en';
        body.classList.toggle('lang-fr', lang === 'fr');
        localStorage.setItem('lang', lang);
        updateLanguage(lang);
    });
});
