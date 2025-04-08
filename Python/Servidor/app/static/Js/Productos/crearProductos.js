import {inputs_valores, datos_inicio, productos, categorias, categoriasVar, contenido} from '../variablesGlobales.js';
import { navBar } from '../nav_bar.js';
export function crearProductos(productoValores, editara){
    crear(inputs_valores ,productoValores, editara);
}
export function crearFormulario(inputs_valores, productoValores, editara){
    return crear(inputs_valores, productoValores, editara);
}
function crear(inputs_valores, productoValores, editara) {
    let inputsHtml = "";
    function inputs() {
        for (let i = 0; i < inputs_valores.length; i++) {
            if (inputs_valores[i] != "Categoria") {
                if (inputs_valores[i] == "Precio Producto") {
                    inputsHtml += `
                    <div class="form-floating">
                        <input type="Number" autocomplete="off" ${!isNaN(productoValores[i]) ? "value=" + parseInt(productoValores[i]) : ""} id="${inputs_valores[i].trim()}" required class="form-control" placeholder="">
                        <label for="nombre_producto">${inputs_valores[i]}</label>
                    </div>
                    `;
                }
                else {
                    inputsHtml += `
                    <div class="form-floating">
                        <input autocomplete="off" id="${inputs_valores[i]}" ${productoValores[i] != "" && productoValores[i] != undefined ? `value="${productoValores[i].trim()}"` : ""} required class="form-control"placeholder="">
                        <label for="nombre_producto">${inputs_valores[i]}</label>
                    </div>
                `;
                }
            }
        }
        return inputsHtml;
    }
    function select() {
        let options = ``;
        for (let i = 0; i < categorias.length; i++) {
            options += `
                <option value="${i}">${categorias[i]}</option>
            `;
        }
        return options
    }
    let productos_pagina = `
        <div class="formulario">
                <div class="imagen-contenedor">
                    <label for="imagen" class="img_producto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-fill" viewBox="0 0 16 16">
                            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        </svg>
                    </label>
                    <input form="formulario" type="file" accept="image/*" hidden id="imagen">
                </div>
                <form class="inputs-form" id="formulario">
                    ${inputs()}
                    <select class="form-select" id="Categoria" aria-label="Default select example">
                            ${select()}
                    </select>
                    <div class="buttons-form">
                        <button type="submit" class="btn btn-success" onclick="${editara ? "editarProductoBoton()" : "agregarProducto()"}">${editara ? "Editar Producto" : "Crear Producto"}</button>
                    </div>
                </form>
            </div>
    `;
    contenido.innerHTML = productos_pagina;
    document.getElementById("formulario").onsubmit = event => {
        event.preventDefault();
        document.getElementById("alerta_producto").classList.add("alerta_producto-on");
        setTimeout(() => {
            document.getElementById("alerta_producto").classList.replace("alerta_producto-on", "alerta_producto");
        }, 3500);
    };
    document.getElementById("alerta_producto").textContent = ("✔️ Se ha creado el producto correctamente");
    return productos_pagina;
}
export function agregarProducto() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = { Id: productos.length + 1 };
        inputs_valores.forEach(valor => {
            objeto[valor] = (valor != "Categoria" ? document.getElementById(valor).value : categoriasVar[parseInt(document.getElementById(valor).value)]);
        });
        productos[productos.length] = objeto;
    }
}