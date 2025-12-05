// ================================
//  Batumi Island Estates i18n
//  5 languages: EN, GE, RU, TR, KK, DE, ES, PT, AR
// ================================

const SUPPORTED_LANGUAGES = ["en", "tr", "ge", "ru", "kk", "de", "es", "pt", "ar"];

function detectInitialLanguage() {
  // 1. If user already chose a language, use that
  try {
    const stored = localStorage.getItem("bie_lang");
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
  } catch (e) {
    // localStorage might be blocked; ignore
  }

  // 2. Use browser language
  const navLangRaw =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en";

  const navLang = navLangRaw.toLowerCase();

  // Map browser langs/locales to your codes
  const langMap = [
    { match: "en", code: "en" },
    { match: "tr", code: "tr" },
    { match: "ka", code: "ge" }, // Georgian
    { match: "ge", code: "ge" }, // just in case
    { match: "ru", code: "ru" },
    { match: "kk", code: "kk" },
    { match: "de", code: "de" },
    { match: "es", code: "es" },
    { match: "pt", code: "pt" },
    { match: "ar", code: "ar" }
  ];

  for (const item of langMap) {
    if (navLang.startsWith(item.match)) {
      return item.code;
    }
  }

  // 3. Fallback
  return "en";
}

function updateLanguageSelectors(lang) {
  document.querySelectorAll(".js-language-selector").forEach((select) => {
    if ([...select.options].some((o) => o.value === lang)) {
      select.value = lang;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Detect initial language
  const initialLang = detectInitialLanguage();

  // 2. Apply translations
  applyLanguage(initialLang);

  // 3. Sync dropdowns
  updateLanguageSelectors(initialLang);

  // 4. Listen for user changes on all language selectors
  document.querySelectorAll(".js-language-selector").forEach((select) => {
    select.addEventListener("change", (e) => {
      const lang = e.target.value;

      if (!SUPPORTED_LANGUAGES.includes(lang)) return;

      applyLanguage(lang);
      updateLanguageSelectors(lang); // keep all selects in sync

      try {
        localStorage.setItem("bie_lang", lang);
      } catch (err) {
        // ignore if blocked
      }
    });
  });
});

const BIE_TRANSLATIONS = {
  // ---------------- ENGLISH ----------------
  en: {
    // Navbar
    nav_home: "Home",
    nav_why_batumi: "Why Batumi",
    nav_properties: "Properties",
    nav_project_details: "Project Details",
    nav_life_georgia: "Life in Georgia",
    nav_about_us: "About Us",
    nav_enquire: "Enquire",
    nav_call: "Call: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle: "Your Gateway to Luxury Island Living in the Heart of the Black Sea",
    hero_cta_explore: "Explore Properties",
    hero_cta_quick_enquiry: "Quick Enquiry",

    // Quick enquiry modal
    quick_title: "Quick Inquiry",
    quick_label_name: "Name *",
    quick_label_phone: "Phone",
    quick_cc_help: "Type your country name or dialing code (e.g., Georgia, +995, India, +91).",
    quick_label_email: "Email",
    quick_label_apartment_type: "Apartment Type",
    quick_select_type: "Select type",
    quick_opt_studio: "Luxury Studio",
    quick_opt_1bhk: "1BHK Apartment",
    quick_opt_2bhk: "2BHK Apartment",
    quick_opt_other: "Other",
    quick_label_message: "Message",
    quick_btn_submit: "Submit Inquiry",

    // Invest Intro Brand
    invest_intro_after_brand: " is one of the few master-planned island developments in the Black Sea, offering an exclusive investment landscape inspired by world-renowned destinations such as ",
    invest_intro_and: " and ",
    invest_intro_ending: ", delivering exceptional long-term value and true coastal scarcity.",

    // Investment section
    section_invest_title: "Why Invest in Batumi Island Estates?",

    invest_card1_title: "High ROI",
    invest_card1_body:
      "Batumi’s fast-growing tourism, gaming, and leisure market supports strong rental yields, especially for sea-facing, resort-integrated island properties.",

    invest_card2_title: "Golden Visa",
    invest_card2_body:
      "Strategic investments in Georgia can support long-stay options, simplified ownership structures, and a convenient hub between Europe, the Middle East, and Asia.",

    invest_card3_title: "Prime Island Location",
    invest_card3_body:
      "Enjoy direct access to the Black Sea, curated promenades, beach clubs, and marina living—creating both lifestyle appeal and premium pricing power.",

    invest_wc_title: "A World-Class Investment Opportunity on the Black Sea",

    invest_card4_title: "First-of-its-Kind Mega Island Project",
    invest_card4_body:
      "One of the only world-class island developments in the Black Sea—creating a landmark destination unlike anything in Europe or Asia.",

    invest_card5_title: "Extremely Limited Supply",
    invest_card5_body:
      "Unlike city properties, island real estate is finite—creating strong exclusivity, investor demand, and resale potential.",

    invest_card6_title: "Dubai-Inspired Luxury Masterplan",
    invest_card6_body:
      "Developed with the same architectural philosophy as Dubai’s iconic island projects—private beaches, marinas, luxury hotels & high-end retail.",

    invest_card7_title: "Luxury 5-Star Resort Ecosystem",
    invest_card7_body:
      "Branded hospitality, fine dining, beach clubs, wellness centers, and entertainment zones elevate the value of every residence.",

    invest_card8_title: "Private Marina & Yacht Access",
    invest_card8_body:
      "Direct access to a world-class marina elevates tourism appeal and premium rental income.",

    invest_card9_title: "Strong Future Capital Appreciation",
    invest_card9_body:
      "Early-phase investors benefit the most as the island becomes an international destination for tourism, entertainment, and luxury living.",

    invest_card10_title: "Hard Currency Rental Yield",
    invest_card10_body:
      "Earn from global tourists with strong nightly rates—especially from Europe & Middle East travelers.",

    invest_card11_title: "Growing Strategic Importance",
    invest_card11_body:
      "Georgia is becoming a major Black Sea hub for business, leisure, gaming, and tourism—boosting long-term property value.",

    invest_card12_title: "Zero Annual Property Tax",
    invest_card12_body:
      "Georgia offers unmatched investor-friendly conditions with no annual property tax on individual ownership.",

    // Transformation strip
    transformation_title: "Batumi’s Luxury Transformation",
    transformation_body:
      "Batumi is undergoing a dramatic evolution from a seasonal seaside town into a year-round luxury and entertainment hub. New five-star hotels, casinos, branded residences, and international lifestyle concepts are reshaping the waterfront and attracting a growing base of global investors, much like the early transformation phases seen in Dubai.",

    // Property types
    property_types_title: "Our Property Types",

    // Property cards
    property_studio_title: "Luxury Studio Apartments",
    property_1bhk_title: "Premium 1BHK Apartments",
    property_2bhk_title: "Premium 2BHK Apartments",

    property_studio_feat_seaview: "Sea View",
    property_studio_feat_smarthome: "Smart Home",

    property_1bhk_feat_panoramic: "Panoramic View",
    property_1bhk_feat_luxurybath: "Luxury Bath",
    property_1bhk_feat_smarthome: "Smart Home",

    property_2bhk_feat_mastersuite: "Master Suite",
    property_2bhk_feat_gourmetkitchen: "Gourmet Kitchen",
    property_2bhk_feat_walkin: "Walk-in Closet",

    property_card_description:
      "Discover beautifully designed residences in Batumi’s iconic island development.",
    property_card_button: "Request Details",

    // Contact CTA
    contact_cta_title: "Ready to Own Your Island Paradise?",
    contact_cta_sub: "Contact our expert agents today to schedule a viewing or get more information.",
    contact_cta_call_btn: "Call +995 574 100 645",
    contact_cta_email_btn: "Email Us",

        // LIFE IN GEORGIA – Hero
    life_hero_title: "Life in Georgia",
    life_hero_body:
      "A vibrant blend of European charm, Black Sea coastal living, warm hospitality, and a rapidly modernising lifestyle—Georgia offers a unique environment where culture, freedom, and opportunity come together for global residents and investors.",
    life_hero_btn_lifestyle: "Explore Georgian Lifestyle",
    life_hero_btn_alignment: "Georgia & Europe: How They Align",

    // Lifestyle intro
    life_lifestyle_title: "Georgia: Where Natural Beauty Meets Modern Living",
    life_lifestyle_body:
      "Georgia offers one of the most unique lifestyle experiences in Europe—balancing untouched natural landscapes, rich cultural heritage, and a rapidly evolving modern economy. From the serene Black Sea coastline to the futuristic skyline of Tbilisi, the country offers a rare blend of beauty, opportunity, and affordability that appeals to both residents and global investors.",

    // Lifestyle cards
    life_card1_title: "Spectacular Natural Beauty",
    life_card1_body:
      "Snow-capped mountains, ancient forests, crystal lakes, and dramatic coastlines make Georgia one of the world’s most stunning year-round destinations.",

    life_card2_title: "European-Modern Lifestyle",
    life_card2_body:
      "Trendy cafés, international schools, modern business hubs, high-speed internet, and vibrant nightlife make cities like Tbilisi and Batumi ideal for modern living.",

    life_card3_title: "Thriving Tech & Innovation Hub",
    life_card3_body:
      "Georgia is rapidly emerging as a digital-first economy—attracting startups, tech talent, and investors through low taxes, easy regulations, and a pro-innovation government.",

    life_card4_title: "Strategic Location",
    life_card4_body:
      "Positioned between Europe and Asia, Georgia is a gateway for trade, travel, and commerce, making it an ideal base for global business operations.",

    life_card5_title: "Welcoming Culture",
    life_card5_body:
      "Georgia’s warm hospitality, friendly communities, and a strong sense of safety make it one of the most comfortable destinations for expats and global investors.",

    life_card6_title: "High Growth Potential",
    life_card6_body:
      "With rising tourism, increasing foreign investment, and large-scale coastal developments, Georgia is one of the most promising emerging markets in Europe.",

    // Culture section
    life_culture_title: "Experience Georgia’s Rich Culture & Heritage",
    life_culture_body:
      "Georgia’s soul is shaped by centuries of tradition, breathtaking folklore, vibrant art, and warm hospitality. From ancient wine-making rituals to soulful polyphonic music and the architectural blend of old and new, every moment in Georgia tells a story worth feeling—and living.",

    life_culture_slide1_title: "Traditional Georgian Dance",
    life_culture_slide1_body:
      "An artistic celebration of courage, elegance, and centuries-old cultural pride.",

    life_culture_slide2_title: "Ancient Wine Culture",
    life_culture_slide2_body:
      "Home to the world’s oldest wine tradition—over 8,000 years of craftsmanship and hospitality.",

    life_culture_slide3_title: "Tbilisi’s Architectural Charm",
    life_culture_slide3_body:
      "A harmonious blend of historic streets, modern elegance, and vibrant city life.",

    life_culture_slide4_title: "Batumi’s Coastal Glow",
    life_culture_slide4_body:
      "A modern seaside paradise where culture, architecture, and lifestyle connect.",

    // Alignment section
    life_align_title: "How Georgia Aligns with Modern European Living",
    life_align_body:
      "Georgia is increasingly integrated with European economic, lifestyle, and tourism flows while still maintaining its distinct cultural identity and cost advantages. For investors and residents, it offers a bridge between East and West, combining European-facing standards with a more relaxed, approachable pace of life.",

    life_align_card1_title: "European Lifestyle, Lower Cost of Living",
    life_align_card1_body:
      "Café culture, walkable neighbourhoods, international schools, and modern shopping centres mirror many European capitals—yet housing, dining, and services often remain significantly more affordable.",

    life_align_card2_title: "Increasing Connectivity & Tourism Flows",
    life_align_card2_body:
      "Direct and connecting flights from key European cities, rising tourist arrivals, and a growing base of digital nomads and remote workers connect Georgia into broader EU traffic.",

    life_align_card3_title: "Investor-Friendly, Long-Term Oriented",
    life_align_card3_body:
      "Clear ownership rights, simple purchase processes, and a forward-looking tourism and infrastructure strategy align Georgia with other emerging European investment hotspots.",

    life_align_card4_title: "Cultural Depth Meets Modern Aspirations",
    life_align_card4_body:
      "Historic architecture, music, food, and traditions co-exist with modern hospitality, co-working hubs, and contemporary art—offering a lifestyle that resonates with sophisticated European travellers and long-stay residents.",

    // CTA section
    life_cta_title: "See How Life in Georgia Connects with Your Investment",
    life_cta_body:
      "Combine the emotional appeal of living in Georgia with the financial strength of investing in Batumi Island Estates—one of the most unique island developments in the Black Sea region.",
    life_cta_btn: "Back to Investment Highlights",

    // Contact form (main)
    contact_title: "Request Detailed Investment Information",
    contact_subtitle:
      "Share your details and our team will connect with you for floor plans, yields, payment terms and availability.",
    contact_label_fullname: "Full Name *",
    contact_label_email: "Email",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "Country Code *",
    contact_cc_help:
      "Type your country name or dialing code (e.g., India, +91, Georgia, +995).",
    contact_label_phone: "Phone Number *",
    contact_label_apartment_type: "Apartment Type",
    contact_select_type: "Select",
    contact_label_budget: "Approx. Budget (USD)",
    contact_ph_budget: "e.g. 150,000",
    contact_label_message: "Message / Requirements",
    contact_ph_message:
      "Tell us your investment goals, stay duration, rental expectations, etc.",

    // Enquiry buttons & messages (used by both forms)
    enquiry_btn_submit: "Submit Enquiry",
    enquiry_btn_sending: "Sending...",
    enquiry_validation: "Please provide your name and phone number.",
    enquiry_status_dryrun:
      "Thank you. Your enquiry has been received (test mode). Email sending is not yet configured.",
    enquiry_status_success:
      "Thank you. Your enquiry has been received. Our team will connect with you shortly.",
    enquiry_status_error:
      "Something went wrong while sending your enquiry. Please try again or use WhatsApp / Call.",

    // Testimonials
    testimonials_title: "What Our Investors Say",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "Investor from London, UK",
    testimonial1_text: "“Batumi Island Estates ticked every box for me – sea views, strong rental yields and a transparent process. The team guided me through each step like a private concierge.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI Investor, Dubai",
    testimonial2_text: "“I was looking for a safe but high-growth opportunity outside the usual markets. The combination of island lifestyle and Georgia’s investor-friendly regulations made this an easy decision.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "Holiday Home Buyer, Athens",
    testimonial3_text: "“The finishes, amenities and views are on par with top Mediterranean resorts. I use the apartment a few weeks a year and the rental team manages it seamlessly the rest of the time.”",

    // Project Details Section
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "Live the future of waterfront luxury—bridges, canals, integrated resorts, and Black Sea island living.",

    // Live construction section
    project_progress_title: "Live Construction Progress",
    project_progress_body:
      "The video above showcases the real-time progress of infrastructure, bridges, landscaping, and premium residential zones across the islands. As each phase advances, Batumi Island Estates moves closer to delivering a fully integrated luxury waterfront community in the heart of the Black Sea.",

    // Island vision section
    project_islandvision_title: "Island Vision After Completion",
    project_islandvision_body:
      "Explore how Batumi Island Estates will transform into a fully integrated luxury waterfront community — with promenades, landscaped terraces, resort pools, cafés, shopping boulevards, and an illuminated skyline reflecting across the serene Black Sea.",

    // Carousel slides
    project_slide1_tag: "Waterfront Promenade",
    project_slide1_title: "Seafront Towers & Marina Living",
    project_slide1_body:
      "Panoramic towers overlooking the sea with private marina access for residents.",

    project_slide2_tag: "Resort Amenities",
    project_slide2_title: "Infinity Pools & Landscaped Terraces",
    project_slide2_body:
      "Elevated decks, lounge cabanas and lush green walkways for relaxation.",

    project_slide3_tag: "Night Skyline",
    project_slide3_title: "Illuminated Waterfront Living",
    project_slide3_body:
      "The island glowing under the night sky, creating a new landmark of Georgia.",

    project_slide4_tag: "Boulevard Living",
    project_slide4_title: "Cafés • Retail • Island Promenade",
    project_slide4_body:
      "A premium lifestyle boulevard featuring boutique retail and seaside cafés.",

    // Brochure section
    brochure_title: "Download the Official Project Brochure",
    brochure_subtitle: "Enter your email to receive the brochure instantly.",
    brochure_ph_email: "Enter your email address",
    brochure_btn: "Download Brochure",

    brochure_msg_empty: "Please enter your email address.",
    brochure_msg_sending: "Sending...",
    brochure_msg_success: "Brochure sent! Please check your inbox.",
    brochure_msg_error: "Error sending brochure. Please try again.",
    brochure_msg_network: "Network error. Please try again.",

    // Google Meet section
    gmeet_title: "Schedule a Google Meet Consultation",
    gmeet_body:
      "Book a personalised consultation with our senior advisory team to walk through the project details, investment structures, and your personalised acquisition path at Batumi Island Estates.",
    gmeet_btn: "Schedule a Google Meet",

    // ABOUT PAGE
    about_hero_title: "About Batumi Island Estates",
    about_hero_subtitle:
      "A specialised luxury subsidiary of Batumi Estates, dedicated to premium island and waterfront properties on the Batumi Islands.",

    about_intro_title: "Where Exceptional Living Begins",
    about_intro_p1:
      "Founded in 2022, Batumi Estates began with a vision to transform Georgia's real estate landscape by offering global investors transparent guidance, trusted insights, and luxury-focused portfolios. Today, the brand proudly serves clients across Europe, Asia, the Middle East, and the Americas, establishing itself as a leading investment partner for high-growth Georgian developments.",
    about_intro_p2:
      "In 2024, we expanded our legacy with the creation of Batumi Island Estates — a dedicated division exclusively focused on Georgia's first luxury man-made island megaproject. Backed by leading developers and supported by national infrastructure initiatives, this pioneering project is redefining premium coastal living across the Black Sea region.",
    about_intro_p3:
      "With 100+ global investors already onboard and many more exploring opportunities across our expanding portfolio, Batumi Estates continues to uphold a legacy of excellence, transparency, and seamless property acquisition — ensuring every client experiences unmatched confidence and satisfaction throughout their investment journey.",

    about_journey_title: "Our Journey",
    about_journey_2022_title: "2022 — Foundation of Batumi Estates",
    about_journey_2022_body:
      "Established with a mission to provide transparent, premium, and efficient property buying experiences in Georgia.",
    about_journey_2023_title: "2023 — Global Expansion",
    about_journey_2023_body:
      "Reached clients across 25+ countries and expanded partnerships with developers and government bodies.",
    about_journey_2024_title: "2024 — Launch of Batumi Island Estates",
    about_journey_2024_body:
      "Exclusive division created to focus on the landmark Batumi Islands megaproject — Georgia’s first luxury man-made islands.",
    about_journey_2025_title: "2025 — 100+ Global Investors Served",
    about_journey_2025_body:
      "A milestone year of rapid growth, exceptional service ratings, and expanding investment portfolios.",

    about_why_title: "Why Investors Choose Us",
    about_why_card1_title: "Luxury-Focused Expertise",
    about_why_card1_body:
      "Specialised in waterfront and island investments aligned with Georgia’s fastest-growing real estate zones.",
    about_why_card2_title: "End-to-End Assistance",
    about_why_card2_body:
      "Legal support, documentation, walkthroughs, and post-purchase services for a seamless buying experience.",
    about_why_card3_title: "Global Client Trust",
    about_why_card3_body:
      "Investors from 30+ countries rely on our transparent advisory and curated investment portfolio.",

    about_testimonials_title: "What Our Global Investors Say",
    about_testimonial1_text:
      "“A seamless investment experience. The team guided me from first call to final paperwork. Truly world-class service!”",
    about_testimonial1_role: "— Daniel M., UK • Tech Executive",
    about_testimonial2_text:
      "“Bought a luxury studio on the island. Exceptional transparency and professional support.”",
    about_testimonial2_role: "— Sara K., UAE • Business Owner",
    about_testimonial3_text:
      "“Highly recommended for international buyers. Smooth process and great insights.”",
    about_testimonial3_role: "— Luca R., Italy • Hospitality Investor",
    about_testimonial4_text:
      "“Professional, honest, and extremely helpful. The best agency in Georgia!”",
    about_testimonial4_role: "— Aisha M., Qatar • Real Estate Portfolio",
    about_testimonial5_text:
      "“A hassle-free purchase process. They handled everything — even remote signing!”",
    about_testimonial5_role: "— Carlos D., Brazil • Finance Consultant",
    about_testimonial6_text:
      "“Their knowledge of Batumi’s luxury market is unmatched.”",
    about_testimonial6_role: "— Helene S., France • Entrepreneur",
    about_testimonial7_text:
      "“Perfect for foreigners investing for the first time. Very trustworthy team.”",
    about_testimonial7_role: "— Amir H., Saudi Arabia • Oil & Energy",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "Luxury Island Residences",

    // Footer – brand section
    footer_brand_desc:
      "Premium studio, 1BHK and 2BHK residences on Georgia’s most prestigious island destination, combining resort living with strong investment potential.",

    // Footer – navigation
    footer_nav_title: "Navigate",
    footer_nav_home: "Home",
    footer_nav_why_batumi: "Why Batumi",
    footer_nav_properties: "Properties",
    footer_nav_enquiry: "Enquiry Form",

    // Footer – contact
    footer_contact_title: "Contact",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1: "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "Batumi, Georgia",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    // Footer – bottom bar
    footer_bottom_rights: "© 2025 Batumi Island Estates. All rights reserved.",
    footer_bottom_privacy: "Privacy Policy",
    footer_bottom_terms: "Terms",

  },

  hi: {
    // Navbar
    nav_home: "होम",
    nav_why_batumi: "क्यों चुनें बटूमी?",
    nav_properties: "प्रॉपर्टीज़",
    nav_project_details: "प्रोजेक्ट विवरण",
    nav_life_georgia: "जॉर्जिया में जीवन",
    nav_about_us: "हमारे बारे में",
    nav_enquire: "पूछताछ",
    nav_call: "कॉल: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "काले सागर के हृदय में लग्ज़री द्वीप जीवन की आपकी प्रीमियम प्रवेशद्वार",
    hero_cta_explore: "प्रॉपर्टी देखें",
    hero_cta_quick_enquiry: "त्वरित पूछताछ",

    // Quick enquiry modal
    quick_title: "त्वरित पूछताछ",
    quick_label_name: "नाम *",
    quick_label_phone: "फ़ोन",
    quick_cc_help:
      "अपना देश या डायलिंग कोड टाइप करें (जैसे: Georgia +995, India +91)",
    quick_label_email: "ईमेल",
    quick_label_apartment_type: "अपार्टमेंट का प्रकार",
    quick_select_type: "प्रकार चुनें",
    quick_opt_studio: "लक्ज़री स्टूडियो",
    quick_opt_1bhk: "1BHK अपार्टमेंट",
    quick_opt_2bhk: "2BHK अपार्टमेंट",
    quick_opt_other: "अन्य",
    quick_label_message: "संदेश",
    quick_btn_submit: "पूछताछ भेजें",

    // Invest Intro Brand
    invest_intro_after_brand:
      " काले सागर में कुछ गिने-चुने मास्टर-प्लान्ड आइलैंड डेवलपमेंट्स में से एक है, जो विश्व-प्रसिद्ध स्थलों जैसे ",
    invest_intro_and: " और ",
    invest_intro_ending:
      " से प्रेरित एक अनोखा निवेश अवसर प्रदान करता है, जो लंबी अवधि का उत्कृष्ट मूल्य और वास्तविक तटीय दुर्लभता सुनिश्चित करता है।",

    // Investment section
    section_invest_title:
      "Batumi Island Estates में निवेश क्यों करें?",

    invest_card1_title: "उच्च ROI",
    invest_card1_body:
      "बटूमी का बढ़ता पर्यटन, गेमिंग और मनोरंजन बाजार समुद्र-दृश्यमान, रिसॉर्ट-इंटीग्रेटेड आइलैंड प्रॉपर्टीज़ पर मजबूत किराये की आय को समर्थन देता है।",

    invest_card2_title: "गोल्डन वीज़ा",
    invest_card2_body:
      "जॉर्जिया में रणनीतिक निवेश लंबे प्रवास विकल्प, सरल स्वामित्व संरचनाएँ और यूरोप, मध्य-पूर्व और एशिया के बीच एक सुविधाजनक केंद्र प्रदान करता है।",

    invest_card3_title: "प्रीमियम आइलैंड लोकेशन",
    invest_card3_body:
      "काले सागर तक सीधा पहुँच, क्यूरेटेड प्रोमेनेड्स, बीच क्लब और मरीना लाइफस्टाइल — सभी मिलकर जीवनशैली और प्रॉपर्टी वैल्यू दोनों को बढ़ाते हैं।",

    invest_wc_title:
      "काले सागर पर विश्व-स्तरीय निवेश अवसर",

    invest_card4_title: "पहले-अपने-प्रकार का मेगा आइलैंड प्रोजेक्ट",
    invest_card4_body:
      "काले सागर में दुनिया के कुछ अद्वितीय आइलैंड डेवलपमेंट्स में से एक — यूरोप और एशिया दोनों में अनुपम।",

    invest_card5_title: "अत्यंत सीमित सप्लाई",
    invest_card5_body:
      "शहर की प्रॉपर्टी के विपरीत, द्वीप रियल एस्टेट सीमित होता है — जिससे एक्सक्लूसिविटी, निवेशक मांग और रीसेल वैल्यू बढ़ती है।",

    invest_card6_title: "दुबई-प्रेरित लग्ज़री मास्टरप्लान",
    invest_card6_body:
      "दुबई के प्रतिष्ठित द्वीप प्रोजेक्ट्स की वास्तुकला दर्शन पर आधारित — निजी समुद्र तट, मरीना, लग्ज़री होटल और हाई-एंड रिटेल।",

    invest_card7_title: "लक्ज़री 5-स्टार रिसॉर्ट इकोसिस्टम",
    invest_card7_body:
      "ब्रांडेड हॉस्पिटैलिटी, फाइन डाइनिंग, बीच क्लब, वेलनेस सेंटर और मनोरंजन सुविधाएँ हर निवास की वैल्यू बढ़ाती हैं।",

    invest_card8_title: "निजी मरीना और यॉट एक्सेस",
    invest_card8_body:
      "विश्व-स्तरीय मरीना तक सीधी पहुँच पर्यटन आकर्षण और किराये की कमाई दोनों को बढ़ाती है।",

    invest_card9_title: "भविष्य में मजबूत मूल्य वृद्धि",
    invest_card9_body:
      "जैसे-जैसे द्वीप एक अंतरराष्ट्रीय गंतव्य बनता है, शुरुआती निवेशकों को सबसे अधिक लाभ मिलता है।",

    invest_card10_title: "हार्ड करेंसी रेंटल यील्ड",
    invest_card10_body:
      "यूरोप और मध्य-पूर्व के पर्यटकों से मजबूत नाइटली रेंटल रेट प्राप्त करें।",

    invest_card11_title: "बढ़ती सामरिक महत्ता",
    invest_card11_body:
      "जॉर्जिया व्यवसाय, मनोरंजन, गेमिंग और पर्यटन के लिए काले सागर का प्रमुख केंद्र बन रहा है — जिससे संपत्ति मूल्य को दीर्घकालीन समर्थन मिलता है।",

    invest_card12_title: "शून्य वार्षिक प्रॉपर्टी टैक्स",
    invest_card12_body:
      "जॉर्जिया व्यक्तिगत स्वामित्व पर कोई वार्षिक प्रॉपर्टी टैक्स नहीं लगाता, जिससे यह निवेशकों के लिए अत्यंत आकर्षक बन जाता है।",

      // LIFE IN GEORGIA – Hero
    life_hero_title: "जॉर्जिया में जीवन",
    life_hero_body:
      "यूरोपीय आकर्षण, काला सागर तटीय जीवन, गर्मजोशी भरी मेहमाननवाज़ी और तेजी से आधुनिक होती जीवनशैली का जीवंत मिश्रण — जॉर्जिया वैश्विक निवासियों और निवेशकों के लिए संस्कृति, स्वतंत्रता और अवसरों का एक अद्वितीय संगम प्रदान करता है।",
    life_hero_btn_lifestyle: "जॉर्जियाई जीवनशैली देखें",
    life_hero_btn_alignment: "जॉर्जिया और यूरोप: कैसे जुड़े हैं",

    // Lifestyle intro
    life_lifestyle_title: "जॉर्जिया: जहाँ प्राकृतिक सुंदरता मिलती है आधुनिक जीवन से",
    life_lifestyle_body:
      "जॉर्जिया यूरोप की सबसे अनोखी जीवनशैली प्रस्तुत करता है — जहाँ अछूते प्राकृतिक दृश्य, समृद्ध सांस्कृतिक विरासत और तेजी से बढ़ती आधुनिक अर्थव्यवस्था का अद्भुत संयोजन मिलता है। काला सागर तट से लेकर त्बिलिसी के भविष्यवादी स्काईलाइन तक, देश सुंदरता, अवसर और वहनीयता का ऐसा मिश्रण प्रदान करता है जो वैश्विक निवासियों और निवेशकों को आकर्षित करता है।",

    // Lifestyle cards
    life_card1_title: "शानदार प्राकृतिक सुंदरता",
    life_card1_body:
      "बर्फ से ढकी पहाड़ियाँ, प्राचीन जंगल, शांत झीलें और नाटकीय तटरेखाएँ — जॉर्जिया को वर्षभर का सबसे खूबसूरत गंतव्य बनाती हैं।",

    life_card2_title: "यूरोपीय-आधुनिक जीवनशैली",
    life_card2_body:
      "ट्रेंडी कैफे, अंतरराष्ट्रीय स्कूल, आधुनिक बिजनेस हब, हाई-स्पीड इंटरनेट और जीवंत नाइटलाइफ़ — त्बिलिसी और बटूमी को आधुनिक जीवन के लिए आदर्श शहर बनाते हैं।",

    life_card3_title: "तेजी से बढ़ता टेक और इनोवेशन केंद्र",
    life_card3_body:
      "कम करों, सरल विनियमों और नवाचार समर्थित सरकारी नीतियों के कारण जॉर्जिया तेजी से एक डिजिटल-प्रथम अर्थव्यवस्था के रूप में उभर रहा है।",

    life_card4_title: "रणनीतिक स्थान",
    life_card4_body:
      "यूरोप और एशिया के बीच स्थित — जॉर्जिया व्यापार, यात्रा और वाणिज्य का एक महत्वपूर्ण केंद्र है, जो वैश्विक व्यापार संचालन के लिए आदर्श आधार बनाता है।",

    life_card5_title: "स्वागतपूर्ण संस्कृति",
    life_card5_body:
      "जॉर्जिया की गर्मजोशी भरी मेहमाननवाज़ी, दोस्ताना समुदाय और सुरक्षित वातावरण इसे प्रवासियों और वैश्विक निवेशकों के लिए बेहद आरामदायक बनाते हैं।",

    life_card6_title: "उच्च विकास क्षमता",
    life_card6_body:
      "बढ़ते पर्यटन, विदेशी निवेश और बड़े पैमाने पर तटीय विकास के साथ, जॉर्जिया यूरोप के सबसे आशाजनक उभरते बाजारों में से एक है।",

    // Culture section
    life_culture_title: "जॉर्जिया की समृद्ध संस्कृति और विरासत का अनुभव करें",
    life_culture_body:
      "जॉर्जिया की आत्मा सैकड़ों वर्षों की परंपराओं, मनमोहक लोककथाओं, जीवंत कला और गर्मजोशी भरी मेहमाननवाज़ी से बनी है। प्राचीन वाइन-निर्माण से लेकर आत्मीय पॉलीफोनिक संगीत और पुरातन-आधुनिक वास्तुकला तक — जॉर्जिया का हर क्षण एक कहानी कहता है जिसे महसूस और जिया जा सकता है।",

    life_culture_slide1_title: "पारंपरिक जॉर्जियाई नृत्य",
    life_culture_slide1_body:
      "साहस, सौंदर्य और सदियों पुराने सांस्कृतिक गौरव का कलात्मक उत्सव।",

    life_culture_slide2_title: "प्राचीन वाइन संस्कृति",
    life_culture_slide2_body:
      "दुनिया की सबसे पुरानी वाइन परंपरा का घर — 8,000 वर्षों की कला और मेहमाननवाज़ी।",

    life_culture_slide3_title: "त्बिलिसी की वास्तुकला का आकर्षण",
    life_culture_slide3_body:
      "ऐतिहासिक गलियों, आधुनिक सुरुचि और जीवंत शहरी जीवन का अद्वितीय मिश्रण।",

    life_culture_slide4_title: "बटूमी की तटीय चमक",
    life_culture_slide4_body:
      "एक आधुनिक समुद्री स्वर्ग जहाँ संस्कृति, वास्तुकला और जीवनशैली खूबसूरती से मिलती हैं।",

    // Alignment section
    life_align_title: "कैसे जॉर्जिया आधुनिक यूरोपीय जीवन के अनुरूप है",
    life_align_body:
      "जॉर्जिया आर्थिक, जीवनशैली और पर्यटन प्रवाहों के माध्यम से यूरोप से अधिक से अधिक जुड़ रहा है, जबकि अपनी विशिष्ट सांस्कृतिक पहचान और लागत लाभ बनाए रखता है। यह पूर्व और पश्चिम के बीच एक सेतु जैसा संतुलन प्रदान करता है।",

    life_align_card1_title: "यूरोपीय जीवनशैली, कम जीवनयापन लागत",
    life_align_card1_body:
      "कैफे संस्कृति, पैदल-अनुकूल पड़ोस, अंतरराष्ट्रीय स्कूल और आधुनिक शॉपिंग केंद्र — यूरोपीय शहरों जैसे, लेकिन उल्लेखनीय रूप से कम लागत पर।",

    life_align_card2_title: "बढ़ती कनेक्टिविटी और पर्यटन",
    life_align_card2_body:
      "महत्वपूर्ण यूरोपीय शहरों से सीधी और कनेक्टिंग उड़ानें, बढ़ती पर्यटक संख्या और डिजिटल नोमैड्स का प्रवास — सभी जॉर्जिया को मुख्यधारा के EU ट्रैफिक से जोड़ते हैं।",

    life_align_card3_title: "निवेशक-अनुकूल और दीर्घकालिक दृष्टिकोण",
    life_align_card3_body:
      "स्पष्ट स्वामित्व अधिकार, सरल खरीद प्रक्रिया और भविष्य-उन्मुख पर्यटन और अवसंरचना रणनीति जॉर्जिया को एक आकर्षक निवेश गंतव्य बनाती है।",

    life_align_card4_title: "सांस्कृतिक गहराई और आधुनिक आकांक्षाएँ",
    life_align_card4_body:
      "समृद्ध इतिहास, संगीत, भोजन और परंपराएँ आधुनिक आतिथ्य, को-वर्किंग स्पेस और समकालीन कला के साथ सह-अस्तित्व में — परिष्कृत यूरोपीय यात्रियों और लंबे समय तक रहने वालों को आकर्षित करती हैं।",

    // CTA section
    life_cta_title:
      "देखें कि जॉर्जिया का जीवन आपके निवेश से कैसे जुड़ता है",
    life_cta_body:
      "जॉर्जिया में रहने की भावनात्मक अपील को Batumi Island Estates में निवेश की वित्तीय मजबूती के साथ जोड़ें — काले सागर क्षेत्र की सबसे अनोखी आइलैंड परियोजनाओं में से एक।",
    life_cta_btn: "निवेश हाइलाइट्स पर वापस जाएँ",

    // Contact form (main)
    contact_title: "विस्तृत निवेश जानकारी का अनुरोध करें",
    contact_subtitle:
      "अपनी जानकारी साझा करें और हमारी टीम आपसे फ्लोर प्लान, रेंटल यील्ड, भुगतान विकल्प और उपलब्धता के साथ संपर्क करेगी।",
    contact_label_fullname: "पूरा नाम *",
    contact_label_email: "ईमेल",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "कंट्री कोड *",
    contact_cc_help:
      "अपना देश नाम या डायलिंग कोड लिखें (जैसे India +91, Georgia +995).",
    contact_label_phone: "फ़ोन नंबर *",
    contact_label_apartment_type: "अपार्टमेंट प्रकार",
    contact_select_type: "चुनें",
    contact_label_budget: "अनुमानित बजट (USD)",
    contact_ph_budget: "उदा. 150,000",
    contact_label_message: "संदेश / आवश्यकताएँ",
    contact_ph_message:
      "हमें अपने निवेश लक्ष्य, रहने की अवधि, रेंटल अपेक्षाएँ आदि बताएं।",

    // Batumi Transformations
    transformation_title: "बटूमी का लग्ज़री रूपांतरण",
    transformation_body:
  "बटूमी एक मौसमी समुद्री शहर से वर्षभर चलने वाले लग्ज़री और एंटरटेनमेंट हब में तेज़ी से बदल रहा है। नए फाइव-स्टार होटल, कैसिनो, ब्रांडेड रेजिडेंस और अंतरराष्ट्रीय लाइफस्टाइल कॉन्सेप्ट इस शहर के वॉटरफ़्रंट को नया स्वरूप दे रहे हैं—बिल्कुल उसी तरह, जैसे दुबई के शुरुआती विकास चरणों में देखा गया था।",
    property_types_title: "हमारे प्रॉपर्टी प्रकार",
    property_studio_title: "लक्ज़री स्टूडियो अपार्टमेंट",
    property_1bhk_title: "प्रीमियम 1BHK अपार्टमेंट",
    property_2bhk_title: "प्रीमियम 2BHK अपार्टमेंट",
    property_studio_feat_seaview: "सी व्यू",
    property_studio_feat_smarthome: "स्मार्ट होम",

    property_1bhk_feat_panoramic: "पैनोरमिक व्यू",
    property_1bhk_feat_luxurybath: "लक्ज़री बाथ",
    property_1bhk_feat_smarthome: "स्मार्ट होम",

    property_2bhk_feat_mastersuite: "मास्टर सूट",
    property_2bhk_feat_gourmetkitchen: "गॉर्मेट किचन",
    property_2bhk_feat_walkin: "वॉक-इन क्लोसेट",
    property_card_description: "बटूमी के प्रतिष्ठित द्वीप विकास में खूबसूरती से डिज़ाइन किए गए निवासों की खोज करें।",
    property_card_button: "विवरण प्राप्त करें",

    contact_cta_title: "क्या आप अपने द्वीप स्वर्ग के मालिक बनने के लिए तैयार हैं?",
    contact_cta_sub: "दर्शन शेड्यूल करने या अधिक जानकारी प्राप्त करने के लिए आज ही हमारे विशेषज्ञ एजेंटों से संपर्क करें।",
    contact_cta_call_btn: "कॉल करें +995 574 100 645",
    contact_cta_email_btn: "हमें ईमेल करें",
    
    // Enquiry buttons & messages
    enquiry_btn_submit: "पूछताछ भेजें",
    enquiry_btn_sending: "भेजा जा रहा है...",
    enquiry_validation:
      "कृपया अपना नाम और फोन नंबर प्रदान करें।",
    enquiry_status_dryrun:
      "धन्यवाद। आपकी पूछताछ प्राप्त हो गई है (टेस्ट मोड)। ईमेल अभी कॉन्फ़िगर नहीं है।",
    enquiry_status_success:
      "धन्यवाद। आपकी पूछताछ प्राप्त हो गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    enquiry_status_error:
      "कुछ गलत हो गया। कृपया पुनः प्रयास करें या व्हाट्सएप / कॉल का उपयोग करें।",

    // Testimonials
    testimonials_title: "हमारे निवेशक क्या कहते हैं",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "निवेशक, लंदन (यूके)",
    testimonial1_text:
      "“Batumi Island Estates ने मेरी हर अपेक्षा पूरी की — समुद्र दृश्य, मजबूत रेंटल यील्ड और पारदर्शी प्रक्रिया। टीम ने हर कदम पर एक निजी कंसीयर्ज की तरह मार्गदर्शन किया।”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI निवेशक, दुबई",
    testimonial2_text:
      "“मैं एक सुरक्षित लेकिन उच्च-विकास निवेश अवसर खोज रहा था। आइलैंड लाइफस्टाइल और जॉर्जिया के निवेशक-अनुकूल कानूनों का संयोजन बेहतरीन रहा।”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "हॉलिडे होम खरीदार, एथेंस",
    testimonial3_text:
      "“फिनिशिंग, सुविधाएँ और दृश्य शीर्ष मेडिटेरेनियन रिसॉर्ट्स के बराबर हैं। मैं कुछ हफ्ते यहाँ रहती हूँ और बाकी समय रेंटल टीम इसे सहज रूप से संभालती है।”",

    // Project Details Section
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "लक्ज़री वाटरफ़्रंट जीवन का भविष्य — पुल, नहरें, रिसॉर्ट, और काला सागर द्वीप जीवन।",

    // Live construction section
    project_progress_title: "लाइव निर्माण प्रगति",
    project_progress_body:
      "ऊपर दिया गया वीडियो द्वीपों पर अवसंरचना, पुल निर्माण, लैंडस्केपिंग और प्रीमियम आवासीय ज़ोन की वास्तविक प्रगति दिखाता है। प्रत्येक चरण के आगे बढ़ने के साथ, Batumi Island Estates एक पूर्ण, एकीकृत वाटरफ़्रंट समुदाय बनने के और करीब पहुँचता जा रहा है।",

    // Island vision section
    project_islandvision_title: "पूरा होने के बाद द्वीप की दृष्टि",
    project_islandvision_body:
      "देखें कि कैसे Batumi Island Estates एक पूरी तरह एकीकृत लग्ज़री वाटरफ़्रंट समुदाय में परिवर्तित होगा — प्रोमेनेड, लैंडस्केप्ड टैरेस, रिसॉर्ट पूल, कैफ़े, बुलेवार्ड शॉपिंग और जल में प्रतिबिंबित होने वाला शानदार रात का स्काईलाइन।",

    // Carousel slides
    project_slide1_tag: "वाटरफ़्रंट प्रोमेनेड",
    project_slide1_title: "सीफ्रंट टावर्स और मरीना जीवन",
    project_slide1_body:
      "निवासियों के लिए निजी मरीना एक्सेस के साथ समुद्र-दृश्य वाले पैनोरमिक टावर्स।",

    project_slide2_tag: "रिसॉर्ट सुविधाएँ",
    project_slide2_title: "इन्फिनिटी पूल और लैंडस्केप्ड टैरेस",
    project_slide2_body:
      "आराम के लिए ऊँचे डेक, लॉन्ज कबाना और हरियाली से भरे रास्ते।",

    project_slide3_tag: "रात का स्काईलाइन",
    project_slide3_title: "रोशन वाटरफ़्रंट जीवन",
    project_slide3_body:
      "द्वीप रात के आसमान के नीचे चमकता हुआ — जॉर्जिया का नया प्रतीक।",

    project_slide4_tag: "बुलेवार्ड जीवन",
    project_slide4_title: "कैफ़े • रिटेल • आइलैंड प्रोमेनेड",
    project_slide4_body:
      "समुद्र तट कैफ़े और बुटीक रिटेल के साथ एक प्रीमियम लाइफस्टाइल बुलेवार्ड।",

    // Brochure section
    brochure_title: "आधिकारिक प्रोजेक्ट ब्रॉशर डाउनलोड करें",
    brochure_subtitle: "ब्रॉशर तुरंत प्राप्त करने के लिए अपना ईमेल दर्ज करें।",
    brochure_ph_email: "अपना ईमेल पता दर्ज करें",
    brochure_btn: "ब्रॉशर डाउनलोड करें",

    brochure_msg_empty: "कृपया अपना ईमेल पता दर्ज करें।",
    brochure_msg_sending: "भेजा जा रहा है...",
    brochure_msg_success: "ब्रॉशर भेज दिया गया है! कृपया अपना इनबॉक्स देखें।",
    brochure_msg_error: "ब्रॉशर भेजने में त्रुटि। कृपया पुनः प्रयास करें।",
    brochure_msg_network: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।",

    // Google Meet section
    gmeet_title: "Google Meet पर परामर्श निर्धारित करें",
    gmeet_body:
      "हमारी वरिष्ठ सलाहकार टीम के साथ व्यक्तिगत परामर्श बुक करें ताकि आप प्रोजेक्ट विवरण, निवेश संरचना और अपनी संपत्ति अधिग्रहण रणनीति को समझ सकें।",
    gmeet_btn: "Google Meet शेड्यूल करें",

    // ABOUT PAGE
    about_hero_title: "Batumi Island Estates के बारे में",
    about_hero_subtitle:
      "Batumi Estates का एक विशेष लग्ज़री डिवीजन — जो प्रीमियम आइलैंड और वाटरफ़्रंट प्रॉपर्टीज़ में विशेषज्ञ है।",

    about_intro_title: "जहाँ असाधारण जीवन की शुरुआत होती है",
    about_intro_p1:
      "2022 में स्थापित, Batumi Estates ने पारदर्शिता, विश्वसनीयता और लग्ज़री-केंद्रित निवेश मार्गदर्शन के साथ जॉर्जिया के रियल एस्टेट सेक्टर को रूपांतरित करने की दृष्टि से शुरुआत की। आज यह ब्रांड यूरोप, एशिया, मध्य पूर्व और अमेरिका के ग्राहकों की सेवा करते हुए उच्च-विकास जॉर्जियाई प्रोजेक्ट्स का अग्रणी निवेश भागीदार बन गया है।",
    about_intro_p2:
      "2024 में, हमने Batumi Island Estates का शुभारंभ किया — जॉर्जिया की पहली लक्ज़री मानव-निर्मित द्वीप मेगाप्रोजेक्ट पर केंद्रित एक विशेष डिवीजन। प्रमुख डेवलपर्स और राष्ट्रीय अवसंरचना समर्थन के साथ, यह प्रोजेक्ट काला सागर क्षेत्र में प्रीमियम जीवनशैली का नया मानक स्थापित कर रहा है।",
    about_intro_p3:
      "100+ वैश्विक निवेशकों के साथ, और बढ़ती मांग के साथ, Batumi Estates उत्कृष्टता, पारदर्शिता और सहज प्रॉपर्टी अधिग्रहण की अपनी विरासत को निरंतर मजबूत कर रहा है।",

    about_journey_title: "हमारी यात्रा",
    about_journey_2022_title: "2022 — Batumi Estates की स्थापना",
    about_journey_2022_body:
      "जॉर्जिया में पारदर्शी और प्रीमियम प्रॉपर्टी खरीद अनुभव प्रदान करने के मिशन के साथ स्थापना।",

    about_journey_2023_title: "2023 — वैश्विक विस्तार",
    about_journey_2023_body:
      "25+ देशों के ग्राहकों तक पहुँचे और डेवलपर्स व सरकारी संस्थाओं के साथ साझेदारियाँ बढ़ाईं।",

    about_journey_2024_title: "2024 — Batumi Island Estates का शुभारंभ",
    about_journey_2024_body:
      "जॉर्जिया के ऐतिहासिक आइलैंड मेगाप्रोजेक्ट के लिए एक विशेष डिवीजन लॉन्च किया।",

    about_journey_2025_title: "2025 — 100+ वैश्विक निवेशक",
    about_journey_2025_body:
      "तेजी से विकास, उत्कृष्ट सेवा गुणवत्ता और बढ़ते निवेश पोर्टफोलियो का वर्ष।",

    about_why_title: "निवेशक हमें क्यों चुनते हैं",
    about_why_card1_title: "लक्ज़री-केंद्रित विशेषज्ञता",
    about_why_card1_body:
      "जॉर्जिया के तेजी से बढ़ते वाटरफ़्रंट और आइलैंड ज़ोन में विशेष निवेश विशेषज्ञता।",

    about_why_card2_title: "एंड-टू-एंड सहायता",
    about_why_card2_body:
      "कानूनी सहायता, दस्तावेज़ीकरण, वॉकथ्रू और खरीद के बाद की सेवाएँ — सब एक ही जगह।",

    about_why_card3_title: "वैश्विक ग्राहक विश्वास",
    about_why_card3_body:
      "30+ देशों के निवेशक हमारी पारदर्शी सलाह और चुने हुए प्रॉपर्टी पोर्टफोलियो पर भरोसा करते हैं।",

    about_testimonials_title: "हमारे वैश्विक निवेशकों की राय",

    about_testimonial1_text:
      "“बेहद सहज निवेश अनुभव। टीम ने फोन कॉल से लेकर अंतिम दस्तावेज़ तक हर चरण में शानदार मार्गदर्शन किया।”",
    about_testimonial1_role: "— डैनियल एम., यूके • टेक एग्ज़ीक्यूटिव",

    about_testimonial2_text:
      "“द्वीप पर एक लग्ज़री स्टूडियो खरीदा। पूरी प्रक्रिया पारदर्शी और पेशेवर थी।”",
    about_testimonial2_role: "— सारा के., यूएई • बिज़नेस ओनर",

    about_testimonial3_text:
      "“अंतरराष्ट्रीय खरीदारों के लिए अत्यधिक अनुशंसित। प्रक्रिया सरल और मार्गदर्शन उत्कृष्ट।”",
    about_testimonial3_role: "— लूका आर., इटली • हॉस्पिटैलिटी निवेशक",

    about_testimonial4_text:
      "“बहुत ही ईमानदार, पेशेवर और मददगार। जॉर्जिया की सबसे अच्छी एजेंसी!”",
    about_testimonial4_role: "— आयशा एम., क़तर • रियल एस्टेट पोर्टफोलियो",

    about_testimonial5_text:
      "“किसी भी परेशानी के बिना खरीद प्रक्रिया। उन्होंने रिमोट साइनिंग तक सब कुछ संभाला।”",
    about_testimonial5_role: "— कार्लोस डी., ब्राज़ील • वित्त सलाहकार",

    about_testimonial6_text:
      "“बटूमी के लक्ज़री बाजार का उनका ज्ञान अतुलनीय है।”",
    about_testimonial6_role: "— हेलेन एस., फ्रांस • उद्यमी",

    about_testimonial7_text:
      "“पहली बार निवेश करने वाले विदेशियों के लिए बिल्कुल सही। बेहद भरोसेमंद टीम।”",
    about_testimonial7_role: "— अमीर एच., सऊदी अरब • ऑयल एंड एनर्जी",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "लक्ज़री द्वीप रेजिडेंस",

    // Footer – brand section
    footer_brand_desc:
      "जॉर्जिया के सबसे प्रतिष्ठित द्वीप गंतव्य पर प्रीमियम स्टूडियो, 1BHK और 2BHK रेजिडेंस — रिसॉर्ट जीवन और मजबूत निवेश क्षमता का संयोजन।",

    // Footer – navigation
    footer_nav_title: "नेविगेशन",
    footer_nav_home: "होम",
    footer_nav_why_batumi: "क्यों बटूमी?",
    footer_nav_properties: "प्रॉपर्टीज़",
    footer_nav_enquiry: "पूछताछ फ़ॉर्म",

    // Footer – contact
    footer_contact_title: "संपर्क",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1:
      "18 Andria Pirveltsodebuli Highway III Deadlock Gonio",
    footer_contact_address_line2: "बटूमी, जॉर्जिया",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    // Footer – bottom bar
    footer_bottom_rights:
      "© 2025 Batumi Island Estates. सर्वाधिकार सुरक्षित।",
    footer_bottom_privacy: "गोपनीयता नीति",
    footer_bottom_terms: "नियम"

    },

  
// ------------------ Tamil -----------------

ta: {
    // Navbar
    nav_home: "முகப்பு",
    nav_why_batumi: "ஏன் பாட்டுமி?",
    nav_properties: "சொத்துக்கள்",
    nav_project_details: "திட்ட விவரங்கள்",
    nav_life_georgia: "ஜார்ஜியாவில் வாழ்க்கை",
    nav_about_us: "எங்களைப் பற்றி",
    nav_enquire: "விசாரணை",
    nav_call: "அழை: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "கருப்பு கடலின் இதயத்தில் அமைந்துள்ள லக்ஸுரி தீவு வாழ்க்கைக்கான உங்கள் பிரதான நுழைவாயில்",
    hero_cta_explore: "சொத்துகளைப் பாருங்கள்",
    hero_cta_quick_enquiry: "விரைவு விசாரணை",

    // Quick enquiry modal
    quick_title: "விரைவு விசாரணை",
    quick_label_name: "பெயர் *",
    quick_label_phone: "தொலைபேசி",
    quick_cc_help:
      "உங்கள் நாட்டுப் பெயர் அல்லது டயலிங் கோடு (உதா: Georgia +995, India +91) எழுதவும்.",
    quick_label_email: "இமெயில்",
    quick_label_apartment_type: "அபார்ட்மென்ட் வகை",
    quick_select_type: "வகையைத் தேர்ந்தெடுக்கவும்",
    quick_opt_studio: "லக்ஸுரி ஸ்டூடியோ",
    quick_opt_1bhk: "1BHK அபார்ட்மென்ட்",
    quick_opt_2bhk: "2BHK அபார்ட்மென்ட்",
    quick_opt_other: "மற்றவை",
    quick_label_message: "செய்தி",
    quick_btn_submit: "விசாரணையை சமர்ப்பிக்கவும்",

    // Invest Intro Brand
    invest_intro_after_brand:
      " கருப்பு கடலில் உள்ள மிகக் குறைந்த அளவிலான மாஸ்டர்-பிளான் செய்யப்பட்ட தீவு மேம்பாடுகளில் ஒன்றாகும்; இது உலகப் புகழ்பெற்ற இடங்களான ",
    invest_intro_and: " மற்றும் ",
    invest_intro_ending:
      " ஆகியவற்றில் இருந்து உருவான ஈர்ப்பை அடிப்படையாகக் கொண்டு, நீண்ட கால மதிப்பு மற்றும் அரிய கடற்கரை வாய்ப்புகளைக் கொண்ட ஒரு பிரத்யேக முதலீட்டு சூழலை வழங்குகிறது.",

    // Investment section
    section_invest_title:
      "Batumi Island Estates-இல் ஏன் முதலீடு செய்ய வேண்டும்?",

    invest_card1_title: "உயர் ROI",
    invest_card1_body:
      "பாட்டுமியின் வேகமாக வளர்ந்து வரும் τουரிசம், கேமிங் மற்றும் பொழுதுபோக்கு சந்தை, குறிப்பாக கடல்மோடி தோற்றமுள்ள, ரிசார்ட் இணைந்த தீவு சொத்துகளுக்கு வலுவான வாடகை வருமானத்தை உருவாக்குகிறது.",

    invest_card2_title: "கோல்டன் விசா",
    invest_card2_body:
      "ஜார்ஜியாவில் செய்யப்படும் மூலதன முதலீடுகள் நீண்டகால தங்கும் விருப்பங்கள், எளிமையான சொந்த உரிமை அமைப்புகள் மற்றும் ஐரோப்பா, மத்திய கிழக்கு மற்றும் ஆசியாவை இணைக்கும் சிறந்த மையத்தை வழங்க முடியும்.",

    invest_card3_title: "முக்கிய தீவு இடம்",
    invest_card3_body:
      "கருப்பு கடலுக்கான நேரடி அணுகல், வடிவமைக்கப்பட்ட பிரோமேனேட்கள், பீச் கிளப்புகள் மற்றும் மெரீனா வாழ்க்கை — இவை அனைத்தும் வாழ்க்கைமுறை ஈர்ப்பையும், விலையிடும் சக்தியையும் மேம்படுத்துகின்றன.",

    invest_wc_title:
      "கருப்பு கடலில் உலகத் தரமுடைய முதலீட்டு வாய்ப்பு",

    invest_card4_title: "முதல்-தன்மையுடைய மெகா தீவு திட்டம்",
    invest_card4_body:
      "கருப்பு கடலில் உள்ள ஒரே உலகத் தரமான தீவு மேம்பாடுகளில் ஒன்று — ஐரோப்பா மற்றும் ஆசியா இரண்டிலும் ஒப்பற்ற ஒரு லான்ட்மார்க் தலமாக உருவாகிறது.",

    invest_card5_title: "மிகவும் வரையறுக்கப்பட்ட வழங்கல்",
    invest_card5_body:
      "நகர சொத்துகளுக்கு மாறாக, தீவு ரியல் எஸ்டேட் இயல்பாகவே வரையறுக்கப்பட்டது — இதனால் பிரீமியம் தனித்தன்மை, முதலீட்டாளர்களின் வலுவான தேவை மற்றும் மீள் விற்பனை மதிப்பு உருவாகிறது.",

    invest_card6_title: "துபாய்-பாணி லக்ஸுரி மாஸ்டர் பிளான்",
    invest_card6_body:
      "துபாயின் ஐகானிக் தீவு திட்டங்களின் அதே கட்டிடக் கொள்கையில் வடிவமைக்கப்பட்டது — தனியார் கடற்கரை, மெரீனாக்கள், லக்ஸுரி ஹோட்டல்கள் மற்றும் உயர்தர ரிட்டெயில் வசதிகளுடன்.",

    invest_card7_title: "லக்ஸுரி 5-ஸ்டார் ரிசார்ட் சூழகம்",
    invest_card7_body:
      "பிராண்டட் ஹோஸ்பிட்டாலிட்டி, ஃபைன் டைனிங், பீச் கிளப்புகள், நல மையங்கள் மற்றும் பொழுதுபோக்கு பகுதிகள் — ஒவ்வொரு ரெசிடென்ஸின் மதிப்பையும் உயர்த்துகின்றன.",

    invest_card8_title: "தனியார் மெரீனா & யாட் அணுகல்",
    invest_card8_body:
      "உலகத் தரமுடைய மெரீனாவிற்கு நேரடி அணுகல் τουரிசம் ஈர்ப்பை மற்றும் உயர்தர வாடகை வருமானத்தை மேம்படுத்துகிறது.",

    invest_card9_title: "வலுவான எதிர்கால மூலதன மதிப்பு",
    invest_card9_body:
      "தீவு ஒரு சர்வதேச τουரிசம், பொழுதுபோக்கு மற்றும் லக்ஸுரி வாழ்க்கை தலமாக வளரும்போது, ஆரம்ப கட்ட முதலீட்டாளர்களுக்கு அதிகபட்ச பலன் கிடைக்கிறது.",

    invest_card10_title: "வலுவான கழித்த நாணய வாடகை வருமானம்",
    invest_card10_body:
      "ஐரோப்பா மற்றும் மத்திய கிழக்கு உள்ளிட்ட உலக τουரிஸ்ட்களிடமிருந்து வலுவான தினசரி வாடகை மூலம் வருமானம் ஈட்டுங்கள்.",

    invest_card11_title: "அதிகரிக்கும் மூலோபாய முக்கியத்துவம்",
    invest_card11_body:
      "ஜார்ஜியா, கருப்பு கடலின் வணிகம், பொழுதுபோக்கு, கேமிங் மற்றும் τουரிசம் மையமாக வேகமாக உருவெடுத்து வருகிறது — இதனால் நீண்டகால சொத்து மதிப்பு வலுவாகிறது.",

    invest_card12_title: "வருடாந்திர சொத்து வரி இல்லை",
    invest_card12_body:
      "தனிநபர் சொத்து உரிமையாளர்களுக்கு வருடாந்திர சொத்து வரி இல்லை என்பதால், ஜார்ஜியா முதலீட்டாளர்களுக்கு மிகவும் வரவேற்கத்தக்க சூழலை வழங்குகிறது.",

    // Transformation strip
    transformation_title: "பாட்டுமியின் லக்ஸுரி மாற்றம்",
    transformation_body:
      "ஒரு காலத்தில் பருவகால கடற்கரை நகரமாக இருந்த பாட்டுமி, இன்று வருடம் முழுதும் இயங்கும் லக்ஸுரி மற்றும் பொழுதுபோக்கு மையமாக உருவெடுத்து வருகிறது. புதிய ஐந்து நட்சத்திர ஹோட்டல்கள், கேசினோக்கள், பிராண்டட் ரெசிடென்ஸ்கள் மற்றும் சர்வதேச லைப்ஸ்டைல் கருத்துக்கள் — நகரின் வாட்டர்ஃபிரண்டை மறுபரிமாணப்படுத்தி, துபாயின் ஆரம்ப மாற்றப் பருவங்களை நினைவூட்டும் வகையில் உலகளாவிய முதலீட்டாளர்களை ஈர்க்கின்றன.",

    // Property types
    property_types_title: "எங்கள் சொத்து வகைகள்",

    // Property cards
    property_studio_title: "லக்ஸுரி ஸ்டூடியோ அபார்ட்மெண்ட்கள்",
    property_1bhk_title: "பிரீமியம் 1BHK அபார்ட்மெண்ட்கள்",
    property_2bhk_title: "பிரீமியம் 2BHK அபார்ட்மெண்ட்கள்",

    property_studio_feat_seaview: "கடல் காட்சி",
    property_studio_feat_smarthome: "ஸ்மார்ட் ஹோம்",

    property_1bhk_feat_panoramic: "பனோரமிக் காட்சி",
    property_1bhk_feat_luxurybath: "லக்ஸுரி குளியலறை",
    property_1bhk_feat_smarthome: "ஸ்மார்ட் ஹோம்",

    property_2bhk_feat_mastersuite: "மாஸ்டர் ஸ்யூட்",
    property_2bhk_feat_gourmetkitchen: "கோர்மேட் சமையலறை",
    property_2bhk_feat_walkin: "வாக்-இன் அலமாரி",

    property_card_description:
      "பாட்டுமியின் ஐகானிக் தீவு மேம்பாட்டில் அழகாக வடிவமைக்கப்பட்ட ரெசிடென்ஸ்களை கண்டறியுங்கள்.",
    property_card_button: "விவரங்களை கோருங்கள்",

    // Contact CTA
    contact_cta_title: "உங்கள் சொந்த தீவு சொர்க்கத்தைOwn செய்ய தயாரா?",
    contact_cta_sub:
      "ஒரு விஜயம் ஏற்பாடு செய்ய அல்லது மேலும் தகவல் பெற இன்று எங்கள் நிபுணர் ஏஜென்ட்களை தொடர்பு கொள்ளுங்கள்.",
    contact_cta_call_btn: "அழை +995 574 100 645",
    contact_cta_email_btn: "எங்களுக்கு இமெயில் அனுப்புங்கள்",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "ஜார்ஜியாவில் வாழ்க்கை",
    life_hero_body:
      "ஐரோப்பிய கவர்ச்சி, கருப்பு கடலோர வாழ்க்கை, வெதுச்சாதனமான வரவேற்பு மற்றும் வேகமாக நவீனமயமாகும் வாழ்க்கைமுறை — இவை அனைத்தும் சேர்ந்து, உலகளாவிய குடியிருப்பாளர்களுக்கும் முதலீட்டாளர்களுக்கும் ஜார்ஜியாவை ஒரு தனித்துவமான சூழலாக மாற்றுகின்றன.",
    life_hero_btn_lifestyle: "ஜார்ஜியன் லைஃப்ஸ்டைலை ஆராயுங்கள்",
    life_hero_btn_alignment:
      "ஜார்ஜியா & ஐரோப்பா: எப்படி இணைகின்றன",

    // Lifestyle intro
    life_lifestyle_title:
      "இயற்கை அழகும் நவீன வாழ்க்கையும் சந்திக்கும் இடம்: ஜார்ஜியா",
    life_lifestyle_body:
      "ஜார்ஜியா, இயற்கையின் அரிய காட்சிகள், செழுமையான பண்பாட்டு மரபு மற்றும் வேகமாக வளர்கின்ற நவீன பொருளாதாரம் ஆகியவற்றின் சமநிலையை வழங்கும், ஐரோப்பாவின் மிகச் சிறந்த லைஃப்ஸ்டைல் அனுபவங்களுள் ஒன்றாகும். அமைதியான கருப்பு கடலோரம் முதல் த்பிலிசியின் எதிர்கால ஸ்கைலின் வரை, அழகு, வாய்ப்புகள் மற்றும் செலவுக் குறைவு ஆகியவற்றின் அரிய கலவையை இது வழங்குகிறது.",

    // Lifestyle cards
    life_card1_title: "அற்புதமான இயற்கை அழகு",
    life_card1_body:
      "பனியால் மூடிய மலைகள், பண்டைய காடுகள், துல்லியமான ஏரிகள் மற்றும் பேரழகான கடற்கரை — ஜார்ஜியாவை வருடம் முழுதும் சுற்றுலா தலமாக ஆக்குகின்றன.",

    life_card2_title: "ஐரோப்பிய-நவீன வாழ்க்கைமுறை",
    life_card2_body:
      "பிரபல கேஃபேக்கள், சர்வதேச பாடசாலைகள், நவீன வணிக மையங்கள், அதிவேக இணையம் மற்றும் தொடர்ந்திருக்கும் இரவு வாழ்க்கை — த்பிலிசி மற்றும் பாட்டுமி போன்ற நகரங்களை நவீன வாழ்விற்கு சிறந்த தலமாக மாற்றுகின்றன.",

    life_card3_title: "செழித்து வரும் டெக் & இனோவேஷன் மையம்",
    life_card3_body:
      "குறைந்த வரிகள், எளிமையான விதிமுறைகள் மற்றும் புதுமையை ஊக்குவிக்கும் அரசு காரணமாக, ஜார்ஜியா ஒரு டிஜிட்டல்-முதன்மையான பொருளாதாரமாக வேகமாக உருவெடுத்து வருகிறது.",

    life_card4_title: "வழிகாட்டும் புவியியல் இடம்",
    life_card4_body:
      "ஐரோப்பா மற்றும் ஆசியா ஆகியவற்றின் சந்திப்பில் அமைந்த ஜார்ஜியா, உலகளாவிய வர்த்தகம், பயணம் மற்றும் வணிகத்திற்கு ஒரு முக்கிய கதவாக விளங்குகிறது.",

    life_card5_title: "வெதுச்சாதனமான வரவேற்பு கலாசாரம்",
    life_card5_body:
      "ஜார்ஜியாவின் அன்பும், பாதுகாப்பான சூழலும், நெருக்கமான சமூக உணர்வும் — இவை அனைத்தும் வெளிநாட்டு குடியிருப்பாளர்களுக்கும் முதலீட்டாளர்களுக்கும் அதிக வசதியை உருவாக்குகின்றன.",

    life_card6_title: "உயர் வளர்ச்சி திறன்",
    life_card6_body:
      "அதிகரிக்கும் τουரிசம், வெளிநாட்டு முதலீடு மற்றும் பெரிய கடலோர மேம்பாடுகளின் மூலம், ஜார்ஜியா ஐரோப்பாவின் மிகவும் வாக்குறுதியான வளர்ந்து வரும் சந்தைகளில் ஒன்றாக மாறியுள்ளது.",

    // Culture section
    life_culture_title:
      "ஜார்ஜியாவின் செழுமையான கலாசாரம் மற்றும் பாரம்பரியத்தை அனுபவிக்கவும்",
    life_culture_body:
      "சதியாண்டுகளாக உருவான மரபுகள், மனதை ஈர்க்கும் நாட்டுப்புறக் கதைகள், சிறப்பான கலை மற்றும் வெதுச்சாதனமான வரவேற்பு — இவை அனைத்தும் ஜார்ஜியாவின் ஆன்மாவை உருவாக்குகின்றன. பண்டைய மது தயாரிப்பு மரபுகள் முதல் ஆழமான பல்சுரக் குரல் இசை மற்றும் பழைய/புதிய கட்டிடக்கலை கலவைகள் வரை — ஜார்ஜியாவின் ஒவ்வொரு தருணமும் உணரவும் வாழவும் வேண்டிய கதையாக உள்ளது.",

    life_culture_slide1_title: "பாரம்பரிய ஜார்ஜியன் நடனம்",
    life_culture_slide1_body:
      "துணிவு, அழகு மற்றும் பல நூற்றாண்டுகளாக வடிவெடுத்த கலாசாரப் பெருமையை கொண்டாடும் கலை நிகழ்ச்சி.",

    life_culture_slide2_title: "பண்டைய மது கலாசாரம்",
    life_culture_slide2_body:
      "உலகின் மிகப் பழமையான மது தயாரிப்பு மரபுகளுள் ஒன்றின் தாய் நிலம் — 8,000 ஆண்டுகள் பழமையான கைவினையும், வரவேற்பும்.",

    life_culture_slide3_title: "த்பிலிசியின் கட்டிடக் கவர்ச்சி",
    life_culture_slide3_body:
      "வரலாற்று வீதிகள், நவீன நேர்த்தி மற்றும் உயிருடன் ததும்பும் நகர வாழ்க்கையின் ஒற்றுமையான கலவை.",

    life_culture_slide4_title: "பாட்டுமியின் கடலோர ஒளிர்ச்சி",
    life_culture_slide4_body:
      "கலாசாரம், கட்டிடக் கலை மற்றும் வாழ்க்கைமுறை இணையும் நவீன கடலோர சொர்க்கம்.",

    // Alignment section
    life_align_title:
      "நவீன ஐரோப்பிய வாழ்க்கைமுறைக்கு ஜார்ஜியா எப்படி ஒத்துப்போகிறது",
    life_align_body:
      "ஜார்ஜியா, ஐரோப்பிய பொருளாதாரம், வாழ்க்கைமுறை மற்றும் τουரிசம் ஓட்டங்களுடன் அதிகமாக இணைக்கப்பட்டு வருகிறது, இதன் தனித்துவமான கலாசாரம் மற்றும் செலவுக் குறைவு பலன்களைத் தக்க வைத்தபடியே. முதலீட்டாளர்களுக்கும் குடியிருப்பாளர்களுக்கும், இது கிழக்கு மற்றும் மேற்குக்கிடையிலான ஒரு பாலமாக செயல்படுகிறது.",

    life_align_card1_title:
      "ஐரோப்பிய வாழ்க்கைமுறை, ஆனால் குறைந்த வாழ்க்கை செலவு",
    life_align_card1_body:
      "கஃபே கலாசாரம், நடக்கத் தகுந்த தெருக்கள், சர்வதேச பாடசாலைகள் மற்றும் நவீன ஷாப்பிங் மையங்கள் — பல ஐரோப்பிய நகரங்களை நினைவூட்டினாலும், வீடு, உணவு மற்றும் சேவைகளின் செலவு பெரும்பாலும் குறைவாகவே இருக்கும்.",

    life_align_card2_title:
      "அதிகரிக்கும் இணைப்பு மற்றும் τουரிச ஓட்டம்",
    life_align_card2_body:
      "முக்கிய ஐரோப்பிய நகரங்களிலிருந்து நேரடி மற்றும் இணைப்பு விமானங்கள், அதிகரிக்கும் τουர் வருகைகள் மற்றும் டிஜிட்டல் நோமாட்களின் வருகை — இவை ஜார்ஜியாவை விரிவான ஐரோப்பிய சுற்றுலா வலையமைப்புடன் இணைக்கின்றன.",

    life_align_card3_title:
      "முதலீட்டாளர்களுக்கு உகந்த, நீண்டகால நோக்கு",
    life_align_card3_body:
      "தெளிவான சொந்த உரிமை உரிமைகள், எளிய வாங்கும் நடைமுறை மற்றும் எதிர்காலத்தை நோக்கி பார்க்கும் τουரிசம்/அவசர கட்டமைப்பு திட்டங்கள் — ஜார்ஜியாவை சிறந்த முதலீட்டு தலமாக ஆக்குகின்றன.",

    life_align_card4_title:
      "ஆழமான கலாசாரம், நவீன கனவுகளுடன்",
    life_align_card4_body:
      "வரலாற்று கட்டிடம், இசை, உணவு மற்றும் மரபுகள் — நவீன ஹோஸ்பிட்டாலிட்டி, கோ-வர்க்கிங் இடங்கள் மற்றும் சமகால கலைவுலகத்துடன் இணைந்து வாழ்கின்றன; இது நுணுக்கமான ஐரோப்பிய பயணிகள் மற்றும் நீண்டகால குடியிருப்பாளர்களுக்கு மனதைக் கவரும் வாழ்க்கைமுறையை உருவாக்குகிறது.",

    // CTA section
    life_cta_title:
      "ஜார்ஜியாவில் உள்ள வாழ்க்கை உங்கள் முதலீட்டுடன் எப்படி இணைகிறது என்பதை அறியுங்கள்",
    life_cta_body:
      "ஜார்ஜியாவில் வாழும் உணர்வுப்பூர்வ ஈர்ப்பையும் Batumi Island Estates-இல் முதலீடு செய்வதன் நிதித் திறனையும் ஒருங்கிணைக்குங்கள் — கருப்பு கடல் பிராந்தியத்தின் மிகத் தனித்துவமான தீவு மேம்பாடுகளில் ஒன்றாகும்.",
    life_cta_btn: "முதலீட்டு முக்கிய அம்சங்களுக்குத் திரும்பவும்",

    // Contact form (main)
    contact_title: "விரிவான முதலீட்டு தகவலை கேட்டுக்கொள்ளுங்கள்",
    contact_subtitle:
      "உங்கள் விவரங்களை பகிருங்கள்; மாடி திட்டங்கள், வாடகை வருமான மதிப்பீடுகள், கட்டண திட்டங்கள் மற்றும் கிடைப்புகள் குறித்து எங்கள் குழு உங்களை தொடர்புகொள்ளும்.",
    contact_label_fullname: "முழுப் பெயர் *",
    contact_label_email: "இமெயில்",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "நாட்டு குறியீடு *",
    contact_cc_help:
      "உங்கள் நாட்டுப் பெயர் அல்லது டயலிங் கோடு (உதா: India +91, Georgia +995) எழுதவும்.",
    contact_label_phone: "தொலைபேசி எண் *",
    contact_label_apartment_type: "அபார்ட்மெண்ட் வகை",
    contact_select_type: "தேர்வு செய்யவும்",
    contact_label_budget: "தற்குமேனும் பட்ஜெட் (USD)",
    contact_ph_budget: "உதா. 150,000",
    contact_label_message: "செய்தி / தேவைகள்",
    contact_ph_message:
      "உங்கள் முதலீட்டு இலக்குகள், தங்கும் காலம், வாடகை எதிர்பார்ப்புகள் ஆகியவற்றை எங்களுடன் பகிருங்கள்.",

    // Enquiry buttons & messages
    enquiry_btn_submit: "விசாரணையை சமர்ப்பிக்கவும்",
    enquiry_btn_sending: "அனுப்பப்படுகிறது...",
    enquiry_validation:
      "தயவுசெய்து உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணை வழங்கவும்.",
    enquiry_status_dryrun:
      "நன்றி. உங்கள் விசாரணை பெறப்பட்டது (சோதனை பயன்முறை). இமெயில் அனுப்பல் இன்னும் கட்டமைக்கப்படவில்லை.",
    enquiry_status_success:
      "நன்றி. உங்கள் விசாரணை பெறப்பட்டுள்ளது. எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்கிறது.",
    enquiry_status_error:
      "எதோ தவறு ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சி செய்யவும் அல்லது WhatsApp / call பயன்படுத்தவும்.",

    // Testimonials
    testimonials_title: "எங்கள் முதலீட்டாளர்கள் என்ன கூறுகிறார்கள்",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "முதலீட்டாளர், லண்டன், UK",
    testimonial1_text:
      "“Batumi Island Estates என் அனைத்து எதிர்பார்ப்புகளையும் பூர்த்தி செய்தது — கடல் காட்சிகள், வலுவான வாடகை வருமானம் மற்றும் முழுக்க முழுக்க வெளிப்படையான செயல்முறை. ஒவ்வொரு கட்டத்திலும் குழு ஒரு தனிப்பட்ட கன்சியர்ஜ் போல வழிகாட்டியது.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI முதலீட்டாளர், துபாய்",
    testimonial2_text:
      "“சாதாரண சந்தைகளுக்கு அப்பாற்பட்டு, பாதுகாப்பான ஆனால் உயர்ந்த வளர்ச்சி வாய்ப்பே எனது தேடல். தீவு வாழ்க்கைமுறை மற்றும் ஜார்ஜியாவின் முதலீட்டாளர்களுக்கு உகந்த விதிமுறைகள் இந்த முடிவை மிகவும் எளிமையாக்கின.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "விடுமுறை வீடு வாங்கியவர், ஏதென்ஸ்",
    testimonial3_text:
      "“ஃபினிஷிங், வசதிகள் மற்றும் காட்சிகள் — அனைத்தும் தலைசிறந்த மெடிட்டரேனியன் ரிசார்ட்களுக்குச் சமம். வருடத்தில் சில வாரங்கள் நான் இங்கு தங்கி, மீதியனை ரெண்டல் டீம் மிகவும் சீராக நிர்வகிக்கிறது.”",

    // Project Details Section
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "பாலங்கள், கால்வாய்கள், ஒருங்கிணைந்த ரிசார்ட்கள் மற்றும் கருப்பு கடல் தீவு வாழ்க்கை — எதிர்கால லக்ஸுரி வாட்டர்ஃபிரண்ட் வாழ்க்கையை இன்று அனுபவியுங்கள்.",

    // Live construction section
    project_progress_title: "நேரடி கட்டுமான முன்னேற்றம்",
    project_progress_body:
      "மேலுள்ள வீடியோவில், தீவுகளெங்கும் நடைபெறும் உள்கட்டமைப்பு, பாலங்கள், தோட்ட அமைப்பு மற்றும் பிரீமியம் ரெசிடென்ஷியல் மண்டலங்கள் ஆகியவற்றின் நேரடி முன்னேற்றத்தைப் பார்க்கலாம். ஒவ்வொரு கட்டமும் முடிந்துக்கொண்டே இருப்பதால், Batumi Island Estates முழுநிறைவான, ஒருங்கிணைந்த லக்ஸுரி வாட்டர்ஃபிரண்ட் சமூகமாக வடிவெடுக்கிறது.",

    // Island vision section
    project_islandvision_title: "முடிந்த பின் தீவின் காட்சி",
    project_islandvision_body:
      "Batumi Island Estates எவ்வாறு முழுமையான லக்ஸுரி வாட்டர்ஃபிரண்ட் சமூகமாக மாறுகிறது என்பதை ஆராயுங்கள் — பிரோமேனேட்கள், பூங்கா மாதிரி டெரஸ்கள், ரிசார்ட் புல்கள், கேஃபேக்கள், ஷாப்பிங் புல்வொர்டுகள் மற்றும் அமைதியான கருப்பு கடலில் பிரதிபலிக்கும் ஒளிரும் இரவு ஸ்கைலின் ஆகியவற்றுடன்.",

    // Carousel slides
    project_slide1_tag: "வாட்டர்ஃபிரண்ட் பிரோமேனேட்",
    project_slide1_title: "கடற்கரை டாவர்கள் & மெரீனா வாழ்க்கை",
    project_slide1_body:
      "கடலை நோக்கிய பனோரமிக் டாவர்கள் மற்றும் குடியிருப்பாளர்களுக்கான தனியார் மெரீனா அணுகல்.",

    project_slide2_tag: "ரிசார்ட் வசதிகள்",
    project_slide2_title: "இன்ஃபினிட்டி புல்கள் & லேண்ட்ஸ்கேப் டெரஸ்கள்",
    project_slide2_body:
      "உயர்த்தப்பட்ட டெக்குகள், லாஞ்ச் கபானாக்கள் மற்றும் பசுமையான நடைபாதைகள் — ஓய்வு மற்றும் நலத்திற்கான பிரீமியம் பகுதிகள்.",

    project_slide3_tag: "இரவு ஸ்கைலின்",
    project_slide3_title: "ஒளிரும் வாட்டர்ஃபிரண்ட் வாழ்க்கை",
    project_slide3_body:
      "இரவில் ஒளிரும் தீவு — ஜார்ஜியாவின் புதிய லான்ட்மார்க் காட்சியைக் காண்பிக்கிறது.",

    project_slide4_tag: "புல்வொர்டு வாழ்க்கை",
    project_slide4_title: "கேஃபேக்கள் • ரீட்டெயில் • தீவு பிரோமேனேட்",
    project_slide4_body:
      "பூட்டிக் ரீட்டெயில் மற்றும் கடற்கரை கேஃபேக்களுடன் ஒரு உயர்தர லைஃப்ஸ்டைல் புல்வொர்டு.",

    // Brochure section
    brochure_title: "அதிகாரப்பூர்வ திட்டப் பிரோஷரை பதிவிறக்கவும்",
    brochure_subtitle:
      "பிரோஷரை உடனடியாகப் பெற உங்கள் இமெயிலை உள்ளிடுங்கள்.",
    brochure_ph_email: "உங்கள் இமெயில் முகவரியை உள்ளிடவும்",
    brochure_btn: "பிரோஷரை பதிவிறக்கவும்",

    brochure_msg_empty: "தயவுசெய்து உங்கள் இமெயில் முகவரியை உள்ளிடவும்.",
    brochure_msg_sending: "அனுப்பப்படுகிறது...",
    brochure_msg_success:
      "பிரோஷர் அனுப்பப்பட்டுள்ளது! உங்கள் இன்பாக்ஸைச் சரி பார்க்கவும்.",
    brochure_msg_error:
      "பிரோஷரை அனுப்பும்போது பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சி செய்யவும்.",
    brochure_msg_network:
      "நெட்வொர்க் பிழை. தயவுசெய்து சிறிது நேரம் கழித்து முயற்சி செய்யவும்.",

    // Google Meet section
    gmeet_title: "Google Meet ஆலோசனையை நிர்ணயிக்கவும்",
    gmeet_body:
      "Batumi Island Estates பற்றிய திட்ட விவரங்கள், முதலீட்டு கட்டமைப்புகள் மற்றும் உங்கள் தனிப்பட்ட அடைவு திட்டத்தை ஆராய, எங்கள் மூத்த ஆலோசகர்கள் குழுவுடன் தனிப்பட்ட ஆன்லைன் ஆலோசனையை முன்பதிவு செய்யுங்கள்.",
    gmeet_btn: "Google Meet-ஐ நிர்ணயிக்கவும்",

    // ABOUT PAGE
    about_hero_title: "Batumi Island Estates பற்றி",
    about_hero_subtitle:
      "Batumi Estates நிறுவனத்தின் ஒரு சிறப்பு லக்ஸுரி பிரிவு — Batumi தீவுகளில் உள்ள உயர்தர தீவு மற்றும் வாட்டர்ஃபிரண்ட் சொத்துகளில் முழுமையாகக் கவனம் செலுத்துகிறது.",

    about_intro_title: "அற்புதமான வாழ்க்கை ஆரம்பிக்கும் இடம்",
    about_intro_p1:
      "2022-ஆம் ஆண்டு நிறுவப்பட்ட Batumi Estates, உலகளாவிய முதலீட்டாளர்களுக்கு வெளிப்படையான வழிகாட்டல், நம்பகமான உள்ளடக்கங்கள் மற்றும் லக்ஸுரி-கேந்திரமான போர்ட்ஃபோலியோ மூலம் ஜார்ஜியாவின் ரியல் எஸ்டேட் துறையை மாற்றும் நோக்கத்துடன் ஆரம்பிக்கப்பட்டது. இன்று, ஐரோப்பா, ஆசியா, மத்திய கிழக்கு மற்றும் அமெரிக்கா முழுவதும் உள்ள வாடிக்கையாளர்களுக்கு சேவை செய்துவரும் இது, ஜார்ஜியாவின் வேகமாக வளரும் மேம்பாடுகளில் முன்னணி முதலீட்டு கூட்டாளியாக உள்ளது.",
    about_intro_p2:
      "2024-இல், Batumi Island Estates என்ற நமது பிரத்யேக பிரிவை நிறுவி, ஜார்ஜியாவின் முதல் மனிதனால் உருவாக்கப்பட்ட லக்ஸுரி தீவு மெகா திட்டத்தில் முழு கவனத்தையும் செலுத்தினோம். முன்னணி டெவலப்பர்கள் மற்றும் தேசிய அளவிலான உள்கட்டமைப்பு முயற்சிகளின் ஆதரவுடன், இந்த முன்னோடியான திட்டம் கருப்பு கடலோர பிராந்தியத்தில் புதிய தரத்திலான லக்ஸுரி வாழ்க்கையை நிர்ணயிக்கிறது.",
    about_intro_p3:
      "100-க்கும் மேற்பட்ட உலகளாவிய முதலீட்டாளர்கள் ஏற்கனவே எங்களுடன் இணைந்துள்ளனர்; மேலும் பலர் விரிவடைந்து வரும் போர்ட்ஃபோலியோவில் வாய்ப்புகளை ஆராய்ந்து வருகின்றனர். Batumi Estates, ஒவ்வொரு வாடிக்கையாளருக்கும் சிறந்த நம்பிக்கை, வெளிப்படைத்தன்மை மற்றும் தடையற்ற சொத்து வாங்கும் அனுபவத்தை வழங்கும் தனது பாரம்பரியத்தை தொடர்ந்து வலுப்படுத்திக் கொண்டிருக்கிறது.",

    about_journey_title: "எங்கள் பயணம்",
    about_journey_2022_title:
      "2022 — Batumi Estates நிறுவனத்தின் பிறப்பு",
    about_journey_2022_body:
      "ஜார்ஜியாவில் வெளிப்படையான, உயர்தர மற்றும் திறமையான சொத்து வாங்கும் அனுபவத்தை வழங்கும் குறிக்கோள் கொண்டு நிறுவப்பட்டது.",

    about_journey_2023_title: "2023 — உலகளாவிய விரிவடைவு",
    about_journey_2023_body:
      "25+ நாடுகளில் உள்ள வாடிக்கையாளர்களை எட்டியதுடன், டெவலப்பர்கள் மற்றும் அரசு அமைப்புகளுடன் கூட்டாண்மைகளை விரிவுபடுத்தியது.",

    about_journey_2024_title:
      "2024 — Batumi Island Estates தொடக்கம்",
    about_journey_2024_body:
      "ஜார்ஜியாவின் முதன்மை லக்ஸுரி தீவு மெகா திட்டமான Batumi தீவுகளுக்கு முழு கவனம் செலுத்தும் ஒரு பிரத்யேக பிரிவை உருவாக்கினோம்.",

    about_journey_2025_title:
      "2025 — 100+ உலகளாவிய முதலீட்டாளர்கள்",
    about_journey_2025_body:
      "வேகமான வளர்ச்சி, சிறந்த சேவை மதிப்பீடுகள் மற்றும் தொடர்ந்தும் விரிவடைந்து வரும் முதலீட்டு போர்ட்ஃபோலியோவுடன் ஒரு முக்கியமான ஆண்டு.",

    about_why_title: "முதலீட்டாளர்கள் எங்களை ஏன் தேர்வு செய்கிறார்கள்",
    about_why_card1_title: "லக்ஸுரி-கேந்திரமான நிபுணத்துவம்",
    about_why_card1_body:
      "ஜார்ஜியாவின் வேகமாக வளரும் வாட்டர்ஃபிரண்ட் மற்றும் தீவு மண்டலங்களுக்கு இணையாக, உயர்தர தீவு முதலீடுகளில் சிறப்பு நிபுணத்துவம்.",

    about_why_card2_title: "எండ్-டு-எண்ட் உதவி",
    about_why_card2_body:
      "சட்ட உதவி, ஆவணங்கள், நடைமுறை வழிகாட்டல் மற்றும் வாங்கிய பிறகு தொடர்ந்து வழங்கப்படும் சேவைகள் — அனைத்திலும் முழுமையான ஆதரவு.",

    about_why_card3_title: "உலகளாவிய வாடிக்கையாளர் நம்பிக்கை",
    about_why_card3_body:
      "30+ நாடுகளில் உள்ள முதலீட்டாளர்கள் எங்கள் வெளிப்படையான ஆலோசனைகளிலும், கவனமாகத் தேர்ந்தெடுக்கப்பட்ட முதலீட்டு போர்ட்ஃபோலியோவிலும் நம்பிக்கை வைக்கின்றனர்.",

    about_testimonials_title:
      "எங்கள் உலகளாவிய முதலீட்டாளர்கள் என்ன சொல்கிறார்கள்",

    about_testimonial1_text:
      "“மிகவும் மென்மையான மற்றும் ஒழுங்குபடுத்தப்பட்ட முதலீட்டு அனுபவம். முதல் அழைப்பிலிருந்து இறுதி ஆவணங்கள் வரை, ஒவ்வொரு கட்டத்திலும் குழு மிகுந்த நுணுக்கத்துடன் வழிகாட்டியது. உண்மையான உலகத் தர சேவை!”",
    about_testimonial1_role:
      "— Daniel M., UK • டெக் நிர்வாகி",

    about_testimonial2_text:
      "“தீவில் ஒரு லக்ஸுரி ஸ்டூடியோ வாங்கினேன். முழு செயல்முறையும் மிகத் தெளிவாகவும், தொழில்முறை முறையிலும் நடந்தது.”",
    about_testimonial2_role:
      "— Sara K., UAE • தொழில்முனைவர்",

    about_testimonial3_text:
      "“சர்வதேச வாங்குபவர்களுக்கு மிகவும் பரிந்துரைக்கத்தக்க குழு. நடைமுறை எளிமையானது, வழிகாட்டல் ஆழமானது.”",
    about_testimonial3_role:
      "— Luca R., Italy • ஹோஸ்பிடாலிட்டி முதலீட்டாளர்",

    about_testimonial4_text:
      "“மிக்க தொழில்முறை அணுகுமுறை, நேர்மை மற்றும் உதவி மனப்பான்மை — ஜார்ஜியாவின் சிறந்த ஏஜென்சி என்று நிச்சயம் சொல்லலாம்!”",
    about_testimonial4_role:
      "— Aisha M., Qatar • ரியல் எஸ்டேட் போர்ட்ஃபோலியோ",

    about_testimonial5_text:
      "“முழுக்க முழுக்க சிரமமற்ற வாங்கும் அனுபவம். அவர்கள் தொலைநிலை கையொப்பம் வரையிலும் அனைத்தையும் ஒழுங்குபடுத்தினர்!”",
    about_testimonial5_role:
      "— Carlos D., Brazil • ஃபைனான்ஸ் கன்சல்டன்ட்",

    about_testimonial6_text:
      "“பாட்டுமியின் லக்ஸுரி ரியல் எஸ்டேட் சந்தையைப் பற்றிய அவர்களின் அறிவு ஒப்பற்றது.”",
    about_testimonial6_role:
      "— Helene S., France • தொழில்முனைவர்",

    about_testimonial7_text:
      "“முதன்முறையாக வெளிநாட்டில் முதலீடு செய்பவர்களுக்கு இதைவிட நம்பத்தகுந்த குழு இல்லை. மிகவும் பாதுகாப்பான மற்றும் ஆதரவான அனுபவம்.”",
    about_testimonial7_role:
      "— Amir H., Saudi Arabia • எண்ணெய் & எரிசக்தி முதலீட்டாளர்",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "லக்ஸுரி தீவு ரெஸிடென்ஸ்கள்",

    // Footer – brand section
    footer_brand_desc:
      "ஜார்ஜியாவின் மிகப் prestijious தீவு இலக்கில் அமைந்துள்ள பிரீமியம் ஸ்டூடியோ, 1BHK மற்றும் 2BHK ரெஸிடென்ஸ்கள் — ரிசார்ட் வாழ்க்கையும் வலுவான முதலீட்டு திறனும் ஒன்றாக இணைந்த அனுபவம்.",

    // Footer – navigation
    footer_nav_title: "நெவிகேஷன்",
    footer_nav_home: "முகப்பு",
    footer_nav_why_batumi: "ஏன் பாட்டுமி?",
    footer_nav_properties: "சொத்துக்கள்",
    footer_nav_enquiry: "விசாரணை படிவம்",

    // Footer – contact
    footer_contact_title: "தொடர்பு",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1:
      "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "பாட்டுமி, ஜார்ஜியா",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    // Footer – bottom bar
    footer_bottom_rights:
      "© 2025 Batumi Island Estates. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    footer_bottom_privacy: "தனியுரிமைக் கொள்கை",
    footer_bottom_terms: "விதிமுறைகள்"
    },

 // ---------------- Bengali --------------------

  bn: {
    // Navbar
    nav_home: "হোম",
    nav_why_batumi: "কেন বাটুমি?",
    nav_properties: "প্রপার্টিজ",
    nav_project_details: "প্রোজেক্ট ডিটেইলস",
    nav_life_georgia: "জর্জিয়ায় জীবন",
    nav_about_us: "আমাদের সম্পর্কে",
    nav_enquire: "ইনকোয়ারি",
    nav_call: "কল: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "কালো সাগরের হৃদয়ে অবস্থিত বিলাসবহুল দ্বীপ জীবনযাপনের জন্য আপনার প্রিমিয়াম গেটওয়ে",
    hero_cta_explore: "প্রপার্টিজ দেখুন",
    hero_cta_quick_enquiry: "দ্রুত ইনকোয়ারি",

    // Quick enquiry modal
    quick_title: "দ্রুত ইনকোয়ারি",
    quick_label_name: "নাম *",
    quick_label_phone: "ফোন",
    quick_cc_help:
      "আপনার দেশের নাম বা ডায়ালিং কোড লিখুন (যেমন: Georgia +995, India +91)।",
    quick_label_email: "ইমেইল",
    quick_label_apartment_type: "অ্যাপার্টমেন্টের ধরন",
    quick_select_type: "টাইপ নির্বাচন করুন",
    quick_opt_studio: "লাক্সারি স্টুডিও",
    quick_opt_1bhk: "1BHK অ্যাপার্টমেন্ট",
    quick_opt_2bhk: "2BHK অ্যাপার্টমেন্ট",
    quick_opt_other: "অন্যান্য",
    quick_label_message: "বার্তা",
    quick_btn_submit: "ইনকোয়ারি সাবমিট করুন",

    // Invest Intro Brand
    invest_intro_after_brand:
      " কালো সাগরের অল্প কয়েকটি মাস্টার-প্ল্যান করা দ্বীপ উন্নয়নের একটি, যা বিশ্ববিখ্যাত গন্তব্য যেমন ",
    invest_intro_and: " এবং ",
    invest_intro_ending:
      " দ্বারা অনুপ্রাণিত একটি এক্সক্লুসিভ ইনভেস্টমেন্ট ল্যান্ডস্কেপ প্রদান করে; যা দীর্ঘমেয়াদি উচ্চ মূল্য এবং প্রকৃত উপকূলীয় সকারসিটি নিশ্চিত করে।",

    // Investment section
    section_invest_title:
      "Batumi Island Estates-এ কেন বিনিয়োগ করবেন?",

    invest_card1_title: "উচ্চ ROI",
    invest_card1_body:
      "বাটুমির দ্রুত বর্ধমান ট্যুরিজম, গেমিং এবং লিজার মার্কেট, বিশেষ করে সি-ফেসিং এবং রিসর্ট-ইন্টিগ্রেটেড দ্বীপ প্রপার্টিজে শক্তিশালী রেন্টাল ইয়েল্ড সাপোর্ট করে।",

    invest_card2_title: "গোল্ডেন ভিসা",
    invest_card2_body:
      "জর্জিয়ায় কৌশলগত বিনিয়োগ দীর্ঘমেয়াদি থাকার সুযোগ, সহজ মালিকানা কাঠামো এবং ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ার মধ্যে একটি সুবিধাজনক হাব প্রদান করতে পারে।",

    invest_card3_title: "প্রাইম আইল্যান্ড লোকেশন",
    invest_card3_body:
      "কালো সাগরে সরাসরি অ্যাক্সেস, কিউরেটেড প্রোমেনেড, বিচ ক্লাব ও মেরিনা লাইফস্টাইল — সব মিলিয়ে উচ্চমানের লাইফস্টাইল ও প্রিমিয়াম প্রাইসিং পাওয়ার তৈরি করে।",

    invest_wc_title:
      "কালো সাগরে ওয়ার্ল্ড-ক্লাস ইনভেস্টমেন্ট অপচুনিটি",

    invest_card4_title: "প্রথম-ধরনের মেগা আইল্যান্ড প্রোজেক্ট",
    invest_card4_body:
      "কালো সাগরের গুটিকয়েক বিশ্বমানের দ্বীপ উন্নয়নের মধ্যে একটি — যা ইউরোপ ও এশিয়ার জন্য এক অনন্য ল্যান্ডমার্ক গন্তব্য তৈরি করছে।",

    invest_card5_title: "অত্যন্ত সীমিত সাপ্লাই",
    invest_card5_body:
      "শহুরে প্রপার্টিজের তুলনায় দ্বীপ রিয়েল এস্টেট স্বভাবতই সীমিত — ফলে এক্সক্লুসিভিটি, বিনিয়োগকারীদের চাহিদা ও রিসেল ভ্যালু শক্তিশালী হয়।",

    invest_card6_title: "দুবাই-প্রেরিত লাক্সারি মাস্টারপ্ল্যান",
    invest_card6_body:
      "দুবাইয়ের আইকনিক আইল্যান্ড প্রোজেক্টগুলোর স্থাপত্য দর্শনের ওপর ভিত্তি করে ডিজাইনকৃত — প্রাইভেট বিচ, মেরিনা, লাক্সারি হোটেল এবং হাই-এন্ড রিটেইল সহ।",

    invest_card7_title: "লাক্সারি ৫-স্টার রিসর্ট ইকোসিস্টেম",
    invest_card7_body:
      "ব্র্যান্ডেড হসপিটালিটি, ফাইন ডাইনিং, বিচ ক্লাব, ওয়েলনেস সেন্টার এবং এন্টারটেইনমেন্ট জোন — প্রতিটি রেসিডেন্সের ভ্যালুকে আরও উঁচুতে নিয়ে যায়।",

    invest_card8_title: "প্রাইভেট মেরিনা ও ইয়াট অ্যাক্সেস",
    invest_card8_body:
      "ওয়ার্ল্ড-ক্লাস মেরিনায় সরাসরি অ্যাক্সেস, ট্যুরিস্ট আকর্ষণ এবং প্রিমিয়াম রেন্টাল ইনকাম দুটোই বাড়িয়ে দেয়।",

    invest_card9_title: "শক্তিশালী ভবিষ্যৎ ক্যাপিটাল আপ্রিসিয়েশন",
    invest_card9_body:
      "দ্বীপটি যখন আন্তর্জাতিক পর্যটন, এন্টারটেইনমেন্ট ও লাক্সারি লিভিংয়ের গন্তব্যে পরিণত হচ্ছে, তখন প্রাথমিক পর্যায়ে বিনিয়োগকারীরাই সবচেয়ে বেশি লাভবান হন।",

    invest_card10_title: "হার্ড কারেন্সি রেন্টাল ইয়েল্ড",
    invest_card10_body:
      "বিশেষ করে ইউরোপ ও মধ্যপ্রাচ্য থেকে আগত পর্যটকদের কাছ থেকে শক্তিশালী নৈশিক ভাড়ার মাধ্যমে হার্ড কারেন্সিতে আয় করুন।",

    invest_card11_title: "বর্ধিত কৌশলগত গুরুত্ব",
    invest_card11_body:
      "জর্জিয়া ব্যবসা, লিজার, গেমিং ও ট্যুরিজমের জন্য কালো সাগরের একটি গুরুত্বপূর্ণ হাবে পরিণত হচ্ছে — যা দীর্ঘমেয়াদে প্রপার্টির মূল্য বৃদ্ধি সাপোর্ট করে।",

    invest_card12_title: "শূন্য বার্ষিক প্রপার্টি ট্যাক্স",
    invest_card12_body:
      "জর্জিয়া ব্যক্তিগত মালিকানার ওপর কোনো বার্ষিক প্রপার্টি ট্যাক্স আরোপ না করে বিনিয়োগকারীদের জন্য অত্যন্ত অনুকূল পরিবেশ প্রদান করে।",

    // Transformation strip
    transformation_title: "বাটুমির লাক্সারি ট্রান্সফরমেশন",
    transformation_body:
      "একসময় মৌসুমী সমুদ্রতীরবর্তী শহর হিসাবে পরিচিত বাটুমি, আজ একটি বছরজুড়ে চলমান লাক্সারি ও এন্টারটেইনমেন্ট হাবে রূপান্তরিত হচ্ছে। নতুন ফাইভ-স্টার হোটেল, ক্যাসিনো, ব্র্যান্ডেড রেসিডেন্স এবং আন্তর্জাতিক লাইফস্টাইল কনসেপ্ট — এ সবই শহরের ওয়াটারফ্রন্টকে নতুন করে গড়ে তুলছে এবং দুবাইয়ের প্রাথমিক পরিবর্তনশীল পর্বের মতোই ধীরে ধীরে বিশ্বব্যাপী বিনিয়োগকারীদের আকর্ষণ করছে।",

    // Property types
    property_types_title: "আমাদের প্রপার্টি টাইপসমূহ",

    // Property cards
    property_studio_title: "লাক্সারি স্টুডিও অ্যাপার্টমেন্ট",
    property_1bhk_title: "প্রিমিয়াম 1BHK অ্যাপার্টমেন্ট",
    property_2bhk_title: "প্রিমিয়াম 2BHK অ্যাপার্টমেন্ট",

    property_studio_feat_seaview: "সী ভিউ",
    property_studio_feat_smarthome: "স্মার্ট হোম",

    property_1bhk_feat_panoramic: "প্যানোরামিক ভিউ",
    property_1bhk_feat_luxurybath: "লাক্সারি বাথরুম",
    property_1bhk_feat_smarthome: "স্মার্ট হোম",

    property_2bhk_feat_mastersuite: "মাস্টার স্যুট",
    property_2bhk_feat_gourmetkitchen: "গুরমে কিচেন",
    property_2bhk_feat_walkin: "ওয়াক-ইন ক্লজেট",

    property_card_description:
      "বাটুমির আইকনিক দ্বীপ উন্নয়নে সুন্দরভাবে ডিজাইন করা রেসিডেন্সগুলো আবিষ্কার করুন।",
    property_card_button: "ডিটেইলস রিকোয়েস্ট করুন",

    // Contact CTA
    contact_cta_title: "আপনি কি নিজের দ্বীপ স্বর্গের মালিক হতে প্রস্তুত?",
    contact_cta_sub:
      "একটি ভিজিট শিডিউল করতে বা আরও তথ্য জানতে আজই আমাদের অভিজ্ঞ এজেন্টদের সাথে যোগাযোগ করুন।",
    contact_cta_call_btn: "কল করুন +995 574 100 645",
    contact_cta_email_btn: "আমাদের ইমেইল করুন",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "জর্জিয়ায় জীবন",
    life_hero_body:
      "ইউরোপীয় আকর্ষণ, কালো সাগরের উপকূলীয় জীবন, উষ্ণ আতিথেয়তা এবং দ্রুত আধুনিকায়নশীল লাইফস্টাইলের এক উজ্জ্বল মিশ্রণ — জর্জিয়া এমন একটি অনন্য পরিবেশ প্রদান করে যেখানে সংস্কৃতি, স্বাধীনতা ও সুযোগ একসঙ্গে মিলিত হয়ে গ্লোবাল রেসিডেন্ট ও ইনভেস্টরদের জন্য আদর্শ জীবন রচনা করে।",
    life_hero_btn_lifestyle: "জর্জিয়ান লাইফস্টাইল এক্সপ্লোর করুন",
    life_hero_btn_alignment: "জর্জিয়া ও ইউরোপ: কীভাবে সংযুক্ত",

    // Lifestyle intro
    life_lifestyle_title:
      "জর্জিয়া: যেখানে প্রাকৃতিক সৌন্দর্য মিলিত হয় আধুনিক জীবনের সাথে",
    life_lifestyle_body:
      "জর্জিয়া ইউরোপের সবচেয়ে অনন্য লাইফস্টাইল অভিজ্ঞতাগুলোর একটি উপস্থাপন করে — যেখানে অনাবিষ্কৃত প্রাকৃতিক ল্যান্ডস্কেপ, সমৃদ্ধ সাংস্কৃতিক ঐতিহ্য এবং দ্রুত বিকাশমান আধুনিক অর্থনীতি একসাথে ভারসাম্য রচনা করে। শান্ত কালো সাগরের উপকূল থেকে শুরু করে ভবিষ্যতমুখী তবিলিসি স্কাইলাইন পর্যন্ত — এই দেশ সৌন্দর্য, সুযোগ ও বহনযোগ্যতার এক বিরল সমন্বয় প্রদান করে যা স্থানীয় ও আন্তর্জাতিক উভয় ধরনের বিনিয়োগকারী ও বাসিন্দাদের জন্য আকর্ষণীয়।",

    // Lifestyle cards
    life_card1_title: "চমকপ্রদ প্রাকৃতিক সৌন্দর্য",
    life_card1_body:
      "তুষারাবৃত পাহাড়, প্রাচীন অরণ্য, স্বচ্ছ হ্রদ এবং নাটকীয় উপকূলরেখা — সব মিলিয়ে জর্জিয়াকে বছরজুড়ে উপভোগ্য একটি গন্তব্যে পরিণত করেছে।",

    life_card2_title: "ইউরোপীয়-আধুনিক লাইফস্টাইল",
    life_card2_body:
      "ট্রেন্ডি ক্যাফে, আন্তর্জাতিক স্কুল, আধুনিক বিজনেস হাব, হাই-স্পিড ইন্টারনেট এবং জীবন্ত নাইটলাইফ — তবিলিসি ও বাটুমির মতো শহরগুলোকে আধুনিক জীবনের জন্য আদর্শ করে তুলেছে।",

    life_card3_title: "সমৃদ্ধশালী টেক ও ইনোভেশন হাব",
    life_card3_body:
      "কম ট্যাক্স, সহজ রেগুলেশন ও ইনোভেশন-সমর্থিত সরকারী নীতির কারণে জর্জিয়া দ্রুত একটি ডিজিটাল-ফার্স্ট অর্থনীতিতে পরিণত হচ্ছে, যা স্টার্টআপ, টেক ট্যালেন্ট ও গ্লোবাল ইনভেস্টরদের আকৃষ্ট করছে।",

    life_card4_title: "কৌশলগত ভৌগোলিক অবস্থান",
    life_card4_body:
      "ইউরোপ ও এশিয়ার মধ্যবর্তী অবস্থানে থাকা জর্জিয়া, বৈশ্বিক বাণিজ্য, ভ্রমণ এবং কমার্সের জন্য একটি গুরুত্বপূর্ণ গেটওয়ে হিসেবে কাজ করে, যা আন্তর্জাতিক ব্যবসা পরিচালনার জন্য আদর্শ ঘাঁটি তৈরি করে।",

    life_card5_title: "উষ্ণ ও আতিথেয় সংস্কৃতি",
    life_card5_body:
      "জর্জিয়ার আন্তরিক আতিথেয়তা, বন্ধুত্বপূর্ণ কমিউনিটি এবং নিরাপদ পরিবেশ — এটিকে প্রবাসী ও গ্লোবাল ইনভেস্টরদের জন্য অত্যন্ত আরামদায়ক এক গন্তব্যে পরিণত করেছে।",

    life_card6_title: "উচ্চ গ্রোথ পটেনশিয়াল",
    life_card6_body:
      "বর্ধিত ট্যুরিজম, বিদেশি বিনিয়োগ এবং বৃহৎ আকারের উপকূলীয় উন্নয়নের মাধ্যমে জর্জিয়া ইউরোপের সবচেয়ে সম্ভাবনাময় উদীয়মান বাজারগুলোর একটি হয়ে উঠছে।",

    // Culture section
    life_culture_title:
      "জর্জিয়ার সমৃদ্ধ সংস্কৃতি ও ঐতিহ্য অনুভব করুন",
    life_culture_body:
      "সদীয় পরম্পরা, মনোমুগ্ধকর লোককাহিনি, প্রাণবন্ত শিল্প এবং উষ্ণ আতিথেয়তা দ্বারা গঠিত — জর্জিয়ার আত্মা এক অনন্য অভিজ্ঞতা। প্রাচীন ওয়াইন তৈরির রীতি থেকে শুরু করে হৃদয়স্পর্শী পলিফোনিক সংগীত এবং পুরনো-নতুন স্থাপত্যের মিশ্রণ — জর্জিয়ার প্রতিটি মুহূর্ত এমন এক গল্প বলে, যা উপলব্ধি ও উপভোগ করার মতো।",

    life_culture_slide1_title: "ঐতিহ্যবাহী জর্জিয়ান নৃত্য",
    life_culture_slide1_body:
      "শৌর্য, অনুগ্রহ ও শতাব্দীপ্রাচীন সাংস্কৃতিক গৌরবের এক শিল্পিত উদযাপন।",

    life_culture_slide2_title: "প্রাচীন ওয়াইন সংস্কৃতি",
    life_culture_slide2_body:
      "বিশ্বের অন্যতম প্রাচীন ওয়াইন তৈরির ঐতিহ্যের অধিকারী — ৮,০০০ বছরেরও বেশি ইতিহাস ও আতিথেয়তা।",

    life_culture_slide3_title: "তবিলিসির স্থাপত্যের আকর্ষণ",
    life_culture_slide3_body:
      "ঐতিহাসিক গলি, আধুনিক সৌন্দর্য ও প্রাণবন্ত শহুরে জীবনের এক Harmonious মিশ্রণ।",

    life_culture_slide4_title: "বাটুমির উপকূলীয় আলোছায়া",
    life_culture_slide4_body:
      "একটি আধুনিক সমুদ্রতীরবর্তী স্বর্গ, যেখানে সংস্কৃতি, স্থাপত্য ও লাইফস্টাইল অনায়াসে একীভূত হয়েছে।",

    // Alignment section
    life_align_title:
      "আধুনিক ইউরোপিয়ান লাইফস্টাইলের সাথে জর্জিয়ার মিল",
    life_align_body:
      "অর্থনৈতিক প্রবাহ, লাইফস্টাইল এবং ট্যুরিজমের মাধ্যমে জর্জিয়া ক্রমশ ইউরোপের সাথে আরও বেশি সংযুক্ত হচ্ছে, একই সঙ্গে নিজের স্বতন্ত্র সাংস্কৃতিক পরিচয় ও খরচ-সাশ্রয়ী সুবিধা বজায় রেখেছে। বিনিয়োগকারী ও বাসিন্দাদের জন্য এটি পূর্ব ও পশ্চিমের মধ্যে সেতুর মতো ভূমিকা পালন করে।",

    life_align_card1_title:
      "ইউরোপিয়ান লাইফস্টাইল, কিন্তু কম খরচে",
    life_align_card1_body:
      "ক্যাফে সংস্কৃতি, হাঁটার উপযোগী পাড়া, আন্তর্জাতিক স্কুল এবং আধুনিক শপিং সেন্টার — অনেক ইউরোপীয় শহরের মতো, কিন্তু বাসস্থান, খাবার ও পরিষেবার খরচ প্রায়শই উল্লেখযোগ্যভাবে কম।",

    life_align_card2_title:
      "বর্ধিত সংযোগ ও ট্যুরিজম প্রবাহ",
    life_align_card2_body:
      "প্রধান ইউরোপীয় শহরগুলোর সাথে সরাসরি ও কানেক্টিং ফ্লাইট, বাড়তে থাকা পর্যটকের সংখ্যা এবং ক্রমবর্ধমান ডিজিটাল নোম্যাড সম্প্রদায় — সব মিলিয়ে জর্জিয়াকে বৃহত্তর ইউরোপীয় ট্যুরিজম ট্রাফিকের সাথে জুড়ে দিচ্ছে।",

    life_align_card3_title:
      "ইনভেস্টর-ফ্রেন্ডলি, দীর্ঘমেয়াদি দৃষ্টিভঙ্গি",
    life_align_card3_body:
      "পরিষ্কার ওনাশিপ রাইটস, সহজ ক্রয় প্রক্রিয়া এবং ভবিষ্যত মুখী ট্যুরিজম ও অবকাঠামো কৌশল — জর্জিয়াকে অন্যান্য উদীয়মান ইউরোপীয় ইনভেস্টমেন্ট হটস্পটের কাতারে অবস্থান করিয়েছে।",

    life_align_card4_title:
      "সংস্কৃতির গভীরতা ও আধুনিক আকাঙ্ক্ষার মিলন",
    life_align_card4_body:
      "ঐতিহাসিক স্থাপত্য, সংগীত, খাবার ও ঐতিহ্যের সঙ্গে আধুনিক হসপিটালিটি, কো-ওয়ার্কিং স্পেস এবং কনটেম্পোরারি আর্ট — এসব মিলিয়ে এমন এক লাইফস্টাইল তৈরি করেছে যা পরিশীলিত ইউরোপীয় ভ্রমণকারী ও দীর্ঘমেয়াদি বাসিন্দাদের সাথে সুন্দরভাবে রেজোনেট করে।",

    // CTA section
    life_cta_title:
      "দেখে নিন কীভাবে জর্জিয়ার জীবন আপনার বিনিয়োগের সঙ্গে সংযুক্ত",
    life_cta_body:
      "জর্জিয়ায় বসবাসের আবেগঘন আকর্ষণকে Batumi Island Estates-এ বিনিয়োগের আর্থিক শক্তির সঙ্গে একীভূত করুন — যা কালো সাগর অঞ্চলের সবচেয়ে অনন্য দ্বীপ উন্নয়নগুলোর একটি।",
    life_cta_btn: "ইনভেস্টমেন্ট হাইলাইটসে ফিরে যান",

    // Contact form (main)
    contact_title: "বিস্তারিত ইনভেস্টমেন্ট তথ্যের অনুরোধ করুন",
    contact_subtitle:
      "আপনার তথ্য শেয়ার করুন, আমাদের টিম আপনাকে ফ্লোর প্ল্যান, রেন্টাল ইয়েল্ড, পেমেন্ট টার্ম ও অ্যাভেলেবিলিটির ডিটেইলসহ যোগাযোগ করবে।",
    contact_label_fullname: "পূর্ণ নাম *",
    contact_label_email: "ইমেইল",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "কান্ট্রি কোড *",
    contact_cc_help:
      "আপনার দেশের নাম বা ডায়ালিং কোড লিখুন (যেমন: India +91, Georgia +995)।",
    contact_label_phone: "ফোন নম্বর *",
    contact_label_apartment_type: "অ্যাপার্টমেন্ট টাইপ",
    contact_select_type: "সিলেক্ট করুন",
    contact_label_budget: "প্রায় বাজেট (USD)",
    contact_ph_budget: "উদা. 150,000",
    contact_label_message: "বার্তা / প্রয়োজনীয়তা",
    contact_ph_message:
      "আপনার ইনভেস্টমেন্ট লক্ষ্য, থাকার সময়কাল, রেন্টাল প্রত্যাশা ইত্যাদি আমাদের জানান।",

    // Enquiry buttons & messages
    enquiry_btn_submit: "ইনকোয়ারি সাবমিট করুন",
    enquiry_btn_sending: "পাঠানো হচ্ছে...",
    enquiry_validation:
      "অনুগ্রহ করে আপনার নাম ও ফোন নম্বর প্রদান করুন।",
    enquiry_status_dryrun:
      "ধন্যবাদ। আপনার ইনকোয়ারি আমরা পেয়েছি (টেস্ট মোড)। ইমেইল পাঠানোর কনফিগারেশন এখনো সম্পন্ন হয়নি।",
    enquiry_status_success:
      "ধন্যবাদ। আপনার ইনকোয়ারি রিসিভ হয়েছে। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
    enquiry_status_error:
      "কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা WhatsApp / কল ব্যবহার করুন।",

    // Testimonials
    testimonials_title: "আমাদের ইনভেস্টররা কী বলছেন",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "ইনভেস্টর, লন্ডন, UK",
    testimonial1_text:
      "“Batumi Island Estates আমার সব চাহিদা পূরণ করেছে — সাগর দৃশ্য, শক্তিশালী রেন্টাল ইয়েল্ড এবং শুরু থেকে শেষ পর্যন্ত স্বচ্ছ প্রক্রিয়া। টিম প্রত্যেক ধাপে ব্যক্তিগত কনসিয়ার্জের মতো গাইড করেছে।”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI ইনভেস্টর, দুবাই",
    testimonial2_text:
      "“চেনা বাজারের বাইরে নিরাপদ কিন্তু উচ্চ গ্রোথ সম্ভাবনাময় সুযোগ খুঁজছিলাম। দ্বীপ লাইফস্টাইল এবং জর্জিয়ার ইনভেস্টর-ফ্রেন্ডলি রেগুলেশন — এই সিদ্ধান্তকে অনেক সহজ করে দিয়েছে।”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "হলিডে হোম ক্রেতা, এথেন্স",
    testimonial3_text:
      "“ফিনিশিং, সুবিধা ও ভিউ — সবকিছুই শীর্ষস্থানীয় মেডিটারেনিয়ান রিসর্টের মানের। আমি বছরে কয়েক সপ্তাহ এখানে থাকি, বাকি সময় রেন্টাল টিম নিখুঁতভাবে ম্যানেজ করে।”",

    // Project Details Section
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "ব্রিজ, ক্যানাল, ইন্টিগ্রেটেড রিসর্ট এবং কালো সাগরের উপর আইল্যান্ড লিভিং — ওয়াটারফ্রন্ট লাক্সারির ভবিষ্যৎ আজই অনুভব করুন।",

    // Live construction section
    project_progress_title: "লাইভ কনস্ট্রাকশন প্রগ্রেস",
    project_progress_body:
      "উপরের ভিডিওটিতে দ্বীপজুড়ে অবকাঠামো, ব্রিজ, ল্যান্ডস্কেপিং এবং প্রিমিয়াম রেসিডেন্সিয়াল জোনের বাস্তব সময়ের অগ্রগতি দেখানো হয়েছে। প্রতিটি ধাপ সম্পন্ন হওয়ার সাথে সাথে Batumi Island Estates পূর্ণাঙ্গ, সমন্বিত ওয়াটারফ্রন্ট লাক্সারি কমিউনিটির রূপ নিচ্ছে।",

    // Island vision section
    project_islandvision_title: "সম্পূর্ণ হওয়ার পর দ্বীপের ভিশন",
    project_islandvision_body:
      "Batumi Island Estates কীভাবে একটি সম্পূর্ণ ইন্টিগ্রেটেড লাক্সারি ওয়াটারফ্রন্ট কমিউনিটিতে পরিণত হবে তা এক্সপ্লোর করুন — যেখানে থাকবে প্রোমেনেড, ল্যান্ডস্কেপড টেরেস, রিসর্ট পুল, ক্যাফে, শপিং বুলেভার্ড এবং শান্ত কালো সাগরের জলে প্রতিফলিত এক জ্বলজ্বলে রাতের স্কাইলাইন।",

    // Carousel slides
    project_slide1_tag: "ওয়াটারফ্রন্ট প্রোমেনেড",
    project_slide1_title: "সি-ফ্রন্ট টাওয়ার ও মেরিনা লিভিং",
    project_slide1_body:
      "সাগরমুখী প্যানোরামিক টাওয়ার, রেসিডেন্টদের জন্য প্রাইভেট মেরিনা অ্যাক্সেসসহ।",

    project_slide2_tag: "রিসর্ট সুবিধা",
    project_slide2_title: "ইনফিনিটি পুল ও ল্যান্ডস্কেপড টেরেস",
    project_slide2_body:
      "উঁচু ডেক, লাউঞ্জ কাবানা এবং সবুজে ঘেরা ওয়াকওয়ে — রিল্যাক্সেশন ও লাইফস্টাইলের জন্য আদর্শ পরিবেশ।",

    project_slide3_tag: "নাইট স্কাইলাইন",
    project_slide3_title: "আলোকিত ওয়াটারফ্রন্ট লিভিং",
    project_slide3_body:
      "রাত্রিকালীন আকাশের নিচে জ্বলে ওঠা দ্বীপ — জর্জিয়ার নতুন এক আইকনিক ল্যান্ডস্কেপ।",

    project_slide4_tag: "বুলেভার্ড লিভিং",
    project_slide4_title: "ক্যাফে • রিটেইল • আইল্যান্ড প্রোমেনেড",
    project_slide4_body:
      "বুটিক রিটেইল ও সীসাইড ক্যাফেসহ একটি প্রিমিয়াম লাইফস্টাইল বুলেভার্ড।",

    // Brochure section
    brochure_title: "অফিসিয়াল প্রোজেক্ট ব্রোশিওর ডাউনলোড করুন",
    brochure_subtitle:
      "তৎক্ষণাৎ ব্রোশিওর পেতে আপনার ইমেইল অ্যাড্রেস দিন।",
    brochure_ph_email: "আপনার ইমেইল অ্যাড্রেস লিখুন",
    brochure_btn: "ব্রোশিওর ডাউনলোড করুন",

    brochure_msg_empty: "অনুগ্রহ করে আপনার ইমেইল অ্যাড্রেস লিখুন।",
    brochure_msg_sending: "পাঠানো হচ্ছে...",
    brochure_msg_success:
      "ব্রোশিওর পাঠানো হয়েছে! দয়া করে আপনার ইনবক্স চেক করুন।",
    brochure_msg_error:
      "ব্রোশিওর পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
    brochure_msg_network:
      "নেটওয়ার্ক সমস্যা। কিছুক্ষণ পর আবার চেষ্টা করুন।",

    // Google Meet section
    gmeet_title: "Google Meet কনসালটেশন শিডিউল করুন",
    gmeet_body:
      "Batumi Island Estates সম্পর্কে প্রোজেক্ট ডিটেইলস, ইনভেস্টমেন্ট স্ট্রাকচার এবং আপনার ব্যক্তিগত অ্যাকুইজিশন পাথ নিয়ে আলোচনা করতে আমাদের সিনিয়র অ্যাডভাইজরি টিমের সাথে একটি ব্যক্তিগত অনলাইন কনসালটেশন বুক করুন।",
    gmeet_btn: "Google Meet শিডিউল করুন",

    // ABOUT PAGE
    about_hero_title: "Batumi Island Estates সম্পর্কে",
    about_hero_subtitle:
      "Batumi Estates-এর একটি বিশেষায়িত লাক্সারি সাবসিডিয়ারি — যা Batumi দ্বীপগুলিতে প্রিমিয়াম আইল্যান্ড ও ওয়াটারফ্রন্ট প্রপার্টিজে নিবেদিত।",

    about_intro_title: "যেখানে অসাধারণ জীবনযাত্রা শুরু হয়",
    about_intro_p1:
      "২০২২ সালে প্রতিষ্ঠিত Batumi Estates, জর্জিয়ার রিয়েল এস্টেট ল্যান্ডস্কেপকে পরিবর্তন করার উদ্দেশ্যে যাত্রা শুরু করে — গ্লোবাল ইনভেস্টরদের জন্য স্বচ্ছ গাইডেন্স, নির্ভরযোগ্য ইনসাইট এবং লাক্সারি-ফোকাসড পোর্টফোলিও প্রদান করে। আজ এটি ইউরোপ, এশিয়া, মধ্যপ্রাচ্য ও আমেরিকাজুড়ে ক্লায়েন্টদের সেবা দিচ্ছে এবং জর্জিয়ার উচ্চ প্রবৃদ্ধির উন্নয়ন প্রকল্পের একটি লিডিং ইনভেস্টমেন্ট পার্টনারে পরিণত হয়েছে।",
    about_intro_p2:
      "২০২৪ সালে আমরা Batumi Island Estates প্রতিষ্ঠা করি — যা সম্পূর্ণভাবে জর্জিয়ার প্রথম মানব-নির্মিত লাক্সারি আইল্যান্ড মেগা-প্রোজেক্টে ফোকাস করা একটি ডেডিকেটেড ডিভিশন। শীর্ষস্থানীয় ডেভেলপার ও জাতীয় অবকাঠামো উদ্যোগের সমর্থনে, এই প্রবর্তক প্রকল্প কালো সাগর অঞ্চলে প্রিমিয়াম কস্টাল লিভিংকে নতুনভাবে সংজ্ঞায়িত করছে।",
    about_intro_p3:
      "১০০+ গ্লোবাল ইনভেস্টর ইতোমধ্যেই আমাদের সাথে যুক্ত হয়েছেন এবং আরও অনেকে আমাদের বিস্তৃত পোর্টফোলিওর সুযোগগুলো এক্সপ্লোর করছেন। Batumi Estates উৎকর্ষ, স্বচ্ছতা এবং নিরবচ্ছিন্ন প্রপার্টি অ্যাকুইজিশন প্রক্রিয়ার ঐতিহ্য বজায় রেখে প্রতি ক্লায়েন্টকে সর্বোচ্চ আস্থা ও সন্তুষ্টি প্রদান করে চলেছে।",

    about_journey_title: "আমাদের যাত্রা",
    about_journey_2022_title:
      "২০২২ — Batumi Estates-এর ভিত্তিপ্রস্তর",
    about_journey_2022_body:
      "জর্জিয়ায় স্বচ্ছ, প্রিমিয়াম ও দক্ষ প্রপার্টি ক্রয় অভিজ্ঞতা প্রদান করার মিশন নিয়ে প্রতিষ্ঠিত।",

    about_journey_2023_title: "২০২৩ — গ্লোবাল এক্সপ্যানশন",
    about_journey_2023_body:
      "২৫+ দেশের ক্লায়েন্টদের কাছে পৌঁছানো এবং ডেভেলপার ও সরকারি সংস্থার সাথে অংশীদারিত্ব সম্প্রসারণ।",

    about_journey_2024_title:
      "২০২৪ — Batumi Island Estates লঞ্চ",
    about_journey_2024_body:
      "Batumi দ্বীপের ঐতিহাসিক লাক্সারি মেগা-প্রোজেক্টে একচেটিয়া ফোকাস করার জন্য একটি ডেডিকেটেড ডিভিশন তৈরি করা হয়।",

    about_journey_2025_title:
      "২০২৫ — ১০০+ গ্লোবাল ইনভেস্টর পরিবেশন",
    about_journey_2025_body:
      "দ্রুত বৃদ্ধি, অসাধারণ সার্ভিস রেটিং এবং ক্রমবর্ধমান ইনভেস্টমেন্ট পোর্টফোলিওসহ এক মাইলফলক বছর।",

    about_why_title: "ইনভেস্টররা কেন আমাদের বেছে নেন",
    about_why_card1_title: "লাক্সারি-ফোকাসড এক্সপার্টিজ",
    about_why_card1_body:
      "জর্জিয়ার দ্রুত বর্ধমান ওয়াটারফ্রন্ট ও আইল্যান্ড জোনের সাথে সামঞ্জস্যপূর্ণ উচ্চমানের আইল্যান্ড ইনভেস্টমেন্টে বিশেষজ্ঞতা।",

    about_why_card2_title: "এন্ড-টু-এন্ড সহায়তা",
    about_why_card2_body:
      "লিগ্যাল সাপোর্ট, ডকুমেন্টেশন, স্টেপ-বাই-স্টেপ গাইডেন্স এবং ক্রয়ের পরেও পূর্ণাঙ্গ সার্ভিস — সব এক জায়গায়।",

    about_why_card3_title: "গ্লোবাল ক্লায়েন্ট ট্রাস্ট",
    about_why_card3_body:
      "৩০+ দেশের ইনভেস্টররা আমাদের স্বচ্ছ পরামর্শ এবং কিউরেটেড ইনভেস্টমেন্ট পোর্টফোলিওর ওপর আস্থা রাখেন।",

    about_testimonials_title:
      "আমাদের গ্লোবাল ইনভেস্টররা কী বলছেন",

    about_testimonial1_text:
      "“অত্যন্ত মসৃণ ও সুশৃঙ্খল ইনভেস্টমেন্ট অভিজ্ঞতা। প্রথম কল থেকে চূড়ান্ত কাগজপত্র পর্যন্ত প্রতিটি ধাপে টিম অসাধারণভাবে গাইড করেছে। সত্যিকারের ওয়ার্ল্ড-ক্লাস সার্ভিস!”",
    about_testimonial1_role:
      "— Daniel M., UK • টেক এক্সিকিউটিভ",

    about_testimonial2_text:
      "“দ্বীপে একটি লাক্সারি স্টুডিও কিনেছি। পুরো প্রক্রিয়াটি ছিল একেবারে স্বচ্ছ ও পেশাদার।”",
    about_testimonial2_role:
      "— Sara K., UAE • বিজনেস ওনার",

    about_testimonial3_text:
      "“আন্তর্জাতিক ক্রেতাদের জন্য অত্যন্ত সুপারিশযোগ্য। প্রক্রিয়া সহজ, গাইডেন্স গভীর ও বাস্তবভিত্তিক।”",
    about_testimonial3_role:
      "— Luca R., Italy • হসপিটালিটি ইনভেস্টর",

    about_testimonial4_text:
      "“খুবই প্রফেশনাল, সৎ এবং সাহায্যপ্রবণ টিম। জর্জিয়ার সেরা এজেন্সি বলা যায়!”",
    about_testimonial4_role:
      "— Aisha M., Qatar • রিয়েল এস্টেট পোর্টফোলিও",

    about_testimonial5_text:
      "“একেবারে ঝামেলাহীন ক্রয় অভিজ্ঞতা। তারা রিমোট সাইনিং পর্যন্ত সবকিছু সুন্দরভাবে ম্যানেজ করেছে!”",
    about_testimonial5_role:
      "— Carlos D., Brazil • ফাইন্যান্স কনসালট্যান্ট",

    about_testimonial6_text:
      "“বাটুমির লাক্সারি রিয়েল এস্টেট মার্কেট সম্পর্কে তাদের জ্ঞান অসাধারণ।”",
    about_testimonial6_role:
      "— Helene S., France • উদ্যোক্তা",

    about_testimonial7_text:
      "“প্রথমবার বিদেশে ইনভেস্টমেন্ট করছেন এমন কারও জন্য এদের মতো বিশ্বস্ত টিম বিরল। অত্যন্ত সুরক্ষিত ও সাপোর্টিভ অভিজ্ঞতা।”",
    about_testimonial7_role:
      "— Amir H., Saudi Arabia • অয়েল ও এনার্জি ইনভেস্টর",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "লাক্সারি আইল্যান্ড রেসিডেন্স",

    // Footer – brand section
    footer_brand_desc:
      "জর্জিয়ার সবচেয়ে মর্যাদাপূর্ণ দ্বীপ গন্তব্যে অবস্থিত প্রিমিয়াম স্টুডিও, 1BHK এবং 2BHK রেসিডেন্স — যেখানে রিসর্ট লাইফস্টাইল ও শক্তিশালী ইনভেস্টমেন্ট পটেনশিয়াল একত্রে মিলিত হয়েছে।",

    // Footer – navigation
    footer_nav_title: "নেভিগেট করুন",
    footer_nav_home: "হোম",
    footer_nav_why_batumi: "কেন বাটুমি?",
    footer_nav_properties: "প্রপার্টিজ",
    footer_nav_enquiry: "ইনকোয়ারি ফর্ম",

    // Footer – contact
    footer_contact_title: "যোগাযোগ",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1:
      "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "বাটুমি, জর্জিয়া",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    // Footer – bottom bar
    footer_bottom_rights:
      "© 2025 Batumi Island Estates. সর্বস্বত্ব সংরক্ষিত।",
    footer_bottom_privacy: "প্রাইভেসি পলিসি",
    footer_bottom_terms: "টার্মস"
  },


  // ---------------- GEORGIAN (GE) ----------------
  ge: {
    nav_home: "მთავარი",
    nav_why_batumi: "რატომ ბათუმი",
    nav_properties: "ქონება",
    nav_project_details: "პროექტის დეტალები",
    nav_life_georgia: "ცხოვრება საქართველოში",
    nav_about_us: "ჩვენ შესახებ",
    nav_enquire: "კითხვა",
    nav_call: "ზარი: +995 574 100 645",

    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "თქვენი გზა შავი ზღვის გულში მდებარე კუნძულურ ლუქსურიულ ცხოვრებამდე",
    hero_cta_explore: "ობიექტების დათვალიერება",
    hero_cta_quick_enquiry: "სწრაფი შეკითხვა",

    quick_title: "სწრაფი შეკითხვა",
    quick_label_name: "სახელი *",
    quick_label_phone: "ტელეფონი",
    quick_cc_help:
      "ჩაწერეთ ქვეყნის დასახელება ან კოდი (მაგ.: Georgia, +995, India, +91).",
    quick_label_email: "ელ. ფოსტა",
    quick_label_apartment_type: "ბინის ტიპი",
    quick_select_type: "აირჩიეთ ტიპი",
    quick_opt_studio: "ლუქს სტუდიო",
    quick_opt_1bhk: "1-საძინებლიანი ბინა",
    quick_opt_2bhk: "2-საძინებლიანი ბინა",
    quick_opt_other: "სხვა",
    quick_label_message: "შეტყობინება",
    quick_btn_submit: "შეკითხვის გაგზავნა",

    // Invest Intro Brand
    invest_intro_after_brand: " არის შავი ზღვის ერთ-ერთი იშვიათი მასტერპლანირებული კუნძულის განვითარება, რომელიც სთავაზობს ექსკლუზიურ საინვესტიციო გარემოს, შთაგონებულს მსოფლიო დონის მიმართულებებით, როგორიცაა ",
    invest_intro_and: " და ",
    invest_intro_ending: ", უზრუნველყოფს გამორჩეულ გრძელვადიან ღირებულებას და ნამდვილი სანაპირო დეფიციტს.",

    section_invest_title: "რატომ უნდა ინვესტირება Batumi Island Estates-ში?",

    invest_card1_title: "მაღალი ინვესტიციის მიუღებელი",
    invest_card1_body:
      "ბათუმის სწრაფად მზარდი ტურიზმი, გასართობი და სათამაშო სექტორი უზრუნველყოფს ძლიერ გაქირავების შემოსავალს, განსაკუთრებით ზღვისპირა და კურორტთან ინტეგრირებული კუნძულის ქონებისთვის.",

    invest_card2_title: "ოქროს ვიზის შესაძლებლობები",
    invest_card2_body:
      "სტრატეგიული ინვესტიციები საქართველოში ხელს უწყობს ხანგრძლივ ყოფნას, გამარტივებულ საკუთრების სტრუქტურებს და ხელსაყრელ მდებარეობას ევროპასა და ახლო აღმოსავლეთს შორის.",

    invest_card3_title: "პრემიუმ კუნძულის მდებარეობა",
    invest_card3_body:
      "ისიამოვნეთ უშუალო წვდომით შავი ზღვაზე, სანაპირო პრომენადებით, ბიჩ-კლაბებითა და მარლინით — რაც აძლიერებს როგორც ცხოვრების სტილის, ისე ფასის პრემიუმობას.",

    invest_wc_title: "მსოფლიო დონის საინვესტიციო შესაძლებლობა შავი ზღვის სანაპიროზე",

    invest_card4_title: "პირველი მეგა-კუნძულის განვითარება რეგიონში",
    invest_card4_body:
      "ერთ-ერთი იშვიათი, მსოფლიო დონის კუნძულის პროექტი შავი ზღვის აუზში — უნიკალური დესტინაცია ევროპისა და აზიის მასშტაბით.",

    invest_card5_title: "ძალიან შეზღუდული მიწოდება",
    invest_card5_body:
      "ქალაქის ბინებისგან განსხვავებით, კუნძულის ქონება შეზღუდულია — ქმნის ექსკლუზიურობას, მაღალ მოთხოვნას და ძლიერი გადაყიდვის პოტენციალს.",

    invest_card6_title: "დუბაის სტილის ლუქსური მასტერპლანი",
    invest_card6_body:
      "შექმნილია დუბაის ცნობილი კუნძულის პროექტების ფილოსოფიით — კერძო პლაჟები, მარდინები, ლუქსური სასტუმროები და მაღალი დონის კომერცია.",

    invest_card7_title: "ლუქსური 5-ვარსკვლავიანი რეზორტის ეკოსისტემა",
    invest_card7_body:
      "ბრენდირებული ჰოსპიტალობა, გურმანული რესტორნები, ბიჩ-კლუბები, უელნეს ცენტრები და გასართობი სივრცეები ზრდის თითოეული ბინის ღირებულებას.",

    invest_card8_title: "პირადი მარგინალური ნავსადგური",
    invest_card8_body:
      "პირდაპირი წვდომა მყუდრო მარგინალურ ნავსადგურთან ზრდის ტურისტულ მიმზიდველობას და გაქირავების შემოსავალს.",

    invest_card9_title: "კაპიტალის ძლიერი მომავალი ზრდა",
    invest_card9_body:
      "ადრეული ეტაპის ინვესტორები ყველაზე მეტს იგებენ, რადგან კუნძული ყალიბდება როგორც საერთაშორისო დესტინაცია ტურიზმისა და ლუქს ცხოვრებისათვის.",

    invest_card10_title: "მყარი ვალუტის გაქირავების შემოსავალი",
    invest_card10_body:
      "მიიღეთ შემოსავალი საერთაშორისო ტურისტებისგან კონკურენტული ყოველდღიური ტარიფებით — განსაკუთრებით ევროპიდან და ახლო აღმოსავლეთიდან.",

    invest_card11_title: "ზრდადი სტრატეგიული მნიშვნელობა",
    invest_card11_body:
      "საქართველო სწრაფად ხდება შავი ზღვის საკვანძო ჰაბი ბიზნესის, დასვენებისა და ტურიზმისთვის — რაც ზრდის უძრავი ქონების ღირებულებას.",

    invest_card12_title: "ნულოვანი წლიური ქონების გადასახადი",
    invest_card12_body:
      "საქართველო ინვესტორებისთვის გამორჩეულად ხელსაყრელ პირობებს სთავაზობს — ინდივიდუალური საკუთრებისთვის არ მოქმედებს წლიური ქონების გადასახადი.",

    transformation_title: "Batumi – ლუქსურ დესტინაციად ტრანსფორმაცია",
    transformation_body:
      "ბათუმი სწრაფად იცვლება სეზონურ საკურორტო ქალაქიდან მთელი წლის ლუქსურ და გასართობ ცენტრად. ახალი ხუთვარსკვლავიანი სასტუმროები, კაზინოები, ბრენდირებული რეზიდენციები და საერთაშორისო ცხოვრების სტილის კონცეფციები გარდაქმნის სანაპირო ზოლს და იზიდავს სულ უფრო მეტ გლობალურ ინვესტორს — ისე, როგორც დუბაიში ადრეულ ფაზებში.",

    property_types_title: "ჩვენი ქონების ტიპები",

    property_studio_title: "ლუქს სტუდიო ბინები",
    property_1bhk_title: "პრემიუმ 1-საძინებლიანი აპარტამენტები",
    property_2bhk_title: "პრემიუმ 2-საძინებლიანი აპარტამენტები",

    property_studio_feat_seaview: "ზღვის პანორამული ხედი",
    property_studio_feat_smarthome: "ჭკვიანი სახლის სისტემა",

    property_1bhk_feat_panoramic: "პანორამული ხედები",
    property_1bhk_feat_luxurybath: "ლუქს აბაზანა",
    property_1bhk_feat_smarthome: "ჭკვიანი სახლის სისტემა",

    property_2bhk_feat_mastersuite: "ოსტატის საძინებელი",
    property_2bhk_feat_gourmetkitchen: "გურმანული სამზარეულო",
    property_2bhk_feat_walkin: "გარდერობის ოთახი",

    property_card_description:
      "აღმოაჩინეთ ელეგანტურად დაგეგმილი რეზიდენციები ბათუმის საკულტო კუნძულის განვითარების ფარგლებში.",
    property_card_button: "დეტალების მოთხოვნა",


    contact_cta_title: "მზად ხართ ფლობდეთ თქვენს კუნძულურ სამოთხეს?",
    contact_cta_sub:
      "დაგვიკავშირდით დღესვე, რომ დაგიგეგმოთ ვიზიტი ან მოგაწოდოთ დეტალური ინფორმაცია.",
    contact_cta_call_btn: "დარეკეთ +995 574 100 645",
    contact_cta_email_btn: "მოგვწერეთ ელ. ფოსტაზე",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "ცხოვრება საქართველოში",
    life_hero_body:
      "ევროპული შარმი, შავი ზღვის სანაპიროზე ცხოვრება, თბილი სტუმართმოყვარეობა და სწრაფად თანამედროვე ცხოვრების სტილი — საქართველო ქმნის უნიკალურ გარემოს, სადაც კულტურა, თავისუფლება და შესაძლებლობები ერთად იყრის თავს გლობალური რეზიდენტებისა და ინვესტორებისთვის.",
    life_hero_btn_lifestyle: "აღმოაჩინეთ ქართული ცხოვრების სტილი",
    life_hero_btn_alignment: "როგორ ერწყმის საქართველო ევროპულ ცხოვრებას",

    // Lifestyle intro
    life_lifestyle_title: "საქართველო: სადაც ბუნებრივი სილამაზე და თანამედროვე ცხოვრება ერთიანდება",
    life_lifestyle_body:
      "საქართველო ერთ-ერთ ყველაზე უნიკალურ ცხოვრების გამოცდილებას გვთავაზობს ევროპაში — შეუხებელი ბუნება, მდიდარი კულტურული მემკვიდრეობა და სწრაფად განვითარებადი ეკონომიკა. მშვიდი შავი ზღვის სანაპიროდან თბილისის თანამედროვე ცაზე–ხაზამდე, ქვეყანა აერთიანებს სილამაზეს, შესაძლებლობებს და ხელმისაწვდომობას, რაც ახლოსაა როგორც ადგილობრივებისთვის, ასევე გლობალური ინვესტორებისთვის.",

    // Lifestyle cards
    life_card1_title: "განსაცვიფრებელი ბუნებრივი სილამაზე",
    life_card1_body:
      "თოვლიანი მთები, უძველესი ტყეები, სუფთა ტბები და შთამბეჭდავი სანაპირო ხაზი საქართველოში წლაღამ ულამაზეს დანიშნულებად აქცევს.",

    life_card2_title: "ევროპული-თანამედროვე ცხოვრება",
    life_card2_body:
      "სტუმართმოყვარე კაფეები, საერთაშორისო სკოლები, თანამედროვე ბიზნეს-ცენტრები, სწრაფი ინტერნეტი და ცოცხალი ღამის ცხოვრება თბილისსა და ბათუმს იდეალურ ქალაქებად აქცევს თანამედროვე ცხოვრებისთვის.",

    life_card3_title: "იზრდებადი ტექნოლოგიური და ინოვაციების ჰაბი",
    life_card3_body:
      "საქართველო სწრაფად ყალიბდება ციფრულ ეკონომიკად — სტარტაპების, ტექნოლოგიური ტალანტისა და ინვესტორების მიზნად დაბალი გადასახადებითა და მოქნილი რეგულაციებით.",

    life_card4_title: "სტრატეგიული მდებარეობა",
    life_card4_body:
      "საქართველო ევროპასა და აზიას შორის კარიბჭეა, რაც მას ვაჭრობის, მოგზაურობისა და ბიზნეს-ოპერაციებისთვის იდეალურ ცენტრად აქცევს.",

    life_card5_title: "თბილი სტუმართმოყვარეობა",
    life_card5_body:
      "ქართული სტუმართმოყვარეობა, მეგობრული საზოგადოება და უსაფრთხო გარემო ქვეყანას ერთ-ერთ ყველაზე კომფორტულ მიმართულებად აქცევს ადამიანებისთვის მსოფლიოს სხვადასხვა კუთხიდან.",

    life_card6_title: "მაღალი ზრდის პოტენციალი",
    life_card6_body:
      "ზრდადი ტურიზმი, პირდაპირი უცხოური ინვესტიციები და მასშტაბური სანაპირო პროექტები საქართველოს ერთ-ერთ ყველაზე პერსპექტიულ ბაზრად აქცევს ევროპაში.",

    // Culture section
    life_culture_title: "გაიცანით საქართველოს მდიდარი კულტურა და მემკვიდრეობა",
    life_culture_body:
      "საქართველოს სული საუკუნეების ტრადიციებით, ფერადი ფოლკლორით, ხელოვნებითა და თბილი სტუმართმოყვარეობით არის დატვირთული. უძველესი ღვინის კულტურიდან პოლიֆონიურ მუსიკამდე და ძველი–ახლის არქიტექტურულ შერწყმამდე, საქართველოში გატარებული ყოველი მომენტი სიცოცხლისგან დასამახსოვრებელ ისტორიად იქცევა.",

    life_culture_slide1_title: "ტრადიციული ქართული ცეკვა",
    life_culture_slide1_body:
      "მხატვრული გამოხატულება მამაცობის, ელეგანტურობის და საუკუნოვანი კულტურის სიამაყის.",

    life_culture_slide2_title: "უძველესი ღვინის კულტურა",
    life_culture_slide2_body:
      "მსოფლიოში ყველაზე ძველი ღვინის ტრადიცია — 8 000 წლიანი ისტორია და სტუმართმოყვარეობა.",

    life_culture_slide3_title: "ძველი თბილისის არქიტექტურა",
    life_culture_slide3_body:
      "ისტორიული ქუჩებისა და თანამედროვე ელეგანტურის ჰარმონიული შერწყმა ცოცხალ ქალაქურ გარემოში.",

    life_culture_slide4_title: "ბათუმის სანაპიროს სინათლე",
    life_culture_slide4_body:
      "თანამედროვე საზღვაო ქალაქი, სადაც არქიტექტურა, კულტურა და ცხოვრების სტილი ერთად ვითარდება.",

    // Alignment section
    life_align_title: "როგორ ერწყმის საქართველო თანამედროვე ევროპულ ცხოვრებას",
    life_align_body:
      "საქართველო სულ უფრო მეტად ერთიანდება ევროპულ ეკონომიკურ, ცხოვრების და ტურისტულ ნაკადებთან, ამასთან ინარჩუნებს თავის უნიკალურ კულტურასა და ფასობრივ უპირატესობას. ინვესტორებისა და მცხოვრებლებისთვის საქართველო ხიდია აღმოსავლეთსა და დასავლეთს შორის — ევროპული სტანდარტებით და უფრო მშვიდი, ადამიანზე ორიენტირებული ტემპით.",

    life_align_card1_title: "ევროპული ცხოვრება, დაბალი ხარჯები",
    life_align_card1_body:
      "კაფეების კულტურა, გასავლელი უბნები, საერთაშორისო სკოლები და თანამედროვე სავაჭრო ცენტრები ევროპულ დედაქალაქებს წააგავს, თუმცა საცხოვრებელი, კვება და მომსახურება ხშირად გაცილებით ხელმისაწვდომია.",

    life_align_card2_title: "ზრდადი კავშირები და ტურისტული ნაკადები",
    life_align_card2_body:
      "ევროპის მნიშვნელოვანი ქალაქებიდან პირდაპირი და გადამისამართებელი რეისები, მზარდი ტურისტული ნაკადები და დიჯიტალ ნომადების რაოდენობის მატება საქართველოს უფრო მჭიდროდ აკავშირებს ევროკავშირთან.",

    life_align_card3_title: "ინვესტორ-მეგობრული და გრძელვადიანი ხედვა",
    life_align_card3_body:
      "მოწესრიგებული საკუთრების უფლებები, მარტივი შეძენის პროცესი და ტურიზმისა და ინფრასტრუქტურის გეგმა საქართველოს სხვა ევროპულ საინვესტიციო მიმართულებებთან აყენებს ერთ რიგში.",

    life_align_card4_title: "ღრმა კულტურა და თანამედროვე ამბიციები",
    life_align_card4_body:
      "ისტორიული არქიტექტურა, მუსიკა, სამზარეულო და ტრადიციები ბუნებრივად ერწყმის თანამედროვე სასტუმროებს, კო-ვორქინგ სივრცეებსა და თანამედროვე ხელოვნებას.",

    // CTA section
    life_cta_title: "ნახეთ, როგორ ერწყმის საქართველოს ცხოვრება თქვენს ინვესტიციას",
    life_cta_body:
      "შეაერთეთ საქართველოში ცხოვრების ემოციური ღირებულება Batumi Island Estates-ში ინვესტიციის ფინანსურ ძალასთან — შავი ზღვის ერთ-ერთ ყველაზე უნიკალურ კუნძულურ პროექტთან.",
    life_cta_btn: "დაბრუნება საინვესტიციო ჰაილაიტებზე",

    contact_title: "მოითხოვეთ დეტალური საინვესტიციო ინფორმაცია",
    contact_subtitle:
      "გაგვიზიარეთ თქვენი ინფორმაცია და ჩვენი გუნდი დაგიკავშირდებათ გეგმარებების, მოსალოდნელი სარგებლის, გადახდის პირობებისა და ხელმისაწვდომობის დეტალებით.",
    contact_label_fullname: "სრული სახელი *",
    contact_label_email: "ელ. ფოსტა",
    contact_ph_email: "თქვენი@მაგალითი.com",
    contact_label_country_code: "სასაუბრო კოდი *",
    contact_cc_help:
      "ჩაწერეთ ქვეყნის დასახელება ან კოდი (მაგ.: India, +91, Georgia, +995).",
    contact_label_phone: "ტელეფონის ნომერი *",
    contact_label_apartment_type: "ბინის ტიპი",
    contact_select_type: "აირჩიეთ",
    contact_label_budget: "დამ приблиз. ბიუჯეტი (აშშ დოლარი)",
    contact_ph_budget: "მაგ.: 150,000",
    contact_label_message: "შეტყობინება / მოთხოვნები",
    contact_ph_message:
      "გვითხარით თქვენი საინვესტიციო მიზნების, ყოფნის ხანგრძლივობისა და გაქირავების მოლოდინების შესახებ.",

    enquiry_btn_submit: "შეკითხვის გაგზავნა",
    enquiry_btn_sending: "იგზავნება...",
    enquiry_validation: "გთხოვთ მიუთითოთ თქვენი სახელი და ტელეფონის ნომერი.",
    enquiry_status_dryrun:
      "გმადლობთ. თქვენი შეკითხვა მიღებულია (ტესტ რეჟიმი). ელფოსტის გაგზავნა ჯერ სრულად არ არის კონფიგურირებული.",
    enquiry_status_success:
      "გმადლობთ. თქვენი შეკითხვა მიღებულია. ჩვენი გუნდი მალე დაგიკავშირდებათ.",
    enquiry_status_error:
      "შეცდომა მოხდა შეკითხვის გაგზავნისას. გთხოვთ, სცადოთ ხელახლა ან გამოიყენოთ WhatsApp / ზარი.",

    testimonials_title: "რას ამბობენ naši ინვესტორები",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "ინვესტორი ლონდონიდან, დიდი ბრიტანეთი",
    testimonial1_text:
      "“Batumi Island Estates-მა ყველა კრიტერიუმი დააკმაყოფილა – ზღვის ხედები, ძლიერი გაქირავების შემოსავალი და გამჭვირვალე პროცესი. გუნდი ყოველი ეტაპის განმავლობაში პირადი კონსიერჟივით მეხმარებოდა.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI ინვესტორი, დუბაი",
    testimonial2_text:
      "“ვეძებდი უსაფრთხო, მაგრამ მაღალი ზრდის პოტენციალის მქონე შესაძლებლობას ტრადიციული ბაზრების გარეთ. კუნძულური ცხოვრების სტილისა და საქართველოს ინვესტორთა მეგობრული რეჟიმის კომბინაციამ გადაწყვეტილება ძალიან გამიადვილა.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "სადღესასწაულო ბინის მყიდველი, ათენი",
    testimonial3_text:
      "“ფინიშები, ინფრასტრუქტურა და ხედები ტოლს არ უდებს ხმელთაშუა ზღვის საუკეთესო რეზორტებს. თავად მხოლოდ რამდენიმე კვირას ვატარებ ბინაში, დანარჩენ დროს კი გაქირავების გუნდი ყველაფერს ზედმეტი ჩარევის გარეშე მართავს.”",

    // Project Details Section

    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "იცხოვრეთ წყნარი და ლუქსური სანაპირო ცხოვრების მომავალში — ხიდები, არხები, ინტეგრირებული რეზორტები და კუნძულური ცხოვრება შავი ზღვის გულში.",

    project_progress_title: "ნაირფაზიანი მშენებლობის პროგრესი",
    project_progress_body:
      "ზემოთ წარმოდგენილი ვიდეო真实 დროით წარმოაჩენს ინფრასტრუქტურის, ხიდების, გამწვანების და პრემიუმ საცხოვრებელი ზონების მშენებლობის მიმდინარეობას კუნძულებზე. თითოეული ეტაპის წინსვლისთანავე Batumi Island Estates სულ უფრო უახლოვდება სრულად ინტეგრირებულ, ლუქსურ სანაპირო თემად ქცევას შავი ზღვის გულში.",

    project_islandvision_title: "კუნძულის ხედვა დასრულების შემდეგ",
    project_islandvision_body:
      "გაეცანით, თუ როგორ გარდაიქმნება Batumi Island Estates სრულყოფილ ლუქსურ სანაპირო თემად — პრომენადებით, ლანდშაფტურ ტერასებით, რეზორტის აუზებით, კაფეებით, სავაჭრო ბულვარებით და ნათების ქალაქის ხედი, რომელიც ირეკლება მშვიდ შავ ზღვაში.",

    project_slide1_tag: "სანაპირო პრომენადი",
    project_slide1_title: "ზღვისპირა ცათამბჯენები და მარინა-ცხოვრება",
    project_slide1_body:
      "პანორამული ცათამბჯენები ზღვის ხედით და მცხოვრებლებისთვის პირადი ნავმისადგომის წვდომით.",

    project_slide2_tag: "რეზორტის სერვისები",
    project_slide2_title: ".infinity აუზები და ლანდშაფტური ტერასები",
    project_slide2_body:
      "ამაღლებული დეზები, ლაუნჯ-კაბანები და მწვანე გასასვლელები სრულყოფილი დასვენებისთვის.",

    project_slide3_tag: "ღამის პანორამა",
    project_slide3_title: "განათებული სანაპირო ცხოვრება",
    project_slide3_body:
      "კუნძული, რომელიც ანათებს ღამის ცის ქვეშ და ქმნის საქართველოს ახალ სანახაობრივ ლენდმარკს.",

    project_slide4_tag: "ბულვარ-სტილის ცხოვრება",
    project_slide4_title: "კაფეები • რითეილი • კუნძულის პრომენადი",
    project_slide4_body:
      "პრესთიჟული ცხოვრების ბულვარი, სადაც განთავსებულია ბუტიკ-რითეილები და ზღვისპირა კაფეები.",

    brochure_title: "ჩამოტვირთეთ ოფიციალური პროექტის ბროშიურა",
    brochure_subtitle: "შეიყვანეთ თქვენი ელ. ფოსტა, რომ მიიღოთ ბროშიურა მყისიერად.",
    brochure_ph_email: "შეიყვანეთ თქვენი ელ. ფოსტის მისამართი",
    brochure_btn: "ბროშიურის ჩამოტვირთვა",

    brochure_msg_empty: "გთხოვთ, შეიყვანოთ თქვენი ელ. ფოსტის მისამართი.",
    brochure_msg_sending: "იგზავნება...",
    brochure_msg_success: "ბროშიურა გაიგზავნა! გთხოვთ, შეამოწმოთ თქვენი ფოსტა.",
    brochure_msg_error: "შეცდომა ბროშიურის გაგზავნისას. გთხოვთ, სცადოთ კიდევ ერთხელ.",
    brochure_msg_network: "ქსელის შეცდომა. გთხოვთ, სცადოთ ხელახლა.",

    gmeet_title: "დაჯავშნეთ Google Meet კონსულტაცია",
    gmeet_body:
      "დაჯავშნეთ პერსონალიზებული კონსულტაცია ჩვენი უფროსი საკონსულტაციო გუნდთან, რათა ერთად გადახედოთ პროექტის დეტალებს, საინვესტიციო სტრუქტურებს და თქვენს პერსონალურ შეძენის მარშრუტს Batumi Island Estates-ში.",
    gmeet_btn: "Google Meet-ის დაჯავშნა",

    // ABOUT PAGE (GEORGIAN)
    about_hero_title: "Batumi Island Estates შესახებ",
    about_hero_subtitle:
      "Batumi Estates-ის სპეციალიზებული ლუქს-ქვებრენდი, რომელიც ფოკუსირებულია პრემიუმ კუნძულურ და სანაპირო უძრავ ქონებაზე ბათუმის კუნძულებზე.",

    about_intro_title: "სადაც განსაკუთრებული ცხოვრება იწყება",
    about_intro_p1:
      "Batumi Estates 2022 წელს შეიქმნა მიზნად იმისთვის, რომ გარდაექმნა საქართველოს უძრავი ქონების ბაზარი — გლობალურ ინვესტორებს შესთავაზოს გამჭვირვალე კონსულტაცია, სანდო ხედვები და ლუქსზე ორიენტირებული პორტფელები. დღეს ბრენდი with clients მომსახურებას უწევს ევროპიდან, აზიიდან, ახლო აღმოსავლეთიდან და ამერიკიდან და ჩამოყალიბდა, როგორც სანდო საინვესტიციო პარტნიორი მაღალი ზრდის ქართული პროექტებისთვის.",
    about_intro_p2:
      "2024 წელს ჩვენ გავაფართოვეთ ჩვენი მემკვიდრეობა Batumi Island Estates-ის შექმნით — დამოუკიდებელი მიმართულება, რომელიც სრულად არის მიძღვნილი საქართველოს პირველ ლუქს ხელოვნურ კუნძულის მეგაპროექტს. წამყვანი დეველოპერების მხარდაჭერით და ეროვნული ინფრასტრუქტურული ინიციატივებით ეს პროექტი შავი ზღვის რეგიონის პრემიუმ სანაპირო ცხოვრების ახალ სტანდარტს ქმნის.",
    about_intro_p3:
      "უკვე 100+ გლობალური ინვესტორის შემოგზავნით და მრავალ ახალი ინტერესით, Batumi Estates აგრძელებს გამჭვირვალობის, სანდოობისა და შეუფერხებელი შეძენის პროცესის მემკვიდრეობას — რათა თითოეულმა კლიენტმა თავი იგრძნოს თავდაჯერებულად და დაცულად მთელი საინვესტიციო მოგზაურობის განმავლობაში.",

    about_journey_title: "ჩვენი გზა",
    about_journey_2022_title: "2022 — Batumi Estates-ის დაფუძნება",
    about_journey_2022_body:
      "დაარსდა მიზნად პრემიალური და გამჭვირვალე უძრავი ქონების შეძენის პროცესის შეთავაზება საქართველოში.",
    about_journey_2023_title: "2023 — გლობალური გაფართოება",
    about_journey_2023_body:
      "კლიენტები 25+ ქვეყნიდან და გაფართოებული პარტნიორობა დეველოპერებსა და სახელმწიფო სტრუქტურებთან.",
    about_journey_2024_title: "2024 — Batumi Island Estates-ის გაშვება",
    about_journey_2024_body:
      "ექსკლუზიური მიმართულება, რომელიც ფოკუსირებულია ბათუმის კუნძულების ლენდმარკ მეგაპროექტზე — საქართველოს პირველ ლუქს ხელოვნურ კუნძულებზე.",
    about_journey_2025_title: "2025 — 100+ გლობალური ინვესტორის მომსახურება",
    about_journey_2025_body:
      "ტემპიანი ზრდის, მაღალი კმაყოფილების შეფასებების და გაფართოებული პორტფელების მნიშვნელოვანი წელი.",

    about_why_title: "რატომ გვირჩევენ ინვესტორები",
    about_why_card1_title: "ლუქს-სეგმენტზე ორიენტირებული ექსპერტიზა",
    about_why_card1_body:
      "სპეციალიზაცია სანაპირო და კუნძულურ ინვესტიციებში, რომლებიც საქართველოს ყველაზე სწრაფად მზარდ ლოკაციებს ერწყმის.",
    about_why_card2_title: "სრული, ბოლომდე მხარდაჭერა",
    about_why_card2_body:
      "იურიდიული მხარდაჭერა, დოკუმენტაცია, ბინის დათვალიერება და შეძენის-შემდგომი სერვისი შეუფერხებელი პროცესისთვის.",
    about_why_card3_title: "გლობალური ნდობა",
    about_why_card3_body:
      "30+ ქვეყნიდან ჩამოსული ინვესტორები გვენდობიან ჩვენი გამჭვირვალე კონსულტაციისა და შერჩეული პორტფელის გამო.",

    about_testimonials_title: "რას ამბობენ ჩვენი გლობალური ინვესტორები",
    about_testimonial1_text:
      "“შეუფერხებელი საინვესტიციო გამოცდილება. გუნდი პირველ ზარიდან საბოლოო ხელმოწერამდე მიყვებოდა. ნამდვილად მსოფლიო დონის სერვისი!”",
    about_testimonial1_role: "— დენიელ М., დიდი ბრიტანეთი • Tech Executive",
    about_testimonial2_text:
      "“შევიძინე ლუქს სტუდიო კუნძულზე. გამორჩეული გამჭვირვალობა და პროფესიონალური მხარდაჭერა.”",
    about_testimonial2_role: "— სარა K., UAE • ბიზნესის მფლობელი",
    about_testimonial3_text:
      "“ძალიან ვურჩევ საერთაშორისო მყიდველებს. მარტივი პროცესი და ღირებული რჩევები.”",
    about_testimonial3_role: "— ლუკა R., იტალია • სასტუმრო ბიზნესის ინვესტორი",
    about_testimonial4_text:
      "“პროფესიონალები, გამჭვირვალე და ძალიან დამხმარე. საუკეთესო სააგენტოა საქართველოში!”",
    about_testimonial4_role: "— აიშა M., ყატარი • უძრავი ქონების პორტფელი",
    about_testimonial5_text:
      "“ძალიან მარტივი შენაძენის პროცესი. ყველანაირი ფორმალობა მათ სახელზე გაკეთდა — დისტანციური ხელმოწერაც კი!”",
    about_testimonial5_role: "— კარლოს D., ბრაზილია • ფინანსური კონსულტანტი",
    about_testimonial6_text:
      "“Batumi-ს ლუქს ბაზრის მათი ცოდნა შეუდარებელია.”",
    about_testimonial6_role: "— ელენ S., საფრანგეთი • მეწარმე",
    about_testimonial7_text:
      "“იდეალურია უცხოელებისთვის, რომლებიც პირველად ინვესტირებენ. ძალიან სანდო გუნდი.”",
    about_testimonial7_role: "— ამირ H., საუდის არაბეთი • ნავთობისა და ენერგიის სექტორი",

    brand_title: "Batumi Island Estates",
    brand_tagline: "ლუქს კლასის კუნძულის რეზიდენციები",

    footer_brand_desc:
      "პრემიუმ სტუდიო, 1 და 2 საძინებლიანი რეზიდენციები საქართველოს ყველაზე პრესტიჟულ კუნძულურ ლოკაციაზე, სადაც რეზორტ-ცხოვრება მაღალი საინვესტიციო პოტენციალით ერთიანდება.",

    footer_nav_title: "ნავიგაცია",
    footer_nav_home: "მთავარი",
    footer_nav_why_batumi: "რატომ ბатуმი",
    footer_nav_properties: "ობიექტები",
    footer_nav_enquiry: "საკონტაქტო ფორმა",

    footer_contact_title: "კონტაქტი",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1: "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "ბათუმი, საქართველო",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    footer_bottom_rights:
      "© 2025 Batumi Island Estates. ყველა უფლება დაცულია.",
    footer_bottom_privacy: "კონფიდენციალობა",
    footer_bottom_terms: "პირობები",

  },

  // ---------------- RUSSIAN ----------------
  ru: {
    nav_home: "Главная",
    nav_why_batumi: "Почему Батуми",
    nav_properties: "Объекты",
    nav_project_details: "Детали проекта",
    nav_life_georgia: "Жизнь в Грузии",
    nav_about_us: "О нас",
    nav_enquire: "Заявка",
    nav_call: "Звонок: +995 574 100 645",

    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "Ваш путь к роскошной жизни на островах в сердце Чёрного моря",
    hero_cta_explore: "Посмотреть объекты",
    hero_cta_quick_enquiry: "Быстрый запрос",

    quick_title: "Быстрый запрос",
    quick_label_name: "Имя *",
    quick_label_phone: "Телефон",
    quick_cc_help:
      "Введите название страны или телефонный код (например: Georgia, +995, India, +91).",
    quick_label_email: "E-mail",
    quick_label_apartment_type: "Тип апартаментов",
    quick_select_type: "Выберите тип",
    quick_opt_studio: "Люкс студия",
    quick_opt_1bhk: "Апартаменты 1 спальня",
    quick_opt_2bhk: "Апартаменты 2 спальни",
    quick_opt_other: "Другое",
    quick_label_message: "Сообщение",
    quick_btn_submit: "Отправить запрос",

    invest_intro_after_brand: " является одним из немногих островных проектов с мастер-планом на Чёрном море, предлагая эксклюзивные инвестиционные возможности, вдохновлённые всемирно известными направлениями, такими как ",
    invest_intro_and: " и ",
    invest_intro_ending: ", обеспечивая выдающуюся долгосрочную ценность и настоящую прибрежную редкость.",

    section_invest_title: "Почему стоит инвестировать в Batumi Island Estates?",

    invest_card1_title: "Высокая доходность",
    invest_card1_body:
      "Быстрорастущий рынок туризма, развлечений и игорного бизнеса в Батуми обеспечивает высокую доходность от аренды, особенно для прибрежных и курортных объектов на острове.",

    invest_card2_title: "Возможности вида на жительство",
    invest_card2_body:
      "Стратегические инвестиции в Грузии могут поддерживать долгосрочное проживание, удобные схемы владения и расположение между Европой и Ближним Востоком.",

    invest_card3_title: "Премьер-локация на острове",
    invest_card3_body:
      "Прямой доступ к Чёрному морю, набережные, beach-клубы и марина создают уникальный образ жизни и позволяют формировать премиальные цены.",

    invest_wc_title: "Инвестиция мирового уровня на побережье Чёрного моря",

    invest_card4_title: "Первый мегапроект на островах в регионе",
    invest_card4_body:
      "Один из немногих мультифункциональных островных проектов в акватории Чёрного моря — формирует новый знаковый курорт.",

    invest_card5_title: "Очень ограниченное предложение",
    invest_card5_body:
      "В отличие от городской недвижимости, площадь острова ограничена — это создаёт дефицит предложения, высокий спрос и сильный потенциал роста стоимости.",

    invest_card6_title: "Мастер-план в стиле Дубая",
    invest_card6_body:
      "Создан по философии знаковых дубайских островных проектов — частные пляжи, марина, люксовые отели и премиальная коммерция.",

    invest_card7_title: "Экосистема 5-звёздочного курорта",
    invest_card7_body:
      "Брендированные отели, рестораны, beach-клубы, wellness-центры и развлекательные зоны увеличивают ценность каждой резиденции.",

    invest_card8_title: "Приватная марина и доступ для яхт",
    invest_card8_body:
      "Прямой выход к современному яхтенному порту усиливает привлекательность для туристов и повышает арендный доход.",

    invest_card9_title: "Сильный рост капитальной стоимости",
    invest_card9_body:
      "Инвесторы, вошедшие на ранних этапах, получают максимальную выгоду по мере того, как остров становится международным центром туризма и развлечений.",

    invest_card10_title: "Арендный доход в твёрдой валюте",
    invest_card10_body:
      "Вы зарабатываете на международных туристах с высокими годовыми и суточными ставками, особенно из Европы и стран Ближнего Востока.",

    invest_card11_title: "Растущая стратегическая роль Грузии",
    invest_card11_body:
      "Грузия становится ключевым узлом на Чёрном море для бизнеса, туризма и развлечений — что поддерживает рост стоимости недвижимости.",

    invest_card12_title: "Налоговые льготы на недвижимость",
    invest_card12_body:
      "Грузия предлагает инвесторам привлекательные условия — отсутствует ежегодный налог на имущество для индивидуальных владельцев.",

    transformation_title: "Преображение Батуми в центр роскоши",
    transformation_body:
      "Батуми стремительно меняется из сезонного курорта в круглогодичный центр роскоши и развлечений. Новые пятизвёздочные отели, казино, брендированные резиденции и международные lifestyle-проекты полностью преображают набережную и привлекают всё больше глобальных инвесторов, как это было в Дубае на ранних этапах его развития.",

    property_types_title: "Наши типы недвижимости",

    property_studio_title: "Люксовые студии",
    property_1bhk_title: "Премиальные апартаменты с 1 спальней",
    property_2bhk_title: "Премиальные апартаменты с 2 спальнями",

    property_studio_feat_seaview: "Вид на море",
    property_studio_feat_smarthome: "Система «умный дом»",

    property_1bhk_feat_panoramic: "Панорамный вид",
    property_1bhk_feat_luxurybath: "Люкс-ванная",
    property_1bhk_feat_smarthome: "Система «умный дом»",

    property_2bhk_feat_mastersuite: "Главная спальня (master suite)",
    property_2bhk_feat_gourmetkitchen: "Гурман-кухня",
    property_2bhk_feat_walkin: "Гардеробная комната",

    property_card_description:
      "Откройте для себя изысканно спроектированные резиденции в культовом островном проекте Батуми.",
    property_card_button: "Запросить детали",

    contact_cta_title: "Готовы владеть своим островным раем?",
    contact_cta_sub:
      "Свяжитесь с нашими экспертами уже сегодня, чтобы назначить просмотр или получить подробную информацию.",
    contact_cta_call_btn: "Позвонить +995 574 100 645",
    contact_cta_email_btn: "Написать нам",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "Жизнь в Грузии",
    life_hero_body:
      "Яркое сочетание европейского шарма, прибрежной жизни на Чёрном море, тёплого гостеприимства и быстро обновляющегося образа жизни — Грузия создаёт уникальную среду, где культура, свобода и возможности соединяются для резидентов и инвесторов со всего мира.",
    life_hero_btn_lifestyle: "Откройте грузинский образ жизни",
    life_hero_btn_alignment: "Грузия и Европа: точки соприкосновения",

    // Lifestyle intro
    life_lifestyle_title: "Грузия: где природная красота встречается с современной жизнью",
    life_lifestyle_body:
      "Грузия предлагает один из самых уникальных стилей жизни в Европе — сочетание нетронутой природы, богатого культурного наследия и быстро развивающейся экономики. От спокойного побережья Чёрного моря до футуристического горизонта Тбилиси страна объединяет красоту, возможности и доступность для жителей и инвесторов.",

    // Lifestyle cards
    life_card1_title: "Впечатляющая природная красота",
    life_card1_body:
      "Заснеженные горы, древние леса, кристально чистые озёра и драматичное побережье делают Грузию круглогодичным направлением с выдающимися пейзажами.",

    life_card2_title: "Современный европейский образ жизни",
    life_card2_body:
      "Стильные кафе, международные школы, современные бизнес-центры, быстрый интернет и яркая ночная жизнь делают Тбилиси и Батуми идеальными городами для современной жизни.",

    life_card3_title: "Развивающийся центр технологий и инноваций",
    life_card3_body:
      "Грузия быстро превращается в цифровую экономику — привлекая стартапы, IT-специалистов и инвесторов благодаря низким налогам и гибкому регулированию.",

    life_card4_title: "Стратегическое расположение",
    life_card4_body:
      "Расположенная между Европой и Азией, Грузия служит воротами для торговли, путешествий и международного бизнеса.",

    life_card5_title: "Гостеприимная культура",
    life_card5_body:
      "Грузинское гостеприимство, дружелюбное общество и ощущение безопасности делают страну одним из самых комфортных мест для экспатов и инвесторов.",

    life_card6_title: "Высокий потенциал роста",
    life_card6_body:
      "Рост туризма, увеличение объёмов иностранных инвестиций и крупные прибрежные проекты делают Грузию одним из самых перспективных рынков в Европе.",

    // Culture section
    life_culture_title: "Ощутите богатую культуру и наследие Грузии",
    life_culture_body:
      "Душа Грузии формировалась веками — это традиции, фольклор, искусство и особое гостеприимство. От древних винодельческих ритуалов до многоголосного пения и сочетания старой и современной архитектуры — каждый момент в Грузии рассказывает историю, которую хочется прожить.",

    life_culture_slide1_title: "Традиционный грузинский танец",
    life_culture_slide1_body:
      "Художественное выражение мужества, грации и многовековой культурной гордости.",

    life_culture_slide2_title: "Древняя винная культура",
    life_culture_slide2_body:
      "Родина старейшей винной традиции в мире — более 8 000 лет мастерства и гостеприимства.",

    life_culture_slide3_title: "Архитектурное очарование Тбилиси",
    life_culture_slide3_body:
      "Гармоничное сочетание исторических улиц, современной архитектуры и динамичной городской жизни.",

    life_culture_slide4_title: "Прибрежное сияние Батуми",
    life_culture_slide4_body:
      "Современный морской курорт, где культура, архитектура и образ жизни соединяются в едином ритме.",

    // Alignment section
    life_align_title: "Как Грузия соответствует современному европейскому образу жизни",
    life_align_body:
      "Грузия всё активнее интегрируется в европейские экономические, туристические и lifestyle-потоки, сохраняя при этом собственную идентичность и ценовое преимущество. Для резидентов и инвесторов она становится мостом между Востоком и Западом.",

    life_align_card1_title: "Европейский образ жизни при меньших расходах",
    life_align_card1_body:
      "Кафе-культура, пешеходные районы, международные школы и современные торговые центры напоминают европейские столицы, при этом жильё, питание и сервис остаются более доступными.",

    life_align_card2_title: "Растущая связность и туристические потоки",
    life_align_card2_body:
      "Прямые и стыковочные рейсы из ключевых городов Европы, рост туристического потока и увеличение числа digital nomads связывают Грузию с пространством ЕС.",

    life_align_card3_title: "Инвестиционная привлекательность и долгосрочный фокус",
    life_align_card3_body:
      "Прозрачные права собственности, простой процесс покупки и стратегическое развитие туризма и инфраструктуры делают Грузию сопоставимой с другими перспективными европейскими рынками.",

    life_align_card4_title: "Глубокая культура и современные стремления",
    life_align_card4_body:
      "Историческая архитектура, музыка, кухня и традиции соседствуют с современными отелями, коворкингами и современным искусством.",

    // CTA
    life_cta_title: "Узнайте, как жизнь в Грузии сочетается с вашей инвестицией",
    life_cta_body:
      "Объедините эмоциональную привлекательность жизни в Грузии с финансовой силой инвестиций в Batumi Island Estates — один из самых уникальных островных проектов на Чёрном море.",
    life_cta_btn: "Вернуться к инвестиционным преимуществам",

    contact_title: "Запрос подробной инвестиционной информации",
    contact_subtitle:
      "Оставьте свои данные, и наша команда свяжется с вами, чтобы предоставить планировки, доходность, условия оплаты и информацию о доступных вариантах.",
    contact_label_fullname: "Полное имя *",
    contact_label_email: "E-mail",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "Телефонный код страны *",
    contact_cc_help:
      "Введите название страны или телефонный код (например: India, +91, Georgia, +995).",
    contact_label_phone: "Номер телефона *",
    contact_label_apartment_type: "Тип апартаментов",
    contact_select_type: "Выберите",
    contact_label_budget: "Ориентировочный бюджет (USD)",
    contact_ph_budget: "например, 150,000",
    contact_label_message: "Сообщение / требования",
    contact_ph_message:
      "Опишите ваши инвестиционные цели, срок пребывания, ожидания по аренде и т.п.",

    enquiry_btn_submit: "Отправить запрос",
    enquiry_btn_sending: "Отправка...",
    enquiry_validation: "Пожалуйста, укажите ваше имя и номер телефона.",
    enquiry_status_dryrun:
      "Спасибо. Ваш запрос получен (тестовый режим). Отправка писем по e-mail ещё не настроена.",
    enquiry_status_success:
      "Спасибо. Ваш запрос получен. Наша команда свяжется с вами в ближайшее время.",
    enquiry_status_error:
      "Произошла ошибка при отправке запроса. Пожалуйста, попробуйте ещё раз или воспользуйтесь WhatsApp / телефонным звонком.",

    testimonials_title: "Что говорят наши инвесторы",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "Инвестор из Лондона, Великобритания",
    testimonial1_text:
      "“Batumi Island Estates полностью соответствовал моим ожиданиям – вид на море, высокая доходность от аренды и прозрачный процесс. Команда сопровождала меня на каждом шаге словно персональный консьерж.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI-инвестор, Дубай",
    testimonial2_text:
      "“Я искал безопасную, но высокодоходную возможность за пределами привычных рынков. Сочетание островного образа жизни и дружественного к инвесторам регулирования в Грузии сделало этот выбор очевидным.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "Покупатель дома для отдыха, Афины",
    testimonial3_text:
      "“Отделка, инфраструктура и виды сопоставимы с лучшими средиземноморскими курортами. Я провожу в апартаментах несколько недель в году, а остальное время управляющая команда безупречно занимается сдачей в аренду.”",

    // Project Details Section
    
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "Живите в будущем роскошной набережной жизни — мосты, каналы, интегрированные курорты и островная жизнь на берегу Чёрного моря.",

    project_progress_title: "Текущий ход строительства",
    project_progress_body:
      "Видео выше демонстрирует в реальном времени прогресс строительства инфраструктуры, мостов, озеленения и премиальных жилых зон на островах. С каждой новой стадией Batumi Island Estates приближается к формату полностью интегрированного, роскошного прибрежного сообщества в сердце Чёрного моря.",

    project_islandvision_title: "Вид острова после завершения проекта",
    project_islandvision_body:
      "Посмотрите, как Batumi Island Estates превратится в полностью интегрированное сообщество класса люкс на побережье — с променаданми, ландшафтными террасами, курортными бассейнами, кафе, торговыми бульварами и подсвеченной панорамой, отражающейся в спокойных водах Чёрного моря.",

    project_slide1_tag: "Набережная у моря",
    project_slide1_title: "Башни у моря и жизнь у марины",
    project_slide1_body:
      "Панорамные башни с видом на море и прямым доступом к частной марине для резидентов.",

    project_slide2_tag: "Курортная инфраструктура",
    project_slide2_title: "Инфинити-бассейны и ландшафтные террасы",
    project_slide2_body:
      "Приподнятые террасы, лаунж-кабаны и зелёные прогулочные дорожки для комфортного отдыха.",

    project_slide3_tag: "Ночной горизонт",
    project_slide3_title: "Подсвеченная прибрежная жизнь",
    project_slide3_body:
      "Остров, сияющий под ночным небом и формирующий новый архитектурный символ Грузии.",

    project_slide4_tag: "Бульварный стиль жизни",
    project_slide4_title: "Кафе • Ритейл • Островной променад",
    project_slide4_body:
      "Премиальный бульвар с бутиковыми магазинами и кафе у моря.",

    brochure_title: "Скачать официальный буклет проекта",
    brochure_subtitle:
      "Оставьте свой e-mail, чтобы мгновенно получить буклет.",
    brochure_ph_email: "Введите ваш e-mail",
    brochure_btn: "Скачать буклет",

    brochure_msg_empty: "Пожалуйста, введите ваш e-mail.",
    brochure_msg_sending: "Отправка...",
    brochure_msg_success: "Буклет отправлен! Проверьте, пожалуйста, почту.",
    brochure_msg_error: "Ошибка при отправке буклета. Попробуйте ещё раз.",
    brochure_msg_network: "Ошибка сети. Попробуйте ещё раз.",

    gmeet_title: "Запланировать консультацию в Google Meet",
    gmeet_body:
      "Запишитесь на персональную консультацию с нашим старшим консультативным отделом, чтобы подробно обсудить проект, инвестиционные структуры и ваш индивидуальный путь приобретения в Batumi Island Estates.",
    gmeet_btn: "Запланировать Google Meet",

    // ABOUT PAGE (RUSSIAN)
    about_hero_title: "О Batumi Island Estates",
    about_hero_subtitle:
      "Специализированное люксовое подразделение Batumi Estates, ориентированное на премиальные островные и прибрежные объекты на Батумских островах.",

    about_intro_title: "Где начинается исключительный уровень жизни",
    about_intro_p1:
      "Batumi Estates был основан в 2022 году с целью трансформировать рынок недвижимости Грузии, предлагая глобальным инвесторам прозрачные консультации, надёжную аналитику и портфели, ориентированные на люксовый сегмент. Сегодня бренд обслуживает клиентов из Европы, Азии, Ближнего Востока и обеих Америк, выступая ведущим инвестиционным партнёром в быстрорастущих проектах Грузии.",
    about_intro_p2:
      "В 2024 году мы расширили своё наследие, создав Batumi Island Estates — отдельное направление, полностью сфокусированное на первом в Грузии роскошном мегапроекте искусственных островов. При поддержке ведущих девелоперов и национальных инфраструктурных инициатив этот проект формирует новый стандарт премиальной прибрежной жизни в регионе Чёрного моря.",
    about_intro_p3:
      "Более 100 международных инвесторов уже присоединились к нам, и всё больше клиентов изучают новые возможности. Batumi Estates укрепляет репутацию компании, где прозрачность, высокий сервис и комфортная процедура покупки стоят на первом месте.",

    about_journey_title: "Наш путь",
    about_journey_2022_title: "2022 — Основание Batumi Estates",
    about_journey_2022_body:
      "Создана компания с миссией обеспечить прозрачный, премиальный и эффективный процесс покупки недвижимости в Грузии.",
    about_journey_2023_title: "2023 — Выход на глобальный уровень",
    about_journey_2023_body:
      "Клиенты из более чем 25 стран и расширенное партнёрство с девелоперами и госструктурами.",
    about_journey_2024_title: "2024 — Запуск Batumi Island Estates",
    about_journey_2024_body:
      "Эксклюзивное подразделение, сфокусированное на знаковом мегапроекте Batumi Islands — первых роскошных искусственных островах Грузии.",
    about_journey_2025_title: "2025 — Более 100 обслуженных глобальных инвесторов",
    about_journey_2025_body:
      "Год динамичного роста, высоких оценок сервиса и расширяющихся инвестиционных портфелей.",

    about_why_title: "Почему инвесторы выбирают нас",
    about_why_card1_title: "Экспертиза в люксовом сегменте",
    about_why_card1_body:
      "Специализация на прибрежных и островных объектах в самых быстрорастущих зонах недвижимости Грузии.",
    about_why_card2_title: "Полное сопровождение сделки",
    about_why_card2_body:
      "Юридическая поддержка, документы, просмотры объектов и сервис после покупки для максимально комфортного процесса.",
    about_why_card3_title: "Доверие со всего мира",
    about_why_card3_body:
      "Инвесторы более чем из 30 стран полагаются на нашу прозрачную экспертизу и тщательно отобранные объекты.",

    about_testimonials_title: "Что говорят наши международные инвесторы",
    about_testimonial1_text:
      "“Идеальный инвестиционный опыт. Команда сопровождала меня от первого звонка до финальных документов. По-настоящему сервис мирового уровня!”",
    about_testimonial1_role: "— Даниель М., Великобритания • Tech Executive",
    about_testimonial2_text:
      "“Я приобрела роскошную студию на острове. Исключительная прозрачность и профессиональная поддержка.”",
    about_testimonial2_role: "— Сара K., ОАЭ • Владелица бизнеса",
    about_testimonial3_text:
      "“Очень рекомендую иностранным покупателям. Плавный процесс и ценные инсайты.”",
    about_testimonial3_role: "— Лука R., Италия • Инвестор в гостиничный бизнес",
    about_testimonial4_text:
      "“Профессионально, честно и очень заботливо. Лучшая агенция в Грузии!”",
    about_testimonial4_role: "— Айша M., Катар • Портфель недвижимости",
    about_testimonial5_text:
      "“Процесс покупки прошёл без лишних хлопот. Ребята всё организовали — даже дистанционное подписание!”",
    about_testimonial5_role: "— Карлос D., Бразилия • Финансовый консультант",
    about_testimonial6_text:
      "“Их знание люксового рынка Батуми просто непревзойдённо.”",
    about_testimonial6_role: "— Элен S., Франция • Предприниматель",
    about_testimonial7_text:
      "“Идеальный выбор для иностранцев, которые инвестируют впервые. Команда, которой действительно можно доверять.”",
    about_testimonial7_role: "— Амир H., Саудовская Аравия • Нефть и энергетика",

    brand_title: "Batumi Island Estates",
    brand_tagline: "Роскошные островные резиденции",

    footer_brand_desc:
      "Премиальные студии, апартаменты с 1 и 2 спальнями на самом престижном островном направлении Грузии, где курортный образ жизни сочетается с высоким инвестиционным потенциалом.",

    footer_nav_title: "Навигация",
    footer_nav_home: "Главная",
    footer_nav_why_batumi: "Почему Батуми",
    footer_nav_properties: "Объекты",
    footer_nav_enquiry: "Форма заявки",

    footer_contact_title: "Контакты",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1: "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "Батуми, Грузия",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    footer_bottom_rights:
      "© 2025 Batumi Island Estates. Все права защищены.",
    footer_bottom_privacy: "Политика конфиденциальности",
    footer_bottom_terms: "Условия",

  },

  // ---------------- TURKISH ----------------
  tr: {
    nav_home: "Ana Sayfa",
    nav_why_batumi: "Neden Batum?",
    nav_properties: "Mülkler",
    nav_project_details: "Proje Detayları",
    nav_life_georgia: "Gürcistan’da Yaşam",
    nav_about_us: "Hakkımızda",
    nav_enquire: "Bilgi Talebi",
    nav_call: "Ara: +995 574 100 645",

    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "Karadeniz’in kalbinde adalı lüks yaşama açılan kapınız",
    hero_cta_explore: "Mülkleri Keşfet",
    hero_cta_quick_enquiry: "Hızlı Talep",

    quick_title: "Hızlı Bilgi Talebi",
    quick_label_name: "İsim *",
    quick_label_phone: "Telefon",
    quick_cc_help:
      "Ülke adını veya telefon kodunu yazın (örneğin: Georgia, +995, India, +91).",
    quick_label_email: "E-posta",
    quick_label_apartment_type: "Daire Tipi",
    quick_select_type: "Tip seçin",
    quick_opt_studio: "Lüks Stüdyo",
    quick_opt_1bhk: "1+1 Daire",
    quick_opt_2bhk: "2+1 Daire",
    quick_opt_other: "Diğer",
    quick_label_message: "Mesaj",
    quick_btn_submit: "Talebi Gönder",

    invest_intro_after_brand: " Karadeniz’deki az sayıdaki master planlı ada projelerinden biridir ve yatırımcılara, dünya çapında tanınmış destinasyonlardan ilham alan ayrıcalıklı bir yatırım ortamı sunar; örneğin ",
    invest_intro_and: " ve ",
    invest_intro_ending: ", uzun vadede olağanüstü değer ve gerçek kıyı kıtlığı sağlar.",

    section_invest_title: "Neden Batumi Island Estates’e Yatırım Yapmalısınız?",

    invest_card1_title: "Yüksek Getiri (ROI)",
    invest_card1_body:
      "Batum’daki hızla büyüyen turizm, eğlence ve oyun sektörü, özellikle deniz manzaralı ve resort entegrasyonlu ada mülkleri için güçlü kira getirileri sağlar.",

    invest_card2_title: "Oturum ve Vize Avantajları",
    invest_card2_body:
      "Gürcistan’da yapılan stratejik yatırımlar, uzun süreli konaklama olanaklarını, kolay mülkiyet yapısını ve Avrupa ile Orta Doğu arasında avantajlı bir konumu destekler.",

    invest_card3_title: "Eşsiz Ada Lokasyonu",
    invest_card3_body:
      "Karadeniz’e doğrudan erişim, sahil yürüyüş yolları, beach club’lar ve marina yaşamı; hem yaşam kalitesini hem de fiyat seviyesini üst segmente taşır.",

    invest_wc_title: "Karadeniz Kıyısında Dünya Çapında Bir Yatırım Fırsatı",

    invest_card4_title: "Bölgenin İlk Mega Ada Projesi",
    invest_card4_body:
      "Karadeniz havzasındaki sayılı dünya standartlarında ada projelerinden biri — Avrupa ve Asya arasında yeni bir simgesel destinasyon oluşturmaktadır.",

    invest_card5_title: "Son Derece Sınırlı Arz",
    invest_card5_body:
      "Şehir içi dairelerden farklı olarak ada arsası sınırlıdır — bu da yüksek ayrıcalık, güçlü talep ve yeniden satış potansiyeli yaratır.",

    invest_card6_title: "Dubai Esintili Lüks Masterplan",
    invest_card6_body:
      "Dubai’nin ikonik ada projeleri ile benzer mimari felsefe ile tasarlandı — özel plajlar, marinalar, lüks oteller ve üst segment ticari alanlar.",

    invest_card7_title: "Lüks 5 Yıldızlı Resort Ekosistemi",
    invest_card7_body:
      "Markalı oteller, fine dining restoranlar, beach club’lar, wellness merkezleri ve eğlence alanları her rezidansın değerini artırır.",

    invest_card8_title: "Özel Marina ve Yat Erişimi",
    invest_card8_body:
      "Dünya standartlarında bir marinaya doğrudan erişim, turizm çekiciliğini ve kira gelirini önemli ölçüde yükseltir.",

    invest_card9_title: "Güçlü Sermaye Değer Artışı",
    invest_card9_body:
      "Ada; turizm, eğlence ve lüks yaşam için uluslararası bir destinasyona dönüşürken, erken dönem yatırımcılar en yüksek kazancı elde eder.",

    invest_card10_title: "Sert Para Biriminde Kira Geliri",
    invest_card10_body:
      "Özellikle Avrupa ve Orta Doğu’dan gelen turistlerle, güçlü günlük kira bedelleri üzerinden döviz cinsinden gelir elde edersiniz.",

    invest_card11_title: "Artan Stratejik Önem",
    invest_card11_body:
      "Gürcistan, iş, turizm ve eğlence için Karadeniz’in önemli bir merkezi haline geliyor — bu da uzun vadede gayrimenkul değerini destekliyor.",

    invest_card12_title: "Yıllık Emlak Vergisi Yok",
    invest_card12_body:
      "Gürcistan, yatırımcı dostu yapısıyla öne çıkar — bireysel mülkiyete ait konutlarda yıllık emlak vergisi bulunmamaktadır.",

    transformation_title: "Batum’un Lüks Dönüşümü",
    transformation_body:
      "Batum, mevsimlik bir sahil kasabasından, yıl boyu yaşayan lüks ve eğlence merkezine dönüşüyor. Yeni beş yıldızlı oteller, casinolar, markalı rezidanslar ve uluslararası yaşam tarzı konseptleri, sahil hattını dönüştürüyor ve tıpkı Dubai’nin ilk gelişim fazlarında olduğu gibi giderek daha fazla küresel yatırımcıyı çekiyor.",

    property_types_title: "Mülk Tiplerimiz",

    property_studio_title: "Lüks Stüdyo Daireler",
    property_1bhk_title: "Premium 1+1 Daireler",
    property_2bhk_title: "Premium 2+1 Daireler",

    property_studio_feat_seaview: "Deniz Manzarası",
    property_studio_feat_smarthome: "Akıllı Ev Sistemi",

    property_1bhk_feat_panoramic: "Panoramik Manzara",
    property_1bhk_feat_luxurybath: "Lüks Banyo",
    property_1bhk_feat_smarthome: "Akıllı Ev Sistemi",

    property_2bhk_feat_mastersuite: "Ebeveyn Süiti",
    property_2bhk_feat_gourmetkitchen: "Gurme Mutfak",
    property_2bhk_feat_walkin: "Giyinme Odası",

    property_card_description:
      "Batumi’nin ikonik ada projesinde zarif şekilde tasarlanmış rezidansları keşfedin.",
    property_card_button: "Detay Talep Et",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "Gürcistan’da Yaşam",
    life_hero_body:
      "Avrupa tarzı şehir yaşamı, Karadeniz kıyısında sahil hayatı, sıcak misafirperverlik ve hızla modernleşen günlük yaşam — Gürcistan, kültürün, özgürlüğün ve fırsatların bir araya geldiği benzersiz bir ortam sunar.",
    life_hero_btn_lifestyle: "Gürcü Yaşam Tarzını Keşfet",
    life_hero_btn_alignment: "Gürcistan ve Avrupa: Nasıl Uyuşuyor?",

    // Lifestyle intro
    life_lifestyle_title: "Gürcistan: Doğal Güzellik ve Modern Yaşamın Buluştuğu Yer",
    life_lifestyle_body:
      "Gürcistan, Avrupa’daki en özel yaşam deneyimlerinden birini sunar — dokunulmamış doğa, zengin kültürel miras ve hızla gelişen modern ekonomi. Sakin Karadeniz kıyılarından Tiflis’in modern siluetine kadar ülke; güzelliği, fırsatı ve erişilebilirliği bir araya getirir.",

    // Lifestyle cards
    life_card1_title: "Büyüleyici Doğal Güzellik",
    life_card1_body:
      "Karlarla kaplı dağlar, kadim ormanlar, berrak göller ve dramatik kıyı şeridi, Gürcistan’ı yıl boyu eşsiz bir destinasyon haline getirir.",

    life_card2_title: "Avrupa-Tarzı Modern Yaşam",
    life_card2_body:
      "Trend kafeler, uluslararası okullar, modern iş merkezleri, yüksek hızlı internet ve canlı gece hayatı; Tiflis ve Batum’u modern yaşam için ideal kılar.",

    life_card3_title: "Gelişen Teknoloji ve İnovasyon Merkezi",
    life_card3_body:
      "Gürcistan; düşük vergiler, kolay regülasyonlar ve yenilikçi devlet politikalarıyla, start-up’lar ve teknoloji yatırımları için cazip bir merkez haline geliyor.",

    life_card4_title: "Stratejik Konum",
    life_card4_body:
      "Avrupa ile Asya arasında yer alan Gürcistan, ticaret, seyahat ve iş için doğal bir köprü görevi görür.",

    life_card5_title: "Sıcak ve Misafirperver Kültür",
    life_card5_body:
      "Gürcü misafirperverliği, dost canlısı toplum yapısı ve güvenli ortam; ülkeyi expat’ler ve yatırımcılar için son derece konforlu bir tercih yapar.",

    life_card6_title: "Yüksek Büyüme Potansiyeli",
    life_card6_body:
      "Artan turizm, yükselen yabancı yatırım ve büyük kıyı projeleri ile Gürcistan, Avrupa’nın en umut vadeden pazarlarından biridir.",

    // Culture section
    life_culture_title: "Gürcistan’ın Zengin Kültürünü ve Mirasını Deneyimleyin",
    life_culture_body:
      "Gürcistan’ın ruhu; yüzyıllar boyunca oluşan gelenekler, büyüleyici folklor, sanat ve misafirperverlikle şekillenmiştir. Kadim şarap ritüellerinden çok sesli müziğe, eski ve yeni mimarinin buluşmasına kadar her an, yaşanmaya değer bir hikâye anlatır.",

    life_culture_slide1_title: "Geleneksel Gürcü Dansı",
    life_culture_slide1_body:
      "Cesaretin, zarafetin ve yüzyıllık kültürel gururun sanatsal ifadesi.",

    life_culture_slide2_title: "Kadim Şarap Kültürü",
    life_culture_slide2_body:
      "Dünyanın en eski şarap geleneğinin evi — 8.000 yılı aşkın ustalık ve misafirperverlik.",

    life_culture_slide3_title: "Tiflis’in Mimari Cazibesi",
    life_culture_slide3_body:
      "Tarihi sokaklar, modern dokunuşlar ve dinamik şehir hayatının uyumlu birleşimi.",

    life_culture_slide4_title: "Batum’un Sahil Işıltısı",
    life_culture_slide4_body:
      "Kültür, mimari ve yaşam tarzının iç içe geçtiği modern bir sahil destinasyonu.",

    // Alignment section
    life_align_title: "Gürcistan Modern Avrupa Yaşamı ile Nasıl Uyuşuyor?",
    life_align_body:
      "Gürcistan, Avrupa’ya yönelik ekonomik, turistik ve lifestyle akımlarıyla giderek daha fazla entegre olurken, kendi kültürel kimliğini ve mali avantajlarını korumaktadır. Hem yatırımcılar hem sakinler için ülke, Doğu ile Batı arasında bir köprü rolü üstlenir.",

    life_align_card1_title: "Avrupa Yaşam Tarzı, Daha Düşük Maliyet",
    life_align_card1_body:
      "Kafe kültürü, yürünebilir mahalleler, uluslararası okullar ve modern alışveriş merkezleri birçok Avrupa başkentini andırır; buna karşın konut, yeme-içme ve hizmetler çoğu zaman daha ekonomiktir.",

    life_align_card2_title: "Artan Ulaşım ve Turizm Akışı",
    life_align_card2_body:
      "Avrupa’nın önemli şehirlerinden gelen direkt ve bağlantılı uçuşlar, artan turist sayısı ve büyüyen dijital göçmen topluluğu Gürcistan’ı Avrupa trafiğine bağlar.",

    life_align_card3_title: "Yatırımcı Dostu, Uzun Vadeli Bakış",
    life_align_card3_body:
      "Net mülkiyet hakları, kolay satın alma süreçleri ve turizm–altyapı odaklı strateji, Gürcistan’ı yükselen Avrupa yatırım destinasyonlarıyla aynı ligde konumlandırır.",

    life_align_card4_title: "Köklü Kültür, Modern Hedefler",
    life_align_card4_body:
      "Tarihi mimari, müzik ve mutfak kültürü; modern oteller, co-working alanları ve çağdaş sanat ile birlikte var olur.",

    // CTA
    life_cta_title: "Gürcistan’daki yaşam yatırımınızla nasıl örtüşüyor, keşfedin",
    life_cta_body:
      "Gürcistan’da yaşamanın duygusal çekiciliğini, Karadeniz’in en seçkin ada projelerinden biri olan Batumi Island Estates’e yapacağınız yatırımın finansal gücüyle birleştirin.",
    life_cta_btn: "Yatırım Öne Çıkanlarına Geri Dön",

    contact_cta_title: "Ada cennetinize sahip olmaya hazır mısınız?",
    contact_cta_sub:
      "Görüşme planlamak veya detaylı bilgi almak için uzman ekibimizle hemen iletişime geçin.",
    contact_cta_call_btn: "Ara +995 574 100 645",
    contact_cta_email_btn: "Bize E-posta Gönderin",

    contact_title: "Detaylı Yatırım Bilgisi Talep Edin",
    contact_subtitle:
      "Bilgilerinizi paylaşın; ekibimiz size kat planları, getiri oranları, ödeme koşulları ve müsaitlik hakkında bilgi vermek için sizinle iletişime geçsin.",
    contact_label_fullname: "Ad Soyad *",
    contact_label_email: "E-posta",
    contact_ph_email: "ornek@eposta.com",
    contact_label_country_code: "Ülke Kodu *",
    contact_cc_help:
      "Ülke adını veya telefon kodunu yazın (örn: India, +91, Georgia, +995).",
    contact_label_phone: "Telefon Numarası *",
    contact_label_apartment_type: "Daire Tipi",
    contact_select_type: "Seçin",
    contact_label_budget: "Tahmini Bütçe (USD)",
    contact_ph_budget: "örn. 150,000",
    contact_label_message: "Mesaj / Talepler",
    contact_ph_message:
      "Yatırım hedeflerinizi, kalış sürenizi, kira beklentilerinizi vb. kısaca anlatın.",

    enquiry_btn_submit: "Talebi Gönder",
    enquiry_btn_sending: "Gönderiliyor...",
    enquiry_validation: "Lütfen adınızı ve telefon numaranızı belirtin.",
    enquiry_status_dryrun:
      "Teşekkürler. Talebiniz alındı (test modu). E-posta gönderimi henüz tamamen yapılandırılmadı.",
    enquiry_status_success:
      "Teşekkürler. Talebiniz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    enquiry_status_error:
      "Talep gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya WhatsApp / Telefon kullanın.",

    testimonials_title: "Yatırımcılarımız Ne Diyor?",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "Yatırımcı, Londra, Birleşik Krallık",
    testimonial1_text:
      "“Batumi Island Estates benim için tüm kriterleri karşıladı – deniz manzarası, güçlü kira getirileri ve şeffaf bir süreç. Ekip, her adımda bana adeta özel bir concierge gibi eşlik etti.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI Yatırımcısı, Dubai",
    testimonial2_text:
      "“Alışılmış pazarların dışında, güvenli ama yüksek büyüme potansiyeli olan bir fırsat arıyordum. Ada yaşam tarzı ile Gürcistan’ın yatırımcı dostu mevzuatının birleşimi bu kararı benim için çok kolaylaştırdı.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "Yazlık Konut Alıcısı, Atina",
    testimonial3_text:
      "“Bitiş kalitesi, olanaklar ve manzara; en iyi Akdeniz tatil köyleriyle aynı seviyede. Daireyi yılda sadece birkaç hafta kullanıyorum, kalan zamanda ise kiralama ekibi her şeyi sorunsuz şekilde yönetiyor.”",


    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "Köprüler, kanallar, entegre resortlar ve Karadeniz adalarında yaşam ile sahil lüksünün geleceğini deneyimleyin.",

    project_progress_title: "Canlı İnşaat İlerlemesi",
    project_progress_body:
      "Yukarıdaki video; adalar genelinde altyapı, köprüler, peyzaj düzenlemeleri ve premium konut alanlarında devam eden çalışmaları gerçek zamanlı olarak gösteriyor. Her bir faz tamamlandıkça, Batumi Island Estates Karadeniz’in kalbindeki tam entegre lüks sahil yaşam konseptine bir adım daha yaklaşıyor.",

    project_islandvision_title: "Tamamlandıktan Sonra Ada Vizyonu",
    project_islandvision_body:
      "Batumi Island Estates’in; promenadlar, peyzajlı teraslar, resort havuzları, kafeler, alışveriş bulvarları ve sakin Karadeniz üzerinde yansıyan ışıklı silüetiyle tam entegre lüks sahil yaşamına nasıl dönüşeceğini keşfedin.",

    project_slide1_tag: "Sahil Promenadı",
    project_slide1_title: "Deniz Manzaralı Kuleler & Marina Yaşamı",
    project_slide1_body:
      "Deniz manzaralı panoramik kuleler ve sakinler için özel marinaya doğrudan erişim.",

    project_slide2_tag: "Resort İmkanları",
    project_slide2_title: "Sonsuzluk Havuzları & Peyzajlı Teraslar",
    project_slide2_body:
      "Yükseltilmiş teraslar, lounge kabinaları ve dinlenmeye uygun yemyeşil yürüyüş yolları.",

    project_slide3_tag: "Gece Silüeti",
    project_slide3_title: "Işıklı Sahil Yaşamı",
    project_slide3_body:
      "Gece gökyüzü altında parıldayan ada, Gürcistan’ın yeni simgesel noktası haline geliyor.",

    project_slide4_tag: "Bulvar Yaşamı",
    project_slide4_title: "Kafeler • Mağazalar • Ada Promenadı",
    project_slide4_body:
      "Butik mağazalar ve deniz kenarı kafelerle çevrili prestijli yaşam bulvarı.",

    brochure_title: "Resmi Proje Broşürünü İndirin",
    brochure_subtitle:
      "Broşürü anında almak için e-posta adresinizi girin.",
    brochure_ph_email: "E-posta adresinizi girin",
    brochure_btn: "Broşürü İndir",

    brochure_msg_empty: "Lütfen e-posta adresinizi girin.",
    brochure_msg_sending: "Gönderiliyor...",
    brochure_msg_success: "Broşür gönderildi! Lütfen gelen kutunuzu kontrol edin.",
    brochure_msg_error: "Broşür gönderilirken hata oluştu. Lütfen tekrar deneyin.",
    brochure_msg_network: "Ağ hatası. Lütfen tekrar deneyin.",

    gmeet_title: "Google Meet Görüşmesi Planlayın",
    gmeet_body:
      "Proje detaylarını, yatırım yapılarını ve Batumi Island Estates’teki kişisel satın alma yolculuğunuzu birlikte gözden geçirmek için kıdemli danışman ekibimizle kişiselleştirilmiş bir görüşme planlayın.",
    gmeet_btn: "Google Meet Planla",

    // ABOUT PAGE (TURKISH)
    about_hero_title: "Batumi Island Estates Hakkında",
    about_hero_subtitle:
      "Batumi Estates’in, Batumi Adaları’ndaki premium ada ve sahil projelerine odaklanan, özel lüks markasıdır.",

    about_intro_title: "Olağanüstü yaşamın başladığı yer",
    about_intro_p1:
      "Batumi Estates, 2022 yılında kurulmuş olup, Gürcistan’ın gayrimenkul pazarını; şeffaf danışmanlık, güvenilir analiz ve lükse odaklı portföyler ile dönüştürmeyi hedefledi. Bugün marka; Avrupa, Asya, Orta Doğu ve Amerika’dan gelen yatırımcılara hizmet vererek, yüksek büyüme potansiyeline sahip Gürcistan projelerinde güvenilir bir yatırım ortağı konumuna geldi.",
    about_intro_p2:
      "2024 yılında mirasımızı Batumi Island Estates’i hayata geçirerek genişlettik — tamamen Gürcistan’ın ilk lüks yapay ada mega projesine odaklanan ayrı bir bölüm. Önde gelen geliştiricilerin ve ulusal altyapı girişimlerinin desteğiyle bu proje, Karadeniz bölgesinde sahil lüksünün yeni standartlarını belirliyor.",
    about_intro_p3:
      "100’den fazla uluslararası yatırımcıyla çalışmış olmamız ve giderek büyüyen ilgi sayesinde, Batumi Estates; şeffaflık, mükemmel hizmet ve sorunsuz satın alma süreci ile tanınan bir marka haline geldi.",

    about_journey_title: "Yolculuğumuz",
    about_journey_2022_title: "2022 — Batumi Estates’in Kuruluşu",
    about_journey_2022_body:
      "Gürcistan’da şeffaf, premium ve pratik bir gayrimenkul satın alma deneyimi sunma hedefiyle kuruldu.",
    about_journey_2023_title: "2023 — Küresel Büyüme",
    about_journey_2023_body:
      "25’ten fazla ülkeden yatırımcıya ulaşıldı ve geliştiriciler ile resmi kurumlarla iş ortaklıkları genişletildi.",
    about_journey_2024_title: "2024 — Batumi Island Estates Lansmanı",
    about_journey_2024_body:
      "Gürcistan’ın ilk lüks yapay ada mega projesi olan Batumi Islands’a odaklanan özel bir bölüm hayata geçirildi.",
    about_journey_2025_title: "2025 — 100+ Küresel Yatırımcıya Hizmet",
    about_journey_2025_body:
      "Hızlı büyüme, yüksek memnuniyet skorları ve büyüyen yatırım portföyleriyle öne çıkan bir yıl.",

    about_why_title: "Yatırımcılar Neden Bizi Tercih Ediyor?",
    about_why_card1_title: "Lükse Odaklı Uzmanlık",
    about_why_card1_body:
      "Gürcistan’ın en hızlı gelişen bölgelerindeki sahil ve ada projelerine odaklanan özel uzmanlık.",
    about_why_card2_title: "Uçtan Uca Destek",
    about_why_card2_body:
      "Hukuki destek, belgeler, yerinde gösterimler ve satış sonrası hizmetler ile eksiksiz satın alma deneyimi.",
    about_why_card3_title: "Küresel Güven",
    about_why_card3_body:
      "30’dan fazla ülkeden yatırımcılar, şeffaf danışmanlığımız ve özenle seçilmiş portföyümüz sayesinde bizi tercih ediyor.",

    about_testimonials_title: "Küresel Yatırımcılarımız Ne Diyor?",
    about_testimonial1_text:
      "“Gerçek anlamda sorunsuz bir yatırım deneyimi. Ekip, ilk telefon görüşmesinden son imzaya kadar benimleydi. Tam anlamıyla dünya standartlarında hizmet!”",
    about_testimonial1_role: "— Daniel M., Birleşik Krallık • Tech Executive",
    about_testimonial2_text:
      "“Adaya lüks bir stüdyo satın aldım. Olağanüstü şeffaflık ve profesyonel destek.”",
    about_testimonial2_role: "— Sara K., BAE • İşletme Sahibi",
    about_testimonial3_text:
      "“Uluslararası alıcılar için kesinlikle tavsiye ediyorum. Süreç çok akıcı ve paylaştıkları öngörüler çok değerli.”",
    about_testimonial3_role:
      "— Luca R., İtalya • Otelcilik Sektörü Yatırımcısı",
    about_testimonial4_text:
      "“Profesyonel, dürüst ve son derece yardımcılar. Gürcistan’daki en iyi ajans!”",
    about_testimonial4_role:
      "— Aisha M., Katar • Gayrimenkul Portföy Yöneticisi",
    about_testimonial5_text:
      "“Satın alma süreci son derece zahmetsiz geçti. Her şeyi onlar organize etti — uzaktan imza dahil!”",
    about_testimonial5_role:
      "— Carlos D., Brezilya • Finans Danışmanı",
    about_testimonial6_text:
      "“Batumi’nin lüks konut pazarına dair bilgileri gerçekten eşsiz.”",
    about_testimonial6_role:
      "— Helene S., Fransa • Girişimci",
    about_testimonial7_text:
      "“İlk defa yatırım yapan yabancılar için harika bir ekip. Gerçekten güvenilirler.”",
    about_testimonial7_role:
      "— Amir H., Suudi Arabistan • Petrol & Enerji Sektörü",

    brand_title: "Batumi Island Estates",
    brand_tagline: "Lüks Ada Rezidansları",

    footer_brand_desc:
      "Gürcistan’ın en prestijli ada destinasyonunda premium stüdyo, 1+1 ve 2+1 rezidanslar; resort yaşamı güçlü yatırım potansiyeliyle birleştirir.",

    footer_nav_title: "Gezin",
    footer_nav_home: "Ana Sayfa",
    footer_nav_why_batumi: "Neden Batum?",
    footer_nav_properties: "Mülkler",
    footer_nav_enquiry: "Talep Formu",

    footer_contact_title: "İletişim",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1: "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "Batum, Gürcistan",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    footer_bottom_rights:
      "© 2025 Batumi Island Estates. Tüm hakları saklıdır.",
    footer_bottom_privacy: "Gizlilik Politikası",
    footer_bottom_terms: "Şartlar",


  },

  // ---------------- KAZAKH ----------------
  kk: {
    nav_home: "Басты бет",
    nav_why_batumi: "Неге Батуми?",
    nav_properties: "Жылжымайтын мүлік",
    nav_project_details: "Жоба туралы мәлімет",
    nav_life_georgia: "Грузиядағы өмір",
    nav_about_us: "Біз туралы",
    nav_enquire: "Сұрау қалдыру",
    nav_call: "Қоңырау: +995 574 100 645",

    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "Қара теңіздің жүрегіндегі аралдық сәнді өмірге апарар қақпаңыз",
    hero_cta_explore: "Мүліктерді қарау",
    hero_cta_quick_enquiry: "Жылдам сұрау",

    quick_title: "Жылдам сұрау",
    quick_label_name: "Аты-жөні *",
    quick_label_phone: "Телефон",
    quick_cc_help:
      "Ел атауын немесе телефон кодын жазыңыз (мысалы: Georgia, +995, India, +91).",
    quick_label_email: "E-mail",
    quick_label_apartment_type: "Пәтер түрі",
    quick_select_type: "Түрін таңдаңыз",
    quick_opt_studio: "Люкс студия",
    quick_opt_1bhk: "1 бөлмелі пәтер",
    quick_opt_2bhk: "2 бөлмелі пәтер",
    quick_opt_other: "Басқа",
    quick_label_message: "Хабарлама",
    quick_btn_submit: "Сұрауды жіберу",

    invest_intro_after_brand: " Қара теңіздегі санаулы мастер-планды аралдық жобалардың бірі болып табылады және әлемге әйгілі бағыттардан шабыт алған, эксклюзивті инвестициялық мүмкіндіктер ұсынады, мысалы ",
    invest_intro_and: " және ",
    invest_intro_ending: ", бұл ерекше ұзақ мерзімді құндылық пен шынайы жағалаулық дефицит қалыптастырады.",

    section_invest_title: "Неліктен Batumi Island Estates-ке инвестиция салу керек?",

    invest_card1_title: "Жоғары кірістілік (ROI)",
    invest_card1_body:
      "Батумидегі туризм, ойын-сауық және ойын бизнесі қарқынды дамуда, бұл әсіресе теңіз жағасындағы және курортпен интеграцияланған аралдағы нысандар үшін жоғары жалдау табысын қамтамасыз етеді.",

    invest_card2_title: "Отыру және виза мүмкіндіктері",
    invest_card2_body:
      "Грузияға жасалған стратегиялық инвестициялар ұзақ мерзімді тұруға, ыңғайлы меншік құрылымына және Еуропа мен Таяу Шығыс арасындағы тиімді орналасуға мүмкіндік береді.",

    invest_card3_title: "Сирек аралдық локация",
    invest_card3_body:
      "Қара теңізге тікелей шығу, жағалау серуендеу жолдары, beach-клубтар мен марина — өмір сүру сапасын арттырып, премиум баға сегментін қалыптастырады.",

    invest_wc_title: "Қара теңіз жағалауындағы әлемдік деңгейдегі инвестициялық мүмкіндік",

    invest_card4_title: "Аймақтағы алғашқы мегажоба",
    invest_card4_body:
      "Қара теңіз акваториясындағы санаулы әлемдік деңгейдегі аралдық жобалардың бірі — Еуропа мен Азия арасында жаңа символдық бағыт қалыптастырады.",

    invest_card5_title: "Өте шектеулі ұсыныс",
    invest_card5_body:
      "Қалалық пәтерлерге қарағанда арал аумағы шектеулі — бұл эксклюзивтілік, жоғары сұраныс және қайта сату әлеуетін күшейтеді.",

    invest_card6_title: "Дубай стиліндегі люкс мастер-план",
    invest_card6_body:
      "Дубайдың әйгілі аралдық жобаларының архитектуралық философиясымен жасалған — жеке жағажайлар, марина, люкс қонақ үйлер мен премиум коммерциялық аймақтар.",

    invest_card7_title: "5 жұлдызды курорт экожүйесі",
    invest_card7_body:
      "Брендтелген қонақ үйлер, мейрамханалар, beach-клубтар, wellness-орталықтар мен ойын-сауық аймақтары әрбір резиденцияның құнын арттырады.",

    invest_card8_title: "Жеке марина және яхтаға қолжетімділік",
    invest_card8_body:
      "Дүниежүзілік деңгейдегі маринаға тікелей қол жеткізу туристер үшін тартымдылықты күшейтіп, жалдау табысын ұлғайтады.",

    invest_card9_title: "Капитал құнының күшті өсуі",
    invest_card9_body:
      "Арал туризм, ойын-сауық және люкс өмір үшін халықаралық бағытқа айналған сайын, ерте кезеңде кірген инвесторлар ең көп пайда көреді.",

    invest_card10_title: "Қатты валютадағы жалдау табысы",
    invest_card10_body:
      "Әсіресе Еуропа мен Таяу Шығыстан келген туристер есебінен жоғары тәуліктік тарифтер арқылы шетел валютасында табыс аласыз.",

    invest_card11_title: "Грузияның өсіп келе жатқан стратегиялық рөлі",
    invest_card11_body:
      "Грузия бизнес, туризм және ойын-сауық үшін Қара теңіздегі маңызды хабқа айналуда — бұл ұзақ мерзімді перспективада жылжымайтын мүлік құнын қолдайды.",

    invest_card12_title: "Жылдық мүлік салығы жоқ",
    invest_card12_body:
      "Грузия инвесторларға қолайлы шарттар ұсынады — жеке меншік тұрғын үйлер үшін жыл сайынғы мүлік салығы алынбайды.",

    transformation_title: "Батумидің люкс орталыққа айналуы",
    transformation_body:
      "Батуми маусымдық жағажай қаласынан жыл бойы жұмыс істейтін люкс және ойын-сауық орталығына айналуда. Жаңа бес жұлдызды қонақ үйлер, казинолар, брендтелген резиденциялар және халықаралық lifestyle-концепциялар жағалауды түбегейлі өзгертуде және Дубайдың дамуындағы алғашқы кезеңдерге ұқсас түрде барған сайын көбірек жаһандық инвесторларды тартуда.",

    property_types_title: "Біздің мүлік түрлері",

    property_studio_title: "Люкс студия пәтерлер",
    property_1bhk_title: "Премиум 1 бөлмелі пәтерлер",
    property_2bhk_title: "Премиум 2 бөлмелі пәтерлер",

    property_studio_feat_seaview: "Теңізге көрініс",
    property_studio_feat_smarthome: "«Ақылды үй» жүйесі",

    property_1bhk_feat_panoramic: "Панорамалық көрініс",
    property_1bhk_feat_luxurybath: "Люкс санузел",
    property_1bhk_feat_smarthome: "«Ақылды үй» жүйесі",

    property_2bhk_feat_mastersuite: "Негізгі жатын бөлме (master suite)",
    property_2bhk_feat_gourmetkitchen: "Гурман асүйі",
    property_2bhk_feat_walkin: "Гардероб бөлмесі",

    property_card_description:
      "Батумидің танымал аралдық жобасындағы әсем жобаланған резиденцияларды ашыңыз.",
    property_card_button: "Толық ақпарат сұрау",

    contact_cta_title: "Аралдағы жұмағыңызға ие болуға дайынсыз ба?",
    contact_cta_sub:
      "Көрсетілім ұйымдастыру немесе толығырақ ақпарат алу үшін біздің сарапшылармен бүгіннің өзінде байланысыңыз.",
    contact_cta_call_btn: "Қоңырау шалу +995 574 100 645",
    contact_cta_email_btn: "Бізге E-mail жазу",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "Грузиядағы өмір",
    life_hero_body:
      "Еуропалық сәнділік, Қара теңіз жағалауындағы өмір салты, жайдарлы қонақжайлылық және жылдам жаңарып жатқан заманауи өмір — Грузия мәдениет, еркіндік және мүмкіндіктер тоғысқан ерекше орта ұсынады.",
    life_hero_btn_lifestyle: "Грузин өмір салтын ашыңыз",
    life_hero_btn_alignment: "Грузия мен Еуропа қалай үндеседі?",

    // Lifestyle intro
    life_lifestyle_title: "Грузия: табиғат сұлулығы мен заманауи өмір тоғысқан ел",
    life_lifestyle_body:
      "Грузия Еуропадағы ең ерекше өмір тәжірибелерінің бірін ұсынады — табиғи ландшафт, мәдени мұра және тез дамып келе жатқан экономика үйлесім табады. Қара теңіздің тыныш жағалауынан Тбилисидің заманауи панорамасына дейін ел сұлулықты, мүмкіндіктерді және қолжетімділікті біріктіреді.",

    // Lifestyle cards
    life_card1_title: "Керемет табиғи сұлулық",
    life_card1_body:
      "Қар жамылған таулар, ежелгі ормандар, таза көлдер және айбынды жағалау сызығы Грузияны жыл бойы тартымды бағытқа айналдырады.",

    life_card2_title: "Еуропалық-заманауи өмір салты",
    life_card2_body:
      "Заманауи кафелер, халықаралық мектептер, бизнес орталықтар, жоғары жылдамдықты интернет және белсенді түнгі өмір Тбилиси мен Батуми қалаларын заманауи өмір үшін мінсіз етеді.",

    life_card3_title: "Дамып келе жатқан техно және инновациялық хаб",
    life_card3_body:
      "Грузия төмен салықтар, жеңілдетілген реттеу және инновацияны қолдайтын саясаттың арқасында стартаптар мен технологиялық инвестициялар үшін тартымды орталыққа айналуда.",

    life_card4_title: "Стратегиялық орналасу",
    life_card4_body:
      "Еуропа мен Азияның қиылысында орналасқан Грузия — сауда, саяхат және халықаралық бизнес үшін маңызды көпір.",

    life_card5_title: "Жылы қонақжай мәдениет",
    life_card5_body:
      "Грузин қонақжайлылығы, достық қоғам және қауіпсіздік сезімі елді экспаттар мен инвесторлар үшін өте жайлы бағыт етеді.",

    life_card6_title: "Жоғары өсім әлеуеті",
    life_card6_body:
      "Туризмнің өсуі, шетелдік инвестициялардың артуы және ірі жағалаулық жобалар Грузияны Еуропаның ең перспективалы нарықтарының біріне айналдырады.",

    // Culture section
    life_culture_title: "Грузияның бай мәдениетін және мұрасын сезініңіз",
    life_culture_body:
      "Грузияның жаны ғасырлар бойы қалыптасқан дәстүрлерден, фольклордан, өнерден және қонақжайлықтан тұрады. Ежелгі шарап дәстүрлерінен көпдауысты әнге және ескі мен жаңаның үйлескен архитектурасына дейін — мұндағы әр сәт ерекше оқиғаға айналады.",

    life_culture_slide1_title: "Дәстүрлі грузин биі",
    life_culture_slide1_body:
      "Ерлік, әсемдік және ғасырлық мәдени мақтаныштың көркем көрінісі.",

    life_culture_slide2_title: "Ежелгі шарап мәдениеті",
    life_culture_slide2_body:
      "Әлемдегі ең көне шарап жасау дәстүрінің отаны — 8 000 жылдан астам тарихы бар шеберлік пен қонақжайлылық.",

    life_culture_slide3_title: "Тбилисидің архитектуралық келбеті",
    life_culture_slide3_body:
      "Тарихи көшелер, заманауи шешімдер және сергек қала өмірінің үйлесімі.",

    life_culture_slide4_title: "Батумидің жағалау жарқылы",
    life_culture_slide4_body:
      "Мәдениет, архитектура және өмір салты тоғысқан заманауи теңіз жағалауы.",

    // Alignment section
    life_align_title: "Грузия заманауи еуропалық өмір салтымен қалай үндеседі",
    life_align_body:
      "Грузия Еуропамен экономикалық, туристік және lifestyle-байланыстарды нығайтып келе жатқанымен, өзінің бірегей мәдени болмысын және баға артықшылығын сақтап отыр. Резиденттер мен инвесторлар үшін бұл ел Шығыс пен Батысты жалғайтын көпір рөлін атқарады.",

    life_align_card1_title: "Еуропалық өмір салты, төмен шығындар",
    life_align_card1_body:
      "Кафе мәдениеті, жаяу жүруге ыңғайлы аудандар, халықаралық мектептер және заманауи сауда орталықтары көптеген еуропалық астаналарды еске салады, ал тұрғын үй, тамақ және қызметтер әлі де қолжетімді.",

    life_align_card2_title: "Артып келе жатқан байланыс және туризм ағымы",
    life_align_card2_body:
      "Еуропаның негізгі қалаларынан тікелей және транзиттік рейстер, өсіп келе жатқан туристер ағымы және digital nomad қауымдастығы Грузияны ЕО кеңістігімен байланыстырады.",

    life_align_card3_title: "Инвесторға қолайлы, ұзақ мерзімді көзқарас",
    life_align_card3_body:
      "Айқын меншік құқықтары, сатып алу процесінің қарапайымдылығы және туризм мен инфрақұрылымды дамытуға бағытталған стратегия Грузияны үміт күттіретін еуропалық нарықтар қатарына қосады.",

    life_align_card4_title: "Терең мәдениет және заманауи мақсаттар",
    life_align_card4_body:
      "Тарихи архитектура, музыка және тағам мәдениеті заманауи қонақүйлермен, co-working кеңістіктерімен және заманауи өнермен қатар дамуда.",

    // CTA
    life_cta_title: "Грузиядағы өмір сіздің инвестицияңызбен қалай үйлесетінін біліңіз",
    life_cta_body:
      "Грузияда өмір сүрудің эмоциялық тартымдылығын Batumi Island Estates сияқты Қара теңіздегі бірегей аралдық жобаға салынған инвестицияның қаржылық күшімен біріктіріңіз.",
    life_cta_btn: "Инвестициялық ерекшеліктерге оралу",

    contact_title: "Толық инвестициялық ақпаратты сұраңыз",
    contact_subtitle:
      "Өзіңіз туралы қысқаша ақпарат қалдырыңыз, біздің команда сізге жоспарлар, күтілетін табыс, төлем шарттары және қолжетімді нұсқалар бойынша толығырақ ақпарат беру үшін хабарласады.",
    contact_label_fullname: "Аты-жөні *",
    contact_label_email: "E-mail",
    contact_ph_email: "siz@mysal.com",
    contact_label_country_code: "Ел коды *",
    contact_cc_help:
      "Ел атауын немесе телефон кодын жазыңыз (мысалы: India, +91, Georgia, +995).",
    contact_label_phone: "Телефон нөмірі *",
    contact_label_apartment_type: "Пәтер түрі",
    contact_select_type: "Таңдаңыз",
    contact_label_budget: "Шамамен бюджет (USD)",
    contact_ph_budget: "мысалы, 150,000",
    contact_label_message: "Хабарлама / талаптар",
    contact_ph_message:
      "Инвестициялық мақсаттарыңызды, болу ұзақтығын, жалдау бойынша күтіңізді қысқаша сипаттаңыз.",

    enquiry_btn_submit: "Сұрауды жіберу",
    enquiry_btn_sending: "Жіберілуде...",
    enquiry_validation: "Өтінеміз, атыңызды және телефон нөміріңізді жазыңыз.",
    enquiry_status_dryrun:
      "Рахмет. Сұрауыңыз қабылданды (тест режимі). E-mail арқылы жіберу әлі толық бапталмаған.",
    enquiry_status_success:
      "Рахмет. Сұрауыңыз қабылданды. Біздің команда жақын арада сізбен байланысады.",
    enquiry_status_error:
      "Сұрауды жіберу кезінде қате орын алды. Қайталап көріңіз немесе WhatsApp / қоңырау шалыңыз.",

    testimonials_title: "Инвесторларымыз не дейді?",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "Инвестор, Лондон, Ұлыбритания",
    testimonial1_text:
      "“Batumi Island Estates мен үшін барлық талаптарға сай болды – теңіз көрінісі, жоғары жалдау табысы және ашық, түсінікті процесс. Команда әр қадамда маған жеке консьерж сияқты қолдау көрсетті.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI инвесторы, Дубай",
    testimonial2_text:
      "“Дәстүрлі нарықтардан тыс, қауіпсіз, бірақ өсу әлеуеті жоғары мүмкіндікті іздедім. Аралдағы өмір салты мен Грузияның инвесторларға қолайлы реттеуі бұл шешімді мен үшін өте жеңіл етті.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "Демалыс үйінің сатып алушысы, Афины",
    testimonial3_text:
      "“Бітірілу сапасы, инфрақұрылым және көріністер Жерорта теңізінің ең жақсы курорттарымен бір деңгейде. Өзім пәтерде жылына бірнеше апта ғана боламын, ал қалған уақытта жалға беру командасы бәрін мінсіз басқарады.”",

        project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "Көпірлер, каналдар, интеграцияланған курорттар және Қара теңіз аралдарындағы өмір арқылы жағалаудағы люкс өмірдің болашағын сезініңіз.",

    project_progress_title: "Құрылыстың ағымдағы барысы",
    project_progress_body:
      "Жоғарыдағы видео аралдардағы инфрақұрылым, көпірлер, көгалдандыру және премиум тұрғын аймақтарының құрылыс жұмыстарының нақты уақыттағы барысын көрсетеді. Әрбір жаңа кезең аяқталған сайын Batumi Island Estates Қара теңіздің жүрегіндегі толық интеграцияланған люкс жағалаулық қауымдастыққа бір қадам жақындай түседі.",

    project_islandvision_title: "Жоба аяқталғаннан кейінгі арал көрінісі",
    project_islandvision_body:
      "Batumi Island Estates қалай толық интеграцияланған люкс жағалаулық қауымдастыққа айналатынын зерттеңіз — променадтар, ландшафтты террасалар, курорттық бассейндер, кафе, сауда бульварлары және тынық Қара теңіз суына шағылысатын жарықтандырылған панорама арқылы.",

    project_slide1_tag: "Су жағасындағы променад",
    project_slide1_title: "Теңіз жағасындағы мұнаралар және марина өмірі",
    project_slide1_body:
      "Теңізге панорамалық көрінісі бар мұнаралар және тұрғындар үшін жеке маринаға тікелей қолжетімділік.",

    project_slide2_tag: "Курорттық инфрақұрылым",
    project_slide2_title: "Соңсыз (infinity) бассейндер және ландшафтты террасалар",
    project_slide2_body:
      "Биіктетілген террасалар, lounge-кабиналар және демалысқа арналған жасыл жүргінші жолдары.",

    project_slide3_tag: "Түнгі панорама",
    project_slide3_title: "Жарықтандырылған жағалаулық өмір",
    project_slide3_body:
      "Түнгі аспан астында жарқыраған арал, Грузияның жаңа символдық нүктесіне айналады.",

    project_slide4_tag: "Бульварлық өмір салты",
    project_slide4_title: "Кафелер • Ритейл • Арал променад",
    project_slide4_body:
      "Бутек дүкендері және теңіз жағасындағы кафелері бар премиум өмір бульвары.",

    brochure_title: "Ресми жоба буклетін жүктеп алыңыз",
    brochure_subtitle:
      "Буклетті лезде алу үшін e-mail адресіңізді енгізіңіз.",
    brochure_ph_email: "E-mail адресіңізді енгізіңіз",
    brochure_btn: "Буклетті жүктеп алу",

    brochure_msg_empty: "Өтінеміз, e-mail адресіңізді енгізіңіз.",
    brochure_msg_sending: "Жіберілуде...",
    brochure_msg_success:
      "Буклет жіберілді! Поштанызды тексеріңіз.",
    brochure_msg_error:
      "Буклет жіберу кезінде қате болды. Қайталап көріңіз.",
    brochure_msg_network:
      "Желі қатесі. Қайталап көріңіз.",

    gmeet_title: "Google Meet кездесуін жоспарлау",
    gmeet_body:
      "Жоба туралы толық ақпаратты, инвестициялық құрылымдарды және Batumi Island Estates-тегі жеке сатып алу жолыңызды талқылау үшін біздің аға кеңесші командамен жеке кездесу жоспарлаңыз.",
    gmeet_btn: "Google Meet жоспарлау",

    // ABOUT PAGE (KAZAKH)
    about_hero_title: "Batumi Island Estates туралы",
    about_hero_subtitle:
      "Batumi Estates-тің Батумидегі аралдық және жағалаулық премиум жылжымайтын мүлікке маманданған люкс бағыты.",

    about_intro_title: "Ерекше өмір осында басталады",
    about_intro_p1:
      "Batumi Estates 2022 жылы құрылды. Мақсаты — Грузиядағы жылжымайтын мүлік нарығын жаһандық инвесторлар үшін ашық кеңес, сенімді талдау және люкс-бағытталған портфельдер арқылы жаңа деңгейге шығару. Бүгінде бренд Еуропа, Азия, Таяу Шығыс және Америка елдерінен келген клиенттерге қызмет көрсетіп, Грузияның жоғары өсімді жобаларында сенімді серіктес ретінде танылды.",
    about_intro_p2:
      "2024 жылы біз Batumi Island Estates бағытын іске қосып, мұрамызды кеңейттік — ол Грузиядағы алғашқы люкс жасанды арал мегажобасына толықтай бағытталған. Жетекші девелоперлер мен ұлттық инфрақұрылымдық бастамалардың қолдауымен бұл жоба Қара теңіз аймағында жағалаудағы премиум өмірдің жаңа стандартын қалыптастыруда.",
    about_intro_p3:
      "100-ден астам халықаралық инвестормен жұмыс істеп, жаңа клиенттердің қызығушылығы артып келе жатқан кезде, Batumi Estates ашықтық, жоғары сапалы сервис және сатып алу процесінің ыңғайлылығы арқылы беделін одан әрі нығайтып келеді.",

    about_journey_title: "Біздің жолымыз",
    about_journey_2022_title: "2022 — Batumi Estates-тің құрылуы",
    about_journey_2022_body:
      "Грузияда жылжымайтын мүлікті ашық, премиум және тиімді тәсілмен сатып алуды қамтамасыз ету мақсатымен құрылды.",
    about_journey_2023_title: "2023 — Халықаралық деңгейге шығу",
    about_journey_2023_body:
      "25-тен астам елден келген инвесторлармен жұмыс және девелоперлер мен мемлекеттік құрылымдармен кеңейтілген әріптестік.",
    about_journey_2024_title: "2024 — Batumi Island Estates-тің іске қосылуы",
    about_journey_2024_body:
      "Грузияның алғашқы люкс жасанды арал мегажобасы — Batumi Islands-қа бағытталған эксклюзивті бөлім.",
    about_journey_2025_title: "2025 — 100+ жаһандық инвесторға қызмет көрсету",
    about_journey_2025_body:
      "Жылдам өсім, жоғары қанағаттану бағалары және кеңейіп келе жатқан инвестициялық портфельдермен есте қалған жыл.",

    about_why_title: "Инвесторлар неге бізді таңдайды?",
    about_why_card1_title: "Люкс сегментіндегі сараптама",
    about_why_card1_body:
      "Грузияның ең жылдам дамып келе жатқан аймақтарындағы жағалаулық және аралдық жобаларға мамандану.",
    about_why_card2_title: "Толық сүйемелдеу",
    about_why_card2_body:
      "Заңгерлік қолдау, құжаттар, объектіні көрсету және сатып алғаннан кейінгі сервисті қоса алғанда, ыңғайлы сатып алу процесі.",
    about_why_card3_title: "Әлемдік деңгейдегі сенім",
    about_why_card3_body:
      "30-дан астам елдің инвесторлары біздің ашық кеңесімізге және мұқият таңдалған портфелімізге сенім артады.",

    about_testimonials_title: "Біздің халықаралық инвесторлар не дейді?",
    about_testimonial1_text:
      "“Инвестициялау тәжірибесі өте жеңіл өтті. Команда мені алғашқы қоңыраудан соңғы құжатқа дейін сүйемелдеді. Шын мәнінде, әлемдік деңгейдегі сервис!”",
    about_testimonial1_role:
      "— Даниел M., Ұлыбритания • Tech Executive",
    about_testimonial2_text:
      "“Мен аралдан люкс студия сатып алдым. Ерекше ашықтық пен кәсіби қолдау көрсетілді.”",
    about_testimonial2_role:
      "— Сара K., БАӘ • Бизнес иесі",
    about_testimonial3_text:
      "“Халықаралық сатып алушылар үшін шын жүректен ұсынамын. Процесс өте жайлы және берген инсайттары құнды.”",
    about_testimonial3_role:
      "— Лука R., Италия • Қонақ үй бизнесіне инвестор",
    about_testimonial4_text:
      "“Кәсіби, адал және өте көмекшіл команда. Грузиядағы ең үздік агенттік!”",
    about_testimonial4_role:
      "— Айша M., Катар • Жылжымайтын мүлік портфелі",
    about_testimonial5_text:
      "“Сатып алу процесі барынша жеңіл болды. Олар бәрін өздері ұйымдастырды — қашықтан қол қоюды да!”",
    about_testimonial5_role:
      "— Карлос D., Бразилия • Қаржы кеңесшісі",
    about_testimonial6_text:
      "“Batumi-дің люкс нарығына қатысты білімдері шын мәнінде теңдессіз.”",
    about_testimonial6_role:
      "— Элен S., Франция • Кәсіпкер",
    about_testimonial7_text:
      "“Алғаш рет инвестициялайтын шетелдіктер үшін тамаша команда. Шынымен сенім артуға болады.”",
    about_testimonial7_role:
      "— Амир H., Сауд Арабиясы • Мұнай және энергетика саласы",
    
        brand_title: "Batumi Island Estates",
    brand_tagline: "Сәнді аралдық резиденциялар",

    footer_brand_desc:
      "Грузиядағы ең беделді арал бағытының жанында премиум студиялар, 1 және 2 бөлмелі резиденциялар – курорттық өмір салты мен жоғары инвестициялық әлеует үйлеседі.",

    footer_nav_title: "Навигация",
    footer_nav_home: "Басты бет",
    footer_nav_why_batumi: "Неге Батуми?",
    footer_nav_properties: "Жылжымайтын мүлік",
    footer_nav_enquiry: "Сұрау формасы",

    footer_contact_title: "Байланыс",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1: "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "Батуми, Грузия",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    footer_bottom_rights:
      "© 2025 Batumi Island Estates. Барлық құқықтар қорғалған.",
    footer_bottom_privacy: "Құпиялылық саясаты",
    footer_bottom_terms: "Шарттар",

  },

  // ---------------- GERMAN ----------------

    de: {
    // Navbar
    nav_home: "Startseite",
    nav_why_batumi: "Warum Batumi?",
    nav_properties: "Immobilien",
    nav_project_details: "Projektdetails",
    nav_life_georgia: "Leben in Georgien",
    nav_about_us: "Über uns",
    nav_enquire: "Anfrage",
    nav_call: "Anruf: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle: "Ihr Zugang zu luxuriösem Inselleben im Herzen des Schwarzen Meeres",
    hero_cta_explore: "Immobilien entdecken",
    hero_cta_quick_enquiry: "Schnellanfrage",

    // Quick enquiry modal
    quick_title: "Schnelle Anfrage",
    quick_label_name: "Name *",
    quick_label_phone: "Telefon",
    quick_cc_help: "Geben Sie Ihren Ländernamen oder die Vorwahl ein (z. B. Georgia, +995, Indien, +91).",
    quick_label_email: "E-Mail",
    quick_label_apartment_type: "Apartmenttyp",
    quick_select_type: "Typ auswählen",
    quick_opt_studio: "Luxus-Studio",
    quick_opt_1bhk: "1-Zimmer-Apartment",
    quick_opt_2bhk: "2-Zimmer-Apartment",
    quick_opt_other: "Sonstiges",
    quick_label_message: "Nachricht",
    quick_btn_submit: "Anfrage senden",

    // Invest Intro Brand
    invest_intro_after_brand:
      " ist eine der wenigen Masterplan-Inselentwicklungen im Schwarzen Meer und bietet ein exklusives Investitionsumfeld, inspiriert von weltweit bekannten Destinationen wie ",
    invest_intro_and: " und ",
    invest_intro_ending:
      ", mit außergewöhnlichem langfristigem Wertpotenzial und echter Küstenknappheit.",

    // Investment section
    section_invest_title: "Warum in Batumi Island Estates investieren?",

    invest_card1_title: "Hohe Rendite (ROI)",
    invest_card1_body:
      "Batumis schnell wachsender Tourismus-, Gaming- und Freizeitmarkt unterstützt starke Mieterträge, insbesondere bei meerseitigen, resortintegrierten Inselimmobilien.",

    invest_card2_title: "Goldenes Visum",
    invest_card2_body:
      "Strategische Investitionen in Georgien können Langzeitaufenthalte, vereinfachte Eigentumsstrukturen und einen komfortablen Knotenpunkt zwischen Europa, dem Nahen Osten und Asien unterstützen.",

    invest_card3_title: "Erstklassige Insellage",
    invest_card3_body:
      "Genießen Sie direkten Zugang zum Schwarzen Meer, gestaltete Promenaden, Beachclubs und Marina-Living – eine Kombination aus Lifestyle-Attraktivität und Premium-Preissetzung.",

    invest_wc_title: "Eine Investmentchance der Spitzenklasse am Schwarzen Meer",

    invest_card4_title: "Erstes Megaprojekt dieser Art",
    invest_card4_body:
      "Eine der wenigen wirklich weltklasse Inselentwicklungen im Schwarzen Meer – ein neues Landmark-Ziel, unvergleichbar in Europa oder Asien.",

    invest_card5_title: "Extrem begrenztes Angebot",
    invest_card5_body:
      "Im Gegensatz zu Stadtimmobilien ist Insel-Grundstück endlich – dies schafft Exklusivität, starke Nachfrage und Wiederverkaufspotenzial.",

    invest_card6_title: "Von Dubai inspirierter Luxus-Masterplan",
    invest_card6_body:
      "Entwickelt nach der gleichen architektonischen Philosophie wie Dubais ikonische Inselprojekte – private Strände, Marinas, Luxushotels und High-End-Retail.",

    invest_card7_title: "Luxuriöses 5-Sterne-Resort-Ökosystem",
    invest_card7_body:
      "Branded Hospitality, Fine Dining, Beachclubs, Wellness-Zentren und Entertainment-Zonen steigern den Wert jeder einzelnen Residenz.",

    invest_card8_title: "Private Marina & Yachtzugang",
    invest_card8_body:
      "Direkter Zugang zu einer weltklasse Marina erhöht die touristische Attraktivität und das Premium-Mietpotenzial.",

    invest_card9_title: "Starke zukünftige Wertsteigerung",
    invest_card9_body:
      "Frühphasen-Investoren profitieren am meisten, wenn sich die Insel zu einem internationalen Ziel für Tourismus, Entertainment und Luxuswohnen entwickelt.",

    invest_card10_title: "Mietertrag in Hartwährung",
    invest_card10_body:
      "Verdienen Sie an internationalen Gästen mit starken Tages- und Wochenraten – insbesondere aus Europa und dem Nahen Osten.",

    invest_card11_title: "Wachsende strategische Bedeutung",
    invest_card11_body:
      "Georgien entwickelt sich zu einem wichtigen Schwarzes-Meer-Hub für Business, Freizeit, Gaming und Tourismus – ein Treiber für langfristige Immobilienwerte.",

    invest_card12_title: "Keine jährliche Grundsteuer",
    invest_card12_body:
      "Georgien bietet einzigartige investorenfreundliche Bedingungen mit keiner jährlichen Grundsteuer für Privateigentum.",

    // Transformation strip
    transformation_title: "Batumis Luxustransformation",
    transformation_body:
      "Batumi wandelt sich deutlich – von einer saisonalen Küstenstadt hin zu einem ganzjährigen Luxus- und Entertainment-Hub. Neue Fünf-Sterne-Hotels, Casinos, Markenresidenzen und internationale Lifestyle-Konzepte verändern die Uferlinie und ziehen eine wachsende Basis globaler Investoren an – ähnlich den frühen Transformationsphasen in Dubai.",

    // Property types
    property_types_title: "Unsere Immobilientypen",

    // Property cards
    property_studio_title: "Luxus-Studioapartments",
    property_1bhk_title: "Premium-Apartments mit 1 Schlafzimmer",
    property_2bhk_title: "Premium-Apartments mit 2 Schlafzimmern",

    property_studio_feat_seaview: "Meerblick",
    property_studio_feat_smarthome: "Smart-Home",

    property_1bhk_feat_panoramic: "Panoramablick",
    property_1bhk_feat_luxurybath: "Luxusbad",
    property_1bhk_feat_smarthome: "Smart-Home",

    property_2bhk_feat_mastersuite: "Master-Suite",
    property_2bhk_feat_gourmetkitchen: "Gourmetküche",
    property_2bhk_feat_walkin: "Begehbarer Kleiderschrank",

    property_card_description:
      "Entdecken Sie stilvoll gestaltete Residenzen in Batumis ikonischer Inselentwicklung.",
    property_card_button: "Details anfordern",

    // Contact CTA
    contact_cta_title: "Bereit für Ihr eigenes Inselparadies?",
    contact_cta_sub:
      "Kontaktieren Sie unser Expertenteam noch heute, um eine Besichtigung zu planen oder weitere Informationen zu erhalten.",
    contact_cta_call_btn: "Anruf +995 574 100 645",
    contact_cta_email_btn: "E-Mail senden",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "Leben in Georgien",
    life_hero_body:
      "Eine lebendige Mischung aus europäischem Flair, Küstenleben am Schwarzen Meer, herzlicher Gastfreundschaft und einem sich schnell modernisierenden Alltag – Georgien bietet ein einzigartiges Umfeld, in dem Kultur, Freiheit und Chancen für Bewohner und Investoren aus aller Welt zusammenkommen.",
    life_hero_btn_lifestyle: "Georgischen Lifestyle entdecken",
    life_hero_btn_alignment: "Georgien & Europa: Wo sie sich treffen",

    // Lifestyle intro
    life_lifestyle_title: "Georgien: Wo Natur und modernes Leben aufeinandertreffen",
    life_lifestyle_body:
      "Georgien bietet eines der außergewöhnlichsten Lifestyle-Erlebnisse Europas – ein Gleichgewicht aus unberührter Natur, reichem Kulturerbe und einer schnell wachsenden modernen Wirtschaft. Von der ruhigen Schwarzmeerküste bis zur futuristischen Skyline von Tiflis vereint das Land Schönheit, Chancen und Erschwinglichkeit.",

    // Lifestyle cards
    life_card1_title: "Spektakuläre Naturschönheit",
    life_card1_body:
      "Schneebedeckte Berge, uralte Wälder, klare Seen und dramatische Küsten machen Georgien zu einem der beeindruckendsten Ganzjahresziele der Welt.",

    life_card2_title: "Europäisch-moderner Lifestyle",
    life_card2_body:
      "Trendige Cafés, internationale Schulen, moderne Business-Hubs, High-Speed-Internet und lebendiges Nachtleben machen Städte wie Tiflis und Batumi ideal für modernes Wohnen.",

    life_card3_title: "Wachsender Tech- und Innovationshub",
    life_card3_body:
      "Georgien entwickelt sich schnell zu einer digital-orientierten Wirtschaft – attraktiv für Start-ups, Tech-Talente und Investoren durch niedrige Steuern, einfache Regularien und eine innovationsfreundliche Regierung.",

    life_card4_title: "Strategische Lage",
    life_card4_body:
      "Zwischen Europa und Asien gelegen ist Georgien ein Tor für Handel, Reisen und Geschäft – ein idealer Standort für globale Aktivitäten.",

    life_card5_title: "Willkommene Kultur",
    life_card5_body:
      "Georgiens herzliche Gastfreundschaft, freundliche Gemeinden und starkes Sicherheitsgefühl machen das Land zu einem der angenehmsten Ziele für Expats und Investoren.",

    life_card6_title: "Hoher Wachstumskurs",
    life_card6_body:
      "Mit wachsendem Tourismus, zunehmenden Auslandsinvestitionen und groß angelegten Küstenentwicklungen gehört Georgien zu den vielversprechendsten Wachstumsmärkten in Europa.",

    // Culture section
    life_culture_title: "Erleben Sie Georgiens reiche Kultur und Geschichte",
    life_culture_body:
      "Die Seele Georgiens wurde über Jahrhunderte durch Traditionen, beeindruckenden Folklore-Tanz, lebendige Kunst und herzliche Gastfreundschaft geformt. Von uralten Weinritualen über vielstimmigen Gesang bis zur Architektur, in der Alt und Neu verschmelzen – jeder Moment in Georgien erzählt eine Geschichte, die man fühlen und leben möchte.",

    life_culture_slide1_title: "Traditioneller georgischer Tanz",
    life_culture_slide1_body:
      "Eine künstlerische Feier von Mut, Eleganz und jahrhundertealtem kulturellem Stolz.",

    life_culture_slide2_title: "Uralte Weinkultur",
    life_culture_slide2_body:
      "Heimat der ältesten Weintradition der Welt – über 8.000 Jahre Handwerkskunst und Gastfreundschaft.",

    life_culture_slide3_title: "Architektonischer Charme Tiflis’",
    life_culture_slide3_body:
      "Eine harmonische Mischung aus historischen Gassen, moderner Eleganz und lebendigem Stadtleben.",

    life_culture_slide4_title: "Batumi im Küstenglanz",
    life_culture_slide4_body:
      "Ein moderner Küstenhotspot, in dem sich Kultur, Architektur und Lebensstil verbinden.",

    // Alignment section
    life_align_title: "Wie Georgien zum modernen europäischen Lifestyle passt",
    life_align_body:
      "Georgien wächst zunehmend in europäische Wirtschafts-, Lifestyle- und Tourismusströme hinein und behält gleichzeitig seine eigene kulturelle Identität und Kostenvorteile. Für Investoren und Bewohner ist es eine Brücke zwischen Ost und West, mit europäischen Standards und einem entspannteren Lebensrhythmus.",

    life_align_card1_title: "Europäischer Lifestyle mit niedrigeren Lebenshaltungskosten",
    life_align_card1_body:
      "Café-Kultur, fußläufige Viertel, internationale Schulen und moderne Einkaufszentren erinnern an viele europäische Hauptstädte – doch Wohnen, Gastronomie und Services bleiben häufig deutlich erschwinglicher.",

    life_align_card2_title: "Steigende Konnektivität & Tourismusströme",
    life_align_card2_body:
      "Direkt- und Anschlussflüge aus wichtigen europäischen Städten, wachsende Touristenzahlen und eine zunehmende Zahl von Digital-Nomaden verbinden Georgien enger mit dem EU-Raum.",

    life_align_card3_title: "Investorenfreundlich & langfristig orientiert",
    life_align_card3_body:
      "Klare Eigentumsrechte, einfache Kaufprozesse und eine zukunftsorientierte Tourismus- und Infrastrukturstrategie positionieren Georgien neben anderen aufstrebenden europäischen Investment-Hotspots.",

    life_align_card4_title: "Kulturelle Tiefe trifft moderne Ambitionen",
    life_align_card4_body:
      "Historische Architektur, Musik, Küche und Traditionen bestehen neben moderner Hotellerie, Co-Working-Spaces und zeitgenössischer Kunst – ein Lifestyle, der anspruchsvolle europäische Reisende und Langzeitbewohner anspricht.",

    // CTA section
    life_cta_title: "Erleben Sie, wie das Leben in Georgien Ihre Investition ergänzt",
    life_cta_body:
      "Verbinden Sie die emotionale Anziehung des Lebens in Georgien mit der finanziellen Stärke einer Investition in Batumi Island Estates – eines der außergewöhnlichsten Inselprojekte im Schwarzen Meer.",
    life_cta_btn: "Zurück zu Investment-Highlights",

    // Contact form (main)
    contact_title: "Detaillierte Investitionsinformationen anfordern",
    contact_subtitle:
      "Teilen Sie uns Ihre Daten mit und unser Team kontaktiert Sie mit Grundrissen, Renditen, Zahlungsplänen und Verfügbarkeiten.",
    contact_label_fullname: "Vollständiger Name *",
    contact_label_email: "E-Mail",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "Ländervorwahl *",
    contact_cc_help:
      "Geben Sie Ihren Ländernamen oder die Vorwahl ein (z. B. Indien, +91, Georgien, +995).",
    contact_label_phone: "Telefonnummer *",
    contact_label_apartment_type: "Apartmenttyp",
    contact_select_type: "Auswählen",
    contact_label_budget: "Ca. Budget (USD)",
    contact_ph_budget: "z. B. 150.000",
    contact_label_message: "Nachricht / Anforderungen",
    contact_ph_message:
      "Beschreiben Sie Ihre Anlageziele, Aufenthaltsdauer, Mieterwartungen usw.",

    // Enquiry buttons & messages
    enquiry_btn_submit: "Anfrage senden",
    enquiry_btn_sending: "Wird gesendet …",
    enquiry_validation: "Bitte geben Sie Ihren Namen und Ihre Telefonnummer an.",
    enquiry_status_dryrun:
      "Vielen Dank. Ihre Anfrage wurde erhalten (Testmodus). Der E-Mail-Versand ist noch nicht konfiguriert.",
    enquiry_status_success:
      "Vielen Dank. Ihre Anfrage ist bei uns eingegangen. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.",
    enquiry_status_error:
      "Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp / Telefon.",

    // Testimonials
    testimonials_title: "Was unsere Investoren sagen",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "Investorin aus London, UK",
    testimonial1_text:
      "„Batumi Island Estates hat alle Kriterien erfüllt – Meerblick, starke Mietrenditen und ein transparenter Prozess. Das Team hat mich bei jedem Schritt wie ein privater Concierge begleitet.“",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "NRI-Investor, Dubai",
    testimonial2_text:
      "„Ich suchte eine sichere, aber wachstumsstarke Alternative außerhalb der üblichen Märkte. Die Kombination aus Inselleben und investorenfreundlichen Regelungen in Georgien machte die Entscheidung leicht.“",

    testimonial3_name: "Maria P.",
    testimonial3_role: "Ferienwohnungsbesitzerin, Athen",
    testimonial3_text:
      "„Ausstattung, Annehmlichkeiten und Ausblicke stehen Top-Resorts im Mittelmeerraum in nichts nach. Ich nutze das Apartment ein paar Wochen im Jahr und das Vermietungsteam kümmert sich problemlos um den Rest.“",

    // Project Details Section
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "Erleben Sie die Zukunft des luxuriösen Waterfront-Living – Brücken, Kanäle, integrierte Resorts und Inselleben im Schwarzen Meer.",

    // Live construction section
    project_progress_title: "Aktueller Baufortschritt",
    project_progress_body:
      "Das obige Video zeigt den aktuellen Fortschritt der Infrastruktur, Brücken, Landschaftsgestaltung und hochwertigen Wohnzonen auf den Inseln. Mit jedem Bauabschnitt rückt Batumi Island Estates der Vision einer vollständig integrierten Luxus-Waterfront-Community im Herzen des Schwarzen Meeres näher.",

    // Island vision section
    project_islandvision_title: "Inselvision nach Fertigstellung",
    project_islandvision_body:
      "Erleben Sie, wie Batumi Island Estates sich zu einer vollständig integrierten Luxus-Waterfront-Community entwickelt – mit Promenaden, gestalteten Terrassen, Resort-Pools, Cafés, Shopping-Boulevards und einer beleuchteten Skyline, die sich im ruhigen Schwarzen Meer spiegelt.",

    // Carousel slides
    project_slide1_tag: "Waterfront-Promenade",
    project_slide1_title: "Seafront-Towers & Marina-Living",
    project_slide1_body:
      "Panoramatürme mit Meerblick und privatem Marina-Zugang für Bewohner.",

    project_slide2_tag: "Resort-Annehmlichkeiten",
    project_slide2_title: "Infinity-Pools & gestaltete Terrassen",
    project_slide2_body:
      "Erhöhte Decks, Lounge-Cabanas und begrünte Wege für Entspannung und Genuss.",

    project_slide3_tag: "Nächtliche Skyline",
    project_slide3_title: "Illuminiertes Leben an der Waterfront",
    project_slide3_body:
      "Die Insel erstrahlt in der Nacht und wird zu einem neuen Wahrzeichen Georgiens.",

    project_slide4_tag: "Boulevard-Lifestyle",
    project_slide4_title: "Cafés • Retail • Inselpromenade",
    project_slide4_body:
      "Ein exklusiver Lifestyle-Boulevard mit Boutique-Retail und Cafés direkt am Meer.",

    // Brochure section
    brochure_title: "Offizielles Projekt-Exposé herunterladen",
    brochure_subtitle: "Geben Sie Ihre E-Mail ein, um das Exposé sofort zu erhalten.",
    brochure_ph_email: "E-Mail-Adresse eingeben",
    brochure_btn: "Exposé herunterladen",

    brochure_msg_empty: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
    brochure_msg_sending: "Wird gesendet …",
    brochure_msg_success: "Exposé versendet! Bitte prüfen Sie Ihren Posteingang.",
    brochure_msg_error: "Fehler beim Senden des Exposés. Bitte erneut versuchen.",
    brochure_msg_network: "Netzwerkfehler. Bitte versuchen Sie es erneut.",

    // Google Meet section
    gmeet_title: "Google-Meet-Beratung vereinbaren",
    gmeet_body:
      "Buchen Sie ein persönliches Beratungsgespräch mit unserem Senior-Advisory-Team, um Projektdetails, Investmentstrukturen und Ihren individuellen Erwerbspfad bei Batumi Island Estates zu besprechen.",
    gmeet_btn: "Google-Meet-Termin vereinbaren",

    // ABOUT PAGE
    about_hero_title: "Über Batumi Island Estates",
    about_hero_subtitle:
      "Eine spezialisierte Luxus-Tochter von Batumi Estates, fokussiert auf Premium-Insel- und Waterfront-Immobilien auf den Batumi-Inseln.",

    about_intro_title: "Wo außergewöhnliches Wohnen beginnt",
    about_intro_p1:
      "Batumi Estates wurde 2022 mit der Vision gegründet, die Immobilienlandschaft Georgiens zu verändern – mit transparenter Beratung, verlässlichen Einblicken und luxusorientierten Portfolios für globale Investoren. Heute bedient die Marke Kunden in Europa, Asien, dem Nahen Osten und Amerika und ist ein führender Investmentpartner für wachstumsstarke Projekte in Georgien.",
    about_intro_p2:
      "2024 haben wir unser Vermächtnis mit der Gründung von Batumi Island Estates erweitert – einer dedizierten Einheit, die sich ausschließlich auf Georgiens erstes luxuriöses, künstlich geschaffenes Insel-Megaprojekt konzentriert. Gestützt von führenden Entwicklern und staatlicher Infrastrukturplanung definiert dieses Projekt Premium-Küstenleben im Schwarzmeerraum neu.",
    about_intro_p3:
      "Mit über 100 internationalen Investoren in unserem Portfolio und vielen weiteren, die unsere Projekte prüfen, steht Batumi Estates für Exzellenz, Transparenz und einen reibungslosen Erwerbsprozess – damit jeder Kunde seine Investition mit größter Sicherheit und Zufriedenheit tätigen kann.",

    about_journey_title: "Unsere Entwicklung",
    about_journey_2022_title: "2022 – Gründung von Batumi Estates",
    about_journey_2022_body:
      "Mit dem Ziel gegründet, transparente, hochwertige und effiziente Immobilienkäufe in Georgien zu ermöglichen.",
    about_journey_2023_title: "2023 – Globale Expansion",
    about_journey_2023_body:
      "Erweiterung der Kundenbasis auf über 25 Länder und Ausbau der Partnerschaften mit Entwicklern und Behörden.",
    about_journey_2024_title: "2024 – Start von Batumi Island Estates",
    about_journey_2024_body:
      "Exklusive Einheit, die sich auf das Landmark-Megaprojekt Batumi Islands konzentriert – Georgiens erste luxuriöse künstliche Inselentwicklung.",
    about_journey_2025_title: "2025 – Über 100 globale Investoren betreut",
    about_journey_2025_body:
      "Ein Meilensteinjahr mit starkem Wachstum, herausragender Servicequalität und erweiterten Investmentportfolios.",

    about_why_title: "Warum Investoren uns wählen",
    about_why_card1_title: "Luxusfokussierte Expertise",
    about_why_card1_body:
      "Spezialisiert auf Waterfront- und Inselinvestments in Georgiens wachstumsstärksten Immobilienzonen.",
    about_why_card2_title: "Rundum-Betreuung",
    about_why_card2_body:
      "Juristische Unterstützung, Dokumentation, Besichtigungen und After-Sales-Service für einen durchgängig reibungslosen Kaufprozess.",
    about_why_card3_title: "Globales Investorenvertrauen",
    about_why_card3_body:
      "Investoren aus über 30 Ländern verlassen sich auf unsere transparente Beratung und kuratierte Investmentauswahl.",

    about_testimonials_title: "Was unsere internationalen Investoren sagen",
    about_testimonial1_text:
      "„Ein nahtloses Investmenterlebnis. Das Team hat mich vom ersten Gespräch bis zur finalen Unterzeichnung begleitet. Wirklich erstklassiger Service!“",
    about_testimonial1_role: "— Daniel M., UK • Tech-Executive",
    about_testimonial2_text:
      "„Ich habe ein Luxus-Studio auf der Insel gekauft. Außergewöhnliche Transparenz und professionelle Unterstützung.“",
    about_testimonial2_role: "— Sara K., VAE • Unternehmerin",
    about_testimonial3_text:
      "„Sehr zu empfehlen für internationale Käufer. Reibungsloser Ablauf und wertvolle Markt-Insights.“",
    about_testimonial3_role: "— Luca R., Italien • Hospitality-Investor",
    about_testimonial4_text:
      "„Professionell, ehrlich und äußerst hilfsbereit. Die beste Agentur in Georgien!“",
    about_testimonial4_role: "— Aisha M., Katar • Immobilienportfolio",
    about_testimonial5_text:
      "„Ein unkomplizierter Kauf – das Team hat sogar die Remote-Unterzeichnung organisiert.“",
    about_testimonial5_role: "— Carlos D., Brasilien • Finanzberater",
    about_testimonial6_text:
      "„Ihre Kenntnis des Luxusmarktes in Batumi ist unvergleichlich.“",
    about_testimonial6_role: "— Hélène S., Frankreich • Unternehmerin",
    about_testimonial7_text:
      "„Ideal für ausländische Erstinvestoren. Ein sehr vertrauenswürdiges Team.“",
    about_testimonial7_role: "— Amir H., Saudi-Arabien • Öl & Energie",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "Luxuriöse Inselresidenzen",

    // Footer – brand section
    footer_brand_desc:
      "Premium-Studios sowie 1- und 2-Zimmer-Residenzen an Georgiens prestigeträchtigster Inseldestination – Resort-Lifestyle kombiniert mit starkem Investmentpotenzial.",

    // Footer – navigation
    footer_nav_title: "Navigation",
    footer_nav_home: "Startseite",
    footer_nav_why_batumi: "Warum Batumi?",
    footer_nav_properties: "Immobilien",
    footer_nav_enquiry: "Anfrageformular",

    // Footer – contact
    footer_contact_title: "Kontakt",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1:
      "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "Batumi, Georgien",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    // Footer – bottom bar
    footer_bottom_rights:
      "© 2025 Batumi Island Estates. Alle Rechte vorbehalten.",
    footer_bottom_privacy: "Datenschutz",
    footer_bottom_terms: "Bedingungen"
  },

  // ---------------- SPANISH ----------------

    es: {
    // Navbar
    nav_home: "Inicio",
    nav_why_batumi: "¿Por qué Batumi?",
    nav_properties: "Propiedades",
    nav_project_details: "Detalles del proyecto",
    nav_life_georgia: "Vida en Georgia",
    nav_about_us: "Sobre nosotros",
    nav_enquire: "Consulta",
    nav_call: "Llamar: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "Tu puerta de entrada a una vida de lujo en islas en el corazón del mar Negro",
    hero_cta_explore: "Ver propiedades",
    hero_cta_quick_enquiry: "Consulta rápida",

    // Quick enquiry modal
    quick_title: "Consulta rápida",
    quick_label_name: "Nombre *",
    quick_label_phone: "Teléfono",
    quick_cc_help:
      "Escribe el nombre de tu país o el prefijo telefónico (ej.: Georgia, +995, India, +91).",
    quick_label_email: "Correo electrónico",
    quick_label_apartment_type: "Tipo de apartamento",
    quick_select_type: "Seleccionar tipo",
    quick_opt_studio: "Estudio de lujo",
    quick_opt_1bhk: "Apartamento 1 dormitorio (1BHK)",
    quick_opt_2bhk: "Apartamento 2 dormitorios (2BHK)",
    quick_opt_other: "Otro",
    quick_label_message: "Mensaje",
    quick_btn_submit: "Enviar consulta",

    // Invest Intro Brand
    invest_intro_after_brand:
      " es uno de los pocos desarrollos insulares planificados del mar Negro, que ofrece un paisaje de inversión exclusivo inspirado en destinos de prestigio mundial como ",
    invest_intro_and: " y ",
    invest_intro_ending:
      ", ofreciendo un valor excepcional a largo plazo y una auténtica escasez de costa.",

    // Investment section
    section_invest_title: "¿Por qué invertir en Batumi Island Estates?",

    invest_card1_title: "Alta rentabilidad (ROI)",
    invest_card1_body:
      "El mercado en rápido crecimiento de turismo, juego y ocio de Batumi respalda sólidos rendimientos de alquiler, especialmente en propiedades insulares frente al mar integradas en resorts.",

    invest_card2_title: "Golden Visa",
    invest_card2_body:
      "Las inversiones estratégicas en Georgia pueden apoyar opciones de estancia prolongada, estructuras de propiedad simplificadas y un conveniente punto de conexión entre Europa, Oriente Medio y Asia.",

    invest_card3_title: "Ubicación privilegiada en islas",
    invest_card3_body:
      "Disfruta de acceso directo al mar Negro, paseos marítimos diseñados, beach clubs y vida de marina, creando un fuerte atractivo de estilo de vida y poder de fijación de precios premium.",

    invest_wc_title: "Una oportunidad de inversión de primer nivel en el mar Negro",

    invest_card4_title: "Megaproyecto insular pionero",
    invest_card4_body:
      "Uno de los pocos desarrollos insulares de nivel mundial en el mar Negro, que crea un destino emblemático sin equivalente en Europa o Asia.",

    invest_card5_title: "Oferta extremadamente limitada",
    invest_card5_body:
      "A diferencia de los inmuebles urbanos, el suelo en islas es finito, lo que genera exclusividad, alta demanda de inversores y potencial de revalorización.",

    invest_card6_title: "Masterplan de lujo inspirado en Dubái",
    invest_card6_body:
      "Desarrollado bajo la misma filosofía arquitectónica que los icónicos proyectos insulares de Dubái: playas privadas, marinas, hoteles de lujo y comercios de alta gama.",

    invest_card7_title: "Ecosistema de resort de 5 estrellas",
    invest_card7_body:
      "Hospitalidad de marca, gastronomía de alto nivel, beach clubs, centros de bienestar y zonas de entretenimiento elevan el valor de cada residencia.",

    invest_card8_title: "Marina privada y acceso para yates",
    invest_card8_body:
      "El acceso directo a una marina de clase mundial aumenta el atractivo turístico y los ingresos de alquiler premium.",

    invest_card9_title: "Fuerte potencial de apreciación futura",
    invest_card9_body:
      "Los inversores de las primeras fases se benefician más a medida que la isla se consolida como destino internacional de turismo, entretenimiento y vida de lujo.",

    invest_card10_title: "Rendimientos en divisas fuertes",
    invest_card10_body:
      "Gana con turistas internacionales con tarifas diarias sólidas, especialmente de Europa y Oriente Medio.",

    invest_card11_title: "Creciente importancia estratégica",
    invest_card11_body:
      "Georgia se está convirtiendo en un importante hub del mar Negro para negocios, ocio, juego y turismo, impulsando el valor inmobiliario a largo plazo.",

    invest_card12_title: "Cero impuesto anual sobre la propiedad",
    invest_card12_body:
      "Georgia ofrece condiciones únicas y favorables para el inversor, sin impuesto anual sobre la propiedad para la titularidad individual.",

    // Transformation strip
    transformation_title: "La transformación de lujo de Batumi",
    transformation_body:
      "Batumi está viviendo una evolución profunda: de ser una ciudad costera estacional a convertirse en un centro de lujo y entretenimiento durante todo el año. Nuevos hoteles de cinco estrellas, casinos, residencias de marca y conceptos internacionales de estilo de vida están redefiniendo el frente marítimo y atrayendo a una base creciente de inversores globales, similar a las primeras fases de transformación vistas en Dubái.",

    // Property types
    property_types_title: "Nuestros tipos de propiedades",

    // Property cards
    property_studio_title: "Apartamentos tipo estudio de lujo",
    property_1bhk_title: "Apartamentos premium de 1 dormitorio",
    property_2bhk_title: "Apartamentos premium de 2 dormitorios",

    property_studio_feat_seaview: "Vista al mar",
    property_studio_feat_smarthome: "Smart Home",

    property_1bhk_feat_panoramic: "Vista panorámica",
    property_1bhk_feat_luxurybath: "Baño de lujo",
    property_1bhk_feat_smarthome: "Smart Home",

    property_2bhk_feat_mastersuite: "Suite principal",
    property_2bhk_feat_gourmetkitchen: "Cocina gourmet",
    property_2bhk_feat_walkin: "Vestidor",

    property_card_description:
      "Descubre residencias cuidadosamente diseñadas dentro del icónico desarrollo insular de Batumi.",
    property_card_button: "Solicitar detalles",

    // Contact CTA
    contact_cta_title: "¿Listo para tener tu propio paraíso en una isla?",
    contact_cta_sub:
      "Contacta hoy con nuestros asesores expertos para programar una visita o recibir información detallada.",
    contact_cta_call_btn: "Llamar +995 574 100 645",
    contact_cta_email_btn: "Escríbenos por correo",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "Vida en Georgia",
    life_hero_body:
      "Una mezcla vibrante de encanto europeo, vida costera en el mar Negro, hospitalidad cálida y un estilo de vida en rápida modernización: Georgia ofrece un entorno único donde cultura, libertad y oportunidades se unen para residentes e inversores de todo el mundo.",
    life_hero_btn_lifestyle: "Explorar el estilo de vida georgiano",
    life_hero_btn_alignment: "Georgia y Europa: cómo se conectan",

    // Lifestyle intro
    life_lifestyle_title:
      "Georgia: donde la belleza natural se une a la vida moderna",
    life_lifestyle_body:
      "Georgia ofrece una de las experiencias de estilo de vida más singulares de Europa, equilibrando paisajes naturales intactos, rico patrimonio cultural y una economía moderna en rápido crecimiento. Desde la tranquila costa del mar Negro hasta el horizonte futurista de Tiflis, el país combina belleza, oportunidad y accesibilidad.",

    // Lifestyle cards
    life_card1_title: "Espectacular belleza natural",
    life_card1_body:
      "Montañas nevadas, bosques ancestrales, lagos cristalinos y costas dramáticas hacen de Georgia uno de los destinos de todo el año más impresionantes del mundo.",

    life_card2_title: "Estilo de vida europeo-moderno",
    life_card2_body:
      "Cafés de tendencia, colegios internacionales, modernos centros de negocios, internet de alta velocidad y una vida nocturna vibrante hacen que ciudades como Tiflis y Batumi sean ideales para la vida moderna.",

    life_card3_title: "Centro en auge de tecnología e innovación",
    life_card3_body:
      "Georgia está emergiendo rápidamente como una economía digital, atrayendo startups, talento tecnológico e inversores gracias a sus bajos impuestos, regulaciones sencillas y un gobierno pro-innovación.",

    life_card4_title: "Ubicación estratégica",
    life_card4_body:
      "Situada entre Europa y Asia, Georgia es una puerta natural para el comercio, los viajes y los negocios, y un lugar ideal para operaciones globales.",

    life_card5_title: "Cultura acogedora",
    life_card5_body:
      "La cálida hospitalidad georgiana, las comunidades cercanas y la sensación de seguridad convierten al país en uno de los destinos más cómodos para expatriados e inversores internacionales.",

    life_card6_title: "Alto potencial de crecimiento",
    life_card6_body:
      "Con un turismo en aumento, una mayor inversión extranjera y desarrollos costeros a gran escala, Georgia es uno de los mercados emergentes más prometedores de Europa.",

    // Culture section
    life_culture_title: "Vive la rica cultura y herencia de Georgia",
    life_culture_body:
      "El alma de Georgia se ha forjado durante siglos a través de tradiciones, danzas folclóricas llenas de fuerza, arte vibrante y una hospitalidad única. Desde antiguos rituales del vino hasta la música polifónica y la arquitectura que mezcla lo antiguo y lo moderno, cada momento en Georgia cuenta una historia que merece ser sentida y vivida.",

    life_culture_slide1_title: "Danza tradicional georgiana",
    life_culture_slide1_body:
      "Una expresión artística de valentía, elegancia y orgullo cultural de siglos de historia.",

    life_culture_slide2_title: "Antigua cultura del vino",
    life_culture_slide2_body:
      "Cuna de la tradición vitivinícola más antigua del mundo, con más de 8.000 años de historia y hospitalidad.",

    life_culture_slide3_title: "Encanto arquitectónico de Tiflis",
    life_culture_slide3_body:
      "Una mezcla armoniosa de calles históricas, elegancia moderna y vida urbana vibrante.",

    life_culture_slide4_title: "El resplandor costero de Batumi",
    life_culture_slide4_body:
      "Un moderno paraíso costero donde se encuentran cultura, arquitectura y estilo de vida.",

    // Alignment section
    life_align_title:
      "Cómo Georgia se alinea con el estilo de vida europeo moderno",
    life_align_body:
      "Georgia está cada vez más integrada en los flujos económicos, turísticos y de estilo de vida europeos, manteniendo al mismo tiempo su identidad cultural y ventajas de coste. Para inversores y residentes, actúa como un puente entre Oriente y Occidente, combinando estándares orientados a Europa con un ritmo de vida más relajado.",

    life_align_card1_title:
      "Estilo de vida europeo con menor costo de vida",
    life_align_card1_body:
      "Cultura de cafés, barrios caminables, colegios internacionales y centros comerciales modernos reflejan muchas capitales europeas, pero la vivienda, la gastronomía y los servicios siguen siendo notablemente más asequibles.",

    life_align_card2_title:
      "Conectividad creciente y flujos turísticos",
    life_align_card2_body:
      "Vuelos directos y de conexión desde ciudades clave de Europa, un número creciente de turistas y una base cada vez mayor de nómadas digitales vinculan a Georgia con el tráfico europeo.",

    life_align_card3_title:
      "Amigable con el inversor y orientada al largo plazo",
    life_align_card3_body:
      "Derechos de propiedad claros, procesos de compra sencillos y una estrategia de turismo e infraestructura de largo plazo sitúan a Georgia junto a otros destinos emergentes de inversión en Europa.",

    life_align_card4_title:
      "Profundidad cultural y aspiraciones modernas",
    life_align_card4_body:
      "Arquitectura histórica, música, gastronomía y tradiciones conviven con una hotelería moderna, espacios de coworking y arte contemporáneo, ofreciendo un estilo de vida que resuena con viajeros europeos sofisticados y residentes de larga estancia.",

    // CTA section
    life_cta_title:
      "Descubre cómo la vida en Georgia potencia tu inversión",
    life_cta_body:
      "Combina el atractivo emocional de vivir en Georgia con la fortaleza financiera de invertir en Batumi Island Estates, uno de los desarrollos insulares más exclusivos de la región del mar Negro.",
    life_cta_btn: "Volver a los aspectos destacados de inversión",

    // Contact form (main)
    contact_title: "Solicitar información detallada de inversión",
    contact_subtitle:
      "Comparte tus datos y nuestro equipo se pondrá en contacto contigo con planos, rendimientos estimados, esquemas de pago y disponibilidad.",
    contact_label_fullname: "Nombre completo *",
    contact_label_email: "Correo electrónico",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "Prefijo de país *",
    contact_cc_help:
      "Escribe el nombre de tu país o el prefijo telefónico (ej.: India, +91, Georgia, +995).",
    contact_label_phone: "Número de teléfono *",
    contact_label_apartment_type: "Tipo de apartamento",
    contact_select_type: "Seleccionar",
    contact_label_budget: "Presupuesto aproximado (USD)",
    contact_ph_budget: "p. ej., 150,000",
    contact_label_message: "Mensaje / Requisitos",
    contact_ph_message:
      "Cuéntanos tus objetivos de inversión, duración de estancia, expectativas de alquiler, etc.",

    // Enquiry buttons & messages
    enquiry_btn_submit: "Enviar consulta",
    enquiry_btn_sending: "Enviando...",
    enquiry_validation:
      "Por favor, indica tu nombre y número de teléfono.",
    enquiry_status_dryrun:
      "Gracias. Hemos recibido tu consulta (modo prueba). El envío de correo todavía no está configurado.",
    enquiry_status_success:
      "Gracias. Hemos recibido tu consulta. Nuestro equipo se pondrá en contacto contigo en breve.",
    enquiry_status_error:
      "Se produjo un error al enviar tu consulta. Inténtalo de nuevo o utiliza WhatsApp / llamada telefónica.",

    // Testimonials
    testimonials_title: "Lo que dicen nuestros inversores",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "Inversora de Londres, Reino Unido",
    testimonial1_text:
      "“Batumi Island Estates cumplió con todos mis requisitos: vistas al mar, altos rendimientos de alquiler y un proceso transparente. El equipo me acompañó en cada paso como un concierge privado.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "Inversor NRI, Dubái",
    testimonial2_text:
      "“Buscaba una oportunidad segura pero de alto crecimiento fuera de los mercados habituales. La combinación de vida en islas y regulaciones favorables al inversor en Georgia hizo que la decisión fuera muy sencilla.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "Compradora de segunda residencia, Atenas",
    testimonial3_text:
      "“Los acabados, las comodidades y las vistas están al nivel de los mejores resorts del Mediterráneo. Uso el apartamento algunas semanas al año y el equipo de alquiler lo gestiona a la perfección el resto del tiempo.”",

    // Project Details Section
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "Vive el futuro del lujo frente al mar: puentes, canales, resorts integrados y vida insular en el mar Negro.",

    // Live construction section
    project_progress_title: "Avance en tiempo real de la construcción",
    project_progress_body:
      "El video superior muestra el progreso actual de la infraestructura, puentes, paisajismo y zonas residenciales premium en las islas. Con cada fase completada, Batumi Island Estates se acerca más a convertirse en una comunidad frente al mar totalmente integrada en el corazón del mar Negro.",

    // Island vision section
    project_islandvision_title:
      "Visión de las islas tras la finalización",
    project_islandvision_body:
      "Explora cómo Batumi Island Estates se transformará en una comunidad de lujo frente al mar totalmente integrada, con paseos marítimos, terrazas ajardinadas, piscinas tipo resort, cafés, bulevares comerciales y un skyline iluminado reflejado sobre las tranquilas aguas del mar Negro.",

    // Carousel slides
    project_slide1_tag: "Paseo marítimo",
    project_slide1_title: "Torres frente al mar y vida de marina",
    project_slide1_body:
      "Torres panorámicas con vistas al mar y acceso privado a la marina para los residentes.",

    project_slide2_tag: "Servicios de resort",
    project_slide2_title: "Piscinas infinitas y terrazas ajardinadas",
    project_slide2_body:
      "Decks elevados, cabañas lounge y senderos verdes diseñados para el descanso y la desconexión.",

    project_slide3_tag: "Skyline nocturno",
    project_slide3_title: "Vida frente al mar iluminada",
    project_slide3_body:
      "La isla brillando bajo el cielo nocturno, creando un nuevo icono para Georgia.",

    project_slide4_tag: "Bulevar de estilo de vida",
    project_slide4_title: "Cafés · Retail · Paseo insular",
    project_slide4_body:
      "Un bulevar de estilo de vida premium con boutiques y cafés frente al mar.",

    // Brochure section
    brochure_title:
      "Descarga el brochure oficial del proyecto",
    brochure_subtitle:
      "Introduce tu correo electrónico para recibir el brochure al instante.",
    brochure_ph_email: "Introduce tu correo electrónico",
    brochure_btn: "Descargar brochure",

    brochure_msg_empty:
      "Por favor, introduce tu dirección de correo electrónico.",
    brochure_msg_sending: "Enviando...",
    brochure_msg_success:
      "¡Brochure enviado! Revisa tu bandeja de entrada.",
    brochure_msg_error:
      "Error al enviar el brochure. Inténtalo de nuevo.",
    brochure_msg_network:
      "Error de red. Por favor, inténtalo de nuevo.",

    // Google Meet section
    gmeet_title:
      "Agenda una consultoría por Google Meet",
    gmeet_body:
      "Reserva una consultoría personalizada con nuestro equipo senior para revisar los detalles del proyecto, las estructuras de inversión y tu ruta de adquisición en Batumi Island Estates.",
    gmeet_btn: "Agendar Google Meet",

    // ABOUT PAGE
    about_hero_title: "Acerca de Batumi Island Estates",
    about_hero_subtitle:
      "Una división de lujo especializada de Batumi Estates, dedicada a propiedades premium insulares y frente al mar en las islas de Batumi.",

    about_intro_title: "Donde comienza la vida excepcional",
    about_intro_p1:
      "Fundada en 2022, Batumi Estates nació con la visión de transformar el mercado inmobiliario de Georgia ofreciendo a los inversores globales asesoría transparente, información confiable y portafolios enfocados en el segmento lujo. Hoy, la marca atiende a clientes en Europa, Asia, Oriente Medio y las Américas, consolidándose como socio líder en inversiones en los desarrollos de mayor crecimiento del país.",
    about_intro_p2:
      "En 2024 ampliamos nuestro legado con la creación de Batumi Island Estates, una división dedicada exclusivamente al primer megaproyecto de islas artificiales de lujo de Georgia. Impulsado por desarrolladores líderes y respaldado por iniciativas nacionales de infraestructura, este proyecto pionero está redefiniendo la vida premium frente al mar en la región del mar Negro.",
    about_intro_p3:
      "Con más de 100 inversores internacionales ya incorporados y muchos más explorando oportunidades en nuestro portafolio en expansión, Batumi Estates mantiene un legado de excelencia, transparencia y procesos de adquisición fluidos, garantizando que cada cliente experimente la máxima confianza y satisfacción en su viaje de inversión.",

    about_journey_title: "Nuestra trayectoria",
    about_journey_2022_title: "2022 — Fundación de Batumi Estates",
    about_journey_2022_body:
      "Fundada con la misión de ofrecer experiencias de compra inmobiliaria transparentes, premium y eficientes en Georgia.",
    about_journey_2023_title: "2023 — Expansión global",
    about_journey_2023_body:
      "Alcanzamos clientes en más de 25 países y ampliamos alianzas con desarrolladores y entidades gubernamentales.",
    about_journey_2024_title:
      "2024 — Lanzamiento de Batumi Island Estates",
    about_journey_2024_body:
      "Se crea una división exclusiva para centrarse en el megaproyecto emblemático de las islas de Batumi, la primera iniciativa de islas artificiales de lujo de Georgia.",
    about_journey_2025_title:
      "2025 — Más de 100 inversores globales atendidos",
    about_journey_2025_body:
      "Un año clave de fuerte crecimiento, calificaciones de servicio excepcionales y portafolios de inversión en expansión.",

    about_why_title: "Por qué los inversores nos eligen",
    about_why_card1_title: "Especialización en lujo",
    about_why_card1_body:
      "Especialistas en inversiones frente al mar y en islas, alineadas con las zonas inmobiliarias de mayor crecimiento en Georgia.",
    about_why_card2_title: "Asesoría integral de principio a fin",
    about_why_card2_body:
      "Soporte legal, documentación, visitas guiadas y servicios post-venta para una experiencia de compra sin fricciones.",
    about_why_card3_title: "Confianza de clientes globales",
    about_why_card3_body:
      "Inversores de más de 30 países confían en nuestra asesoría transparente y en nuestro portafolio de inversiones cuidadosamente seleccionado.",

    about_testimonials_title:
      "Lo que dicen nuestros inversores internacionales",
    about_testimonial1_text:
      "“Una experiencia de inversión sin fisuras. El equipo me acompañó desde la primera llamada hasta la firma final. ¡Servicio realmente de clase mundial!”",
    about_testimonial1_role:
      "— Daniel M., Reino Unido • Ejecutivo tecnológico",
    about_testimonial2_text:
      "“Compré un estudio de lujo en la isla. Transparencia excepcional y soporte muy profesional.”",
    about_testimonial2_role:
      "— Sara K., EAU • Empresaria",
    about_testimonial3_text:
      "“Muy recomendado para compradores internacionales. Proceso fluido y grandes perspectivas de mercado.”",
    about_testimonial3_role:
      "— Luca R., Italia • Inversor en hospitality",
    about_testimonial4_text:
      "“Profesionales, honestos y extremadamente serviciales. ¡La mejor agencia de Georgia!”",
    about_testimonial4_role:
      "— Aisha M., Catar • Portafolio inmobiliario",
    about_testimonial5_text:
      "“Proceso de compra sin complicaciones. Gestionaron incluso la firma remota.”",
    about_testimonial5_role:
      "— Carlos D., Brasil • Consultor financiero",
    about_testimonial6_text:
      "“Su conocimiento del mercado de lujo en Batumi es inigualable.”",
    about_testimonial6_role:
      "— Hélène S., Francia • Emprendedora",
    about_testimonial7_text:
      "“Perfecto para extranjeros que invierten por primera vez. Un equipo muy confiable.”",
    about_testimonial7_role:
      "— Amir H., Arabia Saudí • Petróleo y energía",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "Residencias de lujo en islas",

    // Footer – brand section
    footer_brand_desc:
      "Estudios premium y apartamentos de 1 y 2 dormitorios en el destino insular más prestigioso de Georgia, combinando vida de resort con un fuerte potencial de inversión.",

    // Footer – navigation
    footer_nav_title: "Navegación",
    footer_nav_home: "Inicio",
    footer_nav_why_batumi: "¿Por qué Batumi?",
    footer_nav_properties: "Propiedades",
    footer_nav_enquiry: "Formulario de consulta",

    // Footer – contact
    footer_contact_title: "Contacto",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1:
      "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "Batumi, Georgia",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    // Footer – bottom bar
    footer_bottom_rights:
      "© 2025 Batumi Island Estates. Todos los derechos reservados.",
    footer_bottom_privacy: "Política de privacidad",
    footer_bottom_terms: "Términos"
  },

  // ---------------- PORTUGUESE ----------------

    pt: {
    // Navbar
    nav_home: "Início",
    nav_why_batumi: "Por que Batumi?",
    nav_properties: "Imóveis",
    nav_project_details: "Detalhes do projeto",
    nav_life_georgia: "Vida na Geórgia",
    nav_about_us: "Sobre nós",
    nav_enquire: "Solicitação",
    nav_call: "Ligar: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "Sua porta de entrada para uma vida de luxo em ilhas no coração do Mar Negro",
    hero_cta_explore: "Ver imóveis",
    hero_cta_quick_enquiry: "Solicitação rápida",

    // Quick enquiry modal
    quick_title: "Solicitação rápida",
    quick_label_name: "Nome *",
    quick_label_phone: "Telefone",
    quick_cc_help:
      "Digite o nome do seu país ou o código de discagem (ex.: Geórgia, +995, Brasil, +55).",
    quick_label_email: "E-mail",
    quick_label_apartment_type: "Tipo de apartamento",
    quick_select_type: "Selecione o tipo",
    quick_opt_studio: "Studio de luxo",
    quick_opt_1bhk: "Apartamento 1 dormitório (1BHK)",
    quick_opt_2bhk: "Apartamento 2 dormitórios (2BHK)",
    quick_opt_other: "Outro",
    quick_label_message: "Mensagem",
    quick_btn_submit: "Enviar solicitação",

    // Invest Intro Brand
    invest_intro_after_brand:
      " é um dos raros desenvolvimentos insulares masterplan no Mar Negro, oferecendo um cenário de investimento exclusivo inspirado em destinos de renome mundial como ",
    invest_intro_and: " e ",
    invest_intro_ending:
      ", proporcionando valor excepcional de longo prazo e uma verdadeira escassez de frente marítima.",

    // Investment section
    section_invest_title: "Por que investir em Batumi Island Estates?",

    invest_card1_title: "Alto retorno (ROI)",
    invest_card1_body:
      "O mercado em rápido crescimento de turismo, jogos e lazer de Batumi sustenta fortes rendimentos de aluguel, especialmente em imóveis insulares frente ao mar integrados a resorts.",

    invest_card2_title: "Golden Visa",
    invest_card2_body:
      "Investimentos estratégicos na Geórgia podem apoiar opções de estadia prolongada, estruturas de propriedade simplificadas e uma base conveniente entre a Europa, o Oriente Médio e a Ásia.",

    invest_card3_title: "Localização privilegiada em ilhas",
    invest_card3_body:
      "Aproveite o acesso direto ao Mar Negro, passeios à beira-mar projetados, beach clubs e vida em marina – combinando apelo de estilo de vida com capacidade de precificação premium.",

    invest_wc_title: "Uma oportunidade de investimento de classe mundial no Mar Negro",

    invest_card4_title: "Megaprojeto insular pioneiro",
    invest_card4_body:
      "Um dos únicos desenvolvimentos insulares de padrão mundial no Mar Negro – criando um destino emblemático sem paralelo na Europa ou na Ásia.",

    invest_card5_title: "Oferta extremamente limitada",
    invest_card5_body:
      "Ao contrário dos imóveis urbanos, a terra em ilhas é finita – o que gera exclusividade, forte demanda de investidores e alto potencial de revenda.",

    invest_card6_title: "Masterplan de luxo inspirado em Dubai",
    invest_card6_body:
      "Desenvolvido com a mesma filosofia arquitetônica dos icônicos projetos insulares de Dubai – praias privadas, marinas, hotéis de luxo e varejo de alto padrão.",

    invest_card7_title: "Ecossistema de resort 5 estrelas",
    invest_card7_body:
      "Hospitalidade de marca, alta gastronomia, beach clubs, centros de bem-estar e zonas de entretenimento elevam o valor de cada residência.",

    invest_card8_title: "Marina privativa e acesso para iates",
    invest_card8_body:
      "O acesso direto a uma marina de padrão internacional aumenta o apelo turístico e a renda de aluguel premium.",

    invest_card9_title: "Forte potencial de valorização futura",
    invest_card9_body:
      "Investidores das primeiras fases se beneficiam mais à medida que a ilha se consolida como um destino internacional de turismo, entretenimento e vida de luxo.",

    invest_card10_title: "Rendimentos em moeda forte",
    invest_card10_body:
      "Receba de turistas internacionais com diárias expressivas – especialmente de viajantes da Europa e do Oriente Médio.",

    invest_card11_title: "Importância estratégica em crescimento",
    invest_card11_body:
      "A Geórgia está se tornando um importante hub do Mar Negro para negócios, lazer, jogos e turismo – impulsionando o valor dos imóveis no longo prazo.",

    invest_card12_title: "Zero imposto anual sobre a propriedade",
    invest_card12_body:
      "A Geórgia oferece condições únicas e favoráveis ao investidor, sem imposto anual sobre a propriedade para pessoa física.",

    // Transformation strip
    transformation_title: "A transformação de luxo de Batumi",
    transformation_body:
      "Batumi está passando por uma transformação profunda – de uma cidade litorânea sazonal para um hub de luxo e entretenimento durante todo o ano. Novos hotéis cinco estrelas, cassinos, residências de marca e conceitos internacionais de lifestyle estão redesenhando a orla e atraindo uma base crescente de investidores globais, em um movimento semelhante às fases iniciais de transformação vistas em Dubai.",

    // Property types
    property_types_title: "Nossos tipos de imóveis",

    // Property cards
    property_studio_title: "Studios de luxo",
    property_1bhk_title: "Apartamentos premium de 1 dormitório",
    property_2bhk_title: "Apartamentos premium de 2 dormitórios",

    property_studio_feat_seaview: "Vista para o mar",
    property_studio_feat_smarthome: "Smart Home",

    property_1bhk_feat_panoramic: "Vista panorâmica",
    property_1bhk_feat_luxurybath: "Banheiro de luxo",
    property_1bhk_feat_smarthome: "Smart Home",

    property_2bhk_feat_mastersuite: "Suíte master",
    property_2bhk_feat_gourmetkitchen: "Cozinha gourmet",
    property_2bhk_feat_walkin: "Closet walk-in",

    property_card_description:
      "Descubra residências cuidadosamente projetadas no icônico desenvolvimento insular de Batumi.",
    property_card_button: "Solicitar detalhes",

    // Contact CTA
    contact_cta_title: "Pronto para ter seu próprio paraíso em uma ilha?",
    contact_cta_sub:
      "Fale hoje com nossa equipe de especialistas para agendar uma visita ou receber informações detalhadas.",
    contact_cta_call_btn: "Ligar +995 574 100 645",
    contact_cta_email_btn: "Enviar e-mail",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "Vida na Geórgia",
    life_hero_body:
      "Uma combinação vibrante de charme europeu, vida costeira no Mar Negro, hospitalidade calorosa e um estilo de vida em rápida modernização – a Geórgia oferece um ambiente único onde cultura, liberdade e oportunidade se unem para residentes e investidores globais.",
    life_hero_btn_lifestyle: "Explorar o estilo de vida georgiano",
    life_hero_btn_alignment: "Geórgia & Europa: como se conectam",

    // Lifestyle intro
    life_lifestyle_title:
      "Geórgia: onde a beleza natural encontra a vida moderna",
    life_lifestyle_body:
      "A Geórgia oferece uma das experiências de estilo de vida mais singulares da Europa, equilibrando paisagens naturais intocadas, um rico patrimônio cultural e uma economia moderna em rápida evolução. Da tranquila costa do Mar Negro ao skyline futurista de Tbilisi, o país combina beleza, oportunidade e acessibilidade.",

    // Lifestyle cards
    life_card1_title: "Beleza natural espetacular",
    life_card1_body:
      "Montanhas nevadas, florestas antigas, lagos cristalinos e litorais dramáticos tornam a Geórgia um dos destinos mais impressionantes para todas as estações do ano.",

    life_card2_title: "Estilo de vida europeu-moderno",
    life_card2_body:
      "Cafés descolados, escolas internacionais, centros de negócios modernos, internet de alta velocidade e vida noturna vibrante fazem de cidades como Tbilisi e Batumi lugares ideais para a vida moderna.",

    life_card3_title: "Polo em ascensão de tecnologia e inovação",
    life_card3_body:
      "A Geórgia está emergindo rapidamente como uma economia digital, atraindo startups, talentos de tecnologia e investidores graças a impostos baixos, regulamentação simples e um governo pró-inovação.",

    life_card4_title: "Localização estratégica",
    life_card4_body:
      "Situada entre a Europa e a Ásia, a Geórgia é uma porta natural para comércio, viagens e negócios, sendo uma base ideal para operações globais.",

    life_card5_title: "Cultura acolhedora",
    life_card5_body:
      "A hospitalidade calorosa da Geórgia, suas comunidades próximas e a sensação de segurança tornam o país um dos destinos mais confortáveis para expatriados e investidores internacionais.",

    life_card6_title: "Alto potencial de crescimento",
    life_card6_body:
      "Com o turismo em alta, crescente investimento estrangeiro e grandes desenvolvimentos costeiros, a Geórgia é um dos mercados emergentes mais promissores da Europa.",

    // Culture section
    life_culture_title: "Experimente a rica cultura e herança da Geórgia",
    life_culture_body:
      "A alma da Geórgia foi moldada ao longo de séculos por tradições, danças folclóricas vibrantes, arte expressiva e uma hospitalidade incomparável. De antigos rituais do vinho à música polifônica e à arquitetura que mistura o antigo e o moderno, cada momento no país conta uma história que merece ser sentida e vivida.",

    life_culture_slide1_title: "Dança tradicional georgiana",
    life_culture_slide1_body:
      "Uma celebração artística de coragem, elegância e orgulho cultural de séculos.",

    life_culture_slide2_title: "Antiga cultura do vinho",
    life_culture_slide2_body:
      "Berço da mais antiga tradição vinícola do mundo – mais de 8.000 anos de técnica e hospitalidade.",

    life_culture_slide3_title: "Charme arquitetônico de Tbilisi",
    life_culture_slide3_body:
      "Uma combinação harmoniosa de ruas históricas, elegância moderna e vida urbana vibrante.",

    life_culture_slide4_title: "Brilho costeiro de Batumi",
    life_culture_slide4_body:
      "Um paraíso costeiro moderno onde cultura, arquitetura e estilo de vida se encontram.",

    // Alignment section
    life_align_title:
      "Como a Geórgia se alinha ao estilo de vida europeu moderno",
    life_align_body:
      "A Geórgia está cada vez mais integrada aos fluxos econômicos, turísticos e de estilo de vida europeus, mantendo ao mesmo tempo sua identidade cultural e vantagens de custo. Para investidores e residentes, funciona como uma ponte entre Oriente e Ocidente, combinando padrões voltados para a Europa com um ritmo de vida mais leve.",

    life_align_card1_title:
      "Estilo de vida europeu com custo de vida mais baixo",
    life_align_card1_body:
      "Cultura de cafés, bairros caminháveis, escolas internacionais e shoppings modernos lembram muitas capitais europeias, enquanto moradia, gastronomia e serviços permanecem significativamente mais acessíveis.",

    life_align_card2_title:
      "Conectividade crescente e fluxos turísticos",
    life_align_card2_body:
      "Voos diretos e conexões a partir de cidades-chave da Europa, número crescente de turistas e uma base em expansão de nômades digitais conectam a Geórgia ao tráfego europeu.",

    life_align_card3_title:
      "Amigável ao investidor e orientada ao longo prazo",
    life_align_card3_body:
      "Direitos de propriedade claros, processos de compra simples e uma estratégia de turismo e infraestrutura voltada para o futuro posicionam a Geórgia ao lado de outros hotspots emergentes de investimento na Europa.",

    life_align_card4_title:
      "Profundidade cultural com aspirações modernas",
    life_align_card4_body:
      "Arquitetura histórica, música, gastronomia e tradições convivem com hotelaria moderna, espaços de coworking e arte contemporânea – oferecendo um estilo de vida que ressoa com viajantes europeus sofisticados e residentes de longa permanência.",

    // CTA section
    life_cta_title:
      "Veja como a vida na Geórgia fortalece o seu investimento",
    life_cta_body:
      "Combine o apelo emocional de viver na Geórgia com a solidez financeira de investir em Batumi Island Estates – um dos projetos insulares mais exclusivos da região do Mar Negro.",
    life_cta_btn: "Voltar aos destaques de investimento",

    // Contact form (main)
    contact_title: "Solicitar informações detalhadas de investimento",
    contact_subtitle:
      "Compartilhe seus dados e nossa equipe entrará em contato com plantas, rendimentos, condições de pagamento e disponibilidade.",
    contact_label_fullname: "Nome completo *",
    contact_label_email: "E-mail",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "Código do país *",
    contact_cc_help:
      "Digite o nome do seu país ou o código de discagem (ex.: Brasil, +55, Geórgia, +995).",
    contact_label_phone: "Número de telefone *",
    contact_label_apartment_type: "Tipo de apartamento",
    contact_select_type: "Selecionar",
    contact_label_budget: "Orçamento aproximado (USD)",
    contact_ph_budget: "ex.: 150.000",
    contact_label_message: "Mensagem / Requisitos",
    contact_ph_message:
      "Conte-nos seus objetivos de investimento, tempo de estadia, expectativa de aluguel etc.",

    // Enquiry buttons & messages
    enquiry_btn_submit: "Enviar solicitação",
    enquiry_btn_sending: "Enviando...",
    enquiry_validation:
      "Por favor, informe seu nome e número de telefone.",
    enquiry_status_dryrun:
      "Obrigado. Sua solicitação foi recebida (modo de teste). O envio de e-mail ainda não está configurado.",
    enquiry_status_success:
      "Obrigado. Sua solicitação foi recebida. Nossa equipe entrará em contato em breve.",
    enquiry_status_error:
      "Ocorreu um erro ao enviar sua solicitação. Tente novamente ou use WhatsApp / ligação telefônica.",

    // Testimonials
    testimonials_title: "O que nossos investidores dizem",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "Investidora de Londres, Reino Unido",
    testimonial1_text:
      "“Batumi Island Estates atendeu a todos os meus requisitos – vista para o mar, forte rendimento de aluguel e um processo transparente. A equipe me guiou em cada etapa como se fosse um concierge particular.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "Investidor NRI, Dubai",
    testimonial2_text:
      "“Eu buscava uma oportunidade segura, mas com alto potencial de crescimento, fora dos mercados tradicionais. A combinação de vida em ilhas com as regulamentações favoráveis ao investidor na Geórgia tornou a decisão muito simples.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "Compradora de casa de férias, Atenas",
    testimonial3_text:
      "“Os acabamentos, as comodidades e as vistas estão no mesmo nível dos melhores resorts do Mediterrâneo. Uso o apartamento algumas semanas por ano, e a equipe de locação administra tudo perfeitamente no restante do tempo.”",

    // Project Details Section
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "Viva o futuro do luxo à beira-mar – pontes, canais, resorts integrados e vida em ilhas no Mar Negro.",

    // Live construction section
    project_progress_title: "Progresso da construção em tempo real",
    project_progress_body:
      "O vídeo acima mostra o progresso atual de infraestrutura, pontes, paisagismo e zonas residenciais premium nas ilhas. A cada fase concluída, Batumi Island Estates se aproxima de entregar uma comunidade de luxo totalmente integrada à beira-mar, no coração do Mar Negro.",

    // Island vision section
    project_islandvision_title:
      "Visão das ilhas após a conclusão",
    project_islandvision_body:
      "Veja como Batumi Island Estates se transformará em uma comunidade de luxo à beira-mar totalmente integrada – com passeios à beira-mar, terraços ajardinados, piscinas de resort, cafés, boulevards comerciais e um skyline iluminado refletido sobre as águas calmas do Mar Negro.",

    // Carousel slides
    project_slide1_tag: "Passeio à beira-mar",
    project_slide1_title: "Torres frente ao mar e vida em marina",
    project_slide1_body:
      "Torres panorâmicas com vista para o mar e acesso privado à marina para os moradores.",

    project_slide2_tag: "Amenidades de resort",
    project_slide2_title: "Piscinas infinitas e terraços ajardinados",
    project_slide2_body:
      "Decks elevados, cabanas lounge e caminhos verdes para relaxamento e bem-estar.",

    project_slide3_tag: "Skyline noturno",
    project_slide3_title: "Vida iluminada à beira-mar",
    project_slide3_body:
      "A ilha iluminada sob o céu noturno, tornando-se um novo ícone da Geórgia.",

    project_slide4_tag: "Boulevard de lifestyle",
    project_slide4_title: "Cafés · Varejo · Passeio insular",
    project_slide4_body:
      "Um boulevard de estilo de vida premium com boutiques e cafés à beira-mar.",

    // Brochure section
    brochure_title:
      "Baixar o brochure oficial do projeto",
    brochure_subtitle:
      "Digite seu e-mail para receber o brochure imediatamente.",
    brochure_ph_email: "Digite seu endereço de e-mail",
    brochure_btn: "Baixar brochure",

    brochure_msg_empty:
      "Por favor, informe seu endereço de e-mail.",
    brochure_msg_sending: "Enviando...",
    brochure_msg_success:
      "Brochure enviado! Verifique sua caixa de entrada.",
    brochure_msg_error:
      "Erro ao enviar o brochure. Tente novamente.",
    brochure_msg_network:
      "Erro de rede. Por favor, tente novamente.",

    // Google Meet section
    gmeet_title:
      "Agendar uma consultoria por Google Meet",
    gmeet_body:
      "Agende uma consultoria personalizada com nossa equipe sênior para revisar os detalhes do projeto, estruturas de investimento e seu caminho de aquisição em Batumi Island Estates.",
    gmeet_btn: "Agendar Google Meet",

    // ABOUT PAGE
    about_hero_title: "Sobre Batumi Island Estates",
    about_hero_subtitle:
      "Uma subsidiária de luxo especializada da Batumi Estates, dedicada a imóveis premium insulares e à beira-mar nas ilhas de Batumi.",

    about_intro_title: "Onde a vida excepcional começa",
    about_intro_p1:
      "Fundada em 2022, a Batumi Estates nasceu com a visão de transformar o mercado imobiliário da Geórgia, oferecendo a investidores globais orientação transparente, insights confiáveis e portfólios focados em luxo. Hoje, a marca atende clientes na Europa, Ásia, Oriente Médio e Américas, consolidando-se como um parceiro líder em investimentos nos empreendimentos de maior crescimento do país.",
    about_intro_p2:
      "Em 2024, ampliamos nosso legado com a criação da Batumi Island Estates – uma divisão dedicada exclusivamente ao primeiro megaprojeto de ilhas artificiais de luxo da Geórgia. Apoiado por desenvolvedores líderes e iniciativas nacionais de infraestrutura, esse projeto pioneiro está redefinindo a vida premium à beira-mar na região do Mar Negro.",
    about_intro_p3:
      "Com mais de 100 investidores globais já atendidos e muitos outros explorando oportunidades em nosso portfólio em expansão, a Batumi Estates mantém um legado de excelência, transparência e processos de aquisição sem atritos – garantindo que cada cliente experimente máxima confiança e satisfação em sua jornada de investimento.",

    about_journey_title: "Nossa trajetória",
    about_journey_2022_title: "2022 — Fundação da Batumi Estates",
    about_journey_2022_body:
      "Fundada com a missão de oferecer uma experiência de compra de imóveis transparente, premium e eficiente na Geórgia.",
    about_journey_2023_title: "2023 — Expansão global",
    about_journey_2023_body:
      "Alcançamos clientes em mais de 25 países e ampliamos parcerias com incorporadoras e órgãos governamentais.",
    about_journey_2024_title:
      "2024 — Lançamento da Batumi Island Estates",
    about_journey_2024_body:
      "Criação de uma divisão exclusiva para focar no megaprojeto emblemático das ilhas de Batumi – o primeiro projeto de ilhas artificiais de luxo da Geórgia.",
    about_journey_2025_title:
      "2025 — Mais de 100 investidores globais atendidos",
    about_journey_2025_body:
      "Um ano marcante de forte crescimento, excelente avaliação de serviço e expansão dos portfólios de investimento.",

    about_why_title: "Por que os investidores nos escolhem",
    about_why_card1_title: "Especialização em imóveis de luxo",
    about_why_card1_body:
      "Especialistas em investimentos à beira-mar e em ilhas, alinhados às zonas imobiliárias de maior crescimento na Geórgia.",
    about_why_card2_title: "Atendimento de ponta a ponta",
    about_why_card2_body:
      "Suporte jurídico, documentação, visitas, e serviços pós-compra para uma experiência de aquisição totalmente fluida.",
    about_why_card3_title: "Confiança de clientes globais",
    about_why_card3_body:
      "Investidores de mais de 30 países confiam em nossa assessoria transparente e em nosso portfólio de investimentos cuidadosamente selecionado.",

    about_testimonials_title:
      "O que dizem nossos investidores internacionais",
    about_testimonial1_text:
      "“Uma experiência de investimento sem atritos. A equipe me acompanhou desde a primeira chamada até a assinatura final. Serviço realmente de classe mundial!”",
    about_testimonial1_role:
      "— Daniel M., Reino Unido • Executivo de tecnologia",
    about_testimonial2_text:
      "“Comprei um studio de luxo na ilha. Transparência excepcional e suporte muito profissional.”",
    about_testimonial2_role:
      "— Sara K., Emirados Árabes Unidos • Empresária",
    about_testimonial3_text:
      "“Altamente recomendados para compradores internacionais. Processo tranquilo e ótimos insights de mercado.”",
    about_testimonial3_role:
      "— Luca R., Itália • Investidor em hotelaria",
    about_testimonial4_text:
      "“Profissionais, honestos e extremamente prestativos. A melhor agência da Geórgia!”",
    about_testimonial4_role:
      "— Aisha M., Catar • Portfólio imobiliário",
    about_testimonial5_text:
      "“Processo de compra sem complicações. Eles cuidaram até da assinatura remota!”",
    about_testimonial5_role:
      "— Carlos D., Brasil • Consultor financeiro",
    about_testimonial6_text:
      "“O conhecimento que têm sobre o mercado de luxo em Batumi é incomparável.”",
    about_testimonial6_role:
      "— Hélène S., França • Empreendedora",
    about_testimonial7_text:
      "“Perfeito para estrangeiros que estão investindo pela primeira vez. Equipe extremamente confiável.”",
    about_testimonial7_role:
      "— Amir H., Arábia Saudita • Petróleo e energia",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "Residências de luxo em ilhas",

    // Footer – brand section
    footer_brand_desc:
      "Studios premium e apartamentos de 1 e 2 dormitórios no destino insular mais prestigioso da Geórgia, combinando vida de resort com forte potencial de investimento.",

    // Footer – navigation
    footer_nav_title: "Navegação",
    footer_nav_home: "Início",
    footer_nav_why_batumi: "Por que Batumi?",
    footer_nav_properties: "Imóveis",
    footer_nav_enquiry: "Formulário de solicitação",

    // Footer – contact
    footer_contact_title: "Contato",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1:
      "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "Batumi, Geórgia",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    // Footer – bottom bar
    footer_bottom_rights:
      "© 2025 Batumi Island Estates. Todos os direitos reservados.",
    footer_bottom_privacy: "Política de privacidade",
    footer_bottom_terms: "Termos"
  },

  // ---------------- ARABIC ----------------

    ar: {
    // Navbar
    nav_home: "الرئيسية",
    nav_why_batumi: "لماذا باتومي؟",
    nav_properties: "العقارات",
    nav_project_details: "تفاصيل المشروع",
    nav_life_georgia: "الحياة في جورجيا",
    nav_about_us: "من نحن",
    nav_enquire: "استعلام",
    nav_call: "اتصال: +995 574 100 645",

    // Hero
    hero_title: "Batumi Island Estates",
    hero_subtitle:
      "بوابتك إلى أسلوب حياة فاخر على الجزر في قلب البحر الأسود",
    hero_cta_explore: "استكشاف العقارات",
    hero_cta_quick_enquiry: "استعلام سريع",

    // Quick enquiry modal
    quick_title: "استعلام سريع",
    quick_label_name: "الاسم *",
    quick_label_phone: "رقم الهاتف",
    quick_cc_help:
      "اكتب اسم بلدك أو رمز الاتصال الدولي (مثال: جورجيا +995، الهند +91).",
    quick_label_email: "البريد الإلكتروني",
    quick_label_apartment_type: "نوع الشقة",
    quick_select_type: "اختر النوع",
    quick_opt_studio: "استوديو فاخر",
    quick_opt_1bhk: "شقة غرفة نوم واحدة",
    quick_opt_2bhk: "شقة غرفتي نوم",
    quick_opt_other: "أخرى",
    quick_label_message: "الرسالة",
    quick_btn_submit: "إرسال الاستعلام",

    // Invest Intro Brand
    invest_intro_after_brand:
      " هو أحد المشاريع القليلة المخططة على الجزر في البحر الأسود، ويوفر فرصًا استثمارية حصرية مستوحاة من وجهات عالمية مثل ",
    invest_intro_and: " و ",
    invest_intro_ending:
      "، مما يقدم قيمة استثنائية طويلة الأمد وندرة حقيقية في الواجهة البحرية.",

    // Investment section
    section_invest_title: "لماذا تستثمر في Batumi Island Estates؟",

    invest_card1_title: "عوائد مرتفعة (ROI)",
    invest_card1_body:
      "يدعم النمو السريع لقطاع السياحة والترفيه والألعاب في باتومي عوائد إيجارية قوية، خاصة للعقارات الفاخرة على الجزر المطلة على البحر.",

    invest_card2_title: "الإقامة الذهبية",
    invest_card2_body:
      "الاستثمارات الاستراتيجية في جورجيا قد توفر فرص إقامة طويلة الأمد وهيكل ملكية بسيط وموقعًا مثاليًا بين أوروبا والشرق الأوسط وآسيا.",

    invest_card3_title: "موقع جزيرة مميز",
    invest_card3_body:
      "استمتع بوصول مباشر للبحر الأسود، ممشى شاطئي، نوادي شاطئية ومرافق مارينا — مما يعزز جاذبية نمط الحياة وقيمة العقار.",

    invest_wc_title: "فرصة استثمارية عالمية المستوى على البحر الأسود",

    invest_card4_title: "أول مشروع ضخم من نوعه",
    invest_card4_body:
      "أحد المشاريع القليلة ذات المستوى العالمي على الجزر في البحر الأسود — وجهة فريدة لا مثيل لها في أوروبا أو آسيا.",

    invest_card5_title: "معروض محدود للغاية",
    invest_card5_body:
      "على عكس العقارات داخل المدن، فإن عقارات الجزر محدودة بطبيعتها، ما يعزز الندرة والطلب وقيمة إعادة البيع.",

    invest_card6_title: "مخطط فاخر مستوحى من دبي",
    invest_card6_body:
      "تم تطويره بفلسفة مماثلة لمشاريع الجزر الشهيرة في دبي — شواطئ خاصة، مراسي يخوت، فنادق فاخرة وتجارة راقية.",

    invest_card7_title: "منظومة منتجعات 5 نجوم",
    invest_card7_body:
      "ضيافة عالمية، مطاعم راقية، نوادي شاطئية، مراكز عافية وترفيه — جميعها ترفع قيمة كل وحدة سكنية.",

    invest_card8_title: "مارينا خاصة وإمكانية الوصول لليخوت",
    invest_card8_body:
      "الوصول المباشر لمارينا عالمية يزيد الجاذبية السياحية والدخل التأجيري.",

    invest_card9_title: "نمو قوي في قيمة العقار",
    invest_card9_body:
      "يستفيد المستثمرون الأوائل أكثر مع تطور الجزر إلى وجهة عالمية للسياحة والرفاهية.",

    invest_card10_title: "عوائد بالعملات الصعبة",
    invest_card10_body:
      "احصل على دخل من السياح الدوليين بأسعار إيجار مرتفعة، خصوصاً من أوروبا والشرق الأوسط.",

    invest_card11_title: "أهمية استراتيجية متنامية",
    invest_card11_body:
      "تتطور جورجيا لتصبح مركزًا مهمًا للأعمال والسياحة والترفيه في البحر الأسود — ما يدعم القيمة المستقبلية.",

    invest_card12_title: "لا توجد ضريبة سنوية على الملكية",
    invest_card12_body:
      "تقدم جورجيا بيئة استثمارية ممتازة بدون ضرائب سنوية على العقارات المملوكة للأفراد.",

    // Transformation strip
    transformation_title: "تحول باتومي الفاخر",
    transformation_body:
      "تتحول باتومي من مدينة ساحلية موسمية إلى مركز فاخر للترفيه طوال العام. الفنادق الخمس نجوم، الكازينوهات، السكن الراقي والتطورات العالمية يعيدون تشكيل الواجهة البحرية.",

    // Property types
    property_types_title: "أنواع عقاراتنا",

    // Property cards
    property_studio_title: "شقق استوديو فاخرة",
    property_1bhk_title: "شقق فاخرة غرفة نوم واحدة",
    property_2bhk_title: "شقق فاخرة غرفتي نوم",

    property_studio_feat_seaview: "إطلالة على البحر",
    property_studio_feat_smarthome: "منزل ذكي",

    property_1bhk_feat_panoramic: "إطلالة بانورامية",
    property_1bhk_feat_luxurybath: "حمام فاخر",
    property_1bhk_feat_smarthome: "منزل ذكي",

    property_2bhk_feat_mastersuite: "جناح رئيسي",
    property_2bhk_feat_gourmetkitchen: "مطبخ فاخر",
    property_2bhk_feat_walkin: "غرفة ملابس",

    property_card_description:
      "اكتشف وحدات سكنية مصممة بعناية داخل مشروع الجزر الأيقوني في باتومي.",
    property_card_button: "طلب التفاصيل",

    // Contact CTA
    contact_cta_title: "هل أنت مستعد لامتلاك جنتك على الجزيرة؟",
    contact_cta_sub:
      "تواصل مع فريقنا اليوم لحجز زيارة أو للحصول على مزيد من المعلومات.",
    contact_cta_call_btn: "اتصل +995 574 100 645",
    contact_cta_email_btn: "أرسل بريدًا إلكترونيًا",

    // LIFE IN GEORGIA – Hero
    life_hero_title: "الحياة في جورجيا",
    life_hero_body:
      "مزيج نابض بالحياة من اللمسة الأوروبية، الحياة الساحلية، الضيافة الجورجية الدافئة، ونمط الحياة المتطور — بيئة مثالية للسكان والمستثمرين الدوليين.",
    life_hero_btn_lifestyle: "استكشاف نمط الحياة الجورجي",
    life_hero_btn_alignment: "جورجيا وأوروبا: نقاط الالتقاء",

    // Lifestyle intro
    life_lifestyle_title: "جورجيا: حيث تلتقي الطبيعة بالحياة العصرية",
    life_lifestyle_body:
      "تقدم جورجيا تجربة معيشية استثنائية — مزيج بين الطبيعة البكر، الثقافة العريقة والاقتصاد الحديث سريع النمو.",

    // Lifestyle cards
    life_card1_title: "جمال طبيعي مذهل",
    life_card1_body:
      "جبال مغطاة بالثلوج، غابات قديمة، بحيرات صافية وسواحل خلابة.",

    life_card2_title: "أسلوب حياة أوروبي حديث",
    life_card2_body:
      "مقاهٍ عصرية، مدارس دولية، مراكز أعمال حديثة وإنترنت سريع.",

    life_card3_title: "مركز متنامٍ للتكنولوجيا",
    life_card3_body:
      "تجذب جورجيا الشركات الناشئة والمستثمرين بفضل الضرائب المنخفضة والبيئة المبتكرة.",

    life_card4_title: "موقع استراتيجي",
    life_card4_body:
      "بين أوروبا وآسيا — مركز مهم للتجارة والسفر والأعمال.",

    life_card5_title: "ثقافة مضيافة",
    life_card5_body:
      "ضيافة جورجية دافئة وشعور قوي بالأمان للمقيمين والزوار.",

    life_card6_title: "فرص نمو كبيرة",
    life_card6_body:
      "السياحة، الاستثمار والنمو الحضري يجعلون جورجيا سوقًا واعدًا.",

    // Culture section
    life_culture_title: "استمتع بالثقافة والتراث الجورجي",
    life_culture_body:
      "ثقافة جورجيا تتجسد في الموسيقى، الرقص، النبيذ والأسلوب المعماري الفريد الذي يمزج القديم بالجديد.",

    life_culture_slide1_title: "الرقص الجورجي التقليدي",
    life_culture_slide1_body:
      "احتفال فني بالشجاعة والأناقة والهوية الوطنية.",

    life_culture_slide2_title: "ثقافة النبيذ القديمة",
    life_culture_slide2_body:
      "موطن أقدم صناعة نبيذ في العالم — 8000 عام من الحرفة.",

    life_culture_slide3_title: "جمال عمارة تبليسي",
    life_culture_slide3_body:
      "مزيج بين الشوارع التاريخية والحداثة والحياة النابضة.",

    life_culture_slide4_title: "جمال باتومي الساحلي",
    life_culture_slide4_body:
      "وجهة ساحلية حديثة تجمع بين الثقافة والعمارة والحياة الراقية.",

    // Alignment section
    life_align_title:
      "كيف تتماشى جورجيا مع أسلوب الحياة الأوروبي الحديث",
    life_align_body:
      "تزداد ارتباطًا بأوروبا اقتصاديًا وسياحيًا مع الحفاظ على هويتها وثقافتها.",

    life_align_card1_title: "أسلوب حياة أوروبي بتكلفة أقل",
    life_align_card1_body:
      "مقاهٍ، أحياء قابلة للمشي ومدارس دولية — بأسعار معيشية أقل بكثير.",

    life_align_card2_title: "اتصال سياحي متزايد",
    life_align_card2_body:
      "رحلات مباشرة واتصال قوي مع المدن الأوروبية.",

    life_align_card3_title: "صديقة للمستثمر ورؤية طويلة الأمد",
    life_align_card3_body:
      "ملكية واضحة وإجراءات بسيطة واستراتيجية سياحية قوية.",

    life_align_card4_title: "عمق ثقافي وطموح حديث",
    life_align_card4_body:
      "تراث غني يجتمع مع الضيافة الحديثة والمشاريع السياحية.",

    // CTA section
    life_cta_title: "اكتشف كيف تعزز الحياة في جورجيا استثمارك",
    life_cta_body:
      "اجمع بين جاذبية العيش في جورجيا والقوة الاستثمارية في مشروع Batumi Island Estates.",
    life_cta_btn: "عودة إلى المميزات الاستثمارية",

    // Contact form
    contact_title: "اطلب معلومات استثمارية مفصلة",
    contact_subtitle:
      "أدخل معلوماتك وسيتواصل فريقنا معك بالمخططات والعوائد والتسعير والتوافر.",
    contact_label_fullname: "الاسم الكامل *",
    contact_label_email: "البريد الإلكتروني",
    contact_ph_email: "you@example.com",
    contact_label_country_code: "رمز الدولة *",
    contact_cc_help:
      "اكتب اسم بلدك أو رمز الاتصال الدولي.",
    contact_label_phone: "رقم الهاتف *",
    contact_label_apartment_type: "نوع الشقة",
    contact_select_type: "اختيار",
    contact_label_budget: "الميزانية التقريبية (USD)",
    contact_ph_budget: "مثال: 150,000",
    contact_label_message: "الرسالة / المتطلبات",
    contact_ph_message:
      "أخبرنا بأهدافك الاستثمارية وتوقعات الإيجار وغيرها.",

    // Enquiry messages
    enquiry_btn_submit: "إرسال",
    enquiry_btn_sending: "جارٍ الإرسال...",
    enquiry_validation: "الرجاء إدخال الاسم ورقم الهاتف.",
    enquiry_status_dryrun:
      "شكرًا لك. تم استلام طلبك (وضع الاختبار).",
    enquiry_status_success:
      "شكرًا لك. تم استلام طلبك وسنتواصل معك قريبًا.",
    enquiry_status_error:
      "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",

    // Testimonials
    testimonials_title: "ماذا يقول مستثمرونا",

    testimonial1_name: "Olivia K.",
    testimonial1_role: "مستثمرة من لندن، المملكة المتحدة",
    testimonial1_text:
      "“يقدم المشروع كل ما كنت أبحث عنه — إطلالة بحرية، عوائد إيجارية ممتازة وخدمة بمستوى كونسييرج.”",

    testimonial2_name: "Rahul S.",
    testimonial2_role: "مستثمر NRI من دبي",
    testimonial2_text:
      "“فرصة آمنة وذات نمو عالٍ خارج الأسواق التقليدية. كانت جورجيا خيارًا واضحًا.”",

    testimonial3_name: "Maria P.",
    testimonial3_role: "مشتري منزل عطلات من أثينا",
    testimonial3_text:
      "“التشطيبات والإطلالات تضاهي أفضل المنتجعات الأوروبية.”",

    // Project Details
    project_hero_title: "Batumi Island Estates",
    project_hero_subtitle:
      "عش مستقبل الرفاهية البحرية — جسور وقنوات ومنتجعات وحياة جزرية.",

    project_progress_title: "تقدم البناء المباشر",
    project_progress_body:
      "يعرض الفيديو أعلاه التقدم في البنية التحتية والجسور والمسطحات الخضراء والمناطق السكنية الفاخرة.",

    project_islandvision_title: "رؤية الجزيرة بعد الإنجاز",
    project_islandvision_body:
      "اكتشف كيف ستتحول الجزر إلى مجتمع فاخر متكامل على الواجهة البحرية.",

    project_slide1_tag: "ممشى الواجهة البحرية",
    project_slide1_title: "أبراج مطلة على البحر وحياة المارينا",
    project_slide1_body:
      "أبراج بانورامية بإطلالة بحرية مع وصول خاص للمارينا.",

    project_slide2_tag: "ميزات المنتجع",
    project_slide2_title: "مسابح إنفينيتي وتراسات خضراء",
    project_slide2_body:
      "تراسات مرتفعة ومسارات خضراء للاسترخاء.",

    project_slide3_tag: "أفق ليلي",
    project_slide3_title: "حياة مضيئة على الواجهة البحرية",
    project_slide3_body:
      "الجزيرة متألقة تحت السماء الليلية.",

    project_slide4_tag: "أسلوب حياة البوليڤارد",
    project_slide4_title: "مقاهي · متاجر · ممشى الجزيرة",
    project_slide4_body:
      "بوليڤارد فاخر يقدم تجربة معيشية راقية.",

    // Brochure
    brochure_title: "تحميل البروشور الرسمي للمشروع",
    brochure_subtitle: "أدخل بريدك الإلكتروني لاستلامه فورًا.",
    brochure_ph_email: "أدخل بريدك الإلكتروني",
    brochure_btn: "تحميل البروشور",

    brochure_msg_empty: "يرجى إدخال البريد الإلكتروني.",
    brochure_msg_sending: "جارٍ الإرسال...",
    brochure_msg_success: "تم إرسال البروشور! يرجى التحقق من بريدك.",
    brochure_msg_error: "خطأ في الإرسال. حاول مرة أخرى.",
    brochure_msg_network: "خطأ في الشبكة. حاول لاحقًا.",

    // Google Meet section
    gmeet_title: "احجز استشارة عبر Google Meet",
    gmeet_body:
      "احجز جلسة استشارية شخصية مع فريقنا لمناقشة تفاصيل المشروع وخطط الاستثمار.",
    gmeet_btn: "حجز Google Meet",

    // About page
    about_hero_title: "عن Batumi Island Estates",
    about_hero_subtitle:
      "قسم فاخر متخصص من Batumi Estates مكرس للعقارات الشاطئية والفاخرة على الجزر.",

    about_intro_title: "حيث تبدأ الحياة الاستثنائية",
    about_intro_p1:
      "تأسست Batumi Estates عام 2022 بهدف تقديم خدمات استشارية شفافة ومخصصة للمستثمرين الدوليين.",
    about_intro_p2:
      "في عام 2024 أطلقنا Batumi Island Estates — القسم المتخصص في مشروع الجزر الفاخرة الأول من نوعه في جورجيا.",
    about_intro_p3:
      "مع أكثر من 100 مستثمر عالمي، نواصل بناء الثقة والتميز في كل خطوة استثمارية.",

    about_journey_title: "رحلتنا",
    about_journey_2022_title: "2022 — التأسيس",
    about_journey_2022_body: "بداية رؤيتنا لتغيير سوق العقارات في جورجيا.",
    about_journey_2023_title: "2023 — التوسع العالمي",
    about_journey_2023_body: "الوصول إلى مستثمرين من أكثر من 25 دولة.",
    about_journey_2024_title: "2024 — إطلاق القسم الخاص بالجزر",
    about_journey_2024_body:
      "إطلاق قسم متخصص لمشروع الجزر الفاخرة.",
    about_journey_2025_title: "2025 — أكثر من 100 مستثمر عالمي",
    about_journey_2025_body:
      "عام من النمو السريع وتوسّع قاعدة المستثمرين.",

    about_why_title: "لماذا يختارنا المستثمرون؟",
    about_why_card1_title: "خبرة في العقارات الفاخرة",
    about_why_card1_body:
      "متخصصون في الاستثمارات الساحلية ومشاريع الجزر.",
    about_why_card2_title: "دعم شامل",
    about_why_card2_body:
      "دعم قانوني، جولات، توثيق وخدمات ما بعد البيع.",
    about_why_card3_title: "ثقة عالمية",
    about_why_card3_body:
      "مستثمرون من أكثر من 30 دولة يعتمدون على خدماتنا.",

    about_testimonials_title: "آراء المستثمرين",
    about_testimonial1_text:
      "“تجربة استثمارية سلسة وخدمة احترافية في كل خطوة.”",
    about_testimonial1_role:
      "— دانيال م., المملكة المتحدة • قطاع التكنولوجيا",
    about_testimonial2_text:
      "“اشتريت استوديو فاخر في الجزيرة. فريق رائع وخدمة شفافة.”",
    about_testimonial2_role: "— سارة ك., الإمارات",
    about_testimonial3_text:
      "“خدمة ممتازة ونصائح قيمة للمستثمرين الدوليين.”",
    about_testimonial3_role: "— لوكا ر., إيطاليا",
    about_testimonial4_text:
      "“أفضل وكالة في جورجيا — احترافية ومصداقية عالية.”",
    about_testimonial4_role: "— عائشة م., قطر",
    about_testimonial5_text:
      "“عملية شراء سلسة حتى في حالات التوقيع عن بُعد!”",
    about_testimonial5_role: "— كارلوس د., البرازيل",
    about_testimonial6_text:
      "“خبرتهم في سوق الرفاهية في باتومي لا مثيل لها.”",
    about_testimonial6_role: "— هيلين س., فرنسا",
    about_testimonial7_text:
      "“الأفضل للمستثمرين الجدد. فريق موثوق للغاية.”",
    about_testimonial7_role: "— أمير ح., السعودية",

    // Brand
    brand_title: "Batumi Island Estates",
    brand_tagline: "إقامات فاخرة على الجزر",

    // Footer
    footer_brand_desc:
      "استوديوهات وشقق فاخرة على الجزر الأكثر تميزًا في جورجيا، مع إمكانات استثمار قوية.",

    footer_nav_title: "التصفح",
    footer_nav_home: "الرئيسية",
    footer_nav_why_batumi: "لماذا باتومي؟",
    footer_nav_properties: "العقارات",
    footer_nav_enquiry: "نموذج الاستعلام",

    footer_contact_title: "اتصال",
    footer_contact_name: "Batumi Island Estates",
    footer_contact_address_line1:
      "18 Andria Pirveltsodebuli Highway III Deadlock gonio",
    footer_contact_address_line2: "باتومي، جورجيا",
    footer_contact_phone: "+995 574 100 645",
    footer_contact_email: "info@batumiislandestates.com",

    footer_bottom_rights:
      "© 2025 Batumi Island Estates. جميع الحقوق محفوظة.",
    footer_bottom_privacy: "سياسة الخصوصية",
    footer_bottom_terms: "الشروط"
  },

};

// Normalize language codes (support variations like RU, ru-RU, ge-GE, etc.)
function normalizeLang(lang) {
  if (!lang) return "en";

  const v = lang.toString().trim().toLowerCase();

  // Map common variants to our internal codes
  if (v === "ka" || v === "ge" || v.startsWith("ge")) return "ge";
  if (v === "ru" || v.startsWith("ru")) return "ru";
  if (v === "tr" || v.startsWith("tr")) return "tr";
  if (v === "kk" || v.startsWith("kk")) return "kk";
  if (v === "en" || v.startsWith("en")) return "en";

  // Fallback: try dictionary key directly, else EN will be used later
  return v;
}

function applyLanguage(lang) {
  const code = normalizeLang(lang);
  BIE_CURRENT_LANG = code;

  const dict = BIE_TRANSLATIONS[code] || BIE_TRANSLATIONS.en;

  // Text content
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Placeholders
  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-placeholder");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedRaw = localStorage.getItem("bie_lang") || "en";
  const currentLang = normalizeLang(savedRaw);
  const selectors = document.querySelectorAll(".js-language-selector");

  // Initialize selectors
  selectors.forEach((sel) => {
    sel.value = currentLang;
    sel.addEventListener("change", (e) => {
      const newCode = normalizeLang(e.target.value || "en");
      localStorage.setItem("bie_lang", newCode);

      // Sync all dropdowns
      selectors.forEach((s2) => {
        s2.value = newCode;
      });

      // Apply translation
      applyLanguage(newCode);
    });
  });

  // Initial load
  applyLanguage(currentLang);
});

let BIE_CURRENT_LANG = "en";

function bieT(key, fallback) {
  const code = BIE_CURRENT_LANG || "en";
  const dict = BIE_TRANSLATIONS[code] || BIE_TRANSLATIONS.en || {};
  if (dict[key]) return dict[key];
  if (BIE_TRANSLATIONS.en && BIE_TRANSLATIONS.en[key]) {
    return BIE_TRANSLATIONS.en[key];
  }
  return fallback || key;
}
