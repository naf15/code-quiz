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
var highScoreLink = document.querySelector('#high-scores')

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
var lastAnswer, currAnswer;



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
                return;
        }
        else if (timeRemaining <= 0) {
                timeRemaining = 0;
                renderEndGameScreen();
        } else {
                timeRemaining--; 
        };
};

function timePenalty () {
        if (timeRemaining - 10 > 0) {
                timeRemaining -= 10;
        } else {
                timeRemaining = 0;
        };
};

function clearScreen () {
        title.innerHTML = '';
        content.innerHTML = '';
        feedbackContent.innerHTML = '';
};

function renderStartScreen () {          
        
        questionNum = 0;
        timeRemaining = 60;
        gameOver = false;
        
        var startTitle = document.createElement('h1');
        var startContent = document.createElement('p');
        var buttonDiv = document.createElement('div');
        var startButton = document.createElement('button');
        
        startTitle.textContent = titles.startGame;
        startContent.textContent = gameInstructions;
        startButton.textContent = buttons.start;
        startButton.setAttribute('id','start-button');

        clearScreen();

        title.appendChild(startTitle);
        content.appendChild(startContent);
        content.appendChild(buttonDiv);
        buttonDiv.appendChild(startButton);

        var startButton = document.querySelector('#start-button');
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
        
        // console.log('renderQuestion answer ' + answer)
        
        return answer;
};

function renderAnswerMessage (userChoice, answer) {   
        feedbackContent.innerHTML = ''; 

        var line = document.createElement('hr');
        var message = document.createElement('p');

        feedbackContent.appendChild(line);
        feedbackContent.appendChild(message);

        if (userChoice === answer) {
                console.log('correct')
                message.textContent = feedbackMessage.correct;
                message.setAttribute('id','correct');
                
        } else {
                console.log('wrong')
                console.log('user choice: ' + userChoice)
                console.log('answer: ' + answer)

                message.textContent = feedbackMessage.wrong;
                message.setAttribute('id','wrong');

                timePenalty();
        };
        setTimeout(function() {message.textContent = ' '; }, 2000);
};
 


function renderEndGameScreen () {
        var endTitle = document.createElement('h1');
        var endContent = document.createElement('p');
        var highScoreDiv = document.createElement('div');
        var initialInput = document.createElement('input');
        var submitButton = document.createElement('button');
        
        gameOver = true;

        endTitle.textContent = titles.endGame;
        endContent.textContent = `Your final score is ${timeRemaining}. \n Enter your initials below:`;
        initialInput.textContent = 'Your initials here';
        submitButton.textContent = buttons.submit;
        
        //initialsDiv.setAttribute('id', 'initials-form');
        submitButton.setAttribute('id','submit-button');
        initialInput.setAttribute('name','initials');

        title.innerHTML = '';
        content.innerHTML = '';

        title.appendChild(endTitle);
        content.appendChild(endContent);
        content.appendChild(highScoreDiv);
        highScoreDiv.appendChild(initialInput);
        highScoreDiv.appendChild(submitButton);
           
        submitButton.addEventListener('click', function () {
                var highScore = {
                        initials: initialInput.value,
                        score: timeRemaining,
                };
                var highScores = JSON.parse(localStorage.getItem('highScores'));
                
                if (!highScores) {
                        highScores = [];
                };
                
                // console.dir(highScores);
                highScores.push(highScore);
                localStorage.setItem('highScores', JSON.stringify(highScores));
        });

};

function renderHighScoresScreen () {
        clearScreen();
        var endTitle = document.createElement('h1');
        var highScoreDiv = document.createElement('div');
        var buttonDiv = document.createElement('div');
        var highScoresTable = document.createElement('table');
        var goBackButton = document.createElement('button');
        var clearHighScoresButton = document.createElement('button');

        highScoreDiv.setAttribute('id', 'high-scores-table');
        var highScores = JSON.parse(localStorage.getItem("highScores")); // get this globally and updated down here

        for (var i=0; i<highScores.length; i++) {
                var newRow = document.createElement('tr');
                var newName = document.createElement('td');
                var newScore = document.createElement('td');
                
                newName.textContent = highScores[i].initials;
                newScore.textContent = highScores[i].score;

                newRow.appendChild(newName);
                newRow.appendChild(newScore);
                highScoresTable.appendChild(newRow);
        }

        endTitle.textContent = titles.highScores;
        // JSON.parse(localStorage.getItem("highScore")).initials;
        // console.log(JSON.parse(localStorage.getItem("highScore")));
        goBackButton.textContent = buttons.goBack;
        clearHighScoresButton.textContent = buttons.clear;

        title.appendChild(endTitle);
        highScoreDiv.appendChild(highScoresTable);
        buttonDiv.appendChild(goBackButton);
        buttonDiv.appendChild(clearHighScoresButton);
        content.appendChild(highScoreDiv);
        content.appendChild(buttonDiv);

};

function clearHighScore() {
        // Save related form data as an object
        localStorage.setItem('highScores', JSON.stringify([]));
}




/*=================================
INITIALIZATION 
==================================*/

renderStartScreen();

content.addEventListener('click', function (event) {
        var element = event.target;
        var buttonType = element.innerHTML;

        if (element.matches('button')) {
                if (buttonType === buttons.start) {
                        setTime();
                        lastAnswer = renderQuestionScreen(questionNum);
                } else if (buttonType === buttons.goBack){
                        renderStartScreen();       
                } else if (buttonType === buttons.clear){
                        event.preventDefault();
                        clearHighScore();
                        renderHighScoresScreen();
                } else if (questionNum < lastQuestionIndex) {
                        questionNum++;                
                        currAnswer = renderQuestionScreen(questionNum);
                        renderAnswerMessage(buttonType, lastAnswer); 
                        lastAnswer = currAnswer;
                                 
                } else if (buttonType != buttons.submit) {
                        renderAnswerMessage(buttonType, lastAnswer);
                        renderEndGameScreen();
                } else {
                        renderHighScoresScreen();
                };
        };
});

highScoreLink.addEventListener('click', function () {
        renderHighScoresScreen()
});