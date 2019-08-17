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
// After the user clicks on two divs, check if those images are equal;

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

    $img.removeClass('hide');
});