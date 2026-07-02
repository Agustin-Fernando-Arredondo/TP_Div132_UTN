const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorForm = document.getElementById("contenedor-form");
const formulario = document.getElementById("getProduct-form");

formulario.addEventListener("submit", async (evento) => 
{
    evento.preventDefault();

    const id = evento.target.idProd.value;

    try
    {
        const response = await fetch(`/products/${id}`);

        const producto = await response.json();

        if (!response.ok) 
        {
            mostrarError(producto.message);
            return;
        }

        contenedorProductos.innerHTML = `
            <div class="card-producto">
                <img src="${producto.imagen}">
                <h4>${producto.nombre}</h4>
                <p>ID: ${producto.id}</p>
                <p>$${producto.precio}</p>
            </div>
        `;

        const htmlForm = `
        <hr>
        <form id="updateProduct-form" class="form-alta">

            <input type="hidden" name="id" value="${producto.id}">

            <label>Nombre</label>
            <input type="text" name="nombre" value="${producto.nombre}" required>

            <label>Imagen</label>
            <input type="text" name="imagen" value="${producto.imagen}" required>

            <label>Categoria</label>
            <select name="categoria" required>
                <option value="food" ${producto.categoria === "food" ? "selected" : ""}>comida</option>
                <option value="drink" ${producto.categoria === "drink" ? "selected" : ""}>bebida</option>
            </select>

            <label>Precio</label>
            <input type="number" name="precio" value="${producto.precio}" required>

            <label>Activo</label>
            <select name="activo">
                <option value="1" ${producto.activo == 1 ? "selected" : ""}>activo</option>
                <option value="0" ${producto.activo == 0 ? "selected" : ""}>inactivo</option>
            </select>

            <div>
                <input type="submit" value="Actualizar producto">
            </div>
        </form>
        `;

        contenedorForm.innerHTML = htmlForm;

        document.getElementById("updateProduct-form").addEventListener("submit", async (evento) => 
        {

            evento.preventDefault();

            const formData = new FormData(evento.target);
            const body = Object.fromEntries(formData);

            const response = await fetch(`/products/${id}`, 
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) 
            {
                mostrarError("Error al actualizar");
                return;
            }

            mostrarExito("Producto actualizado");
            contenedorForm.innerHTML = "";
        });

    } 

    catch (error)
    {
        contenedorProductos.innerHTML = `<p>Error en la petición</p>`;
    }
});

function mostrarError(mensaje)
{
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}

function mostrarExito(mensaje) 
{
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-exito">${mensaje}</p>
    `;
}