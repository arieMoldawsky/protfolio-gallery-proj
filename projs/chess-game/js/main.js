'use strict';

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gPrevSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var size = 8;
    var board = [];
    // TODO: build the board 8 * 8
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            if (i === 1) board[i][j] = PAWN_WHITE;
            else if (i === 6) board[i][j] = PAWN_BLACK;
            else board[i][j] = '';
        }
    }
    board[0][0] = board[0][7] = ROOK_WHITE;
    board[0][1] = board[0][6] = KNIGHT_WHITE;
    board[0][2] = board[0][5] = BISHOP_WHITE;
    board[0][3] = KING_WHITE;
    board[0][4] = QUEEN_WHITE;

    board[7][0] = board[7][7] = ROOK_BLACK;
    board[7][1] = board[7][6] = KNIGHT_BLACK;
    board[7][2] = board[7][5] = BISHOP_BLACK;
    board[7][3] = KING_BLACK;
    board[7][4] = QUEEN_BLACK;
    // console.table(board);

    board[4][4] = QUEEN_WHITE;

    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // TODO: figure class name
            // var className = 'white';
            var className = ((i + j) % 2 === 0) ? 'white' : 'black';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                'class="    ' + className + '">' + cell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {
    // console.log(elCell);

    // TODO: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        console.log('moving piece!');
        movePiece(gPrevSelectedElCell, elCell);
        cleanBoard();
        return;
    }
    cleanBoard();


    elCell.classList.add('selected');
    gPrevSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j];
    // console.log(cellCoord, piece);

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord);
            break;
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord);
            break;
    }
    // console.log(possibleCoords);
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
    // TODO: use: getCellCoord to get the coords, move the piece
    // update the MODEl, update the DOM
    // console.log('moving!', elFromCell, elToCell);
    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);
    // console.log('moving from', fromCoord, 'to', toCoord);
    var piece = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    elFromCell.innerText = '';

    gBoard[toCoord.i][toCoord.j] = piece;
    elToCell.innerText = piece;
}

function markCells(coords) {
    // TODO: query select them one by one and add mark 
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var selector = getSelector(coord);
        var elTd = document.querySelector(selector);
        elTd.classList.add('mark');
        // console.log('marking:', elTd);
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    // console.log(strCellId);
    var coord = {};
    var parts = strCellId.split('-');
    coord.i = +parts[1]
    coord.j = +parts[2];
    return coord;
}



function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j;
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];
    // TODO: handle PAWN
    var direction = isWhite ? 1 : -1;

    res.push({
        i: pieceCoord.i + direction,
        j: pieceCoord.j
    });

    if (isWhite && pieceCoord.i === 1 || !isWhite && pieceCoord.i === 6) {
        res.push({
            i: pieceCoord.i + (direction * 2),
            j: pieceCoord.j
        });
    }

    // console.log('got coord:', pieceCoord, 'isWhite?', isWhite, direction);
    // console.log(res);

    return res;
}



function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    var i = pieceCoord.i;
    for (var j = pieceCoord.j + 1; j < 8; j++) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var i = pieceCoord.i;
    for (var j = pieceCoord.j - 1; j >= 0; j--) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var j = pieceCoord.j;
    for (var i = pieceCoord.i + 1; i < 8; i++) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var j = pieceCoord.j;
    for (var i = pieceCoord.i - 1; i >= 0; i--) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var i = pieceCoord.i - 1;
    for (var j = pieceCoord.j + 1; i >= 0 && j < 8; j++) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    // TODO: 3 more directions - the Bishop 
    i = pieceCoord.i - 1;
    for (var j = pieceCoord.j - 1; i >= 0 && j >= 0; j--) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (var j = pieceCoord.j - 1; i < 8 && j >= 0; j--) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (var j = pieceCoord.j + 1; i < 8 && j < 8; j++) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    return res;
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];

    return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];

    for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
        for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
            var coord = { i: i, j: j };
            if (!isEmptyCell(coord) || (i === pieceCoord.i && j === pieceCoord.j)) continue;
            res.push(coord);
        }
    }
    return res;
}

function getAllPossibleCoordsQueen(pieceCoord) {
    var res = [];

    var i = pieceCoord.i - 1;
    for (var j = pieceCoord.j + 1; i >= 0 && j < 8; j++) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i - 1;
    for (var j = pieceCoord.j - 1; i >= 0 && j >= 0; j--) {
        var coord = { i: i--, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (var j = pieceCoord.j - 1; i < 8 && j >= 0; j--) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (var j = pieceCoord.j + 1; i < 8 && j < 8; j++) {
        var coord = { i: i++, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    var i = pieceCoord.i;
    for (var j = pieceCoord.j + 1; j < 8; j++) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var i = pieceCoord.i;
    for (var j = pieceCoord.j - 1; j >= 0; j--) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var j = pieceCoord.j;
    for (var i = pieceCoord.i + 1; i < 8; i++) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    var j = pieceCoord.j;
    for (var i = pieceCoord.i - 1; i >= 0; i--) {
        var coord = { i: i, j: j };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res;
}
