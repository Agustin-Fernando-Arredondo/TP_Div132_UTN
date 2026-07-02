const nombre = localStorage.getItem("nombre");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.getElementById("cliente").textContent = nombre;
document.getElementById("fecha").textContent = new Date().toLocaleDateString();

let total = 0;
const detalle = document.getElementById("detalle");

carrito.forEach(p => {
    total += p.precio * p.cantidad;

    detalle.innerHTML += `
        <p>${p.nombre} x${p.cantidad} - $${p.precio}</p>
    `;
});

document.getElementById("total").textContent = total;

localStorage.removeItem("carrito");

function volver() {
    localStorage.clear();
    window.location.href = "index.html";
}