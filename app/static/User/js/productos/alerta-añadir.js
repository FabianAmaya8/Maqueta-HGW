export function mostrarAlerta() {
    Swal.fire({
        title: '¡Producto añadido!',
        text: 'El producto se ha añadido al carrito.',
        icon: 'success', // Tipo de alerta
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Aquí puedes agregar lógica adicional si es necesario.
    });
}
