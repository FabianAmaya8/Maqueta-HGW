export function carritoCart() {
    let precioCarritoTotal = 0; // Variable para almacenar el precio total
    let totalCompra = 0; // Variable para almacenar el precio total
    
    // Función para crear un solo producto
    function createItemCarrito(name, price, imageUrl) {
        const itemCarrito = document.createElement('div');
        itemCarrito.className = 'item-carrito';
        const producto = document.createElement('div');
        producto.className = 'cotenedor-producto';
    
        const imagenProducto = document.createElement('div');
        imagenProducto.className = 'imagen-producto';
    
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagen Del Producto';
        imagenProducto.appendChild(img);
        producto.appendChild(imagenProducto);
    
        const infoProducto = document.createElement('div');
        infoProducto.className = 'info-producto';
    
        const titulo = document.createElement('h3');
        titulo.textContent = name;
    
        
    
        const precio = document.createElement('span');
        precio.className = 'precio';
        precio.textContent = `$${price.toFixed(2)}`;
    
        infoProducto.appendChild(titulo);
        infoProducto.appendChild(precio);
        producto.appendChild(infoProducto);
        itemCarrito.appendChild(producto);
    
        const cantidadDiv = document.createElement('div');
        cantidadDiv.className = 'cantidad';
    
        const botonMenos = document.createElement('button');
        botonMenos.className = 'menos';
        botonMenos.textContent = '-';
    
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.value = '1';
        inputCantidad.min = '1';
    
        const botonMas = document.createElement('button');
        botonMas.className = 'mas';
        botonMas.textContent = '+';
    
        cantidadDiv.appendChild(botonMenos);
        cantidadDiv.appendChild(inputCantidad);
        cantidadDiv.appendChild(botonMas);
        itemCarrito.appendChild(cantidadDiv);
    
        // Evento para actualizar el precio total
        const actualizarTotal = () => {
            const cantidad = parseInt(inputCantidad.value, 10);
            const subtotal = price * cantidad;
            recalcularTotal();
        };
    
        botonMenos.addEventListener('click', () => {
            if (inputCantidad.value > inputCantidad.min) {
                inputCantidad.value = parseInt(inputCantidad.value, 10) - 1;
                actualizarTotal();
            }
        });
    
        botonMas.addEventListener('click', () => {
            inputCantidad.value = parseInt(inputCantidad.value, 10) + 1;
            actualizarTotal();
        });
    
        inputCantidad.addEventListener('change', actualizarTotal);
    
        // Actualizar el precio total inicial
        actualizarTotal();
    
        return itemCarrito;
    }
    
    // Función para recalcular el precio total
    function recalcularTotal() {
        precioCarritoTotal = 0;
        totalCompra = 0;
        document.querySelectorAll('.item-carrito').forEach(item => {
            const precioTexto = item.querySelector('.precio').textContent.replace('$', '');
            const precioUnitario = parseFloat(precioTexto);
            const cantidad = parseInt(item.querySelector('input').value, 10);
            precioCarritoTotal += precioUnitario * cantidad;
    
            totalCompra = precioCarritoTotal+10000;
        });
        
        document.querySelectorAll('.subtotal').forEach(subtotalElement => {
            subtotalElement.textContent = `$${precioCarritoTotal.toFixed(2)}`;
        });

        document.querySelectorAll('.total').forEach(subtotalElement => {
            subtotalElement.textContent = `$${totalCompra.toFixed(2)}`;
        });
    }
    
    // Función para crear múltiples ítems del carrito dependiendo de la clase
    function createItemsFromClass() {
        const cartsContainers = document.querySelectorAll('.productos');
    
        cartsContainers.forEach(container => {
            const productCount = parseInt(container.classList[1]); // Asume que la clase es 'productos X'
    
            container.innerHTML = ''; // Limpia el contenedor
    
            for (let i = 0; i < productCount; i++) {
                const product = createItemCarrito(
                    'Nombre del Producto ' + (i + 1),
                    76000,
                    '../../../../img/hgw/producto.png'
                );
                container.appendChild(product);
            }
        });
    
        recalcularTotal(); // Recalcular total al crear productos
    }
    
    // Llamar a la función cuando la página cargue
    window.onload = createItemsFromClass;
}
