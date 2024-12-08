$(document).ready(function(){
    $('#buscar').on('keyup', function(){
        var fila=$(this).val().toLowerCase();
        $('#tablita tbody tr').filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(fila)>=0)
        })
    })
    $('#tablita').on('click', '#eliminate', function(){
        $(this).closest('tr').remove();
    })
})
function precio(){
    var pr=Math.floor(Math.random()*(100000-50000+1));
    document.getElementById('#price').innerText=pr;
}
document.addEventListener('DOMContentLoaded', precio())