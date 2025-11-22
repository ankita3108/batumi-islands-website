class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="fixed top-0 left-0 w-full z-40 transition-colors duration-300" id="site-navbar">
        <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-4">
          <!-- Brand -->
          <a href="#top" class="flex items-center gap-2">
            <span class="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              BI
            </span>
            <div class="leading-tight">
              <div class="font-semibold text-base tracking-wide nav-brand-title">
                Batumi Island Estates
              </div>
              <div class="text-[11px] uppercase tracking-[0.18em] nav-brand-subtitle">
                Luxury Island Residences
              </div>
            </div>
          </a>

          <!-- Desktop Links -->
          <div class="hidden md:flex items-center gap-8 text-sm font-medium nav-links">
            <a href="#top" class="hover:text-amber-500 transition-colors">Home</a>
            <a href="#investment-highlights" class="hover:text-amber-500 transition-colors">Why Batumi</a>
            <a href="#property-types" class="hover:text-amber-500 transition-colors">Properties</a>
            <a href="#contact-form" class="hover:text-amber-500 transition-colors">Enquire</a>
          </div>

          <!-- Desktop CTA -->
          <div class="hidden md:flex items-center gap-3">
            <a href="tel:+995574100645"
               class="text-xs font-semibold px-4 py-2 rounded-full border border-current nav-call-btn">
              Call: +995 574 100 645
            </a>
          </div>

          <!-- Mobile menu button -->
          <button class="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/60 text-white nav-toggle-btn"
                  type="button" aria-label="Toggle navigation" data-menu-toggle>
            <span class="hamburger-icon block w-4 h-[2px] bg-current relative">
              <span class="block w-4 h-[2px] bg-current absolute -top-1.5"></span>
              <span class="block w-4 h-[2px] bg-current absolute top-1.5"></span>
            </span>
          </button>
        </nav>

        <!-- Mobile menu -->
        <div class="md:hidden bg-black/70 backdrop-blur-sm text-white px-4 pb-4 space-y-3 hidden" data-mobile-menu>
          <a href="#top" class="block text-sm py-1 mobile-link">Home</a>
          <a href="#investment-highlights" class="block text-sm py-1 mobile-link">Why Batumi</a>
          <a href="#property-types" class="block text-sm py-1 mobile-link">Properties</a>
          <a href="#contact-form" class="block text-sm py-1 mobile-link">Enquire</a>
          <a href="tel:+995574100645"
             class="inline-flex items-center justify-center mt-2 px-4 py-2 rounded-full border border-white text-xs font-semibold">
            Call: +995 574 100 645
          </a>
        </div>
      </header>
    `;

    const header = this.querySelector("#site-navbar");
    const toggleBtn = this.querySelector("[data-menu-toggle]");
    const mobileMenu = this.querySelector("[data-mobile-menu]");
    const mobileLinks = this.querySelectorAll(".mobile-link");

    // Scroll effect: transparent over hero, solid on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled) {
        header.classList.add("bg-white/95", "shadow-md");
        header.classList.remove("bg-transparent");
        header.querySelectorAll(".nav-links a, .nav-brand-title, .nav-brand-subtitle, .nav-call-btn, .nav-toggle-btn")
          .forEach((el) => {
            el.classList.remove("text-white");
            el.classList.add("text-slate-900");
          });
      } else {
        header.classList.remove("bg-white/95", "shadow-md");
        header.classList.add("bg-transparent");
        header.querySelectorAll(".nav-links a, .nav-brand-title, .nav-brand-subtitle, .nav-call-btn, .nav-toggle-btn")
          .forEach((el) => {
            el.classList.remove("text-slate-900");
            el.classList.add("text-white");
          });
      }
    };

    // Initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Mobile toggle
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden");
        if (isHidden) {
          mobileMenu.classList.remove("hidden");
        } else {
          mobileMenu.classList.add("hidden");
        }
      });
    }

    // Close mobile menu after clicking a link
    mobileLinks.forEach((link) =>
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      })
    );
  }
}

customElements.define("custom-navbar", CustomNavbar);
