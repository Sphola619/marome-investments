document.addEventListener("DOMContentLoaded", () => {

  // 0. Auto-update copyright year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // 1. Theme Toggle

  const themeToggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("marome-theme", theme);
    const icon = themeToggle ? themeToggle.querySelector("i") : null;
    if (icon) {
      icon.className = theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }
  }

  // Apply saved theme (fallback to dark)
  applyTheme(localStorage.getItem("marome-theme") || "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  
  // 2. Form Submission Handling
  
  const inquiryForm = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const projectInput = document.getElementById("project");

  if (inquiryForm && nameInput && emailInput && projectInput) {
    inquiryForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const serviceInput = document.getElementById("service");
      const servicePrefix = serviceInput ? `Service Interest: ${serviceInput.value}\n\n` : "";
      const project = servicePrefix + projectInput.value.trim();

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (projectInput.value.trim().length < 50) {
        alert("Please describe your project (min 50 chars).");
        return;
      }

      const payload = JSON.stringify({ name, email, project });

      const submitBtn = inquiryForm.querySelector("[type='submit']");
      const spinner = document.getElementById("btn-spinner");
      submitBtn.style.display = 'none';
      spinner.hidden = false;

      try {
        const response = await fetch(
          "https://api.marome-investments.co.za/api/inquiry",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        window.location.href = "thankyou.html";
      } catch (error) {
        spinner.hidden = true;
        submitBtn.style.display = '';
        console.error("Error submitting form:", error);
        alert("Something went wrong submitting your inquiry. Please try again.");
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

// 5. Infinite Carousel - Smooth no-reset version
const initInfiniteCarousel = () => {
  const track = document.querySelector('.client-logos-inner');
  if (!track) return;

  // Duplicate the logos for seamless infinite scroll
  const slides = track.innerHTML;
  track.innerHTML += slides;

  let position = 0;
  const speed = 1; // pixels per frame - adjust this for speed (0.5 = slower, 2 = faster)
  const logosPerSet = 11;
  const gap = 120; // Match your CSS gap
  let setWidth = 0;
  
  // Calculate set width once images are loaded
  const calculateSetWidth = () => {
    const firstLogo = track.querySelector('.client-icon');
    if (firstLogo && firstLogo.offsetWidth > 0) {
      const logoWidth = firstLogo.offsetWidth;
      setWidth = (logoWidth * logosPerSet) + (gap * (logosPerSet - 1));
      startAnimation();
    } else {
      // Retry if images aren't loaded yet
      setTimeout(calculateSetWidth, 100);
    }
  };
  
  function animate() {
    position -= speed;
    
    // Reset position when we've scrolled one full set
    if (Math.abs(position) >= setWidth) {
      position = 0;
    }
    
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  
  function startAnimation() {
    if (setWidth > 0) {
      animate();
    }
  }
  
  // Start the process
  calculateSetWidth();
};

// Call the function to initialize the carousel
initInfiniteCarousel();

});
