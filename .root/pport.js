document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     Particles.js Background
  ====================================== */
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 100 },
        color: { value: "#00e0ff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00e0ff",
          opacity: 0.4,
          width: 1
        },
        move: { enable: true, speed: 2, out_mode: "bounce" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }

  /* =====================================
     Resume Download Dropdown
  ====================================== */
  const downloadDropdown = document.querySelector('.download-resume-dropdown');
  const downloadBtn = downloadDropdown.querySelector('.download-btn');

  downloadBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent closing immediately
    downloadDropdown.classList.toggle('show');
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', function() {
    downloadDropdown.classList.remove('show');
  });

  /* =====================================
     Navigation Active Link Highlight
  ====================================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("header nav a[href^='#']");

  function updateActiveNav() {
    let current = "home"; // default section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
  window.scrollTo(0, 0);
  updateActiveNav();

  /* =====================================
     GitHub Projects Fetch + Modal
  ====================================== */
  async function loadRepos() {
    const username = "Alpha-Om3ga";
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
      const repos = await res.json();
      const list = document.getElementById("project-list");
      list.innerHTML = "";
      repos.forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
        `;
        card.addEventListener("click", () => {
          document.getElementById("modal-body").innerHTML = `
            <h2>${repo.name}</h2>
            <p>${repo.description || "No description available."}</p>
            <p><strong>Last updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          document.getElementById("project-modal").classList.add("show");
        });
        list.appendChild(card);
      });
    } catch (e) {
      console.error("Failed to load repos", e);
    }
  }
  loadRepos();

  /* Modal Close Logic */
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");

  modalClose.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", e => { if (e.target.id === "project-modal") modal.classList.remove("show"); });
  window.addEventListener("keydown", e => { if (e.key === "Escape") modal.classList.remove("show"); });

  /* =====================================
     Back to Top Button
  ====================================== */
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 200);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =====================================
     Section Glow Dividers
  ====================================== */
  const sectionsWithDividers = Array.from(sections).slice(1); // skip first section
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + window.innerHeight / 2;
    sectionsWithDividers.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      section.classList.toggle("divider-active", scrollY >= sectionTop && scrollY < sectionBottom);
    });
  });

});
