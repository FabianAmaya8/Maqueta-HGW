import {contenido ,inputs_valores, datos_inicio, productos, categorias, categoriasVar} from '../variablesGlobales.js';
import { crearLista } from '../Productos/listaProductos.js';
export function listaBonos() {
    let bonos_db = [];
    async function consulta() {
        await fetch("http://127.0.0.1:5000/consultaBonos").then(state => state.json()).then(respuesta => bonos_db = respuesta);
        lista(Object.keys(productos_db[0]), productos_db);
    }
    consulta();
}