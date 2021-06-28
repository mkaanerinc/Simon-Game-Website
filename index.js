
    //Variables

var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

  // Button Clicked

$(".btn").on("click",function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

  // Start Game

$(document).keypress(function(){

  if(!started){

      $("#level-title").text("Level" + " " + level);
      nextSequence();
      started = true;
  }
});

    // Random Color

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level" + " " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

    // Sound

function playSound(name) {

  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

 // Animated to Button

function animatePress(currentColor) {

  $("#" + currentColor).addClass(".pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass(".pressed");
  },100);
}

  // Checking Answer

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if(gamePattern.length === userClickedPattern.length) {

        setTimeout(function() {
          userClickedPattern = [];
          nextSequence();
        },1000);

      }
    }else {

        playSound("wrong");

      $("body").addClass(".game-over");

      setTimeout(function() {
        $("body").removeClass(".game-over");
      },200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}

 // Start over

 function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
 }
