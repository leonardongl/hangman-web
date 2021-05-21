<h1 align="center">Hangman - The Game</h1>

> Frontend of an application for the Hangman game.<br>
> Web application built using Javascript with Vue.js.<br>
> The backend that this web application consumes can be found in the following repository [Backend](https://github.com/leonardongl/hangman-api).<br>
> If you want to know more about the Hangman game go to [Wikipedia](https://en.wikipedia.org/wiki/Hangman_(game)).

## Prerequisites
- npm >= 5.5.0
- node >= 9.3.0

## How to build
```sh
$ git clone https://github.com/leonardongl/hangman-web.git
$ cd hangman-web
$ cp .env.example .env.local
$ npm install
$ npm start
```

## How to play
- You can build the application and play offline or simply access [Hangman](http://hangman.noronhaleao.com.br/).
- When starting the game, you will be given a random word to guess.
- Click on one of the letters you think you might have in the word.
- If the letter exists in the word, it will appear in the exact position and will be green in the virtual keyboard.
- If the letter does not exist, it will appear in the <b>INCORRECT LETTERS</b> area and will be red in the virtual keyboard.
- If you miss 7 letters, YOU LOSE!

## Author
👤 **Leonardo Augusto Noronha Leão**

* Github: [@leonardongl](https://github.com/leonardongl)
* LinkedIn: [@leonardo-augusto-noronha-leão](https://linkedin.com/in/leonardo-augusto-noronha-leão-338bb118b)