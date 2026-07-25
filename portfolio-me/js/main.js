// Simple Vanilla JavaScript — Focused on simple click events with minimal animations

document.addEventListener("DOMContentLoaded", function () {
  // 1. Simple Click Event to Switch Roles (replaces automated typewriter animation)
  const roleText = document.getElementById("typewriter-text");
  const roles = [
    "Full Stack Developer",
    "BCA Student",
    "Open Source Enthusiast",
    "Problem Solver",
    "Lifelong Learner"
  ];
  let roleIndex = 0;

  if (roleText) {
    roleText.textContent = roles[0];
    roleText.title = "Click to change role";
    roleText.style.cursor = "pointer";

    roleText.addEventListener("click", function () {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.textContent = roles[roleIndex];
    });
  }

  // 2. Remove scroll animations — Simply display elements immediately
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach(function (el) {
    el.classList.add("visible");
  });

  // 3. Simple Click Events for Mobile Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("open");
    });

    // Close menu when a navigation link is clicked
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // 4. Simple Click Event for Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 5. Simple Click Event for Navbar Active Highlight
  const navLinks = document.querySelectorAll("nav#navbar ul li a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.style.color = "";
      });
      this.style.color = "var(--accent-1)";
    });
  });

  // 6. Basic Scroll Check for Navbar & Back to Top visibility
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle("visible", window.scrollY > 400);
    }
  });
});