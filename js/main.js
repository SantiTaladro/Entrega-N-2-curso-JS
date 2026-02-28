// clases
class Producto {
    constructor(id, nombre, precio) { this.id = id; this.nombre = nombre; this.precio = precio; }
}

class Carrito {
    constructor() { this.items = JSON.parse(localStorage.getItem("carrito")) || []; }
    agregar(prod) { this.items.push(prod); this.guardar(); }
    eliminar(index) { this.items.splice(index, 1); this.guardar(); }
    vaciar() { this.items = []; this.guardar(); }
    obtenerTotal(iva) { return this.items.reduce((acc, el) => acc + el.precio, 0) * iva; }
    guardar() { localStorage.setItem("carrito", JSON.stringify(this.items)); }
}

// inicialización de Constantes e Instancias
const IVA = 1.21;
const catalogo = [
    new Producto(1, "New Era 59Fifty Banfield", 130000),
    new Producto(2, "New Era 9Forty NY Yankees", 100000),
    new Producto(3, "New Era Trucker LA Dodgers", 90000),
    new Producto(4, "Gorra Visera Plana Genérica", 65000)
];
const miCarrito = new Carrito();

// nodos del DOM
const nodoCatalogo = document.getElementById("catalogo");
const nodoCarrito = document.getElementById("carrito-lista");
const nodoTotal = document.getElementById("total");
const nodoMensaje = document.getElementById("mensaje");

// funciones de Renderizado y UI
const renderCatalogo = () => {
    nodoCatalogo.innerHTML = catalogo.map(p => `
        <div class="col-md-6"><div class="card p-3 text-center h-100">
            <h5>${p.nombre}</h5><p class="fs-4 fw-bold">$${p.precio}</p>
            <button class="btn btn-dark mt-auto btn-agregar" data-id="${p.id}">Agregar</button>
        </div></div>`).join('');
};

const renderCarrito = () => {
    nodoCarrito.innerHTML = miCarrito.items.map((p, i) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${p.nombre} - $${p.precio}
            <button class="btn btn-sm btn-outline-danger btn-eliminar" data-index="${i}">X</button>
        </li>`).join('');
    nodoTotal.innerText = miCarrito.obtenerTotal(IVA).toFixed(2);
};

const mostrarMensaje = (texto, tipo) => {
    nodoMensaje.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
    setTimeout(() => nodoMensaje.innerHTML = '', 3000); // se borra a los 3 seg
};

// eventios 
nodoCatalogo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        const prod = catalogo.find(p => p.id === id);
        if (prod) { miCarrito.agregar(prod); renderCarrito(); }
    }
});

nodoCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        miCarrito.eliminar(parseInt(e.target.getAttribute("data-index")));
        renderCarrito();
    }
});

document.getElementById("btn-vaciar").addEventListener("click", () => {
    miCarrito.vaciar(); renderCarrito();
});

document.getElementById("btn-finalizar").addEventListener("click", () => {
    if (miCarrito.items.length > 0) {
        mostrarMensaje("¡Compra finalizada con éxito! Preparando el envío...", "success");
        miCarrito.vaciar(); renderCarrito();
    } else {
        mostrarMensaje("El carrito está vacío. Agregá una gorra primero.", "warning");
    }
});

// arranque
renderCatalogo();
renderCarrito();