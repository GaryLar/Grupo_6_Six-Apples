function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function(){
    let $name = qs('#name'),
    $error = qs('#nameError'),
    $type = qs('#type'),
    $typeError = qs('#typeError'),
    $categoryName = qs('#categoryName'),
    $categoryNameError = qs('#categoryNameError'),
    $price = qs('#price'),
    $priceError = qs('#priceError'),
    $origin = qs('#origin'),
    $originError = qs('#originError'),
    $image = qs('#image'),
    $imageError = qs('#imageError'),
    $form = qs('#formProduct'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;
   

    $name.addEventListener('blur', () => {
        switch(true){
            case !$name.value.trim():
                $error.innerHTML = "Nombre del producto requerido";
                $name.classList.add('error-msg');
                break;
            case !regExAlpha.test($name.value): /* test devuelve bool */
                $error.innerHTML = "El nombre no es válido";
                $name.classList.add('error-msg');
                break;
            case $name.value.length<5:
                $error.innerHTML = "El nombre no es válido";
                break;
            default:
                $name.classList.remove('error-msg');
                $error.innerHTML = "";
                break;
        }
    })

    $type.addEventListener('blur', () => {
        if(!$type.value.trim() || !regExAlpha.test($type.value)){
            $typeError.innerHTML = "Tipo de producto requerido o no válido";
            $type.classList.add('error-msg'); 
        }else{
            $type.classList.remove('error-msg');
            $typeError.innerHTML = "";
        }
    })

    $categoryName.addEventListener('blur', () => {
        if(!$categoryName.value.trim()){
            $categoryNameError.innerHTML = "Elija una categoría";
            $categoryName.classList.add('error-msg');
        } else{
            $categoryName.classList.remove('error-msg');
            $categoryNameError.innerHTML = "";
        }
    })
    $price.addEventListener('blur', () => {
        switch(true){
            case !$price.value.trim():
                $priceError.innerHTML = "Ingresa precio del producto";
                $price.classList.add('error-msg');
                break;
            case $price.value <= 100:
                $priceError.innerHTML = "Ingresa números válidos";
                $price.classList.add('error-msg');
                break;
            default:
                $price.classList.remove('error-msg');
                $priceError.innerHTML = ""
        }
    })
    
    $origin.addEventListener('blur', () => {
        if(!$origin.value.trim() || !regExAlpha.test($origin.value)){
            $originError.innerHTML = "Origen de producto requerido o no válido";
            $origin.classList.add('error-msg'); 
        }else{
            $origin.classList.remove('error-msg');
            $originError.innerHTML = "";
        }
    })
    /* imagen compatiblE */
    $image.addEventListener('change', 
    function fileValidation(){
        let filePath = $image.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //exReg, valida extensiones permitidas
            let extension = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
        if(!allowefExtensions.exec(filePath)){ 
            $imageError.innerHTML = `Extension válida '.jpg .jpeg .png .gif' Archivo: ${extension} no es valido`;
            $image.value = '';
            return false;
        }else{
            $image.classList.remove('error-msg')
            $imageError.innerHTML = ""
        }
    })
    /* formulario no vacio */
    $form.addEventListener('submit', function(e){
         e.preventDefault()

        let elementosFormulario = this.elements;
        let errores = false;
        console.log(elementosFormulario)

        for (let index = 0; index < elementosFormulario.length -1; index++) { /* obviamos el boton */
            if(elementosFormulario[index].value == ""
            && elementosFormulario[index].name !== "view"
            && elementosFormulario[index].type !== "file"
            || elementosFormulario[index].classList.contains('error-msg')){
                elementosFormulario[index].classList.add('error-msg');
                submitErrors.innerHTML = "Hay errores en el formulario"
                errores = true;
            }
        }
        
        if(!errores){
            $form.submit()
        }
    })

})