// =====================================================
// SITE SECTIONS: turn pages on or off here
//   true  = shown in the menu and reachable
//   false = hidden from the menu, visitors get sent home
// After changing, commit the file and wait a minute.
// =====================================================
const SECTIONS = {
  merch: false,
  gallery: false,
  stream: true,
  allies: true,
};

// Which file each section uses (don't change these)
const PAGES = {
  merch: "merch.html",
  gallery: "gallery.html",
  stream: "stream.html",
  allies: "creators.html",
};

// Work out which pages are hidden
const hiddenPages = Object.keys(SECTIONS)
  .filter(name => !SECTIONS[name])
  .map(name => PAGES[name]);

// If someone opens a hidden page directly, send them home
const currentPage = location.pathname.split("/").pop();
if (hiddenPages.includes(currentPage)) {
  location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
  // Remove hidden pages from the menu
  hiddenPages.forEach(file => {
    document.querySelectorAll('.nav-links a[href="' + file + '"]').forEach(a => a.remove());
  });

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
