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
        function mostrarNumerosAleatorios() {
            $('p').each(function() {
                var numero = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000;
                $(this).text(numero);
            });
        }
        mostrarNumerosAleatorios();
})
