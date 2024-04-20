const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const btn = document.querySelector("button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");
const msg = document.querySelector(".msg");
const Ex = document.querySelector("i");

let press = () =>{
    let btn = new Audio("click.mp3");
    btn.play();
}

for(let select of dropdowns){
    for(code in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText=code;
        newOpt.value=code;
        if(select.name === "from" && code === "USD"){
            newOpt.selected = "selected";
        } else if(select.name === "to" && code === "INR"){
            newOpt.selected = "selected";
        }
        select.append(newOpt);
       }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })   
}
const updateFlag = (el) =>{
        let currCode = el.value;
        let countryCode = countryList[currCode]; 
        let img = el.parentElement.querySelector("img");
        img.src = "https://flagsapi.com/"+countryCode+"/flat/64.png"; 
}

window.addEventListener("load",()=>{
    updateExchange();
})

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchange();
    press();
});

const updateExchange = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal <1){
        amtVal = 1;
        amount.value = 1;
    }
    const currency = fromCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${currency}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate ;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

Ex.addEventListener("click",()=>{
    let value1 = fromCurr.value;
    let value2 = toCurr.value;
    let src1 = fromImg.src;
    let src2 = toImg.src;
    fromCurr.value = value2;
    toCurr.value = value1;  
    fromImg.src=src2;
    toImg.src=src1; 
    press();
})
