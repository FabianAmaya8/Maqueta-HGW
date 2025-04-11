import { productsData } from './data-productos.js';
import { mostrarAlerta } from './alerta-añadir.js';

// Función para seleccionar un producto aleatoriamente
function getRandomProduct() {
  const randomIndex = Math.floor(Math.random() * productsData.length);
  return productsData[randomIndex];
}

// Función para formatear el precio con signo de pesos y separadores de miles
function formatPrice(price) {
  return `$${price.toLocaleString()}`; // Agrega el signo de pesos y formatea números grandes
}

// Función para crear un solo producto
function createProduct(categoria, name, price, imageUrl, stock) {
  const cartProducto = document.createElement('article'); // Cambiado a 'article' por semántica
  cartProducto.className = 'cart-producto';

  const stockIndicator = document.createElement('span');
  stockIndicator.classList.add('stock-indicator');
  if (stock > 10) {
    stockIndicator.classList.add('in-stock');
  } else if (stock > 0) {
    stockIndicator.classList.add('low-stock');
  } else {
    stockIndicator.classList.add('out-of-stock');
  }
  cartProducto.appendChild(stockIndicator);

  const stockLabel = document.createElement('span');
  stockLabel.classList.add('stock-label');
  if (stock > 10) {
    stockLabel.textContent = 'Stock disponible';
    stockLabel.classList.add('in-stock');
  } else if (stock > 0) {
    stockLabel.textContent = `¡Solo ${stock} unidades!`;
    stockLabel.classList.add('low-stock');
  } else {
    stockLabel.textContent = 'Agotado';
    stockLabel.classList.add('out-of-stock');
  }
  cartProducto.appendChild(stockLabel);

  const productLink = document.createElement('a');
  productLink.href = '/usuario/catalogo/paginaproducto.html';
  productLink.setAttribute('aria-label', `Ver más sobre ${name}`);

  const bannerProductosDiv = document.createElement('figure');
  bannerProductosDiv.className = 'baner-productos';

  const productImg = document.createElement('img');
  productImg.src = imageUrl;
  productImg.alt = `Imagen del producto ${name}`;

  bannerProductosDiv.appendChild(productImg);

  const infoProductoDiv = document.createElement('section');
  infoProductoDiv.className = 'info-producto';

  const productCategoria = document.createElement('p');
  productCategoria.textContent = categoria;
  productCategoria.className = 'categoria';

  const productName = document.createElement('h3');
  productName.textContent = name;
  productName.className = 'nombre';

  const productPrice = document.createElement('p');
  productPrice.textContent = formatPrice(price);
  productPrice.className = 'precio';

  const productCarrito = document.createElement('button');
  productCarrito.textContent = "Agregar al carrito";
  productCarrito.className = 'btn-carrito';
  productCarrito.id = 'añadir';
  productCarrito.setAttribute('aria-label', `Agregar ${name} al carrito`);
  
  if (stock <= 0) {
    productCarrito.disabled = true;
    productCarrito.classList.add('btn-deshabilitado');
  }// Accesibilidad
  
  productCarrito.addEventListener('click', mostrarAlerta);


  infoProductoDiv.appendChild(productCategoria);
  infoProductoDiv.appendChild(productName);
  infoProductoDiv.appendChild(productPrice);
  
  productLink.appendChild(bannerProductosDiv);
  productLink.appendChild(infoProductoDiv);
  
  cartProducto.appendChild(productLink);
  cartProducto.appendChild(productCarrito);
  return cartProducto;
}


// Función para crear múltiples productos dependiendo de la clase
function createProductsFromClass() {
  const cartsContainers = document.querySelectorAll('.carts');

  cartsContainers.forEach(container => {
    const productCount = parseInt(container.classList[1]); // Asume que la clase es 'carts X', donde X es el número de productos

    container.innerHTML = '';

    for (let i = 0; i < productCount; i++) {
      const { categoria, name, price, imageUrl, stock } = getRandomProduct();
      const product = createProduct(categoria, name, price, imageUrl, stock);
      container.appendChild(product);
    }
  });
}
window.onload = createProductsFromClass;
