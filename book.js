document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       COURSE BOOKING FORM
    ========================== */

    const bookingForm = document.getElementById("booking-form");

    if (bookingForm) {

        const formView = document.getElementById("booking-form-view");
        const successView = document.getElementById("booking-success-view");
        const successMessage = document.getElementById("success-message");
        const courseTitleEl = document.querySelector(".detail-hero-text h1");
        const courseTitle = courseTitleEl ? courseTitleEl.textContent.trim() : "";

        function setInvalid(groupId, isInvalid) {
            const group = document.getElementById(groupId);
            if (group) {
                group.classList.toggle("invalid", isInvalid);
            }
        }

        bookingForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const nameVal = document.getElementById("book-name").value.trim();
            const emailVal = document.getElementById("book-email").value.trim();
            const phoneVal = document.getElementById("book-phone").value.trim();
            const batchVal = document.getElementById("book-batch").value;

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^[0-9]{10}$/;

            let valid = true;
            if (nameVal.length < 2) { setInvalid("group-name", true); valid = false; } else { setInvalid("group-name", false); }
            if (!emailPattern.test(emailVal)) { setInvalid("group-email", true); valid = false; } else { setInvalid("group-email", false); }
            if (!phonePattern.test(phoneVal)) { setInvalid("group-phone", true); valid = false; } else { setInvalid("group-phone", false); }
            if (!batchVal) { setInvalid("group-batch", true); valid = false; } else { setInvalid("group-batch", false); }

            if (!valid) return;

            const submitBtn = bookingForm.querySelector(".modal-submit-btn");
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";

            const data = {
                courseTitle: courseTitle,
                fullName: nameVal,
                email: emailVal,
                phone: phoneVal,
                batch: batchVal
            };

            try {

                const response = await fetch(
                    "https://api.skillitize.com/book_submit.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    }
                );

                const result = await response.json();

                submitBtn.disabled = false;
                submitBtn.textContent = "Confirm Booking";

                if (result.success) {

                    successMessage.textContent = result.message;
                    formView.style.display = "none";
                    successView.style.display = "block";
                    bookingForm.reset();

                } else if (result.errors) {

                    if (result.errors.fullName) setInvalid("group-name", true);
                    if (result.errors.email) setInvalid("group-email", true);
                    if (result.errors.phone) setInvalid("group-phone", true);
                    if (result.errors.batch) setInvalid("group-batch", true);

                } else {

                    alert(result.message || "Something went wrong. Please try again.");

                }

            } catch (error) {

                console.error("Booking Fetch Error:", error);

                submitBtn.disabled = false;
                submitBtn.textContent = "Confirm Booking";
                alert("Network error. Please try again.");

            }

        });

    } else {

        console.error("bookingForm element not found in the DOM. Check that the form's id is exactly 'booking-form' and that this script runs after the form exists.");

    }

});