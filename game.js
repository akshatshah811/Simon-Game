var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];

$(".btn").on("click",function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    // var audio = new Audio("sounds/"+userChosenColour+".mp3");
    // audio.play();
    playSound(userChosenColour);
    animatePress(userChosenColour);
    var lastIndex=userClickedPattern.length-1;
    checkAnswer(lastIndex);
});

var gameStarted=false;
var level =0;


$(document).keypress(function(){
    if(!gameStarted){
        
        // $("#level-title").text("Level "+level);
        
        nextSequence();
        gameStarted=true;
    }
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber= Math.floor(Math.random()*4);

    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour)
    // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    // audio.play();

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    // $("#"+currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}



function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart.");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}
