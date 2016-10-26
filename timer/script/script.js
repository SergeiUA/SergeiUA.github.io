var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var splitBtn = document.getElementById('split');
var resetBtn = document.getElementById('reset');
var splitNumber = 0;

var ms = 0, ss = 0, mm = 0, hh = 0;
var innerMS = document.getElementById('ms'),
innerSS = document.getElementById('ss'),
innerMM = document.getElementById('mm'),
innerHH = document.getElementById('hh');

function timerFunc() {
	toggleBtn.innerHTML = 'Stop';
	toggleBtn.removeEventListener('click', timerFunc);
	toggleBtn.addEventListener('click', timerStop);
	splitBtn.addEventListener('click', timerSplit);
	resetBtn.addEventListener('click', timerClear);
	var timerid = setInterval(timerGo, 10);
	var trigger = 0;
	function timerGo(){
		if(trigger == 0){
			ms += 10;
			if(ms == 1000){
				ms = 0;
				ss++;
				if(ss == 60){
					ss = 0;
					mm++;
					if(mm == 60){
						mm = 0;
						hh++;
						if(hh == 24){
							ms = 0, ss = 0, mm = 0, hh = 0;
						}
					}
				}
			}

			if(ms < 100){
				dispMS = '0' + ms;
			} else {
				dispMS = ms;
			}
			if(ss < 10){
				dispSS = '0' + ss;
			} else {
				dispSS = ss;
			}
			if(mm < 10){
				dispMM = '0' + mm;
			} else {
				dispMM = mm;
			}
			if(hh < 10){
				dispHH = '0' + hh;
			} else {
				dispHH = hh;
			}
			innerMS.innerHTML = dispMS,
			innerSS.innerHTML = dispSS,
			innerMM.innerHTML = dispMM,
			innerHH.innerHTML = dispHH;
		} else {
			clearInterval(timerid);
		}
	}
	function timerStop(){
		trigger = 1;
		toggleBtn.innerHTML = 'Start';
		toggleBtn.removeEventListener('click', timerStop);
		toggleBtn.addEventListener('click', timerFunc);
		splitBtn.removeEventListener('click', timerSplit);
		splitNumber++;
		var stopData = document.createElement('span');
		stopData.classList.add('splitbox');
		stopData.innerHTML = (splitNumber + ' Stop: ' + dispHH + ':' + dispMM + ':' + dispSS + '.' + dispMS);
		var timerbox = document.querySelector('.timerbox');
		timerbox.appendChild(stopData);
	}
	function timerSplit(){
		splitNumber++;
		var splitData = document.createElement('span');
		splitData.classList.add('splitbox');
		splitData.innerHTML = (splitNumber + ' Split: ' + dispHH + ':' + dispMM + ':' + dispSS + '.' + dispMS);
		var timerbox = document.querySelector('.timerbox');
		timerbox.appendChild(splitData);
	}
	function timerClear(){
		trigger = 1;
		toggleBtn.innerHTML = 'Start';
		toggleBtn.removeEventListener('click', timerStop);
		toggleBtn.addEventListener('click', timerFunc);
		splitBtn.removeEventListener('click', timerSplit);
		innerMS.innerHTML = '000', innerSS.innerHTML = '00', innerMM.innerHTML = '00', innerHH.innerHTML = '00';
		ms = 0, ss = 0, mm = 0, hh = 0;
		for( i = 0; i < splitNumber; i++ ){
			var timerbox = document.querySelector('.timerbox');
			var splitBox = document.querySelector('.splitbox');
			timerbox.removeChild(splitBox);
		}
		splitNumber = 0;
	}
}

toggleBtn.addEventListener('click', timerFunc);