var Channel = {

    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    // Info Elements
    InfoClass: '.cmp-what',
    Info: 0,
    InfoIndex: 0,

    // Ingredients Elements
    IngredientsClass: '.cmp-ingredients',
    Ingredients: 0,
    IngredientsIndex: 0,

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe',
            onSlideChangeStart: function () {
                Channel.InterfaceIndex = Channel.Interface.activeIndex;

                if(Channel.InterfaceIndex == 0) {
                    APP.footer.velocity({opacity:0}, {display:'none'});
                    TaxiInteractiveUtils.reportElementInteractivity('Landing Page Viewed');
                } else if(Channel.InterfaceIndex == 1) {
                    APP.boxBtn.velocity({opacity:1, top:198}, {duration:700, delay:400});
                    APP.yay.velocity({opacity:1}, {duration:700, delay:1000});
                    APP.footer.velocity({opacity:1}, {display:'block'});
                    TaxiInteractiveUtils.reportElementInteractivity('1 Box Page Viewed');
                } else if(Channel.InterfaceIndex == 2) {
                    APP.recipeText.velocity({opacity:1}, {duration:700, delay:400});
                    APP.continue.velocity({opacity:1, right:156}, {duration:700, delay:1000});
                    TaxiInteractiveUtils.reportElementInteractivity('2 Box Page Viewed');
                } else if(Channel.InterfaceIndex == 3) {
                    APP.recipeBtn.velocity({opacity:1, top:129}, {duration:700, delay:300});
                    APP.tap.velocity({opacity:1}, {duration:700, delay:1000});
                    TaxiInteractiveUtils.reportElementInteractivity('Recipes Page Viewed');
                } else if(Channel.InterfaceIndex == 4) {
                    APP.footer.velocity({opacity:1}, {display:'block'});
                    TaxiInteractiveUtils.reportElementInteractivity('Game Page Viewed');
                } else if(Channel.InterfaceIndex == 5) {
                    APP.footer.velocity({opacity:0}, {display:'none'});
                    TaxiInteractiveUtils.reportElementInteractivity('Game Completed');
                } else if(Channel.InterfaceIndex == 6) {
                    TaxiInteractiveUtils.reportElementInteractivity('Form Page Viewed');
                } else if(Channel.InterfaceIndex == 7) {
                    TaxiInteractiveUtils.reportElementInteractivity('Success Page Viewed');
                } else if(Channel.InterfaceIndex == 8) {
                    TaxiInteractiveUtils.reportElementInteractivity('Learn Options Page Viewed');
                } else if(Channel.InterfaceIndex == 9) {
                    TaxiInteractiveUtils.reportElementInteractivity('What is UCook Page Viewed');
                } else if(Channel.InterfaceIndex == 10) {
                    TaxiInteractiveUtils.reportElementInteractivity('Recipes Ingredients Page Viewed');
                } else if(Channel.InterfaceIndex == 11) {
                    APP.video.play();
                    TaxiInteractiveUtils.reportElementInteractivity('Videos Page Viewed');
                }
            }
        });

        Channel.Info = new Swiper(Channel.InfoClass, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe', nextButton:'.next-what', prevButton:'.prev-what',
            onSlideChangeStart: function () {
                Channel.InfoIndex = Channel.Info.activeIndex;

                APP.pagination.html((Channel.InfoIndex + 1));
            }
        });

        Channel.Ingredients = new Swiper(Channel.IngredientsClass, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe', nextButton:'.next-recipes', prevButton:'.prev-recipes',
            onSlideChangeStart: function () {
                Channel.IngredientsIndex = Channel.Ingredients.activeIndex;

                APP.paginationRecipes.html((Channel.IngredientsIndex + 1));
            }
        });
    }
};

var activeVideo = 1;

var APP = {

    find : $('#lan-text'),
    boxBtn : $('.box-btn'),
    continue : $('.continue'),
    recipesbtn : $('.recipes-btn'),
    submit : $('#submit'),
    form : $('#name, #number, #email'),
    successBtn : $('.success-btn'),
    pagination : $('.pagination'),
    paginationRecipes : $('.pagination-recipes'),
    howRecipesBtn : $('.how-recipes'),
    video : document.getElementById('video'),
    vids : $('.vids'),

    // Animated Elemets
    lanImg : $('#lan-img'),
    lanText : $('#lan-text'),
    boxBtn : $('.box-btn'),
    yay : $('#yay'),
    recipeText : $('#recipe'),
    continue : $('.continue'),
    recipeBtn : $('.recipes-btn'),
    tap : $('#recipes-tap'),
    startedBtn : $('.started-btn'),
    learnBtn : $('.learn-btn'),
    abouts : $('.abouts'),
    backs : $('.backs'),
    backVideo : $('.back-video'),
    footer : $('#box-footer'),

    Initialize: function () {
        
        APP.onload();

        // Reporting 10 Seconds For Toyota
        setInterval(function() {
            TaxiInteractiveUtils.reportElementInteractivity('10 Second Interval');
        }, 10000);

        this.find.on('click', function () {
            Channel.Interface.slideTo(1);
        });

        this.boxBtn.on('click', function () {
            Channel.Interface.slideTo(2);
        });

        this.continue.on('click', function () {
            Channel.Interface.slideTo(3);
        });

        this.recipesbtn.on('click', function () {
            Channel.Interface.slideTo(4);
        });

        this.submit.on('click', function () {
            APP.ValidateInput();
        });

        this.successBtn.on('click', function () {
            Channel.Interface.slideTo(8);
        });

        this.startedBtn.on('click', function () {
            Channel.Interface.slideTo(6);
        });

        this.learnBtn.on('click', function () {
            Channel.Interface.slideTo(8);
        });

        this.abouts.on('click', function () {
            var about = $(this).data('about');
            APP.learnOptions(about);
        });

        this.backs.on('click', function () {
            Channel.Interface.slideTo(8);
        });

        this.howRecipesBtn.on('click', function () {
            Channel.Interface.slideTo(9);
        });

        this.backVideo.on('click', function () {
            Channel.Interface.slideTo(8);
            APP.video.load();
            TaxiInteractiveUtils.reportElementInteractivity('Video '+ activeVideo +' Skipped');
        });

        this.vids.on('click', function () {
            var vid = $(this).data('vids');
            APP.selectedVideo(vid);
        });

        $(APP.video).on('ended', function () {
            TaxiInteractiveUtils.reportElementInteractivity('Video '+ activeVideo +' Ended');
        });

        // Form Slide Up 
        this.form.on('focus', function () {
            $('#form').stop(false, false).animate({ top: '-220px' }, 250);
        });

        this.form.on('focusout', function () {
            $('#form').stop(true, true).animate({ top: '0px' }, 250);
        });
    },

    onload : function () {
        APP.lanImg.velocity({opacity:1}, {duration:700, delay:800});
        APP.lanText.velocity({opacity:1, top:100}, {duration:700, delay:1400});
    },

    learnOptions : function (about) {
        if(about == 1) {
            Channel.Interface.slideTo(9);
        } else if(about == 2) {
            Channel.Interface.slideTo(10);
        } else if(about == 3) {
            Channel.Interface.slideTo(11);
        }
    },

    selectedVideo : function (vid) {
        activeVideo = vid;

        APP.video.load();
        $(APP.video).attr('src', 'img/8-videos/videos/video-' + vid + '.mp4');
        APP.video.play();
        TaxiInteractiveUtils.reportElementInteractivity('Video '+ vid +' Started');
    },

    ValidateInput: function () {
        var Name = document.getElementById("name");
        var Email = document.getElementById("email");
        var Number_ = document.getElementById("number");
        var Language = badwords.indexOf(Name.value);
        var BorderRed = "4px solid red", BorderDefault = "4px solid transparent";
        var ValuesEmpty = Name.value === "" || Email.value === "" || Number_.value === "";
        var ValuesNotEmpty = Name.value !== "" || Email.value !== "" || Number_.value !== "";


        if (ValuesEmpty) {
            if (Name.value === "") APP.InputAction(Name);

            if (Email.value === "") APP.InputAction(Email);
            else if (Email.value !== "") {
                if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value))) APP.InputAction(Email);
            }
            
            if (Number_.value === "") APP.InputAction(Number_);
            else if (Number_.value !== "") {
                if(Number_.value.length !== 10) APP.InputAction(Number_);
            }

            return false;
        } else if (ValuesNotEmpty) {
            if (Name.value !== "") {
                if (!(Name.value.match(/^[A-Za-z ]+$/)) || Language !== -1) {
                    APP.InputAction(Name);
                    return false;
                }
            }

            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value)) {
                // Do Nothing
            } else {
                APP.InputAction(Email);
                return false;
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
        var BorderRed = "4px solid red", BorderDefault = "4px solid transparent";
        $(id).css({ border: BorderRed });
        setTimeout(function () { $(id).css({ border: BorderDefault }); }, 2000);
    }
};

Channel.Initialize();
APP.Initialize();
Game.Initialize();