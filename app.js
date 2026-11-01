document.getElementById("year").textContent = new Date().getFullYear();
 
// Menú para celular
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
 
menuBtn.addEventListener("click", () => {
  const abierto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", abierto);
});
 
// Cierra el menú al elegir una opción
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});
 
// Resalta la sección activa en el menú (según el scroll)
const secciones = document.querySelectorAll("main section[id]");
const enlaces = nav.querySelectorAll("a");
 
function marcarActivo() {
  const header = document.querySelector(".header");
  const linea = header.offsetHeight + 20; // justo debajo de la barra
  let actual = secciones[0].id;
 
  secciones.forEach(sec => {
    if (sec.getBoundingClientRect().top <= linea) actual = sec.id;
  });
 
  // Si llegó al final de la página, marca la última sección
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
    actual = secciones[secciones.length - 1].id;
  }
 
  enlaces.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + actual));
}
 
window.addEventListener("scroll", marcarActivo, { passive: true });
window.addEventListener("resize", marcarActivo);
marcarActivo();
 
// Galería: ver imagen ampliada
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
 
document.getElementById("gallery").addEventListener("click", e => {
  if (e.target.tagName === "IMG") {
    lbImg.src = e.target.src;
    lbImg.alt = e.target.alt;
    lightbox.hidden = false;
  }
});
 
function cerrarVisor() { lightbox.hidden = true; }
document.getElementById("lbClose").addEventListener("click", cerrarVisor);
lightbox.addEventListener("click", e => { if (e.target === lightbox) cerrarVisor(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarVisor(); });
 
// Formulario de contacto (validación simple, sin servidor)
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
 
form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const correo = form.correo.value.trim();
  const mensaje = form.mensaje.value.trim();
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
 
  if (!nombre || !mensaje || !correoValido) {
    formMsg.textContent = "Completa todos los campos con un correo válido.";
    formMsg.className = "form-msg error";
    return;
  }
  formMsg.textContent = "¡Gracias, " + nombre + "! Hemos recibido tu mensaje.";
  formMsg.className = "form-msg ok";
  form.reset();
});
 