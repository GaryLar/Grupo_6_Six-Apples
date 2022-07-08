
window.addEventListener("load", () => {

let $selectProvince=document.querySelector("#province");
let $selectDistrict=document.querySelector("#district")

fetch("https://apis.datos.gob.ar/georef/api/provincias")
.then((response)=>response.json())
.then((data)=>{
    for (let index = 0; index < data.provincias.length; index++) {

        $selectProvince.innerHTML += `<option value="${data.provincias[index].id}">${data.provincias[index].nombre}</option>`
        
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
            $selectDistrict.innerHTML += `<option value="${localidad.id}">${localidad.nombre}</option>`
        });
    })
    .catch((error) => console.log(error))
})


/*-------------*/
const province = []
province.Sort(comparacion)

function comparacion(a,b){
    return a-b
}




})





