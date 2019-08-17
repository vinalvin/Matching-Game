// Timer;
var counter = 30;
var $span = $('h2 span');

$span.text(counter);

function decreaseTime() {
    counter--;
    $span.text(counter);

    if (counter == -1) {
        $span.text('Time is up');
        clearInterval(interval);
    }
}

var interval = setInterval(decreaseTime, 1 * 1000);

// Click Function; 

var firstSrc;
var secondSrc;

var $firstImg;
var $secondImg;

$('.imgContainer').on('click', function() {

    clearInterval(timer);

    var $img = $(this).children().eq(0);

    var src = $img.attr('src');

    // After the user clicks on two divs, check if those images are equal;

    if (firstSrc == undefined) {
        firstSrc = src;
        $firstImg = $img;
    } else if (secondSrc == undefined) {
        secondSrc = src;
        $secondImg = $img;
    }
    // If the last two images clicked on match, it would keep them turned over; else, keep them hidden; 
    var timer = setTimeout(function() {

        if ((firstSrc != undefined) && (secondSrc != undefined)) {
            if (firstSrc != secondSrc) {
                $firstImg.addClass('hide');
                $secondImg.addClass('hide');
            };

            firstSrc = undefined;
            secondSrc = undefined;
        }
    }, 650);

    $img.removeClass('hide');
});