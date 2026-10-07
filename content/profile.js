/* =====================================================================
   PROFILE CONTENT — edit text here. Every slide is one object.
   - "id" lets company pages insert/remove/override slides.
   - "morph" keys: elements with the same key on two consecutive slides
     morph (Keynote "Magic Move" style) into each other.
   - Logos: drop files into /assets/logos/... and set the "logo" path.
     If a file is missing, a clean text wordmark is shown instead.
   ===================================================================== */
window.PROFILE = {
  name: "Mohammed Ahmed Siddiqui",
  short: "M. A. Siddiqui",
  accent: "#5E9FE8",
  contact: {
    email: "mahs545@gmail.com",
    phone: "+966 55 167 5320",
    linkedin: "linkedin.com/in/mohammed-ahmed-siddiqui",
    location: "Riyadh, Saudi Arabia"
  },

  slides: [
    {
      id: "intro", type: "intro",
      kicker: "Channel Business Development · Riyadh",
      title: "Mohammed Ahmed Siddiqui",
      lead: "I build the partner ecosystems that move storage, data-center and surveillance infrastructure across Saudi Arabia.",
      stats: [
        { morph: "target",   value: "117%",    label: "of annual target" },
        { morph: "pipeline", value: "$35M",    label: "pipeline built" },
        { morph: "sis",      value: "50+",     label: "system integrators" },
        { morph: "revenue",  value: "SAR 4M+", label: "closed at Nuevo" }
      ]
    },

    {
      id: "target", type: "stat",
      chapter: "01 — Promise Technology",
      morph: "target", value: 117, suffix: "%",
      headline: "One person. One Kingdom. Target exceeded.",
      body: "As Promise Technology's sole in-Kingdom representative, I beat the previous annual target of USD 1.5M — and now carry USD 2.4M a year.",
      facts: [
        { k: "USD 1.5M", v: "previous annual target" },
        { k: "USD 2.4M", v: "current annual target" },
        { k: "USD 600K", v: "per quarter" }
      ]
    },

    {
      id: "pipeline", type: "pipeline",
      chapter: "02 — Pipeline",
      shelf: ["target"],
      morph: "pipeline",
      headline: "From $15M to $35M in identified opportunity.",
      from: 15, to: 35, unit: "M", prefix: "$",
      selfSourced: 80,
      sources: ["PIF entities", "Government ministries", "Hyperscale data centers", "Airports", "Giga-projects"]
    },

    {
      id: "ecosystem", type: "network",
      chapter: "03 — Ecosystem",
      shelf: ["target", "pipeline"],
      morph: "sis", value: "50+",
      headline: "A network of 50+ system integrators, orchestrated.",
      body: "Tier-1 enterprise integrators, specialised ELV & security partners, and value-added distributors — aligned on pricing, forecasting and logistics.",
      center: { name: "Me", logo: "" },
      rings: [
        { label: "Tier-1 integrators", items: [
          { name: "stc solutions", logo: "assets/logos/partners/stc-solutions.png" },
          { name: "3S", logo: "assets/logos/partners/3s.png" },
          { name: "Futuretech ICT", logo: "assets/logos/partners/futuretech.png" },
          { name: "Abana", logo: "assets/logos/partners/abana.png" },
          { name: "Seder Group", logo: "assets/logos/partners/seder.png" }
        ]},
        { label: "ELV, security & distribution", items: [
          { name: "KAES", logo: "assets/logos/partners/kaes.png" },
          { name: "Secutronic", logo: "assets/logos/partners/secutronic.png" },
          { name: "Black Arrow", logo: "assets/logos/partners/black-arrow.png" },
          { name: "Awajem", logo: "assets/logos/partners/awajem.png" },
          { name: "Anixter", logo: "assets/logos/partners/anixter.png" },
          { name: "Aligntech", logo: "assets/logos/partners/aligntech.png" }
        ]}
      ]
    },

    {
      id: "alliances", type: "logos",
      chapter: "04 — Technology alliances",
      shelf: ["target", "pipeline", "sis"],
      headline: "Validated architectures with the brands end users already trust.",
      body: "I coordinate OEM alliances so storage, cameras, VMS and networking arrive as one tested solution.",
      items: [
        { name: "Western Digital", logo: "assets/logos/oems/western-digital.png", tag: "Storage" },
        { name: "Seagate", logo: "assets/logos/oems/seagate.png", tag: "Storage" },
        { name: "Toshiba", logo: "assets/logos/oems/toshiba.png", tag: "Storage" },
        { name: "Axis Communications", logo: "assets/logos/oems/axis.png", tag: "Cameras" },
        { name: "Bosch", logo: "assets/logos/oems/bosch.png", tag: "Cameras" },
        { name: "Hanwha Vision", logo: "assets/logos/oems/hanwha.png", tag: "Cameras" },
        { name: "Milestone Systems", logo: "assets/logos/oems/milestone.png", tag: "VMS" },
        { name: "Genetec", logo: "assets/logos/oems/genetec.png", tag: "VMS" },
        { name: "Digifort", logo: "assets/logos/oems/digifort.png", tag: "VMS" },
        { name: "Allied Telesis", logo: "assets/logos/oems/allied-telesis.png", tag: "Networking" }
      ]
    },

    {
      id: "deals", type: "deals",
      chapter: "05 — Closed this fiscal year",
      headline: "Above USD 200K closed — from design stage to award.",
      body: "End users, consultants, contractors and integrators onboarded; multiple submittal and revision cycles managed through to award.",
      items: [
        { tag: "PIF-related", title: "Major entertainment project", note: "Spec'd at design stage, carried through submittals" },
        { tag: "Hospitality", title: "Luxury development, Diriyah", note: "Consultant-led, multi-revision approval" },
        { tag: "Government", title: "Sports facility, Western Region", note: "Semi-government procurement to award" }
      ]
    },

    {
      id: "nuevo", type: "ranking",
      chapter: "06 — Nuevo, Apple Authorized Reseller",
      morph: "revenue", value: "SAR 4M+",
      headline: "Closed revenue across enterprise & mid-market.",
      months: ["Sep 2023", "Oct 2023", "Jan 2024"],
      monthsLabel: "Ranked #1 by monthly sales value",
      largest: { value: "SAR 1.25M", label: "largest single deal of the tenure" }
    },

    {
      id: "journey", type: "timeline",
      chapter: "07 — The journey",
      headline: "Eight years, one direction: closer to the infrastructure.",
      items: [
        { year: "2014", role: "BTech, Electronics & Communications", org: "JNTU Hyderabad", logo: "" },
        { year: "2017", role: "MSc Telecommunications Engineering", org: "King Saud University", logo: "assets/logos/companies/ksu.png" },
        { year: "2018", role: "Business Development Executive", org: "Telebu Communications", logo: "assets/logos/companies/telebu.png" },
        { year: "2020", role: "Sales Development Representative", org: "Mastt", logo: "assets/logos/companies/mastt.png" },
        { year: "2023", role: "Sales Engineer, Enterprise Accounts", org: "Nuevo", logo: "assets/logos/companies/nuevo.png" },
        { year: "2025", role: "Business Development Manager, KSA", org: "Promise Technology", logo: "assets/logos/companies/promise.png", current: true }
      ]
    },

    {
      id: "playbook", type: "process",
      chapter: "08 — How I win",
      headline: "I get in before the tender opens.",
      steps: [
        { t: "Prospect", d: "End users, consultants, partner referrals, tender intelligence" },
        { t: "Influence", d: "Shape BoMs, RFPs and specs at design stage" },
        { t: "Architect", d: "Validated OEM stack, NCA & PDPL aligned" },
        { t: "Orchestrate", d: "Right integrator, distributor and pricing protection" },
        { t: "Negotiate", d: "Pricing and margin management with every stakeholder" },
        { t: "Award", d: "Procurement through Etimad and Monafasat" }
      ]
    },

    {
      id: "compliance", type: "chips",
      chapter: "09 — Saudi market fluency",
      headline: "Compliance-led selling, in a regulated market.",
      groups: [
        { label: "Regulation", items: ["NCA ECC", "PDPL", "SAMA Cybersecurity Framework"] },
        { label: "Procurement", items: ["Etimad", "Monafasat", "RFP & tender shaping"] },
        { label: "Sectors", items: ["Government", "PIF ecosystem", "Giga-projects", "Data centers", "Airports", "Banking", "Healthcare"] }
      ]
    },

    {
      id: "moments", type: "gallery",
      chapter: "10 — On the ground",
      headline: "Where the market meets.",
      /* Add your photos to /assets/photos and list them here.
         Missing files show as a neutral tile with the caption. */
      items: [
        { src: "assets/photos/intersec-1.jpg", caption: "Intersec, Riyadh" },
        { src: "assets/photos/event-2.jpg", caption: "Partner enablement session" },
        { src: "assets/photos/event-3.jpg", caption: "Customer workshop" }
      ]
    },

    {
      id: "credentials", type: "credentials",
      chapter: "11 — Foundations",
      headline: "An engineer who sells.",
      cols: [
        { label: "Education", items: [
          { t: "MSc Telecommunications Engineering", d: "King Saud University · 2017" },
          { t: "BTech Electronics & Communications", d: "JNTU Hyderabad · 2014 · First Class with Distinction" }
        ]},
        { label: "Credentials", items: [
          { t: "Registered Engineer", d: "Saudi Council of Engineers · 2025" },
          { t: "SAP Certified Technology Associate", d: "SAP Solution Manager" },
          { t: "Jamf Certified Associate & Endpoint Security", d: "Jamf Ambassador · 2023" }
        ]},
        { label: "Languages", items: [
          { t: "English", d: "Professional" },
          { t: "Hindi & Urdu", d: "Native" },
          { t: "Arabic", d: "Conversational" },
          { t: "Iqama", d: "Valid & transferable · Saudi driving license" }
        ]}
      ]
    },

    {
      id: "closing", type: "closing",
      kicker: "Next chapter",
      headline: "Let's build what's next.",
      lead: "Channel strategy, ecosystem orchestration and design-stage selling — ready from day one in Riyadh."
    }
  ]
};
