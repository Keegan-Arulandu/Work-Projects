var Channel = {
    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: false, noSwipingClass: 'disable-swipe',
            onSlideChangeStart: function () {
                Channel.InterfaceIndex = Channel.Interface.activeIndex;

                if(Channel.InterfaceIndex == 1) {
                    app.texts.addClass('fadeInDown');
                    app.homeImg1.addClass('fadeInRight');
                    app.homeImg2.addClass('fadeInLeft');
                    app.infoText.addClass('fadeIn');
                } else if(Channel.InterfaceIndex == 2) {
                    app.flavourText1.addClass('fadeInDown');
                    app.flavourText2.addClass('fadeInDown');
                    app.flavourImg.addClass('fadeInUp');
                } else if(Channel.InterfaceIndex == 3) {
                    app.contactText.addClass('fadeInDown');
                } else if(Channel.InterfaceIndex == 4) {
                    main();
                }
            }
        });
    }
};

var app = {

    submit : $('#submit'),
    texts : $('.texts'),
    homeImg1 : $('.home-image-1'),
    homeImg2 : $('.home-image-2'),
    infoText : $('.info-texts'),
    contactText : $('.contact-text'),
    flavourText1 : $('.flavour-text-1'),
    flavourText2 : $('.flavour-text-2'),
    flavourImg : $('.flavour-img'),
    playBtn : $('#playbtn'),

    Initialize: function () {

        // Reporting 10 Seconds For Toyota
        setInterval(function() {
            TaxiInteractiveUtils.reportElementInteractivity('10 Second Interval');
        }, 10000);

        setTimeout(function () {
         Channel.Interface.slideTo(1);
        }, 3000);

        this.playBtn.on('click', function () {
            Channel.Interface.slideTo(4)
        });

        this.submit.on('click', function () {
            app.formValidation();
        });
    },

    formValidation: function () {
        
        var name = $('#name').val();
        var email = $('#email').val();

        if(name === '' || email === '') {

            if(name === '') {
                $('#name').css('border-color', 'red');

                setTimeout(function () { 
                    $('#name').css('border-color', 'transparent');
                }, 2000);
            }

            if(email === '') {
                $('#email').css('border-color', 'red');

                setTimeout(function () {
                    $('#email').css('border-color', 'transparent');
                }, 2000);
            }

            return false;
        } else if(name !== '' || email !== '') {

            if(!(name.match(/^[A-Za-z ]+$/))){
                $('#name').css('border-color', 'red');

                setTimeout(function () {
                    $('#name').css('border-color', 'transparent');
                }, 2000);
                return false;
            }

            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                $('#email').css({ border: "2px solid red" });

                setTimeout(function () {
                    $('#email').css({ border: "0" });
                }, 2000);

                return false;
            } else {
                clickHandler(event);
                return true;
            }
        };
    }

    // ValidateInput: function () {
    //     var Name = document.getElementById("name");
    //     var Surname = document.getElementById("surname");
    //     var Email = document.getElementById("email");
    //     var Number_ = document.getElementById("number");
    //     var BorderRed = "2px solid red", BorderDefault = "2px solid transparent";
    //     var ValuesEmpty = Name.value === "" || Surname.value === "" || Email.value === "" || Number_.value === "";
    //     var ValuesNotEmpty = Name.value !== "" || Surname.value !== "" || Email.value !== "" || Number_.value !== "";


    //     if (ValuesEmpty) {
    //         if (Name.value === "") APP.InputAction(Name);

    //         if (Surname.value === "") APP.InputAction(Surname);

    //         if (Email.value === "") APP.InputAction(Email);
    //         else if (Email.value !== "") {
    //             if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value))) APP.InputAction(Email);
    //         }
            
    //         if (Number_.value === "") APP.InputAction(Number_);
    //         else if (Number_.value !== "") {
    //             if(Number_.value.length !== 10) APP.InputAction(Number_);
    //         }

    //         return false;
    //     } else if (ValuesNotEmpty) {
    //         if (Name.value !== "") {
    //             if (!(Name.value.match(/^[A-Za-z ]+$/))) {
    //                 APP.InputAction(Name);
    //                 return false;
    //             }
    //         }

    //         if (Surname.value !== "") {
    //             if (!(Surname.value.match(/^[A-Za-z ]+$/))) {
    //                 APP.InputAction(Surname);
    //                 return false;
    //             }
    //         } 

    //         if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value)) {
    //             // Do Nothing
    //         } else {
    //             APP.InputAction(Email);
    //             return false;
    //         }

    //         if (Number_.value !== "") {
    //             if (Number_.value.length !== 10) APP.InputAction(Number_);
    //             else {
    //                 clickHandler(event);
    //                 return true;
    //             }
    //         }
    //     } else {
    //         clickHandler(event);
    //         return true;
    //     }
    // },

    // InputAction: function (id) {
    //     $(id).css({ border: BorderRed });
    //     setTimeout(function () { $(id).css({ border: BorderDefault }); }, 2000);
    // }
};

Channel.Initialize();
app.Initialize();