var Channel = {
    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    InfoClass: '.cmp-info',
    Info: 0,
    InfoIndex: 0,

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe',
            onSlideChangeEnd: function () {
                Channel.InterfaceIndex = Channel.Interface.activeIndex;

                if(Channel.InterfaceIndex == 0) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Landing Page Viewed');
                } else if(Channel.InterfaceIndex == 1) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Instructions Page Viewed');
                } else if(Channel.InterfaceIndex == 2) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Game Started');
                } else if(Channel.InterfaceIndex == 3) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Options Page Viewed');
                } else if(Channel.InterfaceIndex == 4) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Number Form Viewed');
                } else if(Channel.InterfaceIndex == 5) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Email Form Viewed');
                } else if(Channel.InterfaceIndex == 6) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Info Slide 1 Viewed');
                }
            }
        });

        Channel.Info = new Swiper(Channel.InfoClass, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe', nextButton: '.next', prevButton: '.prev',
            onSlideChangeEnd: function () {
                Channel.InfoIndex = Channel.Info.activeIndex;

                if(Channel.InfoIndex == 0) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Info Slide 1 Viewed');
                } else if(Channel.InfoIndex == 1) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Info Slide 2 Viewed');
                } else if(Channel.InfoIndex == 2) {
                    cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Info Slide 3 Viewed');
                }
            }
        });
    }
};

var APP = {

    ages : $('.ages'),
    noSection : $('#no-section'),
    noReturn : $('.no-return'),
    startBtn : $('.start'),
    optionBtns : $('.options'),
    reviewBtn : $('#review'),
    backBtns : $('.backs'),
    submitEmail : $('#submit-mail'),
    submitNum : $('#submit-num'),
    thankSection : $('#thanks-section'),
    thankBtn : $('.thanks-btn'),
    tryBtn : $('.try-btn'),
    video : document.getElementById('video'),
    videoSection : $('#video-section'),
    closeVid : $('.close-vid'),

    Initialize: function () {

        // Reporting 10 Seconds Interval
        setInterval(function () {
            cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, '10 Second Interval');
        }, 10000);

        this.ages.on('click', function () {
            var age = $(this).data('ages');
            APP.navigationSelect(age);
        });

        this.noReturn.on('click', function () {
            APP.noSection.velocity({opacity:0, top:670}, {duration:700, delay:400});
        });

        this.startBtn.on('click', function () {
            Channel.Interface.slideTo(2);
            obj.gameStart();
        });

        this.reviewBtn.on('click', function () {
            obj.replayAnimation();
        });

        this.tryBtn.on('click', function () {
            obj.trySection.delay(400).animate({opacity:0, top:670}, {duration:600});
            obj.drawCans();
            obj.setTimer();
        });

        this.optionBtns.on('click', function () {
            var opt = $(this).data('options');
            APP.formOptions(opt);
        });

        this.backBtns.on('click', function () {
            var back = $(this).data('backs');
            APP.backNavigation(back);
        });

        this.submitEmail.on('click', function () {
            APP.ValidateEmail();
        });

        this.submitNum.on('click', function () {
            APP.ValidateNumber();
        });

        this.thankBtn.on('click', function () {
            APP.thankSection.delay(1400).animate({opacity:0, top:670}, {duration:600});
            // APP.videoPlay();
        });

        this.closeVid.on('click', function () {
            APP.videoSkipped();
        });

        $(APP.video).on('ended', function () {
            APP.videoEnded();
        });
    },

    navigationSelect: function (age) {
        if(age == 'no') {
            APP.noSection.velocity({opacity:1, top:0}, {duration:700, delay:400});
        } else if(age == 'yes') {
            Channel.Interface.slideTo(1);
        }
    },

    backNavigation: function (back) {
        if(back == 1) {
            Channel.Interface.slideTo(0);
        } else if(back == 2) {
            Channel.Interface.slideTo(0);
            obj.fullReset();
        } else if(back == 3) {
            Channel.Interface.slideTo(0);
            APP.thankSection.delay(800).animate({opacity:0, top:670}, {duration:600});
        }
    },

    formOptions: function (opt) {
        if(opt == 1) {
            Channel.Interface.slideTo(4);
        } else if(opt == 2) {
            Channel.Interface.slideTo(5);
        }
    },

    videoPlay: function () {
        APP.video.play();
        APP.videoSection.velocity({opacity:1, top:0}, {duration:700, delay:400, display:'block'});
        cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Video Played');
    },

    videoSkipped: function () {
        APP.videoSection.velocity({opacity:0, top:0}, {duration:700, delay:200, display:'none'});
        setTimeout(function () {
            APP.video.load();
        }, 1200);
        cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Video Skipped');
    },

    videoEnded: function () {
        APP.videoSection.velocity({opacity:0, top:0}, {duration:700, delay:200, display:'none'});
        setTimeout(function () {
            APP.video.load();
        }, 1200);
        cabapi.uploadStats(CONTENT_TYPE_PLAIN_TEXT, 'Video Ended');
    },

    ValidateEmail: function () {
        var Email = document.getElementById("email");
        var BorderRed = "3px solid red", BorderDefault = "3px solid transparent";
        var ValuesEmpty = Email.value === "";
        var ValuesNotEmpty = Email.value !== "";


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
        var BorderRed = "4px solid red", BorderDefault = "4px solid transparent";
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
        setTimeout(function () {$(id).css({ 'border': BorderDefault });}, 4000);}
};

Channel.Initialize();
APP.Initialize();