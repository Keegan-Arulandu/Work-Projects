// Order Memory Game
var stage = 0;
var gen_nums = [];
var canCount = 1;
var obj = {

	cans: $('.cans'),
	itemAmount: 4,
	correct: 0,
	scoreImg: $('#score'),
	result: $('.result'),
	timeInterval: null,
	timerImg : $('#timer'),
	Timer: 59000,
    IsPaused: false,
    gameInterface: $('#game-interface'),
    gameContainer: $('#game-container'),
    resultImg: $('#resultImg'),
    resultSection: $('#result-section'),
    trySection: $('#try-section'),
    enterBtn: $('.enter-btn'),
    ready: $('#ready'),
    stageCount: [{level:1, itemAmount:4, timer:8000, nums:[1,2,3,4]},
    			 {level:2, itemAmount:4, timer:6000, nums:[1,2,3,4]},
    			 {level:3, itemAmount:4, timer:4000, nums:[1,2,3,4]}, 
    			 {level:4, itemAmount:6, timer:8000, nums:[1,2,3,4,5,6]},
    			 {level:5, itemAmount:6, timer:6000, nums:[1,2,3,4,5,6]},
    			 {level:6, itemAmount:6, timer:4000, nums:[1,2,3,4,5,6]},
    			 ],

	gameStart: function () {
		obj.drawCans();
		obj.setTimer();

		this.cans.on('click', function () {
			var can = $(this).data('cans');
			obj.canSelect(can);
		});

		this.enterBtn.on('click', function () {
			obj.resultSection.delay(400).animate({opacity:0, top:670}, {duration:700});
		});
	},

	drawCans: function () {
		obj.touchDisable();
		var parent = document.getElementById("game-container");
		var image, i;
		obj.randomGenerator(obj.stageCount[stage].nums);

		for (i = 0; i < obj.stageCount[stage].itemAmount; i++) {
			var randomCans = Math.floor((Math.random() * 4) + 1);

			image = document.createElement("img");
			image.src = "img/2-game/1.png";
			image.className = 'cans can-'+ gen_nums[i] +'';
			image.setAttribute('data-cans', gen_nums[i]);
			image.style.zIndex = 29;
			parent.appendChild(image);

			image.addEventListener("click", function(){
				var element = $(this);
			    var can = $(this).data('cans');
			    obj.canSelect(can, element);
			});
		}

		obj.animateItems();
	},

	randomGenerator: function (array) {

		function in_array(array, el) {
		   for(var i = 0 ; i < array.length; i++) 
		       if(array[i] == el) return true;
		   return false;
		}

		function get_rand(array) {
		    var rand = array[Math.floor(Math.random()*array.length)];
		    if(!in_array(gen_nums, rand)) {
		       gen_nums.push(rand); 
		       return rand;
		    }
		    return get_rand(array);
		}

		for(var i = 0; i < array.length; i++) {
		    get_rand(array);
		}
	},

	animateItems: function () {
		var delay = 500;
		for(var i = 1; i <= obj.stageCount[stage].itemAmount; i++) {
			delay += 500; 
			$('.can-' + i).delay(delay).animate({opacity:1}, {duration:700});
		}
	},

	canSelect: function (can, element) {
		if(can == canCount) {
			element.attr('src', 'img/2-game/2.png').animate({opacity:0}, {duration:700});
			canCount++;
			obj.correct++;
			obj.scoreImg.html(obj.correct);
			obj.result.html(obj.correct);
		} else if(can !== canCount) {
			if(stage >= 3) {
				obj.renderResult('lost');
			} else {
				obj.renderResult('try');
			}
			return;
		}

		if(can == obj.stageCount[stage].itemAmount) {
			element.attr('src', 'img/2-game/2.png').animate({opacity:0}, {duration:700});
			stage++;
			setTimeout(function () {
				obj.nextLevels(stage)
			}, 500);
		} else {
			return;
		}
	},

	setTimer: function () {
		var timer = obj.Timer;
		obj.timeInterval = setInterval(function () {
			timer -= 1000;
			Minutes = Math.floor(timer / (60 * 1000));
			Seconds = Math.floor((timer - (Minutes * 60 * 1000)) / 1000);

			if(timer < 10000) {
				obj.timerImg.html(Seconds);
			} else {
				obj.timerImg.html(Seconds);
			}

			if(Seconds <= 0) {
				obj.renderResult('lost');
			}

		}, 1000);
	},

	renderRest: function () {
		gen_nums = [];
		canCount = 1;
		$('.cans').remove();
	},

	fullReset: function() {
		$('.cans').remove();
		gen_nums = [];
		clearInterval(obj.timeInterval);
		canCount = 1;
		stage = 0;
		obj.correct = 0;
		obj.gameContainer.css({left:286, width:590});
		obj.timerImg.html('59');
		obj.scoreImg.html('0');
		obj.ready.css('background', 'url(./img/2-game/red.png)');
	},

	nextLevels: function (stage) {
		if(stage >= 3) {
			obj.gameContainer.css({left:166, width:870});
		} else {
			obj.gameContainer.css({left:286, width:590});
		}

		if(stage == 6) {
			obj.renderResult('won');
		} else {
			obj.renderRest();
			obj.drawCans();
		}
	},

	replayAnimation: function () {
		canCount = 1;
		for(var i = 1; i <= obj.stageCount[stage].itemAmount; i++) {
			$('.can-' + i).delay(300).animate({opacity:0}, {duration:200});
		}
		$('.cans').attr('src', 'img/2-game/1.png');
		obj.animateItems();
		obj.touchDisable();
		cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Game Reload Button Selected');

	},

	touchDisable: function () {
		obj.gameContainer.css('pointer-events', 'none');
		obj.ready.css('background', 'url(./img/2-game/red.png)').velocity('transition.fadeIn');
		setTimeout(function () {
			obj.gameContainer.delay(3000).css('pointer-events', 'auto');
			obj.ready.css('background', 'url(./img/2-game/green.png)').velocity('transition.fadeIn');
		}, 3300);
	},

	renderResult: function (result) {
		obj.fullReset();
		if(result == 'won') {
			obj.resultImg.attr('src', 'img/2-game/won.jpg');
			obj.resultSection.delay(400).animate({opacity:1, top:0}, {duration:600});
			setTimeout(function () {Channel.Interface.slideTo(3)}, 1200);
			cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Game Lost');
		} else if(result == 'lost') {
			obj.resultImg.attr('src', 'img/2-game/lost.jpg');
			obj.resultSection.delay(400).animate({opacity:1, top:0}, {duration:600});
			setTimeout(function () {Channel.Interface.slideTo(3)}, 1200);
			cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Game Won');
		} else if(result == 'try') {
			obj.trySection.delay(400).animate({opacity:1, top:0}, {duration:600});
			cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Game Lost Try Again');
		}
	}

};