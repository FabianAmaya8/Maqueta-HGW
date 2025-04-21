import { contenido, datos_inicio, productos, categorias, categoriasVar } from '../variablesGlobales.js';
import { crearLista } from '../Productos/listaProductos.js';
export function listaBonos() {
        let tabla = "bonos";
        let columna = "id_bonos";
        let posicion_id = 0;
        fetch("http://127.0.0.1:5000/Bonos").then(state => state.json()).then(valores => {
            fetch("http://127.0.0.1:5000/encabezadoBonos").then(state => state.json()).then(encabezado => {
                contenido.innerHTML = `
                ${crearLista(
                    encabezado
                    , valores, tabla, columna, posicion_id
                )}
            `;
            });
        });
}