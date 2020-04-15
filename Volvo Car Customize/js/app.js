var activeCar = 1;
var wheelColor = $('#wheels-color');
var Images = [];

var Channel = {
    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    // Gallery Page Gallery
    galleryID: '#gallery-section',
    gallery: 0,
    galleryIndex: 0,

    // Features Page Gallery
    featuresID: '#features-section',
    features: 0,
    featuresIndex: 0,

    // Colors Slides
    colorsClass: '.cmp-colors',
    colors: 0,
    colorsIndex: 0,

    // Wheels Slides
    wheelsClass: '.cmp-wheels',
    wheels: 0,
    wheelsIndex: 0,

    // Interior Slides
    interiorClass: '.cmp-interior',
    interior: 0,
    interiorIndex: 0,

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: false, noSwipingClass: 'disable-swipe',
            on: {
                transitionStart: function () {
                    Channel.InterfaceIndex = Channel.Interface.activeIndex;

                    if(Channel.InterfaceIndex == 0) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAA181127", "event": "viewed"});
                    } else if(Channel.InterfaceIndex == 1) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAO181127", "event": "viewed"});
                    }
                },
            }
        });

        Channel.gallery = new Swiper(Channel.galleryID, {
            speed: 200, noSwiping: false, noSwipingClass: 'disable-swipe',
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            navigation: {
            nextEl: '.next-gal',
            prevEl: '.prev-gal',
            },
            on: {
                transitionStart: function () {
                    Channel.galleryIndex = Channel.gallery.activeIndex;
                    var activeSlide = Channel.galleryIndex + 1;

                    if(Channel.galleryIndex == 0) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAB181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 1) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAC181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 2) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAD181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 3) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAE181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 4) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAF181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 5) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAG181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 6) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAH181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 7) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAI181127", "event": "viewed"});
                    } else if(Channel.galleryIndex == 8) {
                        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAJ181127", "event": "viewed"});
                    }
                },
            }
        });

        Channel.features = new Swiper(Channel.featuresID, {
            speed: 450, noSwiping: true, noSwipingClass: 'disable-swipe', nextButton: '.swiper-slide > .swiper-wrapper > .forward', prevButton: '.backwards',
        });

        Channel.features.on('slideChange', function () {
            Channel.featuresIndex = Channel.features.activeIndex;
            if(Channel.featuresIndex == 0) {
                APP.financeBar.velocity({opacity:0}, {display:'none', duration:0, delay:0});
                APP.menuBar.css('background', 'url(./img/2-features/nav/nav-1.png)').velocity({opacity:0}, {display:'none', duration:400, delay:500});
                APP.forwardBtn.css('background', 'url(./img/2-features/nav/forward.png)').velocity({opacity:0}, {display:'none', duration:0});
                APP.backwardBtn.css('background', 'url(./img/2-features/nav/backwards.png)').velocity({opacity:0}, {display:'none', duration:0});
                hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAR181127", "event": "viewed"});
            } else if(Channel.featuresIndex == 1) {
                APP.menuBar.css('background', 'url(./img/2-features/nav/nav-1.png)').velocity({opacity:1}, {display:'block', duration:400, delay:500});
                APP.forwardBtn.velocity({opacity:1}, {display:'block', duration:0, delay:500});
                APP.backwardBtn.velocity({opacity:0}, {display:'block', duration:0, delay:500});
                hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAK181127", "event": "viewed"});
            } else if(Channel.featuresIndex == 2) {
                APP.menuBar.css('background', 'url(./img/2-features/nav/nav-2.png)').velocity({opacity:1}, {display:'block', duration:400});
                APP.forwardBtn.css('background', 'url(./img/2-features/nav/forward.png)').velocity({opacity:1}, {display:'block', duration:0});
                APP.backwardBtn.css('background', 'url(./img/2-features/nav/backwards.png)').velocity({opacity:1}, {display:'block', duration:0});
                hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAL181127", "event": "viewed"});
            } else if(Channel.featuresIndex == 3) {
                APP.menuBar.css('background', 'url(./img/2-features/nav/nav-3.png)').velocity({opacity:1}, {display:'block', duration:400});
                APP.forwardBtn.css('background', 'url(./img/2-features/nav/lit-for.png)').velocity({opacity:1}, {display:'block', duration:0});
                APP.backwardBtn.css('background', 'url(./img/2-features/nav/lit-bac.png)').velocity({opacity:1}, {display:'block', duration:0});
                hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAM181127", "event": "viewed"});
            } else if(Channel.featuresIndex == 4) {
                APP.menuBar.velocity({opacity:0}, {display:'none', duration:400, delay:0});
                APP.forwardBtn.velocity({opacity:0}, {display:'none', duration:0, delay:0});
                APP.backwardBtn.velocity({opacity:0}, {display:'none', duration:0, delay:0});
                hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAN181127", "event": "viewed"});
            } else if(Channel.featuresIndex == 5) {
                APP.financeBar.css('background', 'url(./img/6-finance/nav-1.png)').velocity({opacity:1}, {display:'block', duration:400, delay:0});
                hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAP181127", "event": "viewed"});
            } else if(Channel.featuresIndex == 6) {
                APP.financeBar.css('background', 'url(./img/6-finance/nav-2.png)').velocity({opacity:1}, {display:'block', duration:400, delay:0});
                hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"slide", "content_id":"VLVSAQ181127", "event": "viewed"});
            }
        });

        Channel.colors = new Swiper(Channel.colorsClass, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe', effect: 'fade',
            pagination: {
            el: '.colors-pagination',
            clickable: true,
            },
        });

        Channel.colors.on('slideChange', function () {
            Channel.colorsIndex = Channel.colors.activeIndex;
            activeCar = Channel.colorsIndex + 1;
            wheelColor.attr('src', Images[Channel.colorsIndex]);
            APP.result.color = activeCar;
        });

        Channel.wheels = new Swiper(Channel.wheelsClass, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe', effect: 'fade',
            pagination: {
            el: '.wheels-pagination',
            clickable: true,
            },
            on: {
                transitionStart: function () {
                    Channel.wheelsIndex = Channel.wheels.activeIndex;

                    var activeWheels = Channel.wheelsIndex + 1;
                    APP.result.wheel = activeWheels;
                },
            }
        });

        Channel.interior = new Swiper(Channel.interiorClass, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe', effect: 'fade',
            pagination: {
            el: '.interior-pagination',
            clickable: true,
            },
            on: {
                transitionStart: function () {
                    Channel.interiorIndex = Channel.interior.activeIndex;

                    var activeInterior = Channel.interiorIndex + 1;
                    APP.result.interior = activeInterior;
                },
            }
        });
    }
};

var APP = {

    autoSlideInterval : null,
    headTxt : $('.head'),
    buttonImg : $('.button-img'),
    galleryBtn : $('.gallery-btn'),
    featuresBtn : $('.features-btn'),
    testBtn : $('.test-btn'),
    navs : $('.navs'),
    items : $('.items'),
    galReturn : $('.gal-btns'),
    featBtns : $('.feats'),
    gallerySection : $('#gallery-section'),
    featuresSection : $('#features-section'),
    testFeat : $('.test-feat'),
    video : document.getElementById('video'),
    videoSection : $('#video-section'),
    submit : $('#submit'),
    closeVid : $('.close-vid'),
    backBtn : $('.back'),
    backForm : $('.back-form'),
    forwardBtn : $('.forward'),
    backwardBtn : $('.backwards'),
    menuBar : $('#menu-bar'),
    financeBar: $('#finance-bar'),
    form : $('#name, #number, #email, #dealers'),
    result : {color:0, wheel:0, interior:0},

    Initialize: function () {
        APP.onload();

        // Reporting 10 Seconds Interval
        setInterval(function () {
            hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, {'intervals':'10 Second Interval'});
        }, 10000);

        this.navs.on('click', function () {
            var nav = $(this).data('navs');
            APP.navigationSelected(nav);
        });

        this.items.on('click', function () {
            var item = $(this).data('items');
            APP.featuresNav(item);
        });

        $(APP.video).on('ended', function () {
            APP.endedVideo();
        });

        this.closeVid.on('click', function () {
            APP.skippedVideo();
        });

        this.galReturn.on('click', function () {
            var gal = $(this).data('gals');
            APP.galleryNav(gal);
        });

        this.featBtns.on('click', function () {
            var feat = $(this).data('feats');
            APP.featuresNav(feat);
        });

        this.backBtn.on('click', function () {
            Channel.Interface.slideTo(0);
            $('#form')[0].reset();
        });

        this.submit.on('click', function () {
            APP.ValidateInput();
        });

        // Form Slide Up 
        this.form.on('focus', function () {
            $('#form').stop(false, false).animate({ top: '-180px' }, 250);
        });

        this.form.on('focusout', function () {
            $('#form').stop(true, true).animate({ top: '0px' }, 250);
        });
    },

    onload : function () {
        APP.headTxt.velocity({opacity:1, top:124}, {duration:700, delay:800});
        APP.buttonImg.velocity({opacity:1, bottom:42}, {duration:700, delay:1400});

        APP.PreloadImages();
    },

    navigationSelected : function (nav) {
        if(nav == 1) {
            APP.gallerySection.velocity({opacity:1, top:0}, {delay:200, duration:700});
        } else if(nav == 2) {
            APP.featuresSection.velocity({opacity:1, top:0}, {delay:200, duration:700});
        } else if(nav == 3) {
            Channel.Interface.slideTo(1);
        } else if(nav == 4) {
            APP.playVideo();
        } else if(nav == 5) {
            Channel.features.slideTo(6);
            APP.featuresSection.velocity({opacity:1, top:0}, {delay:400, duration:700});
        }
    },

    galleryNav : function (nav) {
        if(nav == 'home') {
            APP.gallerySection.velocity({opacity:0, top:670}, {delay:200, duration:700});
        } else if(nav == 'test') {
            Channel.Interface.slideTo(1);
            APP.gallerySection.velocity({opacity:0, top:670}, {delay:400, duration:700});
        }
        Channel.gallery.slideTo(0);
    },

    featuresNav : function (feat) {
        if(feat == 'home') {
            APP.featuresSection.velocity({opacity:0, top:670}, {delay:200, duration:700});
            setTimeout(function () {
                Channel.gallery.slideTo(0);
                Channel.features.slideTo(0);
            }, 1200);
        } else if(feat == 'next') {
            Channel.features.slideTo(1);
        } else if(feat == 'forward') {
            Channel.features.slideNext();
        } else if(feat == 'backwards') {
            Channel.features.slidePrev();
        } else if(feat == 'enquire') {
            Channel.Interface.slideTo(1);
            APP.featuresSection.velocity({opacity:0, top:670}, {delay:400, duration:700});
            setTimeout(function () {
                Channel.gallery.slideTo(0);
                Channel.features.slideTo(0);
            }, 1200);
        } else if(feat == 'finance') {
            Channel.features.slideNext();
        } else if(feat == 'right') {
            Channel.features.slideNext();
        } else if(feat == 'left') {
            Channel.features.slidePrev();
        }

        for(var i = 1; i <= 4; i++) {
            if(feat == i) {
                Channel.features.slideTo(i);
            }
        }
    },



    playVideo : function () {
        APP.video.play();
        APP.videoSection.velocity({opacity:1}, {delay:400, duration:700, display:'block'});
        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"VLVVAA181127", "event": "started"});
    },

    endedVideo : function () {
        APP.videoSection.velocity({opacity:0}, {delay:100, duration:700, display:'none'});
        setTimeout(function () {            
            APP.video.load();
        }, 1200);
        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"VLVVAA181127", "event": "ended"});
    },

    skippedVideo : function () {
        APP.videoSection.velocity({opacity:0}, {delay:100, duration:700, display:'none'});
        setTimeout(function () {
            APP.video.load();
        }, 1200);
        hubapi.jsonStats(CONTENT_TYPE_PLAIN_TEXT, { "type":"video", "content_id":"VLVVAA181127", "event": "skipped"});
    },

    PreloadImages : function () {
        var url = 'img/2-features/wheels/';
        var ext = '.jpg';
        var img = new Image();

        for(var i = 1; i <= 7; i++) {
            img.src = url + i + ext;
            Images.push(img.src);
        }
    },

    ValidateInput: function () {
        var Name = document.getElementById("name");
        var Number_ = document.getElementById("number");
        var Dealer = document.getElementById("dealers");
        var Email = document.getElementById("email");
        var Language = badwords.indexOf(Name.value);
        var BorderRed = "6px solid red", BorderDefault = "6px solid transparent";
        var ValuesEmpty = Name.value === "" || Number_.value === "" || Email.value === "";
        var ValuesNotEmpty = Name.value !== "" || Number_.value !== "" || Email.value !== "";

        if (ValuesEmpty) {
            if (Name.value === "") APP.InputAction(Name);
            
            if (Number_.value === "") APP.InputAction(Number_);
            else if (Number_.value !== "") {
                if(Number_.value.length !== 10) APP.InputAction(Number_);
            }

            if (Dealer.value == "0") APP.InputAction(Dealer);

            if (Email.value === "") APP.InputAction(Email);
            else if (Email.value !== "") {
                if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value))) APP.InputAction(Email);
            }

            return false;
        } else if (ValuesNotEmpty) {
            if (Name.value !== "") {
                if (!(Name.value.match(/^[A-Za-z ]+$/)) || Language !== -1) {
                    APP.InputAction(Name);
                    return false;
                }
            }

            if (Dealer.value == "0") {
                APP.InputAction(Dealer);
                return false;
            } 

            if (Email.value !== "") {
                if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value))) {
                    APP.InputAction(Email);
                     return false;
                }
            }

            if (Number_.value !== "") {
                if (!Number_.value.match(/^[0-9]+$/) || Number_.value.length !== 10) APP.InputAction(Number_);
                else {
                    clickHandler(event);
                    return true;
                }
            }
        } else {
            clickHandler(event);
            return true;
        }
    },

    InputAction: function (id) {
        var BorderRed = "6px solid red", BorderDefault = "6px solid transparent";
        $(id).css({ border: BorderRed });
        setTimeout(function () { $(id).css({ border: BorderDefault }); }, 2000);
    }
};

Channel.Initialize();
APP.Initialize();