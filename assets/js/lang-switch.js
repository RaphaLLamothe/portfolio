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


    function updateLanguage(lang) {

        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        document.querySelectorAll('img[data-en]').forEach(img => {
            img.alt = img.getAttribute(`data-${lang}`);
        });

        if (cvBtnText) {
            cvBtnText.textContent = cvBtnText.dataset[lang];
        }

        if (cvPanel) {
            cvPanel.innerHTML = "";
            cvLinks[lang].forEach(cv => {
                const a = document.createElement('a');
                a.href = cv.href;
                a.download = "";
                a.textContent = cv.text;

                //Remove this code when English CVs will be available
                if (lang === "en") {
                    a.addEventListener("click", (e) => {
                        e.preventDefault();
                        alert("English CVs are currently unavailable.");
                    });
                }

                cvPanel.appendChild(a);
            });
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
