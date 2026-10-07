/* =====================================================================
   COMPANY PAGE: siddiqui.mscarabia.com/hikvision
   SAMPLE — replace the "match" rows with lines from the real job post.
   ===================================================================== */
window.COMPANY = {
  name: "Hikvision",
  role: "Channel Business Development, KSA",
  accent: "#E8362D",
  logo: "../assets/logos/companies/hikvision.png",

  // Hide partner names that would be awkward in this interview (competitors)
  exclude: ["Axis Communications", "Bosch", "Hanwha Vision"],

  // Remove whole slides by id
  remove: [],

  // Tweak any base slide by id
  override: {
    alliances: { headline: "Storage, VMS and networking that complete every video project." },
    closing:   { headline: "Let's grow Hikvision's channel in the Kingdom.",
                 lead: "The integrators, the consultants and the tenders — I already work with them every week." }
  },

  // Add tailored slides
  insert: [
    { before: "closing", slides: [
      {
        id: "why", type: "why",
        chapter: "Why Hikvision",
        headline: "The partner network is already warm.",
        points: [
          { t: "Video lives on storage", d: "I sell the storage layer behind surveillance projects — the place every Hikvision camera ultimately records to." },
          { t: "Same integrators, same tenders", d: "stc solutions, 3S, KAES, Secutronic and 45+ others — the SIs who deliver Hikvision projects across the Kingdom." },
          { t: "In the room at design stage", d: "Consultant relationships across PIF, giga-project and government work, where specifications are written." }
        ]
      },
      {
        id: "match", type: "match",
        chapter: "Your role, my record",
        headline: "What the role asks for — and where I've already delivered it.",
        leftLabel: "From the job description",
        rightLabel: "Proof",
        rows: [
          { need: "Grow & manage the SI and distributor channel", proof: "Orchestrate 50+ Tier-1, Tier-2 and ELV integrators; VAD relationships with Anixter and Aligntech." },
          { need: "Win government & giga-project business", proof: "Pipeline grown from $15M to $35M across PIF entities, ministries, airports and giga-projects." },
          { need: "Deliver revenue targets", proof: "117% of a USD 1.5M target as sole Kingdom rep; now carrying USD 2.4M." },
          { need: "Get specified by consultants", proof: "Influence BoMs, RFPs and tender specs before competitive evaluation opens." },
          { need: "Handle public procurement", proof: "Full cycle through Etimad and Monafasat, NCA and PDPL aligned." }
        ]
      }
    ]}
  ]
};
