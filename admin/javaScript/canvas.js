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