require("dotenv").config();
const keys = require("./keys.js");
const inquirer = require('inquirer');
const fs = require("fs");
const moment =  require('moment');
var OmdbApi = require('omdb-api-pt');
var omdb = keys.omdb;
var time = moment().format('lll');
var playerName = "";

var omdb = new OmdbApi({
    apiKey: omdb.apiKey,
    baseUrl: 'https://omdbapi.com/'
})

var Word = require('./Word');
var Letter = require('./Letter');
var letterChoices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
var guessWordList = ['The Shawshank Redemption', 'The Godfather', 'The Dark Knight', 'Pulp Fiction',
    'Fight Club', 'The Lord of the Rings', 'Forrest Gump', 'Inception', 'Goodfellas', ' The Matrix',
    'Seven Samurai', 'City of God', 'The Silence of the Lambs', 'Life Is Beautiful', 'The Usual Suspects',
    'Spirited Away', 'Saving Private Ryan', 'Interstellar', 'American History X', 'The Green Mile',
    'Once Upon a Time in the West', 'Psycho', 'The Intouchables', 'The Pianist', 'The Departed',
    'Terminator', 'Back to the Future', 'Whiplash', 'Gladiator', 'The Lion King', 'The Prestige', 'Memento',
];
var title = guessWordList[Math.floor(Math.random()*guessWordList.length)]; //select the random movie from the list
var newWord = new Word(title.toLowerCase());
var guessedLetter = [];
var guesses = 5;
var points = 0;
newWord.createSecretWord();

// Player name input 
function enterPlayer() {

    inquirer.prompt([{
        type: "input",
        message: "Please, enter your name: ",
        name: 'name'
    }]).then(function (response) {
        playerName = response.name
        if (playerName) {
            console.log('Player: ' + playerName)
            startGame();
        }
    })
}

//Select options between "Start the Game" and "Players score log"
function startGame() {
    inquirer.prompt([{
        type: "list",
        message: "That is the Game 'Find a movie from TOP 50 IMDB RATING'\n  MENU:",
        name: 'option',
        choices: ["Start the Game", "Players score log"]
    }]).then(function (response) {
        if (response.option === "Start the Game") {
            selectOptions();
        } else {
            fs.readFile("log.txt", "utf8", function(error, data) {
                if (error) {
                  return console.log(error);
                }
                console.log(data);
              
              });
              startGame();
        }

    })
}

//Select options between "Guess the letter" and "Get a hint"
function selectOptions() {

    console.log('Guesses left: ' + guesses);
    console.log('\n==========================================================================');
    console.log(newWord.hiddenWord.join(""));
    console.log('==========================================================================\n');

    inquirer.prompt([{
        type: "list",
        message: "Select option: ",
        name: 'option',
        choices: ["Guess the letter", "Get a hint"]
    }]).then(function (response) {
        if (response.option === "Guess the letter") {
            guessTheLetter();
        } else {
            getHint();
        }

    })
}

//Check for unsolved letters in the movie
function guessTheLetter() {

    if (guesses >= 1) {

        inquirer.prompt([{
            type: "input",
            message: "Guess the letter",
            name: 'letter'
        }]).then(function (response) {
            var letter = response.letter.toLowerCase();
            var newLetter = new Letter(newWord.word, letter);
            newLetter.checkLetterInWord();
            newWord.findLetter(letter);
            findWord(letter);

        })
    } else {
        console.log('\nSorry,' + playerName + '!!! You lost!!! Try again!!!\n');
        console.log('The movie\'s title was: ' + title);
    }
}

function findWord(letter) {
    if (letterChoices.indexOf(letter) !== -1 && guessedLetter.indexOf(letter) == -1 && letter != "") {
        if (newWord.hiddenWord.indexOf(" _ ") !== -1) {
            if (newWord.word.indexOf(letter) !== -1 || newWord.hiddenWord.indexOf(letter.toUpperCase()) !== -1) {
                points += 15;
                console.log('Points: ' + points);
            } else if (newWord.hiddenWord.indexOf(letter) == -1 && guessedLetter.indexOf(letter) == -1) {
                guesses--;
                points -= 5;
                console.log('Points: ' + points);
            };
            guessedLetter.push(letter);
            console.log("Guessed letters: " + guessedLetter.toString());
            selectOptions();
        } else {
            points += 10;
            console.log('\n==========================================================================');
            console.log(title);
            console.log('==========================================================================\n');
            console.log('Congratulation, ' + playerName + '!!! You win!!! You\'ve got ' + points + ' points!');
            fs.appendFile("log.txt", "\n"  + "Points: " + points + " | Player: " + playerName +  " | Date: " + time,
            function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
      
    } else if (letterChoices.indexOf(letter) !== -1) {
        console.log("Guessed letters: " + guessedLetter.toString() + ' \nLetter already guessed');
        selectOptions();
    } else {
        console.log('That\'s not a letter. Please enter letter!');
        selectOptions();
    }

}

//Make a movie request to OMDB API to get a hint.  Subtract points if you use a hint. 
function getHint() {

    omdb.byId({
            title: title,
            imdb: 'tt0485947',
            type: 'movie',
            plot: 'full',
            tomatoes: true,
        }).then(function (res) {
            inquirer.prompt([{
                type: "list",
                message: "Select option: ",
                name: 'option',
                choices: ["1. Year (-10 points)", "2. Actors (-20 points)", "3. Plot (-30 points)", "4. Back"]
            }]).then(function (response) {
                if (response.option === "1. Year (-10 points)") {
                    console.log("Year: " + res.Year);
                    points -= 15;
                } else if (response.option === "2. Actors (-20 points)") {
                    console.log("Actors: " + res.Actors);
                    points -= 25;
                } else if (response.option === "3. Plot (-30 points)"){
                    console.log("Plot: " + res.Plot);
                    points -= 40;
                } 
                console.log('Points: ' + points);
                selectOptions();
            })

        })
        .catch(err => console.error(err))
};

enterPlayer();