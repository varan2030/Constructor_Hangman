require("dotenv").config();
const keys = require("./keys.js");
const inquirer = require('inquirer');
const lodash = require('lodash');
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
var title = guessWordList[Math.floor(Math.random()*guessWordList.length)];
var newWord = new Word(title.toLowerCase());
var guessedLetter = [];
var guesses = 5;
var points = 0;

function takeHint() {

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
                choices: ["Year (-10 points)", "Actors (-20 points)", "Plot (-30 points)"]
            }]).then(function (response) {
                if (response.option === "Year (-10 points)") {
                    console.log("Year: " + res.Year);
                    points -= 10;
                } else if (response.option === "Actors (-20 points)") {
                    console.log("Actors: " + res.Actors);
                    points -= 20;
                } else {
                    console.log("Plot: " + res.Plot);
                    points -= 30;
                }
                console.log('Points: ' + points);
                selectOptions();
            })

        })
        .catch(err => console.error(err))
};

newWord.createSecretWord();

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
                points += 10;
                console.log('Points: ' + points);
            } else if (newWord.hiddenWord.indexOf(letter) == -1 && guessedLetter.indexOf(letter) == -1) {
                guesses--;
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

    } else {
        console.log('That\'s not a letter. Please enter letter!');
        selectOptions();
    }

}

function startGame() {
    inquirer.prompt([{
        type: "list",
        message: "That is the Game 'Find a movie of TOP 50 IMDB'\nMENU:",
        name: 'option',
        choices: ["Start the Game", "Players log"]
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
        }

    })
}


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

function selectOptions() {

    console.log('Guesses left: ' + guesses);
    console.log('\n==========================================================================');
    console.log(newWord.hiddenWord.join(""));
    console.log('==========================================================================\n');

    inquirer.prompt([{
        type: "list",
        message: "Select option: ",
        name: 'option',
        choices: ["Guess the letter", "Take a hint"]
    }]).then(function (response) {
        if (response.option === "Guess the letter") {
            guessTheLetter('\nFigure out the Movie title.\n');
        } else {
            takeHint();
        }

    })
}
enterPlayer();