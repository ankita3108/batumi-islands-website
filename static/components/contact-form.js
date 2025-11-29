// ======================================================
// Shared Validation Functions
// ======================================================

// Validate email using a clean regex
function isValidEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

// Validate phone (digits only, min 6 max 15)
function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 6 && cleaned.length <= 15;
}

// ======================================================
// Shared Submit Function
// ======================================================
async function sendEnquiry(payload, statusEl, submitBtn) {
  if (statusEl) {
    statusEl.textContent = "";
    statusEl.className = "text-xs text-gray-500";
  }
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
  }

  // Basic backend validation for consistency
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      throw new Error(data.message || "Unable to send enquiry right now.");
    }

    if (statusEl) {
      statusEl.textContent =
        "Thank you! Your enquiry has been received. Our team will contact you shortly.";
      statusEl.className = "text-xs text-emerald-600";
    }
  } catch (err) {
    console.error("Enquiry error:", err);

    if (statusEl) {
      statusEl.textContent =
        "Something went wrong while sending your enquiry. Please try again.";
      statusEl.className = "text-xs text-red-500";
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Enquiry";
    }
  }
}

// ======================================================
// MAIN CONTACT FORM COMPONENT
// ======================================================
class CustomContactForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">
        <h2 class="text-2xl md:text-3xl font-bold mb-2 text-center">
          Request Detailed Investment Information
        </h2>
        <p class="text-sm text-gray-600 mb-6 text-center">
          Share your details and our team will reach out with floor plans, yields, and investment options.
        </p>

        <form id="main-enquiry-form" class="space-y-4">
          <!-- NAME + EMAIL -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Full Name *</label>
              <input type="text" name="name" required class="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Email *</label>
              <input type="email" name="email" required class="w-full border rounded-md px-3 py-2" />
            </div>
          </div>

          <!-- COUNTRY CODE + PHONE -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Country Code *</label>
              <input type="text" name="country_code" required placeholder="+995" class="w-full border rounded-md px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Phone Number *</label>
              <input type="tel" name="phone" required class="w-full border rounded-md px-3 py-2" />
            </div>
          </div>

          <!-- APARTMENT TYPE + BUDGET -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Apartment Type *</label>
              <select name="apartmentType" required class="w-full border rounded-md px-3 py-2">
                <option value="">Select</option>
                <option value="Luxury Studio">Luxury Studio</option>
                <option value="1BHK Apartment">1BHK Apartment</option>
                <option value="2BHK Apartment">2BHK Apartment</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Approx. Budget (USD) *</label>
              <input type="text" name="budget" required class="w-full border rounded-md px-3 py-2" />
            </div>
          </div>

          <!-- MESSAGE -->
          <div>
            <label class="block text-sm font-medium mb-1">Message *</label>
            <textarea name="message" rows="4" required class="w-full border rounded-md px-3 py-2"></textarea>
          </div>

          <div class="flex items-center justify-between flex-col sm:flex-row gap-3">
            <p id="main-enquiry-status" class="text-xs text-gray-500"></p>
            <button 
              type="submit"
              id="main-enquiry-submit"
              class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md"
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

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fd = new FormData(form);

      const email = fd.get("email");
      const phone = fd.get("phone");
      const countryCode = fd.get("country_code");

      // -------------------------
      // VALIDATION
      // -------------------------
      if (!isValidEmail(email)) {
        statusEl.textContent = "Please enter a valid email address.";
        statusEl.className = "text-xs text-red-500";
        return;
      }

      if (!isValidPhone(phone)) {
        statusEl.textContent = "Please enter a valid phone number.";
        statusEl.className = "text-xs text-red-500";
        return;
      }

      if (!countryCode.startsWith("+")) {
        statusEl.textContent = "Country code must start with + (Example: +995).";
        statusEl.className = "text-xs text-red-500";
        return;
      }

      const payload = {
        form_type: "contact",
        name: fd.get("name"),
        email,
        phone,
        country_code: countryCode,
        apartment_type: fd.get("apartmentType"),
        budget: fd.get("budget"),
        message: fd.get("message")
      };

      await sendEnquiry(payload, statusEl, submitBtn);

      if (statusEl.className.includes("text-emerald-600")) {
        form.reset();
      }
    });
  }
}

customElements.define("custom-contact-form", CustomContactForm);

// ======================================================
// QUICK ENQUIRY FORM
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quick-contact-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl = document.createElement("p");
  statusEl.id = "quick-contact-status";
  statusEl.className = "text-xs text-gray-500 mt-2";
  form.appendChild(statusEl);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#quick-name").value.trim();
    const email = form.querySelector("#quick-email").value.trim();
    const phone = form.querySelector("#quick-phone").value.trim();
    const apartmentType = form.querySelector("#quick-apartment-type").value.trim();
    const message = form.querySelector("#quick-message").value.trim();

    let countryCodeInput =
      document.getElementById("quick-country-code") ||
      form.querySelector('[name="country_code"]');

    const countryCode = countryCodeInput.value.trim();

    // VALIDATION
    if (!name || !email || !phone || !message) {
      statusEl.textContent = "All fields are mandatory.";
      statusEl.className = "text-xs text-red-500";
      return;
    }

    if (!isValidEmail(email)) {
      statusEl.textContent = "Please enter a valid email.";
      statusEl.className = "text-xs text-red-500";
      return;
    }

    if (!isValidPhone(phone)) {
      statusEl.textContent = "Please enter a valid phone number.";
      statusEl.className = "text-xs text-red-500";
      return;
    }

    if (!countryCode.startsWith("+")) {
      statusEl.textContent = "Country code must start with +.";
      statusEl.className = "text-xs text-red-500";
      return;
    }

    const payload = {
      form_type: "quick",
      name,
      email,
      phone,
      country_code: countryCode,
      apartment_type: apartmentType,
      budget: "",
      message
    };

    await sendEnquiry(payload, statusEl, submitBtn);

    if (statusEl.className.includes("text-emerald-600")) {
      form.reset();
      setTimeout(() => {
        document.getElementById("quick-contact-modal")?.classList.add("hidden");
      }, 800);
    }
  });
});
