export const gestionables={
    1:'usuarios',
    2:'categorias',
    3:'bonos',
    4:'subcategorias',
    5:'productos'
}
export const usuarios = [
    { id: 1, nombre: "Juan Pérez", correo: "juan.perez@email.com", rol: "Administrador", editarURL: "../edicion/Editarusuario.html" },
    { id: 2, nombre: "María Gómez", correo: "maria.gomez@email.com", rol: "Cliente", editarURL: "../edicion/Editarusuario.html" },
    { id: 3, nombre: "Carlos López", correo: "carlos.lopez@email.com", rol: "Vendedor", editarURL: "../edicion/Editarusuario.html" },
    { id: 4, nombre: "Ana Martínez", correo: "ana.martinez@email.com", rol: "Cliente", editarURL: "../edicion/Editarusuario.html" },
    { id: 5, nombre: "Pedro Ramírez", correo: "pedro.ramirez@email.com", rol: "Vendedor", editarURL: "../edicion/Editarusuario.html" },
    { id: 6, nombre: "Laura Fernández", correo: "laura.fernandez@email.com", rol: "Administrador", editarURL: "../edicion/Editarusuario.html" },
    { id: 7, nombre: "José González", correo: "jose.gonzalez@email.com", rol: "Cliente", editarURL: "../edicion/Editarusuario.html" },
    { id: 8, nombre: "Sofía Torres", correo: "sofia.torres@email.com", rol: "Vendedor", editarURL: "../edicion/Editarusuario.html" },
    { id: 9, nombre: "Diego Herrera", correo: "diego.herrera@email.com", rol: "Cliente", editarURL: "../edicion/Editarusuario.html" },
    { id: 10, nombre: "Isabel Castro", correo: "isabel.castro@email.com", rol: "Administrador", editarURL: "../edicion/Editarusuario.html" }
];
export const categorias = [
    { id: 1, nombre: "Superalimentos", descripcion: "Chía, linaza, quinoa, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 2, nombre: "Granos y semillas", descripcion: "Arroz integral, avena, trigo sarraceno, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 3, nombre: "Harina y Panadería", descripcion: "Harina de almendra, harina de coco, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 4, nombre: "Aceites Esenciales", descripcion: "Aceite de coco, oliva, almendra, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 5, nombre: "Snacks Saludables", descripcion: "Barras energéticas, chips de vegetales, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 6, nombre: "Tés e Infusiones", descripcion: "Té verde, té de manzanilla, infusiones de hierbas, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 7, nombre: "Productos Apícolas", descripcion: "Miel pura, propóleo, jalea real, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 8, nombre: "Cuidado Personal Natural", descripcion: "Jabones artesanales, cremas naturales, champús sin sulfatos, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 9, nombre: "Frutos Secos y Deshidratados", descripcion: "Almendras, nueces, pasas, dátiles, etc.", editarURL: "../edicion/Editarcategoria.html" },
    { id: 10, nombre: "Hierbas y Suplementos", descripcion: "Ashwagandha, cúrcuma, espirulina, etc.", editarURL: "../edicion/Editarcategoria.html" }
];
export const bonos = [
    { id: 1, codigo: "DESC10", descuento: "10%", tipoBono: "Bono de mérito personal", editarURL: "../edicion/Editarbono.html" },
    { id: 2, codigo: "FREESHIP", descuento: "Envío gratis", tipoBono: "Bono de membresía", editarURL: "../edicion/Editarbono.html" },
    { id: 3, codigo: "DESC15", descuento: "15%", tipoBono: "Bono de equipo", editarURL: "../edicion/Editarbono.html" },
    { id: 4, codigo: "WELCOME5", descuento: "5% en la primera compra", tipoBono: "Bono de referido", editarURL: "../edicion/Editarbono.html" },
    { id: 5, codigo: "SUMMER20", descuento: "20%", tipoBono: "Bono de mérito personal", editarURL: "../edicion/Editarbono.html" },
    { id: 6, codigo: "BLACKFRIDAY", descuento: "30%", tipoBono: "Bono de equipo", editarURL: "../edicion/Editarbono.html" },
    { id: 7, codigo: "NUEVOCLIENTE", descuento: "10% en la primera compra", tipoBono: "Bono de referido", editarURL: "../edicion/Editarbono.html" },
    { id: 8, codigo: "CASHBACK5", descuento: "5% de reembolso", tipoBono: "Bono de membresía", editarURL: "../edicion/Editarbono.html" },
    { id: 9, codigo: "FESTIVE15", descuento: "15%", tipoBono: "Bono de mérito personal", editarURL: "../edicion/Editarbono.html" },
    { id: 10, codigo: "VIP20", descuento: "20% para clientes VIP", tipoBono: "Bono de membresía", editarURL: "../edicion/Editarbono.html" }
];

export const subcategorias = [
    { id: 1, nombre: "Chía", descripcion: "Semillas ricas en omega-3.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 2, nombre: "Quinoa", descripcion: "Fuente de proteínas.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 3, nombre: "Avena", descripcion: "Fuente de fibra y energía.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 4, nombre: "Linaza", descripcion: "Rica en ácidos grasos esenciales.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 5, nombre: "Té Verde", descripcion: "Alto en antioxidantes.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 6, nombre: "Cúrcuma", descripcion: "Propiedades antiinflamatorias.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 7, nombre: "Almendras", descripcion: "Ricas en grasas saludables.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 8, nombre: "Miel Orgánica", descripcion: "Miel pura sin aditivos.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 9, nombre: "Jengibre", descripcion: "Refuerza el sistema inmune.", editarURL: "../edicion/Editarsubcategoria.html" },
    { id: 10, nombre: "Aceite de Coco", descripcion: "Usos múltiples en cocina y cosmética.", editarURL: "../edicion/Editarsubcategoria.html" }
];
export const productos = [
    { id: 1, nombre: "Harina de Almendra", precio: 8.99, categoria: "Harina y panadería", editarURL: "../edicion/Editarproducto.html" },
    { id: 2, nombre: "Aceite de Coco", precio: 12.50, categoria: "Aceites esenciales", editarURL: "../edicion/Editarproducto.html" },
    { id: 3, nombre: "Barras Energéticas", precio: 2.99, categoria: "Snacks Saludables", editarURL: "../edicion/Editarproducto.html" },
    { id: 4, nombre: "Propóleo", precio: 15.00, categoria: "Productos Apícolas", editarURL: "../edicion/Editarproducto.html" },
    { id: 5, nombre: "Té Verde Orgánico", precio: 6.75, categoria: "Tés e Infusiones", editarURL: "../edicion/Editarproducto.html" },
    { id: 6, nombre: "Jabón Artesanal de Lavanda", precio: 5.99, categoria: "Cuidado Personal Natural", editarURL: "../edicion/Editarproducto.html" },
    { id: 7, nombre: "Quinoa Orgánica", precio: 7.50, categoria: "Granos y semillas", editarURL: "../edicion/Editarproducto.html" },
    { id: 8, nombre: "Miel de Manuka", precio: 25.00, categoria: "Productos Apícolas", editarURL: "../edicion/Editarproducto.html" },
    { id: 9, nombre: "Leche de Almendras", precio: 4.99, categoria: "Superalimentos", editarURL: "../edicion/Editarproducto.html" },
    { id: 10, nombre: "Mix de Frutos Secos", precio: 10.50, categoria: "Frutos Secos y Deshidratados", editarURL: "../edicion/Editarproducto.html" }
];

