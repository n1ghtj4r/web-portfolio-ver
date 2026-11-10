/* =========================================================
   JOHN DENVER GARCIA — site behaviour (no dependencies)
   1. Invert theme (persisted)   2. Grid overlay
   3. Manila clock               4. Copy email
   5. Placeholder-link notice
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var gridBtn = document.getElementById('gridToggle');
  var toast = document.getElementById('toast');
  var toastTimer;

  /* ---------- 1. theme ---------- */
  function readTheme() {
    try { return localStorage.getItem('nv-theme'); } catch (e) { return null; }
  }
  function saveTheme(value) {
    try { localStorage.setItem('nv-theme', value); } catch (e) { /* private mode */ }
  }
  function applyTheme(value) {
    var inverted = value === 'invert';
    root.setAttribute('data-theme', inverted ? 'invert' : 'light');
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', String(inverted));
      themeBtn.textContent = inverted ? 'LIGHT' : 'INVERT';
    }
  }

  applyTheme(readTheme() === 'invert' ? 'invert' : 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'invert' ? 'light' : 'invert';
      applyTheme(next);
      saveTheme(next);
    });
  }

  /* ---------- 2. grid overlay ---------- */
  if (gridBtn) {
    gridBtn.addEventListener('click', function () {
      var on = document.body.classList.toggle('show-grid');
      gridBtn.setAttribute('aria-pressed', String(on));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('show-grid')) {
        document.body.classList.remove('show-grid');
        gridBtn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /* ---------- 3. Manila clock + year ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false
      });
    } catch (e) { fmt = null; }
    var tick = function () {
      var now = new Date();
      if (fmt) {
        clock.textContent = fmt.format(now);
      } else {
        clock.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      }
    };
    tick();
    setInterval(tick, 30000);
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 4. copy email ---------- */
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email') || '';
      var done = function () {
        copyBtn.textContent = 'COPIED ' + email;
        showToast('EMAIL COPIED TO CLIPBOARD');
        setTimeout(function () { copyBtn.textContent = 'COPY EMAIL ADDRESS'; }, 2600);
      };
      var fail = function () {
        showToast('COPY BLOCKED — SELECT ' + email + ' BY HAND');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, fail);
      } else {
        var field = document.createElement('textarea');
        field.value = email;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(field);
        ok ? done() : fail();
      }
    });
  }

  /* ---------- 5. placeholder links ---------- */
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 3200);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('[data-placeholder]');
    if (!link) return;
    e.preventDefault();
    showToast('PLACEHOLDER LINK — OWNER OF THIS SITE MUST SWAP THE HREF');
  });
})();
