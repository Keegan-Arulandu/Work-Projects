/** @type {Object} Game Object */

var correct = 0;

var Game = {
	cmpGame: $('.cmp-game'),
	pizzaBg: $('.pizza-bg'),
	items: $('.items'),
	IsDown: false,
	Offsets: [0, 0],
	MousePosition: null,
	gameHeader: $('#game-header'),

	Initialize : function () {

		$('.pizza-bg').on('click', function () {
			Game.MousePosition = {
				x: event.clientX,
				y: event.clientY
			};

			console.log(Game.MousePosition);
		});
		
		this.items.on('click touchmove touchend mousedown mouseup mousemove', function (event) {
			var string = $(this).data('strings');

			if(event.type == 'mousedown') {
				Game.IsDown = true;
				Game.Offsets = [
					this.offsetLeft - event.clientX,
					this.offsetTop - event.clientY
				];
			} else if(event.type == 'mouseup') {
				Game.IsDown = false;
			} else if(event.type == 'mousemove'){
				event.preventDefault();

				if(Game.IsDown) {
					Game.MousePosition = {
						x: event.clientX,
						y: event.clientY
					};

					this.style.left = (Game.MousePosition.x + (-100) + 'px');
					this.style.top = (Game.MousePosition.y + (-100) + 'px');
				}
			} else {
				if(event.type == 'touchmove') {
					event.preventDefault();
					Game.MousePosition = {
						x: event.changedTouches[0].clientX,
						y: event.changedTouches[0].clientY
					};

					this.style.left = (Game.MousePosition.x + (-100) + 'px');
					this.style.top = (Game.MousePosition.y + (-100) + 'px');
				}  else {


					if(Game.MousePosition.x > 310 && Game.MousePosition.x <= 805 && Game.MousePosition.y > 216 && Game.MousePosition.y <= 575) {
							if(string == correct) {
								$('.item-' + string).velocity({opacity:0}, {display:'none'});
								$('.slice-' + string).velocity({opacity:1}, {display:'block'});
								$('.num-' + string).velocity({opacity:0});
								Game.gameHeader.attr('src', 'img/4-game/pizza/header/' + string + '.png').velocity('transition.fadeIn', {duration:700});
								correct++;
							} else {
								$(this).removeAttr('style').velocity({opacity:1}, {duration:600});
								Game.gameHeader.attr('src', 'img/4-game/pizza/header/5.png').velocity('transition.fadeIn', {duration:700});
							}

							if(correct == 5) {
								setTimeout(function () {
									Channel.Interface.slideTo(5);
									Game.resetGame();
								}, 1500);
							}
					} else {
						$(this).removeAttr('style');
					}
				}
			}
		});
	},

	resetGame : function () {
		for (var i = 0; i <= 5; i++) {
			$('.item-' + i).velocity({opacity:1}, {display:'block'});
			$('.item-' + i).removeAttr('style');
			$('.slice-' + i).velocity({opacity:0}, {display:'none'});
			$('.num-' + i).velocity({opacity:1});
		}

		correct = 0;
		Game.gameHeader.attr('src', 'img/4-game/header.png');
	}
};
