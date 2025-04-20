import {inputs_valores, datos_inicio, productos, categorias, categoriasVar, contenido} from '../variablesGlobales.js';
import { crearFormulario } from '../Productos/crearProductos.js';

export function administrarBonos(){
    crearFormulario([
        {valor: "Nombre Bono", tipo:"text", form:"input", required: "required"},
        {valor: "Porcentaje", tipo:"number", form:"input", required: "required"},
        {valor: "Tipo", tipo:"text", form:"input", required: "required"},
        {valor: "Costo Activación", tipo:"number", form:"input", required: "required"}
    ], {valor: 'crear bono', url: 'agregarBono()'}, 'crear bono',[])
}

export function agregarBono() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_subcategoria.forEach(valor => {
            objeto[valor.valor] = (valor.valor != "Tipo" ? document.getElementById(valor.valor).value : parseInt(document.getElementById(valor.valor).value));
        });
        fetch("http://127.0.0.1:5000/agregarBono", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(payload)
        }).then(state => state.text()).then(respuesta => respuesta);
    }
}

export function editarBono(){
    
}