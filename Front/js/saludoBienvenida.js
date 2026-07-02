document.addEventListener("DOMContentLoaded", () => {

    const nombre = localStorage.getItem("nombre");
    const saludo = document.getElementById("saludo");

    if (nombre) {
        saludo.textContent = `Bienvenido, ${nombre}! 👋`;
    } else {
        saludo.textContent = "Bienvenido!";
    }
    
});