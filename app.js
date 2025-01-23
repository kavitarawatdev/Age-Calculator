let calculate = document.querySelector(".solve");
let result = document.querySelector (".result");
let reset = document.querySelector(".reset");
let userInput = document.getElementById("DOB");
let age = document.querySelectorAll(".age");
let timer;


// function for reset
const resetButton = () => {
    clearInterval(timer)
    result.style.display = "none";
    userInput.value = "";
    reset.style.display = "none";
}

// function for showing age
const showAge =(Y, M, D, H, Min, S )=>{
    age.forEach((ele,i)=>{
        if (i==0) ele.value=Y;
        if (i==1) ele.value=M;
        if (i==2) ele.value=D;
        if (i==3) ele.value=H;
        if (i==4) ele.value=Min;
        if (i==5) ele.value=S;
    })
}

// // function for calculating year
const calYear = (Yi, Yf, Mi, Mf, Di, Df)=>{
    if( Mi<Mf || (Mi==Mf && Di<=Df) ){
        return (Math.abs(Yi-Yf))
    }else if ( Mi>Mf || (Mi==Mf && Di>Df) ){
        return (Math.abs(Yi-Yf)-1)
    }
}

// // function for calculating month
const calMonth = (Mi, Mf, Di, Df)=>{
    if( (Mi<Mf) || (Mi==Mf && Di<=Df) ){
       return Math.abs(Mf-Mi)
    }else if((Mi>Mf) || (Mi==Mf && Di>Df)){
        return (12-Mi)+Mf
    }
}

// // function for calculating day
const calDay = (Di, Df)=>{
   return Df>=Di? Math.abs(Df-Di):(31-Di)+Df;
}

// ====================================
//                calculating age
// ====================================
const ageCount = () => {
    clearInterval(timer);
    let year, month, day, hour, mins, secs;  
    // getting curr date data
    const currDate = new Date().toLocaleDateString('en-GB').split("/");
    const currDay = Number(currDate[0]);
    const currMonth = Number(currDate[1]);
    const currYear = Number(currDate[2]);

    // getting Curr time
    const currTime = new Date().toLocaleTimeString().replace(/[^0-9:]/g, '').split(":");
    hour= currTime[0]
    mins = currTime[1]
    secs = currTime[2]

    // getting birthdate date
    const birthDate = new Date(userInput.value).toLocaleDateString('en-GB').split("/");
    let birthDay = Number(birthDate[0]);
    let birthMonth = Number(birthDate[1]);
    let birthYear = Number(birthDate[2]);

    year = calYear(birthYear, currYear, birthMonth, currMonth, birthDay, currDay)
    month = calMonth(birthMonth, currMonth, birthDay, currDay)
    day = calDay( birthDay, currDay)

    result.style.display = "flex";
    reset.style.display = "block";
    showAge(year, month, day, hour, mins, secs)

    timer = setInterval(() => {
        age[5].value++;
        if(age[5].value=="60"){
            age[5].value="0";
            age[4].value++; 
            if(age[4].value=="60"){
                age[4].value="0";
                age[3].value++;
            }
        }
    }, 1000);

}

calculate.addEventListener("click", ageCount);
reset.addEventListener("click", resetButton);