import { datos_inicio, productos, categorias, categoriasVar, contenido } from '../variablesGlobales.js';
import { crearFormulario } from '../Productos/crearProductos.js';

let datos_from_bono = [];
export function administrarBonos() {
    crearFormulario([
        [{ valor: "Nombre Bono", tipo: "text", form: "input", required: "required" }, { valor: "Porcentaje", tipo: "number", form: "input", required: "required" }, { valor: "Tipo", tipo: "text", form: "input", required: "required" }, { valor: "Costo Activación", tipo: "text", form: "input", required: "required" }],
    ], { valor: "Crear Bono", url: "agregarBono()" }, [])
}
export function agregarBono() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_from_bono.forEach(valor => {
            objeto[valor.valor] = (valor.valor != "Categoria" ? document.getElementById(valor.valor).value : parseInt(document.getElementById(valor.valor).value));
        });
        console.log(objeto);
        fetch("http://127.0.0.1:5000/registrar_bono", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(objeto)
        }).then(state => state.text()).then(respuesta => {
            alerta(respuesta);
        });
    }
}