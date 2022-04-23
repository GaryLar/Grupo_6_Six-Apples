let alerta = document.querySelector('#alert') 

alerta.addEventListener("submit", () => {
    let opcion = confirm('Desea continuar con la creacion del producto'); 
     if (opcion == true) { 
        alert('Haz puesto ok'); 
       } else { 
        alert('Has clickado Cancelar'); 
       }
})
    
    /*   let mensaje;
      let opcion = confirm('clik aceptar');
      if (opcion == true) { 
          mensaje = "Has clickado OK"; 
         } else { 
             mensaje = "Has clickado Cancelar"; 
         }
         document.getElementById("confirm").innerHTML = mensaje; */

/* alert.addEventListener("submit", () => {
    let mensaje; 
    let opcion = confirm("Clicka en Aceptar o Cancelar"); 
    if (opcion == true) { 
        mensaje = "Has clickado OK"; 
       } else { 
           mensaje = "Has clickado Cancelar"; 
       }

       document.getElementById("ejemplo").innerHTML = mensaje;
})

 */