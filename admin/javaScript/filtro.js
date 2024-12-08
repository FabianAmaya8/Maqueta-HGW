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
            // Selecciona todos los elementos <p> con la clase 'price'
            $('p').each(function() {
                // Genera un número aleatorio entre 50000 y 100000
                var numero = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000;
                // Muestra el número en el elemento <p> actual
                $(this).text(numero);
            });
        }
        // Llama a la función mostrarNumerosAleatorios al cargar la página
        mostrarNumerosAleatorios();
})
