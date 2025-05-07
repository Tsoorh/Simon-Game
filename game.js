var gamePattern = [];
var userClickPattern = [];
var isFirstTime = true;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keydown(function (event) {
  if (isFirstTime) {
    nextSequence();
    isFirstTime = false;
  }
});

$(".btn").click(function () {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  userClickPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  animatePress(randomChosenColor);
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
  return randomNumber;
}

function fadeChosenColour() {
  var randomChosenColor = buttonColours[nextSequence()];
  $("#" + randomChosenColor)
    .fadeOut(150)
    .fadeIn(150);
  playSound(randomChosenColor);
}

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");
} else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong")
    resetGame();
  }
  if (currentLevel + 1 === gamePattern.length) {
    userClickPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}


function resetGame() {
    gamePattern = [];
    userClickPattern = [];
    isFirstTime = true;
    level = 0;
    $("h1").text("Press A Key to Start");
  }