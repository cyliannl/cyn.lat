// Gabrielle Stid — shared site behavior

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // Fade-in on scroll
  const faders = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window && faders.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    faders.forEach((el) => observer.observe(el));
  } else {
    faders.forEach((el) => el.classList.add("visible"));
  }

  // Placeholder "Buy Now" buttons — not yet wired to a payment processor.
  // For now they redirect straight to the thank-you page; once a real checkout
  // (Stripe/Gumroad/Shopify) is wired up, point these at that instead and let
  // the processor's own success redirect send users to thank-you.html.
  document.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "thank-you.html";
    });
  });

  // Footer email capture — placeholder, no backend wired yet.
  const footerForm = document.querySelector(".footer-form");
  if (footerForm) {
    footerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you — you're on the list.");
      footerForm.reset();
    });
  }
});

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}
