import {inputs_valores, datos_inicio, productos, categorias, categoriasVar} from '../variablesGlobales.js';
import { crearFormulario } from '../Productos/crearProductos.js';

export function administrarBonos(){
    contenido.innerHTML = `
        ${crearFormulario(["Nombre Bono"], [])}
    `;
}