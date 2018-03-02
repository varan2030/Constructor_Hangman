
## Introduction
HANGMAN CONSTRUCTOR.  It is a node app Game to figure out a movie from TOP 50 IMDB RATING.
The goal of the game to find a movie title and to get maximum points. Player has only 5 guesses to find the title. If the player finds a letter of the title, player gain 15 points. If guess letter will be wrong 5 points will be subtracted from the score. The player can get a hint to find the title, but points will be subtracted from the score: -10 (Year of production); -20 (Actors); - 30(Plot).
## Setup
#### 0. Clone the repo

#### 1. Run npm install, and the following packages should be installed:

* [OMDB API](http://www.omdbapi.com)

#### 2. Create a file named keys.js and store it somewhere safe (you will need to reference it):

* Inside keys.js insert the following code:

``` JavaScript

exports.omdb = {
  apiKey: process.env.OMDB_API_KEY
};

```

## Run the application

The syntax to run the program is:
```
index.js

```

Enter a player name to run the Game:

```
? Please, enter your name:

```

Select "Start the Game" or "Players score log" in the MAIN MENU:

```
 ? That is the Game 'Find a movie from TOP 50 IMDB RATING'
  MENU:
> Start the Game
  Players score log

```
* Now you've started the Game.
"Start the Game" selection suggest two option:
"Guess the letter" or "Get a hint"

```
? Select option:
> Guess the letter
  Get a hint

```

* "Guess a letter" allow to type a letter. If the letter is right the Player gain 15 points or loses 5 points if the letter is wrong.

```
? Select option:  Guess the letter
? Guess the letter t
Points: 15
Guessed letters: t
Guesses left: 5

==========================================================================
T _  _     _  _  _  _  _ t _  _  _
==========================================================================

```


* Player can select "Get a hint" to get information about the movie, but points will be subtracted from the score: -10 (Year of production); -20 (Actors); - 30(Plot). 



```
? Select option:  Get a hint
? Select option:
> 1. Year (-10 points)
  2. Actors (-20 points)
  3. Plot (-30 points)
  4. Back

```

* Player has 5 guesses to find the movie title and win. 

```
? Select option:  Guess the letter
? Guess the letter f

==========================================================================
The Godfather
==========================================================================

Congratulation, Henry!!! You win!!! You've got 120 points!

```

* If player win the game the player's name and score are logged to log.txt

```
? That is the Game 'Find a movie from TOP 50 IMDB RATING'
  MENU: (Use arrow keys)
> Start the Game
  Players score log
...
Points: 170 | Player: elen | Date: Feb 19, 2018 2:48 PM
Points: 140 | Player: Liri | Date: Feb 19, 2018 2:57 PM
Points: 120 | Player: Henry | Date: Feb 19, 2018 7:26 PM
```


You can find all my projects in My Portfolio: https://varan2030.github.io/Bootstrap-Portfolio/

# Copyright
(C) Almaz Dolubaev 2018. All Rights Reserved.
