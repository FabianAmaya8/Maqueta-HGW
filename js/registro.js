document.addEventListener('DOMContentLoaded', function() {
    // Get all steps and navigation links
    const stepPersonal = document.getElementById('step-personal');
    const stepEnvio = document.getElementById('step-envio');
    const stepFoto = document.getElementById('step-foto');
    
    const linkPersonal = document.getElementById('link-personal');
    const linkEnvio = document.getElementById('link-envio');
    const linkFoto = document.getElementById('link-foto');
    
    const btnToEnvio = document.getElementById('btn-to-envio');
    const btnBackIndex = document.getElementById('btn-back-index');
    const btnBackPersonal = document.getElementById('btn-back-personal');
    const btnToFoto = document.getElementById('btn-to-foto');
    const btnBackEnvio = document.getElementById('btn-back-envio');
    const btnFinalizar = document.getElementById('btn-finalizar');
    
    const currentStepIndicator = document.getElementById('current-step');
    const form = document.getElementById('registration-form');
    
    // Function to show step
    function showStep(step) {
        // Hide all steps
        stepPersonal.classList.remove('active');
        stepEnvio.classList.remove('active');
        stepFoto.classList.remove('active');
        
        // Deactivate all links
        linkPersonal.classList.remove('active');
        linkEnvio.classList.remove('active');
        linkFoto.classList.remove('active');
        
        // Show selected step
        if (step === 'personal') {
            stepPersonal.classList.add('active');
            linkPersonal.classList.add('active');
            currentStepIndicator.textContent = '1';
        } else if (step === 'envio') {
            stepEnvio.classList.add('active');
            linkEnvio.classList.add('active');
            currentStepIndicator.textContent = '2';
        } else if (step === 'foto') {
            stepFoto.classList.add('active');
            linkFoto.classList.add('active');
            currentStepIndicator.textContent = '3';
        }
    }
    
    // Validate form fields for a specific step
    function validateStep(step) {
        let isValid = true;
        
        if (step === 'personal') {
            const requiredFields = ['nombres', 'apellido', 'patrocinador', 'usuario', 'contrasena', 'confirmar-contrasena', 'telefono', 'correo'];
            
            requiredFields.forEach(field => {
                const element = document.getElementById(field);
                
                if (!element.value) {
                    element.classList.add('is-invalid');
                    isValid = false;
                } else {
                    element.classList.remove('is-invalid');
                    
                    // Additional validation for specific fields
                    if (field === 'confirmar-contrasena') {
                        const password = document.getElementById('contrasena').value;
                        if (element.value !== password) {
                            element.classList.add('is-invalid');
                            isValid = false;
                        }
                    } else if (field === 'correo') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(element.value)) {
                            element.classList.add('is-invalid');
                            isValid = false;
                        }
                    } else if (field === 'telefono') {
                        const phoneRegex = /^\d{10,}$/;
                        if (!phoneRegex.test(element.value)) {
                            element.classList.add('is-invalid');
                            isValid = false;
                        }
                    }
                }
            });
        } else if (step === 'envio') {
            const requiredFields = ['direccion', 'codigo-postal', 'pais', 'ciudad'];
            
            requiredFields.forEach(field => {
                const element = document.getElementById(field);
                
                if (!element.value) {
                    element.classList.add('is-invalid');
                    isValid = false;
                } else {
                    element.classList.remove('is-invalid');
                }
            });
        } else if (step === 'foto') {
            const profilePic = document.getElementById('profile-pic');
            
            if (!profilePic.files || profilePic.files.length === 0) {
                profilePic.classList.add('is-invalid');
                isValid = false;
            } else {
                profilePic.classList.remove('is-invalid');
            }
        }
        
        return isValid;
    }
    
    // Navigation event listeners
    btnToEnvio.addEventListener('click', function() {
        if (validateStep('personal')) {
            showStep('envio');
        }
    });
    
    btnBackIndex.addEventListener('click', function() {
        
    });

    btnBackPersonal.addEventListener('click', function() {
        showStep('personal');
    });
    
    btnToFoto.addEventListener('click', function() {
        if (validateStep('envio')) {
            showStep('foto');
        }
    });
    
    btnBackEnvio.addEventListener('click', function() {
        showStep('envio');
    });
    
    // Link navigation
    linkPersonal.addEventListener('click', function(e) {
        e.preventDefault();
        showStep('personal');
    });
    
    linkEnvio.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateStep('personal')) {
            showStep('envio');
        } else {
            showStep('personal');
        }
    });
    
    linkFoto.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateStep('personal') && validateStep('envio')) {
            showStep('foto');
        } else if (validateStep('personal')) {
            showStep('envio');
        } else {
            showStep('personal');
        }
    });
    
    // Profile picture preview
    document.getElementById('profile-pic').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('preview-profile-pic').src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateStep('personal') && validateStep('envio') && validateStep('foto')) {
            Swal.fire({
                icon: "success",
                title: 'Registro exitoso',
                text: 'Bienvenido a la empresa',
                confirmButtonText: 'Ingresar',
            }).then(() => {
                location.href = '/Index.html';
            });

            // Opcional: resetear el formulario después del registro
            form.reset();
            showStep('personal');
            document.getElementById('preview-profile-pic').src = "/api/placeholder/150/150";
        } else {
            if (!validateStep('foto')) {
                showStep('foto');
            } else if (!validateStep('envio')) {
                showStep('envio');
            } else {
                showStep('personal');
            }
        }
    });
});