"use strict";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONFIGURACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
var CFG = {
  audioSrc:  "audio/cenicienta.mp3",
  whatsapp:  "51950729470",
  eventDate: "2026-07-10T20:00:00-05:00",
  mapsQuery: "Gaetano Sullana Piura Perú"
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FONDO DE ESTRELLAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initStars() {
  var canvas = document.getElementById("starsCanvas");
  if (!canvas) return;

  var frag = document.createDocumentFragment();

  for (var i = 0; i < 150; i++) {
    var star = document.createElement("div");
    var sz   = (Math.random() * 2.1 + 0.5).toFixed(1);
    var dur  = (Math.random() * 5 + 2.5).toFixed(1);
    var del  = (Math.random() * 8).toFixed(1);
    var op   = (Math.random() * 0.55 + 0.3).toFixed(2);

    star.className = "star";
    star.style.cssText =
      "width:" + sz + "px;" +
      "height:" + sz + "px;" +
      "left:" + (Math.random() * 100).toFixed(2) + "%;" +
      "top:" + (Math.random() * 100).toFixed(2) + "%;" +
      "--dur:" + dur + "s;" +
      "--delay:" + del + "s;" +
      "--op:" + op;

    frag.appendChild(star);
  }

  canvas.appendChild(frag);
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DESTELLOS DEL HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initSparkles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var container = document.getElementById("heroSparkles");
  if (!container) return;

  var symbols = ["✦", "✧", "⋆", "✦", "✧", "⋆"];
  var points  = [
    { x: 10, y: 14 }, { x: 88, y: 10 }, { x: 5,  y: 52 },
    { x: 93, y: 48 }, { x: 18, y: 82 }, { x: 80, y: 80 },
    { x: 50, y: 6  }, { x: 32, y: 92 }, { x: 68, y: 90 },
    { x: 94, y: 28 }, { x: 4,  y: 28 }, { x: 55, y: 3  }
  ];

  var frag = document.createDocumentFragment();

  points.forEach(function(pt, i) {
    var el   = document.createElement("span");
    var sz   = (Math.random() * 0.5 + 0.55).toFixed(2);
    var dur  = (Math.random() * 3 + 2).toFixed(1);
    var del  = (Math.random() * 5).toFixed(1);
    var lift = -(Math.random() * 16 + 8).toFixed(1);

    el.className  = "sparkle";
    el.textContent = symbols[i % symbols.length];
    el.setAttribute("aria-hidden", "true");
    el.style.cssText =
      "left:" + pt.x + "%;" +
      "top:" + pt.y + "%;" +
      "font-size:" + sz + "rem;" +
      "--dur:" + dur + "s;" +
      "--delay:" + del + "s;" +
      "--lift:" + lift + "px";

    frag.appendChild(el);
  });

  container.appendChild(frag);
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMACIÓN LETRA POR LETRA DEL NOMBRE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function splitNames() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var idx = 0;

  document.querySelectorAll("[data-split]").forEach(function(el) {
    var fullText = el.textContent;
    var chars    = Array.from(fullText);
    el.textContent = "";

    // Screen reader text
    var srSpan = document.createElement("span");
    srSpan.className = "sr-only";
    srSpan.textContent = fullText;
    el.appendChild(srSpan);

    chars.forEach(function(ch) {
      var span = document.createElement("span");
      span.className = "ch";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--i", idx);
      span.textContent = ch === " " ? " " : ch;
      el.appendChild(span);
      idx++;
    });
  });
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CUENTA REGRESIVA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initCountdown() {
  var target = new Date(CFG.eventDate).getTime();
  var elD    = document.getElementById("cdD");
  var elH    = document.getElementById("cdH");
  var elM    = document.getElementById("cdM");
  var elS    = document.getElementById("cdS");
  var grid   = document.getElementById("cdGrid");

  if (!elD || !elH || !elM || !elS || !grid) return;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    var diff = target - Date.now();

    if (diff <= 0) {
      grid.innerHTML =
        '<div style="grid-column:1/-1;font-family:\'Cormorant Garamond\',serif;' +
        'font-size:1.75rem;font-style:italic;color:#F0D878;padding:16px 0;">' +
        '¡Hoy es el gran día! 🎉</div>';
      clearInterval(timerId);
      return;
    }

    var totalSec = Math.floor(diff / 1000);
    elD.textContent = pad(Math.floor(totalSec / 86400));
    elH.textContent = pad(Math.floor((totalSec % 86400) / 3600));
    elM.textContent = pad(Math.floor((totalSec % 3600) / 60));
    elS.textContent = pad(totalSec % 60);
  }

  tick();
  var timerId = setInterval(tick, 1000);
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ENLACE GOOGLE MAPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function setMapsLink() {
  var btn = document.getElementById("mapsBtn");
  if (!btn) return;
  btn.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(CFG.mapsQuery);
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONFIRMACIÓN POR WHATSAPP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initConfirm() {
  var input    = document.getElementById("guestName");
  var wrap     = document.getElementById("fieldWrap");
  var errorEl  = document.getElementById("fieldError");
  var acceptEl = document.getElementById("acceptBtn");

  if (!input || !wrap || !errorEl || !acceptEl) return;

  var errorTimer = null;

  function showError(msg) {
    clearTimeout(errorTimer);
    wrap.classList.add("has-error");
    errorEl.textContent = msg;
    input.focus();
    errorTimer = setTimeout(function() {
      wrap.classList.remove("has-error");
    }, 1800);
  }

  function clearError() {
    clearTimeout(errorTimer);
    wrap.classList.remove("has-error");
    errorEl.textContent = "";
  }

  function sendConfirmation() {
    var name = input.value.trim();

    if (!name) {
      showError("Por favor escribe tu nombre para confirmar.");
      return;
    }

    clearError();

    var msg = encodeURIComponent(
      "¡Hola! Confirmo mi asistencia para los 15 años de Branny Sayumi. " +
      "Mi nombre es: " + name
    );

    window.open(
      "https://wa.me/" + CFG.whatsapp + "?text=" + msg,
      "_blank",
      "noopener,noreferrer"
    );
  }

  acceptEl.addEventListener("click", sendConfirmation);

  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") sendConfirmation();
  });

  input.addEventListener("input", clearError);
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REVEAL EN SCROLL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initReveal() {
  var items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function(el) { el.classList.add("in"); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });

  items.forEach(function(el) { observer.observe(el); });
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REPRODUCTOR DE AUDIO — Autoplay con 3 estrategias
   1) Play directo al cargar (funciona si hay gesto previo)
   2) Play silenciado → desmutear (casi siempre permitido)
   3) Play al primer toque del usuario (fallback universal)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initAudio() {
  var btn = document.getElementById("audioBtn");
  if (!btn) return;

  var TARGET_VOL = 0.55;

  var track    = new Audio(CFG.audioSrc);
  track.loop    = true;
  track.preload = "auto";
  track.volume  = 0;        // empieza en 0 para hacer fade-in

  var playing      = false;
  var fallbackDone = false; // guarda que el fallback no se dispare dos veces

  /* --- Estado visual del botón --- */
  function setState(active) {
    playing = active;
    btn.classList.toggle("is-playing", active);
    btn.setAttribute("aria-pressed", String(active));
    btn.setAttribute("aria-label", active ? "Pausar música" : "Reproducir música");
  }

  /* --- Sube el volumen suavemente de 0 a TARGET_VOL --- */
  function fadeIn() {
    var step  = TARGET_VOL / 25;
    var timer = setInterval(function() {
      if (track.volume + step >= TARGET_VOL) {
        track.volume = TARGET_VOL;
        clearInterval(timer);
      } else {
        track.volume += step;
      }
    }, 60);
  }

  /* --- Pausa manual --- */
  function pause() {
    track.pause();
    setState(false);
  }

  /* --- Botón flotante: toggle play/pause --- */
  btn.addEventListener("click", function() {
    if (playing) {
      pause();
    } else {
      track.volume = 0;
      track.muted  = false;
      track.play()
        .then(function() { setState(true); fadeIn(); })
        .catch(function() { setState(false); });
    }
  });

  /* ─── Estrategia 1: play directo al cargar ─── */
  track.play()
    .then(function() {
      setState(true);
      fadeIn();
    })
    .catch(function() {

      /* ─── Estrategia 2: play silenciado → desmutear ─── */
      track.muted  = true;
      track.volume = 0;
      track.play()
        .then(function() {
          track.muted = false;   // quitar silencio inmediatamente
          setState(true);
          fadeIn();
        })
        .catch(function() {

          /* ─── Estrategia 3: esperar primer toque del usuario ─── */
          setState(false);

          var EVENTS = ["pointerdown", "touchstart", "click", "keydown"];

          function onFirstTouch() {
            if (fallbackDone) return;
            fallbackDone = true;

            /* limpiar todos los listeners de fallback */
            EVENTS.forEach(function(evt) {
              document.removeEventListener(evt, onFirstTouch);
            });

            track.muted  = false;
            track.volume = 0;
            track.play()
              .then(function() { setState(true); fadeIn(); })
              .catch(function() { setState(false); });
          }

          EVENTS.forEach(function(evt) {
            document.addEventListener(evt, onFirstTouch, { passive: true });
          });
        });
    });

  /* ─── Reanudar si el usuario regresa a la pestaña ─── */
  document.addEventListener("visibilitychange", function() {
    if (!document.hidden && playing) {
      track.play().catch(function() {});
    }
  });
}());
