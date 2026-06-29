document.addEventListener("DOMContentLoaded", () => {

    console.log("Script Loaded");

    /* ==========================
   LEAD POPUP
========================== */

const popup = document.getElementById("leadPopup");

if (popup) {

    // Show popup only once
    if (!localStorage.getItem("popupShown")) {

        setTimeout(() => {
            popup.style.display = "flex";

            // Mark popup as shown
            localStorage.setItem("popupShown", "true");

        }, 1000);
    }

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

        careerBtn.addEventListener("click", () => {
            careerBox.classList.toggle("show");
        });

        if (closeCareer) {
            closeCareer.addEventListener("click", () => {
                careerBox.classList.remove("show");
            });
        }

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
    ========================== */

    const guidanceBtn = document.getElementById("freeGuidance");

    if (guidanceBtn && popup) {

        guidanceBtn.addEventListener("click", (e) => {

            e.preventDefault();

            popup.style.display = "flex";

            if (careerBox) {
                careerBox.classList.remove("show");
            }

        });
    }

    /* ==========================
       LEAD FORM SUBMIT
    ========================== */

    const leadForm = document.getElementById("leadForm");

    if (leadForm) {

        leadForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                course: document.getElementById("course").value,
                message: document.getElementById("message").value
            };

            try {

                const response = await fetch(
                    "https://api.skillitize.com/submit.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    }
                );

                const result = await response.json();

                if (result.success) {

                    alert("Thank you! Our team will contact you shortly.");

                    leadForm.reset();

                    if (popup) {
                        popup.style.display = "none";
                    }

                } else {

                    alert("Submission failed.");

                }

            } catch (error) {

                console.error(error);

                alert("Server error. Please try again.");

            }

        });

    }

});