var Channel = {
    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    InfoClass: '.info',
    Info: 0,
    InfoIndex: 0,

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe',
            onSlideChangeEnd: function () {
                Channel.InterfaceIndex = Channel.Interface.activeIndex;

                if(Channel.InterfaceIndex == 0) {
                    TaxiInteractiveUtils.reportElementInteractivity('Landing Page Viewed');
                } else if(Channel.InterfaceIndex == 1) {
                    TaxiInteractiveUtils.reportElementInteractivity('Link Option Page Viewed');
                    $('.mobile-link').velocity({opacity:1, top:259 }, {duration: 600, delay: 400});
                    $('.email-link').velocity({opacity:1, top:376 }, {duration: 600, delay: 1000});
                } else if(Channel.InterfaceIndex == 2) {
                    $('.number-text').velocity({opacity:1, left:53 }, {duration: 800, delay: 200});
                    TaxiInteractiveUtils.reportElementInteractivity('Mobile Form Page Viewed');
                } else if(Channel.InterfaceIndex == 3) {
                    $('.email-text').velocity({opacity:1, left:53 }, {duration: 800, delay: 200});
                    TaxiInteractiveUtils.reportElementInteractivity('Email Form Page Viewed');
                } else if(Channel.InterfaceIndex == 4) {
                    TaxiInteractiveUtils.reportElementInteractivity('Why Slide 1 Viewed');
                }
            }
        });

        Channel.Info = new Swiper(Channel.InfoClass, {
            speed: 200, noSwiping: false, noSwipingClass: 'disable-swipe', nextButton: '.next', prevButton: '.prev',
            onSlideChangeEnd: function () {
                Channel.InfoIndex = Channel.Info.activeIndex;

                if(Channel.InfoIndex == 0) {
                    $('.prev').css('background', 'url(./img/why/prev-act.png)').velocity('transition.fadeIn');
                    $('.next').css('background', 'url(./img/why/next-dea.png)');
                    $('.progress').css('background', 'url(./img/5-why/1.png)');
                    TaxiInteractiveUtils.reportElementInteractivity('Why Slide 1 Viewed');
                } else if(Channel.InfoIndex == 1) {
                    $('.progress').css('background', 'url(./img/5-why/2.png)');
                    $('.next').css('background', 'url(./img/why/next-dea.png)');
                    $('.prev').css('background', 'url(./img/why/prev-dea.png)');
                    TaxiInteractiveUtils.reportElementInteractivity('Why Slide 2 Viewed');
                } else if(Channel.InfoIndex == 2) {
                    $('.progress').css('background', 'url(./img/5-why/3.png)');
                    $('.next').css('background', 'url(./img/why/next-dea.png)');
                    $('.prev').css('background', 'url(./img/why/prev-dea.png)');
                    TaxiInteractiveUtils.reportElementInteractivity('Why Slide 3 Viewed');
                } else if(Channel.InfoIndex == 3) {
                    $('.progress').css('background', 'url(./img/5-why/4.png)');
                    $('.next').css('background', 'url(./img/why/next-dea.png)');
                    $('.prev').css('background', 'url(./img/why/prev-dea.png)');
                    TaxiInteractiveUtils.reportElementInteractivity('Why Slide 4 Viewed');
                } else if(Channel.InfoIndex == 4) {
                    $('.next').css('background', 'url(./img/why/next-act.png)').velocity('transition.fadeIn');
                    $('.progress').css('background', 'url(./img/5-why/5.png)');
                    $('.prev').css('background', 'url(./img/why/prev-dea.png)');
                    TaxiInteractiveUtils.reportElementInteractivity('Why Slide 5 Viewed');
                }
            }
        });
    }
};

var APP = {

    lanBtns : $('.lan-btns'),
    mini : document.getElementById('mini'),
    video : document.getElementById('video'),
    preVid : document.getElementById('pre-vid'),
    closeVidz: $('.close-vidz'),
    back : $('.back'),
    mobileLink : $('.mobile-link'), 
    emailLink : $('.email-link'), 
    close : $('.close, .thanks-btn'),
    submitEmail : $('#submit-mail'),
    submitNum : $('#submit-num'),
    introSection : $('#intro-section'),
    vidPoster : $('.vid-poster, .play-icon'),
    heading : $('.heading'),
    vidBtn : $('.vid-poster'),
    quoteBtn : $('.quote-btn'),
    whyBtn : $('.why-btn'),
    number : $('#number'),
    email : $('#email'),

    Initialize: function () {

        APP.onload();

        // Reporting 10 Seconds For Toyota
        setInterval(function() {
            TaxiInteractiveUtils.reportElementInteractivity('10 Second Interval');
        }, 10000);

        this.lanBtns.on('click', function () {
            var nav = $(this).data('buttons');
            APP.selectedNavigation(nav);
        });

        this.vidPoster.on('click', function () {
            APP.selectedNavigation(nav=0);
        });

        this.mobileLink.on('click', function () {
            Channel.Interface.slideTo(2);
        });

        this.emailLink.on('click', function () {
            Channel.Interface.slideTo(3);
        });

        $(APP.video).on('ended', function () {
            APP.endVideo();
        });

        this.closeVidz.on('click', function () {
            APP.closeVideo();
        });

        this.back.on('click', function () {
            APP.backNavigation();
        });
        
        this.close.on('click', function () {
            Channel.Interface.slideTo(0, 0);
            $('#thanks-section').velocity({opacity:0, top:670}, {duration:1000});
        });

        $(APP.preVid).on('ended', function () {
            APP.preVideoEnd();
        });

        this.submitEmail.on('click', function () {
            APP.ValidateEmail();
        });

        this.submitNum.on('click', function () {
            APP.ValidateNumber();
        });

        // Name Form Slide Up 
        this.number.on('focus', function () {
            $('#form-mobile').stop(false, false).animate({ top: '140px' }, 150);
        });

        this.number.on('focusout', function () {
            $('#form-mobile').stop(true, true).animate({ top: '280px' }, 150);
        });

        // Email Form Slide Up 
        this.email.on('focus', function () {
            $('#form-email').stop(false, false).animate({ top: '140px' }, 150);
        });

        this.email.on('focusout', function () {
            $('#form-email').stop(true, true).animate({ top: '280px' }, 150);
        });
    },

    onload : function () {

        // APP.preVid.play();

        setTimeout(function () {
            APP.introSection.velocity({opacity:0, top:0}, {duration:500});
        },1900);
    },

    preVideoEnd : function () {
        APP.introSection.css('z-index', 0)
        APP.preVid.load();

        APP.heading.velocity({opacity:1, left:54 }, {duration: 500, delay: 700});
        
        APP.vidBtn.velocity({opacity:1, top:52 }, {duration: 700, delay: 1200});
        APP.quoteBtn.velocity({opacity:1, top:351 }, {duration: 700, delay: 1600});
        APP.whyBtn.velocity({opacity:1, top:460 }, {duration: 700, delay: 2000});

        // APP.mini.play();
        
    },

    selectedNavigation : function (nav) {
        if(nav == 0) {
            $(APP.video).css('z-index', 20).velocity({opacity:1, top:-52, right:-53, width:1146, height:670}, {duration:700, delay:400});
            APP.video.play();
            APP.closeVidz.velocity({opacity:1}, {duration:600, delay:1000})
            APP.closeVidz.css('display', 'block');
            TaxiInteractiveUtils.reportElementInteractivity('Video Played');
        } else if(nav == 1) {
            Channel.Interface.slideTo(1);
        } else if(nav == 2) {
            Channel.Interface.slideTo(4);
        }
    },

    closeVideo : function () {
        $(APP.video).css('z-index', 18).velocity({opacity:0, top:-3, right:5, width:418, height:195}, {duration:500, delay:400});
        APP.closeVidz.velocity({opacity:0}, {duration:600})
        setTimeout(function () {
            APP.closeVidz.css('display', 'none');
            APP.video.load();
        }, 1500);
        
        TaxiInteractiveUtils.reportElementInteractivity('Video Skipped');
    },

    endVideo : function () {
        $(APP.video).css('z-index', 18).velocity({opacity:0, top:-3, right:5, width:418, height:195}, {duration:500, delay:400});
        setTimeout(function () {
            APP.video.load();
        }, 1500);
        TaxiInteractiveUtils.reportElementInteractivity('Video Ended');
    },

    backNavigation : function () {
        var reverse = (Channel.InterfaceIndex - 1);

        if(Channel.InterfaceIndex == 3) {
            Channel.Interface.slideTo(1);
        } else {
            Channel.Interface.slideTo(reverse);
        }

        $('#form-mobile')[0].reset();
        $('#form-email')[0].reset();
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
                    clickHandler(event);
                    return true;
                }
            }
        } else {
            clickHandler(event);
            return true;
        }
    },

    EmailAction: function (id) {
        var BorderRed = "3px solid red", BorderDefault = "3px solid transparent";
        $(id).css({ 'border-bottom': BorderRed });
        setTimeout(function () { $(id).css({ 'border-bottom': BorderDefault }); }, 2000);
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
                clickHandler(event);
                return true;
            }

        } else {
            clickHandler(event);
            return true;
        }
    },

    NumberAction: function (id) {
        var BorderRed = "3px solid red", BorderDefault = "3px solid transparent";

        $('#form-mobile').css('background', 'url(./img/3-mobile/form-x.png)').velocity('transition.fadeIn');
        

        $(id).css({ 'border-bottom': BorderRed });

        setTimeout(function () {
         $(id).css({ 'border-bottom': BorderDefault });
         $('#form-mobile').css('background', 'url(./img/3-mobile/form.png)').velocity('transition.fadeIn');
        }, 4000);
    }
};

Channel.Initialize();
APP.Initialize();