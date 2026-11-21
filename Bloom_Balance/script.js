// ---Tracker de hidratación---
const META_VASOS = 8;
let vasos = Number(localStorage.getItem("bloom_vasos")) || 0;

const vasosContador = document.getElementById("vasos-contador");
const barraAgua = document.getElementById("barra-agua");
const btnSumarVaso = document.getElementById("btn-sumar-vaso");
const btnReiniciarVasos = document.getElementById("btn-reiniciar-vasos");

function actualizarAgua() {
  vasosContador.textContent = vasos;
  const porcentaje = Math.min((vasos / META_VASOS) * 100, 100);
  barraAgua.style.width = `${porcentaje}%`;
  localStorage.setItem("bloom_vasos", vasos);
}

btnSumarVaso.addEventListener("click", () => {
  if (vasos < META_VASOS) {
    vasos += 1;
    actualizarAgua();
  }
});

btnReiniciarVasos.addEventListener("click", () => {
  vasos = 0;
  actualizarAgua();
});

actualizarAgua();

// ---Checklist de hábitos---
const checkboxes = document.querySelectorAll(".habito-item");
const mensajeHabitos = document.getElementById("mensaje-habitos");

function evaluarHabitos() {
  const total = checkboxes.length;
  const completados = Array.from(checkboxes).filter((cb) => cb.checked).length;

  if (completados === 0) {
    mensajeHabitos.textContent = "Marca tus hábitos para ir floreciendo tu día.";
  } else if (completados < total) {
    mensajeHabitos.textContent = `Llevas ${completados} de ${total} hábitos completados. ¡Sigue así!`;
  } else {
    mensajeHabitos.textContent = "¡Completaste todos tus hábitos de hoy! Excelente balance.";
  }
}

checkboxes.forEach((cb) => cb.addEventListener("change", evaluarHabitos));

// ---Temporizador Pomodoro---
const TIEMPO_INICIAL = 25 * 60;
let segundosRestantes = TIEMPO_INICIAL;
let intervaloId = null;

const relojPomodoro = document.getElementById("reloj-pomodoro");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnResetPomo = document.getElementById("btn-reset-pomo");

function renderReloj() {
  const minutos = Math.floor(segundosRestantes / 60);
  const segundos = segundosRestantes % 60;
  relojPomodoro.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

btnIniciar.addEventListener("click", () => {
  if (intervaloId !== null) return;
  intervaloId = setInterval(() => {
    if (segundosRestantes > 0) {
      segundosRestantes -= 1;
      renderReloj();
    } else {
      clearInterval(intervaloId);
      intervaloId = null;
    }
  }, 1000);
});

btnPausar.addEventListener("click", () => {
  clearInterval(intervaloId);
  intervaloId = null;
});

btnResetPomo.addEventListener("click", () => {
  clearInterval(intervaloId);
  intervaloId = null;
  segundosRestantes = TIEMPO_INICIAL;
  renderReloj();
});

renderReloj();