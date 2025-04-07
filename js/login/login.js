export function initLogin() {
  const modal = document.getElementById('login-modal');
  const buttons = document.querySelectorAll('.login');
  const closeModal = document.querySelector('.modal .close');
  
  buttons.forEach(button => {
  button.addEventListener('click', () => {
      modal.classList.add('show'); // Añade la clase 'show' para mostrar el modal
  });
  });
  
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show'); // Elimina la clase 'show' para ocultarlo
  });
  
  window.addEventListener('click', (event) => {
  if (event.target === modal) {
      modal.classList.remove('show'); // Elimina la clase 'show' si se hace clic fuera del modal
  }
  });
}