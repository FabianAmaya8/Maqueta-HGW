import {inputs_valores, datos_inicio, productos, categorias, categoriasVar} from './variablesGlobales.js';
const contenido = document.getElementById("contenido");
export function inicio() {
    var contenedores = "";
    function crear_cont() {
        for (let i = 0; i < datos_inicio.length; i++) {
            contenedores += `
                <div class="card box${(i+1)}">
                        <div class="card-body" style="background-color: rgb(254, 252, 252);">
                            <h5 class="card-title">${datos_inicio[i].titulo}</h5>
                            <p class="card-text">${datos_inicio[i].contenido}</p>
                                ${datos_inicio[i].extra == ""
                    ? ""
                    : `<a class="btn btn-success">${datos_inicio[i].extra}</a>`
                }
                        </div>
                </div>
            `;
        }
        return contenedores;
    }
    let inicio = `
        <div class="dashboard-inicio">
            ${crear_cont()}
        </div>
    `;
    contenido.innerHTML = inicio;
}