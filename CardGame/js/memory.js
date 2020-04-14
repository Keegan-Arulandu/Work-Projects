var cards = [{
    name: "card-1",
    img: "img/2game/1.png",
    id: 1,
},{
    name: "card-2",
    img: "img/2game/2.png",
    id: 2
},{
    name: "card-3",
    img: "img/2game/3.png",
    id: 3
},{
    name: "card-4",
    img: "img/2game/4.png",
    id: 4
},{
    name: "card-5",
    img: "img/2game/5.png",
    id: 5
},{
    name: "card-6",
    img: "img/2game/6.png",
    id: 6
},
];

var levelTwo = [{
    name: "card-1",
    img: "img/2game/1.png",
    id: 1,
    },{
    name: "card-2",
    img: "img/2game/2.png",
    id: 2
    },{
    name: "card-3",
    img: "img/2game/3.png",
    id: 3
    },{
    name: "card-4",
    img: "img/2game/4.png",
    id: 4
    },{
    name: "card-5",
    img: "img/2game/5.png",
    id: 5
    },{
    name: "card-6",
    img: "img/2game/6.png",
    id: 6
    },{
    name: "card-7",
    img: "img/2game/queen.png",
    id: 7
    },{
    name: "card-8",
    img: "img/2game/king.png",
    id: 8
    },
];


var Memory = {

    adSection: document.getElementById("ad-section"),
    video: document.getElementById("ad-video"),
    vidCount: 0,

    init: function (num) {
        this.cardsArray = [];
        this.cardsArray = num == 1 ? cards : levelTwo;
        this.$game = $(".game");
        this.$success = $("#cmp-win");
        this.$restartButton = $(".restart");
        this.cardsArray = this.cardsArray.concat(this.cardsArray);
        this.shuffleCards(this.cardsArray);
        this.setup();

        $(Memory.video).on('ended', function () {
            TweenMax.to(Memory.adSection, 0.5, {css:{zIndex:-1, opacity:0}});
            Memory.adComplete();
        });
    },

    shuffleCards: function (cardsArray) {
        this.$cards = $(this.shuffle(this.cardsArray));
        this.$restartButton.on("click", $.proxy(this.reset, this));
    },

    setup: function () {
        $('.game div').remove(); 
        this.html = this.buildHTML();
        this.$game.html(this.html);
        this.$memoryCards = $(".card");
        this.binding();
        this.guess = null;
    },

    binding: function () {
        this.$memoryCards.on("click", this.cardClicked);
    },

    cardClicked: function () {
        var _ = Memory;
        var $card = $(this);

        if (!$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
            $card.find(".inside").addClass("picked");
            if (!_.guess) {
                _.guess = $(this).attr("data-id");
            } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                $(".picked").addClass("matched");
                _.guess = null;
            } else {
                _.guess = null;
                setTimeout(function () {
                    $(".picked").removeClass("picked");
                }, 600);
            } if ($(".matched").length == $(".card").length) {
                _.win();
            }
        }
    },

    win: function () {
        clearInterval(timer_id);
        $('section').hide();
        Memory.$success.show();
        // Memory.adPlay();
        _Memory.levelTwo_setup(2);
        _Memory.reporting_game('succes');
        _Memory.levelCount = 1;
    },

    hideSuccess: function () {
        this.$success.hide();
    },

    reset: function () {
        this.hideSuccess();
        this.shuffleCards(this.cardsArray);
        this.setup();
        this.$game.show("slow");
    },

    shuffle: function (array) {
        var counter = array.length, temp, index;

        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    },

    buildHTML: function () {
        var frag = '';
        this.$cards.each(function (k, v) {
            frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
                <div class="front"><img src="'+ v.img + '"\
                alt="'+ v.name + '" /></div>\
                <div class="back"><img src="img/2game/back.png"\
                /></div></div>\
                </div>';
        });

        return frag;
    },


    adPlay: function() {
    
    Memory.video.setAttribute("src", "img/Ads/ad-"+ (Memory.vidCount + 1) +".mp4");
    TweenMax.to(Memory.adSection, 0.6, {css:{zIndex:25, opacity:1}});
    Memory.video.play();

    // hubapi.reportActivity("video", store.data.vidsIds[_Memory.vidCount], "started");
    },

    adComplete: function() {
    
        // hubapi.reportActivity("video", store.data.vidsIds[_Memory.vidCount], "completed");
    
        if(Memory.vidCount == 0) {
            Memory.vidCount = 1;
        } else {
            Memory.vidCount = 0;
        }
    
        Memory.video.setAttribute("src", "img/Ads/ad-"+ (Memory.vidCount + 1) +".mp4");
    
        },
};

