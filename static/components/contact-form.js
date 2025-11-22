// components/contact-form.js

// Shared function to send enquiry to backend
async function sendEnquiry(payload, statusEl, submitBtn) {
  if (statusEl) {
    statusEl.textContent = "";
    statusEl.className = "text-xs text-gray-500";
  }
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
  }

  // basic validation
  if (!payload.name || !payload.phone) {
    if (statusEl) {
      statusEl.textContent = "Please provide your name and phone number.";
      statusEl.className = "text-xs text-red-500";
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Enquiry";
    }
    return;
  }

  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      throw new Error(data.message || "Unable to send enquiry right now.");
    }

    if (statusEl) {
      if (data.dryRun) {
        statusEl.textContent =
          "Thank you. Your enquiry has been received (test mode). Email sending is not yet configured.";
      } else {
        statusEl.textContent =
          "Thank you. Your enquiry has been received. Our team will connect with you shortly.";
      }
      statusEl.className = "text-xs text-emerald-600";
    }
  } catch (err) {
    console.error("Enquiry error:", err);
    if (statusEl) {
      statusEl.textContent =
        "Something went wrong while sending your enquiry. Please try again or use WhatsApp / Call.";
      statusEl.className = "text-xs text-red-500";
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Enquiry";
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
        <h2 class="text-2xl md:text-3xl font-bold mb-2 text-center">
          Request Detailed Investment Information
        </h2>
        <p class="text-sm text-gray-600 mb-6 text-center">
          Share your details and our team will connect with you for floor plans, yields,
          payment terms and availability.
        </p>

        <form id="main-enquiry-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input 
                type="text" 
                name="name" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country Code *</label>
              <select 
                name="countryCode"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="+995">+995 (GE)</option>
                <option value="+91">+91 (IN)</option>
                <option value="+971">+971 (AE)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+1">+1 (US)</option>
                <option value="+49">+49 (DE)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input 
                type="tel" 
                name="phone" 
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apartment Type</label>
              <select 
                name="apartmentType"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Select</option>
                <option value="studio">Luxury Studio</option>
                <option value="1bhk">1BHK Apartment</option>
                <option value="2bhk">2BHK Apartment</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Approx. Budget (USD)</label>
              <input 
                type="text" 
                name="budget"
                placeholder="e.g. 150,000"
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message / Requirements</label>
            <textarea 
              name="message"
              rows="4"
              placeholder="Tell us your investment goals, stay duration, rental expectations, etc."
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            ></textarea>
          </div>

          <div class="flex items-center justify-between flex-col sm:flex-row gap-3">
            <p id="main-enquiry-status" class="text-xs text-gray-500 text-left"></p>
            <button 
              type="submit"
              id="main-enquiry-submit"
              class="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-6 py-2 rounded-md"
            >
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
        formType: "main",
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        countryCode: formData.get("countryCode") || "",
        apartmentType: formData.get("apartmentType") || "",
        message:
          (formData.get("message") || "") +
          (formData.get("budget")
            ? `\n\nApprox. Budget (USD): ${formData.get("budget")}`
            : "")
      };

      await sendEnquiry(payload, statusEl, submitBtn);

      // If success, we reset form when status is green
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

  // create a status text element below the button
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
    const countryCode = document.getElementById("quick-country-code")?.value || "";
    const apartmentType = document.getElementById("quick-apartment-type")?.value || "";
    const message = document.getElementById("quick-message")?.value || "";

    const payload = {
      formType: "quick",
      name,
      email,
      phone,
      countryCode,
      apartmentType,
      message
    };

    await sendEnquiry(payload, quickStatus, quickSubmit);

    if (quickStatus && quickStatus.className.includes("text-emerald-600")) {
      quickForm.reset();
      // optionally close modal on success:
      const modal = document.getElementById("quick-contact-modal");
      if (modal) {
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 800);
      }
    }
  });
});
