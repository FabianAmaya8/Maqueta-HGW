function mostrarSeccion(idSeccion) {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    const seccionSeleccionada = document.getElementById(idSeccion);
    seccionSeleccionada.style.display = 'block';

    const pasos = document.querySelectorAll('.menu-lateral ul li');
    pasos.forEach((paso, index) => {
        if (index + 1 === parseInt(idSeccion.split('-')[1])) {
            paso.classList.add('activo');
        } else {
            paso.classList.remove('activo');
        }
    });
}
function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(function (seccion) {
        seccion.style.display = 'none';
    });
    const seccionMostrar = document.getElementById(seccion);
    if (seccionMostrar) {
        seccionMostrar.style.display = 'block';
    }
}

