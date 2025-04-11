export var datos_inicio = [
    {
        titulo: "Bienvenido admin", contenido: '<svg class="img-inicio" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>' + `
        <div class="card" style="width: 90%; height: max-content; user-select: none; margin-left: 5%; margin-right: auto; padding: 10%; display: flex; justify-content: center; background-color: var(--color-textos-fondo) !important; color: white !important; border-radius: 1rem !important;">
            Informe sobre ultimas modificaciones, ultimos referidos, creaciones, y productos bajos en stock
        </div>`, extra: ""
    },
    { titulo: "Creados Recientemente", contenido: "El ultimo producto agregado fue: gaseosa", extra: "" },
    { titulo: "Referidos", contenido: "Informe de referido este mes:", extra: "" },
    { titulo: "Mas Vendido", contenido: "Producto mas vendido:", extra: "" },
    { titulo: "Menos Vendido", contenido: "El producto menos vendido es:", extra: "" }
];
export var productos = [];
export var encabezadoTablaProductos = [{ columna: "Id" }, { columna: "Nombre Producto" }, { columna: "Precio Producto" }, { columna: "Descripción" }, { columna: "Categoria" }];
export var categorias = ["Categoria", "Bebidas", "Cosmeticos", "Alimentos", "Accesorios"];
export var categoriasVar = ["No Seleccionada", "Bebidas", "Cosmeticos", "Alimentos", "Accesorios"];
export const contenido = document.getElementById("contenido");