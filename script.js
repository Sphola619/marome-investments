// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const inquiryForm = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const projectInput = document.getElementById("project");

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop normal form submission

    const email = emailInput.value.trim();
    const project = projectInput.value.trim();

    // Regex for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check email first
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address (e.g., yourname@example.com).");
      emailInput.focus();
      return;
    }

    // Check project description length
    if (project.length < 50) {
      alert("Please provide more details about your project (minimum 50 characters).");
      projectInput.focus();
      return;
    }

    // All validations passed, redirect to thankyou.html
    window.location.href = "thankyou.html";
  });
});
