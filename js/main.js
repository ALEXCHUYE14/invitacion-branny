"use strict";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONFIGURACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
var CFG = {
  audioSrc:  "audio/cenicienta.mp3",
  eventDate: "2026-07-10T20:00:00-05:00",
  mapsQuery: "Gaetano Sullana Piura Perú",
  sheetsUrl: "https://script.google.com/macros/s/AKfycbw0zONZALbHB7Ax0Z6MRsE2teIXTR3ityE33m9XDmZS5rQgP7U2-5xOlwv5t0YtrnncZQ/exec"
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
   CONFIRMACIÓN DE ASISTENCIA → Google Sheets
   Máquina de estados: idle | loading | success | error
   Sin WhatsApp. Previene envíos duplicados.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initConfirm() {
  var inpName      = document.getElementById("guestName");
  var inpDni       = document.getElementById("guestDni");
  var inpCel       = document.getElementById("guestCel");
  var wrapName     = document.getElementById("fieldWrapName");
  var wrapDni      = document.getElementById("fieldWrapDni");
  var wrapCel      = document.getElementById("fieldWrapCel");
  var errName      = document.getElementById("fieldErrorName");
  var errDni       = document.getElementById("fieldErrorDni");
  var errCel       = document.getElementById("fieldErrorCel");
  var acceptEl     = document.getElementById("acceptBtn");
  var elBtnText    = document.getElementById("btnText");
  var elSpinner    = document.getElementById("btnSpinner");
  var elCheck      = document.getElementById("btnCheck");
  var elSuccess    = document.getElementById("confirmSuccess");
  var elSuccessName = document.getElementById("successGuestName");

  if (!inpName || !inpDni || !inpCel || !acceptEl) return;

  /* ── Máquina de estados UI ────────────────────────── */
  var uiState = "idle"; // idle | loading | success | error

  var BTN_LABELS = {
    idle:    "Aceptar Invitación",
    loading: "Confirmando…",
    success: "¡Asistencia Confirmada! ✦",
    error:   "Sin conexión — Intenta de nuevo"
  };

  function setUiState(state) {
    uiState = state;
    acceptEl.disabled      = (state === "loading" || state === "success");
    acceptEl.dataset.state = state;

    if (elBtnText)  { elBtnText.textContent = BTN_LABELS[state]; }
    if (elSpinner)  { elSpinner.hidden       = (state !== "loading"); }
    if (elCheck)    { elCheck.hidden         = (state !== "success"); }
  }

  /* ── Helpers de validación ───────────────────────── */
  function showFieldError(wrap, errEl, msg) {
    wrap.classList.add("has-error");
    errEl.textContent = msg;
  }

  function clearFieldError(wrap, errEl) {
    wrap.classList.remove("has-error");
    errEl.textContent = "";
  }

  function clearAllErrors() {
    clearFieldError(wrapName, errName);
    clearFieldError(wrapDni,  errDni);
    clearFieldError(wrapCel,  errCel);
  }

  function validate(name, dni, cel) {
    if (!name) {
      showFieldError(wrapName, errName, "Por favor escribe tu nombre completo.");
      inpName.focus();
      return false;
    }
    if (dni.length !== 8) {
      showFieldError(wrapDni, errDni, "El DNI debe tener exactamente 8 dígitos.");
      inpDni.focus();
      return false;
    }
    if (cel.replace(/\D/g, "").length < 7) {
      showFieldError(wrapCel, errCel, "Ingresa un número de celular válido.");
      inpCel.focus();
      return false;
    }
    return true;
  }

  /* ── Registro asíncrono en Google Sheets ─────────── */
  /* no-cors → respuesta opaca (status 0).
     fetch() sólo rechaza ante fallo de red real (sin conexión).
     Por eso el catch captura únicamente errores de red genuinos. */
  function postToSheets(name, dni, cel) {
    if (!CFG.sheetsUrl) { return Promise.resolve(); }
    var body = new URLSearchParams({ nombre: name, dni: dni, celular: cel });
    return fetch(CFG.sheetsUrl, { method: "POST", mode: "no-cors", body: body });
  }

  /* ── Flujo principal ─────────────────────────────── */
  function validateAndSend() {
    if (uiState !== "idle") { return; } /* bloquea doble envío */

    var name = inpName.value.trim();
    var dni  = inpDni.value.replace(/\D/g, "");
    var cel  = inpCel.value.trim();

    clearAllErrors();
    if (!validate(name, dni, cel)) { return; }

    setUiState("loading");

    postToSheets(name, dni, cel)
      .then(function() {
        /* Éxito: registro enviado a Google Sheets */
        setUiState("success");

        /* Mostrar panel de confirmación con el nombre del invitado */
        if (elSuccessName) { elSuccessName.textContent = name; }
        if (elSuccess) {
          elSuccess.hidden = false;
          setTimeout(function() {
            elSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 80);
        }
      })
      .catch(function() {
        /* Error de red (sin conexión). Auto-reset a idle tras 3.5 s */
        setUiState("error");
        setTimeout(function() { setUiState("idle"); }, 3500);
      });
  }

  /* ── Event listeners ─────────────────────────────── */
  acceptEl.addEventListener("click", validateAndSend);

  inpName.addEventListener("keydown", function(e) {
    if (e.key === "Enter") { e.preventDefault(); inpDni.focus(); }
  });
  inpDni.addEventListener("keydown", function(e) {
    if (e.key === "Enter") { e.preventDefault(); inpCel.focus(); }
  });
  inpCel.addEventListener("keydown", function(e) {
    if (e.key === "Enter") { validateAndSend(); }
  });

  [[inpName, wrapName, errName],
   [inpDni,  wrapDni,  errDni],
   [inpCel,  wrapCel,  errCel]].forEach(function(t) {
    t[0].addEventListener("input", function() { clearFieldError(t[1], t[2]); });
  });
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DESTELLOS GLOBALES — aparecen en todas las secciones
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initGlobalSparkles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* Paleta de colores y sus glows */
  var COLORS = [
    { c: "rgba(255,255,255,.88)",   g: "rgba(200,235,255,.80)" },  /* blanco puro    */
    { c: "rgba(200,232,255,.80)",   g: "rgba(135,200,240,.70)" },  /* celeste claro  */
    { c: "rgba(212,175, 55,.70)",   g: "rgba(212,175, 55,.50)" },  /* dorado suave   */
    { c: "rgba(180,220,248,.75)",   g: "rgba(100,185,240,.65)" },  /* azul hielo     */
    { c: "rgba(255,255,255,.95)",   g: "rgba(255,255,255,.60)" }   /* blanco brillante */
  ];

  /* Tipos: 'sym' = símbolo Unicode, 'dot' = punto, 'cross' = cruceta CSS */
  var SYMS = ["✦", "✧", "⋆", "✦", "✧", "✦", "⋆", "✦"];

  /* Cuántas partículas por sección (aleatorio entre min y max) */
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randF(min, max) {
    return (Math.random() * (max - min) + min);
  }

  function buildParticle(container) {
    var types    = ["sym", "sym", "sym", "dot", "dot", "cross"];
    var type     = types[randInt(0, types.length - 1)];
    var color    = COLORS[randInt(0, COLORS.length - 1)];
    var dur      = randF(2.2, 5.8).toFixed(2);
    var delay    = randF(0, 7).toFixed(2);
    var lift     = -randF(8, 22).toFixed(1);
    var rot      = randF(-35, 35).toFixed(1);
    var op       = randF(0.55, 0.92).toFixed(2);
    var left     = randF(2, 97).toFixed(2);
    var top      = randF(3, 96).toFixed(2);

    var el = document.createElement("span");
    el.setAttribute("aria-hidden", "true");

    var baseClass = "sspark sspark--" + type;
    el.className  = baseClass;

    var sz;
    if (type === "sym") {
      sz = randF(0.45, 1.0).toFixed(2) + "rem";
      el.textContent = SYMS[randInt(0, SYMS.length - 1)];
    } else if (type === "dot") {
      sz = randF(2, 5).toFixed(1) + "px";
    } else {
      sz = randF(5, 9).toFixed(1) + "px";
    }

    el.style.cssText =
      "left:"      + left  + "%;"  +
      "top:"       + top   + "%;"  +
      "--sd:"      + dur   + "s;"  +
      "--dd:"      + delay + "s;"  +
      "--lift:"    + lift  + "px;" +
      "--rot:"     + rot   + "deg;"+
      "--op:"      + op    + ";"   +
      "--sz:"      + sz    + ";"   +
      "--sc:"      + color.c + ";" +
      "--sg:"      + color.g + ";";

    container.appendChild(el);
  }

  /* Inyectar en cada .section-sparkles */
  var containers = document.querySelectorAll(".section-sparkles");
  containers.forEach(function(ctr) {
    var count = randInt(14, 22);
    var frag  = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      buildParticle(frag);
    }
    ctr.appendChild(frag);
  });

  /* También densificar el hero con partículas adicionales del nuevo tipo */
  var heroExtra = document.getElementById("heroSparkles");
  if (heroExtra) {
    var frag2 = document.createDocumentFragment();
    for (var j = 0; j < 10; j++) {
      buildParticle(frag2);
    }
    heroExtra.appendChild(frag2);
  }
}());
