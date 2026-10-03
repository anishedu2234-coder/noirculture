/* ==========================================================================
   NOIR CULTURE SOCIETY — MASTERPIECE AUDIO SYSTEM
   Curated Haute-Couture Soundscape & Haunting Melancholic Soundtracks
   Features:
   - Track 01: Erik Satie — Gymnopédie No. 1 (Lent et douloureux) Master Recording
   - Track 02: Noir Runway — Sub-Bass Drone & Analog Tape Flutter (Generative)
   - Interactive Audio Visualizer, Volume Fade, & Floating Atelier Player
   ========================================================================== */

class NoirMasterpieceAudio {
  constructor() {
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.preload = 'auto';

    // Track definitions
    this.tracks = [
      {
        id: 'satie',
        title: 'GYMNOPÉDIE NO. 1 (LENT ET DOULOUREUX)',
        artist: 'ERIK SATIE // STUDIO PARIS',
        type: 'file',
        src: 'assets/audio/masterpiece_satie.mp3',
        description: 'Iconic French minimalist masterpiece. Haunting, fragile, slow melancholic piano.'
      },
      {
        id: 'synth',
        title: 'SUB-BASS RUNWAY DRONE // D MINOR',
        artist: 'NOIR ATELIER SYNTHESIZER',
        type: 'generative',
        description: 'Custom analog sub-bass oscillation with tape flutter and vinyl resonance.'
      }
    ];

    // Web Audio API for generative synth & master volume/filters
    this.audioCtx = null;
    this.masterGain = null;
    this.synthOscs = [];
    this.synthGain = null;
    this.analyser = null;

    // DOM Elements
    this.navBtn = document.getElementById('soundToggleBtn');
    this.playerWidget = document.getElementById('atelierPlayerWidget');
    this.playBtn = document.getElementById('playerPlayBtn');
    this.trackTitleEl = document.getElementById('playerTrackTitle');
    this.trackArtistEl = document.getElementById('playerTrackArtist');
    this.progressBar = document.getElementById('playerProgressBar');
    this.progressFill = document.getElementById('playerProgressFill');
    this.volSlider = document.getElementById('playerVolSlider');
    this.nextBtn = document.getElementById('playerNextBtn');
    this.prevBtn = document.getElementById('playerPrevBtn');
    this.widgetToggleBtn = document.getElementById('playerWidgetToggle');

    this.init();
  }

  init() {
    // Set initial source
    this.audioElement.src = this.tracks[0].src;
    this.audioElement.volume = 0.65;

    // Time update listener
    this.audioElement.addEventListener('timeupdate', () => this.updateProgress());

    // Navigation toggle click
    if (this.navBtn) {
      this.navBtn.addEventListener('click', () => this.togglePlay());
    }

    // Floating player play/pause click
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }

    // Next / Prev buttons
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.switchTrack(1));
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.switchTrack(-1));
    }

    // Progress bar click to seek
    if (this.progressBar) {
      this.progressBar.addEventListener('click', (e) => {
        if (this.tracks[this.currentTrackIndex].type === 'file' && this.audioElement.duration) {
          const rect = this.progressBar.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          this.audioElement.currentTime = pos * this.audioElement.duration;
        }
      });
    }

    // Volume control
    if (this.volSlider) {
      this.volSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.setVolume(val);
      });
    }

    // Toggle player collapse
    if (this.widgetToggleBtn && this.playerWidget) {
      this.widgetToggleBtn.addEventListener('click', () => {
        this.playerWidget.classList.toggle('is-collapsed');
      });
    }

    this.updateTrackDisplay();
  }

  setupSynthContext() {
    if (this.audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
    this.masterGain.connect(this.audioCtx.destination);

    // Filter
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(3.0, this.audioCtx.currentTime);
    filter.connect(this.masterGain);

    // Warm D minor frequencies (D2, A2, F3)
    const freqs = [73.42, 110.0, 174.61];
    this.synthOscs = freqs.map((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      osc.type = i === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq + (i * 0.3), this.audioCtx.currentTime);
      g.gain.setValueAtTime(i === 0 ? 0.25 : 0.15, this.audioCtx.currentTime);
      osc.connect(g);
      g.connect(filter);
      osc.start();
      return osc;
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    const currentTrack = this.tracks[this.currentTrackIndex];

    if (currentTrack.type === 'file') {
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.updateUIState(true);
      }).catch(err => {
        console.warn("Audio playback issue:", err);
      });
    } else {
      this.setupSynthContext();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.3, this.audioCtx.currentTime + 1.5);
      this.isPlaying = true;
      this.updateUIState(true);
    }
  }

  pause() {
    const currentTrack = this.tracks[this.currentTrackIndex];

    if (currentTrack.type === 'file') {
      this.audioElement.pause();
    } else if (this.audioCtx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
    }

    this.isPlaying = false;
    this.updateUIState(false);
  }

  switchTrack(direction) {
    const wasPlaying = this.isPlaying;
    this.pause();

    this.currentTrackIndex = (this.currentTrackIndex + direction + this.tracks.length) % this.tracks.length;
    const nextTrack = this.tracks[this.currentTrackIndex];

    if (nextTrack.type === 'file') {
      this.audioElement.src = nextTrack.src;
    }

    this.updateTrackDisplay();

    if (wasPlaying) {
      setTimeout(() => this.play(), 200);
    }
  }

  setVolume(val) {
    this.audioElement.volume = val;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(val * 0.4, this.audioCtx.currentTime);
    }
  }

  updateProgress() {
    if (this.tracks[this.currentTrackIndex].type !== 'file') {
      if (this.progressFill) this.progressFill.style.width = '100%';
      return;
    }

    if (this.audioElement.duration && this.progressFill) {
      const pct = (this.audioElement.currentTime / this.audioElement.duration) * 100;
      this.progressFill.style.width = `${pct}%`;

      const timeEl = document.getElementById('playerTimeDisplay');
      if (timeEl) {
        const curMin = Math.floor(this.audioElement.currentTime / 60);
        const curSec = Math.floor(this.audioElement.currentTime % 60).toString().padStart(2, '0');
        const durMin = Math.floor(this.audioElement.duration / 60);
        const durSec = Math.floor(this.audioElement.duration % 60).toString().padStart(2, '0');
        timeEl.textContent = `${curMin}:${curSec} / ${durMin}:${durSec}`;
      }
    }
  }

  updateTrackDisplay() {
    const track = this.tracks[this.currentTrackIndex];
    if (this.trackTitleEl) this.trackTitleEl.textContent = track.title;
    if (this.trackArtistEl) this.trackArtistEl.textContent = track.artist;

    const trackIndexEl = document.getElementById('playerTrackIndex');
    if (trackIndexEl) {
      trackIndexEl.textContent = `TRACK 0${this.currentTrackIndex + 1} // 0${this.tracks.length}`;
    }
  }

  updateUIState(active) {
    // Top Nav Button State
    if (this.navBtn) {
      this.navBtn.classList.toggle('sound-active', active);
      const label = this.navBtn.querySelector('.sound-label');
      if (label) {
        label.textContent = active ? 'SOUND: ON' : 'SOUND: OFF';
      }
    }

    // Floating Player State
    if (this.playBtn) {
      this.playBtn.innerHTML = active ? '<span>❚❚</span>' : '<span>▶</span>';
      this.playBtn.setAttribute('title', active ? 'Pause Soundtrack' : 'Play Soundtrack');
    }

    if (this.playerWidget) {
      this.playerWidget.classList.toggle('is-playing', active);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.noirMasterpieceAudio = new NoirMasterpieceAudio();
});
