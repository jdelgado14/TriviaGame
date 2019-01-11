$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
    //counters
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 12,
    timerOn: false,
    timerId : '',
    // questions and answers
    questions: {
      q1: 'Which is the youngest American city?',
      q2: 'Whats the longest river in the world?',
      q3: 'Which ocean lies to the east coast of the united states?',
      q4: 'How many great lakes are there?',
      q5: 'Which is the worlds highest mountain?',
      q6: 'Which is the longest river in the US?',
      q7: 'What desert is the largest in the world?',
      q8: 'Which US state is the Grand Canyon located in?',
      q9: 'Which is the largest body of water?',
      q10: 'What is Earths largest country?',
    },
    options: {
      q1: ['Killeen,TX', 'Jacksonville,NC', 'Paramount,CA', 'Layton,UT'],
      q2: ['Congo', 'Nile', 'Amazon', 'Yangtze'],
      q3: ['Atlantic', 'Pacific', 'Eastern', 'Indian'],
      q4: ['3', '4', '5', '6'],
      q5: ['Mount Everest', 'Kilimanjaro','Makalu','K2'],
      q6: ['Missouri river','Colorado river','Mississippi river','Yukon river'],
      q7: ['Sonora', 'Kalahari', 'Mojave','Sahara'],
      q8: ['Arizona','New Mexico','Wyoming','Nevada'],
      q9: ['Atlantic Ocean','Baltic Sea','Indian Ocean','Pacific Ocean'],
      q10: ['Europe','Asia','Antartica','Africa'],


    },
    answers: {
      q1: 'Jacksonville,NC',
      q2: 'Nile',
      q3: 'Atlantic',
      q4: '5',
      q5: 'Mount Everest',
      q6: 'Mississippi river',
      q7: 'Sahara',
      q8: 'Arizona',
      q9: 'Pacific Ocean',
      q10: 'Asia'
    },
    //starts game
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // area of play
      $('#game').show();
      
      // renew results
      $('#results').html('');
      
      // add value to the timer
      $('#timer').text(trivia.timer);
      
      // remove start button and show time remaining
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask question
      trivia.nextQuestion();
      
    },
    nextQuestion : function(){
      
      trivia.timer = 12;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // keeps timer at same pace
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1200);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
      // decrement counter and count unanswered when timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1200);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thanks for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Play Again?</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }
