import { datos_inicio, productos, categorias, categoriasVar, contenido } from '../variablesGlobales.js';
import { crearFormulario } from '../Productos/crearProductos.js';

const datos_from_bono = [
    {valor: "nombre_bono", tipo:"text", form:"input", required: "required"},
    {valor: "porcentaje", tipo:"number", form:"input", required: "required"},
    {valor: "tipo", tipo:"text", form:"input", required: "required"},
    {valor: "costo_activacion", tipo:"number", form:"input", required: "required"}
];
export function administrarBonos() {
    crearFormulario(
        datos_from_bono, {valor: "Crear bono", url: "agregarBono()"}, [])
}
export function agregarBono() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_from_bono.forEach(valor => {
            objeto[valor.valor] = (valor.valor == "descuento"? parseFloat(document.getElementById(valor.valor).value) : valor.valor == "costo activacion" ? parseInt(document.getElementById(valor.valor).value): document.getElementById(valor.valor).value);
        });
        console.log(objeto);
        fetch("http://127.0.0.1:5000/agregarBono", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => {
            alerta(respuesta);
        });
    }
}
const edit_from_bono = [
    {valor: "id_bono", tipo:"number", form:"input", required: "required"},
    {valor: "nombre_bono", tipo:"text", form:"input", required: "required"},
    {valor: "porcentaje", tipo:"number", form:"input", required: "required"},
    {valor: "tipo", tipo:"text", form:"input", required: "required"},
    {valor: "costo_activacion", tipo:"number", form:"input", required: "required"}
];
export function editarBonos() {
    crearFormulario(
        edit_from_bono, {valor: "editar bono", url: "edicionBono()"}, [])
}
export function edicionBono(){
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        edit_from_bono.forEach(valor => {
            objeto[valor.valor] = (valor.valor == "descuento"? parseFloat(document.getElementById(valor.valor).value) : valor.valor == "costo activacion" ? parseInt(document.getElementById(valor.valor).value): valor.valor==id_bono ? parseInt(document.getElementById(valor.valor).value): document.getElementById(valor.valor).value);
        });
        console.log(objeto);
        fetch("http://127.0.0.1:5000/editarBonos", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => {
            alerta(respuesta);
        });
    }
}