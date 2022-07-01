function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', () => {
    let $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $password = qs('#password'),
    $passwordErrors = qs('#passwordErrors'),
    $form = qs('#formLogin'),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d).{6,12}$/;

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

    $form.addEventListener('submit', function(e){
        e.preventDefault()

       let elementosFormulario = this.elements;
       let errores = false;
       console.log(elementosFormulario)

       for (let index = 0; index < elementosFormulario.length -1; index++) {
           if(elementosFormulario[index].value == ""
           && elementosFormulario[index].type !== "checkbox"
           || elementosFormulario[index].classList.contains('error-message')){
               elementosFormulario[index].classList.add('error-message');
               submitErrorsLogin.innerHTML = "Hay errores en el formulario"
               errores = true;
           }
       }
       
       if(!errores){
           $form.submit()
       }
   })
})