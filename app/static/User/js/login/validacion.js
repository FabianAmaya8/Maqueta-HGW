document.addEventListener("DOMContentLoaded", function () {
    const btnIngresar = document.querySelector('#btn-ingresar');

    btnIngresar.addEventListener('click', async function (event) {
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

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify({ usuario: email, contrasena: password })
            });

            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Inicio exitoso",
                        text: result.message || "Bienvenido",
                        confirmButtonText: "Ingresar"
                    }).then(() => {
                        window.location.href = result.redirect || "/"; // Redirige si se proporciona una URL
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Credenciales no válidas",
                        text: result.message || "El usuario o la contraseña son incorrectos.",
                        confirmButtonText: "Reintentar"
                    });
                }
            } else {
                throw new Error("Error del servidor");
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar con el servidor. Intenta más tarde.",
                confirmButtonText: "Aceptar"
            });
            console.error("Error en el login:", error);
        }
    });
});
