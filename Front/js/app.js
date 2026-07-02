const URL = "http://localhost:3000/api/products";

let productosGlobal = [];

async function cargarProductos()
{
    try 
    {
        const res = await fetch(URL);
        const data = await res.json();

        productosGlobal = data.payload.filter(producto => producto.activo); 

        renderProductos(productosGlobal);
    } 
    
    catch (error)   
    {
        console.error("Error cargando productos:", error);
    }
}

function renderProductos(productos) 
{
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="card">
                <img src="${producto.imagen}" width="150">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>

                <button onclick='agregarAlCarrito(${JSON.stringify(producto)})'>
                    Agregar
                </button>
            </div>
        `;
    });
}

function filtrar(tipo) {
    const filtrados = productosGlobal.filter(producto => producto.categoria === tipo);
    renderProductos(filtrados);
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(productoNuevo => productoNuevo.id === producto.id);

    if (existe)
    {
        existe.cantidad++;
    }

    else
    {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado");
}

cargarProductos();