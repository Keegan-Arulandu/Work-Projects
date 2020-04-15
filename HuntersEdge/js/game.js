// Tap It Game JS

var ciderCount = 0;
var beerCount = 0;

var obj = {

	drawInterval: null,
	timerInterval: null,
	interface: $('#interface-slide'),
	complete: false,
  	stopAnimation: false,
  	animationDuration: 4000,
  	lost: false,
  	product : $('.product'),
  	items: [null, 'apple', 'hops'],
  	cider: $('#cider'),
  	beer: $('#beer'),
  	timerSpan: $('#timer'),
  	timer: 1 * 60 * 1000,

	game : function () {
		obj.drawInterval = setInterval(obj.floatingItems, 2000);
		obj.startTimer();
	},

	floatingItems : function () {
		var parent = document.getElementById("interface-slide");
		var itemCount = Math.floor((Math.random() * 3) + 1);
		var pic = Math.floor((Math.random() * 2) + 1);
		var image, i;

		for(i = 0; i < itemCount; i++) {
			image = document.createElement("img");
			image.src = "img/2-game/"+ obj.items[pic] +".png";
			image.className = "product absolute-position";
			image.setAttribute('data-products', obj.items[pic]);
			image.style.right = -300 + "px";
			image.style.top = Math.floor((Math.random() * (380)) + 150) + "px";
			image.style.ZIndex = 31;
			image.style.webkitTransform = "rotate(90deg)";
			parent.appendChild(image);

			obj.animateItems("product");

			image.addEventListener("click", function(){
				var element = $(this);
			    var touch = element.data('products');
			    obj.updateGame(touch, element);
			});
		}
	},

	animateItems : function (className) {
		var product = document.getElementsByClassName(className);
		var delay = 0;

		$(product).each(function () {
			$(this).delay(delay).animate({
				transform : "translateX(-1500px)"
			}, {
				duration: obj.animationDuration,
				easing: "linear",

				complete: function () {
					$(this).remove();
				}
			});

			delay += 700;
		})
	},

	updateGame: function (touch, element) {

		if(ciderCount >= 10 && beerCount >= 10) {
			Channel.Interface.slideTo(3);
			obj.gameCompleted();
		}

		if (touch == 'apple') {
			ciderCount++;
			document.getElementById('cider').innerHTML = ciderCount;
		} else if (touch == 'hops') {
			beerCount++;
			document.getElementById('beer').innerHTML = beerCount;
		}

		if(ciderCount >= 10 && beerCount >= 10) {
			Channel.Interface.slideTo(3);
			obj.gameCompleted();
		}

		element.remove();
	},

	startTimer : function () {
		var Timer = obj.timer;

		obj.timerInterval = setInterval(function () {
			if(!obj.IsPaused) {
				Timer -= 1000;

				var Minutes = Math.floor(Timer / (60 * 1000));
				var Seconds = Math.floor((Timer - (Minutes * 60 * 1000)) / 1000);

				if(Timer < 10000) {
					obj.timerSpan.html(+ Seconds);
				} else {
					obj.timerSpan.html(+ Seconds);
				}

				if(Timer <= 0) {
					APP.againSection.velocity({opacity:1, top:0}, {duration:700, delay:200, display:'block'});
					obj.gameCompleted();
					TaxiInteractiveUtils.reportElementInteractivity('Game Lost');
				}
			}
		}, 1000);
	},

	gameCompleted : function () {
		clearInterval(obj.drawInterval);
		clearInterval(obj.timerInterval);

		setTimeout(function () {
			document.getElementById('cider').innerHTML = 0;
			document.getElementById('beer').innerHTML = 0;
			ciderCount = 0;
			beerCount = 0;
			obj.timerSpan.html('60');
			$('.product').remove();
		}, 1200);
	}
};