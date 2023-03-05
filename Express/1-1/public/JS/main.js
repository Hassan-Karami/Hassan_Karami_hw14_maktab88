const responseObject= await fetch("localhost:8000");
const response = await responseObject.text();
const response = await responseObject.json();

fetch("localhost:8000").then(responseObject=>{
    return responseObject
}).then(response =>{
    if(status===200){
        response.json();
    }
    else{
        response.text(); //not found;

    }
})