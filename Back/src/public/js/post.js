const formularioProducto = document.getElementById("postProduct-form");

const formularioUsuario = document.getElementById("postUser-form");

const contenedorProductos = document.getElementById("contenedor-productos");

formularioProducto.addEventListener("submit", async (evento) => 
{  
    evento.preventDefault();

    const formData = new FormData(evento.target);

    const body = Object.fromEntries(formData);

    try
    {
        const response = await fetch("/api/products", 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) 
        {
            mostrarError(data.message);
            return;
        }

        mostrarExito(data.message);
        evento.target.reset();

    }

    catch (error)
    {
        console.log(body);
        contenedorProductos.innerHTML = `<p>Error en la petición</p>`;
    }
});

formularioUsuario.addEventListener("submit", async (evento) =>
{
    evento.preventDefault();

    const formData = new FormData(evento.target);
    const body = Object.fromEntries(formData);

    try {
        const response = await fetch("/api/users", 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarError(data.message);
            return;
        }

        mostrarExito("Usuario creado");
        evento.target.reset();

    }
    catch (error) {
        contenedorProductos.innerHTML = `<p>Error en la petición</p>`;
    }
});

function mostrarExito(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-exito">${mensaje}</p>
    `;
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}