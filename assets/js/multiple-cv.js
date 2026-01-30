function updateSocialIconsZIndex() {
    const panel = document.getElementById("cvDropdownPanel");
    const socialIcons = document.querySelector(".social-icons");
    
    if (panel && socialIcons) {
        if (panel.classList.contains("show")) {
            socialIcons.style.zIndex = "-1";
        } else {
            socialIcons.style.zIndex = "1";
        }
    }
}

function toggleCvDropdown() {
    const panel = document.getElementById("cvDropdownPanel");
    const arrow = document.querySelector(".cv-arrow");

    panel.classList.toggle("show");
    arrow.classList.toggle("rotate");
    
    updateSocialIconsZIndex();
}

window.addEventListener("click", function(e) {
    if (!e.target.closest(".cv-dropdown")) {
        const panel = document.getElementById("cvDropdownPanel");
        const arrow = document.querySelector(".cv-arrow");
        if (panel) panel.classList.remove("show");
        if (arrow) arrow.classList.remove("rotate");
        
        updateSocialIconsZIndex();
    }
});

// Fermer le panneau CV lors du clic sur les icônes sociales
document.addEventListener("DOMContentLoaded", function() {
    const socialIcons = document.querySelector(".social-icons");
    if (socialIcons) {
        socialIcons.addEventListener("click", function() {
            const panel = document.getElementById("cvDropdownPanel");
            const arrow = document.querySelector(".cv-arrow");
            if (panel) panel.classList.remove("show");
            if (arrow) arrow.classList.remove("rotate");
            
            // Mettre à jour le z-index après la fermeture
            updateSocialIconsZIndex();
        });
    }
    
    // Initialiser le z-index au chargement de la page
    updateSocialIconsZIndex();
});
