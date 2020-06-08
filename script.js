var play = false;
var score; 
var action;
var timeRemain;
var correctResult;

var button = document.getElementById('start-reset');
button.onclick = function() {
   if(play == true) {
      location.reload(); // reload page
   } else {
      // change game mode to play
      play = true;
      score = 0;
      timeRemain = 60;
      hide('game-over');
      show('time-remaining');
      show('score-value');
      show('question');
      show('instruction');
      show('options');
      document.getElementById('score-value').innerHTML = score;
      document.getElementById('start-reset').innerHTML = 'Reset';   
      show('score');
      document.getElementById('time-remain-value').innerHTML = timeRemain;
      // start time coundown
      startCount();
      generateQA();
   }
}

// clicking on answers boxes
for (var i = 1; i<5; i++) {
   document.getElementById('box-' + i).onclick = function() {
      // check if the play is active
      if(play == true) {
         if(this.innerHTML == correctResult) {
            // correct box is clicked
            score ++;
            document.getElementById('score-value').innerHTML = score;
            hide('false');
            show('true');
            setTimeout(function(){
               hide('true');
            }, 1000);
   
            // generate new QA
            generateQA();
   
         } else { // wrong answer
            hide('true');
            show('false');
            setTimeout(function(){
               hide('false');
            }, 1000);
         }
      }
   }
}

function startCount(){
   action = setInterval(function(){
   timeRemain-= 1;
      document.getElementById("time-remain-value").innerHTML = timeRemain;
      if(timeRemain == 0) {   // game over
         stopCount();
         show('game-over');
         document.getElementById("game-over").innerHTML =
         `
            <p>Game over!</p>
            <p>Your score is: </p>
            <p class="score-display">${score}</p>
         `
         hide("time-remaining");
         hide("true");
         hide("false");
         hide('score-value');
         hide('question');
         hide('instruction');
         hide('options');
         play = false;
         document.getElementById("start-reset").innerHTML = "Start Game";
      }
   }, 1000);    
}


function stopCount() {
   clearInterval(action);
}

function show(Id) {
   document.getElementById(Id).style.display = 'block';
}

function hide(Id) {
   document.getElementById(Id).style.display = 'none';
}

function generateQA() {
   var x = 1 + Math.round(9*Math.random());
   var y = 1 + Math.round(9*Math.random());
   correctResult = x * y;

   document.getElementById('question').innerHTML = x + ' x ' + y;
   var correctPosition = 1 + Math.round(3*Math.random());
   // Fill one box with the correct answer
   document.getElementById('box-' + correctPosition).innerHTML = correctResult;
   
   var answers = [correctResult];
   
   // fill other boxes with wrong answers
   for(var i=1; i<5; i++) {
      if(i != correctPosition) {
         var wrongAnswer;
         do {
            wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
         } while (answers.indexOf(wrongAnswer)>-1)
         document.getElementById('box-'+ i).innerHTML = wrongAnswer;  
         answers.push(wrongAnswer);  
      }
   }   
}


