/* =====================================================================
   COMPANY PAGE TEMPLATE
   Copy this folder, rename it (e.g. /samsung/), and fill in the details.
   ===================================================================== */
window.COMPANY = {
  name: "COMPANY_NAME",
  role: "Role Title, KSA",           // shown in the prepared badge & HUD
  accent: "#5E9FE8",                 // brand hex; overrides the default blue
  logo: "../assets/logos/companies/company-slug.png",  // optional

  // Names to hide from the ecosytem & alliance slides (e.g. competitors)
  exclude: [],

  // Remove whole slides by id (see content/profile.js for all ids)
  remove: [],

  // Patch any base slide: keys must match slide ids in profile.js
  override: {
    // closing: { headline: "Let's build X together.", lead: "..." }
  },

  // Insert company-specific slides before or after an existing slide id
  insert: [
    { before: "closing", slides: [
      {
        id: "why", type: "why",
        chapter: "Why COMPANY_NAME",
        headline: "Why this role, why now.",
        points: [
          { t: "Reason 1", d: "Detail that ties your background to this company's need." },
          { t: "Reason 2", d: "Another concrete reason." },
          { t: "Reason 3", d: "Third point." }
        ]
      },
      {
        id: "match", type: "match",
        chapter: "Your role, my record",
        headline: "What the role asks for — and where I've already delivered it.",
        leftLabel: "From the job description",
        rightLabel: "Proof",
        rows: [
          { need: "Requirement from JD", proof: "Your matching achievement." },
          { need: "Requirement from JD", proof: "Your matching achievement." },
          { need: "Requirement from JD", proof: "Your matching achievement." }
        ]
      }
    ]}
  ]
};
