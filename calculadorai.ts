// Tipo de transacción
type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
  id: number;
  monto: number;
  descripcion: string;
  tipo: TipoTransaccion;
}

let listaTransacciones: Transaccion[] = [];
let saldoActual: number = 0;

const inputMonto = document.getElementById("monto") as HTMLInputElement;
const inputDescripcion = document.getElementById("descripcion") as HTMLInputElement;
const elementoSaldo = document.getElementById("balance") as HTMLElement;
const cuerpoTabla = document.getElementById("tablaCuerpo") as HTMLTableSectionElement;

document.getElementById("agregarIngreso")?.addEventListener("click", () => agregarTransaccion("ingreso"));
document.getElementById("agregarGasto")?.addEventListener("click", () => agregarTransaccion("gasto"));

function agregarTransaccion(tipo: TipoTransaccion): void {
  const monto = parseFloat(inputMonto.value);
  const descripcion = inputDescripcion.value.trim();

  const errorMonto = document.getElementById("errorMonto") as HTMLElement;
  const errorDescripcion = document.getElementById("errorDescripcion") as HTMLElement;

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

  const nuevaTransaccion: Transaccion = {
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

function actualizarSaldo(): void {
  saldoActual = listaTransacciones.reduce((total, transaccion) => {
    return transaccion.tipo === "ingreso"
      ? total + transaccion.monto
      : total - transaccion.monto;
  }, 0);

  elementoSaldo.textContent = saldoActual.toFixed(2);
}

function mostrarTransacciones(): void {
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

function limpiarCampos(): void {
  inputMonto.value = "";
  inputDescripcion.value = "";

  // Ocultar mensajes de error al limpiar
  document.getElementById("errorMonto")!.style.display = "none";
  document.getElementById("errorDescripcion")!.style.display = "none";
}
