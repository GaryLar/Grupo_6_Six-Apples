function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function(){
    let $name = qs('#name'),
    $nameError = qs('#nameError'),
    $dni = qs('#dni'),
    $dniError = qs('#dniError'),
    $phone = qs('#phone'),
    $phoneError = qs('#phoneError'),
    $postCode = qs('#postCode'),
    $postCodeError = qs('#postCodeError'),
    $province = qs('#province'),
    $provinceError = qs('#provinceError'),
    $district = qs('#district'),
    $districtError = qs('#districtError'),
    $direction = qs('#direction'),
    $directionError = qs('#directionError'),
    $number = qs('#number'),
    $numberError = qs('#numberError'),
    $image = qs('#image'),
    $imageError = qs('#imageError'),
    $formProfile = qs('#formProfile'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExDNI = /^[0-9]{7,8}$/,
    regExPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
    regExNumber = /^0-9$/,
    regExCode =  /^\d{4,5}$/;

    $name.addEventListener('blur', () => {
        switch(true){
            case !$name.value.trim():
                $nameError.innerHTML = "Requerido";
                $name.classList.add('error-message');
                break;
            case !regExAlpha.test($name.value):
                $nameError.innerHTML = "Nombre no válido";
                $name.classList.add('error-message');
                break;
            default:
                $name.classList.remove('error-message');
                $nameError.innerHTML = "";
                break;
        }
    })

    $dni.addEventListener('blur', () => {
        switch(true){
            case !$dni.value.trim():
                $dniError.innerHTML = "Ingresa dni";
                $dni.classList.add('error-message');
                break;
            case !regExDNI.test($dni.value):
                $dniError.innerHTML = "Dni inválido";
                $dni.classList.add('error-message');
                break;
            default:
                $dni.classList.remove('error-message');
                $dniError.innerHTML = "";
                break;
        }
    })

    $phone.addEventListener('blur', () => {
        switch(true){
            case !$phone.value.trim():
                $phoneError.innerHTML = "Ingresa teléfono";
                $phone.classList.add('error-message');
                break;
            case !regExPhone.test($phone.value):    /* ver si funciona el exreg */
                $phoneError.innerHTML = "Teléfono inválido";
                $phone.classList.add('error-message');
                break;
            default:
                $phone.classList.remove('error-message');
                $phoneError.innerHTML = "";
                break;
        }
    })

    $postCode.addEventListener('blur', () => {
        switch(true){
            case !$postCode.value.trim():
                $postCodeError.innerHTML = "Ingresa código postal";
                $postCode.classList.add('error-message');
                break;
            case !regExCode.test($postCode.value) :
                $postCodeError.innerHTML = "Código postal no válido";
                $postCode.classList.add('error-message');
                break;
            default:
                $postCode.classList.remove('error-message');
                $postCodeError.innerHTML = "";
                break;
        }
    })

    $province.addEventListener('blur', () => {
        if(!$province.value.trim()){
            $provinceError.innerHTML = "Ingresa provincia";
            $province.classList.add('error-message');
        } else {
            $province.classList.remove('error-message');
            $provinceError.innerHTML = "";
        }
    })

    $district.addEventListener('blur', () => {
        if(!$district.value.trim()){
            $districtError.innerHTML = "Ingresa localidad";
            $district.classList.add('error-message');
        } else {
            $district.classList.remove('error-message');
            $districtError.innerHTML = "";
        }
    })

    $direction.addEventListener('blur', () => {
        if(!$direction.value.trim()){
            $directionError.innerHTML = "Ingresa dirección";
            $direction.classList.add('error-message');
        } else {
            $direction.classList.remove('error-message');
            $directionError.innerHTML = "";
        }
    })

    $number.addEventListener('blur', () => {
        if(!$number.value.trim() || regExNumber.test($number.value)){
            $numberError.innerHTML = "Ingresa número de calle";
            $number.classList.add('error-message');
        } else {
            $number.classList.remove('error-message');
            $numberError.innerHTML = "";
        }
    })

    /* validar archivos permitidos de imagenes */
    /* $image.addEventListener('change', 
    function fileValidation(){
        let filePath = $image.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //exReg, valida extensiones permitidas
            let extension = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
        if(!allowefExtensions.exec(filePath)){ 
            $imageError.innerHTML = `Extension válida '.jpg .jpeg .png .gif' Archivo: ${extension} no es valido`;
            $image.value = '';
            return false;
        }else{
            $image.classList.remove('error-message')
            $imageError.innerHTML = ""
        }
    }) */

    $formProfile.addEventListener('submit', function(e){
        e.preventDefault()

       let elementosFormulario = this.elements;
       let errores = false;
       console.log(elementosFormulario)

       for (let index = 0; index < elementosFormulario.length -1; index++) { /* obviamos el boton */
           if(elementosFormulario[index].value == ""
           && elementosFormulario[index].type !== "file"
           || elementosFormulario[index].classList.contains('error-message')){
               elementosFormulario[index].classList.add('error-message');
               submitError.innerHTML = "Hay errores en el formulario"
               errores = true;
           }
       }
       
       if(!errores){
           $formProfile.submit()
       }
   })

})