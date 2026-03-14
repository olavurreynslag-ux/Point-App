// SKÆRME

function showScreen(id){

document.querySelectorAll(".screen").forEach(s=>{
s.classList.add("hidden")
})

document.getElementById(id).classList.remove("hidden")

}

// AFLEVERINGER

let scores={
orange:0,
yellow:0,
blue:0
}

function addPoint(color,val){

scores[color]+=val

document.getElementById("orangeScore").textContent=scores.orange
document.getElementById("yellowScore").textContent=scores.yellow
document.getElementById("blueScore").textContent=scores.blue

updateLeader()

}

function updateLeader(){

let max=Math.max(scores.orange,scores.yellow,scores.blue)

let leader="Uafgjort"

if(scores.orange==max)leader="Orange"
if(scores.yellow==max)leader="Gul"
if(scores.blue==max)leader="Blå"

document.getElementById("leader").textContent=leader

}


// PÅ TID

let times={
orange:0,
yellow:0,
blue:0
}

let active=null
let timer=null
let paused=false

function activateColor(color){

active=color

}

timer=setInterval(()=>{

if(active && !paused){

times[active]++

document.getElementById(active+"Time").textContent=times[active]

}

},1000)


function pauseResume(){

paused=!paused

document.getElementById("pauseBtn").textContent=paused?"Genoptag":"Pause"

}

function stopGame(){

let max=Math.max(times.orange,times.yellow,times.blue)

let winner=""

if(times.orange==max)winner="Orange"
if(times.yellow==max)winner="Gul"
if(times.blue==max)winner="Blå"

document.getElementById("winner").textContent="Vinder: "+winner

}



// TREKANT

let tScores={
orange:0,
yellow:0,
blue:0
}

let last=[]
function trekantClick(color){

last.push(color)

if(last.length>3)last.shift()

tScores[color]++

if(last.length==3 && last.every(v=>v===color)){

tScores[color]+=2

}

document.getElementById("tOrange").textContent=tScores.orange
document.getElementById("tYellow").textContent=tScores.yellow
document.getElementById("tBlue").textContent=tScores.blue

let max=Math.max(tScores.orange,tScores.yellow,tScores.blue)

let leader="Uafgjort"

if(tScores.orange==max)leader="Orange"
if(tScores.yellow==max)leader="Gul"
if(tScores.blue==max)leader="Blå"

document.getElementById("tLeader").textContent=leader

}


// STAFET

let timer = null
let seconds = 0

let yellowRunning = false
let greenRunning = false

let yellowTime = 0
let greenTime = 0


function startStafet(){

clearInterval(timer)

seconds = 0
yellowTime = 0
greenTime = 0

yellowRunning = true
greenRunning = true

timer = setInterval(()=>{

seconds++

if(yellowRunning){
yellowTime++
document.getElementById("yellowTime").textContent = yellowTime
}

if(greenRunning){
greenTime++
document.getElementById("greenTime").textContent = greenTime
}

if(!yellowRunning && !greenRunning){
clearInterval(timer)
}

},1000)

}


function stopYellow(){

yellowRunning = false

const btn = document.getElementById("yellowBtn")
btn.style.background = "gray"
btn.textContent = "Gul stoppet"

}


function stopGreen(){

greenRunning = false

const btn = document.getElementById("greenBtn")
btn.style.background = "gray"
btn.textContent = "Grøn stoppet"

}


function resetStafet(){

clearInterval(timer)

yellowRunning = false
greenRunning = false

yellowTime = 0
greenTime = 0

document.getElementById("yellowTime").textContent = "00"
document.getElementById("greenTime").textContent = "00"

document.getElementById("yellowBtn").style.background = "gold"
document.getElementById("yellowBtn").innerHTML = 'Gul: <span id="yellowTime">00</span>'

document.getElementById("greenBtn").style.background = "green"
document.getElementById("greenBtn").innerHTML = 'Grøn: <span id="greenTime">00</span>'

}
