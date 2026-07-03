const nombre = localStorage.getItem("nombre");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.getElementById("cliente").textContent = nombre;
document.getElementById("fecha").textContent = new Date().toLocaleDateString();

let total = 0;
const detalle = document.getElementById("detalle");

carrito.forEach(producto => 
{
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    detalle.innerHTML += `
        <p>${producto.nombre} x${producto.cantidad} - $${subtotal}</p>
    `;
});

document.getElementById("total").textContent = total;


function volver() 
{
    localStorage.clear();
    window.location.href = "index.html";
}


const botonDescargar = document.getElementById("btn-descargar");

botonDescargar.addEventListener("click", imprimirTicket);


function imprimirTicket() 
{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(22);
    doc.text("Ticket de compra", 20, y);

    y += 10;

    doc.setFontSize(14);
    doc.text(`Cliente: ${nombre}`, 20, y);

    y += 10;

    const fecha = new Date().toLocaleString();
    doc.text(`Fecha: ${fecha}`, 20, y);

    y += 15;

    doc.setFontSize(12);

    carrito.forEach(producto => 
    {
        const subtotal = producto.precio * producto.cantidad;

        doc.text(
            `${producto.nombre} x${producto.cantidad} - $${subtotal}`,
            20,
            y
        );

        y += 10;
    });

    y += 10;

    doc.setFontSize(16);
    doc.text(`Total: $${total}`, 20, y);

    const nombreArchivo = `ticket-${nombre}-${new Date().toISOString()}.pdf`;

    doc.save(nombreArchivo);
}