// ── LÓGICA DEL RELOJ DE ESPERA (COUNTDOWN) ──
// Configura la fecha de lanzamiento aquí (Año, Mes, Día)
const launchDate = new Date("sep 01, 2026 00:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    // Cálculos matemáticos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Inyectar en el HTML y asegurar ceros a la izquierda (05, 09, etc)
    document.getElementById("days").innerText = String(days).padStart(3, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

    // Si la cuenta llega a cero
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("story-clock").innerHTML = "<span class='cyan-text'>SISTEMA ONLINE</span>";
    }
}, 1000);

// ── LÓGICA DE APARICIÓN AL HACER SCROLL (REVEAL) ──
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            // Un pequeño retraso para que aparezcan en cascada
            setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));

// ── CUENTA REGRESIVA FALSA PARA LA "GUERRA DE ESCRITORES" ──
let totalGuerra = 6 * 3600 + 23 * 60 + 41; // 6h 23m 41s en segundos
setInterval(() => {
    if (totalGuerra <= 0) return;
    totalGuerra--;
    const h = String(Math.floor(totalGuerra / 3600)).padStart(2,'0');
    const m = String(Math.floor((totalGuerra % 3600) / 60)).padStart(2,'0');
    const s = String(totalGuerra % 60).padStart(2,'0');
    
    // Busca el div de la guerra y lo actualiza
    const guerraText = document.querySelector('.guerra-arena div:last-child');
    if (guerraText && guerraText.innerText.includes("VOTACIÓN")) {
        guerraText.textContent = `VOTACIÓN CIERRA EN: ${h}:${m}:${s} · 1,633 VOTOS TOTALES`;
    }
}, 1000);