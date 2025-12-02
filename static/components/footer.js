class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-slate-950 text-slate-100 pt-12 pb-6 mt-16">
        <div class="max-w-7xl mx-auto px-4 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-slate-800">

            <!-- Brand + description -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <span class="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  BI
                </span>
                <div class="leading-tight">
                  <div class="font-semibold text-base tracking-wide"
                       data-translate="brand_title">
                    Batumi Island Estates
                  </div>
                  <div class="text-[11px] uppercase tracking-[0.18em] text-slate-400"
                       data-translate="brand_tagline">
                    Luxury Island Residences
                  </div>
                </div>
              </div>
              <p class="text-sm text-slate-300 max-w-md"
                 data-translate="footer_brand_desc">
                Premium studio, 1BHK and 2BHK residences on Georgia’s most prestigious island destination,
                combining resort living with strong investment potential.
              </p>
            </div>

            <!-- Navigate -->
            <div>
              <h4 class="text-sm font-semibold mb-3"
                  data-translate="footer_nav_title">
                Navigate
              </h4>
              <ul class="space-y-2 text-sm text-slate-300">
                <li><a href="/#top" class="hover:text-amber-400"
                       data-translate="footer_nav_home">Home</a></li>
                <li><a href="/#why-batumi" class="hover:text-amber-400"
                       data-translate="footer_nav_why_batumi">Why Batumi</a></li>
                <li><a href="/#properties" class="hover:text-amber-400"
                       data-translate="footer_nav_properties">Properties</a></li>
                <li><a href="/#enquiry-form" class="hover:text-amber-400"
                       data-translate="footer_nav_enquiry">Enquiry Form</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h4 class="text-sm font-semibold mb-3"
                  data-translate="footer_contact_title">
                Contact
              </h4>
              <p class="text-sm font-semibold"
                 data-translate="footer_contact_name">
                Batumi Island Estates
              </p>
              <p class="text-sm text-slate-300"
                 data-translate="footer_contact_address_line1">
                18 Andria Pirveltsodebuli Highway III Deadlock gonio
              </p>
              <p class="text-sm text-slate-300 mb-2"
                 data-translate="footer_contact_address_line2">
                Batumi, Georgia
              </p>
              <p class="text-sm text-slate-300"
                 data-translate="footer_contact_phone">
                +995 574 100 645
              </p>
              <p class="text-sm text-slate-300 mb-3"
                 data-translate="footer_contact_email">
                info@batumiislandestates.com
              </p>

              <div class="flex gap-3 text-lg mt-1">
                <a href="https://wa.me/995574100645" target="_blank" rel="noopener"
                   class="hover:text-amber-400">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a href="#" class="hover:text-amber-400"><i class="fab fa-instagram"></i></a>
                <a href="#" class="hover:text-amber-400"><i class="fab fa-facebook-f"></i></a>
              </div>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 text-xs text-slate-400">
            <div data-translate="footer_bottom_rights">
              © 2025 Batumi Island Estates. All rights reserved.
            </div>
            <div class="flex gap-4">
              <a href="#" class="hover:text-amber-400"
                 data-translate="footer_bottom_privacy">Privacy Policy</a>
              <a href="#" class="hover:text-amber-400"
                 data-translate="footer_bottom_terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("custom-footer", CustomFooter);
