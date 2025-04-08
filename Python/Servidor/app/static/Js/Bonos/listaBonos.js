import {contenido ,inputs_valores, datos_inicio, productos, categorias, categoriasVar} from '../variablesGlobales.js';
import { crearLista } from '../Productos/listaProductos.js';
export function listaBonos(){
    contenido.innerHTML = `
        ${crearLista(["Id", "Nombre Bono"])}
    `;
}