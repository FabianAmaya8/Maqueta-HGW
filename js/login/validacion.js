export function validacionLogin() {
  document.querySelector('.btn-ingresar').addEventListener('click', function(event){
  event.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if (email ==='' || password === ''){
      Swal.fire({
          icon: "warning",
          title: 'Campos Vacios', 
          text: ' Por favor, completa todos los campos antes de continuar',
          confirmButtonText:'Aceptar',
        });
        return; 
  }
  if (email ==='admin@hgw.com' && password ==='12345'){
      Swal.fire({
          icon: "success",
          title: 'Inicio exitoso', 
          text: ' Bienvenido Administrador',
          confirmButtonText:'Ingresar',
        }).then (()=>{
          window.location.href = '/Admin/Index.html';
  });
        return; 
  } else{
      Swal.fire({
          icon: "error",
          title: 'Credenciales no validas', 
          text: ' El correo o la contraseña son incorrectos',
          confirmButtonText:'Reintentar',
        });
        }
  });
}