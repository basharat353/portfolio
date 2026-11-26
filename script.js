/* =========================================================
   APNI DETAILS YAHAN LIKHEIN (sirf ye block edit karna hai)
   Jo link khali "" chhorein ga, wo button/link chhup jaye ga.
   ========================================================= */
const CONFIG = {
  email: "",          // misal: "basharat@gmail.com"
  whatsapp: "",       // misal: "923001234567" (sirf numbers, 92 se shuru)
  github: "",         // misal: "https://github.com/basharat-umar"
  linkedin: "",       // misal: "https://linkedin.com/in/basharat-umar"

  // Har project ka live link (Netlify/Vercel) aur code link (GitHub)
  live: {
    luxeora: "",
    nexora: "",
    toolifyhub: "",
    littleglamour: "",
  },
  code: {
    luxeora: "",
    nexora: "",
    toolifyhub: "",
    littleglamour: "",
  },
};

/* ---------------- links fill karna ---------------- */
function setLink(el, url) {
  if (url) {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener";
  } else {
    el.classList.add("disabled");
    el.setAttribute("aria-disabled", "true");
    el.removeAttribute("href");
  }
}

document.querySelectorAll("[data-live]").forEach((el) => setLink(el, CONFIG.live[el.dataset.live]));
document.querySelectorAll("[data-code]").forEach((el) => setLink(el, CONFIG.code[el.dataset.code]));

const contactUrls = {
  email: CONFIG.email && `mailto:${CONFIG.email}`,
  whatsapp: CONFIG.whatsapp && `https://wa.me/${CONFIG.whatsapp}`,
  github: CONFIG.github,
  linkedin: CONFIG.linkedin,
};
document.querySelectorAll("[data-contact]").forEach((el) => {
  const url = contactUrls[el.dataset.contact];
  if (url) el.href = url;
  else el.style.display = "none";
});

/* ---------------- mobile menu ---------------- */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ---------------- nav border on scroll ---------------- */
const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });

/* ---------------- project filter ---------------- */
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".project").forEach((p) => {
      p.classList.toggle("hide", f !== "all" && !p.dataset.tags.split(" ").includes(f));
    });
  });
});

/* ---------------- reveal + counters ---------------- */
function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - start) / 1200);
    el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
