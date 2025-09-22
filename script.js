
// Select the form element
const inquiryForm = document.querySelector("form");

// Add a listener for the form submission
inquiryForm.addEventListener("submit", function (event) {
  // Get the email input value
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();

  // Regex (Regular Expression) pattern for a valid email format:
  // - Starts with letters, numbers, dots, underscores, or hyphens
  // - Must contain "@"
  // - Domain name must contain letters/numbers and can include hyphens
  // - Ends with a valid top-level domain (2+ letters)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the regex
  if (!emailPattern.test(email)) {
    // Prevent form submission if email is invalid
    event.preventDefault();

    // Show a friendly error alert
    alert("Please enter a valid email address (e.g., yourname@example.com).");

    // Focus back on the email input
    emailInput.focus();
  }
});

// Redirect to thankyou.html file 

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop normal form submission for now

    const email = emailInput.value.trim();

    // Regex for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

    if (!emailPattern.test(email)) {
      alert("⚠️ Please enter a valid email address with a proper domain (e.g., name@example.com).");
      return;
    }

    // If email is valid, redirect to thankyou.html
    // Here you could also save the name/project details in localStorage 
    // if you want to personalize the thank you page
    window.location.href = "thankyou.html";
  });
});
