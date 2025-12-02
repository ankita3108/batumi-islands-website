// Shared function to send enquiry to backend
async function sendEnquiry(payload, statusEl, submitBtn) {
  if (statusEl) {
    statusEl.textContent = "";
    statusEl.className = "text-xs text-gray-500";
  }
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent =
      typeof bieT === "function"
        ? bieT("enquiry_btn_sending", "Sending...")
        : "Sending...";
  }

  // basic validation
  if (!payload.name || !payload.phone) {
    if (statusEl) {
      statusEl.textContent =
        typeof bieT === "function"
          ? bieT(
              "enquiry_validation",
              "Please provide your name and phone number."
            )
          : "Please provide your name and phone number.";
      statusEl.className = "text-xs text-red-500";
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent =
        typeof bieT === "function"
          ? bieT("enquiry_btn_submit", "Submit Enquiry")
          : "Submit Enquiry";
    }
    return;
  }

  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      throw new Error(data.message || "Unable to send enquiry right now.");
    }

    if (statusEl) {
      if (data.dryRun) {
        statusEl.textContent =
          typeof bieT === "function"
            ? bieT(
                "enquiry_status_dryrun",
                "Thank you. Your enquiry has been received (test mode). Email sending is not yet configured."
              )
            : "Thank you. Your enquiry has been received (test mode). Email sending is not yet configured.";
      } else {
        statusEl.textContent =
          typeof bieT === "function"
            ? bieT(
                "enquiry_status_success",
                "Thank you. Your enquiry has been received. Our team will connect with you shortly."
              )
            : "Thank you. Your enquiry has been received. Our team will connect with you shortly.";
      }
      statusEl.className = "text-xs text-emerald-600";
    }
  } catch (err) {
    console.error("Enquiry error:", err);
    if (statusEl) {
      statusEl.textContent =
        typeof bieT === "function"
          ? bieT(
              "enquiry_status_error",
              "Something went wrong while sending your enquiry. Please try again or use WhatsApp / Call."
            )
          : "Something went wrong while sending your enquiry. Please try again or use WhatsApp / Call.";
      statusEl.className = "text-xs text-red-500";
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent =
        typeof bieT === "function"
          ? bieT("enquiry_btn_submit", "Submit Enquiry")
          : "Submit Enquiry";
    }
  }
}

/* =========================
   MAIN CONTACT FORM COMPONENT
   ========================= */
class CustomContactForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">
        <h2 class="text-2xl md:text-3xl font-bold mb-2 text-center"
            data-translate="contact_title">
          Request Detailed Investment Information
        </h2>
        <p class="text-sm text-gray-600 mb-6 text-center"
           data-translate="contact_subtitle">
          Share your details and our team will connect with you for floor plans, yields,
          payment terms and availability.
        </p>

        <form id="main-enquiry-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                     data-translate="contact_label_fullname">
                Full Name *
              </label>
              <input 
                type="text" 
                name="name" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                     data-translate="contact_label_email">
                Email
              </label>
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com"
                data-placeholder="contact_ph_email"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- COUNTRY CODE (SEARCHABLE) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                     data-translate="contact_label_country_code">
                Country Code *
              </label>
              <input
                type="text"
                name="country_code"
                list="country-codes"
                placeholder="+995"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                      focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
              <p class="text-xs text-gray-500 mt-1"
                 data-translate="contact_cc_help">
                Type your country name or dialing code (e.g., India, +91, Georgia, +995).
              </p>
            </div>

            <!-- PHONE NUMBER -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                     data-translate="contact_label_phone">
                Phone Number *
              </label>
              <input 
                type="tel" 
                name="phone" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                      focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                     data-translate="contact_label_apartment_type">
                Apartment Type
              </label>
              <select 
                name="apartmentType"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="" data-translate="contact_select_type">Select</option>
                <option value="Luxury Studio" data-translate="quick_opt_studio">Luxury Studio</option>
                <option value="1BHK Apartment" data-translate="quick_opt_1bhk">1BHK Apartment</option>
                <option value="2BHK Apartment" data-translate="quick_opt_2bhk">2BHK Apartment</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                     data-translate="contact_label_budget">
                Approx. Budget (USD)
              </label>
              <input 
                type="text" 
                name="budget"
                placeholder="e.g. 150,000"
                data-placeholder="contact_ph_budget"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
                   data-translate="contact_label_message">
              Message / Requirements
            </label>
            <textarea 
              name="message"
              rows="4"
              placeholder="Tell us your investment goals, stay duration, rental expectations, etc."
              data-placeholder="contact_ph_message"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            ></textarea>
          </div>

          <div class="flex items-center justify-between flex-col sm:flex-row gap-3">
            <p id="main-enquiry-status" class="text-xs text-gray-500 text-left"></p>
            <button 
              type="submit"
              id="main-enquiry-submit"
              class="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-6 py-2 rounded-md"
              data-translate="enquiry_btn_submit">
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    `;

    const form = this.querySelector("#main-enquiry-form");
    const statusEl = this.querySelector("#main-enquiry-status");
    const submitBtn = this.querySelector("#main-enquiry-submit");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const payload = {
        form_type: "contact",
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        country_code: formData.get("country_code") || "",
        apartment_type: formData.get("apartmentType") || "",
        budget: formData.get("budget") || "",
        message: formData.get("message") || "",
      };

      await sendEnquiry(payload, statusEl, submitBtn);

      if (statusEl && statusEl.className.includes("text-emerald-600")) {
        form.reset();
      }
    });
  }
}

customElements.define("custom-contact-form", CustomContactForm);

/* =========================
   QUICK CONTACT MODAL FORM
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const quickForm = document.getElementById("quick-contact-form");
  if (!quickForm) return;

  let quickStatus = document.createElement("p");
  quickStatus.id = "quick-contact-status";
  quickStatus.className = "text-xs text-gray-500 mt-2";
  quickForm.appendChild(quickStatus);

  const quickSubmit = quickForm.querySelector('button[type="submit"]');

  quickForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("quick-name")?.value || "";
    const email = document.getElementById("quick-email")?.value || "";
    const phone = document.getElementById("quick-phone")?.value || "";

    let countryCodeInput =
      document.getElementById("quick-country-code") ||
      quickForm.querySelector('[name="country_code"]') ||
      quickForm.querySelector('[name="countryCode"]');

    const countryCode = countryCodeInput ? countryCodeInput.value || "" : "";

    const apartmentType =
      document.getElementById("quick-apartment-type")?.value || "";
    const message = document.getElementById("quick-message")?.value || "";

    const payload = {
      form_type: "quick",
      name: name,
      email: email,
      phone: phone,
      country_code: countryCode,
      apartment_type: apartmentType,
      budget: "",
      message: message,
    };

    await sendEnquiry(payload, quickStatus, quickSubmit);

    if (quickStatus && quickStatus.className.includes("text-emerald-600")) {
      quickForm.reset();
      const modal = document.getElementById("quick-contact-modal");
      if (modal) {
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 800);
      }
    }
  });
});
