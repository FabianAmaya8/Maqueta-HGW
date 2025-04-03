var inputs_valores = ["Nombre Producto", "Precio Producto", "Descripción"];
var datos_inicio = [{titulo: "hola", contenido: "Informe de referido este mes", extra: "ellos"}, {titulo: "hola", contenido: "Informe de referido este mes", extra: "ellos"}, {titulo: "hola", contenido: "Informe de referido este mes", extra: "ellos"}, {titulo: "hola", contenido: "Informe de referido este mes", extra: "ellos"}];
const contenido = document.getElementById("contenido");
let nav_bar = `
     <div class="card-body">
                <nav class="navbar navbar-expand-lg">
                <div class="alert alert-success alerta_producto" role="alert" id="alerta_producto">
                    ✔️ Se ha creado el producto correctamente
                </div>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav d-flex w-100">
                            <li class="nav-item active"> <a class="btn btn-primary btn-lg" onclick="inicio()"> Inicio </a> </li>
                            <li class="nav-item"> <a class="btn btn-primary btn-lg"> Gestion de Usuario </a> </li>
                            <li class="nav-item"> <a class="btn btn-primary btn-lg"> Bonos </a> </li>
                            <li class="nav-item btn-group btn-group-normal"> <a class="btn btn-primary btn-lg dropdown-toggle" data-bs-offset="0, -10"> Categorias </a> 
                                <ul class="dropdown-menu">
                                    <li> <a class="btn btn-secondary dropdown-item">Categoria Principal</a> </li>
                                    <li> <a class="btn btn-secondary dropdown-item">Subcategoria</a> </li>
                                </ul>
                            </li>
                            <li class="nav-item btn-group btn-group-normal"> <a class="btn btn-primary btn-lg dropdown-toggle" data-bs-offset="0, -10"> Producto </a> 
                                <ul class="dropdown-menu">
                                    <li> <a class="btn btn-secondary dropdown-item" onclick="productosLista()">Lista de Prodcutos</a> </li>
                                    <li> <a class="btn btn-secondary dropdown-item" onclick="crearProductos()">Crear Producto</a> </li>
                                </ul>
                            </li>
                            <li class="ms-auto nav-item dropdown">
                                <a class="btn btn-primary btn-lg btn-usuario" data-bs-toggle="dropdown">
                                    <svg class="img-btn" xmlns="http://www.w3.org/2000/svg" width="2.3rem" height="2.3rem" fill="currentColor" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="btn btn-secondary dropdown-item btn-usuario-lista">Cerrar Sesión</a></li>
                                    <li><a class="dropdown-item btn btn-secondary btn-usuario-lista">Gestion Usuario</a></li>
                                </ul>
                            </li>                            
                            <li class="ms-0 me-3" style="display: flex; align-items: end; user-select: none; color: #131313"> <h1>| HGW </h1> <p style="display: flex; align-items: end; height: 100%; margin-left: 0.2rem;"> Admin</p> </li>
                        </ul>
                    </div>
                </nav>
            </div>            
`;
let navCarCard = document.getElementById("nav-bar");
navCarCard.innerHTML = nav_bar;
function inicio(){
    var contenedores = "";
    function crear_cont(){
        for(let i = 0; i < datos_inicio.length; i++){
            contenedores += `
                <div class="card" style="width: 18rem;">
                        <div class="card-body" style="background-color: rgb(254, 252, 252);">
                            <h5 class="card-title">${datos_inicio[i].titulo}</h5>
                            <p class="card-text">${datos_inicio[i].contenido}</p>
                                ${
                                    datos_inicio[i].extra == "" 
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
function productosLista(){
    let productos_pagina = `
        <h1>Lista</h1>
    `;
    contenido.innerHTML = productos_pagina;
}
function crearProductos(){
    let inputsHtml = "";
    function inputs(){
        for(let i = 0; i < inputs_valores.length; i++){
            inputsHtml += `
                <div class="form-floating">
                    <input required class="form-control" id="nombre_producto" placeholder="">
                    <label for="nombre_producto">${inputs_valores[i]}</label>
                </div>
            `;
        }
        return inputsHtml;
   }
   let productos_pagina = `
        <div class="formulario">
                <div class="imagen-contenedor">
                    <label for="imagen" class="img_producto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-fill" viewBox="0 0 16 16">
                            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                        </svg>
                    </label>
                    <input form="formulario" type="file" accept="image/*" hidden id="imagen">
                </div>
                <form class="inputs-form" id="formulario">
                    ${inputs()}
                    <select class="form-select" aria-label="Default select example">
                            <option selected>Categoria</option>
                            <option value="1">Bebidas</option>
                            <option value="2">Cosmeticos</option>
                            <option value="3">Alimentos</option>
                            </select>
                    <div class="buttons-form">
                        <button type="submit" class="btn btn-success">Crear Producto</button>
                    </div>
                </form>
            </div>
    `;
   contenido.innerHTML = productos_pagina;
   document.getElementById("formulario").onsubmit = event => {
        event.preventDefault();
        document.getElementById("alerta_producto").classList.add("alerta_producto-on");
        setTimeout(() => {
            document.getElementById("alerta_producto").classList.replace("alerta_producto-on", "alerta_producto");
        }, 3500);
   };
}
window.onload = inicio();