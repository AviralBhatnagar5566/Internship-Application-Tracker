const Loginform = document.getElementById("RegistrationLoginForm")

Loginform.addEventListener("submit",async function (event) {
     event.preventDefault()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    if(!email||!email.trim()){
        document.getElementById("emailError").innerText = "Write a email"
        isvalue = false
    }
    if(!email.includes("@")){
            document.getElementById("emailError").innerText = "Write a valid email"
        }
     if(!password||!password.trim()){
        document.getElementById("PasswordError").innerText = "Write password"
        isvalue = false
    }

   const response = await fetch("https://internship-application-tracker-dind.onrender.com/api/v1/application/loginUser",{
      method:"POST",
      headers:{"Content-Type": "application/json"},

      body: JSON.stringify({
        email,
        password
      })
   })
   if(!response.ok){
    console.log("Error: kk");
    
    
    return false
   }
   const data = await response.json()
   console.log(data);
   const accesstoken = data.data.accesstoken
   localStorage.setItem("accessToken", accesstoken)
    document.getElementById("successMsg").innerText =
      "Login successfully done";
   
})