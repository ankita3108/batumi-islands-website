class CustomWhatsAppFloat extends HTMLElement {
  connectedCallback() {
    const phone = "+995574100645";

    this.innerHTML = `
      <a href="https://wa.me/${phone.replace(/\D/g, '')}"
         target="_blank"
         class="fixed bottom-6 right-6 z-50 group">

        <div class="h-14 w-14 rounded-full bg-green-500 
                    flex items-center justify-center
                    shadow-lg shadow-green-500/40
                    hover:shadow-green-500/80
                    transition-all duration-300
                    hover:scale-110">

          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
               class="h-8 w-8 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" 
               alt="WhatsApp" />
        </div>
      </a>
    `;
  }
}

customElements.define("custom-whatsapp-float", CustomWhatsAppFloat);
