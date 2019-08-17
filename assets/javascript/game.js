// Timer;
var counter = 30;
var $span = $('#timer');

$span.text(counter);

//Alerted the Score;
//Not really understand this part;
var alertedScore = false;

function decreaseTime() {
    if ((counter == 0) && (alertedScore == false)) {
        alert('Your score is ' + score);
        alertedScore = true;
    }

    counter--;
    $span.text(counter);

    if (counter == -1) {
        $span.text('Time is up');
        clearInterval(interval);
    }
}

var interval = setInterval(decreaseTime, 1 * 1000);

// Score Countdown;
var score = 0;
$('#score').text(score);

// How many pair to win;
var pairsToWin = 6;

// Click Function; 
var firstSrc;
var secondSrc;

var $firstImg;
var $secondImg;

$('.imgContainer').on('click', function() {

    // If either one is empty;
    if ((firstSrc == undefined) || (secondSrc == undefined)) {

        clearInterval(timer);

        var $img = $(this).children().eq(0);

        // Disable clicking on the last image you clicked on
        $img.addClass('noClickAllowed');

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

            // Both are not empty;
            if ((firstSrc != undefined) && (secondSrc != undefined)) {
                if (firstSrc != secondSrc) {
                    $firstImg.addClass('hide');
                    $secondImg.addClass('hide');

                    // Disable clicking on the last image you clicked on
                    $firstImg.removeClass('noClickAllowed');
                    $secondImg.removeClass('noClickAllowed');
                } else {
                    score++;
                    $('#score').text(score);

                    // Position to win the game;
                    if ((score == pairsToWin) && (alertedScore == false)) {

                        alert('Your score is ' + score);
                        alertedScore = true;

                        clearInterval(interval);
                    }
                }
                firstSrc = undefined;
                secondSrc = undefined;
            }
        }, 650);
    };
    $img.removeClass('hide');
});