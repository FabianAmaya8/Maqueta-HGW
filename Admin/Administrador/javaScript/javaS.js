
function nav_bar(){
    let bar = document.getElementById("nav-bar");
    let contenedor_btn_menu = document.getElementById("contenedor-btn-menu");
    let section = document.getElementById("section");
    let generador_dashboard = document.getElementById("generador-dashboard");
    if(bar.className == "nav-bar"){
        bar.className = "nav-bar on";
        contenedor_btn_menu.className = "contenedor-btn-menu on";
        section.className = "on-section";
        generador_dashboard.className = "generador-dashboard on-generador-dashboard";
    }
    else if(bar.className = "nav-bar on"){
        bar.className = "nav-bar";
        contenedor_btn_menu.className = "contenedor-btn-menu";
        section.className = "";
        generador_dashboard.className = "generador-dashboard";
    }
}
function usuario(){
    let nav_usuario = document.getElementById("nav-usuario");
    let separador = document.getElementById("separador");
    let usuario = document.getElementById("usuario");
    if(nav_usuario.className == "nav-usuario"){
        nav_usuario.className = "nav-usuario on-usuario";
        separador.className = "separador on-separador";
        usuario.className = "usuario usuario-logo-on";
    }
    else if(nav_usuario.className == "nav-usuario on-usuario"){
        nav_usuario.className = "nav-usuario";
        separador.className = "separador";
        usuario.className = "usuario";
    }
}

