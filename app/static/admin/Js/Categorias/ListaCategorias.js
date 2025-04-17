import { contenido, datos_inicio, productos, categorias, categoriasVar } from '../variablesGlobales.js';
import { crearLista } from '../Productos/listaProductos.js';
export function listaCategorias() {
    let tabla = "categorias";
    let columna = "id_categoria";
    let posicion_id = 0;
    fetch("http://127.0.0.1:5000/consulta_categoria").then(state => state.json()).then(valores => {
        fetch("http://127.0.0.1:5000/encabezado_categoria").then(state => state.json()).then(encabezado => {
            contenido.innerHTML = `
            ${crearLista(
                encabezado
                , valores, tabla, columna, posicion_id
            )}
        `;
        });
    });
}
