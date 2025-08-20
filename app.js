let calculate = document.querySelector(".solve");
let result = document.querySelector (".result");
let reset = document.querySelector(".reset");
let userInput = document.getElementById("DOB");
let age = document.querySelectorAll(".age");
let userTheme=document.querySelector("#themeSelect");
let timer;

// function to set theme
const setTheme = () => {
    document.body.className = userTheme.value;
}

userTheme.addEventListener("change",()=>{
    setTheme()

});

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
const calYear = (birthYear, currYear, birthMonth, currMonth, birthDay, currDay)=>{
    if( birthMonth<currMonth || (birthMonth==currMonth && birthDay<=currDay) ){
        return (Math.abs(birthYear-currYear))
    }else if ( birthMonth > currMonth || (birthMonth==currMonth && birthDay>currDay) ){
        return (Math.abs(birthYear-currYear)-1)
    }
}

// // function for calculating month
const calMonth = (birthMonth, currMonth, birthDay, currDay)=>{
    if( (birthMonth < currMonth) || (birthMonth==currMonth && birthDay<=currDay) ){
       return Math.abs(currMonth-birthMonth)
    }else if((birthMonth>currMonth) || (birthMonth==currMonth && birthDay>currDay)){
        return (12-birthMonth)+currMonth
    }
}

// // function for calculating day
const calDay = (birthYear, birthMonth, birthDay, currYear, currMonth, currDay) => {
    if (currDay >= birthDay) {
        return currDay - birthDay;
    } else {
        // Get days in previous month
        const prevMonth = currMonth === 1 ? 12 : currMonth - 1;
        const prevYear = currMonth === 1 ? currYear - 1 : currYear;
        const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
        return (daysInPrevMonth - birthDay) + currDay;
    }
}

// ====================================
//                calculating age
// ====================================
const ageCount = () => {
    clearInterval(timer);

    //if input is not valid
    if (!userInput.value) {
        alert('Please select your date of birth');
        return;
    }
    
    let year, month, day, hour, mins, secs;  
    // getting curr date date
    const now = new Date();
    const currDay = now.getDate();
    const currMonth = now.getMonth() + 1;  // +1 because getMonth() is 0-based
    const currYear = now.getFullYear();
    // getting Curr time
    hour = now.getHours();
    mins = now.getMinutes();
    secs = now.getSeconds();

    //getting brith date
    const birthDate = new Date(userInput.value);

    // Check if the input date is valid
    if (birthDate > now) {
        alert('Date of birth cannot be in the future');
        return;
    }

    let birthDay = birthDate.getDate();
    let birthMonth = birthDate.getMonth() + 1;  // +1 because getMonth() returns 0-11
    let birthYear = birthDate.getFullYear();
    
    year = calYear(birthYear, currYear, birthMonth, currMonth, birthDay, currDay)
    month = calMonth(birthMonth, currMonth, birthDay, currDay)
    day = calDay( birthYear, birthMonth, birthDay, currYear, currMonth, currDay)

    result.style.display = "flex";
    reset.style.display = "block";
    showAge(year, month, day, hour, mins, secs)

    timer = setInterval(() => {
        const now = new Date();
        const currentSecs = now.getSeconds();
        const currentMins = now.getMinutes();
        const currentHours = now.getHours();
    
        age[5].value = currentSecs;
        age[4].value = currentMins;
        age[3].value = currentHours;
    }, 1000);

}

calculate.addEventListener("click", ageCount);
reset.addEventListener("click", resetButton);