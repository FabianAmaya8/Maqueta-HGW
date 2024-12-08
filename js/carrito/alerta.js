// alerta.js
export function mostrarAlerta() {
    Swal.fire({
        title: '¡Compra completada!',
        text: 'Gracias por tu compra. ¡Tu pedido ha sido procesado exitosamente!',
        icon: 'success', // Tipo de alerta, 'success' en este caso
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Redirigir al usuario a index.html
        window.location.href = '../../Index.html';
    });

}
