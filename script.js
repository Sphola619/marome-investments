
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
