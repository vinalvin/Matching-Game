var counter = 30;
var $span = $('h2 span');

$span.text(counter);

//Create countdown timer
function decreaseTimer() {
    matchingCounter--;
    $('.timer').text('Time Remaining: ' + matchingCounter + ' seconds');

    if (matchingCounter == 0) {
        $('.timer').text('Game over!!')
        clearInterval(timer)
    }
}

var interval = setInterval(decreaseTime, 1 * 1000);

var openedCards = [];
var first;
var second;

$('.imgContainer').on('click', function() {
    var $img = $(this).children().eq(0);

    var src = $img.attr('src');

    if (first == undefined) {
        first = src;
    } else if (second == undefined) {
        second = src;
    }

    if ((first != undefined) && (second != undefined)) {
        console.log(first == second);
        first = undefined;
        second = undefined;
    }

    function pairTwo() {
        openedCards.push(this);
        var cards = openedCards.length;
        if (cards === 2) {
            if (openedCards[0].type === openedCards[1].type) {
                matched();
            } else {
                unmatched();
            }
        }
    };

    function matched() {
        openedCards[0].classList.add("match", "disabled");
        openedCards[1].classList.add("match", "disabled");
        openedCards[0].classList.remove("show", "open");
        openCards = [];
    }

    function unmatched() {
        opened[0].classList.add("unmatched");
        opened[1].classList.add("unmatched");
    }

    // } else if (first != second) {
    //     unmatched();
    // }

    // function unmatched() {
    //     $('img').addClass('hide');
    //     $('img').addClass('hide');
    // }

    $img.removeClass('hide');

});