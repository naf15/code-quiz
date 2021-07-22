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

var timeLeft = document.querySelector('#time-left');
var title = document.querySelector('title-section');
var content = document.querySelector('#content');
var feedback = document.querySelector('#feedback');

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

/*=================================
FUNCTIONS
==================================*/

function renderStartScreen () {
                
        var startTitle = document.createElement('h1');
        var startContent = document.createElement('p');
        var startButton = document.createElement('button');
        
        startTitle.textContent = titles.startGame;
        startContent.textContent = gameInstructions;
        startButton.textContent = buttons.start;

        title.appendChild(startTitle);
        content.appendChild(startContent);
        content.appendChild(startButton);
};

 function renderQuestionScreen (questionNum) {
        var question = document.createElement('h2');
        var choice1 = document.createElement('button');
        var choice2 = document.createElement('button');
        var choice3 = document.createElement('button');
        var choice4 = document.createElement('button');
        var currQuestion = questionBank[questionNum];

        question.textContent = currQuestion.question;
        
        choice1.textContent = currQuestion.choice[0];
        choice2.textContent = currQuestion.choice[1];
        choice3.textContent = currQuestion.choice[2];
        choice4.textContent = currQuestion.choice[3];
        
        title.innerHTML = '';
        content.innerHTML = '';

        title.appendChild(question);
                
        for (var i=1; i<=4; i++) {
                content.appendChild(eval(`choice${i}`));
        };     
};

function renderAnswerMessage (userChoice, answer) {
        var line = document.createElement('br');
        var message = document.createElement('p');



        if (userChoice === answer) {

        }
}
 
content.addEventListener('click', function (event) {
        var element = event.target;

        if (element.matches('button')) {
                if (element.innerHTML === currQuestion.answer) {

                };
        }
})

// function endGameScreenScreen () {

// };

// function renderHighScoresScreen () {

// };

/*=================================
INITIALIZATION 
==================================*/

renderStartScreen();
renderQuestionScreen (questionNum);