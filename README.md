# Tic-Tac-Toe

![build status](https://travis-ci.org/jiahaog/tictactoe.svg)

A Tic-Tac-Toe game with React and an unbeatable AI.

## Introduction

I wanted to implement a pure client side Javascript version of a [Tic-Tac-Toe AI](http://neverstopbuilding.com/minimax) with the Minimax algorithm.

I ended up trying to figure out ES6 with Babel, Gulp and React in addition to that.

## Usage

### Installation

With [Node.js](https://nodejs.org):

```bash
$ git clone https://github.com/jiahaog/tictactoe.git
$ cd tictactoe

# Install dependencies
$ npm install
```

## Module Development

The core game logic is written in Node.js, and compiled with Babel. This means we can test these modules separately from the browser, with these commands below.

The compiled module files are built to `/lib` for development purposes.

### Building

```bash
# Do this before running any files in `/lib`
$ npm run build
```

### Other Commands
```bash
# watch and build es6 source files in `/src` to `/lib`
$ npm run watch

# run compiled files, etc.
$ node lib/js/game/implementation/vsAi.js

# Run two player cli game
$ npm run two-player

# Run vs AI cli game
$ npm run vs-ai
```

### Tests

```bash
$ npm test
```
## Webpage development

Gulp will help us to compile and Browserify all the Javascript modules into `./dist`, and the final game can be viewed by opening `./dist/index.html` after `gulp build` has been completed.

You need gulp installed globally to build the webpage.

```bash
$ npm install --global gulp
```

### Commands

```bash
# build files to `/dist`
$ gulp build

# Watch files with browserSync
$ gulp watch

# deployment to GitHub Pages
$ gulp build && gulp deploy
```

## Todo
- Banter
- WebWorkers
