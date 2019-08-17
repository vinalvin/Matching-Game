// // Firebase watcher .on("child_added"
// database.ref().orderByChild("counter").on("child_added", function(snapshot, prevChildKey) {
//     // storing the snapshot.val() in a variable for convenience
//     var sv = snapshot.val();

//     var $tbody = $('#highScores tbody');

//     var $tr = $('<tr>');
//     var $tdName = $('<td>').text(sv.userName);
//     var $tdCounter = $('<td>').text(sv.counter);
//     var $tdScore = $('<td>').text(sv.score);
//     var $tdDifficulty = $('<td>').text(sv.difficulty);
//     var $tdDateAdded = $('<td>').text(new Date(sv.dateAdded));

//     $tr.append($tdName, $tdCounter, $tdScore, $tdDifficulty, $tdDateAdded);

//     $tbody.append($tr);
// });

// function pushScoreToFireBase() {
//     database.ref().push({
//         userName: userName,
//         score: score,
//         counter: counter,
//         difficulty: difficulty,
//         dateAdded: firebase.database.ServerValue.TIMESTAMP
//     });
// }

// Timer;
var counter = 30;
var $span = $('#timer');
var alertedScore = false;

$span.text(counter);

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

// The function to ask their name;
var userName;

// About the number of blocks;
var rows = 3;
var cols = 4;

$('button').on('click', function() {
    // Input the user names;
    userName = $('#userName').val();

    // Different Levels;
    var level = $('#level').val()
    console.log(level)
    if (level === 'easy') {
        rows = 3;
        cols = 4;
    } else if (level === 'medium') {
        rows = 4;
        cols = 4;
    } else {
        rows = 4;
        cols = 5;
    }

    // var imageUrls = [
    //     'https://media0.giphy.com/media/l0MYNJC1oGwKLfqso/200.webp?cid=790b7611d34c1c000e51269097b60ed2641e1d871812a2fc&rid=200.webp',
    //     'https://media2.giphy.com/media/UtvkbCvOJCJtC/200w.webp?cid=790b7611361e9dda43fa5d4ceadefc1d6ffba77218c5b525&rid=200w.webp',
    //     'https://media2.giphy.com/media/k8kA7AOLFVohq/200.webp?cid=790b7611361e9dda43fa5d4ceadefc1d6ffba77218c5b525&rid=200.webp',
    //     'https://media1.giphy.com/media/cQz5MLlnP5rfa/200.webp?cid=790b7611561f26b842f49393a2fbf4e32a0542969b591acd&rid=200.webp',
    //     'https://media3.giphy.com/media/9MraLzmkWiZqM/200w.webp?cid=790b7611561f26b842f49393a2fbf4e32a0542969b591acd&rid=200w.webp',
    //     'https://media3.giphy.com/media/3ov9k4e03yTNRWTgYM/200w.webp?cid=790b7611fc7ad1db280bdc6f9bb012ccc148ab3e0adda710&rid=200w.webp'
    // ];
    var imageUrls = 'https://api.giphy.com/v1/gifs/random?api_key=N0CBgF93RZv7210eKzxfG7V8BhLtcqg0';

    var imageIdxs = [];
    for (var idx = 0; idx < rows * cols; idx++) {
        imageIdxs.push(Math.floor(idx / 2));
    }
    imageIdxs = shuffle(imageIdxs);

    function pushImages() {
        $.ajax({
            url: imageUrls,
            method: 'GET'
        }).then(function(response) {
            imageIdxs.push(response.data.images.downsized_large.url);
        })
    };

    var $container = $('.container');
    for (var row = 0; row < rows; row++) {
        var $cardRowElem = $('<div class="row"></div>');
        for (var col = 0; col < cols; col++) {
            var idx = row * cols + col;
            var $card = $('<div class="imgContainer"><img class="hide" src="' + imageUrls[imageIdxs[idx]] + '"></div>');
            $cardRowElem.append($card);
        }
        $container.append($cardRowElem);
    }

    $('.container').removeClass('hide');
    $('form').addClass('hide');

    $('#userNameGoesHere').text(userName);
    $('#h2UserNameGoesHere').removeClass('hide');

    event.preventDefault();
});

// Score Countdown;
var score = 0;
$('#score').text(score);

// How many pair to win;
var pairsToWin = 6;

// Click Function; 
var firstSrc;
var secondSrc;

// Shuffling function: enables that no two games have the same card arrangement
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

var $firstImg;
var $secondImg;

$(document).on('click', '.imgContainer', function() {

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
                    $firstImg.parent().removeClass('noClickAllowed');
                    $secondImg.parent().removeClass('noClickAllowed');
                } else {
                    score++;
                    $('#score').text(score);

                    // Position to win the game;
                    if ((score == pairsToWin) && (alertedScore == false)) {

                        alert('Your score is ' + score);
                        alertedScore = true;

                        // Let the timer stops;
                        clearInterval(interval);
                    }
                }
                // Refresh;
                firstSrc = undefined;
                secondSrc = undefined;
            }
            // The Speed when the cards turn;
        }, 750);
    };
    $img.removeClass('hide');
});