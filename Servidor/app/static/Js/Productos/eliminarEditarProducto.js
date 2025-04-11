import { inputs_valores, datos_inicio, productos, categorias, categoriasVar, contenido } from '../variablesGlobales.js';
export function eliminarProducto(event){
    let fila = event.target.closest("tr");
    productos.forEach((producto, index) =>{
        if(producto.Id == parseInt(fila.firstElementChild.textContent)) {
            productos.splice(index, 1);
        }
    });
    fila.parentElement.removeChild(fila);
    let datosFila = event.target.closest("tr").children;
    let contador = 0;
    for(let dato of datosFila){
        if(contador == 2){
            fetch(`http://127.0.0.1:5000//eliminar_producto?producto_id=${dato.textContent.trim()}`);
        }
        contador++;
    }
}
var evento;
export function editarProducto(event){
    let tds = event.target.closest("tr").children;
    let productoValores = [];
    let categoria = "";
    let ids = "";
    Array.from(tds).forEach((td, index) =>{
        if(index == 0){
            ids = td.textContent;
        }
        if(index > 0 && index < 4){
            productoValores.push(td.textContent);
        }
        else if(index == 4){
            categoria = td.textContent;
        }
    });
    crearProductos(productoValores, true);
    document.getElementById("Categoria").selectedIndex = parseInt(categoriasVar.indexOf(categoria.trim()));
    evento = event;
}
export function editarProductoBoton(){
    if(document.getElementById("formulario").checkValidity()){
        let tds = evento.target.closest("tr").children;
        let id = "";
        let posicionEditar = 0;
        Array.from(tds).forEach((td, index) =>{
            if(index == 0){
                id = td.textContent;
            }
        });
        productos.forEach((producto, index)=>{
            if(producto.Id == parseInt(id)){
                posicionEditar = index;
            }
        });
        inputs_valores.forEach((dato, index) => {
                if(index < 3){
                    productos[posicionEditar][dato] = document.getElementById(inputs_valores[index]).value;
                }
                if(index == 3){
                    productos[posicionEditar][dato] = categoriasVar[parseInt(document.getElementById(inputs_valores[index]).value)];
                };
        });
        document.getElementById("alerta_producto").textContent = ("✔️ Se ha editado el producto correctamente");
    }
}