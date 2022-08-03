const BASE_URL = window.location.origin
    let $addToCart = document.querySelector('#addToCart');

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

