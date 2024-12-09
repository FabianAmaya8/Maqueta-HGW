export function initFooter() {
    // Crear elementos del footer
    const footer = document.createElement('footer');
    const footerDiv = document.createElement('div');
    footerDiv.className = 'footer';
    
    
    // Información de la empresa
    const informacionDiv = document.createElement('div');
    informacionDiv.className = 'informacion';
    
    const logoDivFooter = document.createElement('div');
    logoDivFooter.className = 'logo';
    
    const logoImgFooter = document.createElement('img');
    logoImgFooter.src = '../../../../img/logo.png';
    logoImgFooter.alt = 'logo';
    logoDivFooter.appendChild(logoImgFooter);
    
    const infoText = document.createElement('p');
    infoText.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, culpa nostrum dolor soluta reprehenderit eaque neque nam ea adipisci quo molestiae unde temporibus error accusamus amet iusto pariatur quia inventore.';
    
    informacionDiv.appendChild(logoDivFooter);
    informacionDiv.appendChild(infoText);
    
    // Navegación en el footer
    const footerNav = document.createElement('div');
    footerNav.className = 'footer-nav';
    
    const footerNavTitle = document.createElement('h2');
    footerNavTitle.textContent = 'Navegador';
    
    const footerUl = document.createElement('ul');
    footerUl.className = 'footer-ul';
    
    // Lista de enlaces del footer
    const footerLinks = [
        { href: '../../../../Index.html', text: 'Inicio', file: 'Index.html' },
        { href: '../../../../usuario/educacion/educacion.html', text: 'Educacion', file: 'educacion.html' },
        { href: '../../../../usuario/catalogo/catalogo.html', text: 'Catalogo', file: 'catalogo.html' },
        { href: '../../../../usuario/personal/personal.html', text: 'Personal', file: 'personal.html' },
        { href: '../../../../usuario/carrito/carrito.html', text: 'Tu Carrito', file: 'carrito.html' }
    ];
    
    footerLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        li.appendChild(a);
        footerUl.appendChild(li);
    });
    
    footerNav.appendChild(footerNavTitle);
    footerNav.appendChild(footerUl);
    
    // Información de contacto
    const contactoDiv = document.createElement('div');
    contactoDiv.className = 'contacto';
    
    // Crear cada sección de contacto
    const contactoItems = [
        ['Green World Colombia SAS', 'Nit. 901270584'],
        ['Telefono: 3142921508', 'Direccion Calle 119 #14 42'],
        ['documentoscompensaciones@world-food.co', 'Copyright 2022 Todos los Derechos reservados | HGW | Green World Colombia SAS']
    ];
    
    contactoItems.forEach(item => {
        const contactoItemDiv = document.createElement('div');
        contactoItemDiv.className = 'contacto-item';
    
        item.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        contactoItemDiv.appendChild(p);
        });
    
        contactoDiv.appendChild(contactoItemDiv);
    });
    
    // Añadir todo al footer
    footerDiv.appendChild(informacionDiv);
    footerDiv.appendChild(footerNav);
    footerDiv.appendChild(contactoDiv);
    
    // Agregar el footer al cuerpo del documento
    footer.appendChild(footerDiv);
    document.body.appendChild(footer);
}

