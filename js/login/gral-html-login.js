export function htmlLogin() {
    // Crear el modal
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'modal';
    
    // Crear el contenido del modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Botón de cierre
    const closeSpan = document.createElement('span');
    closeSpan.className = 'close';
    closeSpan.innerHTML = '&times;';
    modalContent.appendChild(closeSpan);
    
    // Título del modal
    const title = document.createElement('h2');
    title.textContent = 'Iniciar Sesión';
    modalContent.appendChild(title);
    
    // Crear el formulario
    const form = document.createElement('form');
    form.action = '';
    
    // Label y input para el correo electrónico
    const emailLabel = document.createElement('label');
    emailLabel.htmlFor = 'email';
    emailLabel.textContent = 'Correo electrónico';
    form.appendChild(emailLabel);
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Ingresa tu correo';
    emailInput.required = true;
    form.appendChild(emailInput);
    
    // Label y input para la contraseña
    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = 'password';
    passwordLabel.className = 'password';
    passwordLabel.textContent = 'Contraseña';
    form.appendChild(passwordLabel);
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Ingresa tu contraseña';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    
    // Botón de ingreso
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn-ingresar';
    submitButton.textContent = 'Ingresar';
    form.appendChild(submitButton);
    
    // Opciones adicionales
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    
    const forgotPasswordLink = document.createElement('a');
    forgotPasswordLink.href = '#';
    forgotPasswordLink.className = 'olvido';
    forgotPasswordLink.textContent = 'Olvidé mi contraseña';
    optionsDiv.appendChild(forgotPasswordLink);
    
    const divider = document.createElement('div');
    divider.className = 'divicion-V';
    optionsDiv.appendChild(divider);
    
    const registerLink = document.createElement('a');
    registerLink.href = '/usuario/registro/registro.html';
    registerLink.className = 'Registrar';
    registerLink.textContent = 'Crear una cuenta';
    optionsDiv.appendChild(registerLink);
    
    form.appendChild(optionsDiv);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    
    // Agregar el modal al cuerpo del documento
    document.body.appendChild(modal);
}
