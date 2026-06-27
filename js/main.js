"use strict";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONFIGURACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
var CFG = {
  audioSrc:  "audio/cenicienta.mp3",
  eventDate: "2026-07-17T20:00:00-05:00",
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
   CONTADOR DE PASES — Estado compartido con initConfirm
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
var currentPases = 1;
var MAX_PASES    = 5;

(function initPases() {
  var btnDown = document.getElementById("pasesDown");
  var btnUp   = document.getElementById("pasesUp");
  var numEl   = document.getElementById("pasesNum");

  if (!btnDown || !btnUp || !numEl) return;

  function animateBump() {
    numEl.classList.remove("bump");
    /* reflow fuerza reinicio de la animación */
    void numEl.offsetWidth;
    numEl.classList.add("bump");
  }

  function updateDisplay() {
    numEl.textContent = currentPases;
    btnDown.disabled  = (currentPases <= 1);
    btnUp.disabled    = (currentPases >= MAX_PASES);
  }

  btnDown.addEventListener("click", function() {
    if (currentPases > 1) {
      currentPases--;
      updateDisplay();
      animateBump();
    }
  });

  btnUp.addEventListener("click", function() {
    if (currentPases < MAX_PASES) {
      currentPases++;
      updateDisplay();
      animateBump();
    }
  });

  updateDisplay();
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOAST — INVITADO YA REGISTRADO
   Controlado desde initConfirm. No depende de librerías.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
var Toast = (function() {
  var el       = document.getElementById("dupToast");
  var closeBtn = document.getElementById("dupToastClose");
  var timerId  = null;

  function hide() {
    if (!el) return;
    el.classList.remove("toast-show");
    clearTimeout(timerId);
    timerId = null;
  }

  function show() {
    if (!el) return;
    clearTimeout(timerId);
    el.classList.add("toast-show");
    /* Auto-cierre a los 6 s */
    timerId = setTimeout(hide, 6000);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", hide);
  }

  return { show: show, hide: hide };
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONFIRMACIÓN DE ASISTENCIA → Google Sheets
   Máquina de estados: idle | loading | success | error
   Anti-duplicados: capa 1 localStorage, capa 2 GET Sheets.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initConfirm() {
  var inpName       = document.getElementById("guestName");
  var inpDni        = document.getElementById("guestDni");
  var inpCel        = document.getElementById("guestCel");
  var wrapName      = document.getElementById("fieldWrapName");
  var wrapDni       = document.getElementById("fieldWrapDni");
  var wrapCel       = document.getElementById("fieldWrapCel");
  var errName       = document.getElementById("fieldErrorName");
  var errDni        = document.getElementById("fieldErrorDni");
  var errCel        = document.getElementById("fieldErrorCel");
  var acceptEl      = document.getElementById("acceptBtn");
  var elSuccess     = document.getElementById("confirmSuccess");
  var elSuccessName = document.getElementById("successGuestName");

  if (!inpName || !inpDni || !inpCel || !acceptEl) return;

  /* ── Clave de localStorage ───────────────────────── */
  var LS_PREFIX = "branny_guest_";

  function lsIsRegistered(dni) {
    try { return !!localStorage.getItem(LS_PREFIX + dni); }
    catch (e) { return false; }
  }

  function lsSaveRegistered(dni) {
    try { localStorage.setItem(LS_PREFIX + dni, "1"); }
    catch (e) { /* cuotas llenas o modo privado — ignorar silenciosamente */ }
  }

  /* ── Máquina de estados: idle | checking | loading | success | error ── */
  var uiState = "idle";

  function setUiState(state) {
    uiState = state;
    acceptEl.disabled      = (state !== "idle");
    acceptEl.dataset.state = state;
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
    var ok = true;
    if (!name) {
      showFieldError(wrapName, errName, "Por favor escribe tu nombre completo.");
      if (ok) { inpName.focus(); ok = false; }
    }
    if (dni.length !== 8) {
      showFieldError(wrapDni, errDni, "El DNI debe tener exactamente 8 dígitos.");
      if (ok) { inpDni.focus(); ok = false; }
    }
    if (cel.replace(/\D/g, "").length < 7) {
      showFieldError(wrapCel, errCel, "Ingresa un número de celular válido.");
      if (ok) { inpCel.focus(); ok = false; }
    }
    return ok;
  }

  /* ── Verificación contra Sheets (GET, con timeout) ── */
  function checkDuplicateRemote(dni) {
    if (!CFG.sheetsUrl) { return Promise.resolve(false); }
    var url = CFG.sheetsUrl + "?action=check&dni=" + encodeURIComponent(dni);
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timeout = controller
      ? setTimeout(function() { controller.abort(); }, 5000)
      : null;
    return fetch(url, controller ? { signal: controller.signal } : {})
      .then(function(res) {
        clearTimeout(timeout);
        return res.json();
      })
      .then(function(data) {
        return data && data.exists === true;
      })
      .catch(function() {
        clearTimeout(timeout);
        return false; /* ante error de red, dejamos pasar (fail open) */
      });
  }

  var elSuccessPases = document.getElementById("successPases");
  var wrapPases      = document.getElementById("fieldWrapPases");
  var errPases       = document.getElementById("fieldErrorPases");

  /* ── Registro asíncrono en Google Sheets ─────────── */
  function postToSheets(name, dni, cel, pases) {
    if (!CFG.sheetsUrl) { return Promise.resolve(); }
    var body = new URLSearchParams({
      nombre:  name,
      dni:     dni,
      celular: cel,
      pases:   String(pases)
    });
    return fetch(CFG.sheetsUrl, { method: "POST", mode: "no-cors", body: body });
  }

  /* ── Mostrar panel de éxito ──────────────────────── */
  function showSuccess(name, pases) {
    if (elSuccessName)  { elSuccessName.textContent = name; }
    if (elSuccessPases) { elSuccessPases.textContent = pases; }
    if (elSuccess) {
      elSuccess.hidden = false;
      setTimeout(function() {
        elSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }

  /* ── Flujo principal ─────────────────────────────── */
  function validateAndSend() {
    if (uiState !== "idle") { return; }

    var name  = inpName.value.trim();
    var dni   = inpDni.value.replace(/\D/g, "");
    var cel   = inpCel.value.trim();
    var pases = currentPases;

    clearAllErrors();

    /* Validar pases (defensa: nunca debería fallar con los botones +/-) */
    if (pases < 1 || pases > MAX_PASES) {
      if (wrapPases && errPases) {
        wrapPases.classList.add("has-error");
        errPases.textContent = "Selecciona entre 1 y " + MAX_PASES + " pases.";
      }
      return;
    }

    if (!validate(name, dni, cel)) { return; }

    /* Capa 1: localStorage (mismo dispositivo) — respuesta inmediata */
    if (lsIsRegistered(dni)) {
      Toast.show();
      return;
    }

    /* Capa 2: verificar contra Sheets (cross-device) */
    setUiState("checking");

    checkDuplicateRemote(dni)
      .then(function(isDuplicate) {
        if (isDuplicate) {
          setUiState("idle");
          lsSaveRegistered(dni);
          Toast.show();
          return;
        }

        setUiState("loading");

        postToSheets(name, dni, cel, pases)
          .then(function() {
            lsSaveRegistered(dni);
            setUiState("success");
            showSuccess(name, pases);
          })
          .catch(function() {
            setUiState("error");
            setTimeout(function() { setUiState("idle"); }, 3500);
          });
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

  /* Limpiar error de pases si existiera (en caso de manipulación manual) */
  if (wrapPases && errPases) {
    wrapPases.addEventListener("click", function() {
      wrapPases.classList.remove("has-error");
      errPases.textContent = "";
    });
  }
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
   REPRODUCTOR DE AUDIO — Módulo expuesto como AudioPlayer.
   El splash garantiza el gesto del usuario, por lo que
   play() siempre se llama dentro de un evento de interacción.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
var AudioPlayer = (function() {
  var btn = document.getElementById("audioBtn");
  var TARGET_VOL = 0.55;

  var track = new Audio(CFG.audioSrc);
  track.loop    = true;
  track.preload = "auto";
  track.volume  = 0;

  var playing = false;

  function setState(active) {
    playing = active;
    if (!btn) return;
    btn.classList.toggle("is-playing", active);
    btn.setAttribute("aria-pressed", String(active));
    btn.setAttribute("aria-label", active ? "Pausar música" : "Reproducir música");
  }

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

  function pause() {
    track.pause();
    setState(false);
  }

  function play() {
    if (playing) return;
    track.volume = 0;
    track.muted  = false;
    track.play()
      .then(function() { setState(true); fadeIn(); })
      .catch(function() { setState(false); });
  }

  if (btn) {
    btn.addEventListener("click", function() {
      playing ? pause() : play();
    });
  }

  document.addEventListener("visibilitychange", function() {
    if (!document.hidden && playing) {
      track.play().catch(function() {});
    }
  });

  return { play: play, pause: pause };
}());

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SPLASH SCREEN — Pantalla de bienvenida.
   Al hacer clic el navegador registra el gesto del usuario,
   lo que permite que audio.play() funcione sin bloqueos.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initSplash() {
  var splash      = document.getElementById("splashScreen");
  var splashBtn   = document.getElementById("splashBtn");
  var splashStars = document.getElementById("splashStars");

  if (!splash || !splashBtn) return;

  /* Generar estrellas en el fondo del splash */
  if (splashStars) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 120; i++) {
      var s  = document.createElement("div");
      var sz = (Math.random() * 2 + 0.4).toFixed(1);
      s.className = "splash-star";
      s.style.cssText =
        "width:"    + sz + "px;" +
        "height:"   + sz + "px;" +
        "left:"     + (Math.random() * 100).toFixed(2) + "%;" +
        "top:"      + (Math.random() * 100).toFixed(2) + "%;" +
        "--dur:"    + (Math.random() * 4 + 2).toFixed(1) + "s;" +
        "--delay:"  + (Math.random() * 6).toFixed(1) + "s;" +
        "--op:"     + (Math.random() * 0.55 + 0.30).toFixed(2);
      frag.appendChild(s);
    }
    splashStars.appendChild(frag);
  }

  splashBtn.addEventListener("click", function() {
    /* 1. Música — garantizada por el gesto del usuario */
    AudioPlayer.play();

    /* 2. Ocultar splash con transición */
    document.body.style.overflow = "";
    splash.classList.add("is-hidden");
    setTimeout(function() {
      if (splash.parentNode) { splash.parentNode.removeChild(splash); }
    }, 900);
  });

  /* Bloquear scroll mientras el splash está visible */
  document.body.style.overflow = "hidden";
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
