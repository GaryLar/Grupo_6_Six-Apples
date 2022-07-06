
function qs (element){
    return document.querySelector(element)
}

window.addEventListener('load', function() {
    let $categoryName = qs ('.categoryName'),
    $error = qs ('#categoryError'),
    $form = qs('#form-Category'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/; 

    $categoryName.addEventListener('blur', () => {
        switch(true){
            case !$categoryName.value.trim():
                $error.innerHTML = "Ingrese nombre de la Categoria";
                $categoryName.classList.add('error-msg');
                break;
            case !regExAlpha.test($categoryName.value): /* test devuelve bool */
                $error.innerHTML = "El nombre no es válido";
                $categoryName.classList.add('error-msg');
                break;
            case $categoryName.value.length<6:
                $error.innerHTML = "El nombre no es válido";
                break;
            default:
                $categoryName.classList.remove('error-msg');
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
                submitErrorcategory.innerHTML = "Hay errores en el formulario"
                errores= true;
            } 
        }
         if(!errores){
            $form.submit()
        }    
   })

}) 