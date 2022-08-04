const BASE_URL = window.location.origin
    let $addToCart = document.querySelector('#addToCart');
    let $removeOne = document.querySelector('#removeOne');
    let $removeAll = document.querySelector('#removeAll');

    
    function addToCartProductDetail(productId,user){
        let contadorr=document.querySelector("#count").textContent
        fetch(`${BASE_URL}/api/productos/carrito/${productId}/${contadorr}/${user}`, {method: "POST"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            if(result.status === 200 || result.status === 201){
                alert('Producto agregado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function addToCart2(productId,user){
        let contadorr=document.querySelector("#count").textContent
        fetch(`${BASE_URL}/api/productos/carrito/${productId}/${contadorr}/${user}`, {method: "POST"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            if(result.status === 200 || result.status === 201){
                alert('Producto agregado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
        
    }



    function addToCart (productId, quantity = 1, user){
        fetch(`${BASE_URL}/api/productos/carrito/${productId}/${quantity}/${user}`, {method: "POST"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            if(result.status === 200 || result.status === 201){
                alert('Producto agregado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
        
    }

    function removeOne (productId, user){
        fetch(`${BASE_URL}/api/productos/carrito/removeOne/${productId}/${user}`, {method: "DELETE"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            console.log(result)
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function removeAll (productId, user){
        fetch(`${BASE_URL}/api/productos/carrito/removeAll/${productId}/${user}`, {method: "DELETE"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function clearCart (user){
        fetch(`${BASE_URL}/api/productos/carrito/clearCart/${user}`, {method: "DELETE"})
        .then(res => {
            if(res.ok){
                return res.json()
            }else{
                throw {
                    errorMsg: "Ocurrió un error"
                }
            }
        })
        .then(result => {
            
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

