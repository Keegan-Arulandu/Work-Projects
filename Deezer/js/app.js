var Channel = {
    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    InfoClass: '.cmp-info',
    Info: 0,
    InfoIndex: 0,

    next : $('.next'),
    prev : $('.prev'),
    textSlides : $('.text-slides'),

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: false, noSwipingClass: 'disable-swipe',
            onSlideChangeEnd: function () {
                Channel.InterfaceIndex = Channel.Interface.activeIndex;

                if(Channel.InterfaceIndex == 0) {
                    // cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Landing Page Viewed');
                    hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"DZRSAA181112", "event": "viewed"});
                } else if(Channel.InterfaceIndex == 1) {
                    hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"DZRSAB181112", "event": "viewed"});
                }
            }
        });

        Channel.info = new Swiper(Channel.InfoClass, {
            speed: 200, noSwiping: false, noSwipingClass: 'disable-swipe', nextButton:'.next', prevButton:'.prev', effect: 'fade',
            onSlideChangeStart: function () {
                Channel.InfoIndex = Channel.Info.activeIndex;
                Channel.textSlides.css({'left':52, 'opacity':0});
            },

            onSlideChangeEnd: function () {
                Channel.InfoIndex = Channel.info.activeIndex;

                if(Channel.InfoIndex == 0) {
                    Channel.prev.css('background', 'url(./img/2-slides/prev-ina.png)').velocity('transition.fadeIn');
                    Channel.next.css('background', 'url(./img/2-slides/next.png)').velocity('transition.fadeIn');
                    Channel.textSlides.css('background', 'url(./img/2-slides/1/text.png)').velocity({opacity:1, left:112}, {duration:400});
                    hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"DZRSAB181112", "event": "viewed"});
                } else if(Channel.InfoIndex == 1) {
                    Channel.prev.css('background', 'url(./img/2-slides/prev.png)');
                    Channel.next.css('background', 'url(./img/2-slides/next-ina.png)');
                    Channel.textSlides.css('background', 'url(./img/2-slides/2/text.png)').velocity({opacity:1, left:112}, {duration:400});
                    hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"DZRSAC181112", "event": "viewed"});
                } else if(Channel.InfoIndex == 2) {
                    Channel.prev.css('background', 'url(./img/2-slides/prev.png)');
                    Channel.next.css('background', 'url(./img/2-slides/next-ina.png)');
                    Channel.textSlides.css('background', 'url(./img/2-slides/3/text.png)').velocity({opacity:1, left:112}, {duration:400});
                    hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"DZRSAD181112", "event": "viewed"});
                } else if(Channel.InfoIndex == 3) {
                    Channel.prev.css('background', 'url(./img/2-slides/prev-ina.png)').velocity('transition.fadeIn');
                    Channel.next.css('background', 'url(./img/2-slides/next.png)').velocity('transition.fadeIn');
                    Channel.textSlides.css('background', 'url(./img/2-slides/4/text.png)').velocity({opacity:1, left:112}, {duration:400});
                    hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"DZRSAE181112", "event": "viewed"});
                }
            }
        });
    }
};

var textCount = 0;

// Different StrapLines Music Videos Order
imagesTxt1 = [
['img/1-videos/vid-1/text-7.png', 'img/1-videos/vid-1/text-1.png', 'img/1-videos/vid-1/text-6.png', 'img/1-videos/vid-1/text-2.png', 'img/1-videos/vid-1/text-7.png', 'img/1-videos/vid-1/text-3.png', 'img/1-videos/vid-1/text-6.png', 'img/1-videos/vid-1/text-4.png', 'img/1-videos/vid-1/text-7.png', 'img/1-videos/vid-1/text-5.png', 'img/1-videos/vid-1/text-6.png'], 
['img/1-videos/vid-2/text-7.png', 'img/1-videos/vid-2/text-2.png', 'img/1-videos/vid-2/text-1.png', 'img/1-videos/vid-2/text-3.png', 'img/1-videos/vid-2/text-7.png', 'img/1-videos/vid-2/text-4.png', 'img/1-videos/vid-2/text-1.png', 'img/1-videos/vid-2/text-5.png', 'img/1-videos/vid-2/text-7.png', 'img/1-videos/vid-2/text-6.png', 'img/1-videos/vid-2/text-1.png',]
];

var APP = {

    timerInterval: null,
    vidsBtn : $('.vids'),
    getBtn : $('.get-btn'),
    videoAdd : document.getElementById('video-add'),
    video : document.getElementById('video'),
    videoPlaying : 1,
    videoSection : $('#video-section'),
    closeVid  : $('.close-vid '),
    home : $('.home'),
    textImg : $('.text-img'),
    videoCover : $('.video-cover'),
    coverOverlay : $('.cover-overlay'),
    appBtn : $('.app'),
    videosInterval : null,
    textInterval : null,
    adTimeout : null,
    IsPaused: false,
    timerSpan: $('#timer'),
    timerAmount: 1*4*1000,
    addTimer : $('#add-timer'),

    Initialize: function () {

        APP.onload();

        // Reporting 10 Seconds For Toyota
        setInterval(function() {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {'intervals':'10 Second Interval'});
        }, 10000);
        
        this.vidsBtn.on('click', function () {
            var vid = $(this).data('vids');
            APP.videoPlaying = vid;
            APP.playAdd(vid);
        });

        $(APP.video).on('ended', function () {
            APP.videoEnded();
        });

        $(APP.videoAdd).on('ended', function () {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAC181112", "event": "completed"});
            APP.addCounter();
        });

        this.closeVid.on('click', function () {
            APP.videoSkipped();
        });

        this.getBtn.on('click', function () {
            Channel.Interface.slideTo(1);
            Channel.textSlides.velocity({opacity:1, left:112}, {duration:400, delay:600});

        });

        this.home.on('click', function () {
            Channel.Interface.slideTo(0);
        });

        this.appBtn.on('click', function () {
            APP.videoSkipped();
            Channel.Interface.slideTo(1);
            Channel.textSlides.velocity({opacity:1, left:112}, {duration:400, delay:600});
        });

    },

    onload : function () {

        // Random home Buttons placement and animations
        var numOne = Math.floor(Math.random() * 2) + 1;

        if(numOne == 1) {
            $('.vid-1').css({top:8});
            $('.vid-2').css({top:316});
            $('.vid-1').velocity({opacity:1, top:38}, {duration:700, delay:800});
            $('.vid-2').velocity({opacity:1, top:346}, {duration:700, delay:1200});
        } else {
            $('.vid-1').css({top:316});
            $('.vid-2').css({top:8});
            $('.vid-1').velocity({opacity:1, top:346}, {duration:700, delay:1200});
            $('.vid-2').velocity({opacity:1, top:38}, {duration:700, delay:800});
        }

        $('.get-btn').velocity({opacity:1, right:40}, {duration:700, delay:1700});
    },

    playAdd : function (vid) {
        $(APP.videoAdd).velocity({opacity:1, top:0}, {duration:0, delay:0, display:'block'});
        $(APP.videoAdd).attr('src', 'img/1-videos/add-1.mp4');
        APP.videoAdd.play();
        APP.videoSection.velocity({opacity:1, top:0}, {duration:600, delay:200, display:'block'});
        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAC181112", "event": "started"});
    },

    addCounter : function () {
        APP.addTimer.velocity({opacity:1, top:0}, {duration:600, delay:200});
        APP.setTimer();
    },

    videoSelect : function (vid) {
        APP.coverOverlay.velocity({opacity:1}, {duration:0, display:'block', delay:0});
        APP.coverOverlay.css('background', 'url(./img/1-videos/vid-'+ vid +'/bg.jpg)');
        APP.coverOverlay.velocity({opacity:0}, {duration:900, display:'none', delay:2500});

        $(APP.video).attr('src', 'img/1-videos/video-'+ vid +'.mp4');
        APP.textImg.attr('src', 'img/1-videos/vid-'+ vid +'/text-6.png');
        APP.video.play();
        // APP.videoSection.velocity({opacity:1, top:0}, {duration:600, delay:200, display:'block'});

        APP.videoCover.css('background', 'url(./img/1-videos/vid-'+ vid +'/1.png)');

        APP.textInterval = setInterval(APP.videoText, 6000);

        APP.videosInterval = setInterval(function () {
            $('body').trigger('click');
        }, 30000);

        if(APP.videoPlaying == 1) {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAA181112", "event": "started"});
        } else if(APP.videoPlaying == 2) {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAB181112", "event": "started"});
        }
        
    },

    videoSkipped : function () {
        APP.videoSection.velocity({opacity:0, top:670}, {duration:700, delay:200, display:'none'});
        setTimeout(function () {
            APP.video.load();
        }, 1500);

        clearTimeout(APP.timerSet);
        clearInterval(APP.videosInterval);
        clearInterval(APP.textInterval);

        if(APP.videoPlaying == 1) {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAA181112", "event": "skipped"});
        } else if(APP.videoPlaying == 2) {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAB181112", "event": "skipped"});
        }
    },

    videoEnded : function () {
        APP.videoSection.velocity({opacity:0, top:670}, {duration:700, delay:200, display:'none'});
        setTimeout(function () {
            APP.video.load();
        }, 1500);

        clearTimeout(APP.timerSet);
        clearInterval(APP.videosInterval);
        clearInterval(APP.textInterval);

        if(APP.videoPlaying == 1) {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAA181112", "event": "completed"});
        } else if(APP.videoPlaying == 2) {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"DZRVAB181112", "event": "completed"});
        }

    },

    videoText : function () {
        var acitveVideo = (APP.videoPlaying - 1);

        if(textCount == imagesTxt1[acitveVideo].length) {
            textCount = 1;
            APP.textImg.attr('src', imagesTxt1[acitveVideo][0]).velocity('transition.fadeIn', {duration:900});
        } else {
            APP.textImg.attr('src', imagesTxt1[acitveVideo][textCount]).velocity('transition.fadeIn', {duration:900});
            textCount++;
        }
    },

    setTimer : function () {
        var timer = APP.timerAmount;

        APP.timerInterval = setInterval(function () {

            if(!APP.IsPaused) {
                timer -= 1000;

                var Minutes = Math.floor(timer / (60 * 1000));
                var Seconds = Math.floor((timer - (Minutes * 60 * 1000)) / 1000);

                if(timer < 10000) {
                    APP.timerSpan.html(Seconds);
                } else {
                    APP.timerSpan.html(Seconds);
                }

                if(timer <= 0) {
                    APP.addTimer.velocity({opacity:0, top:670}, {duration:600, delay:200});
                    clearInterval(APP.timerInterval);
                    APP.videoSelect(APP.videoPlaying);

                    $(APP.videoAdd).velocity({opacity:0, top:0}, {duration:600, delay:400, display:'none'});
                    setTimeout(function () {
                     APP.videoAdd.load();
                     APP.timerSpan.html('4');
                    }, 1500);
                }
            }

        }, 1000);
    },

};

Channel.Initialize();
APP.Initialize();