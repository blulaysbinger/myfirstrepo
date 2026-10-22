/**
 * SHREYA SHREE PORTFOLIO — INTERACTIVE ENGINE
 * Features:
 * - Dynamic Ambient Cursor Tracking & 3D Tilt
 * - Web Audio API Sci-Fi Sound Synthesizer (Zero-dependency)
 * - Theme Switcher (Dark Cosmic / Light Aurora)
 * - Industry Tabs & Deep-Dive Modal System
 * - Creative Synergy Cross-Pollination Engine
 * - Interactive Bash-Style Terminal
 * - Form Validation & Toast Notification System
 * - One-Click Clipboard Actions
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Audio Synthesizer (Web Audio API)
  // -------------------------------------------------------------------------
  let audioCtx = null;
  let soundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  function playSuccessChord() {
    if (!soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    notes.forEach((freq, idx) => {
      setTimeout(() => playUiTone(freq, 'triangle', 0.15, 0.04), idx * 60);
    });
  }

  // Sound Toggle Control
  const soundToggleBtn = document.getElementById('soundToggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      initAudio();
      const icon = soundToggleBtn.querySelector('.sound-icon');
      if (icon) {
        icon.textContent = soundEnabled ? '🔊' : '🔈';
      }
      soundToggleBtn.title = soundEnabled ? 'Audio Effects: ON' : 'Audio Effects: OFF';
      showToast(soundEnabled ? '🔊 Audio effects enabled' : '🔈 Audio effects muted');
      if (soundEnabled) {
        playUiTone(600, 'sine', 0.1);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. Cursor Glow Follower
  // -------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursorGlow');
  const cursorDot = document.getElementById('cursorDot');

  if (cursorGlow && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      // Smooth lerp for glow
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;

      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  // -------------------------------------------------------------------------
  // 3. Theme Toggle (Cosmic Dark / Aurora Light)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('shreya_portfolio_theme') || 'dark';

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? '🌙' : '☀️';
      }
      themeToggleBtn.title = `Theme: ${theme === 'dark' ? 'Cosmic Dark' : 'Aurora Light'}`;
    }
    localStorage.setItem('shreya_portfolio_theme', theme);
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      playUiTone(450, 'triangle', 0.08);
      showToast(`Switched to ${next === 'dark' ? 'Cosmic Dark' : 'Aurora Light'} theme`);
    });
  }

  // -------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      playUiTone(isOpen ? 480 : 380, 'sine', 0.06);
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. 3D Tilt Effect on Avatar Card
  // -------------------------------------------------------------------------
  const avatarCard = document.getElementById('avatar3DCard');
  if (avatarCard && window.matchMedia('(pointer: fine)').matches) {
    avatarCard.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / (rect.height / 2)) * 12;
      const rotY = (x / (rect.width / 2)) * 12;

      avatarCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // -------------------------------------------------------------------------
  // 6. Industry Tabs Filtering
  // -------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const industryCards = document.querySelectorAll('.industry-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      playUiTone(520, 'sine', 0.06);

      industryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 7. Domain Deep Dive Modal Data & Dialog
  // -------------------------------------------------------------------------
  const modalData = {
    'modal-aero': {
      icon: '🚀',
      category: 'AEROSPACE & PROPULSION',
      title: 'Orbital Horizons & Space Exploration',
      body: `
        <p>I view aerospace as the ultimate testbed of human engineering, daring, and boundary-pushing ambition.</p>
        <h4>Key Areas of Fascination:</h4>
        <ul>
          <li><strong>Aerodynamics & Supersonic Airfoils:</strong> How boundary layer controls and computational flow dynamics unlock hypersonic travel.</li>
          <li><strong>Composite Materials in Harsh Climates:</strong> Utilizing advanced carbon weaves and ceramic thermal protection systems to survive atmospheric re-entry.</li>
          <li><strong>Democratization of Low Earth Orbit (LEO):</strong> Micro-satellites, commercial rocketry, and building resilient satellite constellations.</li>
        </ul>
        <h4>Shreya's 5-Year Goal:</h4>
        <p>Work directly alongside aerospace founders or research labs pioneering reusable propulsion architectures or lightweight satellite hulls.</p>
      `
    },
    'modal-textile': {
      icon: '🧵',
      category: 'SMART TEXTILES & MATERIAL SCIENCE',
      title: 'Intelligent Fibers & Sustainable Wearable Tech',
      body: `
        <p>Textiles are often taken for granted as traditional fashion, but they represent one of the most exciting material frontiers.</p>
        <h4>Key Areas of Fascination:</h4>
        <ul>
          <li><strong>E-Textiles & Embedded Biosensors:</strong> Weaving micro-conductive silver and carbon nanotube threads directly into garments for biometric and environmental monitoring.</li>
          <li><strong>Bio-Engineered & Regenerative Fibers:</strong> Mushroom mycelium leather, lab-grown cellulose, and circular closed-loop fashion production.</li>
          <li><strong>Aerospace Wearable Synergy:</strong> Pressurized next-gen spacesuit layers that balance ergonomic mobility with radiation protection.</li>
        </ul>
        <h4>Shreya's 5-Year Goal:</h4>
        <p>Launch or spearhead a high-tech material brand combining athletic streetwear, smart sensors, and eco-friendly manufacturing.</p>
      `
    },
    'modal-tech': {
      icon: '💻',
      category: 'TECH SYSTEMS & SOFTWARE',
      title: 'Code as Leverage & Digital Architecture',
      body: `
        <p>Software is the digital glue that binds data, physical hardware, and human connection together.</p>
        <h4>Key Areas of Fascination:</h4>
        <ul>
          <li><strong>Rapid Prototyping & Modern Web:</strong> Translating concepts into buttery, interactive digital interfaces in record time.</li>
          <li><strong>Hardware-Software Interfaces:</strong> Writing firmware and APIs that connect smart wearables to real-time mobile dashboards.</li>
          <li><strong>Generative AI & Automation:</strong> Utilizing modern models to supercharge research synthesis, design iterations, and operational speed.</li>
        </ul>
        <h4>Shreya's Mindset:</h4>
        <p>“I don’t just write code to pass exams; I code to turn concepts in my sketchbook into working tools people can interact with.”</p>
      `
    },
    'modal-business': {
      icon: '💼',
      category: 'BUSINESS STRATEGY & VENTURE LEADERSHIP',
      title: 'Execution, Unit Economics & Team Direction',
      body: `
        <p>Brilliant technology without sustainable business mechanics is merely an expensive hobby.</p>
        <h4>Key Areas of Fascination:</h4>
        <ul>
          <li><strong>First-Principles Strategy:</strong> Stripping problems down to their fundamental truths to create disruptive value propositions.</li>
          <li><strong>Cross-Functional Leadership:</strong> Speaking the dialect of developers, designers, investors, and operations teams to align on a single mission.</li>
          <li><strong>Storytelling & Brand Gravity:</strong> Crafting narratives that inspire talented people to join ambitious, high-risk undertakings.</li>
        </ul>
        <h4>Shreya's Core Philosophy:</h4>
        <p>A true leader isn’t the loudest person in the room; they are the catalyst who removes blockers, empowers others, and maintains unstoppable momentum.</p>
      `
    }
  };

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseAction = document.getElementById('modalCloseAction');
  const modalIcon = document.getElementById('modalIcon');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  function openModal(modalKey) {
    const data = modalData[modalKey];
    if (!data) return;

    modalIcon.textContent = data.icon;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playUiTone(580, 'triangle', 0.1);
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playUiTone(340, 'sine', 0.08);
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // -------------------------------------------------------------------------
  // 8. Creative Synergy Engine
  // -------------------------------------------------------------------------
  const synergyCombinations = {
    'skating-aerospace': {
      icon: '🛸',
      title: 'Skating + Aerospace = Kinematic Trajectory & Fluid Dynamics',
      desc: 'Understanding friction, angular velocity, and weight shifts on skates gives a gut-level intuition for orbital mechanics and flight stability.'
    },
    'skating-textiles': {
      icon: '🛼',
      title: 'Skating + Textiles = High-Abrasion Smart Athletic Gear',
      desc: 'Extreme movement exposes clothing stress points. Designing fabrics that endure high-speed road friction while maintaining breathability.'
    },
    'skating-tech': {
      icon: '⚡',
      title: 'Skating + Tech = Real-time Telemetry & Motion Tracking',
      desc: 'Smart skate bearings and accelerometer wearables that stream speed, lean angle, and g-force directly to mobile HUDs.'
    },
    'skating-business': {
      icon: '🏆',
      title: 'Skating + Business = High-Energy Community & Street Culture Branding',
      desc: 'Skate culture is authentic and tight-knit. Understanding how grassroots community evangelism beats multi-million dollar traditional ad budgets.'
    },
    'dance-aerospace': {
      icon: '🌌',
      title: 'Dance + Aerospace = Microgravity Spatial Orientation & Choreography',
      desc: 'Dance trains 3D bodily awareness without reference points — crucial for zero-g human habitation and astronaut ergonomics.'
    },
    'dance-textiles': {
      icon: '✨',
      title: 'Dance + Textiles = Kinetic Luminescent Performance Garments',
      desc: 'Woven fiber optics that change color based on movement tempo, deceleration, and stage lighting synchronization.'
    },
    'dance-tech': {
      icon: '🕺',
      title: 'Dance + Tech = Generative Visuals Driven by Beat & Pose Detection',
      desc: 'Using computer vision (MediaPipe) to turn human dance routines into digital vector art and interactive generative music.'
    },
    'dance-business': {
      icon: '👑',
      title: 'Dance + Business = Leadership Synchronization & Stage Presence',
      desc: 'Choreographing a crew is identical to orchestrating a startup sprint: clear tempo, assigned roles, and infectious stage presence.'
    },
    'painting-aerospace': {
      icon: '🎨',
      title: 'Painting + Aerospace = Conceptual Space Architecture & Visualizing the Cosmos',
      desc: 'Before engineers can build lunar bases or orbital stations, visionary artists must paint the aesthetic roadmap to inspire public investment.'
    },
    'painting-textiles': {
      icon: '🧵',
      title: 'Painting + Textiles = Bespoke Jacquard Weaves & Modern Wearable Canvas',
      desc: 'Turning acrylic canvas abstracts into digital textile Jacquard patterns and sustainable dye gradients.'
    },
    'painting-tech': {
      icon: '🖌️',
      title: 'Painting + Tech = Creative Coding & Shaders',
      desc: 'Translating pigment mixing algorithms and brush strokes into WebGL fragment shaders and digital UI canvas experiences.'
    },
    'painting-business': {
      icon: '💎',
      title: 'Painting + Business = Luxury Product Aesthetics & Brand Prestige',
      desc: 'Understanding color psychology and emotional resonance to turn ordinary tech commodities into aspirational luxury objects.'
    },
    'music-aerospace': {
      icon: '📡',
      title: 'Music + Aerospace = Acoustic Resonance & Vibration Engineering',
      desc: 'Acoustic resonance can destroy a rocket rocket during launch. Musical ear and harmonic physics help in understanding harmonic damping.'
    },
    'music-textiles': {
      icon: '🔊',
      title: 'Music + Textiles = Tactile Audio & Haptic Garments',
      desc: 'Textiles woven with flat piezoelectric elements that transmit bass frequencies directly through the fabric into the chest and spine.'
    },
    'music-tech': {
      icon: '🎧',
      title: 'Music + Tech = DSP, Synthesizers & Sound Architecture',
      desc: 'Building digital audio workstations, synthesizer oscillators, and procedural audio feedback systems like the ones running on this very page!'
    },
    'music-business': {
      icon: '📈',
      title: 'Music + Business = Rhythm of Execution & High-Tempo Cadence',
      desc: 'Every successful enterprise has an operating tempo. Music teaches when to accelerate, when to introduce pauses, and how to create hooks that stick.'
    }
  };

  const synergyA = document.getElementById('synergyA');
  const synergyB = document.getElementById('synergyB');
  const btnCalculateSynergy = document.getElementById('btnCalculateSynergy');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');

  function calculateSynergy() {
    if (!synergyA || !synergyB) return;
    const key = `${synergyA.value}-${synergyB.value}`;
    const combo = synergyCombinations[key] || {
      icon: '⚡',
      title: 'Multi-Disciplinary Synthesis',
      desc: 'When disparate disciplines touch, novel perspectives are born. This is the definition of the polymath mindset.'
    };

    resultIcon.textContent = combo.icon;
    resultTitle.textContent = combo.title;
    resultDesc.textContent = combo.desc;

    playSuccessChord();
    showToast(`Synthesized: ${synergyA.value.toUpperCase()} + ${synergyB.value.toUpperCase()}`);
  }

  if (btnCalculateSynergy) {
    btnCalculateSynergy.addEventListener('click', calculateSynergy);
  }

  // -------------------------------------------------------------------------
  // 9. Interactive Bash-Style Terminal
  // -------------------------------------------------------------------------
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  const terminalResponses = {
    'help': `Available queries:
  • shreya.whoami()          → Personal summary & core stats
  • shreya.the70PercentTruth() → The honest story behind 12th grade
  • shreya.passions()        → Aerospace, Textiles, Tech & Business breakdown
  • shreya.whyJackOfAllTrades() → Why cross-disciplinary skill wins
  • shreya.rollerSkatePlaylist() → What plays in my headphones while skating
  • shreya.futureVision()    → What I am aiming to accomplish
  • clear                    → Clear terminal output screen`,

    'shreya.whoami()': `SHREYA SHREE // PROFILE DUMP:
  - Age: 18 years young
  - Identity: Polymath, Relentless Doer, Emerging Leader
  - Mindset: "Done is better than perfect, but elegance is mandatory."
  - Creative Crafts: Roller Skating 🛼, Street Dance 💃, Music 🎵, Painting 🎨
  - Target Industries: Aerospace 🚀, Smart Textiles 🧵, Technology 💻, Business 💼`,

    'shreya.the70percenttruth()': `THE 70TH PERCENTILE PARADOX:
  Standard exams in 12th tested memorizing textbooks under artificial timer pressure.
  I scored ~70%ile — pretty average on paper.
  
  What that score didn't show:
  1. I don't give up when things are tough.
  2. I execute while others over-analyze.
  3. Real world success is open-book, cross-disciplinary, and demands leadership.
  I wear that 70% with pride because it ignited a fire to prove that grit > grades.`,

    'shreya.passions()': `MULTI-DOMAIN PASSIONS:
  1. Aerospace: Orbital mechanics, rocket propulsion, composite hull structures.
  2. Smart Textiles: Conductive e-fibers, biomaterials, high-performance wearables.
  3. Tech & Code: Web systems, automation, interactive software architecture.
  4. Business: Venture creation, storytelling, empathy-driven leadership.`,

    'shreya.whyjackofalltrades()': `THE FULL QUOTE MATTERS:
  "A jack of all trades is a master of none, but oftentimes better than a master of one."
  
  In 2026, narrow hyper-specialization gets automated by algorithms.
  The individuals who thrive are the synthesizers who can connect an aerospace principle 
  to a textile weave and package it with high business acumen. That is my domain.`,

    'shreya.rollerskateplaylist()': `ON SHREYA'S SKATE PLAYLIST:
  1. The Weeknd - "Blinding Lights" (Pure velocity)
  2. Daft Punk - "Voyager" (Aerospace groove)
  3. Dua Lipa - "Levitating" (Flow state rhythm)
  4. Synthwave & Cyberpunk Lo-Fi (Deep focus & coding)`,

    'shreya.futurevision()': `FUTURE GOAL:
  To lead visionary teams that build physically tangible products at the intersection 
  of wearable textile science and aerospace exploration, enabled by world-class software.
  Always learning. Always hungry. Always doing.`
  };

  function appendTerminalLine(cmdText, outputHtml) {
    if (!terminalOutput) return;

    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line';
    cmdLine.innerHTML = `<span class="prompt-user">shreya@universe:~$</span> <span>${escapeHtml(cmdText)}</span>`;
    terminalOutput.appendChild(cmdLine);

    if (outputHtml) {
      const respLine = document.createElement('div');
      respLine.className = 'term-output';
      respLine.innerHTML = outputHtml.replace(/\n/g, '<br>');
      terminalOutput.appendChild(respLine);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function runTerminalCommand(cmdRaw) {
    const cleanCmd = cmdRaw.trim().toLowerCase();
    if (!cleanCmd) return;

    playUiTone(620, 'sine', 0.05);

    if (cleanCmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    if (terminalResponses[cleanCmd]) {
      appendTerminalLine(cmdRaw, terminalResponses[cleanCmd]);
    } else {
      appendTerminalLine(cmdRaw, `Command not recognized: '${escapeHtml(cmdRaw)}'. Type 'help' for available queries.`);
    }
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      runTerminalCommand(val);
      terminalInput.value = '';
    });
  }

  // Quick Command Chips
  document.querySelectorAll('.cmd-chip, .cmd-cmd').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        if (terminalInput) terminalInput.value = cmd;
        runTerminalCommand(cmd);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 10. Contact Form Validation & Submission
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const senderMessage = document.getElementById('senderMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      if (!senderName.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      if (!senderEmail.value.trim()) {
        emailError.textContent = 'Please enter your email.';
        isValid = false;
      } else if (!validateEmail(senderEmail.value.trim())) {
        emailError.textContent = 'Please provide a valid email address.';
        isValid = false;
      }

      if (!senderMessage.value.trim() || senderMessage.value.trim().length < 10) {
        messageError.textContent = 'Please write at least 10 characters so I understand how to connect.';
        isValid = false;
      }

      if (isValid) {
        const topic = document.getElementById('messageTopic').value;
        playSuccessChord();
        showToast(`🎉 Thank you ${senderName.value}! Your message regarding "${topic}" was sent to Shreya.`);
        contactForm.reset();
      } else {
        playUiTone(220, 'sawtooth', 0.15, 0.08);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 11. Clipboard Copy Action & Toast Manager
  // -------------------------------------------------------------------------
  const toastContainer = document.getElementById('toastContainer');

  function showToast(msg, duration = 3500) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span> <span>${escapeHtml(msg)}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }

  function copyTextToClipboard(text, customSuccessMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        playSuccessChord();
        showToast(customSuccessMsg || `Copied "${text}" to clipboard!`);
      }).catch(() => {
        fallbackCopy(text, customSuccessMsg);
      });
    } else {
      fallbackCopy(text, customSuccessMsg);
    }
  }

  function fallbackCopy(text, customSuccessMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      playSuccessChord();
      showToast(customSuccessMsg || `Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast(`Contact email: ${text}`);
    }
    document.body.removeChild(textArea);
  }

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const val = el.getAttribute('data-copy');
      copyTextToClipboard(val, `Copied email: ${val}`);
    });
  });

  // -------------------------------------------------------------------------
  // 12. Active Nav Link on Scroll Spy
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-links a.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchorLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });

  console.log('⚡ Shreya Shree Portfolio Loaded. Relentless curiosity active.');
})();
