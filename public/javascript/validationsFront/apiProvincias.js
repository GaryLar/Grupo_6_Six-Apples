
window.addEventListener("load", () => {

let $selectProvince=document.querySelector("#province");
let $selectDistrict=document.querySelector("#district")

fetch("https://apis.datos.gob.ar/georef/api/provincias")
.then((response)=>response.json())
.then((data)=>{
    for (let index = 0; index < data.provincias.length; index++) {
      
        $selectProvince.innerHTML += `<option value="${data.provincias[index].nombre}">${data.provincias[index].nombre}</option>`
        
    }
})
.catch((error) => console.log(error))


$selectProvince.addEventListener("change", (event) => {
    let idProvincia = event.target.value;
    $selectDistrict.innerHTML = `<option value="" hidden selected>Localidades</option>`

    fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&campos=id,nombre&max=5000`)
    .then((response) => response.json())
    .then((data) => {
        data.localidades.forEach(localidad => {
            $selectDistrict.innerHTML += `<option value="${localidad.nombre}">${localidad.nombre}</option>`
        });
    })
    .catch((error) => console.log(error))
})


/* Probamos con estas opciones pero no funcionaron */
/*1) 
 
const province = []
province.Sort(comparacion)

function comparacion(a,b){
    return a-b
}
--------------------------------
2)
.then((data)=>{
    let comparar = data.provincias;
    comparar.sort((provinciaA, provinciaB) => {
        if(provinciaA < provinciaB){
            return -1
        } else if(provinciaA > provinciaB){
            return 1
        } else{
            return 0;
        }
    })

    for (let index = 0; index < comparar.length; index++) {
        $selectProvince.innerHTML += <option value="${comparar[index].id}">${comparar[index].nombre}</option>
    }

})

 */


})





