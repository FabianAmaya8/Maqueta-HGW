import { datos_inicio, productos, categorias, categoriasVar, contenido } from '../variablesGlobales.js';
import { navBar } from '../nav_bar.js';
var inputs_valores = [];
let general = "";
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
            inputs_valores = [{ valor: "Nombre Producto", tipo: "text", form: "input", required: "required", style: "" }, { valor: "Precio Producto", tipo: "number", form: "input", required: "required", style: "" }, { valor: "Descripción", tipo: "text", form: "input", required: "required", style: "" }, { valor: "Categorias", tipo: "text", form: categoria, required: "required", extra: "onchange=mostrarSubcategoria()"}, { valor: "Subcategoria", tipo: "number", form: "div", required: "required", style: "" }, { valor: "Stock", tipo: "number", form: "input", required: "required", style: "" }];
            let valorBoton = { valor: "Crear Producto", url: "agregarProducto()" };
            let apartado = "productos";
            crear(inputs_valores, valorBoton, productoValores, editara, apartado);
        });
    });
}
export function crearFormulario(inputs_valores, valorBoton, productoValores, editara, apartado = "") {
    return crear(inputs_valores, valorBoton, productoValores, editara, apartado);
}
export function mostrarSubcategoria(productoValores, editara){
            let categoria = parseInt(document.getElementById("Categorias").value);
            categoria += 1;
            fetch(`http://127.0.0.1:5000/consulta_subcategoria_id?id=${categoria}`).then(state => state.json()).then(respuesta => {
                let subcategoria_nodo = document.getElementById("divSubcategoria");
                console.log(respuesta);
                function opciones(){
                    let html = "";
                    respuesta.forEach((subcategoria, i) => {
                        html += `<option value="${parseInt(subcategoria.id_subcategoria)}">${subcategoria.nombre_subcategoria}</option>`;
                    });                    
                    return html;
                }
                subcategoria_nodo.innerHTML =  `
                    <div class="mb-0">
                        <select class="form-select" id="Subcategoria">
                            <option selected disabled>subcategoria</option>
                            ${opciones()}
                        </select>
                    </div>
                    `
            });
}
function crear(inputs_valores, valorBoton, productoValores, editara, apartado) {
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
                if(inputs_valores[i].form == "div"){
                    formulario += `
                        <div class="form-floating mb-3" id="divSubcategoria">
                            
                        </div>
                    `;
                }
                if (inputs_valores[i].form == "input") {
                    formulario += `
                        <div class="form-floating mb-3">
                            <input ${`style=${inputs_valores[i].style != "" ? inputs_valores[i].style != "": ""}`} ${inputs_valores[i].required} type="${inputs_valores[i].tipo}" class="form-control" id="${inputs_valores[i].valor}" placeholder="${inputs_valores[i].valor}">
                            <label for="${inputs_valores[i].valor}">${inputs_valores[i].valor}</label>
                        </div>
                    `;
                }
            }
            else if (Array.isArray(inputs_valores[i].form)) {
                formulario += `
                    <div class="mb-3">
                        <select class="form-select" ${inputs_valores[i].extra != ""? inputs_valores[i].extra : ""} id="${inputs_valores[i].valor}">
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
                ${
                    apartado == "productos" ?
                    `<div class="imagen-contenedor">
                    <label for="imagen" class="img_producto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-fill" viewBox="0 0 16 16">
                            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        </svg>
                    </label>
                    <input form="formulario" type="file" accept="image/*" hidden id="imagen">
                    </div>`: ""
                }
                <form class="inputs-form" id="formulario">
                    ${form()}
                    <div class="buttons-form" style=" visibility: hidden;">
                        <button type="button" class="btn btn-success">aaaaaa</button>
                    </div>
                </form>
                <div class="buttons-form">
                    <button type="button" class="btn btn-success" onclick="${valorBoton.url}">${valorBoton.valor}</button>
                </div>
            </div>
    `;
    contenido.innerHTML = productos_pagina;
    general = productos_pagina;
}
export function agregarProducto() {
    // 1️⃣ Asegurarnos de que el formulario es válido
    if (!document.getElementById("formulario").checkValidity()) {
      return;
    }
  
    // 2️⃣ Obtener referencia al input de imagen
    const inputFile = document.getElementById("imagen");
    const file = inputFile.files[0];
    if (!file) {
      alert("Por favor selecciona una imagen.");
      return;
    }
  
    // 3️⃣ Leer el archivo como Base64
    const reader = new FileReader();
    reader.onload = () => {
      const imagenBase64 = reader.result; 
      // reader.result será algo como "data:image/png;base64,...."
  
      // 4️⃣ Construir el objeto JSON con todos los campos + Base64
      const objeto = { Id: productos.length + 1, imagen: imagenBase64 };
      inputs_valores.forEach(valor => {
        const key = valor.valor;
        if (key === "Categorias" || key === "Subcategoria") {
          objeto[key] = parseInt(document.getElementById(key).value, 10);
        } else {
          objeto[key] = document.getElementById(key).value;
        }
      });
  
      console.log("Enviando JSON:", objeto);
  
      // 5️⃣ Enviar JSON al servidor
      fetch("http://127.0.0.1:5000/registro_producto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto)
      })
        .then(r => r.text())
        .then(texto => console.log("Respuesta servidor:", texto))
        .catch(err => console.error("Error en fetch:", err));
    };
  
    reader.onerror = err => {
      console.error("Error leyendo la imagen:", err);
      alert("No se pudo leer la imagen.");
    };
  
    reader.readAsDataURL(file);
  }
  
export function alerta(respuesta) {
    const alertaElemento = document.getElementById("alerta_producto");
    alertaElemento.textContent = "✔️ " + respuesta;
    alertaElemento.classList.add("alerta_producto-on");

    setTimeout(() => {
        alertaElemento.classList.replace("alerta_producto-on", "alerta_producto");
    }, 3500);
}