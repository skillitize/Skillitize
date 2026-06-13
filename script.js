document.addEventListener("DOMContentLoaded", () => {

    console.log("Script Loaded");

    /* ==========================
       LEAD POPUP
    ========================== */

    const popup = document.getElementById("leadPopup");

    if (popup) {

        setTimeout(() => {
            popup.style.display = "flex";
        }, 1000);

        const closeBtn = document.querySelector(".close-popup");

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                popup.style.display = "none";
            });
        }
    }

    /* ==========================
       CAREER SUPPORT WIDGET
    ========================== */

    const careerBtn = document.getElementById("careerBtn");
    const careerBox = document.getElementById("careerBox");
    const closeCareer = document.getElementById("closeCareer");

    if (careerBtn && careerBox) {

        // Open / Close Widget
        careerBtn.addEventListener("click", () => {
            careerBox.classList.toggle("show");
        });

        // Close Button
        if (closeCareer) {
            closeCareer.addEventListener("click", () => {
                careerBox.classList.remove("show");
            });
        }

        // Close when clicking outside
        document.addEventListener("click", (e) => {

            if (
                !careerBox.contains(e.target) &&
                !careerBtn.contains(e.target)
            ) {
                careerBox.classList.remove("show");
            }

        });
    }

    /* ==========================
       FREE CAREER GUIDANCE
       OPENS LEAD POPUP
    ========================== */

    const guidanceBtn = document.getElementById("freeGuidance");

    if (guidanceBtn && popup) {

        guidanceBtn.addEventListener("click", (e) => {

            e.preventDefault();

            popup.style.display = "flex";

            careerBox.classList.remove("show");

        });

    }

});