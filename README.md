
## Introduction
HANGMAN CONSTRUCTOR.  It is a node app Game to figure out a movie from TOP 50 IMDB RATING.
The goal of the game to find a movie title and to get maximum points. Player has only 5 guesses to find the title. If player find a letter of the title, player gain 15 points. If guess letter will be wrong, 5 will be substracted from the score. Player can get a hint to find the title, but points will be substracted from the score: -10 (Year of production); -20 (Actors); - 30(Plot).
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

Enter player name to run the Game:

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

* MUSIC log the following information about the song:


	* artist(s)
	* song name
	* preview link of the song from spotify
	* album that the song is a part of
	* song name

* if no song is provided then the program will output information for the song 'The Sign' by Ace of Base by default

MOVIE category will ask:

```
What is your favorite movie, USER_NAME?

```

* MOVIES this would log the following information about the movie:


	* Title
	* Year
	* IMDB Rating
	* Country
	* Language
	* Plot
	* Actors
	* Rotten Tomatoes Rating
	* Rotten Tomatoes URL

* if no movie is provided then the program will output information for the movie 'Mr. Nobody' by default

```
RANDOM COMPUTER SELECTION
```

* The program will take the text inside of random.txt and use it to call a function of the three categories(TWEETER, MUSIC, MOVIE)
First command with the second part as it's parameter

* Currently in random.txt, the following text is there:

```
Tweeter,Music,I Want it That Way,Movie,The Green mile
```

* This would call the Tweeter, Music, Movie function and pass in my last 20 tweets or "I Want it That Way" as the song and "The Green mile" as movie

* This should work for any function and parameter you use.

* All commands and output are logged in log.txt

You can find all my projects in My Porfolio: https://varan2030.github.io/Bootstrap-Portfolio/

# Copyright
(C) Almaz Dolubaev 2018. All Rights Reserved.
