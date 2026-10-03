/* ==========================================================================
   NOIR CULTURE SOCIETY — DESIGN CASE STUDY CONTROLLER
   Full-screen editorial case study modal with 5 structured chapters:
   01 CONCEPT / 02 VISUAL DIRECTION / 03 ARTWORK / 04 ON-BODY / 05 CAMPAIGN
   ========================================================================== */

const caseStudyData = {
  falling: {
    id: "falling",
    title: "I’M FALLING AGAIN",
    tagline: "A visual metaphor for repeating the things we promised ourselves we wouldn't.",
    edition: "EDITION 01 / SS24",
    gsm: "280 GSM HEAVYWEIGHT COMBED COTTON",
    colorway: "VINTAGE WASHED RAVEN / MUTED TEAL ACCENTS",
    chapters: {
      concept: {
        num: "01",
        title: "CONCEPT & METAPHOR",
        lead: "A visual metaphor for repeating the things we promised ourselves we wouldn't.",
        body: [
          "Human error is rarely linear; it is cyclical. 'I’M FALLING AGAIN' explores the specific melancholic humor of returning to the exact habits, people, and cognitive spirals we swore we had outgrown.",
          "Rather than depicting despair as violent or destructive, the piece treats descent as an almost peaceful surrender — an inverted body drifting weightlessly through brutalist frames and wilting flora.",
          "It is a quiet admission of vulnerability, worn proudly on the chest in a culture that incessantly demands relentless forward progress."
        ],
        quote: "“We don’t fall because we tripped. We fall because the ground felt too predictable.”",
        tags: ["Melancholia", "Brutalist Geometry", "Screenprint Halftone", "Cyclical Human Habit"]
      },
      visual: {
        num: "02",
        title: "VISUAL DIRECTION",
        lead: "Juxtaposing harsh rigid architectural angles against fluid biological descent.",
        body: [
          "The visual composition is divided along a central vertical axis. The upper quadrant features sharp, interlocking brutalist concrete beams drawn with axonometric precision, contrasting with the soft, suspended silhouette of an inverted human form.",
          "Halftone dot screening (35 LPI) was manually applied to the figure, referencing 1980s Japanese editorial printing and dark post-punk fanzines.",
          "The color story restricts itself strictly to three tones: an obsidian vintage-washed ground, an off-white discharge ink for the typographic headline, and a single muted desaturated teal (#486e73) window pane that anchors the psychological mood."
        ],
        palette: [
          { name: "Obsidian Ground", hex: "#0c0d0f" },
          { name: "Muted Teal", hex: "#486e73" },
          { name: "Off-White Ink", hex: "#ecebe6" },
          { name: "Charcoal Shadow", hex: "#1c1e22" }
        ]
      },
      artwork: {
        num: "03",
        title: "ORIGINAL ARTWORK",
        lead: "Multi-layered screenprint separation rendered for high-density plastisol and discharge inks.",
        image: "assets/images/falling_art.jpg",
        caption: "Screenprint separation matrix — 4-color simulated process with distressed halftone."
      },
      onbody: {
        num: "04",
        title: "ON-BODY ARCHITECTURE",
        lead: "Engineered boxy silhouette with custom dropped shoulders and substantial heavyweight drape.",
        body: [
          "A graphic tee is only as powerful as its silhouette. We developed our proprietary blank from scratch: 280 GSM 100% organic combed cotton, tightly spun for a smooth surface that allows ink penetration without cracking.",
          "Featuring a 1.25-inch high-density ribbed collar that sits snug against the neck without stretching, dropped shoulder seams, and relaxed wide sleeves that hit just above the elbow.",
          "Pre-shrunk and treated with a vintage cold mineral wash, giving each piece subtle unique tonal variations at the seams and ribbing."
        ],
        specs: [
          { label: "Fabric Blank", val: "280 GSM Organic Cotton" },
          { label: "Collar Construction", val: "1.25\" High-Ribbed Crew" },
          { label: "Cut & Drape", val: "Relaxed Boxy / Drop-Shoulder" },
          { label: "Ink Technique", val: "Discharge & Matte Plastisol" },
          { label: "Wash Process", val: "Cold Pigment Stone-Wash" },
          { label: "Hardware Label", val: "Laser-cut Woven Damask" }
        ]
      },
      campaign: {
        num: "05",
        title: "CAMPAIGN CHRONICLES",
        lead: "Shot on 35mm film in brutalist architectural spaces across London & Berlin.",
        image: "assets/images/falling_model.jpg",
        caption: "Look 01 / Sector 7 Concrete Pavilion. Exposure: 35mm ISO 800. Natural overcast sky.",
        quote: "“Streetwear that feels like an art piece. A quiet rebellion against mindless trends.”"
      }
    }
  },
  anxious: {
    id: "anxious",
    title: "ANXIOUS PARADISE",
    tagline: "Sunsets seen through the lens of impending doom and blissful dissociation.",
    edition: "EDITION 02 / SS24",
    gsm: "290 GSM VINTAGE WASH COTTON",
    colorway: "FADED CHARCOAL / TROPICAL TEAL & DUSTY CREAM",
    chapters: {
      concept: {
        num: "01",
        title: "CONCEPT & METAPHOR",
        lead: "Sunsets seen through the lens of impending doom and blissful dissociation.",
        body: [
          "Anxiety in modern life is rarely an acute panic; it has become an ambient, omnipresent background hum. 'ANXIOUS PARADISE' explores this paradox by colliding idyllic tropical postcard tropes with digital glitch artifacts and engulfing flames.",
          "It captures that hyper-contemporary feeling of sipping a cold drink by the water while watching the digital world combust in real time."
        ],
        quote: "“Nothing is fine, but the view is magnificent.”",
        tags: ["Digital Burnout", "Surreal Irony", "Glitch Aesthetics", "Tropical Nihilism"]
      },
      visual: {
        num: "02",
        title: "VISUAL DIRECTION",
        lead: "Pixelated displacement maps clashing with vintage lithographic wave patterns.",
        body: [
          "The silhouette of a lone palm tree is consumed by screenprinted stylized flames. A low-res digital raster grid distorts the skyline, breaking the horizon into pixelated memory.",
          "Typeset in distressed vintage woodblock condensed grotesk, proclaiming 'BLISSFUL DISSOCIATION' along the bottom hem."
        ],
        palette: [
          { name: "Vintage Ash", hex: "#121316" },
          { name: "Cyan Glitch", hex: "#527e82" },
          { name: "Warm Cream", hex: "#dbd1c2" },
          { name: "Deep Navy", hex: "#1d2936" }
        ]
      },
      artwork: {
        num: "03",
        title: "ORIGINAL ARTWORK",
        lead: "Vintage wash flat lay artwork study with faded distressed screenprint layers.",
        image: "assets/images/anxious_art.jpg",
        caption: "Archival flat lay — Screenprinted with water-based discharge ink on vintage black tee."
      },
      onbody: {
        num: "04",
        title: "ON-BODY ARCHITECTURE",
        lead: "Subtle distressing along the neckline, cuffs, and hem to complement the apocalyptic mood.",
        body: [
          "Crafted from 290 GSM ring-spun cotton that has undergone a multi-stage enzyme stonewash, providing a luxuriously soft drape that looks like a beloved vintage band tee from thirty years ago.",
          "Slightly elongated body length with side splits for relaxed drape over cargo trousers and denim."
        ],
        specs: [
          { label: "Fabric Weight", val: "290 GSM Heavy Jersey" },
          { label: "Wash Finish", val: "Enzyme Stonewash & Acid Distress" },
          { label: "Cut", val: "Oversized Streetwear Fit" },
          { label: "Print Finish", val: "Soft-hand Waterbased Discharge" }
        ]
      },
      campaign: {
        num: "05",
        title: "CAMPAIGN CHRONICLES",
        lead: "Surreal twilight lookbook captured under industrial sodium lights.",
        image: "assets/images/campaign_model_2.jpg",
        caption: "Campaign Look 02 — Concrete wet reflections under diffused moody light.",
        quote: "“A wearable testament to finding peace within the noise.”"
      }
    }
  },
  romantic: {
    id: "romantic",
    title: "ROMANTIC NIHILISM",
    tagline: "Cynicism draped in velvet roses and shattered classical marble.",
    edition: "EDITION 03 / SS24",
    gsm: "300 GSM HEAVYWEIGHT COTTON",
    colorway: "OBSIDIAN WASH / CHALK WHITE & ROSE UNDERTONES",
    chapters: {
      concept: {
        num: "01",
        title: "CONCEPT & METAPHOR",
        lead: "Cynicism draped in velvet roses and shattered classical marble.",
        body: [
          "The collision of timeless Roman sculptured beauty with existential rot. A broken marble bust pierced by a dark thorny rose that blooms through the stone.",
          "A dialogue on whether beauty matters in an indifferent cosmos, answering with a resounding, unapologetic yes."
        ],
        quote: "“Even if nothing matters, this rose still blooms through the marble.”",
        tags: ["Classical Art", "Existential Romance", "Screenprint Halftone", "Beauty in Decay"]
      },
      visual: {
        num: "02",
        title: "VISUAL DIRECTION",
        lead: "High-contrast chiaroscuro rendering inspired by Caravaggio and gothic streetwear.",
        body: [
          "Hyper-detailed stipple engraving of fractured Carrara marble with deep ink shadows. An exquisite thorned rose wraps diagonally across the visage, terminating in a single fallen petal."
        ],
        palette: [
          { name: "Marble White", hex: "#e5e3de" },
          { name: "Slate Teal", hex: "#4b6568" },
          { name: "Deep Charcoal", hex: "#141518" },
          { name: "Dried Rose", hex: "#592b2b" }
        ]
      },
      artwork: {
        num: "03",
        title: "ORIGINAL ARTWORK",
        lead: "High-resolution flat lay of the 'ROMANTIC NIHILISM' screenprinted graphic garment.",
        image: "assets/images/romantic_art.jpg",
        caption: "Edition 03 Archive — 6-pass hand-pulled screenprint on custom washed jersey."
      },
      onbody: {
        num: "04",
        title: "ON-BODY ARCHITECTURE",
        lead: "Structured 300 GSM heavyweight cotton tailored for a sculptural silhouette.",
        body: [
          "The heaviest blank in the collection. The fabric holds its shape like an overshirt while retaining the breathability of pure natural cotton.",
          "Twin-needle stitching along the hem and reinforced neckband ensure lasting shape across years of wear."
        ],
        specs: [
          { label: "Fabric Blank", val: "300 GSM French Terry Cotton" },
          { label: "Stitching", val: "Twin-Needle Heavy Thread" },
          { label: "Cut", val: "Structured Boxy Oversize" },
          { label: "Ink", val: "Cracked Plastisol Vintage Effect" }
        ]
      },
      campaign: {
        num: "05",
        title: "CAMPAIGN CHRONICLES",
        lead: "Editorial lookbook photograph framed within industrial concrete shafts of light.",
        image: "assets/images/campaign_model_3.jpg",
        caption: "Campaign Look 03 — Rebel Youth & Romantic Nihilism in industrial monolith.",
        quote: "“A uniform for the romantic who refuses to look away from reality.”"
      }
    }
  }
};

class CaseStudyController {
  constructor() {
    this.modal = document.getElementById('caseStudyModal');
    this.activeDesignKey = 'falling';
    this.activeChapter = 'concept';
    
    this.init();
  }

  init() {
    if (!this.modal) return;

    // Close button
    const closeBtn = document.getElementById('closeCaseStudyModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Keyboard ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-active')) {
        this.close();
      }
    });

    // Attach trigger listeners
    document.querySelectorAll('[data-open-case-study]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const designKey = el.getAttribute('data-open-case-study') || 'falling';
        const startChapter = el.getAttribute('data-chapter') || 'concept';
        this.open(designKey, startChapter);
      });
    });

    // Tab buttons
    document.querySelectorAll('.case-study-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chapter = btn.getAttribute('data-tab');
        this.switchChapter(chapter);
      });
    });
  }

  open(designKey = 'falling', chapter = 'concept') {
    this.activeDesignKey = caseStudyData[designKey] ? designKey : 'falling';
    this.renderHeader();
    this.switchChapter(chapter);
    
    this.modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  renderHeader() {
    const data = caseStudyData[this.activeDesignKey];
    if (!data) return;

    const modalTitle = document.getElementById('caseStudyModalTitle');
    const modalTagline = document.getElementById('caseStudyModalTagline');
    const modalEdition = document.getElementById('caseStudyModalEdition');

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTagline) modalTagline.textContent = data.tagline;
    if (modalEdition) modalEdition.textContent = data.edition;
  }

  switchChapter(chapterKey) {
    this.activeChapter = chapterKey;
    const data = caseStudyData[this.activeDesignKey];
    const chapterData = data.chapters[chapterKey];

    // Update Tab states
    document.querySelectorAll('.case-study-tab-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-tab') === chapterKey);
    });

    // Update Content Panel
    const container = document.getElementById('caseStudyDynamicContent');
    if (!container || !chapterData) return;

    let html = '';

    switch (chapterKey) {
      case 'concept':
        html = `
          <div class="chapter-content-grid" style="display:grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: start;">
            <div>
              <span class="mono" style="color: var(--accent-teal); margin-bottom: 0.75rem; display: block;">01 // POETIC THESIS</span>
              <h3 style="font-size: 2.2rem; text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1;">${chapterData.title}</h3>
              <p style="font-family: var(--font-editorial); font-size: 1.45rem; font-style: italic; color: var(--accent-cream); margin-bottom: 2rem; border-left: 2px solid var(--accent-teal); padding-left: 1.25rem;">
                ${chapterData.quote}
              </p>
              ${chapterData.body.map(p => `<p style="margin-bottom: 1.25rem; font-size: 1.05rem; line-height: 1.8;">${p}</p>`).join('')}
              <div style="margin-top: 2rem; display: flex; gap: 0.6rem; flex-wrap: wrap;">
                ${chapterData.tags.map(t => `<span class="mono" style="padding: 0.35rem 0.75rem; background: var(--bg-surface); border: 1px solid var(--border-hairline); font-size: 0.68rem; color: var(--text-muted);">${t}</span>`).join('')}
              </div>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 1.5rem;">
              <img src="assets/images/archive_sketch.jpg" alt="Concept Sketches" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; filter: contrast(1.15);">
              <div style="margin-top: 1rem; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dim);">
                <span>ARCHIVE: SKETCHBOOK ENTRY #04</span>
                <span>BERLIN RESIDENCY</span>
              </div>
            </div>
          </div>
        `;
        break;

      case 'visual':
        html = `
          <div class="chapter-content-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap: 4rem;">
            <div>
              <span class="mono" style="color: var(--accent-teal); margin-bottom: 0.75rem; display: block;">02 // ART DIRECTION</span>
              <h3 style="font-size: 2.2rem; text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1;">${chapterData.title}</h3>
              <p style="font-size: 1.15rem; color: var(--text-white); margin-bottom: 1.5rem; font-weight: 400;">${chapterData.lead}</p>
              ${chapterData.body.map(p => `<p style="margin-bottom: 1.25rem; font-size: 1rem; line-height: 1.7; color: var(--text-muted);">${p}</p>`).join('')}
            </div>
            <div>
              <h4 class="mono" style="margin-bottom: 1.5rem; font-size: 0.78rem; letter-spacing: 0.18em; color: var(--text-dim);">CHROMATIC SPECTRUM & INK SPECIFICATION</h4>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${chapterData.palette.map(color => `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border-hairline);">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                      <span style="display: block; width: 28px; height: 28px; background: ${color.hex}; border: 1px solid var(--border-medium);"></span>
                      <span style="font-family: var(--font-display); font-weight: 600; text-transform: uppercase;">${color.name}</span>
                    </div>
                    <span class="mono" style="color: var(--text-dim);">${color.hex}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        break;

      case 'artwork':
        html = `
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 100%; max-width: 820px; background: #000; border: 1px solid var(--border-subtle); position: relative; overflow: hidden; padding: 1.5rem;">
              <div class="mono" style="position: absolute; top: 1.5rem; left: 1.5rem; background: rgba(0,0,0,0.8); padding: 0.3rem 0.6rem; color: var(--accent-cream); border: 1px solid var(--border-hairline); font-size: 0.65rem;">
                300 DPI SCREENPRINT SEPARATION PREVIEW
              </div>
              <img id="caseStudyZoomImg" src="${chapterData.image}" alt="${data.title} Graphic Artwork" style="width: 100%; max-height: 65vh; object-fit: contain; cursor: zoom-in; transition: transform 0.3s ease;">
            </div>
            <div style="margin-top: 1.5rem; text-align: center; max-width: 650px;">
              <p style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); letter-spacing: 0.14em;">${chapterData.caption}</p>
              <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-dim);">${chapterData.lead}</p>
            </div>
          </div>
        `;
        break;

      case 'onbody':
        html = `
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem;">
            <div>
              <span class="mono" style="color: var(--accent-teal); margin-bottom: 0.75rem; display: block;">04 // SILHOUETTE & CRAFT</span>
              <h3 style="font-size: 2.2rem; text-transform: uppercase; margin-bottom: 1.5rem; line-height: 1;">${chapterData.title}</h3>
              <p style="font-size: 1.15rem; color: var(--text-white); margin-bottom: 1.5rem; font-weight: 400;">${chapterData.lead}</p>
              ${chapterData.body.map(p => `<p style="margin-bottom: 1.25rem; font-size: 1rem; line-height: 1.7; color: var(--text-muted);">${p}</p>`).join('')}
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 2rem;">
              <h4 class="mono" style="margin-bottom: 1.75rem; font-size: 0.75rem; letter-spacing: 0.18em; color: var(--text-dim); border-bottom: 1px solid var(--border-hairline); padding-bottom: 0.75rem;">
                GARMENT SPECIFICATIONS
              </h4>
              <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                ${chapterData.specs.map(s => `
                  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--border-hairline); padding-bottom: 0.6rem;">
                    <span class="mono" style="font-size: 0.68rem; color: var(--text-dim);">${s.label}</span>
                    <span class="mono" style="font-size: 0.78rem; color: var(--accent-cream); font-weight: 600;">${s.val}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        break;

      case 'campaign':
        html = `
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div style="position: relative; width: 100%; max-height: 70vh; overflow: hidden; border: 1px solid var(--border-subtle);">
              <img src="${chapterData.image}" alt="Campaign Photo" style="width: 100%; height: 100%; object-fit: cover;">
              <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(180deg, transparent, rgba(7,7,8,0.95)); padding: 3rem 2.5rem 1.75rem;">
                <p style="font-family: var(--font-editorial); font-size: 1.5rem; font-style: italic; color: var(--accent-cream); max-width: 600px;">
                  ${chapterData.quote}
                </p>
                <div class="mono" style="margin-top: 1rem; font-size: 0.7rem; color: var(--text-muted); letter-spacing: 0.16em;">
                  ${chapterData.caption}
                </div>
              </div>
            </div>
          </div>
        `;
        break;
    }

    container.innerHTML = html;

    // Attach zoom click on artwork if applicable
    const zoomImg = document.getElementById('caseStudyZoomImg');
    if (zoomImg) {
      let zoomed = false;
      zoomImg.addEventListener('click', () => {
        zoomed = !zoomed;
        zoomImg.style.transform = zoomed ? 'scale(1.5)' : 'scale(1)';
        zoomImg.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.noirCaseStudy = new CaseStudyController();
});
