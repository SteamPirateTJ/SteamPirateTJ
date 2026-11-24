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

// Which page each section uses (don't change these)
const PAGES = {
  merch: "merch",
  gallery: "gallery",
  stream: "stream",
  allies: "creators",
};

// Work out which pages are hidden
const hiddenPages = Object.keys(SECTIONS)
  .filter(name => !SECTIONS[name])
  .map(name => PAGES[name]);

// Which page is open right now (works with or without ".html")
const currentPage = location.pathname.split("/").pop().replace(/\.html$/, "");

// If someone opens a hidden page directly, send them home
if (hiddenPages.includes(currentPage)) {
  location.replace("./");
}

// Hide ".html" from the address bar (stream.html shows as /stream)
if (/\.html$/.test(location.pathname)) {
  const cleanPath = location.pathname.replace(/index\.html$/, "").replace(/\.html$/, "");
  history.replaceState(null, "", cleanPath + location.search + location.hash);
}

document.addEventListener("DOMContentLoaded", () => {
  // Remove hidden pages from the menu
  hiddenPages.forEach(page => {
    document.querySelectorAll('.nav-links a[href="' + page + '.html"]').forEach(a => a.remove());
  });

  // Make every internal link clean (no ".html")
  document.querySelectorAll("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (/^[^:#?]+\.html$/.test(href)) {
      a.setAttribute("href", href === "index.html" ? "./" : href.replace(/\.html$/, ""));
    }
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
