var activeHome = 0;
var scrolled = false;

var Channel = {
    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    // Landing Page Auto Slide Gallery
    homeClass: '.cmp-landing',
    home: 0,
    homeIndex: 0,

    // Gallery Page Gallery
    galleryID: '#gallery-section',
    gallery: 0,
    galleryIndex: 0,

    // Features Page Gallery
    featuresID: '#features-section',
    features: 0,
    featuresIndex: 0,

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe',
            onSlideChangeEnd: function () {
                Channel.InterfaceIndex = Channel.Interface.activeIndex;

                if(Channel.InterfaceIndex == 0) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Landing Page Viewed');
                } else if(Channel.InterfaceIndex == 1) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Contact Page Viewed');
                }
            }
        });

        Channel.home = new Swiper(Channel.homeClass, {
            speed: 600, noSwiping: true, noSwipingClass: 'disable-swipe', effect: 'fade',
            onSlideChangeStart: function () {
                Channel.homeIndex = Channel.home.activeIndex;
                activeHome =  Channel.home.activeIndex;

                APP.headTxt.velocity({opacity:0, top:0}, {duration:0, delay:0});
            },

            onSlideChangeEnd: function () {
                var nextTxt = (Channel.homeIndex + 1);
                APP.headTxt.css('background', 'url(./img/0-landing/'+ nextTxt +'/head.png)');
                APP.headTxt.velocity({opacity:1, top:80}, {duration:600, delay:200});
            }
        });

        Channel.gallery = new Swiper(Channel.galleryID, {
            speed: 200, noSwiping: false, noSwipingClass: 'disable-swipe', nextButton: '.next-gal', prevButton: '.prev-gal', pagination: '.swiper-pagination',
            onSlideChangeStart: function () {
                Channel.galleryIndex = Channel.gallery.activeIndex;

                var activeSlide = Channel.galleryIndex + 1;

                cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Gallery Slide '+ activeSlide +' Viewed');
            }
        });

        Channel.features = new Swiper(Channel.featuresID, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe', nextButton: '.next-gal', prevButton: '.prev-gal',
            onSlideChangeEnd: function () {
                Channel.featuresIndex = Channel.features.activeIndex;
            },

            onTransitionEnd: function () {
                if (APP.slideshowFlag) {
                    var index = Channel.features.activeIndex + 1;
                    var direction = Channel.features.swipeDirection;

                    APP.progressHandler(direction, index);
                    APP.automateContent(index);
                }
            }
        });
    }
};

var APP = {

    autoSlideInterval : null,
    headTxt : $('.head'),
    galleryBtn : $('.gallery-btn'),
    featuresBtn : $('.features-btn'),
    testBtn : $('.test-btn'),
    navs : $('.navs'),
    galReturn : $('.gal-btns'),
    featReturn : $('.feat-btns'),
    gallerySection : $('#gallery-section'),
    featuresSection : $('#features-section'),
    scrollDown : $('.scroll-down'),
    scrollUp : $('.scroll-up'),
    testFeat : $('.test-feat'),
    video : document.getElementById('video'),
    videoSection : $('#video-section'),
    optionsBtn : $('.options'),
    submitNum : $('#submit-num'),
    submitMail : $('#submit-mail'),
    submitted : $('.submitted'),
    closeVid : $('.close-vid'),
    backBtn : $('.back'),
    backForm : $('.back-form'),
    slideshowFlag: false,

    Initialize: function () {
        APP.onload();

        // Reporting 10 Seconds Interval
        setInterval(function () {
            cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, '10 Second Interval');
        }, 10000);

        this.navs.on('click', function () {
            var nav = $(this).data('navs');
            APP.navigationSelected(nav);
        });

        this.galReturn.on('click', function () {
            var gal = $(this).data('gals');
            APP.galleryNav(gal);
        });

        this.featReturn.on('click', function () {
            var feat = $(this).data('feats');
            APP.featuresNav(feat);
        });

        this.optionsBtn.on('click', function () {
            var opt = $(this).data('options');
            if(opt == 1) {
                Channel.Interface.slideTo(2);
                cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Moblie Option Selected');
            } else if(opt == 2) {
                Channel.Interface.slideTo(3);
                cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Email Option Selected');
            }
        });

        this.scrollDown.on('click', function () {
            APP.scrollAnimation('down');
            $('.progress-bar').velocity('pause');
        });

        this.scrollUp.on('click', function () {
            APP.scrollAnimation('up');
            $('#bar-' + (Channel.features.activeIndex + 1)).velocity('resume');
        });

        $(APP.video).on('ended', function () {
            APP.endedVideo();
        });

        this.closeVid.on('click', function () {
            APP.skippedVideo();
        });

        this.backBtn.on('click', function () {
            Channel.Interface.slideTo(0);
            $('.form-mail')[0].reset();
            $('.form-num')[0].reset();
        });

        this.backForm.on('click', function () {
            Channel.Interface.slideTo(1);
            $('.form-mail')[0].reset();
            $('.form-num')[0].reset();
        });

        this.submitNum.on('click', function () {
            APP.ValidateNumber();
        });

        this.submitMail.on('click', function () {
            APP.ValidateEmail();
        });
    },

    onload : function () {
        APP.headTxt.velocity({opacity:1, top:80}, {duration:700, delay:800});
        APP.galleryBtn.velocity({opacity:1, left:112}, {duration:1000, delay:2000});
        APP.featuresBtn.velocity({opacity:1, left:422}, {duration:1000, delay:1700});
        APP.testBtn.velocity({opacity:1, left:730}, {duration:1000, delay:1400});

        APP.homeAutoSlide();
    },

    navigationSelected : function (nav) {
        if(nav == 1) {
            APP.gallerySection.velocity({opacity:1, top:0}, {delay:200, duration:700});
            cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Gallery Page Viewed');
            APP.slideshowFlag = false;
        } else if(nav == 2) {
            // APP.clearProgress();
            APP.featuresSection.velocity({opacity:1, top:0}, {delay:200, duration:700});
            APP.automateContent(1);
            cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Features Page Viewed');
            APP.slideshowFlag = true;
        } else if(nav == 3) {
            Channel.Interface.slideTo(1);
        }
    },

    scrollAnimation : function (movement) {
        if(movement == 'down') {

            $('.swiper-slide-active').animate({
                scrollTop:670
            }, 500);

            $('.swiper-slide-active').addClass('disable-swipe')

            APP.scrollUp.css({'display':'block'});
            APP.scrollDown.css({'display':'none'});
            APP.testFeat.css({'display':'block'});

        } else if(movement == 'up') {
            $('.swiper-slide-active').animate({
                scrollTop:0
            }, 500).removeClass('disable-swipe');

            APP.scrollDown.css({'display':'block'});
            APP.scrollUp.css({'display':'none'});
            APP.testFeat.css({'display':'none'});
        }
    },

    galleryNav : function (nav) {
        if(nav == 'home') {
            APP.gallerySection.velocity({opacity:0, top:670}, {delay:200, duration:700});
        } else if(nav == 'test') {
            Channel.Interface.slideTo(1);
            APP.gallerySection.velocity({opacity:0, top:670}, {delay:400, duration:700});
        }

        APP.slideshowFlag = false;

        setTimeout(function () {
            Channel.gallery.slideTo(0);
            Channel.features.slideTo(0);
        }, 1200);
    },

    featuresNav : function (nav) {
        if(nav == 'home') {
            APP.featuresSection.velocity({opacity:0, top:670}, {delay:100, duration:700});
        } else if(nav == 'test') {
            Channel.Interface.slideTo(1);
            APP.featuresSection.velocity({opacity:0, top:670}, {delay:400, duration:700});
        }

        setTimeout(function () {
            Channel.features.slideTo(0);
        }, 1200);

        APP.clearProgress();
    },

    homeAutoSlide : function () {
        APP.autoSlideInterval = setInterval(function () {
            var nextSlide = (activeHome + 1);

            if(activeHome == 2) {
                Channel.home.slideTo(0);
                return;
            } else {
                Channel.home.slideTo(nextSlide);
            }
        }, 6000);
    },

    playVideo : function () {
        APP.video.play();
        APP.videoSection.velocity({opacity:1, top:0}, {delay:400, duration:700});
        APP.submitted.velocity({opacity:1, bottom:0}, {duration:600, delay:600});
        APP.submitted.velocity({opacity:0, bottom:-20}, {duration:600, delay:3600});
        cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Video Played');
    },

    endedVideo : function () {
        APP.videoSection.velocity({opacity:0, top:670}, {delay:100, duration:700});
        setTimeout(function () {
            APP.video.load();
        }, 1200);

        cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Video Ended');
    },

    skippedVideo : function () {
        APP.videoSection.velocity({opacity:0, top:670}, {delay:100, duration:700});
        APP.submitted.velocity({opacity:0, bottom:-20}, {duration:600, delay:1600});

        setTimeout(function () {
            APP.video.load();
        }, 1200);

        cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Video Skipped');
    },

    ValidateEmail: function () {
        var Email = document.getElementById("email");
        var BorderRed = "3px solid red", BorderDefault = "3px solid transparent";
        var ValuesEmpty = Email.value === "" || Email.value === "";
        var ValuesNotEmpty = Email.value !== "" || Email.value !== "";


        if (ValuesEmpty) {
            if (Email.value === "") APP.EmailAction(Email);
            else if (Email.value !== "") {
                if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value))) APP.EmailAction(Email);
            }

            return false;
        } else if (ValuesNotEmpty) {
            if (Email.value !== "") {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value)) APP.EmailAction(Email);
                else {
                    EmailHandler(event);
                    return true;
                }
            }
        } else {
            EmailHandler(event);
            return true;
        }
    },

    EmailAction: function (id) {
        var BorderRed = "3px solid red", BorderDefault = "3px solid transparent";
        $(id).css({ 'border': BorderRed });
        setTimeout(function () { $(id).css({ 'border': BorderDefault }); }, 2000);
    },

    ValidateNumber: function () {

        var Number_ = document.getElementById("number");
        var BorderRed = "3px solid red", BorderDefault = "3px solid transparent";
        var ValuesEmpty = Number_.value === "";
        var ValuesNotEmpty = Number_.value !== "";

        if(ValuesEmpty) {
            APP.NumberAction(Number_);
            if(Number_.value !== "") {
                if(Number_.value.length !== 10) APP.NumberAction(Number_);
            }

            return false;
        } else if(ValuesNotEmpty) {
            if(!Number_.value.match(/^[0-9]+$/) || Number_.value.length !== 10 || $('#number').val().substr(0, 1) !== '0') APP.NumberAction(Number_);
            else {
                NumberHandler(event);
                return true;
            }

        } else {
            NumberHandler(event);
            return true;
        }
    },

    NumberAction: function (id) {
        var BorderRed = "4px solid red", BorderDefault = "4px solid transparent";
        
        $(id).css({ 'border': BorderRed });

        setTimeout(function () {
         $(id).css({ 'border': BorderDefault });
        }, 2000);
    },

    automateContent: function (index) {
        var progressBar = $('#bar-' + index);

        progressBar.velocity({
            width: '100%'
        }, {
            duration: 5000,
            easing: 'linear',
            complete: function () {
                Channel.features.slideNext();
            }
        });
    },

    progressHandler: function (direction, index) {
        if (direction == "next") {
            /**!
             * Fill up previous bars 
             */
            for (var i = 0, length = index; i < length; i++) {
                $('#bar-' + i).velocity('stop').css({ width: '100%' });
            }
        } else if (direction == "prev") {
            /**!
             * Clear full bar and bar that must animate
             */
            $('#bar-' + (index + 1)).velocity('stop').css({ width: '0' });
            $('#bar-' + index).velocity('stop').css({ width: '0' });
        }
    },

    clearProgress: function () {
        for (var i = 1, length = 6; i < length; i++) {
            $('#bar-' + i).velocity('stop').css({ width: '0' });
        }
    }
};

Channel.Initialize();
APP.Initialize();