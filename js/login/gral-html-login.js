export function htmlLogin() {
    // Evitar duplicados
    if (document.getElementById('login-modal')) return;

    // Modal wrapper
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'modal fade';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'loginModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    // Modal dialog
    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog';

    // Modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const title = document.createElement('h5');
    title.className = 'modal-title';
    title.id = 'loginModalLabel';
    title.textContent = 'Iniciar Sesión';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-close';
    closeBtn.setAttribute('data-bs-dismiss', 'modal');
    closeBtn.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(title);
    modalHeader.appendChild(closeBtn);

    // Modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    const form = document.createElement('form');
    form.id = 'login-form';

    const emailLabel = document.createElement('label');
    emailLabel.htmlFor = 'email';
    emailLabel.className = 'form-label';
    emailLabel.textContent = 'Correo electrónico';
    form.appendChild(emailLabel);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.className = 'form-control mb-3';
    emailInput.placeholder = 'Ingresa tu correo';
    emailInput.required = true;
    form.appendChild(emailInput);

    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = 'password';
    passwordLabel.className = 'form-label';
    passwordLabel.textContent = 'Contraseña';
    form.appendChild(passwordLabel);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.className = 'form-control mb-3';
    passwordInput.placeholder = 'Ingresa tu contraseña';
    passwordInput.required = true;
    form.appendChild(passwordInput);

    modalBody.appendChild(form);

    // Modal footer
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer flex-column align-items-stretch gap-2';

    const submitButton = document.createElement('button');
    submitButton.id = 'btn-ingresar';
    submitButton.className = 'btn btn-primary w-100 modal-button';
    submitButton.textContent = 'Ingresar';

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'd-flex justify-content-between w-100';

    const forgotPasswordLink = document.createElement('a');
    forgotPasswordLink.href = '#';
    forgotPasswordLink.className = 'text-decoration-none small';
    forgotPasswordLink.textContent = 'Olvidé mi contraseña';

    const registerLink = document.createElement('a');
    registerLink.href = '/usuario/registro/registro.html';
    registerLink.className = 'text-decoration-none small';
    registerLink.textContent = 'Crear una cuenta';

    optionsDiv.appendChild(forgotPasswordLink);
    optionsDiv.appendChild(registerLink);

    modalFooter.appendChild(submitButton);
    modalFooter.appendChild(optionsDiv);

    // Ensamblar el modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);
}
