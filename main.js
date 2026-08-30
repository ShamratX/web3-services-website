(function () {
  "use strict";

  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const megaToggle = document.getElementById("megaToggle");
  const mega = document.getElementById("mega");

  const toTop = document.getElementById("toTop");

  /* Backstop for the scrollRestoration opt-out in the page head: if a browser
     restored the old position anyway, put the reader back at the top once the
     layout has settled. Skipped when the URL names a section, so shared links
     like /#pricing still land where they should. */
  if (!location.hash) {
    window.addEventListener("load", () => {
      requestAnimationFrame(() => window.scrollTo(0, 0));
    });
  }

  const onScroll = () => {
    header.classList.toggle("is-stuck", window.scrollY > 12);
    toTop.classList.toggle("is-visible", window.scrollY > 700);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toTop.addEventListener("click", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });

  /* Footer sections are dropdowns on phones and plain columns on desktop.
     The <details> panels are left permanently open and the phone collapse is
     driven by a class instead, because the browser's own toggle was hiding
     desktop columns on a stray click with no chevron to hint how to undo it.
     Desktop visibility now depends on nothing but CSS. */
  const footerCols = document.querySelectorAll(".footer-col");
  const wideFooter = window.matchMedia("(min-width: 621px)");

  const setCollapsed = (col, collapsed) => {
    col.classList.toggle("is-collapsed", collapsed);
    col.querySelector("summary").setAttribute("aria-expanded", String(!collapsed));
  };

  const syncFooter = () => {
    footerCols.forEach((col) => setCollapsed(col, !wideFooter.matches));
  };

  footerCols.forEach((col) => {
    col.querySelector("summary").addEventListener("click", (e) => {
      // Never let the browser toggle the panel shut.
      e.preventDefault();
      if (wideFooter.matches) return;

      const expanding = col.classList.contains("is-collapsed");
      setCollapsed(col, !expanding);
      if (!expanding) return;

      // Expanding the bottom section pushes its links below the fold, which
      // reads as "nothing happened". Bring them into view, clear of the
      // sticky action bar.
      requestAnimationFrame(() => {
        const hidden = col.getBoundingClientRect().bottom - (window.innerHeight - 96);
        if (hidden <= 0) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
          top: window.scrollY + hidden,
          behavior: reduced ? "auto" : "smooth",
        });
      });
    });
  });

  syncFooter();
  wideFooter.addEventListener("change", syncFooter);
  // Rotating a phone can cross the breakpoint; orientationchange fires for that
  // case only, so it cannot collapse a section mid-scroll the way resize did.
  window.addEventListener("orientationchange", () => setTimeout(syncFooter, 100));

  const backdrop = document.getElementById("navBackdrop");

  const setNav = (open) => {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    // Lock the page behind the sheet so only the menu scrolls.
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add("is-open"));
    } else {
      backdrop.classList.remove("is-open");
      setTimeout(() => { backdrop.hidden = true; }, 300);
    }
  };

  navToggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setNav(false));

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      setNav(false);
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
    setNav(false);
  });

  /* ---------- scroll reveals ---------- */
  const reveals = document.querySelectorAll(".reveal");
  const revealAll = () => reveals.forEach((el) => el.classList.add("is-visible"));

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

    // A deep link lands mid-page, so reveal that section immediately and
    // re-apply the jump once fonts and images have settled the layout.
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
        target.classList.add("is-visible");
        window.addEventListener("load", () => {
          requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
        });
      }
    }
  } else {
    revealAll();
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

  /* ---------- carousel dots ----------
     The rails only scroll horizontally on phones, so each one gets a row of
     dots showing how many cards there are and which one is in view. */
  const railRebuilds = [];

  document.querySelectorAll(".rail").forEach((rail) => {
    const dots = document.createElement("div");
    dots.className = "rail-dots";
    dots.setAttribute("role", "group");
    dots.setAttribute("aria-label", "Jump to a card");
    rail.after(dots);

    let cards = [];

    const cardOffset = (card) =>
      card.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;

    const markActive = () => {
      if (!cards.length) return;
      let active = 0;
      let closest = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(cardOffset(card) - rail.scrollLeft);
        if (distance < closest) { closest = distance; active = i; }
      });
      dots.querySelectorAll(".rail-dot").forEach((dot, i) => {
        const on = i === active;
        dot.classList.toggle("is-active", on);
        if (on) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const build = () => {
      cards = [...rail.children].filter((el) => !el.classList.contains("is-hidden"));
      dots.textContent = "";
      // A single card needs no indicator.
      if (cards.length < 2) return;
      cards.forEach((card, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "rail-dot";
        const label = card.querySelector("h3");
        dot.setAttribute("aria-label", label ? label.textContent.trim() : "Card " + (i + 1));
        dot.addEventListener("click", () => {
          rail.scrollTo({ left: cardOffset(card), behavior: "smooth" });
        });
        dots.appendChild(dot);
      });
      markActive();
    };

    build();
    railRebuilds.push(build);
    rail.addEventListener("scroll", markActive, { passive: true });
    window.addEventListener("resize", markActive);
  });

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
        f.setAttribute("aria-pressed", String(active));
      });

      let shown = 0;
      projects.forEach((card) => {
        const cats = (card.dataset.cat || "").split(/\s+/);
        const match = cat === "all" || cats.includes(cat);
        card.classList.toggle("is-hidden", !match);
        if (match) shown += 1;
      });

      emptyState.hidden = shown > 0;
      // The visible card count changed, so the dots have to follow.
      railRebuilds.forEach((rebuild) => rebuild());
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

  // Safety net: nothing stays hidden if an observer never fires.
  window.addEventListener("load", () => setTimeout(revealAll, 2500));
})();
