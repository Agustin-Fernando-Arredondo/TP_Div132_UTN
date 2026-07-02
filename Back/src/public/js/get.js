const formulario = document.getElementById("getProduct-form");
const contenedorProductos = document.getElementById("contenedor-productos");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const id = evento.target.idProd.value;

    try 
    {

        const response = await fetch(`/products/${id}`);

        const data = await response.json();

        if (!response.ok) 
        {
            mostrarError(data.message);
            return;
        }

        contenedorProductos.innerHTML = `
            <div class="card-producto">
                <img src="${data.imagen}">
                <h4>${data.nombre}</h4>
                <p>ID: ${data.id}</p>
                <p>$${data.precio}</p>
            </div>
        `;

    } 
    
    catch (error)
    {
        contenedorProductos.innerHTML = `<p>Error en la petición</p>`;
    }
});

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}