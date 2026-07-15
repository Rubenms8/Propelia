/* =============================================================
   AGENCY PROPELIA — main.js  (IIFE, classic script, no modules)
   ============================================================= */
(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $  = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };

  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- Splash ---------- */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hide = function () { splash.classList.add("is-out"); };
    if (document.readyState === "complete") setTimeout(hide, 500);
    else window.addEventListener("load", function () { setTimeout(hide, 350); });
    setTimeout(hide, 3800); // safety
  }

  /* ---------- Nav scroll state + mobile menu ---------- */
  function initNav() {
    var nav = $("[data-nav]");
    var onScroll = function () {
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $("[data-nav-toggle]");
    var menu = $("[data-mobile-menu]");
    if (toggle && menu) {
      var setOpen = function (open) {
        menu.classList.toggle("is-open", open);
        menu.setAttribute("aria-hidden", open ? "false" : "true");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        document.body.style.overflow = open ? "hidden" : "";
      };
      toggle.addEventListener("click", function () {
        setOpen(!menu.classList.contains("is-open"));
      });
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () { setOpen(false); });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
      });
    }
  }

  /* ---------- Smooth anchor scroll (native, offset for nav) ---------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Mouse-reactive gradients ---------- */
  function initMouseGradient() {
    var zones = $$("[data-mouse-gradient]");
    if (!zones.length) return;
    if (!fineHover) return; // touch: keep the static default position
    var raf = null, mx = 50, my = 40;
    window.addEventListener("mousemove", function (e) {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        zones.forEach(function (z) {
          z.style.setProperty("--mx", mx + "%");
          z.style.setProperty("--my", my + "%");
        });
      });
    }, { passive: true });
  }

  /* ---------- Service card cursor glow ---------- */
  function initCardGlow() {
    if (!fineHover) return;
    $$(".service-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--cx", ((e.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--cy", ((e.clientY - r.top) / r.height * 100) + "%");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;

    // Stagger elements that share a parent
    els.forEach(function (el) {
      var sibs = el.parentElement ? $$("[data-reveal]", el.parentElement) : [el];
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 70, 350) + "ms";
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });

    // Safety: reveal anything still hidden after 6s
    setTimeout(function () {
      $$("[data-reveal]:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------- Count-up stats ---------- */
  function initCounters() {
    var counters = $$("[data-count-to]");
    if (!counters.length) return;

    var run = function (el) {
      if (el.dataset.counted) return;
      el.dataset.counted = "1";
      var target = parseFloat(el.getAttribute("data-count-to")) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduced) { el.textContent = target + suffix; return; }
      var dur = 1500, start = null;
      var step = function (t) {
        if (!start) start = t;
        var p = Math.min((t - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) { counters.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = 0.28;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * strength;
        var y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Seamless marquee (duplicate content) ---------- */
  function initMarquee() {
    var track = $("[data-marquee]");
    if (!track || track.dataset.dup) return;
    track.dataset.dup = "1";
    track.innerHTML = track.innerHTML + track.innerHTML;
  }

  /* ---------- FAQ: one open at a time ---------- */
  function initFaq() {
    var items = $$("[data-faq] details");
    items.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }

  /* ---------- Brand videos: play only when visible ----------
     Note: NOT gated by prefers-reduced-motion. These are subtle,
     muted, looping brand marks (identity, not intrusive motion).
     Windows ships reduced-motion ON by default, so gating them
     would leave the site looking dead. See gotcha A.2. */
  function initBrandVideos() {
    var vids = $$("video.brand-video");
    if (!vids.length) return;

    var tryPlay = function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); };

    if (!("IntersectionObserver" in window)) { vids.forEach(tryPlay); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) tryPlay(en.target);
        else { try { en.target.pause(); } catch (e) {} }
      });
      // Arranca antes de entrar en pantalla: al verlo, ya está animando (sin hueco).
    }, { threshold: 0, rootMargin: "400px 0px" });
    vids.forEach(function (v) { io.observe(v); });
  }

  /* ---------- Custom cursor (fine pointer only) ---------- */
  function initCursor() {
    if (!fineHover) return;
    var cursor = $("[data-cursor]");
    if (!cursor) return;
    var dot = $(".cursor-dot", cursor), ring = $(".cursor-ring", cursor);
    if (!dot || !ring) return;
    document.documentElement.classList.add("has-cursor");
    var mx = 0, my = 0, rx = 0, ry = 0, first = false;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
      if (!first) { first = true; rx = mx; ry = my; cursor.classList.add("is-ready"); }
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    var HOVER = "a, button, [data-magnetic], summary, .caso-card, .service-card, .faq-item, .testimonio, .wa-float, input";
    document.addEventListener("mouseover", function (e) {
      var h = e.target.closest ? e.target.closest(HOVER) : null;
      cursor.classList.toggle("is-hover", !!h);
    }, { passive: true });
    document.addEventListener("mousedown", function () { cursor.classList.add("is-down"); });
    document.addEventListener("mouseup", function () { cursor.classList.remove("is-down"); });
    document.addEventListener("mouseleave", function () { cursor.classList.remove("is-ready"); });
    document.addEventListener("mouseenter", function () { cursor.classList.add("is-ready"); });
  }

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress() {
    var bar = $("[data-progress]");
    if (!bar) return;
    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = p.toFixed(2) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- 3D tilt on standalone cards ---------- */
  function initTilt() {
    if (!fineHover) return;
    var MAX = 5;
    $$(".caso-card, .testimonio").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "perspective(1000px) rotateY(" + (px * MAX) + "deg) rotateX(" + (-py * MAX) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ---------- Cookie consent ---------- */
  function initCookies() {
    var KEY = "propelia_consent";
    var banner = $("[data-cookie-banner]");
    var modal = $("[data-cookie-modal]");
    var read = function () {
      try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
    };
    var save = function (analytics, marketing) {
      var consent = { necessary: true, analytics: !!analytics, marketing: !!marketing, ts: Date.now() };
      try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch (e) {}
      applyConsent(consent);
      return consent;
    };
    function applyConsent(c) {
      window.__consent = c;
      // Google Analytics 4 (Consent Mode): activar la medición solo si se acepta.
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': c.analytics ? 'granted' : 'denied',
          'ad_storage': c.marketing ? 'granted' : 'denied',
          'ad_user_data': c.marketing ? 'granted' : 'denied',
          'ad_personalization': c.marketing ? 'granted' : 'denied'
        });
      }
    }
    var showBanner = function () { if (banner) banner.classList.add("is-visible"); };
    var hideBanner = function () { if (banner) banner.classList.remove("is-visible"); };
    var openModal = function () {
      if (!modal) return;
      var c = read() || { analytics: false, marketing: false };
      var a = $("[data-cookie-analytics]", modal), m = $("[data-cookie-marketing]", modal);
      if (a) a.checked = !!c.analytics;
      if (m) m.checked = !!c.marketing;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    };
    var closeModal = function () { if (modal) { modal.hidden = true; document.body.style.overflow = ""; } };

    // Wire buttons (works on any page that includes the markup)
    $$("[data-cookie-accept]").forEach(function (b) { b.addEventListener("click", function () { save(true, true); hideBanner(); closeModal(); }); });
    $$("[data-cookie-reject]").forEach(function (b) { b.addEventListener("click", function () { save(false, false); hideBanner(); closeModal(); }); });
    $$("[data-cookie-config]").forEach(function (b) { b.addEventListener("click", openModal); });
    $$("[data-cookie-settings]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openModal(); }); });
    $$("[data-cookie-save]").forEach(function (b) {
      b.addEventListener("click", function () {
        var a = $("[data-cookie-analytics]", modal), m = $("[data-cookie-marketing]", modal);
        save(a && a.checked, m && m.checked); hideBanner(); closeModal();
      });
    });
    $$("[data-cookie-close]").forEach(function (b) { b.addEventListener("click", closeModal); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal && !modal.hidden) closeModal(); });

    var current = read();
    if (current) applyConsent(current);
    else if (banner) setTimeout(showBanner, 900);
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    var y = $("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Hero parallax on scroll (GSAP, subtle) ---------- */
  function initHeroParallax() {
    if (reduced || !window.gsap || !window.ScrollTrigger) return;
    var grid = $(".hero-grid-overlay");
    var slot = $(".hero-logo-slot");
    if (grid) {
      gsap.to(grid, {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
      });
    }
    if (slot) {
      gsap.to(slot, {
        y: -30, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 }
      });
    }
  }

  /* ---------- Boot ---------- */
  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initMouseGradient, "initMouseGradient");
    safe(initCardGlow, "initCardGlow");
    safe(initMarquee, "initMarquee");
    safe(initReveals, "initReveals");
    safe(initCounters, "initCounters");
    safe(initMagnetic, "initMagnetic");
    safe(initFaq, "initFaq");
    safe(initBrandVideos, "initBrandVideos");
    safe(initCursor, "initCursor");
    safe(initScrollProgress, "initScrollProgress");
    safe(initTilt, "initTilt");
    safe(initCookies, "initCookies");
    safe(initYear, "initYear");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (e) {}
      safe(initHeroParallax, "initHeroParallax");
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
