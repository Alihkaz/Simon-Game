// 

// constants and declaring arrays 


// colours array
var Colours =["red", "blue", "green", "yellow"];
// pattern array ,which is the starting pattern generated randomly by the game to start with
var gamePattern=[];
// the pattern that is genrated by the user when he clicks on the cards 
var userClickedPattern=[];
// the variable used to detect the first key press
var started = false;
// a level variable to increase it later on the game !
var level = 0;

// ///////////////////////////////////////////////////////////////////////////////////////////////////////

// creating a function that play a sound according to the given parameter 

function playSound(name){

    var btnSound=new Audio("sounds/"+name+".mp3");
    btnSound.play();

}

// playing wrong sound effect if the user clicked on a wrongpattern

function playwrong(){
    var wrgSound=new Audio("sounds/wrong.mp3");
    wrgSound.play();
}



// starting the game:
//  checking if the user pressed on the first key to start the game , then we stop the function
//  by turning the started into true , and then generating a random color to follow through next sequence 
$(document).on("keypress",function(){

    if (!started) {
          $("#level-title").text("Level " + level);
            nextSequence();
            started=true;
                  }  
                  });




// generating a random number to extract a random color from the colours array according to a random index
// to start the game with , then adding that colour to the game pattern to compare it later on ! 

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var ranN=(Math.random())*4;
    var n=(Math.floor(ranN))
    // selecting a random colour
    var randomColour=Colours[n];

    // adding the random colour to the game pattern array !
    gamePattern.push(randomColour);

    // Animating the starting button!
    $("#"+randomColour).fadeOut(100).fadeIn(100);
    
    // playing the sound of the first button to follow along , by creating a new object from the constructer function "Audio" .
    playSound(randomColour);

}







// detecting when any button is clicked , then adding the colour pattern into the user pattern , then
//  when the user clicks the button , we call the check color button to compare the game pattern with the user pattern   :

$(".btn").on("click",function(){

    var clickedColour=this.id ;
    userClickedPattern.push(clickedColour);

    playSound(clickedColour);
    animatePress(clickedColour);
    checkAnswer(userClickedPattern.length-1);
    
                              })


// animating the pressed button by the user after starting the game 
function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

    // removing the class after 1 second
    setTimeout(function() {$("#"+currentColour).removeClass("pressed");}, 100);
    
}




// a function that compares the pattern provided by the game with the pattern that the user follows ! 


function checkAnswer(currentindex) {

    if (gamePattern[currentindex] === userClickedPattern[currentindex]) {

      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playwrong();
      $("body").addClass("game-over");

      // removing the class after 1 second
      setTimeout(function() {$("body").removeClass("game-over");}, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart ");

      startOver();

    }

}


// restarting the game

function startOver(){

    level=0;
    gamePattern=[];
    started=false;

}


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// notes about how this code is working :
// when a click event happens , the started variable becomes true , calling by that nextsequence() ,
// then the code keep listening to keyboard , but with no effect since the started condition turned true ,
// and we only call next sequence when the condition is false , preventing by that the restarting of the 
// game every time we click on keyboard , instead we listen for it for one time ! 
// how ever , after the function is called , it start adding the first color pattern to be followed by the user 
// , in addition to producing sound (playsound) and animating the button (animatepress) that will be clicked by the user
// after that , we startlistening to the user click event , when he clicks , we animate the clicked button and produce
// sound according to the clicked color , then we extract the color identity from the button , and here to vheck answer 
//  we called the function checkanswer() providing it the currentlevel of the user , then we used this level to compare the
// items of the two arrays , the gamepattern that is produced first by nextsequence(),and the userpattern that 
// includes the color we extracted
// when he clicks on the button , we compare the last index of the game array to that of user array , i.e
// it first check the colors , when for example the array of gamepattern is yellow green red , when I click on yellow
// it will have an index of 0 after adding it to user array , then it check if for index=0 the game array is yellow , if so
//  then it continue checking for length 
// if the length of user array is still lessthen the length of the array for the game pattern 
// then it continue listening for keyboard , when I click on green 
// it will have an index of 1 after adding it to userarray , then it check if for index=1 the game array is green , if so
//  then it continue checking for length 
// if the length of user array is still lessthen the length of the array for the game pattern 
// then it continue listening for keyboard 
// / then it continue listening for keyboard , when I click on red
// it will have an index of 2 after adding it to userarray , then it check if for index=2 the game array is red , if so
//  then it continue checking for length 
// if the length of user array is still lessthen the length of the array for the game pattern 
// then it continue listening for keyboard 
// but here the length of the array will be equal , and the userpattern is identical to the gamepattern
// so here it will call next sequence , restarting the user array , to be filled with a new pattern
// created by the nextsequence that adds to the old array !
// however if the clicked color dont match the last color in gamepattern , or the length is greater , then the game is restarted
// through the startoverfunction! 