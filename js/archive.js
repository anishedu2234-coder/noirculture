/* ==========================================================================
   NOIR CULTURE SOCIETY — VISUAL ARCHIVE CONTROLLER
   Private Studio Archive with Filtering and Interactive Lightbox Inspection
   ========================================================================== */

const archiveItems = [
  {
    id: "arc-01",
    category: "sketches",
    title: "DESCENDING FORM STUDY 04",
    medium: "Raw ink & charcoal on aged cold-press paper",
    date: "OCTOBER 2023",
    src: "assets/images/archive_sketch.jpg",
    details: "Preliminary brushwork exploring the weightlessness of the inverted figure for 'I'M FALLING AGAIN'. Features experimental typography trials in hand-cut gothic scripts.",
    location: "Studio Berlin"
  },
  {
    id: "arc-02",
    category: "graphics",
    title: "I'M FALLING AGAIN // FINAL MOCKUP",
    medium: "Discharge & high-density plastisol screenprint",
    date: "NOVEMBER 2023",
    src: "assets/images/falling_art.jpg",
    details: "Master garment strike-off. 4-color halftone separation on custom 280 GSM mineral washed black t-shirt blank.",
    location: "London Print Workshop"
  },
  {
    id: "arc-03",
    category: "campaign",
    title: "I'M FALLING AGAIN // DEFAULT MUSE EDITORIAL",
    medium: "35mm Kodak Tri-X 400 pushed to 1600",
    date: "DECEMBER 2023",
    src: "assets/images/falling_model.jpg",
    details: "Brand's default female muse wearing 'I'M FALLING AGAIN' screenprint on custom ribbed streetwear silhouette against brutalist concrete.",
    location: "Southbank Concrete Complex"
  },
  {
    id: "arc-04",
    category: "studies",
    title: "STUDIO WORKBENCH & CHROMATIC MATRIX",
    medium: "Studio environment photograph & physical moodboard",
    date: "JANUARY 2024",
    src: "assets/images/studio_archive.jpg",
    details: "Color formulation sheet matching bespoke Pantone pigments: Raven Black (#0c0d0f), Casted Teal (#486e73), and Warm Bleach Cream (#dbd1c2).",
    location: "Creative Direction Studio"
  },
  {
    id: "arc-05",
    category: "graphics",
    title: "ANXIOUS PARADISE // SCREENPRINT",
    medium: "Enzyme washed vintage black jersey with discharge print",
    date: "JANUARY 2024",
    src: "assets/images/anxious_art.jpg",
    details: "Surreal burning palm tree glitch composition juxtaposing serene ocean waves with digital static artifacts.",
    location: "London Studio"
  },
  {
    id: "arc-06",
    category: "campaign",
    title: "ANXIOUS PARADISE // DEFAULT MUSE LOOK",
    medium: "35mm architectural portrait — Concrete Pavilion",
    date: "SS24 CAMPAIGN",
    src: "assets/images/campaign_model_2.jpg",
    details: "Official default brand model for the Noir Culture Society female category wearing 'ANXIOUS PARADISE' burning palm screenprint against monumental brutalist concrete.",
    location: "Concrete Monolith Pavilion"
  },
  {
    id: "arc-07",
    category: "graphics",
    title: "ROMANTIC NIHILISM // STATUE & ROSE",
    medium: "Multi-pass screenprint on heavy vintage black cotton",
    date: "FEBRUARY 2024",
    src: "assets/images/romantic_art.jpg",
    details: "Chiaroscuro study of fractured marble bust and black velvet rose. Typeset in bespoke condensed grotesque.",
    location: "Studio Paris"
  },
  {
    id: "arc-08",
    category: "graphics",
    title: "ECHOES IN THE CONCRETE // 3:45 AM",
    medium: "Halftone screenprint on vintage wash heavyweight cotton",
    date: "MARCH 2024",
    src: "assets/images/echoes_art.jpg",
    details: "Brutalist geometry and wireframe human anatomy reflecting late night metropolitan transit solitude.",
    location: "Studio Berlin"
  },
  {
    id: "arc-09",
    category: "campaign",
    title: "ECHOES IN CONCRETE // DEFAULT MUSE LOOK",
    medium: "35mm architectural portrait — Concrete Pavilion",
    date: "SS24 CAMPAIGN",
    src: "assets/images/campaign_model_3.jpg",
    details: "Signature female muse wearing 'ECHOES IN THE CONCRETE // 3:45 AM METROPOLIS' wireframe brutalist graphic in raw architectural daylight.",
    location: "Brutalist Archive Pavilion"
  },
  {
    id: "arc-10",
    category: "campaign",
    title: "HERO EDITORIAL VISUAL // MONOLITH",
    medium: "Cinematic medium format 35mm film emulation",
    date: "APRIL 2024",
    src: "assets/images/hero_campaign.jpg",
    details: "The definitive hero lookbook capture framing the brand's default female muse wearing the flagship 'I'M FALLING AGAIN' streetwear design against stark architecture.",
    location: "Monolith Concrete Pavilion"
  },
  {
    id: "arc-11",
    category: "graphics",
    title: "AM I SCARY? // T-SHIRT GRAPHIC SHOWCASE",
    medium: "Waterbased discharge & bone white screenprint on heavy black cotton",
    date: "MAY 2024",
    src: "assets/images/scary_art.jpg",
    details: "Dark humor meets existential vulnerability. The weeping baby Grim Reaper holding its face under a crescent moon, typeset in hand-distressed bone gothic script.",
    location: "London Studio"
  },
  {
    id: "arc-12",
    category: "campaign",
    title: "ATELIER DUO // 'AM I SCARY?' CAMPAIGN",
    medium: "35mm studio editorial — Industrial pipe architecture",
    date: "SS24 CAMPAIGN",
    src: "assets/images/campaign_duo.jpg",
    details: "Two-model campaign editorial showcasing the unisex oversized streetwear cut. Styled with layered silver curb chains and wide-leg utility cargo trousers.",
    location: "Atelier Studio Stage"
  },
  {
    id: "arc-13",
    category: "campaign",
    title: "AM I SCARY? // CONCRETE ARCHIVE LOOK",
    medium: "35mm Kodak Tri-X — Concrete Monolith",
    date: "SS24 CAMPAIGN",
    src: "assets/images/scary_model.jpg",
    details: "Brand's signature female muse wearing 'AM I SCARY?' graphic t-shirt in raw ambient outdoor light against brutalist concrete walls.",
    location: "Concrete Monolith Pavilion"
  }
];

class VisualArchiveController {
  constructor() {
    this.container = document.getElementById('archiveGrid');
    this.lightbox = document.getElementById('lightboxModal');
    this.activeFilter = 'all';
    
    this.init();
  }

  init() {
    this.render();
    this.bindFilters();
    this.bindLightbox();
  }

  render() {
    if (!this.container) return;

    const filtered = this.activeFilter === 'all'
      ? archiveItems
      : archiveItems.filter(item => item.category === this.activeFilter);

    this.container.innerHTML = filtered.map(item => `
      <div class="archive-item reveal-on-scroll" data-id="${item.id}" data-category="${item.category}">
        <div class="archive-media-box">
          <img src="${item.src}" alt="${item.title}" loading="lazy">
          <span class="archive-tag-floating mono">${item.category}</span>
        </div>
        <div class="archive-item-meta">
          <div class="archive-item-id mono">${item.id.toUpperCase()} // ${item.date}</div>
          <h4 class="archive-item-title">${item.title}</h4>
          <div class="archive-item-medium mono">${item.medium}</div>
        </div>
      </div>
    `).join('');

    // Attach click for lightbox
    this.container.querySelectorAll('.archive-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        this.openLightbox(id);
      });
    });

    // Trigger scroll reveal
    setTimeout(() => {
      this.container.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    }, 50);
  }

  bindFilters() {
    const filterBtns = document.querySelectorAll('.archive-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        this.activeFilter = btn.getAttribute('data-filter') || 'all';
        this.render();
      });
    });
  }

  bindLightbox() {
    if (!this.lightbox) return;

    const closeBtn = document.getElementById('closeLightboxBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('is-active')) {
        this.closeLightbox();
      }
    });
  }

  openLightbox(id) {
    const item = archiveItems.find(i => i.id === id);
    if (!item || !this.lightbox) return;

    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const medium = document.getElementById('lightboxMedium');
    const details = document.getElementById('lightboxDetails');
    const location = document.getElementById('lightboxLocation');

    if (img) img.src = item.src;
    if (title) title.textContent = item.title;
    if (medium) medium.textContent = `${item.id.toUpperCase()} // ${item.medium}`;
    if (details) details.textContent = item.details;
    if (location) location.textContent = `LOCATION: ${item.location} · ${item.date}`;

    this.lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.noirArchive = new VisualArchiveController();
});
