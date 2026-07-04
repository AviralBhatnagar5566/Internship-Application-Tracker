const applicationForm = document.getElementById("applicationForm")
 
 const token = localStorage.getItem("accesstoken")
 if(!token){
        alert("You should Login first")
        setTimeout(() =>{
                        window.location.replace ="Login.html"
                    },500)
    }



const response = async function response(CompanyName,roleposition,date,status,applicationlink,notes) {
    try {
        const response = await fetch("https://internship-application-tracker-dind.onrender.com/api/v1/application/applicationform",{
         method: "POST",
         headers:
         {  "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"},
            body: JSON.stringify({
                CompanyName,
                roleposition,
                date,
                status,
                applicationlink: applicationlink || "", 
                notes: notes || ""
            }) 
        })

     if(!response.ok){
                return false
            }
            const data =await response.json()
            console.log(data);
            
            return true        
    } catch (error) {
        console.log("Error:",error);
        return false
        
    }
}
applicationForm.addEventListener("submit",async function (event) {
     event.preventDefault();
    const CompanyName = document.getElementById("CompanyName").value.trim()
    const roleposition = document.getElementById("roleposition").value.trim()
    const date = document.getElementById("date").value.trim()
    const status = document.getElementById("status").value.trim()
    const applicationlink = document.getElementById("applicationlink").value.trim()
    const notes = document.getElementById("notes").value.trim()
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0,0,0,0)
    let isvalue = true

    document.getElementById("CompanyNameerror").innerText = "";
    document.getElementById("rolepositionerror").innerText = "";
    document.getElementById("dateerror").innerText = "";
    document.getElementById("successMsg").innerText = "";
    document.getElementById("statuserror").innerText = "";
    document.getElementById("applicationlinkerror").innerText = "";
    document.getElementById("noteserror").innerText = "";


    if(!CompanyName||!CompanyName.trim()){
        document.getElementById("CompanyNameerror").innerText = "Write a companyname"
        isvalue = false
}
    if(!roleposition||!roleposition.trim()){
        document.getElementById("rolepositionerror").innerText = "Write a roleandposition"
        isvalue = false
    }
    if(!date){
        document.getElementById("dateerror").innerText = "fill the date"
        isvalue = false
    }

    else if(selectedDate < today){
        document.getElementById("dateerror").innerText = "Date can't not be in past"
        isvalue = false
    }
    if(!status){
        document.getElementById("statuserror").innerText = "Select the status"
        isvalue = false
    }

    if(isvalue){
            const success = await response(CompanyName,roleposition,date,status,applicationlink,notes)
            if(success){
                document.getElementById("successMsg").innerText ="✅ Application submitted successfully!"
                applicationForm.reset()
                window.location.href = "applications.html"
            }
        else{
                document.getElementById("successMsg").innerText ="❌ SomeThing Went Wrong"

        }     
        }  
    
})
