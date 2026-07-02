const btn = document.getElementById("btnContinuar");

btn.addEventListener("click", () => 
{
    const nombre = document.getElementById("nombre").value;

    if (nombre.trim() === "") 
    {
        alert("Ingresá tu nombre");
        return;
    }

    localStorage.setItem("nombre", nombre);

    window.location.href = "productos.html";
});