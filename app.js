let calculate = document.querySelector(".solve");
let result = document.querySelector (".result");
let reset = document.querySelector(".reset");
let userInput = document.getElementById("DOB");
let years = document.querySelector(".years input");
let months = document.querySelector(".months input");
let days = document.querySelector(".days input");
let hours = document.querySelector(".hours input");
let minutes = document.querySelector(".minutes input");
let seconds = document.querySelector(".seconds input");


const resetButton = () => {
    result.style.display = "none";
    userInput.value = "";
    reset.style.display = "none";
}

const ageCount = () => {
    let now = new Date();                           
    let currentY = now.getFullYear();                
    let currentM = now.getMonth(); 
    let currentD = now.getDay(); 
    let currentH = now.getHours(); 
    let currentMin = now.getMinutes(); 
    let currentS = now.getSeconds();                 
      
    let inputDOB = userInput.value;   
    let dob = new Date(inputDOB);                            
    let dobY = dob.getFullYear();                         
    let dobM = dob.getMonth(); 
    let dobD = dob.getDay();  
    let dobH = dob.getHours();
    let dobMin = dob.getMinutes();
    let dobS = dob.getSeconds();                          
      
    let ageY = currentY - dobY;
    let ageM = Math.abs(currentM - dobM); 
    let ageD = Math.abs(currentD - dobD);  
    let ageH = Math.abs(currentH - dobH);
    let ageMin = Math.abs(currentMin - dobMin);
    let ageS = Math.abs(currentS - dobS);     

    result.style.display = "flex";
    reset.style.display = "block";

    years.value = ageY;
    months.value = ageM;
    days.value = ageD;
    hours.value = ageH;
    minutes.value = ageMin;
    seconds.value = ageS; 

    setInterval(() => {
        seconds.value++;
        if(seconds.value==="60"){
            seconds.value="0";
            minutes.value++;
            if(minutes.value==="60"){
                minutes.value="0"
                hours.value++;
            }
        }
    }, 1000);
}

calculate.addEventListener("click", ageCount);
reset.addEventListener("click", resetButton);