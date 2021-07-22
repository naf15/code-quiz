/*=================================
 DEPENDENCIES 
 ==================================*/

/* 
Event listeners:
 - Start Quiz button
 - High scores link
 - 4 Buttons
 - Enter initials submit button
 - Go back button
 - Clear High Scores
 
Query Selectors:
 - Time left 
 - Title
 - Content 

*/

var timeLeftContent = document.querySelector('#time-left');
var title = document.querySelector('#title-section');
var content = document.querySelector('#content');
var feedbackContent = document.querySelector('#feedback');

/*=================================
DATA
==================================*/

var titles = {
        startGame : 'Coding Quiz Challenge',
        endGame : 'All done!',
        highScores : 'High Scores'
};

var gameInstructions = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!";

var buttons = {
        start : "Start Quiz",
        submit : "Submit",
        goBack : "Go Back",
        clear : "Clear High Scores"
};

var feedbackMessage = {
        correct : "Correct!",
        wrong : "Wrong!"
};

var question1 = {
        question : 'What does JSON stand for?',
        choice : ['Javascript Onset','Javascript Object Nouns','Javascript Object Notation', 'Jason'],
        answer : 'Javascript Object Notation'
};

var question2 = {
        question : 'How many primitive data types are there in Javascript?',
        choice : ['1', '2', '3', '4'],
        answer : '3'
};

var question3 = {
        question : 'What datatype in Javascript is used to store numbers?',
        choice : ['int', 'bool', 'number', 'float'],
        answer : 'number'
};

var question4 = {
        question : 'You declare a variable in Javascript using which keyword?',
        choice : ['declare', 'var', 'in', 'new'],
        answer : 'var'
};

var question5 = {
        question : 'What is a shortcut notation to increment the variable "count" by 1?',
        choice : ['count++', 'count++=', 'count*', 'count+1'],
        answer : 'count++'
};

var questionBank = [
        question1,
        question2,
        question3,
        question4,
        question5
];

var questionNum = 0;
var lastQuestionIndex = questionBank.length - 1;
var timeRemaining = 60;
var gameOver = false;

/*=================================
FUNCTIONS
==================================*/

function setTime() {
        // Sets interval in variable
        setInterval(countDown, 1000);
        timeLeftContent.textContent = timeRemaining;
        
};

function countDown () {
        timeLeftContent.textContent = timeRemaining;
        if (gameOver) {
        }
        else if (timeRemaining <= 0) {
                timeRemaining = 0;
                renderEndGameScreenScreen();
        } else {
                timeRemaining--; 
        };
}

function timePenalty () {
        if (timeRemaining - 10 > 0) {
                timeRemaining -= 10;
        } else {
                timeRemaining = 0;
        }
}

function clearScreen () {
        title.innerHTML = '';
        content.innerHTML = '';
        feedbackContent.innerHTML = '';
}

function renderStartScreen () {
                
        var startTitle = document.createElement('h1');
        var startContent = document.createElement('p');
        var startButton = document.createElement('button');
        
        startTitle.textContent = titles.startGame;
        startContent.textContent = gameInstructions;
        startButton.textContent = buttons.start;
        startButton.setAttribute('id','start-button');

        clearScreen();

        title.appendChild(startTitle);
        content.appendChild(startContent);
        content.appendChild(startButton);

        var startButton = document.querySelector('#start-button')
};

 function renderQuestionScreen (questionNum) {
        var question = document.createElement('h2');
        var choice1 = document.createElement('button');
        var choice2 = document.createElement('button');
        var choice3 = document.createElement('button');
        var choice4 = document.createElement('button');
        var currQuestion = questionBank[questionNum];
        var answer = currQuestion.answer;

        question.textContent = currQuestion.question;
        choice1.textContent = currQuestion.choice[0];
        choice2.textContent = currQuestion.choice[1];
        choice3.textContent = currQuestion.choice[2];
        choice4.textContent = currQuestion.choice[3];
        
        clearScreen();

        title.appendChild(question);
        for (var i=1; i<=4; i++) {
                content.appendChild(eval(`choice${i}`));
        };     
        return answer;
};

function renderAnswerMessage (userChoice, answer) {
        var line = document.createElement('hr');
        var message = document.createElement('p');

        feedbackContent.appendChild(line);
        feedbackContent.appendChild(message);

        if (userChoice === answer) {
                message.textContent = feedbackMessage.correct;
                
        } else {
                message.textContent = feedbackMessage.wrong;
                timePenalty();
        };
};
 


function renderEndGameScreenScreen () {
        var endTitle = document.createElement('h1');
        var endContent = document.createElement('p');
        var submitButton = document.createElement('button');
        
        gameOver = true;

        endTitle.textContent = titles.endGame;
        endContent.textContent = `Your final score is ${timeRemaining}.`;
        submitButton.textContent = buttons.submit;
        submitButton.setAttribute('id','submit-button');

        clearScreen();

        title.appendChild(endTitle);
        content.appendChild(endContent);
        content.appendChild(submitButton);
        
        

};

function renderHighScoresScreen () {

};

/*=================================
INITIALIZATION 
==================================*/

renderStartScreen();




/*============ 
Testing Code
 =============*/


 content.addEventListener('click', function (event) {
        var element = event.target;

        if (element.matches('button')) {
                if (element.innerHTML === buttons.start) {
                        setTime();
                        renderQuestionScreen(questionNum);
                }
                else if (questionNum < lastQuestionIndex) {
                        questionNum++;
                        var answer = renderQuestionScreen(questionNum);
                        renderAnswerMessage(element.innerHTML,answer)
                } else {
                        renderEndGameScreenScreen();
                        renderAnswerMessage(element.innerHTML,answer)
                };
                
        };
});