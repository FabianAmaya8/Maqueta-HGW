function nav_bar(){
    let bar = document.getElementById("nav-bar");
    let contenedor_btn_menu = document.getElementById("contenedor-btn-menu");
    let section = document.getElementById("section");
    if(bar.className == "nav-bar"){
        bar.className = "nav-bar on";
        contenedor_btn_menu.className = "contenedor-btn-menu on";
        section.className = "on-section";
    }
    else if(bar.className = "nav-bar on"){
        bar.className = "nav-bar";
        contenedor_btn_menu.className = "contenedor-btn-menu";
        section.className = "section";
    }
}