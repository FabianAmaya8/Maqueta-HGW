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
