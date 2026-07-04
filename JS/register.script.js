const resgistrationForm = document.getElementById("RegistrationLoginForm")

const response = async function response(username,email,password,DOB) {
    try {
        const res = await fetch("https://internship-application-tracker-dind.onrender.com/api/v1/application/registerUser",{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            username,
            email,
            password,
            DOB
        })
    })
    if(!res.ok){
        return false
    }
    const data = await res.json()
    console.log(data)

    } catch (error) {
        console.log("ERROR: ",error);
        return false
        
    } 


}

resgistrationForm.addEventListener("submit",async function (event) {
     event.preventDefault();
    const username = document.getElementById("username").value.trim()
    const email = document.getElementById("email").value.trim()
    const DOB = document.getElementById("DOB").value.trim()
    const password = document.getElementById("password").value.trim()
    const selectedDOB = new Date(DOB)
    const today = new Date()
    today.setHours(0,0,0,0)
    let isvalue = true

    document.getElementById("usernameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("DOBerror").innerText = "";
    document.getElementById("successMsg").innerText = "";
    document.getElementById("PasswordError").innerText = "";


    if(!username||!username.trim()){
        document.getElementById("usernameError").innerText = "Write a username"
        isvalue = false
}
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
    if(!DOB){
        document.getElementById("DOBerror").innerText = "fill Date Of Birth"
        isvalue = false
    }

    else if(selectedDOB > today){
        document.getElementById("DOBerror").innerText = "DOB can't not be in Future"
        isvalue = false
    }

    if(isvalue){
            const success = await response(username,email,password,DOB)
            if(success){
                document.getElementById("successMsg").innerText ="✅ Registration Done successfully!"
                resgistrationForm.reset()
               setTimeout(() =>{
                        window.location.href ="index.html"
                    },1000)
            }
        else{
                document.getElementById("successMsg").innerText ="❌ SomeThing Went Wrong"

        }     
        }  
    
})