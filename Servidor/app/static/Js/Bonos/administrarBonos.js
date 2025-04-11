import {inputs_valores, datos_inicio, productos, categorias, categoriasVar, contenido} from '../variablesGlobales.js';
import { crearFormulario } from '../Productos/crearProductos.js';

export function administrarBonos(){
    crearFormulario([
        {valor: "Nombre Bono", tipo:"text", form:"input", required: "required"},
        {valor: "Porcentaje", tipo:"number", form:"input", required: "required"},
        {valor: "Tipo", tipo:"text", form:"input", required: "required"},
        {valor: "Costo Activación", tipo:"number", form:"input", required: "required"}
    ], [])
}