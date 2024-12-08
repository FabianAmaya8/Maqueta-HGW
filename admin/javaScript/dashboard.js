let inputs = document.querySelectorAll("input");
    inputs.forEach((i)=>{
        i.addEventListener("keypress", function(evento){
        if(evento.keyCode == 13){
            sumar();
        }
    });
});
var Informacion = [];
var porcentajes = [];
var mensaje = "";
function sumar(){
    let html_informacion = document.getElementById("informacion");
    let html_porcentajes = document.getElementById("porcentajes");
    let html_mensaje = document.getElementById("mensaje");
    if(html_informacion.value != ""){
        Informacion.push(html_informacion.value);
        let lista = document.getElementById("lista-informacion");
        let li = document.createElement("li");
        li.innerHTML = html_informacion.value;
        lista.appendChild(li);
        html_informacion.value = "";
    }
    if(html_porcentajes.value != "" && !isNaN(html_porcentajes.value)){
        porcentajes.push(parseFloat(html_porcentajes.value));
        let lista2 = document.getElementById("lista-porcentajes");
        let li2 = document.createElement("li");
        li2.innerHTML = html_porcentajes.value+"%";
        lista2.appendChild(li2);
        html_porcentajes.value = "";
    }
    else if(isNaN(html_porcentajes.value)){
        Swal.fire({
            title: "Cuidado",
            text: "Ingrese un porcentaje valido",
            icon: "info",
            confirmButtonText: "Aceptar"
        });
    }
    var li3 = null;
    if(html_mensaje.value != ""){
        mensaje = html_mensaje.value;
        let lista3 = document.getElementById("lista-representacion");
        let lis = lista3.getElementsByTagName("li");
        let array = Array.from(lis);
        if(array.length == 0){
            li3 = document.createElement("li");
            li3.textContent = html_mensaje.value;
            lista3.appendChild(li3);
        }
        else{
            array[0].textContent = html_mensaje.value;
        }

        html_mensaje.value = "";
    }
}
let graficoPastel = null;
function crear(){
    let tamaño_canva = document.getElementById("tamaño-canva");
    if(graficoPastel){
        graficoPastel.destroy();
    }
    let tipoDiagrama = document.getElementById("select").value;
    if(Informacion.length == 0 || porcentajes.legnth == 0 || mensaje == ""){
        Swal.fire({
            title: "Cuidado",
            text:"Debe llenar todos los campos",
            icon: "info",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    if(tipoDiagrama == "Eliga el tipo de diagrama a generar"){
    Swal.fire({
        title: "Cuidado",
        text: "eliga un tipo de diagrama",
        icon: "info",
        cinfirmarButtonText: "Aceptar"
    });
    return;
    }
    if(tipoDiagrama == "Lineas"){
        tipoDiagrama = "line";
    }
    if(tipoDiagrama == "Barras"){
        tipoDiagrama = "bar";
    }
    if(tipoDiagrama == "Pastel"){
        tipoDiagrama = "pie";
        tamaño_canva.className = "tamaño-canva-pie";
    }
    else{
        tamaño_canva.className = "tamaño-canva-barras";
    }
    let canva1 = document.getElementById("canva-generate").getContext("2d");
    graficoPastel = new Chart(canva1 ,{
        type: tipoDiagrama,
        data:{
            labels: Informacion,
            datasets:[{
                label: mensaje,
                data: porcentajes,
                backgroundColor: ["#ADBBC6", "rgb(255, 182, 193)", "#8DC989", "rgb(255, 255, 120)", "#d5d4d4", "rgb(0, 0, 0)"],
            }],
        },
        options:{
            responsive: true
        },
    });
}
function eliminar(){
    if(graficoPastel){
        graficoPastel.destroy(); 
    }
}
function eliminar_datos(){
    Informacion = [];
    porcentajes = [];
    mensaje = "";
    let listas = document.querySelectorAll("ul");
    listas.forEach((i)=>{
        let lis = i.getElementsByTagName("li");
        let array = Array.from(lis);
        if(array.length > 0){
            array.forEach((a)=>{
                i.removeChild(a);
            });
        }
    });
}