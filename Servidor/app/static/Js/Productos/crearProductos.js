import { datos_inicio, productos, categorias, categoriasVar, contenido } from '../variablesGlobales.js';
import { navBar } from '../nav_bar.js';
var inputs_valores = [];
export function crearProductos(productoValores, editara) {
    fetch("http://127.0.0.1:5000/consulta_subcategoria").then(state => state.json()).then(respuesta => {
        let subcategoria = [];
        for (let datos of respuesta) {
            subcategoria.push(datos.nombre_subcategoria);
        }
        fetch("http://127.0.0.1:5000/consulta_categoria").then(state => state.json()).then(respuesta2 => {
            let categoria = [];
            for (let datos of respuesta2) {
                categoria.push(datos.nombre_categoria);
            }
            inputs_valores = [{ valor: "Nombre Producto", tipo: "text", form: "input", required: "required" }, { valor: "Precio Producto", tipo: "number", form: "input", required: "required" }, { valor: "Descripción", tipo: "text", form: "input", required: "required" }, { valor: "Categoria", tipo: "text", form: categoria, required: "required" }, { valor: "Subcategoria", tipo: "text", form: subcategoria, required: "required" }];
            let valorBoton = { valor: "Crear Producto", url: "agregarProducto()" };
            crear(inputs_valores, valorBoton, productoValores, editara);
        });
    });
}
export function crearFormulario(inputs_valores, valorBoton, productoValores, editara) {
    return crear(inputs_valores, valorBoton, productoValores, editara);
}
function crear(inputs_valores, valorBoton, productoValores, editara) {
    let inputsHtml = "";
    function options(i) {
        let opciones = "";
        for (let z = 0; z < inputs_valores[i].form.length; z++) {
            opciones += `<option value=${z}>${inputs_valores[i].form[z]}</option>`;
        }
        return opciones
    }
    function form() {
        let formulario = "";
        for (let i = 0; i < inputs_valores.length; i++) {
            if (typeof inputs_valores[i].form == "string") {
                if (inputs_valores[i].form == "input") {
                    formulario += `
                        <div class="form-floating mb-3">
                            <input ${inputs_valores[i].required} type="${inputs_valores[i].tipo}" class="form-control" id="${inputs_valores[i].valor}" placeholder="${inputs_valores[i].valor}">
                            <label for="${inputs_valores[i].valor}">${inputs_valores[i].valor}</label>
                        </div>
                    `;
                }
            }
            else if (Array.isArray(inputs_valores[i].form)) {
                formulario += `
                    <div class="mb-3">
                        <select class="form-select" id="${inputs_valores[i].valor}">
                            <option selected disabled>${inputs_valores[i].valor}</option>
                            ${options(i)}
                        </select>
                    </div>
                `;
            }
        }
        return formulario;
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
                    ${form()}
                    <div class="buttons-form">
                        <button type="button" class="btn btn-success" onclick="${valorBoton.url}">${valorBoton.valor}</button>
                    </div>
                </form>
            </div>
    `;
    contenido.innerHTML = productos_pagina;
}
export function agregarProducto() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = { Id: productos.length + 1 };
        inputs_valores.forEach(valor => {
            objeto[valor.valor] = (valor.valor != "Categoria" ? document.getElementById(valor.valor).value : parseInt(document.getElementById(valor.valor).value));
        });
        fetch("http://127.0.0.1:5000/registro_producto", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => console.log(respuesta));
    }
}
export function alerta(respuesta) {
    const alertaElemento = document.getElementById("alerta_producto");
    alertaElemento.textContent = "✔️ " + respuesta;
    alertaElemento.classList.add("alerta_producto-on");

    setTimeout(() => {
        alertaElemento.classList.replace("alerta_producto-on", "alerta_producto");
    }, 3500);
}
