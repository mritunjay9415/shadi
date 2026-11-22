/**
 * Wedding Invitation Interactive Script (Mobile-First Optimized)
 * - Live Countdown to 11/12/2026
 * - Venue Tabs & Google Maps Routing (Durga Palace, SP Lawn & Our Home)
 * - Mobile Bottom Dock Quick Actions (WhatsApp, Music, Venues)
 * - Flower Shower Petal Animation (Canvas with Mobile Battery Optimization)
 * - Auspicious Indian Ambient Melody (Web Audio API Synthesizer)
 * - WhatsApp Share Invitation Generator (Preeti & Suryansh - Singh Family Invitation)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. AUSPICIOUS WEDDING COUNTDOWN TIMER
     Wedding Date: 11th December 2026 at 18:30 (6:30 PM Baraat)
     ========================================================= */
  const weddingDate = new Date('December 11, 2026 18:30:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.innerText = "00";
      if (hoursEl) hoursEl.innerText = "00";
      if (minutesEl) minutesEl.innerText = "00";
      if (secondsEl) secondsEl.innerText = "00";
      const title = document.querySelector('.countdown-title');
      if (title) title.innerText = "The Wedding Celebrations Have Begun!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = String(days).padStart(3, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* =========================================================
     2. VENUE TABS SWITCHING (DURGA PALACE, SP LAWN & OUR HOME)
     ========================================================= */
  const venueTabBtns = document.querySelectorAll('.venue-tab-btn');
  const venueCards = document.querySelectorAll('.venue-display-card');

  venueTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update Tab Buttons
      venueTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show Selected Venue Card
      venueCards.forEach(card => {
        if (card.id === targetId) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  });


  /* =========================================================
     3. MOBILE NAVBAR & BACKDROP (Smooth Slide & Close)
     ========================================================= */
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navToggleIcon = document.getElementById('navToggleIcon');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function openMobileNav() {
    if (navLinks) navLinks.classList.add('show');
    if (navBackdrop) navBackdrop.classList.add('show');
    if (navToggleIcon) {
      navToggleIcon.classList.remove('fa-bars');
      navToggleIcon.classList.add('fa-xmark');
    }
  }

  function closeMobileNav() {
    if (navLinks) navLinks.classList.remove('show');
    if (navBackdrop) navBackdrop.classList.remove('show');
    if (navToggleIcon) {
      navToggleIcon.classList.remove('fa-xmark');
      navToggleIcon.classList.add('fa-bars');
    }
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('show')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileNav);
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }


  /* =========================================================
     4. PETALS / FLOWER SHOWER ANIMATION (CANVAS)
     Optimized for mobile CPU and battery efficiency
     ========================================================= */
  const canvas = document.getElementById('petalsCanvas');
  let ctx = canvas ? canvas.getContext('2d') : null;
  let petals = [];
  let isPetalShowerActive = true;
  let animationFrameId;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
      this.y = -20 - Math.random() * 40;
      this.size = window.innerWidth < 768 ? (8 + Math.random() * 10) : (10 + Math.random() * 14);
      this.speedY = 1.0 + Math.random() * 1.5;
      this.speedX = Math.sin(Math.random() * Math.PI) * 1.2;
      this.angle = Math.random() * 360;
      this.angularSpeed = (Math.random() - 0.5) * 1.8;
      this.colorType = Math.random() > 0.4 ? 'rose' : (Math.random() > 0.5 ? 'marigold' : 'gold');
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y / 35) + this.speedX * 0.35;
      this.angle += this.angularSpeed;

      if (canvas && (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20)) {
        this.reset();
      }
    }

    draw() {
      if (!ctx) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);

      if (this.colorType === 'rose') {
        ctx.fillStyle = "rgba(216, 27, 96, 0.75)";
      } else if (this.colorType === 'marigold') {
        ctx.fillStyle = "rgba(255, 179, 0, 0.85)";
      } else {
        ctx.fillStyle = "rgba(255, 215, 0, 0.8)";
      }

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  if (canvas && ctx) {
    // 14 petals on mobile phones, 35 on desktop
    const petalCount = window.innerWidth < 768 ? 14 : 35;
    for (let i = 0; i < petalCount; i++) {
      const p = new Petal();
      p.y = Math.random() * canvas.height;
      petals.push(p);
    }

    function animatePetals() {
      if (!isPetalShowerActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animatePetals);
    }

    animatePetals();

    // Pause animation when tab or mobile browser is in background
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else if (isPetalShowerActive) {
        animatePetals();
      }
    });

    const petalToggle = document.getElementById('petalToggle');
    if (petalToggle) {
      petalToggle.addEventListener('click', () => {
        isPetalShowerActive = !isPetalShowerActive;
        petalToggle.classList.toggle('active', isPetalShowerActive);
        if (isPetalShowerActive) {
          animatePetals();
        }
      });
    }
  }


  /* =========================================================
     5. AUSPICIOUS MUSIC / TANPURA SHEHNAI SYNTHESIZER
     (Gentle Traditional Indian Harmonic Drone & Sitar Melody)
     Uses Web Audio API - Zero broken external files or CDNs!
     ========================================================= */
  let audioCtx = null;
  let isPlayingMusic = false;
  let droneOscillators = [];
  let melodyInterval = null;

  const musicToggleBtn = document.getElementById('musicToggle');
  const dockMusicBtn = document.getElementById('dockMusic');
  const dockMusicText = document.getElementById('dockMusicText');

  const raagNotes = [
    277.18, // Sa
    311.13, // Re
    349.23, // Ga
    392.00, // Ma (Teevra)
    415.30, // Pa
    466.16, // Dha
    523.25, // Ni
    554.37  // Taar Sa
  ];

  function startIndianAmbience() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      const baseFreqs = [138.59, 207.65, 277.18];
      droneOscillators = baseFreqs.map(freq => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        const lfo = audioCtx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + Math.random() * 0.15, audioCtx.currentTime);
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        lfo.start();

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        return osc;
      });

      let noteIndex = 0;
      const melodySequence = [0, 2, 4, 3, 2, 0, 4, 6, 7, 6, 4, 2, 0];

      melodyInterval = setInterval(() => {
        if (!audioCtx || audioCtx.state !== 'running') return;
        const noteFreq = raagNotes[melodySequence[noteIndex % melodySequence.length]];
        noteIndex++;

        const noteOsc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);

        noteGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

        noteOsc.connect(noteGain);
        noteGain.connect(masterGain);

        noteOsc.start();
        noteOsc.stop(audioCtx.currentTime + 1.9);
      }, 1600);

      isPlayingMusic = true;

      // Update Desktop Button
      if (musicToggleBtn) {
        musicToggleBtn.classList.add('active');
        musicToggleBtn.querySelector('i').className = 'fa-solid fa-volume-high';
      }

      // Update Mobile Bottom Dock Button
      if (dockMusicBtn) {
        dockMusicBtn.classList.add('playing');
        if (dockMusicText) dockMusicText.innerText = 'Playing';
      }
    } catch (err) {
      console.warn("Audio Context init error:", err);
    }
  }

  function stopIndianAmbience() {
    if (melodyInterval) clearInterval(melodyInterval);
    if (droneOscillators.length) {
      droneOscillators.forEach(osc => {
        try { osc.stop(); } catch(e){}
      });
      droneOscillators = [];
    }
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    isPlayingMusic = false;

    // Update Desktop Button
    if (musicToggleBtn) {
      musicToggleBtn.classList.remove('active');
      musicToggleBtn.querySelector('i').className = 'fa-solid fa-music';
    }

    // Update Mobile Bottom Dock Button
    if (dockMusicBtn) {
      dockMusicBtn.classList.remove('playing');
      if (dockMusicText) dockMusicText.innerText = 'Music';
    }
  }

  function toggleMusic() {
    if (isPlayingMusic) {
      stopIndianAmbience();
    } else {
      startIndianAmbience();
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }

  if (dockMusicBtn) {
    dockMusicBtn.addEventListener('click', toggleMusic);
  }


  /* =========================================================
     6. WHATSAPP SHARE INVITATION (MOBILE OPTIMIZED)
     Formatted with Preeti & Suryansh from the Singh Family (Bride's Side),
     separate morning & evening timings, and all 3 Google Maps Venue Routes!
     ========================================================= */
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  const dockWhatsappBtn = document.getElementById('dockWhatsapp');

  function triggerWhatsAppShare() {
    const inviteMessage = `✨ *|| श्री गणेशाय नमः ||* ✨
🌸 *Wedding Invitation: Preeti weds Suryansh* 🌸
_(With heartfelt warm regards from the Singh Family)_

Respected Relatives & Elders,
The *Singh Family* cordially invites you and your family to celebrate the auspicious wedding ceremonies of our beloved daughter *Preeti* with *Suryansh* (Son of Raghuvanshi Family) in the holy city of Varanasi!

🗓️ *CEREMONIES & AUSPICIOUS DATES:*

💍 *1. Ring Ceremony & Tilak (07/12/2026 - Monday)*
⏰ Ring Ceremony: *11:00 AM*
⏰ Tilak Ceremony: *07:00 PM*
📍 *Venue:* SP Lawn, Chotta Lalpur, Pandeypur, Varanasi
🗺️ *Google Maps Route to SP Lawn:*
https://www.google.com/maps/dir/?api=1&destination=SP+lawn,+chotalalpur,+pandeypur,+Varanasi

💛 *2. Haldi, Mehndi & Sangeet (09/12/2026 - Wednesday)*
⏰ Haldi & Mehndi: *11:00 AM Onwards*
⏰ Sangeet & Musical Night: *07:00 PM Onwards*
📍 *Venue:* Our Residence (Sanjay Singh Residency, Vashno Vihar Colony, Akhari Bypass, Varanasi)
📌 *Exact Postal Address:* 6359, Amara Village, Bari bazar, Amara Khaira Chak, UP 221106
🗺️ *Google Maps Route to Our Home:*
https://www.google.com/maps/dir/?api=1&destination=6359,+Amara+Village,+Bari+bazar,+Amara+Khaira+Chak,+Uttar+Pradesh+221106,+India

👑 *3. The Grand Wedding (11/12/2026 - Friday)*
⏰ Welcoming the Baraat: *06:30 PM* | Jaimala & Feast: *08:30 PM* | Saat Phere & Kanyadaan: *11:30 PM*
📍 *Venue:* Durga Palace, Pandeypur, Varanasi, Uttar Pradesh
🗺️ *Google Maps Route to Durga Palace:*
https://www.google.com/maps/dir/?api=1&destination=Durga+Palace,+pandeypur,+Varanasi,+Uttar+Pradesh

Looking forward to your gracious presence and heartfelt blessings for our daughter!
_With Folded Hands, The Singh Family_`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`;
    window.open(whatsappUrl, '_blank');
  }

  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', triggerWhatsAppShare);
  }

  if (dockWhatsappBtn) {
    dockWhatsappBtn.addEventListener('click', triggerWhatsAppShare);
  }

});
