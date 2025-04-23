import { datos_inicio, encabezadoTablaProductos, productos, categorias, categoriasVar, contenido } from '../variablesGlobales.js';
export function productosLista() {
    let productos_db = [];
    let encabezado = [];
    let tabla = "productos";
    let columna = "id_producto";
    let posicion_id = "id_producto";
    let funcion = "Productos";
    async function consulta() {
        await fetch("http://127.0.0.1:5000/Productos").then(state => state.json()).then(respuesta => productos_db = respuesta);
        await fetch("http://127.0.0.1:5000/encabezado").then(state => state.json()).then(respuesta => encabezado = respuesta);
        console.log(productos_db);
        lista(encabezado, productos_db, tabla, columna, posicion_id, funcion);
    }
    consulta();
}
export function crearLista(encabezado, valores, tabla, columna, posicion_id, funcion) {
    return lista(encabezado, valores, tabla, columna, posicion_id, funcion);
}

export function lista(encabezadoTabla, valoresFila, tabla, columna, posicion_id, funcion) {
    function encabezado() {
        let encabezadoHTML = "";
        for (let i = 0; i < encabezadoTabla.length; i++) {
            encabezadoHTML += `
                <th>
                    ${encabezadoTabla[i].COLUMN_NAME}
                </th>
            `;
        }
        encabezadoHTML += `
            ${encabezadoHTML == "" ? "" : "<th> Editar/Eliminar </th>"}
        `;
        return encabezadoHTML;
    }

    function filas() {
        function datos(fila) {
            let datosVar = "";
            for (let i = 0; i < encabezadoTabla.length; i++) {
                const key = encabezadoTabla[i].COLUMN_NAME;
                datosVar += `
                    <td>
                        ${valoresFila[fila][key]}
                    </td>
                `;
            }
            datosVar += `
                <td>
                    <div class="group-btn">
                        <button class="btn btn-light btn-crud btn-editar" onclick="editarProducto(event, '${funcion}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush-fill" viewBox="0 0 16 16">
                                <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04"/>
                            </svg>
                        </button>
                        <button class="btn btn-danger btn-crud btn-eliminar" onclick="eliminarProducto(event, '${tabla}', '${columna}', '${columna}', '${posicion_id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
            return datosVar;
        }

        let filasVar = "";
        for (let i = 0; i < valoresFila.length; i++) {
            filasVar += `
                <tr>
                    ${datos(i)}        
                </tr>
            `;
        }
        return filasVar;
    }

    let productos_pagina = `
        <div style="width: 100%; display:flex; justify-content: center;">
            <h1 style="margin-bottom: 3% !important;">${funcion}</h1>
        </div>
        <div class="contenedor-tablas">
            <table class="table">
                <thead>
                    <tr>
                        ${encabezado()}            
                    </tr>
                </thead>
                <tbody>
                    ${filas()}
                </tbody>
            </table>
        </div>
    `;
    contenido.innerHTML = productos_pagina;
    return productos_pagina;
}

