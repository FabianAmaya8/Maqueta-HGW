import { crearProductos, agregarProducto } from "./Productos/crearProductos.js";
import { datos_inicio, productos, categorias, categoriasVar, contenido } from './variablesGlobales.js';
export function navBar() {
    let nav_bar = `
    <header class="card-body">
        <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="alert alert-success alerta_producto" role="alert" id="alerta_producto">
            
        </div>
        <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="menuNavbar">
                <ul class="navbar-nav d-flex w-100">
                    <li class="nav-item active"> <a class="btn btn-primary btn-lg" onclick="inicio()"> Inicio </a> </li>
                    <li class="nav-item"> <a class="btn btn-primary btn-lg"> Gestion de Usuario </a> </li>
                    <li class="nav-item btn-group btn-group-normal"> <a class="btn btn-primary btn-lg dropdown-toggle" data-bs-offset="0, -10"> Bonos </a> 
                        <ul class="dropdown-menu">
                            <li> <a class="btn btn-secondary dropdown-item" onclick="listaBonos()">Lista de Bonos</a> </li>
                            <li> <a class="btn btn-secondary dropdown-item" onclick="administrarBonos()">Administrar Bonos</a> </li>
                        </ul>
                    </li>
                    <li class="nav-item btn-group btn-group-normal">
                        <a class="btn btn-primary btn-lg dropdown-toggle" data-bs-toggle="dropdown">
                            Categorias
                        </a>
                            <ul class="dropdown-menu">
                                <li class="nav-item">
                                    <a class="btn btn-secondary btn-lg dropdown-toggle sublista" data-bs-toggle="dropdown">
                                        Categoria
                                    </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="btn btn-secondary dropdown-item" onclick="listaCategorias()">Lista Categorias</a>
                                </li>
                                <li>
                                    <a class="btn btn-secondary dropdown-item" onclick="crearCategoria()">Crear Categoria</a>
                                </li>
                            </ul>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-secondary btn-lg dropdown-toggle sublista" data-bs-toggle="dropdown">
                            Subcategoria
                        </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="btn btn-secondary dropdown-item" onclick="listaSubcategoria()">Lista Subcategorias</a>
                                </li>
                                <li>
                                    <a class="btn btn-secondary dropdown-item" onclick="crearSubcategoria()">Crear Subcategoria</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="nav-item btn-group btn-group-normal"> <a class="btn btn-primary btn-lg dropdown-toggle" data-bs-offset="0, -10"> Producto </a> 
                    <ul class="dropdown-menu">
                        <li> <a class="btn btn-secondary dropdown-item" onclick="productosLista()">Lista de Productos</a> </li>
                        <li> <a class="btn btn-secondary dropdown-item" onclick="crearProductos([])">Crear Producto</a> </li>
                    </ul>
                </li>
                <li class="ms-auto nav-item dropdown d-none d-md-block">
                    <a class="btn btn-primary btn-lg btn-usuario" data-bs-toggle="dropdown">
                        <svg class="img-btn" xmlns="http://www.w3.org/2000/svg" width="2.3rem" height="2.3rem" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class="btn btn-secondary dropdown-item btn-usuario-lista">Cerrar Sesión</a>
                        </li>
                        <li>
                            <a class="dropdown-item btn btn-secondary btn-usuario-lista">Gestion Usuario</a>
                        </li>
                        <li>
                            <a href="/inicio" class="dropdown-item btn btn-secondary btn-usuario-lista">Vista Inicio</a>
                        </li>
                    </ul>
                </li>
                <li class="ms-0 me-3 d-none d-md-block" style="display: flex; align-items: center; user-select: none; color: #131313;">
                    <span style="font-size: 2rem; font-weight: 500;">| HGW</span>
                    <span style="font-size: 1rem; font-weight: 400; margin-left: 0.2rem; position: relative; top: 3px;">Admin</span>
                </li>
                </ul>
            </div>
        </nav>
    </header>            
`;
    let navCarCard = document.getElementById("nav-bar");
    navCarCard.innerHTML = nav_bar;
}