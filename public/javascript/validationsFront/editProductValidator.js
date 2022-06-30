function qs(element) {
    return document.querySelector(element)
}

window.addEventListener("load",()=>{
    let $form=qs(".formEdit")
    let $nameEdit=qs(".nameEdit");
    let $errorEdit =qs("#errorEdit")
    $typeE=qs(".typeEdit"),
    $typeErrorE=qs("#typeErrorEdit"),
    $categoryNameE = qs(".categoryEdit"),
    $categoryNameErrorE=qs("#categoryErrorE"),
    $priceE=qs(".priceEdit"),
    $priceError=qs("#priceErrorE"),
    $origin=qs(".originEdit"),
    $originError=qs("#originErrorE"),
    $imageE=qs(".imageE"),
    $imageErrorE=qs("#imageErrorE")
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExDNI = /^[0-9]{7,8}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    
    
    
    $nameEdit.addEventListener("blur",()=>{
        let caracteresMin=$nameEdit.value.length;
        
        if(!$nameEdit.value.trim()){
            $errorEdit.innerHTML="Nombre del producto requerido"
        }else if(!regExAlpha.test($nameEdit.value)   ){
            $errorEdit.innerHTML="El nombre no es válido"
        }else if(caracteresMin<5){
        $errorEdit.innerHTML="El nombre no es válido"
        }
        else{
            $errorEdit.innerHTML=""
        }
    }) 
    
    $typeE.addEventListener("blur",()=>{
        if(!$typeE.value.trim()){
            $typeErrorE.innerHTML="Nombre del producto requerido"
        }else if(!regExAlpha.test($typeE.value)){
            $typeErrorE.innerHTML="El nombre no es válido"
        }else{
            $typeErrorE.innerHTML=""
        }
    }) 
    
    $categoryNameE.addEventListener("blur",()=>{
        if(!$categoryNameE.value.trim()){
            $categoryNameErrorE.innerHTML="Elija una categoría"
        }else{
            $categoryNameErrorE.innerHTML=""
        }
    }) 
    
    $priceE.addEventListener("blur",()=>{
       if(!$priceE.value.trim()){
        $priceError.innerHTML="Ingresa precio del producto"
        }else if($priceE.value<50){
        $priceError.innerHTML="Ingresa números válidos"
        }else if($priceE.value<100){
        let alerta=confirm(`¿Estás seguro de querer "$${$priceE.value}" como precio del producto?`)
        if(!alerta){
            $priceE.value=""
            $priceError.innerHTML=""
        }
        $priceError.innerHTML=""
        }else{
        $priceError.innerHTML=""
       }
        }) 
    

    $origin.addEventListener("blur",()=>{
        
        if(!$origin.value.trim()){
            $originError.innerHTML="Origen de producto requerido"
        }else if(!regExAlpha.test($origin.value)){
            $originError.innerHTML="El nombre de origen del producto no es válido"
        }else{
            $originError.innerHTML=""
        }
    })
    $imageE.addEventListener("change",function fileValidation(){
            let filePath = $imageE.value, 
                allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //exReg, valida extensiones permitidas
                let extension = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
            if(!allowefExtensions.exec(filePath)){ 
                $imageErrorE.innerHTML = `Extension válida '.jpg .jpeg .png .gif' Archivo: ${extension} no es valido`;
                $imageE.value = '';
                return false;
            }else{              
                imageErrorE.innerHTML = ""
            }
     })
    
    $form.addEventListener("submit",function(event){
        event.preventDefault()
        let elementsForm= this.elements;
        let errores=false;

        for (let i = 0; i < elementsForm.length -1 ; i++) {
            if(elementsForm[i].value==""
            &&elementsForm[i].name !=="view"
            &&elementsForm[i].type !=="file"){
                submitErrorE.innerHTML="Hay errores en el formulario"
                errores=true;
            }
        }
        if(!errores){
            $form.submit()
        }
       
    })
    
    

    
   
})