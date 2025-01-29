"use strict";
var _a, _b;
let listaTransacciones = [];
let saldoActual = 0;
const inputMonto = document.getElementById("monto");
const inputDescripcion = document.getElementById("descripcion");
const elementoSaldo = document.getElementById("balance");
const cuerpoTabla = document.getElementById("tablaCuerpo");
(_a = document.getElementById("agregarIngreso")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => agregarTransaccion("ingreso"));
(_b = document.getElementById("agregarGasto")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => agregarTransaccion("gasto"));
function agregarTransaccion(tipo) {
    const monto = parseFloat(inputMonto.value);
    const descripcion = inputDescripcion.value.trim();
    const errorMonto = document.getElementById("errorMonto");
    const errorDescripcion = document.getElementById("errorDescripcion");
    // Resetear mensajes de error
    errorMonto.style.display = "none";
    errorDescripcion.style.display = "none";
    if (monto <= 0 || isNaN(monto)) {
        errorMonto.textContent = "Por favor, ingresa un monto positivo.";
        errorMonto.style.display = "block";
        return;
    }
    if (!descripcion) {
        errorDescripcion.textContent = "La descripción no puede estar vacía.";
        errorDescripcion.style.display = "block";
        return;
    }
    if (tipo === "gasto" && monto > saldoActual) {
        errorMonto.textContent = "El gasto no puede ser mayor a la cantidad actual.";
        errorMonto.style.display = "block";
        return;
    }
    const nuevaTransaccion = {
        id: listaTransacciones.length + 1,
        monto,
        descripcion,
        tipo,
    };
    listaTransacciones.push(nuevaTransaccion);
    actualizarSaldo();
    mostrarTransacciones();
    limpiarCampos();
}
function actualizarSaldo() {
    saldoActual = listaTransacciones.reduce((total, transaccion) => {
        return transaccion.tipo === "ingreso"
            ? total + transaccion.monto
            : total - transaccion.monto;
    }, 0);
    elementoSaldo.textContent = saldoActual.toFixed(2);
}
function mostrarTransacciones() {
    cuerpoTabla.innerHTML = "";
    listaTransacciones.forEach((transaccion) => {
        const fila = document.createElement("tr");
        // Columna Monto
        const columnaMonto = document.createElement("td");
        columnaMonto.textContent = transaccion.monto.toFixed(2) + " MXN";
        columnaMonto.style.color = transaccion.tipo === "ingreso" ? "green" : "red";
        // Columna Descripción
        const columnaDescripcion = document.createElement("td");
        columnaDescripcion.textContent = transaccion.descripcion;
        // Columna Tipo
        const columnaTipo = document.createElement("td");
        columnaTipo.textContent = transaccion.tipo === "ingreso" ? "Ingreso" : "Gasto";
        columnaTipo.style.fontWeight = "bold";
        // Agregar columnas a la fila
        fila.appendChild(columnaMonto);
        fila.appendChild(columnaDescripcion);
        fila.appendChild(columnaTipo);
        // Agregar fila a la tabla
        cuerpoTabla.appendChild(fila);
    });
}
function limpiarCampos() {
    inputMonto.value = "";
    inputDescripcion.value = "";
    // Ocultar mensajes de error al limpiar
    document.getElementById("errorMonto").style.display = "none";
    document.getElementById("errorDescripcion").style.display = "none";
}
