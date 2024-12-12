import { carritoCart } from '../../js/carrito/carrito-cart.js';
import { activacion, mostrarDiv } from '../../js/carrito/activacion.js';
import { configurarFormularioEnvio } from '../../js/carrito/formulario.js';
import { configurarFormularioPago } from '../../js/carrito/formulario.js';



// Inicializaciones
carritoCart();
activacion();
configurarFormularioEnvio();
configurarFormularioPago();

window.mostrarDiv = mostrarDiv; // Hacer mostrarDiv accesible globalmente
