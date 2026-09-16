/**
 * Personal Page & Live Clock Dashboard Logic
 * Features: High-precision real-time clock, dynamic greeting, day progression,
 * theme customizer, and persistent user profile management.
 */

(function () {
  'use strict';

  // --- Storage Keys ---
  const STORAGE_KEYS = {
    NAME: 'personal_page_user_name',
    ROLE: 'personal_page_user_role',
    BIO: 'personal_page_user_bio',
    FORMAT: 'personal_page_time_format',
    THEME: 'personal_page_theme',
    AVATAR: 'personal_page_avatar'
  };

  // --- Default Profile State ---
  const DEFAULT_PROFILE = {
    name: 'Alex Morgan',
    role: 'Software Architect & Designer',
    bio: 'Building intuitive digital experiences at the intersection of design, intelligent systems, and modern technology.'
  };

  // --- Curated Quotes ---
  const QUOTES = [
    {
      text: "Time is the canvas upon which we paint our boldest ideas.",
      author: "Creative Reflection"
    },
    {
      text: "The future belongs to those who build with intention, curiosity, and speed.",
      author: "Modern Technologist"
    },
    {
      text: "Simplicity is about subtracting the obvious and adding the meaningful.",
      author: "John Maeda"
    },
    {
      text: "Every second is an opportunity to design something that inspires.",
      author: "Architecture of Code"
    },
    {
      text: "Focus is not saying yes to what you want, but saying no to a hundred other good ideas.",
      author: "Steve Jobs"
    }
  ];

  let currentQuoteIndex = 0;
  let is24HourFormat = localStorage.getItem(STORAGE_KEYS.FORMAT) === '24h';

  // --- DOM Elements ---
  const elHours = document.getElementById('clockHours');
  const elMinutes = document.getElementById('clockMinutes');
  const elSeconds = document.getElementById('clockSeconds');
  const elAmpm = document.getElementById('clockAmpm');
  const elDateText = document.getElementById('calendarDateText');
  const elDayProgressBar = document.getElementById('dayProgressBar');
  const elDayPercentText = document.getElementById('dayPercentText');
  const elTimeZone = document.getElementById('timeZoneName');

  const elGreetingEmoji = document.getElementById('greetingEmoji');
  const elGreetingPhase = document.getElementById('greetingPhase');
  const elGreetingHeading = document.getElementById('greetingHeading');

  const elUserNameDisplay = document.getElementById('userNameDisplay');
  const elUserRoleDisplay = document.getElementById('userRoleDisplay');
  const elUserBioDisplay = document.getElementById('userBioDisplay');

  const btn12h = document.getElementById('btn12h');
  const btn24h = document.getElementById('btn24h');

  // Edit Modal Elements
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editProfileForm');
  const inputName = document.getElementById('inputName');
  const inputRole = document.getElementById('inputRole');
  const inputBio = document.getElementById('inputBio');
  const btnCancelEdit = document.getElementById('btnCancelEdit');
  const headerEditBtn = document.getElementById('headerEditBtn');
  const editNameInlineBtn = document.getElementById('editNameInlineBtn');

  // Quote elements
  const elQuoteText = document.getElementById('quoteText');
  const elQuoteAuthor = document.getElementById('quoteAuthor');
  const btnNextQuote = document.getElementById('btnNextQuote');

  // Footer
  const elCurrentYear = document.getElementById('currentYear');

  // --- Initialization ---
  function init() {
    initProfile();
    initTheme();
    initTimeZone();
    initClock();
    initQuoteWidget();
    setupEventListeners();

    if (elCurrentYear) {
      elCurrentYear.textContent = new Date().getFullYear();
    }
  }

  // --- Profile Management ---
  function initProfile() {
    const savedName = localStorage.getItem(STORAGE_KEYS.NAME) || DEFAULT_PROFILE.name;
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE) || DEFAULT_PROFILE.role;
    const savedBio = localStorage.getItem(STORAGE_KEYS.BIO) || DEFAULT_PROFILE.bio;

    renderProfile(savedName, savedRole, savedBio);
  }

  function renderProfile(name, role, bio) {
    if (elUserNameDisplay) elUserNameDisplay.textContent = name;
    if (elUserRoleDisplay) elUserRoleDisplay.textContent = role;
    if (elUserBioDisplay) elUserBioDisplay.textContent = bio;

    updateGreeting(name);
  }

  function openEditModal() {
    const currentName = localStorage.getItem(STORAGE_KEYS.NAME) || DEFAULT_PROFILE.name;
    const currentRole = localStorage.getItem(STORAGE_KEYS.ROLE) || DEFAULT_PROFILE.role;
    const currentBio = localStorage.getItem(STORAGE_KEYS.BIO) || DEFAULT_PROFILE.bio;

    inputName.value = currentName;
    inputRole.value = currentRole;
    inputBio.value = currentBio;

    editModal.classList.add('open');
    inputName.focus();
  }

  function closeEditModal() {
    editModal.classList.remove('open');
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    const newName = inputName.value.trim() || DEFAULT_PROFILE.name;
    const newRole = inputRole.value.trim() || DEFAULT_PROFILE.role;
    const newBio = inputBio.value.trim() || DEFAULT_PROFILE.bio;

    localStorage.setItem(STORAGE_KEYS.NAME, newName);
    localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
    localStorage.setItem(STORAGE_KEYS.BIO, newBio);

    renderProfile(newName, newRole, newBio);
    closeEditModal();
  }

  // --- Time & Clock Functionality ---
  function initTimeZone() {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (elTimeZone) {
        elTimeZone.textContent = timeZone || 'Local';
      }
    } catch (e) {
      if (elTimeZone) elTimeZone.textContent = 'Local Time';
    }
  }

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format determination
    let ampm = '';
    if (is24HourFormat) {
      if (elAmpm) elAmpm.style.display = 'none';
    } else {
      if (elAmpm) {
        elAmpm.style.display = 'inline-block';
        ampm = hours >= 12 ? 'PM' : 'AM';
        elAmpm.textContent = ampm;
      }
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
    }

    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');

    // Date String
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (elDateText) {
      elDateText.textContent = now.toLocaleDateString(undefined, dateOptions);
    }

    // Day Progress (seconds elapsed out of 86400 in a day)
    const rawHours = now.getHours();
    const totalSeconds = (rawHours * 3600) + (minutes * 60) + seconds;
    const dayProgressPercent = ((totalSeconds / 86400) * 100).toFixed(1);

    if (elDayProgressBar) {
      elDayProgressBar.style.width = `${dayProgressPercent}%`;
    }
    if (elDayPercentText) {
      elDayPercentText.textContent = `${dayProgressPercent}%`;
    }
  }

  function initClock() {
    updateClockFormatButtons();
    updateClock();
    // Update every second with accurate alignment
    setInterval(updateClock, 1000);
  }

  function updateClockFormatButtons() {
    if (is24HourFormat) {
      btn24h.classList.add('active');
      btn12h.classList.remove('active');
    } else {
      btn12h.classList.add('active');
      btn24h.classList.remove('active');
    }
  }

  function setClockFormat(format) {
    is24HourFormat = (format === '24h');
    localStorage.setItem(STORAGE_KEYS.FORMAT, is24HourFormat ? '24h' : '12h');
    updateClockFormatButtons();
    updateClock();
  }

  // --- Dynamic Greeting Based on Time of Day ---
  function updateGreeting(name) {
    const hour = new Date().getHours();
    const firstName = name.split(' ')[0] || name;

    let greeting = 'Good day';
    let phase = 'Daytime Focus';
    let emoji = '☀️';

    if (hour >= 5 && hour < 12) {
      greeting = `Good morning, ${firstName}!`;
      phase = 'Morning Momentum';
      emoji = '🌅';
    } else if (hour >= 12 && hour < 17) {
      greeting = `Good afternoon, ${firstName}!`;
      phase = 'High Productivity';
      emoji = '☀️';
    } else if (hour >= 17 && hour < 22) {
      greeting = `Good evening, ${firstName}!`;
      phase = 'Golden Twilight';
      emoji = '🌆';
    } else {
      greeting = `Burning the midnight oil, ${firstName}!`;
      phase = 'Deep Focus & Solitude';
      emoji = '🌙';
    }

    if (elGreetingHeading) elGreetingHeading.textContent = greeting;
    if (elGreetingPhase) elGreetingPhase.textContent = phase;
    if (elGreetingEmoji) elGreetingEmoji.textContent = emoji;
  }

  // --- Quotes Widget ---
  function initQuoteWidget() {
    renderQuote(currentQuoteIndex);
  }

  function renderQuote(index) {
    const q = QUOTES[index % QUOTES.length];
    if (elQuoteText && elQuoteAuthor) {
      elQuoteText.style.opacity = '0';
      setTimeout(() => {
        elQuoteText.textContent = `"${q.text}"`;
        elQuoteAuthor.textContent = `— ${q.author}`;
        elQuoteText.style.opacity = '1';
      }, 150);
    }
  }

  function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
    renderQuote(currentQuoteIndex);
  }

  // --- Theme Customizer ---
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'indigo';
    applyTheme(savedTheme);
  }

  function applyTheme(themeName) {
    if (themeName === 'indigo') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }

    document.querySelectorAll('.theme-dot').forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('data-theme') === themeName);
    });

    localStorage.setItem(STORAGE_KEYS.THEME, themeName);
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // 12h / 24h Toggles
    if (btn12h) btn12h.addEventListener('click', () => setClockFormat('12h'));
    if (btn24h) btn24h.addEventListener('click', () => setClockFormat('24h'));

    // Modal Triggers
    if (headerEditBtn) headerEditBtn.addEventListener('click', openEditModal);
    if (editNameInlineBtn) editNameInlineBtn.addEventListener('click', openEditModal);
    if (btnCancelEdit) btnCancelEdit.addEventListener('click', closeEditModal);
    if (editForm) editForm.addEventListener('submit', handleSaveProfile);

    // Close modal on click outside dialog
    if (editModal) {
      editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
      });
    }

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && editModal.classList.contains('open')) {
        closeEditModal();
      }
    });

    // Theme Picker Dots
    document.querySelectorAll('.theme-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const theme = dot.getAttribute('data-theme');
        applyTheme(theme);
      });
    });

    // Next Quote Button
    if (btnNextQuote) {
      btnNextQuote.addEventListener('click', nextQuote);
    }
  }

  // Run on DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
