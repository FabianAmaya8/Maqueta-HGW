import { contenido, datos_inicio, productos, categorias, categoriasVar } from '../variablesGlobales.js';
import { crearLista } from '../Productos/listaProductos.js';
import { editarBonos } from './administrarBonos.js';
import { administrarBonos } from './administrarBonos.js';
export function listaBonos() {
    let tabla = "bonos";
    let columna = "id_bono";
    let posicion_id = 0;
    let titulo='bonos'
    fetch("http://127.0.0.1:5000/Bonos").then(state => state.json()).then(valores => {
        fetch("http://127.0.0.1:5000/encabezadoBonos").then(state => state.json()).then(encabezado => {
            contenido.innerHTML = `
            ${crearLista(
                encabezado
                , valores, tabla, columna, posicion_id, titulo
            )}
        `;
        });
    });
}