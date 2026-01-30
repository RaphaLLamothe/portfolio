// Cache des sélecteurs DOM
const panel = document.getElementById("cvDropdownPanel");
const arrow = document.querySelector(".cv-arrow");
const socialIcons = document.querySelector(".social-icons");

function updateSocialIconsZIndex() {
    if (panel && socialIcons) {
        socialIcons.style.zIndex = panel.classList.contains("show") ? "-1" : "1";
    }
}

function toggleCvDropdown() {
    if (panel) panel.classList.toggle("show");
    if (arrow) arrow.classList.toggle("rotate");
    updateSocialIconsZIndex();
}

// Event delegation pour le click global
window.addEventListener("click", function(e) {
    if (!e.target.closest(".cv-dropdown")) {
        if (panel) panel.classList.remove("show");
        if (arrow) arrow.classList.remove("rotate");
        updateSocialIconsZIndex();
    }
});

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", function() {
    if (socialIcons) {
        socialIcons.addEventListener("click", function() {
            if (panel) panel.classList.remove("show");
            if (arrow) arrow.classList.remove("rotate");
            updateSocialIconsZIndex();
        });
    }
    updateSocialIconsZIndex();
});
