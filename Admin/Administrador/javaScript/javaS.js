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
window.onload = function(){
    let canva1 = document.getElementById("canva1").getContext("2d");
    canva1.height = 100;
    canva1.width = 100;
    let graficoBarras = new Chart(canva1, {
        type: "bar",
        data:{
            labels: ["Enero", "Febrero", "Marzo"],
            datasets: [{
                label: ["Ganancias"],
                data: [25, 45, 100],
                backgroundColor: ["#8DC989", "rgb(255, 182, 193)", "rgb(255, 255, 120)"],
            }]
        },
        options:{
            responsive: true
        }
    });
    let canva2 = document.getElementById("canva2").getContext("2d");
    let graficoCirculo = new Chart(canva2, {
        type: "pie",
        data:{
            labels: ["Alimentos", "Barras", "Bebidas"],
            datasets:[{
                label: "Porcentaje de compra",
                data: [25, 20, 55],
                backgroundColor: ["rgb(176, 234, 172)", "rgb(255, 182, 193)", "rgb(255, 255, 120)"],
            }]
        },  
        options:{
            responsive: true
        }
    });
    let canva3 = document.getElementById("canva3").getContext("2d");
    let graficoLineas = new Chart(canva3, {
        type: "line",
        data:{
            labels: ["Clientes Registrados", "Visitas no registradas"],
            datasets:[{
                label: "Cantidad",
                data: [32, 68],
                backgroundColor: ["rgb(255, 182, 193)", "rgb(173, 216, 230)"],
            }]
        },
        options:{
            responsive: true
        }
    });
}