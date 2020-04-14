/* Content Layout - Slide Transition
 * TRANSITIONS object used for initializing all slide instances **/

var ACTIVE_SLIDE = null;
var ISLAND_STATS = null;
var START_REPORTING = false;

var TRANSITIONS = {

	LISTING_CONTENT: null,
	LISTING_CONTENT_DEFINITION: '.listings-main-content',
	LISTING_INFO_LEFT: null,
	LISTING_INFO_LEFT_DEFINITION: '.left-info-slides',
	LISTING_INFO_RIGHT: null,
	LISTING_INFO_RIGHT_DEFINITION: '.right-info-slides',
    SPECIAL_BUTTON: $('.btn-special'),
    SHOW: ['Dave Chappelle', 'Guns N" Roses', 'Global Citizen Festival', 'Ms. Lauryn Hill', 'Bryan Ferry', 'Judas Priest'],

	initialize: function () {

		TRANSITIONS.LISTING_CONTENT = new Swiper(TRANSITIONS.LISTING_CONTENT_DEFINITION, {
			speed: 200, noSwiping: true, initialSlide: 0,
		});

		TRANSITIONS.LISTING_INFO_LEFT = new Swiper(TRANSITIONS.LISTING_INFO_LEFT_DEFINITION, {
			speed: 150, noSwiping: true, effect: 'fade'
		});

        TRANSITIONS.LISTING_INFO_RIGHT = new Swiper(TRANSITIONS.LISTING_INFO_RIGHT_DEFINITION, {
            speed: 150, noSwiping: true, prevButton: '.btn-prev', nextButton: '.btn-next',

			onSlideChangeStart: function () {
				ACTIVE_SLIDE = TRANSITIONS.LISTING_INFO_RIGHT.activeIndex;
                TRANSITIONS.LISTING_INFO_LEFT.slideTo(ACTIVE_SLIDE);
            },

            onSlideChangeEnd: function () {
                if (START_REPORTING == true) cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Big Concerts ' + TRANSITIONS.SHOW[ACTIVE_SLIDE] + ' Slide Viewed');
                else return START_REPORTING;
            }
        });

        setTimeout(TRANSITIONS.randomSlide, 500);
    },

    randomSlide: function () {
        TRANSITIONS.LISTING_INFO_RIGHT.slideTo(Math.floor((Math.random() * 5) + 1), 0, true);
        START_REPORTING = true;
    }
};

var APP = {

	INFO_BUTTON: $('.info-button'),
	SLIDE_BUTTON: $('.right-slide-button'),
	GRID_ITEM: $('.item'),

	initialize: function () {

        setTimeout(APP.cardAnimation, 1000);

		this.INFO_BUTTON.on('click', function (event) {
			event.preventDefault();
            var info = $(this).data('listing-button');

			APP.listingInfoDisplay(info), APP.buttonState(info);
		});

		this.SLIDE_BUTTON.on('click', function (event) {
			event.preventDefault();
            var slide = $(this).data('listing-button');

			APP.listingContenSlide(slide), APP.resetDefault();
		});

		this.GRID_ITEM.on('click', function (event) {
			event.preventDefault();
            var item = $(this).data('item');

			APP.listingContenSlide(1);
			TRANSITIONS.LISTING_INFO_RIGHT.slideTo(item);
		});
	},

	cardAnimation : function () {
		var timeouts = [0, 150, 300, 450, 700, 950, 1100];

		for(var i = 0; i <= timeouts.length; i++) {
			var element = $('.item:nth-child(' + i + ')'), delay = parseInt(timeouts[i]);
			APP.setTimeoutAnimation(element, delay);
		}
	},

	setTimeoutAnimation : function (element, delay) {
		setTimeout(function() { 
			$(element).addClass('animated flipInY');
		}, delay);
	},

	listingContenSlide: function (params, event) {	
		if(params == undefined) return false;
		else TRANSITIONS.LISTING_CONTENT.slideTo(params);
	},

	listingInfoDisplay: function (info) {
		var INFO_TEXT = $('.info-text');

        if (info == 'more-info' || info == 'dates') {
            INFO_TEXT.toggleClass('active inactive');

            if (info == 'more-info') cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Big Concerts ' + TRANSITIONS.SHOW[ACTIVE_SLIDE] + ' Info Viewed');
            else return info;

        } else if (info == 3) {
            APP.listingContenSlide(info);
        }
	},

	buttonState: function (info) {
        var ACTIVE_URL = './img/2-listings/info-buttons/1/',
            INACTIVE_URL = './img/2-listings/info-buttons/0/',
            EXTENSION = '.png';

        $('.info-button').removeClass('cant-click');	

        if (info == 'more-info') {
            $('.btn-more-info').css('background', 'url(' + ACTIVE_URL + info + EXTENSION).addClass('cant-click');
            $('.btn-listing-contact').css('background', 'url(' + INACTIVE_URL + 'dates' + EXTENSION);
		} else if(info == 'dates') {
            $('.btn-listing-contact').css('background', 'url(' + ACTIVE_URL + info + EXTENSION).addClass('cant-click');
            $('.btn-more-info').css('background', 'url(' + INACTIVE_URL + 'more-info' + EXTENSION);
		} 
	},

	resetDefault: function () {
		$('.info-text:nth-child(1)').addClass('active').removeClass('inactive');
		$('.info-text:nth-child(2)').addClass('inactive').removeClass('active');
		APP.buttonState('dates');
    },
};

TRANSITIONS.initialize();
APP.initialize();