const user = localStorage.getItem("nombre");
const carritoAuth = JSON.parse(localStorage.getItem("carrito")) || [];
const rutaActual = window.location.pathname;

if (!user && !rutaActual.includes("index.html"))
{
    window.location.replace("index.html");
}

if (rutaActual.includes("ticket.html"))
{
    if (carritoAuth.length === 0)
    {
        window.location.replace("productos.html");
    }
}