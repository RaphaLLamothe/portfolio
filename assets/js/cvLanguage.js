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

const htmlLang = document.documentElement.lang || navigator.language;
const lang = htmlLang.startsWith('fr') ? 'fr' : 'en';

const cvBtnText = document.getElementById('cvBtnText');
cvBtnText.textContent = cvBtnText.dataset[lang];

const cvPanel = document.getElementById('cvDropdownPanel');
cvPanel.innerHTML = "";
cvLinks[lang].forEach(cv => {
    const a = document.createElement('a');
    a.href = cv.href;
    a.download = "";
    a.textContent = cv.text;
    cvPanel.appendChild(a);
});