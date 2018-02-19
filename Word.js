var Letter = require("./Letter.js");

function Word (word){
    this.word = word,
    this.hiddenWord = [];
    this.secretWord = "";
    this.guesses = 10;
    this.createSecretWord = function (){
        this.secretWord = this.word.split("");
        for (i = 0; i < this.secretWord.length; i++){
            if (this.secretWord[i] === " "){
               this.hiddenWord.push("   ");
            } else {
               this.hiddenWord.push(" _ ");
            }
        }
    },
    this.findLetter = function(letter){
        if (this.word[0] === letter){
            this.hiddenWord[0] = letter.toUpperCase();
        }
        for (i = 1; i < this.hiddenWord.length; i ++){
            if (this.word[i]===letter){
               this.hiddenWord[i] = letter;
            } else {
                this.guesses --;
            }
                   
        }
    }
    
};


module.exports = Word;


