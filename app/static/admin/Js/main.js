import { inicio } from './inicio.js';
import { navBar } from './nav_bar.js';
import { crearProductos, agregarProducto, alerta } from './Productos/crearProductos.js';
import { productosLista } from './Productos/listaProductos.js';
import { editarProducto, editarProductoBoton, eliminarProducto } from './Productos/eliminarEditarProducto.js';
import { listaBonos } from './Bonos/listaBonos.js';
import { administrarBonos, agregarBono } from './Bonos/administrarBonos.js';
import { crearCategoria, agregarCategoria } from './Categorias/CrearCategorias.js';
import { listaCategorias } from './Categorias/ListaCategorias.js'
import { crearSubcategoria, agregarSubcategoria } from './Categorias/subcategorias/CrearSubcategoria.js';
import { listaSubcategoria } from './Categorias/subcategorias/ListaSubcategoria.js';
import { mostrarSubcategoria } from './Productos/crearProductos.js';
import { creacion, agregarUsuario } from './usuario/administrarUsuario.js';
import {listaUsuarios} from './usuario/listaUsuario.js'
window.onload = () => {
    inicio();
    navBar();
};
window.mostrarSubcategoria = mostrarSubcategoria;
window.alerta = alerta;
window.crearProductos = crearProductos;
window.agregarCategoria = agregarCategoria
window.agregarSubcategoria = agregarSubcategoria;
window.inicio = inicio;
window.crearCategoria = crearCategoria;
window.listaCategorias = listaCategorias;
window.crearSubcategoria = crearSubcategoria;
window.listaSubcategoria = listaSubcategoria;
window.agregarProducto = agregarProducto;
window.productosLista = productosLista;
window.editarProducto = editarProducto;
window.editarProductoBoton = editarProductoBoton;
window.eliminarProducto = eliminarProducto;
window.listaBonos = listaBonos;
window.administrarBonos = administrarBonos;
window.agregarBono = agregarBono;
window.administrarUsuarios = creacion;
window.agregarUsuario=agregarUsuario;
window.listaUsuarios=listaUsuarios;