/* Story deck engine — no dependencies. */
(function () {
  const P = window.PROFILE, C = window.COMPANY || null;
  const BASE = window.SITE_BASE || "";            // "../" on company pages
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const src = p => (!p ? "" : /^(https?:|data:|\/)/.test(p) ? p : BASE + p);

  /* ---------- 1. Build slide list (base + company tailoring) ---------- */
  let slides = JSON.parse(JSON.stringify(P.slides));
  if (C) {
    (C.remove || []).forEach(id => slides = slides.filter(s => s.id !== id));
    Object.entries(C.override || {}).forEach(([id, patch]) => {
      const s = slides.find(x => x.id === id); if (s) Object.assign(s, patch);
    });
    (C.exclude || []).forEach(name => slides.forEach(s => {
      if (s.items) s.items = s.items.filter(i => i.name !== name);
      if (s.rings) s.rings.forEach(r => r.items = r.items.filter(i => i.name !== name));
    }));
    (C.insert || []).forEach(ins => {
      const i = slides.findIndex(s => s.id === (ins.before || ins.after));
      const at = i < 0 ? slides.length : ins.before ? i : i + 1;
      slides.splice(at, 0, ...ins.slides);
    });
    if (C.accent) document.documentElement.style.setProperty("--accent", C.accent);
  }
  if (P.accent && !(C && C.accent)) document.documentElement.style.setProperty("--accent", P.accent);

  /* ---------- 2. Renderers ---------- */
  const A = (html, cls = "", extra = "") => `<div class="${cls}" data-a ${extra}>${html}</div>`;
  const logo = (it, cls = "logo") => {
    const fallback = `<span class="wordmark">${esc(it.name)}</span>`;
    return it.logo
      ? `<span class="${cls}"><img src="${esc(src(it.logo))}" alt="${esc(it.name)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'wordmark',textContent:this.alt}))"></span>`
      : `<span class="${cls}">${fallback}</span>`;
  };
  const chapter = s => s.chapter ? A(esc(s.chapter), "chapter") : "";
  const shelf = s => !s.shelf ? "" : `<div class="shelf">${s.shelf.map(k => {
    const st = P.slides[0].stats.find(x => x.morph === k);
    return st ? `<div class="shelf-chip" data-a><b data-morph="${k}">${esc(st.value)}</b><span>${esc(st.label)}</span></div>` : "";
  }).join("")}</div>`;
  const prepared = () => !C ? "" :
    `<div class="prepared" data-a>Prepared for ${C.logo ? logo({ name: C.name, logo: C.logo }, "prep-logo") : ""}<b>${esc(C.name)}</b>${C.role ? `<span>· ${esc(C.role)}</span>` : ""}</div>`;

  const R = {
    intro: s => `
      <div class="intro">
        ${prepared()}
        ${A(esc(s.kicker), "kicker")}
        <h1 class="display" data-a>${esc(s.title).replace(" ", "<br>")}</h1>
        ${A(esc(s.lead), "lead")}
        <div class="stat-row">${s.stats.map(st => `
          <div class="stat-cell" data-a><div class="stat-v" data-morph="${st.morph}">${esc(st.value)}</div><div class="stat-l">${esc(st.label)}</div></div>`).join("")}
        </div>
      </div>`,

    stat: s => `
      <div class="split">
        <div class="hero-num-wrap">
          ${chapter(s)}
          <div class="hero-num" data-morph="${s.morph}"><span data-count="${s.value}">${s.value}</span>${esc(s.suffix || "")}</div>
        </div>
        <div class="split-text">
          <h2 data-a>${esc(s.headline)}</h2>
          ${A(esc(s.body), "body")}
          <div class="facts">${s.facts.map(f => A(`<b>${esc(f.k)}</b><span>${esc(f.v)}</span>`, "fact")).join("")}</div>
        </div>
      </div>`,

    pipeline: s => `
      ${shelf(s)}
      <div class="stack">
        ${chapter(s)}
        <div class="pipe-head">
          <div class="hero-num md" data-morph="${s.morph}">${esc(s.prefix)}<span data-count="${s.to}" data-from="${s.from}">${s.to}</span>${esc(s.unit)}</div>
          <h2 data-a>${esc(s.headline)}</h2>
        </div>
        <div class="bars" data-a>
          <div class="bar-row"><span class="bar-l">Starting point</span><div class="bar"><i style="--w:${s.from / s.to * 100}%"></i></div><b>${s.prefix}${s.from}${s.unit}</b></div>
          <div class="bar-row"><span class="bar-l">Today</span><div class="bar accent"><i style="--w:100%"></i></div><b>${s.prefix}${s.to}${s.unit}</b></div>
        </div>
        <div class="pipe-foot">
          <div class="ring-wrap" data-a>
            <svg viewBox="0 0 120 120" class="ring"><circle cx="60" cy="60" r="52"/><circle cx="60" cy="60" r="52" class="ring-fg" style="--p:${s.selfSourced}"/></svg>
            <div class="ring-t"><b><span data-count="${s.selfSourced}">${s.selfSourced}</span>%</b><span>self-sourced</span></div>
          </div>
          <div class="tags">${s.sources.map(t => A(esc(t), "tag")).join("")}</div>
        </div>
      </div>`,

    network: s => {
      const nodes = []; s.rings.forEach((r, ri) => r.items.forEach((it, i) => {
        const n = r.items.length, ang = (i / n) * Math.PI * 2 - Math.PI / 2 + ri * Math.PI / 6;
        const rad = ri === 0 ? 30 : 46;
        nodes.push({ it, x: 50 + Math.cos(ang) * rad, y: 50 + Math.sin(ang) * rad * 0.92, ri });
      }));
      return `
      ${shelf(s)}
      <div class="split net-split">
        <div class="split-text">
          ${chapter(s)}
          <div class="hero-num md" data-morph="${s.morph}">${esc(s.value)}</div>
          <h2 data-a>${esc(s.headline)}</h2>
          ${A(esc(s.body), "body")}
          <div class="legend" data-a>${s.rings.map((r, i) => `<span class="lg lg${i}">${esc(r.label)}</span>`).join("")}</div>
        </div>
        <div class="net" data-a>
          <svg class="net-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="50" cy="50" rx="30" ry="27.6"/><ellipse cx="50" cy="50" rx="46" ry="42.3"/>
            ${nodes.map((n, i) => `<line x1="50" y1="50" x2="${n.x}" y2="${n.y}" style="--d:${i * 60}ms"/>`).join("")}
          </svg>
          <div class="net-core"><span>${esc(P.short)}</span></div>
          ${nodes.map((n, i) => `<div class="node r${n.ri}" style="left:${n.x}%;top:${n.y}%;--d:${300 + i * 60}ms">${logo(n.it, "node-logo")}</div>`).join("")}
        </div>
      </div>`;
    },

    logos: s => `
      ${shelf(s)}
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        ${A(esc(s.body), "body")}
        <div class="logo-grid">${s.items.map(it => `<div class="logo-cell" data-a>${logo(it)}<em>${esc(it.tag || "")}</em></div>`).join("")}</div>
      </div>`,

    deals: s => `
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        ${A(esc(s.body), "body")}
        <div class="cards">${s.items.map((d, i) => `
          <div class="card" data-a><span class="card-n">0${i + 1}</span><span class="tag">${esc(d.tag)}</span><h3>${esc(d.title)}</h3><p>${esc(d.note)}</p></div>`).join("")}
        </div>
      </div>`,

    ranking: s => `
      <div class="split">
        <div class="hero-num-wrap">
          ${chapter(s)}
          <div class="hero-num sm" data-morph="${s.morph}">${esc(s.value)}</div>
          <h2 data-a>${esc(s.headline)}</h2>
        </div>
        <div class="split-text">
          ${A(esc(s.monthsLabel), "label")}
          <div class="medals">${s.months.map(m => `<div class="medal" data-a><b>#1</b><span>${esc(m)}</span></div>`).join("")}</div>
          <div class="fact big" data-a><b>${esc(s.largest.value)}</b><span>${esc(s.largest.label)}</span></div>
        </div>
      </div>`,

    timeline: s => `
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        <div class="tl" data-a><div class="tl-line"><i></i></div>
          ${s.items.map((t, i) => `
          <div class="tl-item ${t.current ? "now" : ""}" style="--d:${250 + i * 140}ms">
            <span class="tl-dot"></span><span class="tl-year">${esc(t.year)}</span>
            ${t.logo ? logo({ name: t.org, logo: t.logo }, "tl-logo") : `<span class="tl-logo"><span class="wordmark">${esc(t.org)}</span></span>`}
            <span class="tl-role">${esc(t.role)}</span>
          </div>`).join("")}
        </div>
      </div>`,

    process: s => `
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        <div class="steps">${s.steps.map((st, i) => `
          <div class="step" data-a><span class="step-n">${String(i + 1).padStart(2, "0")}</span><h3>${esc(st.t)}</h3><p>${esc(st.d)}</p></div>`).join("")}
        </div>
      </div>`,

    chips: s => `
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        <div class="chip-groups">${s.groups.map(g => `
          <div class="chip-group" data-a><div class="label">${esc(g.label)}</div><div class="tags">${g.items.map(t => `<span class="tag lg-tag">${esc(t)}</span>`).join("")}</div></div>`).join("")}
        </div>
      </div>`,

    gallery: s => `
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        <div class="gallery g${Math.min(s.items.length, 4)}">${s.items.map(g => `
          <figure class="ph" data-a><img src="${esc(src(g.src))}" alt="${esc(g.caption)}" onerror="this.parentNode.classList.add('missing');this.remove()"><span class="ph-hint">Add photo: ${esc(g.src)}</span><figcaption>${esc(g.caption)}</figcaption></figure>`).join("")}
        </div>
      </div>`,

    credentials: s => `
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        <div class="cols">${s.cols.map(c => `
          <div class="col" data-a><div class="label">${esc(c.label)}</div>${c.items.map(i => `<div class="cred"><b>${esc(i.t)}</b><span>${esc(i.d)}</span></div>`).join("")}</div>`).join("")}
        </div>
      </div>`,

    /* ---- company-specific slide types ---- */
    why: s => `
      <div class="split">
        <div class="hero-num-wrap">
          ${chapter(s)}
          ${C && C.logo ? `<div class="why-logo" data-a>${logo({ name: C.name, logo: C.logo }, "big-logo")}</div>` : ""}
          <h2 class="xl" data-a>${esc(s.headline)}</h2>
        </div>
        <div class="split-text">
          ${(s.points || []).map((p, i) => `<div class="why-pt" data-a><span class="step-n">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></div></div>`).join("")}
        </div>
      </div>`,

    match: s => `
      <div class="stack">
        ${chapter(s)}
        <h2 class="wide" data-a>${esc(s.headline)}</h2>
        <div class="match">
          <div class="match-h" data-a><span>${esc(s.leftLabel || "What you need")}</span><span>${esc(s.rightLabel || "Where I've done it")}</span></div>
          ${s.rows.map(r => `<div class="match-r" data-a><div class="need">${esc(r.need)}</div><div class="arrow">→</div><div class="proof">${esc(r.proof)}</div></div>`).join("")}
        </div>
      </div>`,

    closing: s => `
      <div class="closing">
        ${A(esc(s.kicker), "kicker")}
        <h1 class="display" data-a>${esc(s.headline)}</h1>
        ${A(esc(s.lead), "lead")}
        <div class="contact" data-a>
          <a href="mailto:${esc(P.contact.email)}">${esc(P.contact.email)}</a>
          <a href="tel:${esc(P.contact.phone.replace(/\s/g, ""))}">${esc(P.contact.phone)}</a>
          <a href="https://${esc(P.contact.linkedin)}" target="_blank" rel="noopener">${esc(P.contact.linkedin)}</a>
        </div>
      </div>`
  };

  /* ---------- 3. Mount ---------- */
  const deck = document.getElementById("deck");
  deck.innerHTML = slides.map((s, i) =>
    `<section class="slide t-${s.type}" data-i="${i}" aria-label="${esc(s.headline || s.title || s.id)}">${(R[s.type] || (() => ""))(s)}</section>`
  ).join("");
  const els = [...deck.querySelectorAll(".slide")];

  // HUD
  document.getElementById("hud-name").textContent = P.short;
  if (C) document.getElementById("hud-for").textContent = "for " + C.name;
  document.title = C ? `${P.name} × ${C.name}` : `${P.name} — Story`;
  const dots = document.getElementById("dots");
  dots.innerHTML = slides.map((s, i) => `<button aria-label="Go to slide ${i + 1}" data-go="${i}"></button>`).join("");
  const counter = document.getElementById("counter"), bar = document.getElementById("progress");

  // Background orb presets
  const BG = [
    [70, 30, 1.2, 18, 80, .9], [20, 70, 1.5, 80, 20, .7], [80, 75, 1, 30, 25, 1.1], [30, 25, 1.3, 75, 70, .8],
    [60, 60, 1.6, 15, 30, .7], [15, 30, 1.1, 85, 75, 1], [85, 20, 1.3, 40, 85, .8]
  ];
  const orbA = document.getElementById("orbA"), orbB = document.getElementById("orbB");
  function setBg(i) {
    const b = BG[i % BG.length];
    orbA.style.cssText = `left:${b[0]}%;top:${b[1]}%;transform:translate(-50%,-50%) scale(${b[2]})`;
    orbB.style.cssText = `left:${b[3]}%;top:${b[4]}%;transform:translate(-50%,-50%) scale(${b[5]})`;
  }

  /* ---------- 4. Engine ---------- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EASE = "cubic-bezier(.76,0,.24,1)", EASE_OUT = "cubic-bezier(.16,1,.3,1)";
  let cur = -1, busy = false;

  function countUp(el) {
    const to = parseFloat(el.dataset.count), from = parseFloat(el.dataset.from || 0);
    if (reduce || isNaN(to)) return;
    const t0 = performance.now(), dur = 1400;
    (function f(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  function go(to, instant) {
    to = Math.max(0, Math.min(els.length - 1, to));
    if (to === cur || busy) return;
    const from = cur, dir = to > from ? 1 : -1;
    const outS = els[from], inS = els[to];
    busy = !instant;

    // measure outgoing morph targets
    const outM = {};
    if (outS) outS.querySelectorAll("[data-morph]").forEach(e => outM[e.dataset.morph] = { el: e, r: e.getBoundingClientRect() });

    inS.classList.add("active", "entering");
    inS.classList.remove("played");
    void inS.offsetWidth;
    const dur = reduce || instant ? 0 : 1;

    // shelf chips that exist on both slides stay put
    const persist = new Set();
    inS.querySelectorAll(".shelf-chip").forEach(c => {
      const k = c.querySelector("[data-morph]")?.dataset.morph, m = outM[k];
      const oc = m && m.el.closest(".shelf-chip");
      if (oc) { persist.add(c); persist.add(oc); }
    });

    // incoming morph elements
    const matched = new Set();
    inS.querySelectorAll("[data-morph]").forEach(e => {
      const m = outM[e.dataset.morph];
      if (m && dur) {
        const r = e.getBoundingClientRect();
        const s = m.r.height / r.height;
        const dx = (m.r.left + m.r.width / 2) - (r.left + r.width / 2);
        const dy = (m.r.top + m.r.height / 2) - (r.top + r.height / 2);
        e.animate([{ transform: `translate(${dx}px,${dy}px) scale(${s})` }, { transform: "none" }],
          { duration: 1100, easing: EASE, fill: "backwards" });
        m.el.style.visibility = "hidden";
        matched.add(m.el); matched.add(e);
      } else if (dur) {
        e.animate([{ opacity: 0, transform: `translateY(${40 * dir}px) scale(.96)`, filter: "blur(12px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
          { duration: 1100, delay: 250, easing: EASE_OUT, fill: "backwards" });
      }
      if (!m) e.querySelectorAll("[data-count]").forEach(countUp);
    });

    // incoming staggered elements
    if (dur) [...inS.querySelectorAll("[data-a]")].filter(e => !persist.has(e)).forEach((e, i) => {
      e.animate([{ opacity: 0, transform: `translateY(${34 * dir}px)`, filter: "blur(10px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
        { duration: 900, delay: 280 + i * 70, easing: EASE_OUT, fill: "backwards" });
    });
    inS.querySelectorAll("[data-count]").forEach(e => { if (!e.closest("[data-morph]")) countUp(e); });

    // outgoing
    if (outS) {
      const outEls = [...outS.querySelectorAll("[data-a], [data-morph]")].filter(e => !matched.has(e) && !persist.has(e));
      if (dur) outEls.forEach((e, i) => e.animate(
        [{ opacity: 1, transform: "none", filter: "blur(0)" }, { opacity: 0, transform: `translateY(${-30 * dir}px)`, filter: "blur(10px)" }],
        { duration: 520, delay: Math.min(i * 18, 160), easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" }));
      setTimeout(() => {
        outS.classList.remove("active", "played");
        outS.getAnimations({ subtree: true }).forEach(a => a.cancel());
        outS.querySelectorAll("[data-morph]").forEach(e => e.style.visibility = "");
      }, dur ? 760 : 0);
    }
    requestAnimationFrame(() => inS.classList.add("played"));
    setTimeout(() => { inS.classList.remove("entering"); busy = false; }, dur ? 900 : 0);

    cur = to;
    setBg(to);
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === to));
    counter.textContent = `${String(to + 1).padStart(2, "0")} / ${String(els.length).padStart(2, "0")}`;
    bar.style.transform = `scaleX(${(to + 1) / els.length})`;
    document.body.classList.toggle("first", to === 0);
    history.replaceState(null, "", "#" + (to + 1));
  }

  /* ---------- 5. Input ---------- */
  const next = () => go(cur + 1), prev = () => go(cur - 1);
  addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (["ArrowDown", "ArrowRight", "PageDown", " ", "Enter"].includes(k)) { e.preventDefault(); next(); }
    else if (["ArrowUp", "ArrowLeft", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); prev(); }
    else if (k === "Home") go(0);
    else if (k === "End") go(els.length - 1);
    else if (k === "f" || k === "F") toggleFs();
  });
  let wheelLock = 0;
  addEventListener("wheel", e => {
    const now = Date.now(); if (now < wheelLock || Math.abs(e.deltaY) < 18) return;
    wheelLock = now + 1000; e.deltaY > 0 ? next() : prev();
  }, { passive: true });
  let ty = null, tx = null;
  addEventListener("touchstart", e => { ty = e.touches[0].clientY; tx = e.touches[0].clientX; }, { passive: true });
  addEventListener("touchend", e => {
    if (ty == null) return;
    const dy = ty - e.changedTouches[0].clientY, dx = tx - e.changedTouches[0].clientX;
    if (Math.max(Math.abs(dy), Math.abs(dx)) > 40) (Math.abs(dy) > Math.abs(dx) ? dy : dx) > 0 ? next() : prev();
    ty = null;
  });
  dots.addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) go(+b.dataset.go); });
  function toggleFs() { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(); }
  document.getElementById("fs").addEventListener("click", toggleFs);
  addEventListener("hashchange", () => go((parseInt(location.hash.slice(1)) || 1) - 1));

  const start = Math.max(0, (parseInt(location.hash.slice(1)) || 1) - 1);
  go(start);
  document.body.classList.add("ready");
})();
