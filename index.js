var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel;
var started = false;
var gameOver = false;


// next sqeunce()
function nextSqeunce() {
  var randomNumber = Math.round(Math.random() * 3);
  console.log(randomNumber);

  var randomChosenColor = buttonColours[randomNumber];
  console.log(randomChosenColor);

  gamePattern.push(randomChosenColor);
  console.log(gamePattern)

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor)

  userClickedPattern = [];
  currentLevel = 0
  level++;
  $("#level-title").text("Level " + level)
  console.log("Level:" + level);
  console.log(currentLevel);
}

// playsound
function playSound(sound) {
  var audio = new Audio("UI/" + sound + ".mp3");
  audio.play();
}

//listen function

$(".btn").on("click", function() {
  if(started){
    var userChosenColor = (this.id);
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    animatePressed(this.id);
    console.log(userClickedPattern);
    console.log("Level:" + level);
    console.log(currentLevel);
    checkAnswer();
  }
})

function restart() {

}




//pressed animation
function animatePressed(key) {
  $("#" + key).addClass("pressed");

  setTimeout(function() {
    $("#" + key).removeClass("pressed");
  }, 100)
}

//start game function - reset
$("body").on("keypress", function() {
  if (!started) {
    $("#level-title").text("Level " + level)
    nextSqeunce();
    started = true;
  }
  if(gameOver) {
    $("body").removeClass("game-over");
    $("#level-title").html("Press A Key to Start");
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    currentLevel;
    started = false;
    gameOver = false;
  }
})

// check answer

function checkAnswer() {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("true");
    currentLevel++;
    if (currentLevel == level) {
      setTimeout(nextSqeunce, 1000);
    }
  } else {
    $("#level-title").html("Game Over - Level " + level + "<br>Press any Key to Restart")
    playSound("wrong");
    $("body").addClass("game-over")
    gameOver = "true"
  }
}



/*

  switch (key) {
    case "blue":
     var blue = new Audio("UI/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("UI/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("UI/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("UI/yellow.mp3");
      yellow.play();
      break;

    default:
      colsole.log(key);
  }
} */
