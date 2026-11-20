document.addEventListener("DOMContentLoaded", () => {
  // Automatic copyright year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Smooth scrolling for in-page anchors (ignores bare "#")
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (href.length < 2) return;
    anchor.addEventListener("click", e => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
