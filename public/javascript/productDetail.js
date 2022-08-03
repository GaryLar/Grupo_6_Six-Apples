
let counter = 1
let $count= document.querySelector("#count");

console.log($count.value)

function add(){
    if(counter<=10){
        counter=counter+1
        $count.innerHTML=`<p>${counter}</p>`
    }
}


function subtract(){
    if(counter>0){
        counter=counter-1
        $count.innerHTML=`<p>${counter}</p>`
    }
}
window.addEventListener("load",function(){
    let $count2= document.querySelector("#count2");
    console.log($count2)
})