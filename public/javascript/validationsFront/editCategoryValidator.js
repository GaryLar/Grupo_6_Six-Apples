function qs(element) {
    return document.querySelector(element)
}

window.addEventListener("load", () => {
    let $form = qs (".formEditcat")
    let $editcatName = qs (".editcatName"); 
    let $error = qs ('#errorEditcat'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/; 

    $editcatName.addEventListener("blur", () => {
        switch(true){
            case !$editcatName.value.trim():
                $error.innerHTML = "Ingrese nombre de la Categoria";
                $editcatName.classList.add('error-msg');
                break;
            case !regExAlpha.test($editcatName.value): /* test devuelve bool */
                $error.innerHTML = "El nombre no es válido";
                $editcatName.classList.add('error-msg');
                break;
            case $editcatName.value.length<6:
                $error.innerHTML = "El nombre no es válido";
                break;
            default:
                $editcatName.classList.remove('error-msg');
                $error.innerHTML = "";
                break;
        }
        
    })

    $form.addEventListener('submit', function(e){
        e.preventDefault()

        let elementoFormulario = this.elements; 
        let errores = false; 
        console.log(elementoFormulario)

        for(let index = 0; index < elementoFormulario.length -1; index++) {
            if(elementoFormulario[index].value == ""){
                submitErrorcategoryedit.innerHTML = "Hay errores en el formulario"
                errores= true;
            } 
        }
         if(!errores){
            $form.submit()
        }  
    })  
    
})