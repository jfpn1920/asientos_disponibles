/*----------------------------------------*/
/*--|funcionalidad_asientos_disponibles|--*/
/*----------------------------------------*/
const asientos = document.querySelectorAll(".asiento");
const contador = document.getElementById("contador");
const botonRestablecer = document.getElementById("restablecer");
const mensaje = document.getElementById("mensaje");
/*-----------------------------*/
/*--|datos_iniciales_guardos|--*/
/*-----------------------------*/
const estadosIniciales = {
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    B1: false,
    B2: false,
    B3: false,
    B4: false,
    C1: false,
    C2: false
};
/*-------------------------------*/
/*--|obtener_y_guardar_estados|--*/
/*-------------------------------*/
function obtenerEstados() {
    const datos = localStorage.getItem("asientos_disponibles");
    if (datos) {
        return JSON.parse(datos);
    }
    return estadosIniciales;
}
function guardarEstados(estados) {
    localStorage.setItem("asientos_disponibles", JSON.stringify(estados));
}
/*-----------------------*/
/*--|mostrar_el_estado|--*/
/*-----------------------*/
function mostrarEstado(asiento, ocupado) {
    const icono = asiento.querySelector("i");
    asiento.classList.remove("disponible");
    asiento.classList.remove("ocupado");
    if (ocupado) {
        asiento.classList.add("ocupado");
        icono.className = "fa-solid fa-xmark";
    } else {
        asiento.classList.add("disponible");
        icono.className = "fa-solid fa-chair";
    }
}
/*----------------------------*/
/*--|actualizar_el_contador|--*/
/*----------------------------*/
function actualizarContador() {
    const estados = obtenerEstados();
    let disponibles = 0;
    Object.values(estados).forEach(function(ocupado) {
        if (!ocupado) {
            disponibles++;
        }
    });
    if (disponibles === 1) {
        contador.textContent = "1 disponible";
    } else {
        contador.textContent = `${disponibles} disponibles`;
    }
}
/*-----------------------*/
/*--|cambiar_el_estado|--*/
/*-----------------------*/
function cambiarEstado(asiento) {
    const id = asiento.dataset.id;
    const estados = obtenerEstados();
    estados[id] = !estados[id];
    guardarEstados(estados);
    mostrarEstado(asiento, estados[id]);
    actualizarContador();
    if (estados[id]) {
        mostrarMensaje(`El asiento ${id} está ocupado.`, "#c62828");
    } else {
        mostrarMensaje(`El asiento ${id} está disponible.`, "#2e7d32");
    }
}
/*------------------------*/
/*--|mostrar_el_mensaje|--*/
/*------------------------*/
function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    setTimeout(function() {
        mensaje.textContent = "";
    }, 2000);
}
/*------------------------------*/
/*--|restablecer_los_asientos|--*/
/*------------------------------*/
function restablecerAsientos() {
    const confirmacion = confirm("¿Deseas colocar todos los asientos como disponibles?");
    if (!confirmacion) {
        return;
    }
    guardarEstados(estadosIniciales);
    asientos.forEach(function(asiento) {
        mostrarEstado(asiento, false);
    });
    actualizarContador();
    mostrarMensaje("Todos los asientos están disponibles.", "#2e7d32");
}
/*------------------------*/
/*--|eventos_a_un_click|--*/
/*------------------------*/
asientos.forEach(function(asiento) {
    asiento.addEventListener("click", function() {
        cambiarEstado(asiento);
    });
});
botonRestablecer.addEventListener("click", function() {
    restablecerAsientos();
});
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
function cargarDatos() {
    const estados = obtenerEstados();
    asientos.forEach(function(asiento) {
        const id = asiento.dataset.id;
        mostrarEstado(asiento, estados[id]);
    });
    actualizarContador();
}
cargarDatos();