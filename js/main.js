/* ============================================================
   NSK AUTOMATION — landing page behaviour
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = String(new Date().getFullYear());

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.classList.remove("open");
      }
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
      header.style.boxShadow = "0 4px 18px rgba(0,0,0,.28)";
    } else {
      header.classList.remove("scrolled");
      header.style.boxShadow = "none";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Video modal ---------- */
  var modal = document.getElementById("videoModal");
  var video = document.getElementById("modalVideo");
  var variantsBox = document.getElementById("videoVariants");
  var variantsBtns = variantsBox ? variantsBox.querySelector(".vv-buttons") : null;

  function closeModal() {
    if (video) { video.pause(); video.removeAttribute("src"); video.load(); }
    if (variantsBox) variantsBox.hidden = true;
    if (variantsBtns) variantsBtns.innerHTML = "";
    if (modal) modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  function openModal(srcs, labels, title) {
    if (!modal || !video || !srcs.length) return;

    var list = Array.isArray(srcs) ? srcs : [srcs];
    var lbl = Array.isArray(labels) ? labels : [];

    if (list.length > 1 && variantsBox && variantsBtns) {
      variantsBox.hidden = false;
      variantsBtns.innerHTML = "";
      list.forEach(function (src, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "vv-btn";
        b.textContent = lbl[i] || ("Video " + (i + 1));
        b.addEventListener("click", function () {
          selectClip(i);
          variantsBtns.querySelectorAll(".vv-btn").forEach(function (x) { x.classList.remove("active"); });
          b.classList.add("active");
        });
        variantsBtns.appendChild(b);
      });
    } else {
      if (variantsBox) variantsBox.hidden = true;
      if (variantsBtns) variantsBtns.innerHTML = "";
    }

    function selectClip(i) {
      video.pause();
      video.src = list[i];
      video.play().catch(function () {});
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    selectClip(0);

    if (list.length > 1) {
      var first = variantsBtns.querySelector(".vv-btn");
      if (first) { first.classList.add("active"); }
    }
  }

  document.querySelectorAll("[data-video]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var raw = btn.getAttribute("data-video");
      var list = raw.split(";").map(function (s) { return s.trim(); }).filter(Boolean);
      var variants = (btn.getAttribute("data-variants") || "").split(";").map(function (s) { return s.trim(); }).filter(Boolean);
      openModal(list, variants);
    });
  });

  /* ---------- Close modal on Escape ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  /* ---------- Contact form -> Formspree email ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var FORM_ENDPOINT = "https://formspree.io/f/xjyvewew";
    var statusEl = document.getElementById("formStatus");
    var sendBtn = document.getElementById("f-send");

    var report = function (type, text) {
      statusEl.textContent = text;
      statusEl.className = "form-status " + type;
      statusEl.hidden = false;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (FORM_ENDPOINT.indexOf("YOUR_FORM_ID") !== -1) {
        report("error", "Form is not configured yet. Please contact us directly by phone or email.");
        return;
      }
      var payload = {
        name: document.getElementById("f-name").value.trim(),
        email: document.getElementById("f-email").value.trim(),
        phone: document.getElementById("f-phone").value.trim(),
        message: document.getElementById("f-msg").value.trim()
      };
      var oldLabel = sendBtn.textContent;
      sendBtn.disabled = true;
      sendBtn.textContent = "Sending…";

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          report("ok", "Thank you — your enquiry has been sent. We'll get back to you shortly.");
        } else {
          return res.json().then(function (data) {
            throw new Error(data.errors ? data.errors.map(function (er) { return er.message; }).join(", ") : "Request failed");
          });
        }
      }).catch(function () {
        report("error", "Sorry, sending failed. Please email us at nskautomation@nskautomation.co.in or call +91 82176 06571.");
      }).finally(function () {
        sendBtn.disabled = false;
        sendBtn.textContent = oldLabel;
      });
    });
  }
})();