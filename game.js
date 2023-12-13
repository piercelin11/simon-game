
let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;

//玩家點擊按鈕的回饋並紀錄
$(".btn").click(function(event){
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    soundAndAnimation(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//點擊隨機按鍵遊戲開始
$(document).keydown(function(){
    if($("h1").text() === "Press A Key to Start" || $("h1").text() === "Game Over, Press Any Key to Restart"){
        nextSequence();
    }
})

//遊戲隨機製造序列的下一個顏色並記錄
function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    soundAndAnimation(randomChosenColour);

    level++;
    $("h1").text("Level " + level);

}

//控制按鈕聲音與按鈕動畫
function soundAndAnimation(color){
    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);

    //控制聲音
    switch(color){
        case "blue":
            let blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
        break;

        case "green":
            let greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
        break;

        case "red":
            let redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
        break;

        case "yellow":
            let yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
        break;

        default:
    }
}

//確認答案是否正確
function checkAnswer(number){
        if(gamePattern[number]===userClickedPattern[number]){
            if(gamePattern[number]===userClickedPattern[number] && gamePattern.length===userClickedPattern.length){
                setTimeout(function(){
                    nextSequence()
                }, 1000);
                userClickedPattern = [];
            }
        }
        else{
            let gameOverSound = new Audio("sounds/wrong.mp3");
            gameOverSound.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }

}

//遊戲結束
function startOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

