var timer_id = null;


	var _Memory = {

		counter : 1 * 30 * 1000,
		isPaused : false,
		game : $('.game'),
		interact : $('.interact'),
		pause : $('#btnPause'),
		restart : $('#btnRestart'),
		play : $('#btnPlay'),
		submit : $('#submit'),
		adSection: document.getElementById("ad-section"),
		video: document.getElementById("ad-video"),
		vidCount: 0,
		levelCount: 0,
		gameLevel: ['HCGGAA290120', 'HCGGAB290120'],

		init : function () {
			Memory.init(1);

			// Reporting 10 Seconds Interval
			setInterval(function () {
				hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {'intervals':'10 Second Interval'});
			}, 10000);

			this.interact.on('click', function () {
				var section = $(this).data('section');
				_Memory.content_update(section);
			});

			this.restart.on('click', $.proxy(this.reset_memory_game, this));
			
			this.pause.on('click', function() {
				$('.game-stop-wrapper').show();
				_Memory.pause_memory_game(event);
				 $(this).hide(), $(_Memory.play).show();
			});
			
			this.play.on('click', function () {
				$('.game-stop-wrapper').hide();
				_Memory.continue_memory_game(event);
 				$(this).hide(), $(_Memory.pause).show();
			});

			this.submit.on('click', $.proxy(this.validate_info, this));
		},

		content_update : function (section) {
			$('section').hide();

			if(section == 'game') {
				$('#cmp-' + section).show(),
				_Memory.reset_memory_game();
				$('.game-stop-wrapper').hide();
				_Memory.reporting_game('start');
			} else if(section == 'lost') {
				_Memory.levelTwo_setup(1);
				$('#cmp-' + section).show();
				_Memory.reporting_game('failure');
				_Memory.levelCount = 0;
			} else if(section == 'win') {
				$('#cmp-' + section).show();
			} else if(section == 'form') {
				$('#cmp-' + section).show();
				_Memory.content_update(section);
				/** Report Stats **/
			} else if(section == 'home') {
				$('#cmp-' + section).show();
				hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {"type":"slide", "content_id":"HCGSAA290120", "event": "viewed"});
			}
		},

		levelTwo_setup : function (num) {
			if(num == 1) {
				_Memory.game.removeClass('level-2');
				Memory.init(1);
			} else {
				Memory.init(2);
				_Memory.game.addClass('level-2');
			}
		},

		start_countdown : function () {	
			var counter = _Memory.counter;

			timer_id = setInterval(function () {

				if(!_Memory.isPaused) {
					counter -= 1000;
					var minutes = Math.floor(counter / (60 * 1000));
					var seconds = Math.floor((counter - (minutes * 60 * 1000)) / 1000);

					if(counter == 0) {
						var section = 'lost';
						_Memory.content_update(section);
					
						// cabapi.triggerAd(CONTENT_TYPE_PLAIN_TEXT, 'Play Ad');
            			// console.log('Bang!');
					} else {
						$('#timer').html(minutes + ":" + seconds);
					}
				}
			}, 1000);
		},

		reset_memory_game : function () {
			clearInterval(timer_id);
			$('#timer').html('0:30').show();
			_Memory.start_countdown();
		},

		pause_memory_game : function (event) {
			event.preventDefault();
  			_Memory.isPaused = true;
		},

		continue_memory_game : function (event) {
			event.preventDefault();
  			_Memory.isPaused = false;
		},

		reporting_game : function (events) {
			hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {"type":"game", "content_id":"" + this.gameLevel[this.levelCount] + "", "event": "" + events + ""});
		},

		// adPlay: function() {
      
		// 	_Memory.video.setAttribute("src", "img/Ads/ad-"+ (_Memory.vidCount + 1) +".mp4");
	  
		// 	TweenMax.to(_Memory.adSection, 0.6, {css:{zIndex:25, opacity:1}});
	  
		// 	_Memory.video.play();
	  
		// 	// hubapi.reportActivity("video", store.data.vidsIds[_Memory.vidCount], "started");
		//   },
	  
		//   adComplete: function() {
	  
		// 	// hubapi.reportActivity("video", store.data.vidsIds[_Memory.vidCount], "completed");
	  
		// 	if(_Memory.vidCount == 0) {
		// 		_Memory.vidCount = 1;
		// 	} else {
		// 		_Memory.vidCount = 0;
		// 	}
	  
		// 	_Memory.video.setAttribute("src", "img/Ads/ad-"+ (_Memory.vidCount + 1) +".mp4");
	  
		//   },
	  

		validate_info : function () {
			var name = document.getElementById('name');
			var number = document.getElementById('number');
			var notification = document.getElementsByClassName('form-notification');

			if(name.value === '' || number.value === '') {
				$(notification).text("Ім'я та контактний номер обов'язково").show();
				setTimeout(function () {
					$(notification).text('').hide();
				}, 2000);

				return false;
			} else if(number.value !== '') {
				if(number.value.length === 10) {
					clickHandler(event);
					return true;
				} else {
					$(notification).text("Контактний номер повинен містити 10 цифр").show();
					setTimeout(function () 	{
						$(notification).text('').hide();
					}, 2000);

					return false;
				}
			}
		}
 	};

	_Memory.init();