/* =========================================================
   UNISHKA BISHT — PORTFOLIO JS
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const body = document.body;
  const loader = document.getElementById("loader");

  const navbar = document.getElementById("navbar");

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  const mouseGlow = document.querySelector(".mouse-glow");

  const progressBar =
    document.querySelector(".scroll-progress span");

  const typewriter =
    document.getElementById("typewriter-text");

  const heroImage =
    document.getElementById("hero-image");


  /* =======================================================
     LOADER
  ======================================================= */

  body.classList.add("loading");

  let loaderCount = 0;

  const loaderInterval = setInterval(() => {

    loaderCount += Math.floor(Math.random() * 15) + 5;

    if (loaderCount >= 100) {
      loaderCount = 100;
      clearInterval(loaderInterval);
    }

    const number =
      document.querySelector(".loader-number");

    if (number) {
      number.textContent =
        String(loaderCount).padStart(2, "0");
    }

  }, 120);


  window.addEventListener("load", () => {

    setTimeout(() => {

      loader.classList.add("loaded");

      body.classList.remove("loading");

    }, 1600);

  });


  /* =======================================================
     MOUSE POSITION
  ======================================================= */

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;



    if (mouseGlow) {

      mouseGlow.style.left =
        `${mouseX}px`;

      mouseGlow.style.top =
        `${mouseY}px`;

    }

  });



  /* =======================================================
     MAGNETIC ELEMENTS
  ======================================================= */

  const magneticElements =
    document.querySelectorAll(".magnetic");

  magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (event) => {

      const rect =
        element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      element.style.transform =
        `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });


    element.addEventListener("mouseleave", () => {

      element.style.transform =
        "translate(0, 0)";

    });

  });


  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  function handleNavbar() {

    if (window.scrollY > 50) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }

  window.addEventListener("scroll", handleNavbar);

  handleNavbar();


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  function updateProgress() {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    if (progressBar) {

      progressBar.style.height =
        `${percentage}%`;

    }

  }

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  updateProgress();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function closeMobileMenu() {

    hamburger.classList.remove("active");

    mobileMenu.classList.remove("open");

    hamburger.setAttribute(
      "aria-expanded",
      "false"
    );

    body.style.overflow = "";

  }


  hamburger.addEventListener("click", () => {

    const isOpen =
      mobileMenu.classList.toggle("open");

    hamburger.classList.toggle(
      "active",
      isOpen
    );

    hamburger.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    body.style.overflow =
      isOpen ? "hidden" : "";

  });


  document
    .querySelectorAll("#mobile-menu a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    });


  /* =======================================================
     TYPEWRITER / ROLE SWITCHER
  ======================================================= */

  const roles = [
    "Full Stack Developer",
    "BCA Student",
    "UI Builder",
    "Problem Solver",
    "Lifelong Learner"
  ];

  let roleIndex = 0;


  function changeRole() {

    if (!typewriter) return;

    typewriter.style.opacity = "0";

    typewriter.style.transform =
      "translateY(8px)";


    setTimeout(() => {

      roleIndex =
        (roleIndex + 1) % roles.length;

      typewriter.textContent =
        roles[roleIndex];

      typewriter.style.opacity = "1";

      typewriter.style.transform =
        "translateY(0)";

    }, 300);

  }


  setInterval(changeRole, 2800);


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  /* =======================================================
     ACTIVE NAV SECTION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-links a[data-section]"
    );


  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            navLinks.forEach((link) => {

              link.classList.remove(
                "active"
              );

            });


            const active =
              document.querySelector(
                `.nav-links a[data-section="${entry.target.id}"]`
              );


            if (active) {

              active.classList.add(
                "active"
              );

            }

          }

        });

      },
      {
        threshold: 0.3
      }
    );


  sections.forEach((section) => {

    sectionObserver.observe(section);

  });


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  document.addEventListener(
    "mousemove",
    (event) => {

      if (!heroImage) return;

      const x =
        (event.clientX / window.innerWidth - 0.5);

      const y =
        (event.clientY / window.innerHeight - 0.5);


      heroImage.style.transform =
        `
        scale(1.03)
        translate(
          ${x * 10}px,
          ${y * 10}px
        )
        `;

    }
  );


  /* =======================================================
     PROJECT 3D TILT
  ======================================================= */

  const projectCards =
    document.querySelectorAll(
      ".project-card"
    );


  projectCards.forEach((card) => {

    const image =
      card.querySelector(".project-image");


    if (!image) return;


    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const rotateY =
          ((x / rect.width) - 0.5) * 6;


        const rotateX =
          ((y / rect.height) - 0.5) * -6;


        image.style.transform =
          `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(1.01)
          `;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        image.style.transform =
          `
          perspective(1000px)
          rotateX(0deg)
          rotateY(0deg)
          scale(1)
          `;

      }
    );

  });


  /* =======================================================
     SKILL BAR OBSERVER
  ======================================================= */

  const skillBars =
    document.querySelector(".skill-bars");


  if (skillBars) {

    const skillObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              skillBars.classList.add(
                "visible"
              );

              skillObserver.unobserve(
                skillBars
              );

            }

          });

        },
        {
          threshold: 0.35
        }
      );


    skillObserver.observe(skillBars);

  }


  /* =======================================================
     IMAGE PARALLAX
  ======================================================= */

  const parallaxImages =
    document.querySelectorAll(
      ".about-image-wrap img"
    );


  window.addEventListener(
    "scroll",
    () => {

      const scrollY =
        window.scrollY;


      parallaxImages.forEach((image) => {

        const parent =
          image.closest(
            ".about-image-wrap"
          );


        if (!parent) return;


        const rect =
          parent.getBoundingClientRect();


        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        ) {

          const movement =
            (window.innerHeight / 2 -
              rect.top) * 0.025;


          image.style.transform =
            `translateY(${movement}px) scale(1.03)`;

        }

      });

    },
    { passive: true }
  );


  /* =======================================================
     SMOOTH ANCHOR LINKS
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) return;


          event.preventDefault();


          const offset =
            navbar.offsetHeight + 15;


          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            offset;


          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });


  /* =======================================================
     PROJECT CARD IMAGE ROTATION RESET
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth <= 600) {

        projectCards.forEach((card) => {

          const image =
            card.querySelector(
              ".project-image"
            );

          if (image) {

            image.style.transform =
              "none";

          }

        });

      }

    }
  );


  /* =======================================================
     CONSOLE
  ======================================================= */

  console.log(
    "%cUNISHKA BISHT",
    "font-size:25px;font-weight:bold;color:#5de6ff;"
  );

  console.log(
    "%cPortfolio loaded successfully.",
    "font-size:14px;color:#737b90;"
  );

});