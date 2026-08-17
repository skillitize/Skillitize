// ============================================================
// careers.js
// Handles the mobile nav toggle, the Internships/Experienced
// tabs, the apply modal, and submitting applications to apply.php
// (which saves them to MySQL — see apply.php + db_connect.php).
// ============================================================

// Mobile nav toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", function () {
  nav.classList.toggle("active");
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
});

// Career track tabs (Internships / Experienced)
document.querySelectorAll(".career-tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".career-tab").forEach(function (t) { t.classList.remove("active"); });
    document.querySelectorAll(".openings-grid").forEach(function (g) { g.classList.remove("active"); });
    tab.classList.add("active");
    document.getElementById(tab.getAttribute("data-target")).classList.add("active");
  });
});

// Apply modal
const modal = document.getElementById("apply-modal");
const closeModalBtn = document.getElementById("modal-close-btn");
const closeSuccessBtn = document.getElementById("close-success-btn");
const applyForm = document.getElementById("apply-form");
const formView = document.getElementById("apply-form-view");
const successView = document.getElementById("apply-success-view");
const modalRoleSub = document.getElementById("modal-role-sub");
const roleSelect = document.getElementById("apply-role");
const submitBtn = document.getElementById("apply-submit-btn");
const submitError = document.getElementById("apply-submit-error");

function openModal(role) {
  roleSelect.value = role;
  modalRoleSub.textContent = role;
  modal.classList.add("active");
  formView.style.display = "block";
  successView.style.display = "none";
  submitError.style.display = "none";
}
function closeModal() {
  modal.classList.remove("active");
}

document.querySelectorAll(".apply-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    openModal(btn.getAttribute("data-role"));
  });
});

roleSelect.addEventListener("change", function () {
  modalRoleSub.textContent = roleSelect.value;
});

closeModalBtn.addEventListener("click", closeModal);
closeSuccessBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});

function setInvalid(groupId, isInvalid) {
  document.getElementById(groupId).classList.toggle("invalid", isInvalid);
}

// --- Form submit: sends JSON to career_submit.php, which inserts into MySQL ---
// (Matches the same JSON + fetch pattern used by contactForm / leadForm in script.js)
const CAREER_SUBMIT_URL = "https://api.skillitize.com/career_submit.php";

applyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitError.style.display = "none";

  const nameVal = document.getElementById("apply-name").value.trim();
  const emailVal = document.getElementById("apply-email").value.trim();
  const phoneVal = document.getElementById("apply-phone").value.trim();
  const resumeVal = document.getElementById("apply-resume").value.trim();
  const messageVal = document.getElementById("apply-message").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;

  let valid = true;
  if (nameVal.length < 2) { setInvalid("group-name", true); valid = false; } else { setInvalid("group-name", false); }
  if (!emailPattern.test(emailVal)) { setInvalid("group-email", true); valid = false; } else { setInvalid("group-email", false); }
  if (!phonePattern.test(phoneVal)) { setInvalid("group-phone", true); valid = false; } else { setInvalid("group-phone", false); }
  if (resumeVal.length < 5) { setInvalid("group-resume", true); valid = false; } else { setInvalid("group-resume", false); }

  if (!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const payload = {
    name: nameVal,
    email: emailVal,
    phone: phoneVal,
    role: roleSelect.value,
    resume: resumeVal,
    message: messageVal
  };

  fetch(CAREER_SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(function (response) {
      return response.json().then(function (data) {
        return { ok: response.ok, data: data };
      });
    })
    .then(function (result) {
      if (result.data && result.data.success) {
        document.getElementById("apply-success-message").textContent =
          "Thanks " + nameVal + "! We've received your application for \"" + roleSelect.value + "\". Our team will reach out at " + emailVal + " or " + phoneVal + " if it's a match.";
        formView.style.display = "none";
        successView.style.display = "block";
        applyForm.reset();
      } else {
        submitError.textContent = (result.data && result.data.message) || "Something went wrong sending your application. Please try again or email us directly at support@skillitize.com.";
        submitError.style.display = "block";
      }
    })
    .catch(function () {
      submitError.textContent = "Something went wrong sending your application. Please try again or email us directly at support@skillitize.com.";
      submitError.style.display = "block";
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Application";
    });
});