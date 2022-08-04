
let counter = 1
let $count= document.querySelector("#count");


function add(){
    if(counter<=9){
        counter=counter+1
        $count.innerHTML=`<p>${counter}</p>`
    }
}


function subtract(){
    if(counter>1){
        counter=counter-1
        $count.innerHTML=`<p>${counter}</p>`
    }
}