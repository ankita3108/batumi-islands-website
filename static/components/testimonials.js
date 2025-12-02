class CustomTestimonials extends HTMLElement {
  connectedCallback() {
    const testimonials = [
      {
        name: "Olivia K.",
        role: "Investor from London, UK",
        text:
          "Batumi Island Estates ticked every box for me – sea views, strong rental yields and a transparent process. The team guided me through each step like a private concierge.",
        keyPrefix: "testimonial1",
      },
      {
        name: "Rahul S.",
        role: "NRI Investor, Dubai",
        text:
          "I was looking for a safe but high-growth opportunity outside the usual markets. The combination of island lifestyle and Georgia’s investor-friendly regulations made this an easy decision.",
        keyPrefix: "testimonial2",
      },
      {
        name: "Maria P.",
        role: "Holiday Home Buyer, Athens",
        text:
          "The finishes, amenities and views are on par with top Mediterranean resorts. I use the apartment a few weeks a year and the rental team manages it seamlessly the rest of the time.",
        keyPrefix: "testimonial3",
      },
    ];

    this.innerHTML = `
      <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-10"
              data-translate="testimonials_title">
            What Our Investors Say
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${testimonials
              .map((t, idx) => {
                const initials = t.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2);

                const nameKey = `${t.keyPrefix}_name`;
                const roleKey = `${t.keyPrefix}_role`;
                const textKey = `${t.keyPrefix}_text`;

                return `
              <div class="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col h-full shadow-sm">
                <div class="flex items-center gap-3 mb-4">
                  <div class="h-10 w-10 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-semibold">
                    ${initials}
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900" data-translate="${nameKey}">${t.name}</p>
                    <p class="text-xs text-gray-500" data-translate="${roleKey}">${t.role}</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed flex-1" data-translate="${textKey}">
                  “${t.text}”
                </p>
                <div class="mt-4 flex gap-1 text-amber-500">
                  <i class="fas fa-star text-xs"></i>
                  <i class="fas fa-star text-xs"></i>
                  <i class="fas fa-star text-xs"></i>
                  <i class="fas fa-star text-xs"></i>
                  <i class="fas fa-star text-xs"></i>
                </div>
              </div>
            `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("custom-testimonials", CustomTestimonials);
