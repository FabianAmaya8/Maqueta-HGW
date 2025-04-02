import {panelGestion} from './paneles.js';

const tableData = [
    { id: 1, nombre: "Superalimentos", descripcion: "Alimentos como chía, linaza, quinoa, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 2, nombre: "Granos y semillas", descripcion: "Arroz integral, avena, trigo sarraceno, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 3, nombre: "Harina y productos de panadería", descripcion: "Harina de almendra, harina de coco, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 4, nombre: "Hierbas y Suplementos", descripcion: "Productos como ashwagandha, cúrcuma, espirulina, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 5, nombre: "Aceites Esenciales", descripcion: "Aceites de lavanda, árbol de té, eucalipto, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 6, nombre: "Cuidado Personal Natural", descripcion: "Jabones artesanales, cremas orgánicas, champús sin sulfatos, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 7, nombre: "Tés e Infusiones", descripcion: "Té verde, té de manzanilla, infusiones de hierbas, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 8, nombre: "Frutos Secos y Deshidratados", descripcion: "Almendras, nueces, pasas, dátiles, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 9, nombre: "Productos Apícolas", descripcion: "Miel pura, propóleo, jalea real, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 10, nombre: "Snacks Saludables", descripcion: "Barras energéticas naturales, chips de vegetales, etc.", editarURL: "../edicion/Editarcategoria.html" }
];
const modulos={
    1:'Usuarios',
    2:'Categorias',
    3:'Bonos',
    4:'Subcategorias',
    5:'Productos'
}

document.body.innerHTML = panelGestion(tableData, modulos[2]);