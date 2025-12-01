class CustomFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="bg-slate-900 text-slate-200 pt-12 pb-6 mt-16">
        <div class="max-w-7xl mx-auto px-4 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-700/60">
            
            <!-- Brand -->
            <div class="md:col-span-2">
              <div class="flex items-center gap-2 mb-3">
                <span class="h-9 w-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  BI
                </span>
                <div>
                  <div class="font-semibold text-base tracking-wide">
                    Batumi Island Estates
                  </div>
                  <div class="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Luxury Island Residences
                  </div>
                </div>
              </div>
              <p class="text-sm text-slate-400 max-w-md">
                Premium studio, 1BHK and 2BHK residences on Georgia’s most
                prestigious island destination, combining resort living with strong
                investment potential.
              </p>
            </div>

            <!-- Quick links -->
            <div>
              <h4 class="text-sm font-semibold mb-3">Navigate</h4>
              <ul class="space-y-2 text-sm text-slate-400">
                <li><a href="#top" class="hover:text-amber-400 transition-colors">Home</a></li>
                <li><a href="#investment-highlights" class="hover:text-amber-400 transition-colors">Why Batumi</a></li>
                <li><a href="#property-types" class="hover:text-amber-400 transition-colors">Properties</a></li>
                <li><a href="#contact-form" class="hover:text-amber-400 transition-colors">Enquiry Form</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h4 class="text-sm font-semibold mb-3">Contact</h4>
              <ul class="space-y-2 text-sm text-slate-400">
                <li><strong>Batumi Island Estates </strong><br /> 
                </li>
                <li>18 Andria Pirveltsodebuli Highway III<br />
                  Batumi, Georgia 
                </li>
                <li>
                  <a href="tel:+995574100645" class="hover:text-amber-400 transition-colors">
                    +995 574 100 645
                  </a>
                </li>
                <li>
                  <a href="mailto:info@batumiislandestates.com" class="hover:text-amber-400 transition-colors">
                    info@batumiislandestates.com
                  </a>
                </li>
                <li class="flex gap-3 mt-2 text-lg">
                  <a href="https://wa.me/995574100645" target="_blank" class="hover:text-amber-400 transition-colors">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <a href="#" class="hover:text-amber-400 transition-colors">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" class="hover:text-amber-400 transition-colors">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="flex flex-col md:flex-row items-center justify-between pt-4 text-xs text-slate-500 gap-2">
            <div>
              © ${year} Batumi Island Estates. All rights reserved.
            </div>
            <div class="flex gap-4">
              <a href="#" class="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-amber-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("custom-footer", CustomFooter);
