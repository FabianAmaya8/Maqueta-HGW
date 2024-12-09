// Crear elementos del header
const header = document.createElement('header');

// Logo
const logoDiv = document.createElement('div');
logoDiv.className = 'logo';

const logoImg = document.createElement('img');
logoImg.src = '../../../../img/logo.png';
logoImg.alt = 'logo';
logoDiv.appendChild(logoImg);

// Buscador
const buscadorDiv = document.createElement('div');
buscadorDiv.className = 'buscardor';

const form = document.createElement('form');

const inputText = document.createElement('input');
inputText.className = 'buscador-tex';
inputText.id = 'buscador';
inputText.type = 'text';
inputText.placeholder = 'Buscador';

const inputSubmit = document.createElement('input');
inputSubmit.className = 'buscador-btn';
inputSubmit.type = 'submit';
inputSubmit.value = 'Buscar';

form.appendChild(inputText);
form.appendChild(inputSubmit);
buscadorDiv.appendChild(form);

// Navegación
const nav = document.createElement('nav');
nav.className = 'nav-general';

const links = [
  { href: '../../../../Index.html', text: 'Inicio', folder: '' },
  { href: '../../../../usuario/educacion/educacion.html', text: 'Educacion', folder: 'usuario/educacion' },
  { href: '../../../../usuario/catalogo/catalogo.html', text: 'Catalogo', folder: 'usuario/catalogo' },
  { href: '../../../../usuario/personal/personal.html', text: 'Personal', folder: 'usuario/personal' },
  { href: '../../../../usuario/carrito/carrito.html', text: 'Tu Carrito', folder: 'usuario/carrito' }
];

links.forEach(link => {
  const a = document.createElement('a');
  a.className = 'nav-link';
  a.href = link.href;
  a.textContent = link.text;
  a.dataset.folder = link.folder; // Guardar el nombre de la carpeta (incluyendo subcarpetas) en un atributo data
  nav.appendChild(a);
});

// Imagen personal
const personalLink = document.createElement('a');
personalLink.href = '#';

const personalDiv = document.createElement('div');
personalDiv.className = 'personal';

const personalImg = document.createElement('img');
personalImg.src = '../../../../img/personal.png';
personalImg.alt = 'personal';

personalDiv.appendChild(personalImg);
personalLink.appendChild(personalDiv);
nav.appendChild(personalLink);

// Añadir todo al header
header.appendChild(logoDiv);
header.appendChild(buscadorDiv);
header.appendChild(nav);

// Agregar el header al cuerpo del documento
document.body.appendChild(header);

// Detectar la carpeta actual usando la ruta completa del directorio
const currentPath = window.location.pathname;

// Extraer la parte relevante de la ruta (excluyendo el archivo HTML)
const currentFolder = currentPath.includes('/')
  ? currentPath.split('/').slice(1, -1).join('/')
  : 'root';

// Seleccionar todos los enlaces de la navegación
const navLinks = document.querySelectorAll('.nav-link');

// Recorrer los enlaces y agregar la clase 'nav-selec' al enlace correspondiente
navLinks.forEach(link => {
  // Comprobar si el data-folder coincide con la carpeta actual
  if (link.dataset.folder === currentFolder) {
    link.classList.add('nav-selec');
  } else {
    // Asegurarse de que los demás enlaces no tengan la clase 'nav-selec'
    link.classList.remove('nav-selec');
  }
});
