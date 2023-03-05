const firstNameInput = document.getElementById("fnameInput");
const lastNameInput = document.getElementById("lnameInput");
const userNameInput = document.getElementById("userNameInput");
const passwordInput = document.getElementById("passwordInput");
const genderInput = document.getElementById("genderInput");
const submitButton = document.getElementById("submit-btn");
const messageBody = document.getElementById("messageBody");
const messageText = document.getElementById("messageText");
    const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    

submitButton.addEventListener("click",async()=>{
  
  try {

    if (
      !firstNameInput.value ||
      !lastNameInput.value ||
      !userNameInput.value ||
      !passwordInput.value ||
      !genderInput.value
    ) {
      messageText.innerText = "fields most not be empty";
      messageBody.className="message-body-error";

      return null;
    }
    if (!passwordInput.value.match(paswd)) {
      messageText.innerText =
        "password must be between 7 to 15 characters which contain at least one numeric digit and a special character";
      messageBody.className = "message-body-error";

      return null;
    }
    let newUser = {
      firstname: firstNameInput.value,
      lastname: lastNameInput.value,
      username: userNameInput.value,
      password: passwordInput.value,
      gender: genderInput.value,
    };

    const resObj = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const res = await resObj.json();
    if(resObj.status===500){
        messageText.innerText = res.message;
        messageBody.className = "message-body-error";

    }
    else{
      messageText.innerText = res.message;
      messageBody.className = "message-body-success";
      setTimeout(() => {
        window.location.reload();
      
      }, 1000);
    }
  

    
    

  } catch (err) {
    console.log(err);
    
  }

})