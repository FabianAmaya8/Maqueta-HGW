import { crearFormulario } from '../Productos/crearProductos.js';
import { alerta } from '../Productos/crearProductos.js';

let datos_usuario = [
    {valor: "nombre", tipo: "text", form: "input", required: "required"},
    {valor: "apellido", tipo: "text", form: "input", required: "required"},
    {valor: "usuario", tipo: "text", form: "input", required: "required"},
    {valor: "contraseña", tipo: "text", form: "input", required: "required"},
    {valor: "correo", tipo: "text", form: "input", required: "required"},
    {valor: "contacto", tipo: "text", form: "input", required: "required"},
    {valor: "patrocinador", tipo: "text", form: "input", required: "required"},
    {valor: "membresia", tipo: "number", form: [], required: "required", style: ""},
    {valor: "medio_pago", tipo: "number", form: [], required: "required", style: ""},
    {valor: "rol", tipo: "number", form: [], required: "required", style: ""}
];
let datos_usuario_edicion = [
    {valor: "id_usuario", tipo: "number", form: "input", required: "required"},
    {valor: "nombre", tipo: "text", form: "input", required: "required"},
    {valor: "apellido", tipo: "text", form: "input", required: "required"},
    {valor: "usuario", tipo: "text", form: "input", required: "required"},
    {valor: "contraseña", tipo: "text", form: "input", required: "required"},
    {valor: "correo", tipo: "text", form: "input", required: "required"},
    {valor: "contacto", tipo: "text", form: "input", required: "required"},
    {valor: "patrocinador", tipo: "text", form: "input", required: "required"},
    {valor: "membresia", tipo: "number", form: [], required: "required", style: ""},
    {valor: "medio_pago", tipo: "number", form: [], required: "required", style: ""},
    {valor: "rol", tipo: "number", form: [], required: "required", style: ""}
];

export async function creacion() {
    try {
        // Realizar peticiones fetch
        const resMem = await fetch("http://127.0.0.1:5000/consultar_membresias");
        const resRol = await fetch("http://127.0.0.1:5000/consultar_roles");
        const resMed = await fetch("http://127.0.0.1:5000/consultar_medios");
        
        // Obtener las listas de opciones
        const membresiasLista = await listas(resMem, "nombre_membresia");
        const rolesLista = await listas(resRol, "nombre_rol");
        const mediosLista = await listas(resMed, "nombre_medio");
        
        crearFormulario([
            {valor: "nombre", tipo: "text", form: "input", required: "required"},
            {valor: "apellido", tipo: "text", form: "input", required: "required"},
            {valor: "usuario", tipo: "text", form: "input", required: "required"},
            {valor: "contraseña", tipo: "password", form: "input", required: "required"},
            {valor: "correo", tipo: "email", form: "input", required: "required"},
            {valor: "contacto", tipo: "text", form: "input", required: "required"},
            {valor: "patrocinador", tipo: "text", form: "input", required: "required"},
            {valor: "membresia", tipo: "number", form: membresiasLista, required: "required", style: ""},
            {valor: "medio_pago", tipo: "number", form: mediosLista, required: "required", style: ""},
            {valor: "rol", tipo: "number", form: rolesLista, required: "required", style: ""}
        ],
        {valor: "Crear Usuario", url: "agregarUsuario()"},
        []
        );
    } catch (error) {
        alerta("Error al crear el formulario: " + error.message);
    }
}

export function agregarUsuario() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_usuario.forEach(valor => {
            objeto[valor.valor] = (valor.tipo === "number" ? 
                parseInt(document.getElementById(valor.valor).value )+1 : 
                document.getElementById(valor.valor).value);
        });
        console.log(objeto);
        fetch("http://127.0.0.1:5000/crear_usuario", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objeto)
        })
        .then(state => state.text())
        .then(respuesta => {
            alerta(respuesta);
        })
        .catch(error => {
            alerta("Error: " + error.message);
        });
    }
}

async function listas(respuesta, a_buscar) {
    const datos = await respuesta.json();
    const final = datos.map(x => x[a_buscar]);
    return final;
}

export async function editarUsuarios() {
    try {
        // Realizar peticiones fetch
        const resMem = await fetch("http://127.0.0.1:5000/consultar_membresias");
        const resRol = await fetch("http://127.0.0.1:5000/consultar_roles");
        const resMed = await fetch("http://127.0.0.1:5000/consultar_medios");
        
        // Obtener las listas de opciones
        const membresiasLista = await listas(resMem, "nombre_membresia");
        const rolesLista = await listas(resRol, "nombre_rol");
        const mediosLista = await listas(resMed, "nombre_medio");
        
        crearFormulario([
            {valor: "id_usuario", tipo: "number", form: "input", required: "required"},
            {valor: "nombre", tipo: "text", form: "input", required: "required"},
            {valor: "apellido", tipo: "text", form: "input", required: "required"},
            {valor: "usuario", tipo: "text", form: "input", required: "required"},
            {valor: "contraseña", tipo: "password", form: "input", required: "required"},
            {valor: "correo", tipo: "email", form: "input", required: "required"},
            {valor: "contacto", tipo: "text", form: "input", required: "required"},
            {valor: "patrocinador", tipo: "text", form: "input", required: "required"},
            {valor: "membresia", tipo: "number", form: membresiasLista, required: "required", style: ""},
            {valor: "medio_pago", tipo: "number", form: mediosLista, required: "required", style: ""},
            {valor: "rol", tipo: "number", form: rolesLista, required: "required", style: ""}
        ],
        {valor: "Editar Usuario", url: "modificarUsuario()"},
        []
        );
    } catch (error) {
        alerta("Error al crear el formulario: " + error.message);
    }
}

export function modificarUsuario() {
    if (document.getElementById("formulario").checkValidity()) {
        let objeto = {};
        datos_usuario_edicion.forEach(valor => {
            objeto[valor.valor] = (valor.tipo === "number" && valor.form!="input" ? 
                parseInt(document.getElementById(valor.valor).value )+1 : valor.tipo === "number" && valor.form=="input" ? (document.getElementById(valor.valor).value ) 
                : document.getElementById(valor.valor).value);
        });
        console.log(objeto);
        fetch("http://127.0.0.1:5000/editar_usuario", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(objeto)
        })
        .then(state => state.text())
        .then(respuesta => {
            alerta(respuesta);
        })
        .catch(error => {
            alerta("Error: " + error.message);
        });
    }
}