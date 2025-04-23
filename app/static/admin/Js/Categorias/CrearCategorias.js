import { crearFormulario } from '../Productos/crearProductos.js';
import { alerta } from '../Productos/crearProductos.js';
let datos_from_categoria = [{valor: "Nombre Categoria", tipo:"text", form:"input", required: "required"}];
export function crearCategoria(){
    crearFormulario([
        {valor: "Nombre Categoria", tipo:"text", form:"input", required: "required"},
    ], {valor: "Crear Categoria", url: "agregarCategoria()"}, [])
}
export function agregarCategoria(){
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_from_categoria.forEach(valor => {
            objeto[valor.valor] = (valor.valor != "Categoria" ? document.getElementById(valor.valor).value : parseInt(document.getElementById(valor.valor).value));
        });
        console.log(objeto);
        fetch("http://127.0.0.1:5000/registro_categoria", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => {
            alerta(respuesta);
        });
    }
}
export function editarCategoria(id){
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_from_categoria.forEach(valor => {
            objeto[valor.valor] = (valor.valor != "Categoria" ? document.getElementById(valor.valor).value : parseInt(document.getElementById(valor.valor).value));
        });
        objeto.id_principal = id;
        console.log(objeto);
        fetch("http://127.0.0.1:5000/editar_categoria", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => {
            alerta(respuesta);
        });
    }
}