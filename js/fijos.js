// Importación de elementos fijos
import { initHeader } from './fijos/header.js';
import { initFooter } from './fijos/footer.js';
import { ChatBot } from './fijos/chatbot.js';

// Importación de elementos de modales
import { htmlLogin } from '../js/login/gral-html-login.js';
import { ReferralModal } from './referidos/referidosHTML.js'

// Importación de funciones logica de los modales y validación
import { initLogin } from '../js/login/login.js';
import { validacionLogin } from '../js/login/validacion.js';
import { mostrarModal } from './referidos/referido.js';

// Inicialización de elementos fijos
initHeader();
initFooter();
ChatBot();

// Inicialización de elementos de modales
htmlLogin();
ReferralModal();

// Inicialización de logica de los modales y validación
initLogin();
validacionLogin();
mostrarModal();
