let nav_bar = `
     <div class="card-body">
                <nav class="navbar navbar-expand-lg">
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav d-flex w-100">
                            <li class="nav-item active"> <a class="btn btn-primary btn-lg"> Inicio </a> </li>
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
                                    <li> <a class="btn btn-secondary dropdown-item">Lista de Prodcutos</a> </li>
                                    <li> <a class="btn btn-secondary dropdown-item">Crear Producto</a> </li>
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
    let inicio = `
        
    `;
}
