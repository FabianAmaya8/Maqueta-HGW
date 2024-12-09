export function activacion() {
    document.addEventListener("DOMContentLoaded", () => {
        // Mostrar el primer div al cargar la página
        mostrarDiv('i1');
    });
}

// Exportar también la función mostrarDiv
export function mostrarDiv(clase) {
    // Seleccionar todos los divs con la clase "conten-item"
    const divs = document.querySelectorAll(".conten-item");

    // Iterar sobre los divs y gestionar las clases
    divs.forEach(div => {
        if (div.classList.contains(clase)) {
            div.classList.add("active"); // Mostrar el div con la clase correspondiente
        } else {
            div.classList.remove("active"); // Ocultar los demás
        }
    });
}
