import { carritoCart } from '../../js/carrito/carrito-cart.js';
import { activacion, mostrarDiv } from '../../js/carrito/activacion.js';
import { mostrarAlerta } from '../../js/carrito/alerta.js';

carritoCart();
activacion();

window.mostrarDiv = mostrarDiv;
document.getElementById('aler').addEventListener('click', mostrarAlerta);
