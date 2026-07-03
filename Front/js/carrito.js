console.log("carrito.js cargado");
const contenedor = document.getElementById("carrito");

const totalSpan = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCarrito() 
{
    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => 
    {
        total += producto.precio * producto.cantidad;

        contenedor.innerHTML += `
            <div class="card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>

                <button onclick="restar(${producto.id})">-</button>
                ${producto.cantidad}
                <button onclick="sumar(${producto.id})">+</button>

                <button onclick="eliminar(${producto.id})">Eliminar</button>
            </div>
        `;
    });

    totalSpan.textContent = total;
}

function sumar(id) 
{
    const prod = carrito.find(producto => producto.id === id);
    prod.cantidad++;
    guardar();
}

function restar(id) {
    const prod = carrito.find(producto => producto.id === id);

    if (prod.cantidad > 1) 
    {
        prod.cantidad--;
    } 
    
    else
    {
        eliminar(id);
        return;
    }

    guardar();
}

function eliminar(id)
{
    carrito = carrito.filter(producto => producto.id !== id);
    guardar();
}

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

async function confirmarCompra()
{

    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }

    const confirmar = confirm("¿Confirmar compra?");

    if (!confirmar) return;

    const nombre = localStorage.getItem("nombre");

    const venta = 
        {
        nombre_usuario: nombre,
        precio_total: totalSpan.textContent,
        productos: carrito.map(producto => ({
            id: producto.id,
            cantidad: producto.cantidad
        }))
    };


    try 
    {
        await fetch("http://localhost:3000/api/sales", 
        {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(venta)
        });


        window.location.href = "ticket.html";
    } 
    catch (error) {
        console.error("Error en compra:", error);
    }
}

document.getElementById("btn-finalizar").addEventListener("click", confirmarCompra);

renderCarrito();