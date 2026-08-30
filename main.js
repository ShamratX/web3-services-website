(function () {
  "use strict";

  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const megaToggle = document.getElementById("megaToggle");
  const mega = document.getElementById("mega");

  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      closeMega();
    }
  });

  /* ---------- services mega menu ---------- */
  const setMega = (open) => {
    mega.classList.toggle("is-open", open);
    megaToggle.setAttribute("aria-expanded", String(open));
  };
  const closeMega = () => setMega(false);

  megaToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setMega(!mega.classList.contains("is-open"));
  });

  const wrapper = megaToggle.parentElement;
  let hoverTimer;
  const isDesktop = () => window.matchMedia("(min-width: 861px)").matches;

  wrapper.addEventListener("mouseenter", () => {
    if (!isDesktop()) return;
    clearTimeout(hoverTimer);
    setMega(true);
  });
  wrapper.addEventListener("mouseleave", () => {
    if (!isDesktop()) return;
    hoverTimer = setTimeout(closeMega, 220);
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) closeMega();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeMega();
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });

  /* ---------- scroll reveals ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add("is-visible"), Math.min(i * 70, 280));
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- animated stat counters ---------- */
  const stats = document.querySelectorAll(".stat dd");
  const animateStat = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.textContent.replace(/[\d,]/g, "");
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    stats.forEach((el) => statObserver.observe(el));
  }

  /* ---------- portfolio filters ---------- */
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll("#portfolioGrid .project");
  const emptyState = document.getElementById("emptyState");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;

      filters.forEach((f) => {
        const active = f === btn;
        f.classList.toggle("is-active", active);
        f.setAttribute("aria-selected", String(active));
      });

      let shown = 0;
      projects.forEach((card) => {
        const cats = (card.dataset.cat || "").split(/\s+/);
        const match = cat === "all" || cats.includes(cat);
        card.classList.toggle("is-hidden", !match);
        if (match) shown += 1;
      });

      emptyState.hidden = shown > 0;
    });
  });

  /* ---------- contact form ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "");
    const chain = String(data.get("chain") || "");
    const message = String(data.get("message") || "").trim();

    const invalid = [];
    if (!name) invalid.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) invalid.push("email");
    if (!message) invalid.push("message");

    ["name", "email", "message"].forEach((id) => {
      document.getElementById(id).classList.toggle("is-invalid", invalid.includes(id));
    });

    if (invalid.length) {
      note.textContent = "Please add your name, a valid email and a few project details.";
      note.className = "form-note is-error";
      document.getElementById(invalid[0]).focus();
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\nService: ${topic}\nChain: ${chain}\n\n${message}`;
    const href =
      "mailto:shamratar@gmail.com" +
      "?subject=" + encodeURIComponent(`Web3 project enquiry — ${topic}`) +
      "&body=" + encodeURIComponent(body);

    window.location.href = href;
    note.textContent = "Opening your email client… if nothing happens, email shamratar@gmail.com directly.";
    note.className = "form-note is-ok";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
