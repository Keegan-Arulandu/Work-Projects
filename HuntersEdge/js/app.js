var Channel = {
    InterfaceID: '#interface',
    Interface: 0,
    InterfaceIndex: 0,

    Initialize: function () {
        Channel.Interface = new Swiper(Channel.InterfaceID, {
            speed: 200, noSwiping: true, noSwipingClass: 'disable-swipe',
            onSlideChangeEnd: function () {
                Channel.InterfaceIndex = Channel.Interface.activeIndex;

                if(Channel.InterfaceIndex == 0) {
                    TaxiInteractiveUtils.reportElementInteractivity('Landing Page Viewed');
                } else if(Channel.InterfaceIndex == 1) {
                    TaxiInteractiveUtils.reportElementInteractivity('Instrutions Page Viewed');
                } else if(Channel.InterfaceIndex == 2) {
                    TaxiInteractiveUtils.reportElementInteractivity('Game Page Viewed And Started');
                } else if(Channel.InterfaceIndex == 3) {
                    TaxiInteractiveUtils.reportElementInteractivity('Game Won Form Page Viewed');
                }
            }
        });
    }
};

var APP = {

    bottle : $('.bottle'),
    texts : $('.texts'),
    yesNo : $('.yes, .no'),
    yes : $('.yes'),
    no : $('.no'),
    starts : $('.start'),
    number : document.getElementById('number'),
    items : $('.items'),
    submit : $('#submit'),
    home : $('.close-form, .return, .home'),
    quit : $('.home'),
    againBtn: $('.again-btn'),
    againSection: $('#again-section'),
    back : $('.no-btn'),
    noSection: $('#no-section'),

    Initialize: function () {

        APP.onload();

        // Reporting 10 Seconds For Toyota
        setInterval(function() {
            TaxiInteractiveUtils.reportElementInteractivity('10 Second Interval');
        }, 10000);
        
        this.yes.on('click', function () {
            Channel.Interface.slideTo(1);
        });

        this.no.on('click', function () {
            APP.noSection.velocity({opacity:1, top:0}, {duration:700, delay:200, display:'block'});
            TaxiInteractiveUtils.reportElementInteractivity('No Button Selected');
        });

        this.back.on('click', function () {
            APP.noSection.velocity({opacity:0, top:670}, {duration:600, delay:200, display:'none'});
        });

        this.starts.on('click', function () {
            obj.game();
            Channel.Interface.slideTo(2);
        });

        this.items.on('click', function () {
            var active = $(this).data('digits');
            APP.renderKeypad(active);
        });

        this.submit.on('click', function () {
            APP.ValidateInput();
        });

        this.home.on('click', function () {
            Channel.Interface.slideTo(0);
        });

        this.quit.on('click', function () {
            Channel.Interface.slideTo(0);
            obj.gameCompleted();
        });

        this.againBtn.on('click', function () {
            APP.againSection.velocity({opacity:0, top:670}, {duration:700, delay:200, display:'none'});
            obj.game();
            TaxiInteractiveUtils.reportElementInteractivity('Tried Game Again');
        });
    },

    onload : function () {
        // APP.bottle.velocity({opacity:1}, {duration:700, delay:600});
        APP.texts.velocity({opacity:1, top:52}, {duration:700, delay:1200});
        APP.yesNo.velocity({opacity:1, bottom:121}, {duration:700, delay:1600});
    },

    renderKeypad : function (active) {
        active = parseFloat(active);

        // $('.item-' + active).velocity({opacity:1}, {duration:100});
        // $('.item-' + active).velocity({opacity:0}, {duration:100, delay:100});

        if(active == 10) {
            $('#number').val( function (index, value) {
                return value.substr(0, value.length -1);
            });
        } else if(active == 11) {
            APP.number.value = "";
        } else if(APP.number.value.length == 10) {
            return false;
        } else {
            APP.number.value += active;
        }
    },

    ValidateInput: function () {
        // var Name = document.getElementById("name");
        // var Surname = document.getElementById("surname");
        // var Email = document.getElementById("email");
        var Number_ = document.getElementById("number");
        // var Language = badwords.indexOf(Name.value);
        var BorderRed = "6px solid red", BorderDefault = "6px solid transparent";
        var ValuesEmpty = Number_.value === "";
        var ValuesNotEmpty = Number_.value !== "";


        if (ValuesEmpty) {
            
            if (Number_.value === "") APP.InputAction(Number_);
            else if (Number_.value !== "") {
                if(Number_.value.length !== 10) APP.InputAction(Number_);
            }

            return false;
        } else if (ValuesNotEmpty) {
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