function qs(element) {
    return document.querySelector(element)
}

window.addEventListener("load", () => {
    let $inputName = qs('#name'),
    $nameErrors = qs('#nameErrors'),
    $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $password = qs('#password'),
    $passwordErrors = qs('#passwordErrors'),
    $password2 = qs('#password2'),
    $password2Errors = qs('#password2Errors'),
    $file = qs('#formFile'),
    $fileErrors = qs('#fileErrors'),
    $form = qs('#formRegister'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d).{7,100}$/;
    
    $inputName.addEventListener("blur", () => {
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = "Nombre requerido";
                $inputName.classList.add('error-message');
                break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = "Nombre inválido";
                $inputName.classList.add('error-message');
                break;
            default: 
                $inputName.classList.remove('error-message');
                $nameErrors.innerHTML = "";
                break;
        }
    })

    $email.addEventListener('blur', () => {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = "Email requerido";
                $email.classList.add('error-message');
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = "Email inválido";
                $email.classList.add('error-message');
                break;
            default: 
                $email.classList.remove('error-message');
                $emailErrors.innerHTML = "";
                break;
        }
    })

    $password.addEventListener('blur', function(){
        switch (true) {
            case !$password.value.trim():
                $passwordErrors.innerHTML = 'Ingrese una contraseña'
                $password.classList.add('error-message')
                break;
            case !regExPass.test($password.value):
                $passwordErrors.innerHTML = 'La contraseña debe tener un mínimo de 7 caracteres';
                $password.classList.add('error-message')
                break;    
            default:
                $password.classList.remove('error-message');
                $passwordErrors.innerHTML = ""
                break;
        }
    })

    $password2.addEventListener('blur', function(){
        switch (true) {
            case !$password2.value.trim():
                $password2Errors.innerHTML = 'Reingresa tu contraseña'
                $password2.classList.add('error-message')
                break;
            case $password2.value !== $password.value:
                $password2Errors.innerHTML = 'Las contraseñas no coinciden';
                $password2.classList.add('error-message')
                break;    
            default:
                $password2.classList.remove('error-message');
                $password2Errors.innerHTML = ""
                break;
        }
    })

    $file.addEventListener('change', 
    function fileValidation(){
        let filePath = $file.value,
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i
        if(!allowefExtensions.exec(filePath)){
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            $fileErrors.innerHTML = '';
            $file.classList.remove('error-message')
        }
    })

    $form.addEventListener('submit', function(e){
        e.preventDefault()

       let elementosFormulario = this.elements;
       let errores = false;
       console.log(elementosFormulario)

        for (let index = 0; index < elementosFormulario.length -1; index++) {
            if(elementosFormulario[index].value == ""
            && elementosFormulario[index].name !== "image"
            && elementosFormulario[index].type !== "file"
            || elementosFormulario[index].classList.contains('error-message')){
                elementosFormulario[index].classList.add('error-message');
                submitErrorsRegister.innerHTML = "Hay errores en el formulario"
                errores = true;
            }
        }
       
        if(!errores){
            $form.submit()
        }
   })
})