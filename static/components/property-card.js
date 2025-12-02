class CustomPropertyCard extends HTMLElement {
  connectedCallback() {
    // Translation keys from attributes (optional)
    const titleKey = this.getAttribute("data-title-key") || "";
    const featureKeysAttr = this.getAttribute("data-feature-keys") || "";

    // Fallback English text from attributes
    const fallbackTitle = this.getAttribute("title") || "Property";
    const featuresAttr = this.getAttribute("features") || "";

    // Collect images
    const images = Array.from(this.attributes)
      .filter((a) => /^image\d+$/i.test(a.name))
      .sort((a, b) => {
        const na = parseInt(a.name.replace("image", ""));
        const nb = parseInt(b.name.replace("image", ""));
        return na - nb;
      })
      .map((a) => a.value);

    // Parse feature keys + fallback feature text
    const featureKeys = featureKeysAttr
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const featureTexts = featuresAttr
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const hasFeatures = featureKeys.length || featureTexts.length;

    /* MAIN TEMPLATE */
    this.innerHTML = `
      <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">

        <!-- IMAGE CONTAINER -->
        <div class="relative w-full h-56 overflow-hidden group bg-gray-200">
          <img class="property-main-image w-full h-full object-cover transition-opacity duration-300"
               src="${images[0] || ""}" />

          ${
            images.length > 1
              ? `
            <!-- LEFT ARROW -->
            <button class="gallery-prev absolute left-4 top-1/2 -translate-y-1/2
                           text-white text-5xl font-semibold leading-none
                           opacity-0 group-hover:opacity-100
                           transition-all duration-300 ease-out
                           hover:scale-150
                           drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]
                           hover:drop-shadow-[0_0_18px_rgba(255,255,255,1)]">
              &lsaquo;
            </button>

            <!-- RIGHT ARROW -->
            <button class="gallery-next absolute right-4 top-1/2 -translate-y-1/2
                           text-white text-5xl font-semibold leading-none
                           opacity-0 group-hover:opacity-100
                           transition-all duration-300 ease-out
                           hover:scale-150
                           drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]
                           hover:drop-shadow-[0_0_18px_rgba(255,255,255,1)]">
              &rsaquo;
            </button>

            <!-- DOTS -->
            <div class="gallery-dots absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              ${images
                .map(
                  (_, i) =>
                    `<span class="gallery-dot w-2 h-2 rounded-full ${
                      i === 0 ? "bg-white" : "bg-white/40"
                    }" data-index="${i}"></span>`
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>

        <!-- TEXT -->
        <div class="p-6 flex flex-col flex-1">
          <h3 class="text-xl font-semibold mb-2" ${
            titleKey ? `data-translate="${titleKey}"` : ""
          }>
            ${fallbackTitle}
          </h3>

          ${
            hasFeatures
              ? `<div class="flex flex-wrap gap-2 mb-4">
                ${(() => {
                  const maxLen = Math.max(featureKeys.length, featureTexts.length);
                  const chips = [];
                  for (let i = 0; i < maxLen; i++) {
                    const key = featureKeys[i] || "";
                    const text =
                      featureTexts[i] || featureKeys[i] || "Feature";
                    chips.push(
                      `<span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full" ${
                        key ? `data-translate="${key}"` : ""
                      }>${text}</span>`
                    );
                  }
                  return chips.join("");
                })()}
              </div>`
              : ""
          }

          <p class="text-sm text-gray-600 mb-4" data-translate="property_card_description">
            Discover beautifully designed residences in Batumi’s iconic island development.
          </p>

          <button class="mt-auto bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md"
            data-translate="property_card_button"
            onclick="document.getElementById('quick-contact-modal').classList.remove('hidden')">
            Request Details
          </button>
        </div>
      </div>
    `;

    /* -------------- GALLERY LOGIC -------------- */
    if (!images.length) return;

    let currentIndex = 0;
    const img = this.querySelector(".property-main-image");
    const prev = this.querySelector(".gallery-prev");
    const next = this.querySelector(".gallery-next");
    const dots = [...this.querySelectorAll(".gallery-dot")];

    const update = (i) => {
      currentIndex = (i + images.length) % images.length;

      img.style.opacity = "0";
      setTimeout(() => {
        img.src = images[currentIndex];
        img.style.opacity = "1";
      }, 150);

      dots.forEach((d, idx) => {
        d.className =
          "gallery-dot w-2 h-2 rounded-full " +
          (idx === currentIndex ? "bg-white" : "bg-white/40");
      });
    };

    prev?.addEventListener("click", () => update(currentIndex - 1));
    next?.addEventListener("click", () => update(currentIndex + 1));
    dots.forEach((d) =>
      d.addEventListener("click", () => update(parseInt(d.dataset.index)))
    );

    // Optional: apply current language if translation system is already loaded
    if (typeof applyLanguage === "function") {
      try {
        applyLanguage(window.BIE_CURRENT_LANG || "en");
      } catch (_) {}
    }
  }
}

customElements.define("custom-property-card", CustomPropertyCard);
