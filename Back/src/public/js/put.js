const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorForm = document.getElementById("contenedor-form");
const formulario = document.getElementById("getProduct-form");

formulario.addEventListener("submit", async (evento) => 
{
    evento.preventDefault();

    const id = evento.target.idProd.value;

    try
    {
        const response = await fetch(`/api/products/${id}`);

        const producto = await response.json();

        if (!response.ok) 
        {
            mostrarError(producto.message);
            return;
        }

        contenedorProductos.innerHTML = `
            <div class="card-producto">
                <img src="${producto.payload.imagen}">
                <h4>${producto.payload.nombre}</h4>
                <p>ID: ${producto.payload.id}</p>
                <p>$${producto.payload.precio}</p>
            </div>
        `;

        const htmlForm = `
        <hr>
        <form id="updateProduct-form" class="form-alta">

            <input type="hidden" name="id" value="${producto.payload.id}">

            <label>Nombre</label>
            <input type="text" name="nombre" value="${producto.payload.nombre}" required>

            <label>Imagen</label>
            <input type="text" name="imagen" value="${producto.payload.imagen}" required>

            <label>Categoria</label>
            <select name="categoria" required>
                <option value="categoria1" ${producto.payload.categoria === "categoria1" ? "selected" : ""}>comida</option>
                <option value="categoria2" ${producto.payload.categoria === "categoria2" ? "selected" : ""}>bebida</option>
            </select>

            <label>Precio</label>
            <input type="number" name="precio" value="${producto.payload.precio}" required>

            <label>Activo</label>
            <select name="activo">
                <option value="1" ${producto.payload.activo == 1 ? "selected" : ""}>activo</option>
                <option value="0" ${producto.payload.activo == 0 ? "selected" : ""}>inactivo</option>
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

            console.log("🟢 FRONT - BODY QUE SE ENVÍA:", body);
            console.log("🟢 FRONT - ID:", id);

            const response = await fetch(`/api/products/${id}`, 
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log("🟡 FRONT - STATUS:", response.status);

            const data = await response.json().catch(() => null);
            console.log("🟡 FRONT - RESPUESTA BACK:", data);


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