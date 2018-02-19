
function Letter(word, letter){
    this.word = word,
    this.letter = letter,
    this.guessedLetter = false;
}

Letter.prototype.checkLetterInWord = function (){
    var word = this.word.split("");
    if (word.indexOf(this.letter) !== -1){
        this.guessedLetter = true;
        return this.letter;
    } else {
        return this.letter = " _ ";
    }
}

module.exports = Letter;


