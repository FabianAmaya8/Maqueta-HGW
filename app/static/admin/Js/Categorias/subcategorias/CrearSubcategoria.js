import { crearFormulario } from '../../Productos/crearProductos.js';
import { alerta } from '../../Productos/crearProductos.js';
let datos_subcategoria = [{ valor: "Nombre Subcategoria", tipo: "text", form: "input", required: "required" }, { valor: "Categoria", tipo: "text", form: [], required: "required" }];
export function crearSubcategoria() {
    let datos_categoria = [];
    fetch("http://127.0.0.1:5000/consulta_categoria").then(state => state.json()).then(respuesta => {
        for (let nombreCategoria of respuesta) {
            datos_categoria.push(nombreCategoria.nombre_categoria);
        }
        crearFormulario([
            { valor: "Nombre Subcategoria", tipo: "text", form: "input", required: "required" },
            { valor: "Categoria", tipo: "text", form: datos_categoria, required: "required" }
        ], { valor: "Crear Subcategoria", url: "agregarSubcategoria()" }, "Crear Subcategoria", []);
    });
}
export function agregarSubcategoria() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_subcategoria.forEach(valor => {
            objeto[valor.valor] = (valor.valor != "Categoria" ? document.getElementById(valor.valor).value : parseInt(document.getElementById(valor.valor).value));
        });
        fetch("http://127.0.0.1:5000/registro_subcategoria", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => {
            alerta(respuesta);
        });
    }
}
export function editarSubcategoria(id){
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_subcategoria.forEach(valor => {
            objeto[valor.valor] = (valor.valor != "Categoria" ? document.getElementById(valor.valor).value : parseInt(document.getElementById(valor.valor).value));
        });
        objeto.id_principal = id;
        fetch("http://127.0.0.1:5000/editar_subcategoria", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => {
            alerta(respuesta);
        });
    }
}