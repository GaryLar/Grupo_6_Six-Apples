function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', () => {
    let $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $password = qs('#password'),
    $passwordErrors = qs('#passwordErrors')

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
})