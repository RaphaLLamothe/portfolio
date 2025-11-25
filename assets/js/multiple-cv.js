function toggleCvDropdown() {
    const panel = document.getElementById("cvDropdownPanel");
    const arrow = document.querySelector(".cv-arrow");

    panel.classList.toggle("show");
    arrow.classList.toggle("rotate");
}

window.addEventListener("click", function(e) {
    if (!e.target.closest(".cv-dropdown")) {
        document.getElementById("cvDropdownPanel").classList.remove("show");
        document.querySelector(".cv-arrow").classList.remove("rotate");
    }
});