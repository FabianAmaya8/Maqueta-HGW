import { initHeader } from './fijos/header.js';
import { initFooter } from './fijos/footer.js';
import { htmlLogin } from '../js/login/gral-html-login.js';
import { initLogin } from '../js/login/login.js';
import { validacionLogin } from '../js/login/validacion.js';

initHeader();
htmlLogin();
initFooter();
initLogin();
validacionLogin();
