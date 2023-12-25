
let isNumber = false, isFunc = false;
let numberBtn = document.querySelectorAll('.numbersBtn .btn');
let mainScreen = document.querySelector('.mainScreen');
let funcbtn = document.querySelectorAll('.function');
let equals = document.querySelector('.equals');
let clear = document.querySelector('.clear');
let percent = document.querySelector('.percent');
let delBtn = document.querySelector('.delBtn');
let dummy = document.querySelector('.dummy');

function Change(e){
    if(!isNumber){
        let newDiv = document.createElement('div');
        newDiv.id = "lower";
        newDiv.innerHTML = e.target.innerText;
        newDiv.style = "position: absolute; right: 35px; bottom: 10px; font-size: 2rem; color: white"
        mainScreen.appendChild(newDiv);
    }
    else{
        document.querySelector('#lower').innerHTML += e.target.innerText;
    }
    isNumber = true;
}

Array.from(numberBtn).forEach(element => {
    element.addEventListener('click', (e)=>{
        dummy.style = "display: none;";
        if(!isFunc){
            if(!isNumber){
                let newDiv = document.createElement('div');
                newDiv.id = "upper";
                newDiv.innerHTML = e.target.innerText;
                newDiv.style = "position: absolute; right: 35px; bottom: 10px; font-size: 2rem; color: white"
                mainScreen.appendChild(newDiv);
            }
            else{
                document.querySelector('#upper').innerHTML += e.target.innerText;
            }
            isNumber = true;
        }
        else Change(e);
    })
});

Array.from(funcbtn).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(!isFunc){
            let upperDiv = document.getElementById('upper');
            upperDiv.innerHTML += ' ' + e.target.innerText;
            upperDiv.style = "position: absolute; right: 35px; bottom: 55px; font-size:1.5rem;color: #beb3b3";
        }
        else{
            let upperDiv = document.getElementById('upper');
            let lowerDiv = document.getElementById('lower');
            upperDiv.innerHTML = lowerDiv.innerText + ' ' + e.target.innerText;
            mainScreen.removeChild(lowerDiv)
            upperDiv.style = "position: absolute; right: 35px; bottom: 55px; font-size:1.5rem;color: #beb3b3";
        }
        isFunc = true;
        isNumber = false;
    })
})

equals.addEventListener('click', ()=>{
    let upperDiv = document.getElementById('upper');
    let lowerDiv = document.getElementById('lower');
    let upperText = upperDiv.innerText + ' ' +lowerDiv.innerText;
    upperDiv.innerHTML = upperText + ' = '; 
    lowerDiv.innerHTML = eval(upperText).toFixed(2);
})

clear.addEventListener('click', ()=>{
    mainScreen.removeChild(document.querySelector('#upper'));
    mainScreen.removeChild(document.querySelector('#lower'));
    isNumber = false;
    isFunc = false;
    dummy.style = "display: block;";
})

percent.addEventListener('click', ()=>{
    let upperDiv = document.getElementById('upper');
    let lowerDiv = document.getElementById('lower');
    let upperText = upperDiv.innerText + ' ' +lowerDiv.innerText;
    upperDiv.innerHTML = '(' + upperText + ' ) ' + ' ' + '%'; 
    lowerDiv.innerHTML = eval(upperText + '*100');
})

delBtn.addEventListener('click', ()=>{
    let upperDiv = document.getElementById('upper');
    let lowerDiv = document.getElementById('lower');
    if(mainScreen.contains(lowerDiv))
        lowerDiv.innerHTML = lowerDiv.innerText.slice(0, -1);
    else upperDiv.innerHTML = upperDiv.innerText.slice(0, -1);
})