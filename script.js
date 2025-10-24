document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Form Submission Handling
  
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

  
  // 2. Counter Animation
  
  const counters = document.querySelectorAll(".counter");
  const speed = 100;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace("+", "");
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = `${count + increment}+`;
        setTimeout(updateCount, 40);
      } else {
        counter.innerText = `${target}+`;
      }
    };
    updateCount();
  });

  
  // 3. Hamburger Menu Toggle
  
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector("nav ul");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  }

  
// 4. Highlight Active Page Link (with subpage support)
const currentPage = window.location.pathname.split("/").pop();
const links = document.querySelectorAll("nav ul li a.link");

links.forEach(link => {
  const linkPage = link.getAttribute("href");

  // All subpages related to "Services"
  const servicePages = [
    "backend-development.html",
    "integration.html",
    "infrastructure.html",
    "design.html",
    "architecture.html",
    "deployment.html",
    "security.html"
  ];

  if (
    linkPage === currentPage ||
    (linkPage === "services.html" && servicePages.includes(currentPage))
  ) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

});
