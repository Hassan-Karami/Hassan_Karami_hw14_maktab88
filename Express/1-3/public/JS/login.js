const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("login-btn");
const messageBody = document.getElementById("messageBody");
const messageText = document.getElementById("messageText");


loginButton.addEventListener("click",async()=>{
    try {
        if(!usernameInput.value || !passwordInput.value){
            messageText.innerText= "Fields must not be empty";
            messageBody.className= "message-body-error"
            return null
        }
        let inputInfo = {
            username : usernameInput.value,
            password : passwordInput.value
        }
        const resObj = await fetch(
          "http://localhost:4000/auth/login",
          {
            method: "POST",
            body: JSON.stringify(inputInfo),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        );
        const res = await resObj.json();
    console.log(res);

        if(resObj.status!==200){
               messageText.innerHTML = res.message;
               messageBody.className = "message-body-error";
               return null;
        }
        messageText.innerHTML=`Welcome ${res.firstname } ${res.lastname}`
        messageBody.className="message-body-success";
        
    } catch (err) {
        console.log(err);
        
    }
    
})