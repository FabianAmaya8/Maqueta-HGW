import { datos_inicio, productos, categorias, categoriasVar, contenido } from '../variablesGlobales.js';
import { mostrarSubcategoria } from './crearProductos.js';

let inputs_valores = [];

export function eliminarProducto(event, tabla, columna, posicion_id) {
    let fila = event.target.closest("tr");
    let datosFila = fila.children;
    let contador = 0;
    let posicion = 0;
    let nombre_id = posicion_id;
    let encabezado = event.target.closest("table").firstElementChild.firstElementChild.children;
    let contador2 = 0;
    for (let col of encabezado) {
        if (col.textContent.trim() == nombre_id) posicion = contador2;
        contador2++;
    }
    for (let dato of datosFila) {
        if (contador == posicion) {
            console.log(dato.textContent.trim());
            fetch(`http://127.0.0.1:5000/eliminar_producto?producto_id=${dato.textContent.trim()}&tabla=${tabla}&columna=${columna}`)
            .then(res => res.text())
            .then(() => {
                productos.forEach((producto, index) => {
                    if (producto.Id == parseInt(fila.firstElementChild.textContent)) {
                        productos.splice(index, 1);
                    }
                });
                fila.remove();
            });
        }
        contador++;
    }
}

var evento;
export function editarProducto(event, funcion) {
    evento = event;
    let id_editar = 20;
    let lista_categorias = [];
    let lista_subcategorias = {};

    function crearFormularioEditar(inputs_valores, valorBoton, productoValores, editara, apartado) {
        return crear(inputs_valores, valorBoton, productoValores, editara, apartado);
    }

    function categoria() {
        crearFormularioEditar([
            { valor: "Nombre Categoria", tipo: "text", form: "input", required: "required" }
        ], { valor: "Editar Categoria", url: `editarCategoria(${id_editar})` }, [], "Categorias");
    }

    function subcategoria() {
        let datos_categoria = [];
        fetch("http://127.0.0.1:5000/consulta_categoria")
        .then(res => res.json())
        .then(respuesta => {
            lista_categorias = respuesta;
            respuesta.forEach(n => datos_categoria.push(n.nombre_categoria));
            crearFormularioEditar([
                { valor: "Nombre Subcategoria", tipo: "text", form: "input", required: "required" },
                { valor: "Categoria", tipo: "text", form: datos_categoria, required: "required" }
            ], { valor: "Editar Subcategoria", url: "agregarSubcategoria()" }, [], "Subcategorias");
        });
    }

    function producto() {
        fetch("http://127.0.0.1:5000/consulta_categoria")
        .then(res => res.json())
        .then(respuesta2 => {
            lista_categorias = respuesta2;
            let encabezado = event.target.closest("table").firstElementChild.firstElementChild.children;
            let fila = event.target.closest("tr").children;
            let contador = 0;
            for (let col of encabezado) {
                if (col.textContent.trim() == "categoria") break;
                contador++;
            }
            let categoriaElegida = fila[contador].textContent.trim();
            let idCategoria = 0;
            lista_categorias.forEach(val => {
                if (val.nombre_categoria == categoriaElegida) idCategoria = parseInt(val.id_categoria);
            });
            fetch(`http://127.0.0.1:5000/consulta_subcategoria_id?id=${idCategoria}`)
            .then(res => res.json())
            .then(respuesta => {
                lista_subcategorias = respuesta;
                let subcategoria = respuesta.map(d => d.nombre_subcategoria);
                fetch("http://127.0.0.1:5000/consulta_categoria")
                .then(res => res.json())
                .then(respuesta2 => {
                    lista_categorias = respuesta2;
                    let categoria = respuesta2.map(d => d.nombre_categoria);
                    inputs_valores = [
                        { valor: "Nombre Producto", tipo: "text", form: "input", required: "required", style: "" },
                        { valor: "Precio Producto", tipo: "number", form: "input", required: "required", style: "" },
                        { valor: "Descripción", tipo: "text", form: "input", required: "required", style: "" },
                        { valor: "Categorias", tipo: "text", form: categoria, required: "required", extra: "onchange=mostrarSubcategoria()" },
                        { valor: "Subcategoria", tipo: "number", form: "div", required: "required", style: "" },
                        { valor: "Stock", tipo: "number", form: "input", required: "required", style: "" }
                    ];
                    let valorBoton = { valor: "Editar Producto", url: "agregarProducto()" };
                    crear(inputs_valores, valorBoton, [], "Productos", "Productos");
                });
            });
        });
    }

    if (funcion == "Categorias") categoria();
    else if (funcion == "Subcategorias") subcategoria();
    else if (funcion == "Productos") producto();

    function crear(inputs_valores, valorBoton, productoValores, editara, apartado) {
        let encabezados = event.target.closest("table").firstElementChild.firstElementChild.children;
        let columnasOrdenadas = [];
        let id_principal = 0;
        let contador = 0;
        for (let col of encabezados) {
            let valores = event.target.closest("tr").children[contador].textContent;
            if (["id_subcategoria","id_categoria","id_producto"].includes(col.textContent.trim())) id_principal = contador;
            if (encabezados.length < 5) {
                if (col.textContent.trim() == "nombre_categoria" || col.textContent.trim() == "nombre_subcategoria") columnasOrdenadas[0] = valores;
                if (col.textContent.trim() == "categoria") {
                    lista_categorias.forEach((cat,index) => { if (valores.trim() == cat.nombre_categoria.trim()) columnasOrdenadas[1] = index; });
                }
            } else {
                if (col.textContent.trim() == "categoria") {
                    lista_categorias.forEach((cat,index) => { if (valores.trim() == cat.nombre_categoria.trim()) columnasOrdenadas[3] = index; });
                }
                if (col.textContent.trim() == "subcategoria") {
                    lista_subcategorias.forEach((cat,index) => { if (valores.trim() == cat.nombre_subcategoria.trim()) columnasOrdenadas[4] = index; });
                }
                if (col.textContent.trim() == "nombre_producto") columnasOrdenadas[0] = valores;
                if (col.textContent.trim() == "precio_producto") columnasOrdenadas[1] = valores;
                if (col.textContent.trim() == "descripcion") columnasOrdenadas[2] = valores;
                if (col.textContent.trim() == "stock") columnasOrdenadas[5] = valores;
            }
            contador++;
        }
        id_editar = event.target.closest("tr").children[id_principal].textContent.trim();
        if (editara == "Categorias") valorBoton.url = `editarCategoria(${id_editar})`;
        else if (editara == "Subcategorias") valorBoton.url = `editarSubcategoria(${id_editar})`;
        else if (editara == "Productos") valorBoton.url = `editarProductoBoton(${id_editar})`;
        function options(i) {
            let opciones = "";
            for (let z = 0; z < inputs_valores[i].form.length; z++) {
                opciones += `<option ${columnasOrdenadas[i]==z?"selected":""} value=${z}>${inputs_valores[i].form[z]}</option>`;
            }
            return opciones;
        }
        function form() {
            let html = "";
            for (let i = 0; i < inputs_valores.length; i++) {
                if (typeof inputs_valores[i].form == "string") {
                    if (inputs_valores[i].form == "div") html += `<div class="form-floating mb-3" id="divSubcategoria"></div>`;
                    if (inputs_valores[i].form == "input") {
                        html += `<div class="form-floating mb-3"><input value=${columnasOrdenadas[i]} ${`style=${inputs_valores[i].style!=""?inputs_valores[i].style:""}`} ${inputs_valores[i].required} type="${inputs_valores[i].tipo}" class="form-control" id="${inputs_valores[i].valor}" placeholder="${inputs_valores[i].valor}"><label for="${inputs_valores[i].valor}">${inputs_valores[i].valor}</label></div>`;
                    }
                } else if (Array.isArray(inputs_valores[i].form)) {
                    html += `<div class="mb-3"><select class="form-select" ${inputs_valores[i].extra||""} id="${inputs_valores[i].valor}"><option selected disabled>${inputs_valores[i].valor}</option>${options(i)}</select></div>`;
                }
            }
            return html;
        }
        let productos_pagina = `<div class="formulario">${apartado=="Productos"?`<div class="imagen-contenedor"><label for="imagen" class="img_producto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-fill" viewBox="0 0 16 16">
                            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        </svg>
                    </label><input form="formulario" type="file" accept="image/*" hidden id="imagen"></div>`:""}<form class="inputs-form" id="formulario">${form()}<div class="buttons-form" style="visibility:hidden;"><button type="button" class="btn btn-success">aaaaaa</button></div></form><div class="buttons-form"><button type="button" class="btn btn-success" onclick="${valorBoton.url}">${valorBoton.valor}</button></div></div>`;
        contenido.innerHTML = productos_pagina;
        if (apartado == "Productos") mostrarSubcategoria(columnasOrdenadas[4]);
    }
}

export function editarProductoBoton(id) {
    if (!document.getElementById("formulario").checkValidity()) {
          return;
        }
      
        const inputFile = document.getElementById("imagen");
        const file = inputFile.files[0];
        if (!file) {
          alert("Por favor selecciona una imagen.");
          return;
        }
      
        const reader = new FileReader();
        reader.onload = () => {
          const imagenBase64 = reader.result; 
      
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
          objeto.id_principal = id;
          fetch(`http://127.0.0.1:5000/editar_producto`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objeto)
          })
            .then(r => r.text())
            .then(respuesta => alerta(respuesta))
            .catch(err => console.error("Error en fetch:", err));
        };
      
        reader.onerror = err => {
          console.error("Error leyendo la imagen:", err);
          alert("No se pudo leer la imagen.");
        };
      
        reader.readAsDataURL(file);
}
