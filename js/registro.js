let formIndex = 0;

// Botones "Next" y "Back"
const nextButtons = document.querySelectorAll(".next_button");
const backButtons = document.querySelectorAll(".back_button");

// Formularios y otros elementos
const forms = document.querySelectorAll(".main");
const progressBarItems = document.querySelectorAll(".progress-bar li");
const stepNumber = document.querySelector(".step-number");
const stepNumberContent = document.querySelectorAll(".step-number-content");

// Mostrar el nombre en la sección final
const usernameInput = document.querySelector("#user_name");
const displayedName = document.querySelector(".shown_name");

// Validación de formularios
function validateForm() {
    const activeInputs = document.querySelectorAll(".main.active input");
    let isValid = true;

    activeInputs.forEach(input => {
        input.classList.remove("warning");
        if (input.hasAttribute("required") && input.value.trim() === "") {
            input.classList.add("warning");
            isValid = false;
        }
    });

    return isValid;
}

// Actualizar formulario activo
function updateForm() {
    forms.forEach((form, index) => {
        form.classList.toggle("active", index === formIndex);
    });
}

// Avanzar en el progreso
function progressForward() {
    progressBarItems.forEach((item, index) => {
        item.classList.toggle("active", index <= formIndex);
    });

    stepNumber.textContent = formIndex + 1;
    updateStepContent();
}

// Retroceder en el progreso
function progressBackward() {
    progressBarItems[formIndex + 1]?.classList.remove("active");
    stepNumber.textContent = formIndex + 1;
    updateStepContent();
}

// Actualizar contenido de pasos
function updateStepContent() {
    stepNumberContent.forEach((content, index) => {
        content.classList.toggle("active", index === formIndex);
        content.classList.toggle("d-none", index !== formIndex);
    });
}

// Listeners para botones "Next"
nextButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!validateForm()) return;

        formIndex++;
        updateForm();
        progressForward();
    });
});

// Listeners para botones "Back"
backButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (formIndex > 0) {
            formIndex--;
            updateForm();
            progressBackward();
        }
    });
});

// Listener para botón "Submit"
const submitButton = document.querySelector(".submit_button");
submitButton.addEventListener("click", () => {
    if (!validateForm()) return;

    displayedName.textContent = usernameInput.value;
    formIndex++;
    updateForm();
    progressForward();
});

// Listener para previsualizar imagen
const fileInput = document.querySelector("#profile_picture");
const previewImage = document.querySelector("#preview_image");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            previewImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});
var submit_click = document.querySelectorAll(".submit_button");

submit_click.forEach(function (submit_click_form) {
    submit_click_form.addEventListener('click', function () {
        Swal.fire({
            title: "¡Buen trabajo!",
            text: "¡Te haz registrado!",
            icon: "success",
            confirmButtonText: '¡Genial!'
        }).then(() => {
            window.location.href = '/usuario/personal/personal.html';
        });
    });
});