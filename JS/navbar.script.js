const logOutbutton = document.getElementById("Logout")
const applicationlink = document.getElementById("applicationlink")
const applicationslink = document.getElementById("applicationslink")
const Loginlink = document.getElementById("Loginlink")
const registerlink = document.getElementById("registerlink")


console.log(logOutbutton);
const token = localStorage.getItem("accesstoken")
 if(token){
        Loginlink.style.display = "none";
        registerlink.style.display = "none";
    }
    else{
        logOutbutton.style.display = "none";
    }


logOutbutton.addEventListener("click",async function (e){
    e.preventDefault()
    try{const response = await fetch("https://internship-application-tracker-dind.onrender.com/api/v1/application/logout",{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
   
    
    const data = await response.json()
    console.log(data)
    }
    catch(error){
        console.log("Error: ",error);
        
    }
    localStorage.removeItem("accesstoken");
    window.location.replace("index.html");

})