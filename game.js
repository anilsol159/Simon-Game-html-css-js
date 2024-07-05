
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}
function playSound(key){
    var url;
    switch (key) {
        case "red":
            url = "sounds/red.mp3";
            break;
        case "green":
            url = "sounds/green.mp3";
            break;
        case "blue":
            url = "sounds/blue.mp3";
            break;
        case "yellow":
            url = "sounds/yellow.mp3";
            break;
        case "wrong":
            url = "sounds/wrong.mp3";
            break;
    
        default:
            break;
    }
    var audio = new Audio(url);
    audio.play();
    pressAnimation(key);
}

function pressAnimation(key){
    $("#"+key).addClass("pressed");
    setTimeout(function () {
        $("#"+key).removeClass("pressed");
    },100);
    
}

function start(){
    var randomChosenColor = buttonColours[nextSequence()];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text(`Level ${level}`);
}

function check(){
    for(var i=0;i<userClickedPattern.length;i++){
        if(gamePattern[i]!=userClickedPattern[i]){
            playSound('wrong');
            $("#level-title").text(`Game Over, Press Any Key to Restart`);
            started = false;
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 100);
            gamePattern = [];
            userClickedPattern = [];
            level = 0;
            return ;
        }
    }
    
    if(gamePattern.length===userClickedPattern.length){
        level += 1;
        setTimeout(() => {
            start();
        }, 300);
        userClickedPattern = [];
    }
    
    
}

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var buttonColours = ["red","blue","green","yellow"];
var level = 1;



$(document).keydown(function (event) {
    if(!started){
        start();
        started = true;
    }
    
})

$(".btn").on("click",function () {
    if(started){
        var chosenColor = $(this).attr('id');
        userClickedPattern.push(chosenColor);
        playSound(chosenColor);
        check();    
    }
    
})
