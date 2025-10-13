document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // 1. Form Submission Handling
  // ========================
  const inquiryForm = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const projectInput = document.getElementById("project");

  if (inquiryForm && nameInput && emailInput && projectInput) {
    inquiryForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const project = projectInput.value.trim();

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (project.length < 50) {
        alert("Please describe your project (min 50 chars).");
        return;
      }

      try {
        const response = await fetch("https://marome-backend.onrender.com/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, project }),
        });

        if (response.ok) {
          window.location.href = "thankyou.html";
        } else {
          alert("Failed to submit inquiry. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while sending your inquiry.");
      }
    });
  }

  // ========================
  // 2. Hamburger Menu Toggle (Updated)
  // ========================
  const hamburger = document.querySelector(".hamburger"); // safer selector
  const nav = document.querySelector("nav");

  if (hamburger && nav) {
    const navLinks = nav.querySelector("ul"); // always find the <ul> inside this nav

    hamburger.addEventListener("click", () => {
      if (navLinks) {
        navLinks.classList.toggle("active"); // show/hide menu
      }
      hamburger.classList.toggle("active"); // animate hamburger to X
    });
  }
});
