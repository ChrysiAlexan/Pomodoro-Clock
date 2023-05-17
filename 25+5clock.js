var breakIncrementButton = document.getElementById('break-increment');
var breakDecrementButton = document.getElementById('break-decrement');
var sessionIncrementButton = document.getElementById('session-increment');
var sessionDecrementButton = document.getElementById('session-decrement');
var startStopButton = document.getElementById('start_stop');
var resetButton = document.getElementById('reset');

var breakLength = document.getElementById('break-length');
var sessionLength = document.getElementById('session-length');
var timeLeft = document.getElementById('time-left');
var label = document.getElementById('timer-label');

var beep = document.getElementById('beep');
label.style.color = "tomato";
var isCounting = false;
let timer;

startStopButton.addEventListener("click", () => {
	if (isCounting == false){
		isCounting = true;
		timer = setInterval(() => { timeLeft.innerText = decrementTime(timeLeft.innerText) }, 1000);
	}
	else {
		isCounting = false
		clearInterval(timer);
		timer=null;
	}
	

} );

resetButton.addEventListener("click", () => {
	clearInterval(timer);
	timer=null;
	breakLength.innerHTML = "5";
	sessionLength.innerHTML = "25";
 	label.innerHTML = "Session";
 	timeLeft.innerHTML = "25:00";
 	label.style.color = "tomato";	
 	beep.pause();
 	beep.currentTime=0;
 } );

breakIncrementButton.addEventListener("click", () => {

 	let bl = parseInt(breakLength.innerHTML);
 	if(bl<60)
	{
 	bl+=1;
 	breakLength.innerHTML = bl;
 		if(label.innerHTML == "Break")
 		{
 			if(breakLength.innerHTML >= 10)
 				timeLeft.innerHTML=breakLength.innerHTML+":00";
 			else timeLeft.innerHTML = "0" + breakLength.innerHTML+":00";
	 	}
 }
} )

breakDecrementButton.addEventListener("click", () => {
	let bl = parseInt(breakLength.innerHTML);
	if(bl>1)
	{
 		bl-=1;
 		breakLength.innerHTML = bl;
 		if(label.innerHTML == "Break")
 		{
 			if(breakLength.innerHTML >= 10)
 				timeLeft.innerHTML=breakLength.innerHTML+":00";
 			else timeLeft.innerHTML = "0" + breakLength.innerHTML+":00";
	 	}
 	}
} )

 sessionIncrementButton.addEventListener("click", () => {
	let sl = parseInt(sessionLength.innerHTML);
 	if(sl<60)
	{
 	sl+=1;
 	sessionLength.innerHTML = sl;

 	 		if(label.innerHTML == "Session")
 		{
 			if(sessionLength.innerHTML >= 10)
 				timeLeft.innerHTML=sessionLength.innerHTML+":00";
 			else timeLeft.innerHTML = "0" + sessionLength.innerHTML+":00";
	 	}
 		
 	}
 } )

sessionDecrementButton.addEventListener("click", () => {
	let sl = parseInt(sessionLength.innerHTML);
	if(sl>1)
	{
 		sl-=1;
 		sessionLength.innerHTML = sl;
 		if(label.innerHTML == "Session")
 		{
 			if(sessionLength.innerHTML >= 10)
 				timeLeft.innerHTML=sessionLength.innerHTML+":00";
 			else timeLeft.innerHTML = "0" + sessionLength.innerHTML+":00";
	 	}
 	}
} )

function decrementTime(timeString) {

	let timeDisplay = timeString.split(':');
	let secondDisplay = parseInt(timeDisplay[1]);
	let minuteDisplay = parseInt(timeDisplay[0]);
	
	secondDisplay -= 1;

	if(secondDisplay === -1 && minuteDisplay > 0)
	{
		secondDisplay = 59;
		minuteDisplay -=1;
		/*if(minuteDisplay < 0){
			minuteDisplay = secondDisplay = 0;
		}*/
	} 

	if (secondDisplay <= 9) 
	{
		secondDisplay = "0" + secondDisplay;
	}

	if(minuteDisplay<=9)
	{
		minuteDisplay = "0" + minuteDisplay;
	}

	if(minuteDisplay == "00" && secondDisplay == "0-1")
	{
		beep.play();

		if(label.innerHTML == "Session"){
			label.style.color = "blue";
			label.innerHTML = "Break";
			if(breakLength.innerHTML >=10){
				return breakLength.innerHTML + ":00";
			}
			else{
				return "0" + breakLength.innerHTML + ":00";
			}
		}
		else{

			label.innerHTML = "Session";
			label.style.color = "tomato";
			if(sessionLength.innerHTML >=10){
				return sessionLength.innerHTML + ":00";
			}
			else{
				return "0" + sessionLength.innerHTML + ":00";
			}
		}

		
		
	}


	return minuteDisplay + ":" + secondDisplay;
}