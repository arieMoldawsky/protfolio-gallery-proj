'use strict';

var shuffledNums = [];
var count = 1;
var timeInterval;
var timeCount;



function newGame() {
    shuffledNums = [];
    count = 1;
    resetTime()
    numsArr();
    createBoard();
}

function resetTime() {
    var htmlTime = document.querySelector('.game-time');
    clearInterval(timeInterval);
    timeCount = 0;
    htmlTime.innerText = 'Game Time: ' + timeCount;
}


function gameTime() {
    var htmlTime = document.querySelector('.game-time');
    timeCount = 0;
    timeInterval = setInterval(function () {
        timeCount++;
        htmlTime.innerText = 'Game Time: ' + timeCount;
    }, 1000);
}

function clickNumber(button) {
    if (+button.innerText === count) {
        button.style = 'background-color: gray';
        count++;
    }
    if (+button.innerText === 1) {
        gameTime();
    }
    if (+button.innerText === 16) {
        clearInterval(timeInterval)
    }
}


function createBoard() {
    var elBoard = document.querySelector('tbody');
    var idx = 0;
    var htmlStr = '';
    for (var i = 0; i < 4; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < 4; j++) {
            htmlStr += '<td><button id="' + idx + '" onclick="clickNumber(this)">' + shuffledNums[idx] + '</button></td>';
            idx++;
        }
        htmlStr += '</tr>';
    }
    elBoard.innerHTML = htmlStr;
}



function numsArr() {
    for (var i = 1; i <= 16; i++) {
        shuffledNums.push(i);
    }
    var randIdx;
    var temp;
    for (var i = shuffledNums.length - 1; i > 0; i--) {
        randIdx = getRandIntInc(0, shuffledNums.length - 1);
        temp = shuffledNums[i];
        shuffledNums[i] = shuffledNums[randIdx];
        shuffledNums[randIdx] = temp;
    }
}


function getRandIntInc(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}