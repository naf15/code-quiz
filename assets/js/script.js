/*=================================
 DEPENDENCIES 
 ==================================*/

/* Event listeners:
 - Start Quiz button
 - High scores link
 - 4 Buttons
 - Enter initials submit button
 - Go back button
 - 

*/

/*=================================
DATA
==================================*/

var titles = {
        startGame : 'Coding Quiz Challenge',
        endGame : 'All done!',
        highScores : 'High Scores'
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

/*=================================
FUNCTIONS
==================================*/

/*=================================
INITIALIZATION 
==================================*/

button has data attribute with each answer to the question 
question button counter 

question data attribute

 choices in 


+