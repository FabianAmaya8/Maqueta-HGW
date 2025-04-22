import { contenido, datos_inicio, productos, categorias, categoriasVar } from '../variablesGlobales.js';
import { crearLista } from '../Productos/listaProductos.js';
export function listaUsuarios() {
        let tabla = "usuarios";
        let columna = "id_usuario";
        let posicion_id = 0;
        fetch("http://127.0.0.1:5000/consultar_usuarios").then(state => state.json()).then(valores => {
            fetch("http://127.0.0.1:5000/encabezado_usuario").then(state => state.json()).then(encabezado => {
                contenido.innerHTML = `
                ${crearLista(
                    encabezado
                    , valores, tabla, columna, posicion_id
                )}
            `;
            });
        });
}