progressCircle = document.querySelector(".progress");
const styleBtns = document.querySelectorAll('.style-div')
let timeMin = document.querySelector('.minutes')
let timeSec = document.querySelector('.seconds')
const startPause = document.querySelector('.status')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')
const applyBtn = document.querySelector('.apply-btn')
const settingsBtn = document.querySelector('.settings-btn')
const arrows = document.querySelectorAll('.arrows svg')
const colorBtns = document.querySelectorAll('.color-btn')
const closeBtn = document.querySelector('.close-btn')
const button = document.querySelector('button')
const input1 = document.querySelector('.input1')
const input2 = document.querySelector('.input2')
const input3 = document.querySelector('.input3')
const body = document.querySelector('body')

let timeSecSave = "00"
let timeMinSaveArr = [25, 05, 15]
let dataId;
function dataIdCalc() {
    styleBtns.forEach((btn) => {
        if (btn.classList.contains('active')) {
            dataId = btn.getAttribute('data-id')
        }
    })
}
settingsBtn.addEventListener('click', () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
})


function closeModal() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
closeBtn.addEventListener('click', closeModal)
overlay.addEventListener('click', function(e) {
    if(e.target === overlay) {
        closeModal();
    }
})
document.addEventListener('keydown', function (e) {

    if  (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeModal();
    }
})

function timer(){
    if(timeSec.innerText != 0){
        if (timeSec.innerText > 10) {
            timeSec.innerText--;
        } else {
            timeSec.innerText = `0${(timeSec.innerText - 1)}`
        }
    } else if(timeMin.innerText != 0 && timeSec.innerText == 0){
        if (timeMin.innerText > 10) {
            timeMin.innerText--;
            timeSec.innerText = 59;
        } else {
            timeMin.innerText = `0${(timeMin.innerText - 1)}`
            timeSec.innerText = 59;
        }
    }
    else {
        startPause.innerHTML = "<h3>restart</h3>"
    }
}


let radius = progressCircle.r.baseVal.value;

let circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = circumference;

let percents
function setProgress(percents) {
    percents = ((parseInt(timeMin.innerText) * 60) + parseInt(timeSec.innerText)) / (parseInt(timeMinSaveArr[dataId]) * 60 / 100)
    progressCircle.style.strokeDashoffset =  (percents / 100) * circumference;
}

let runCircle
let runTime
startPause.addEventListener('click', (e) => {
    dataIdCalc()
    const cliced = e.target.closest('.status')
    if (cliced.innerText === "START") {
        cliced.innerHTML = "<h3>Pause</h3>"
        runTime = setInterval(timer, 1000)
        runCircle = setInterval(setProgress, 1000)
    } else if (cliced.innerText === "PAUSE") {
        cliced.innerHTML = "<h3>start</h3>"
        clearInterval(runTime)
        clearInterval(runCircle)
    } else {
        cliced.innerHTML = "<h3>start</h3>"
        timeMin.innerText = timeMinSaveArr[dataId]
        timeSec.innerText = timeSecSave
        clearInterval(runTime)
        clearInterval(runCircle)
    }
})


function clearSwitch() {
    timeSec.innerText = "00"
    setProgress(0)
    clearInterval(runTime)
    clearInterval(runCircle)
    startPause.innerHTML = "<h3>start</h3>"
}

styleBtns.forEach((topBtn) => {
    topBtn.addEventListener('click', (e) => {
        styleBtns.forEach((btn) => {
            const cliced = e.target.closest('.style-div')
            if(!cliced.classList.contains('active')) {
                dataId = cliced.getAttribute('data-id')
                if (cliced.innerText === "pomodoro") {
                    timeMin.innerText = timeMinSaveArr[dataId]
                    clearSwitch()
                } else if (cliced.innerText === "short break") {
                    timeMin.innerText = timeMinSaveArr[dataId]
                    clearSwitch()
                } else if (cliced.innerText === "long break") {
                    timeMin.innerText = timeMinSaveArr[dataId]
                    clearSwitch()
                }
            }
            btn.classList.remove('active')
            cliced.classList.add('active')
            })
        }) 
    })
let dataIdTop;
function dataIdTopCalc() {
    styleBtns.forEach((topBtn) => {
        if (topBtn.classList.contains('active')) {
            dataIdTop = topBtn.getAttribute('data-id')
        }
    })
}

applyBtn.addEventListener('click', () => {
    timeMinSaveArr = [input1.value, input2.value, input3.value]
    colorBtns.forEach((colorBtn) => {
        if (colorBtn.classList.contains('active') && colorBtn.classList.contains('red')) {
            document.documentElement.style.setProperty('--red','rgb(248,112,112)')
            body.style.fontFamily = 'var(--fontFamilyKumbh)'
        } else if (colorBtn.classList.contains('active') && colorBtn.classList.contains('blue')) {
            document.documentElement.style.setProperty('--red','rgb(122,243,248)')
            body.style.fontFamily = 'var(--fontFamilyRoboto)'
        } else if (colorBtn.classList.contains('active') && colorBtn.classList.contains('purple')) {
            document.documentElement.style.setProperty('--red','rgb(216,129,248)')
            body.style.fontFamily = 'var(--fontFamilySpace)'
        }
    })
    clearSwitch()
    progressCircle.style.strokeDashoffset = progressCircle.style.strokeDasharray
    dataIdTopCalc()
    timeMin.innerText = timeMinSaveArr[dataIdTop]
    closeModal()
})

colorBtns.forEach((colorBtn) => {
    colorBtn.addEventListener('click', (e) => {
        colorBtns.forEach((btn) => {
            btn.classList.remove('active')
        })
        const cliced = e.target.closest('.color-btn')
        cliced.classList.add('active')
    })
})
arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
        const cliced = e.target.closest('.arrows-div')
        let inputValue = parseInt(cliced.previousElementSibling.value)
        if (e.target.classList.contains('arrow-up')) {
            inputValue += 1
            cliced.previousElementSibling.value = inputValue
        } else {
            inputValue -= 1
            cliced.previousElementSibling.value = inputValue
        }
    })
})