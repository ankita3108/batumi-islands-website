class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="fixed top-0 left-0 w-full z-40 transition-colors duration-300 bg-transparent" id="site-navbar">
        <nav class="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-4">
          <!-- Brand -->
          <a href="/#top" class="flex items-center gap-2">
            <span class="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              BI
            </span>
            <div class="leading-tight">
              <div class="font-semibold text-base tracking-wide nav-brand-title text-white">
                Batumi Island Estates
              </div>
              <div class="text-[11px] uppercase tracking-[0.18em] nav-brand-subtitle text-white/80">
                Luxury Island Residences
              </div>
            </div>
          </a>

          <!-- Desktop Links -->
          <div class="hidden md:flex items-center gap-8 text-sm font-medium nav-links">
            <a href="/#top" class="nav-luxury text-white">Home</a>
            <a href="/#investment-highlights" class="nav-luxury text-white">Why Batumi</a>
            <a href="/#property-types" class="nav-luxury text-white">Properties</a>
            <a href="/project-details" class="nav-luxury text-white">Project Details</a>
            <a href="/life-in-georgia" class="nav-luxury text-white">Life in Georgia</a>
            <a href="/about" class="nav-luxury text-white">About Us</a>
            <a href="/#contact-form" class="nav-luxury text-white">Enquire</a>
          </div>

          <!-- Desktop CTA -->
          <div class="hidden md:flex items-center gap-3">
            <a href="tel:+995574100645"
               class="text-xs font-semibold px-4 py-2 rounded-full border border-white text-white nav-call-btn">
              Call: +995 574 100 645
            </a>
          </div>

          <!-- Desktop language selector -->
            <select
              class="nav-language-select js-language-selector text-xs border border-white/70 bg-transparent text-white rounded-full px-3 py-1 focus:outline-none focus:ring-0"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="ta">TA</option>
              <option value="bn">BN</option>
              <option value="tr">TR</option>
              <option value="ge">GE</option>
              <option value="ru">RU</option>
              <option value="kk">KK</option>
              <option value="de">DE</option>
              <option value="es">ES</option>
              <option value="pt">PT</option>
              <option value="ar">AR</option>
            </select>
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
          <a href="/#top" class="block text-sm py-1 mobile-link nav-luxury">Home</a>
          <a href="/#investment-highlights" class="block text-sm py-1 mobile-link nav-luxury">Why Batumi</a>
          <a href="/#property-types" class="block text-sm py-1 mobile-link nav-luxury">Properties</a>
          <a href="/project-details" class="block text-sm py-1 mobile-link nav-luxury">Project Details</a>
          <a href="/life-in-georgia" class="block text-sm py-1 mobile-link nav-luxury">Life in Georgia</a>
          <a href="/about" class="block text-sm py-1 mobile-link nav-luxury">About Us</a>
          <a href="/#contact-form" class="block text-sm py-1 mobile-link nav-luxury">Enquire</a>
          <a href="tel:+995574100645"
             class="inline-flex items-center justify-center mt-2 px-4 py-2 rounded-full border border-white text-xs font-semibold">
            Call: +995 574 100 645
          </a>

        <!-- Mobile language selector -->
        <div class="pt-3">
          <label class="block text-[11px] text-white/70 mb-1">Language</label>
          <select
            class="js-language-selector w-full bg-black/40 border border-white/40 text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-0"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
            <option value="bn">বাংলা</option>
            <option value="tr">Türkçe</option>
            <option value="ge">ქართული</option>
            <option value="ru">Русский</option>
            <option value="kk">Қазақша</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="pt">Português</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>
    </header>
    `;

    const header = this.querySelector("#site-navbar");
    const toggleBtn = this.querySelector("[data-menu-toggle]");
    const mobileMenu = this.querySelector("[data-mobile-menu]");
    const mobileLinks = this.querySelectorAll(".mobile-link");

    // Scroll effect: transparent over hero, solid on scroll
    const handleScroll = () => {
      if (!header) return;

      const scrolled = window.scrollY > 10;
      const colorTargets = header.querySelectorAll(
        ".nav-links a, .nav-brand-title, .nav-brand-subtitle, .nav-call-btn, .nav-toggle-btn"
      );

      if (scrolled) {
        header.classList.add("bg-white/95", "shadow-md");
        header.classList.remove("bg-transparent");

        colorTargets.forEach((el) => {
          el.classList.remove("text-white", "text-white/80");
          el.classList.add("text-slate-900");
        });
      } else {
        header.classList.remove("bg-white/95", "shadow-md");
        header.classList.add("bg-transparent");

        colorTargets.forEach((el) => {
          el.classList.remove("text-slate-900");
          el.classList.add("text-white");
        });

        const subtitle = header.querySelector(".nav-brand-subtitle");
        if (subtitle) {
          subtitle.classList.add("text-white/80");
        }
      }
    };

    // Initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Mobile toggle
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Close mobile menu after clicking a link
    mobileLinks.forEach((link) =>
      link.addEventListener("click", () => {
        if (mobileMenu) mobileMenu.classList.add("hidden");
      })
    );
  }
}

customElements.define("custom-navbar", CustomNavbar);
