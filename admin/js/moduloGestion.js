import {panelGestion} from './paneles.js';
import {usuarios} from './tablas.js'
import {categorias} from './tablas.js'
import {bonos} from './tablas.js'
import {subcategorias} from './tablas.js'
import {productos} from './tablas.js'
import { gestionables } from './tablas.js';


document.body.innerHTML = panelGestion(productos, gestionables[5]);