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
function createProduct(categoria, name, price, imageUrl) {
  const cartProducto = document.createElement('article'); // Cambiado a 'article' por semántica
  cartProducto.className = 'cart-producto';

  const links = [
    "/usuario/catalogo/paginaproducto.html",
    "/usuario/catalogo/paginaproducto2.html",
    "/usuario/catalogo/paginaproducto.html"
  ];

  const randomLink = links[Math.floor(Math.random() * links.length)];

  const productLink = document.createElement('a');
  productLink.href = randomLink;
  productLink.setAttribute('aria-label', `Ver más sobre ${name}`); // Accesibilidad
  productLink.textContent = "Ver producto";

  // Suponiendo que quieres agregar el enlace a un contenedor en la página
  document.body.appendChild(productLink);
 // Accesibilidad

  const bannerProductosDiv = document.createElement('figure'); // Cambiado a 'figure'
  bannerProductosDiv.className = 'baner-productos';

  const productImg = document.createElement('img');
  productImg.src = imageUrl;
  productImg.alt = `Imagen del producto ${name}`; // Accesibilidad

  bannerProductosDiv.appendChild(productImg);

  const infoProductoDiv = document.createElement('section'); // Cambiado a 'section'
  infoProductoDiv.className = 'info-producto';

  const productCategoria = document.createElement('p');
  productCategoria.textContent = categoria;
  productCategoria.className = 'categoria';

  const productName = document.createElement('h3');
  productName.textContent = name;
  productName.className = 'nombre';

  const productPrice = document.createElement('p');
  productPrice.textContent = formatPrice(price); // Aplica formato al precio
  productPrice.className = 'precio';

  const productCarrito = document.createElement('button');
  productCarrito.textContent = "Agregar al carrito";
  productCarrito.className = 'btn-carrito';
  productCarrito.id = 'añadir';
  productCarrito.setAttribute('aria-label', `Agregar ${name} al carrito`); // Accesibilidad

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
      const { categoria, name, price, imageUrl } = getRandomProduct();
      const product = createProduct(categoria, name, price, imageUrl);
      container.appendChild(product);
    }
  });
}

window.onload = createProductsFromClass;
