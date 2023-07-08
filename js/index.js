let colorArray = ['red', 'yellow', 'blue', 'violet', 'green', 'orange'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence() {
    level++;
    $('#level-title').text('Level ' + level);
    randomNumber = Math.floor(Math.random() * 6);
    let nextColor = colorArray[randomNumber];
    gamePattern.push(nextColor);

    $("#" + nextColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(nextColor);

    // nextSequence();
}

$('.btn').click((event) => {
    userClickedColor = event.target.id;
    userClickedPattern.push(userClickedColor);
    playSound(userClickedColor);
    animatePress(userClickedColor);
    checkAnswer(userClickedPattern.lastIndexOf(userClickedColor))
})

function playSound(name) {
    var sound = new Audio('./sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(color) {
    $("#" + color).addClass('pressed');
    setTimeout(() => {
        $("#" + color).removeClass('pressed');
    }, 100)
}

$(document).keypress(() => {
    if (started == false) {
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            for (let i = 0; i < gamePattern.length; i++) {
                if (userClickedPattern[i] === gamePattern[i]) {
                    userClickedPattern = [];
                    setTimeout(() => {
                        nextSequence();
                    }, 1000);
                }
            }
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over')
        $('#level-title').text('Game Over, Press Any Key to Restart');
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}