window.onload = function(){
    let canva1 = document.getElementById("canva1");
    let grafico1 = new Chart(canva1, {
        type: "pie",
        data:{
            labels: ["referidos activos", "referidos inactivos"],
            datasets:[{
                label: "porcentaje por mes",
                data: [60, 40]
            }]
        },
        options:{
            responsive: true
        },
    });
    let canva2 = document.getElementById("canva2");
    let grafico2 = new Chart(canva2, {
        type: "bar",
        data:{
            labels: ["Alimentos", "Cuidado personal", "Accesorios", "Suplementos"],
            datasets:[{
                label: "productos comprados por mes",
                data: [40, 30, 0, 30]
            }]
        },
        options:{
            respoonsive: true
        }
    });
    let canva3 = document.getElementById("canva3");
    let grafico3 = new Chart(canva3, {
        type: "line",
        data:{
            labels: ["Inversiones en la pagina", "Ganancias"],
            datasets: [{
                label: "porcentajes",
                data: [40, 60],
            }]
        },
        options:{
            responsive: true
        }
    });
}