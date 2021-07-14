var buttonColors = ["red","blue","green","yellow"];

var actualSequence = [];

var userSequence = [];

var flag_started = 0;

var level = 0;

function nextSequence(){
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.round(Math.random() * 3);
  var randomColor = buttonColors[randomNumber]
  actualSequence.push(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playAudio(randomColor);
}

$(".btn").on("click",function(event){

  clickColour = this.id;
  userSequence.push(clickColour);
  userPressed(clickColour);
  playAudio(clickColour);

  var result = checkSolution(userSequence.length - 1);
  console.log(result);
  if(result === false){

    setTimeout(function(){
      var audio = new Audio("./sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
    },200);
    setTimeout(function(){
      $("body").removeClass("game-over");
    },400);
    $("h1").text("Game Over, Press any key to Restart");

    startOver();
  }

  if(userSequence.length === actualSequence.length && result === true){
    console.log("Going To Next Level");
    userSequence = [];
    setTimeout(function(){
      nextSequence();
    },1000);
  }

});

function startOver(){
  userSequence = [];
  actualSequence = [];
  level = 0;
  flag_started = 0;
  $(document).keydown(function(){
    if(flag_started === 0){
      flag_started = 1;
      nextSequence();
    }
  });
}

function checkSolution(i){
  return userSequence[i] === actualSequence[i];
}

function playAudio(fileName){
  var audio = new Audio("./sounds/"+ fileName + ".mp3");
  audio.play();
}

function userPressed(color){
  $("#" + color).addClass("pressed");
  setTimeout(function(){
    $("#" + color).removeClass("pressed");
  },100);
}


$(document).keydown(function(event){
  if(flag_started === 0){
    flag_started = 1;
    nextSequence();
  }
});


function checkAnswer(user,actual){
  for(i = 0 ; i < user.length ; i++){
    if(user[i] === actual[i]){
      continue;
    }else{
      return 0;
    }
  }
  return 1;
}
