/* ==========================================================================
   NOIR CULTURE SOCIETY — MASTERPIECE AUDIO SYSTEM
   Curated Haute-Couture Soundscape & Haunting Melancholic Soundtracks
   Features:
   - Track 01: Sergei Rachmaninoff — Vocalise, Op. 34 No. 14 (Violin & Piano)
               Performed by Roxana Pavel Goldstein (Violin) & Monica Goldstein (Piano)
   - Track 02: Erik Satie — Gymnopédie No. 1 (Lent et douloureux) Solo Piano Master Recording
   - Track 03: Noir Atelier Runway — Sub-Bass Drone & Analog Tape Flutter (Generative Synth)
   - Interactive Audio Visualizer, Volume Crossfade, & Floating Atelier Player
   ========================================================================== */

class NoirMasterpieceAudio {
  constructor() {
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.targetVolume = 0.65;
    this.fadeInterval = null;

    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';

    // Curated haute-couture playlist
    this.tracks = [
      {
        id: 'vocalise',
        title: 'VOCALISE, OP. 34 NO. 14 (VIOLIN & PIANO)',
        artist: 'SERGEI RACHMANINOFF // GOLDSTEIN DUO',
        type: 'file',
        src: 'assets/audio/masterpiece_vocalise.ogg',
        badge: 'VIOLIN & PIANO MASTERPIECE',
        description: 'Heartbreaking Russian romanticism transcribed for violin and piano. Dark, sorrowful, and deeply atmospheric.'
      },
      {
        id: 'satie',
        title: 'GYMNOPÉDIE NO. 1 (LENT ET DOULOUREUX)',
        artist: 'ERIK SATIE // STUDIO PARIS',
        type: 'file',
        src: 'assets/audio/masterpiece_satie.mp3',
        badge: 'MINIMALIST FRENCH PIANO',
        description: 'Iconic French minimalist master recording. Fragile, slow, contemplative piano echoing through brutalist spaces.'
      },
      {
        id: 'synth',
        title: 'SUB-BASS RUNWAY DRONE // D MINOR',
        artist: 'NOIR ATELIER SYNTHESIZER',
        type: 'generative',
        badge: 'BRUTALIST ANALOG RUNWAY',
        description: 'Real-time 48Hz analog sub-bass oscillation with subtle tape saturation and atmospheric warmth.'
      }
    ];

    // Web Audio API for generative synth & master volume/filters
    this.audioCtx = null;
    this.masterGain = null;
    this.synthOscs = [];
    this.synthGain = null;

    // DOM Elements
    this.navBtn = document.getElementById('soundToggleBtn');
    this.playerWidget = document.getElementById('atelierPlayerWidget');
    this.playBtn = document.getElementById('playerPlayBtn');
    this.trackTitleEl = document.getElementById('playerTrackTitle');
    this.trackArtistEl = document.getElementById('playerTrackArtist');
    this.trackBadgeEl = document.getElementById('playerTrackBadge');
    this.progressBar = document.getElementById('playerProgressBar');
    this.progressFill = document.getElementById('playerProgressFill');
    this.timeDisplay = document.getElementById('playerTimeDisplay');
    this.volSlider = document.getElementById('playerVolSlider');
    this.nextBtn = document.getElementById('playerNextBtn');
    this.prevBtn = document.getElementById('playerPrevBtn');
    this.widgetToggleBtn = document.getElementById('playerWidgetToggle');

    this.init();
  }

  init() {
    // Set initial track source
    this.audioElement.src = this.tracks[0].src;
    this.audioElement.volume = this.targetVolume;

    // Listeners for progress and automatic track continuation
    this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
    this.audioElement.addEventListener('ended', () => this.onTrackEnded());

    // Navigation toggle in top header
    if (this.navBtn) {
      this.navBtn.addEventListener('click', () => this.togglePlay());
    }

    // Floating player play/pause button
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }

    // Next / Previous buttons
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.switchTrack(1));
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.switchTrack(-1));
    }

    // Progress bar scrubbing / seeking
    if (this.progressBar) {
      this.progressBar.addEventListener('click', (e) => {
        if (this.tracks[this.currentTrackIndex].type === 'file' && this.audioElement.duration) {
          const rect = this.progressBar.getBoundingClientRect();
          const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          this.audioElement.currentTime = pos * this.audioElement.duration;
        }
      });
    }

    // Master volume slider
    if (this.volSlider) {
      this.volSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.setVolume(val);
      });
    }

    // Minimize / Maximize floating player widget
    if (this.widgetToggleBtn && this.playerWidget) {
      this.widgetToggleBtn.addEventListener('click', () => {
        this.playerWidget.classList.toggle('is-collapsed');
        this.widgetToggleBtn.textContent = this.playerWidget.classList.contains('is-collapsed') ? '[+]' : '[—]';
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

    // Warm brutalist low-pass filter
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(3.0, this.audioCtx.currentTime);
    filter.connect(this.masterGain);

    // D minor foundational frequencies (D2, A2, F3)
    const freqs = [73.42, 110.0, 174.61];
    this.synthOscs = freqs.map((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      osc.type = i === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq + (i * 0.35), this.audioCtx.currentTime);
      g.gain.setValueAtTime(i === 0 ? 0.22 : 0.14, this.audioCtx.currentTime);
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
      // Smooth fade-in
      this.audioElement.volume = 0;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlaying = true;
          this.fadeVolume(0, this.targetVolume, 800);
          this.updateUIState(true);
        }).catch(err => {
          console.warn("Audio playback gesture required:", err);
        });
      }
    } else {
      this.setupSynthContext();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, this.targetVolume * 0.4), this.audioCtx.currentTime + 1.2);
      this.isPlaying = true;
      this.updateUIState(true);
    }
  }

  pause() {
    const currentTrack = this.tracks[this.currentTrackIndex];

    if (currentTrack.type === 'file') {
      this.fadeVolume(this.audioElement.volume, 0, 400, () => {
        this.audioElement.pause();
        this.audioElement.volume = this.targetVolume;
      });
    } else if (this.audioCtx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.6);
    }

    this.isPlaying = false;
    this.updateUIState(false);
  }

  fadeVolume(from, to, duration, callback) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const steps = 20;
    const stepTime = duration / steps;
    const delta = (to - from) / steps;
    let current = from;
    let stepCount = 0;

    this.fadeInterval = setInterval(() => {
      stepCount++;
      current += delta;
      if (stepCount >= steps) {
        current = to;
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        if (callback) callback();
      }
      this.audioElement.volume = Math.max(0, Math.min(1, current));
    }, stepTime);
  }

  switchTrack(direction) {
    const wasPlaying = this.isPlaying;
    this.pause();

    this.currentTrackIndex = (this.currentTrackIndex + direction + this.tracks.length) % this.tracks.length;
    const nextTrack = this.tracks[this.currentTrackIndex];

    if (nextTrack.type === 'file') {
      this.audioElement.src = nextTrack.src;
      this.audioElement.currentTime = 0;
    }

    this.updateTrackDisplay();

    if (wasPlaying) {
      setTimeout(() => this.play(), 250);
    }
  }

  onTrackEnded() {
    // Seamlessly move to the next masterpiece track
    this.switchTrack(1);
    if (this.isPlaying) {
      this.play();
    }
  }

  setVolume(val) {
    this.targetVolume = val;
    this.audioElement.volume = val;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(val * 0.4, this.audioCtx.currentTime);
    }
  }

  updateProgress() {
    if (this.tracks[this.currentTrackIndex].type !== 'file') {
      if (this.progressFill) this.progressFill.style.width = '100%';
      if (this.timeDisplay) this.timeDisplay.textContent = 'LIVE // SYNTH';
      return;
    }

    if (this.audioElement.duration && this.progressFill) {
      const pct = (this.audioElement.currentTime / this.audioElement.duration) * 100;
      this.progressFill.style.width = `${pct}%`;

      if (this.timeDisplay) {
        const curMin = Math.floor(this.audioElement.currentTime / 60);
        const curSec = Math.floor(this.audioElement.currentTime % 60).toString().padStart(2, '0');
        const durMin = Math.floor(this.audioElement.duration / 60);
        const durSec = Math.floor(this.audioElement.duration % 60).toString().padStart(2, '0');
        this.timeDisplay.textContent = `${curMin}:${curSec} / ${durMin}:${durSec}`;
      }
    }
  }

  updateTrackDisplay() {
    const track = this.tracks[this.currentTrackIndex];
    if (this.trackTitleEl) this.trackTitleEl.textContent = track.title;
    if (this.trackArtistEl) this.trackArtistEl.textContent = track.artist;
    if (this.trackBadgeEl && track.badge) this.trackBadgeEl.textContent = track.badge;

    const trackIndexEl = document.getElementById('playerTrackIndex');
    if (trackIndexEl) {
      trackIndexEl.textContent = `TRACK 0${this.currentTrackIndex + 1} // 0${this.tracks.length}`;
    }

    if (this.progressFill) {
      this.progressFill.style.width = '0%';
    }
  }

  updateUIState(active) {
    // Header Nav Toggle State
    if (this.navBtn) {
      this.navBtn.classList.toggle('sound-active', active);
      const label = this.navBtn.querySelector('.sound-label');
      if (label) {
        label.textContent = active ? 'SOUND: ON' : 'SOUND: OFF';
      }
    }

    // Floating Player Widget State
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
