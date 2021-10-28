const settingBtn = document.querySelector('.setting-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const applyBtn = document.querySelector('.apply-btn');
const overlay = document.querySelector('.overlay');

const kumbh = document.querySelector('.kumbh');
const roboto = document.querySelector('.roboto');
const space = document.querySelector('.space');

const min = document.getElementById('min');
const sec = document.getElementById('sec');

const arrows = document.querySelectorAll('.arrows-img img');

const start = document.querySelector('.status');

const shortBreak = document.querySelector('.break-short');
const longBreak = document.querySelector('.break-long');

const ring = document.querySelector('.progress-ring > circle');

settingBtn.addEventListener('click', function(){
    modal.style.display = "block";
    overlay.style.display = "block";   
});
function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
};
closeBtn.addEventListener('click', function(){
   closeModal();
})
overlay.addEventListener('click', function(e){
    if(e.target === overlay) {
      closeModal();
    }
});
document.addEventListener('keydown', function (e) {

    if  (e.key === 'Escape') {
        closeModal();
    }
})

const inputs = document.querySelectorAll('.input-line input');

arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
        const select = e.target.closest('.arrows')
        let inputValue = parseInt(select.previousElementSibling.value)
        if (e.target.classList.contains('arrow-up')) {
            inputValue += 1
            select.previousElementSibling.value = inputValue
        } else {
            inputValue -= 1
            select.previousElementSibling.value = inputValue
        }
    })
})



const shortInput = document.querySelector('.input-2');
const longInput = document.querySelector('.input-3');

shortBreak.addEventListener('click', function(){
   
    if(shortInput.value < 10){
     min.textContent = `0${shortInput.value}`;
    }else{
        min.textContent = shortInput.value;
    }
})
longBreak.addEventListener('click', function(){
    if(longInput.value < 10){
        min.textContent = `${longInput.value}`;
       }else{
           min.textContent = longInput.value;
       }
})

let timeSecSave = "00"
let timeMinSaveArr = [25, 05, 15]




function timer(){
   if(sec.textContent != 0){
        if (sec.textContent > 10) {
                sec.textContent--;
            } else {
                sec.textContent = `0${(sec.textContent - 1)}`;
               
            }
        } else if(min.textContent != 0 && sec.textContent == 0){
            if (min.textContent > 10) {
                min.textContent--;
                sec.textContent = 59;
            } else {
                min.textContent = `0${(min.textContent - 1)}`
                sec.textContent = 59;
            }
        }
        else {
            start.textContent = "RESTART"
        }
    }

    let percents
    let radius = ring.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;
    ring.style.strokeDasharray = circumference;
 
    function circle(percents) {
        percents = min.value * 60 + sec.value / min.value * 60 / 100
        ring.style.strokeDashoffset =  (percents / 100) * circumference;
    }
    let runTime
    let runCircle
    start.addEventListener('click', function(e){
        const select = e.target.closest('.status');
        if(select.textContent === "START"){
            select.textContent = "PAUSE";
            runTime = setInterval(timer, 1000)
        runCircle = setInterval(circle, 1000)
        }else if(select.textContent === "PAUSE"){
            select.textContent = "START";
            clearInterval(runTime);
            clearInterval(runCircle);
        }else{
        select.innerHTML = "START"
        min.innerText = min.value
        sec.innerText = sec
        clearInterval(runTime)
        clearInterval(runCircle)
        }
        });

        function clearSwitch() {
            timeSec.innerText = "00"
            setProgress(0)
            clearInterval(runTime)
            clearInterval(runCircle)
            startPause.innerHTML = "START"
        }