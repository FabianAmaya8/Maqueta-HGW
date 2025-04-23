import { contenido, datos_inicio, productos, categorias, categoriasVar } from '../../variablesGlobales.js';
import { crearLista } from '../../Productos/listaProductos.js';
export function listaSubcategoria() {
    let tabla = "subcategoria";
    let columna = "id_subcategoria";
    let posicion_id = "id_subcategoria";
    let funcion = "Subcategorias";
    fetch("http://127.0.0.1:5000/consulta_subcategoria").then(state => state.json()).then(valores => {
        fetch("http://127.0.0.1:5000/encabezado_subcategoria").then(state => state.json()).then(encabezado => {
            contenido.innerHTML = `
            ${crearLista(
                encabezado
                , valores, tabla, columna, posicion_id, funcion
            )}
        `;
        });
    });
}