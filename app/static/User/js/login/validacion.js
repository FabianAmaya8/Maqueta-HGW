document.addEventListener("DOMContentLoaded", function() {
    const btnIngresar = document.querySelector('#btn-ingresar');

    btnIngresar.addEventListener('click', function(event) {
        event.preventDefault();
        const email = document.getElementById('usuario')?.value.trim();
        const password = document.getElementById('contrasena')?.value.trim();

        if (!email || !password) {
            Swal.fire({
                icon: "warning",
                title: 'Campos Vacíos',
                text: 'Por favor, completa todos los campos antes de continuar',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        if (email === 'admin@hgw.com' && password === '12345') {
            Swal.fire({
                icon: "success",
                title: 'Inicio exitoso',
                text: 'Bienvenido Administrador',
                confirmButtonText: 'Ingresar',                                                                                                                                              
            }).then(() => {
            
            });
            return;

        } else {
            Swal.fire({
                icon: "error",
                title: 'Credenciales no válidas',
                text: 'El correo o la contraseña son incorrectos',
                confirmButtonText: 'Reintentar',
            });
        }
    });
});