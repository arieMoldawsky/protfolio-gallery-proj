'use strict';

const STORAGE_KEY = 'BooksInStock';

var gBooks = _createBooks();
var gSortBy = '';


function sortBooks() {
    if (gSortBy === 'name') {
        gBooks.sort(function (a, b) {
            var A = a.name.toUpperCase();
            var B = b.name.toUpperCase();
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
        });
    }
    if (gSortBy === 'price') {
        gBooks.sort(function (a, b) {
            var A = a.price;
            var B = b.price;
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
        });
    }
    return gBooks;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function incDecRate(bookId, upOrDown) {
    var idx = getBookIdxById(bookId);
    if (upOrDown === 'up' && gBooks[idx].rate !== 10) gBooks[idx].rate++;
    else if (upOrDown === 'down' && gBooks[idx].rate !== 0) gBooks[idx].rate--;
    saveToStorage(STORAGE_KEY, gBooks)
    return gBooks;
}

function bookDetails(bookId) {
    var idx = getBookIdxById(bookId);

    if (idx === 0) return makeLorem();
    else if (idx === 1) return makeLorem(80);
    else if (idx === 2) return makeLorem(60);
    else return makeLorem(40);
}

function bookImg(bookId) {
    var addedBookImg = 'img/added-book.jpg';
    var idx = getBookIdxById(bookId);
    if (idx >= 0 && idx < 3) return gBooks[idx].image; 
    else return addedBookImg;
}

function updateBook(bookId, price) {
    var idx = getBookIdxById(bookId);
    gBooks[idx].price = price;
    saveToStorage(STORAGE_KEY, gBooks)
    return gBooks;
}

function addBook(name, price) {
    var newBook = _createBook(name, price);
    gBooks.push(newBook);
    saveToStorage(STORAGE_KEY, gBooks)
}

function removeBook(bookId) {
    var idx = getBookIdxById(bookId);
    gBooks.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gBooks)
    return gBooks;
}

function getBookIdxById(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    return idx;
}

function getBookById(bookId) {
    var theBook = gBooks.find(function (book) {
        return book.id === bookId;
    })
    return theBook;
}

function getBooksList() {
    return gBooks;
}

function _createBook(name, price, img) {
    return {
        id: makeId(),
        name,
        price,
        image: img,
        rate: 0
    }
}

function _createBooks() {
    if (loadFromStorage(STORAGE_KEY)) return loadFromStorage(STORAGE_KEY);
    var books = [];
    books.push(_createBook('Learning Laravel', 18.90, 'img/book1.jpg'));
    books.push(_createBook('Beginning with Laravel', 6.65, 'img/book2.jpg'));
    books.push(_createBook('Java for developers', 7.20, 'img/book3.jpg'));
    saveToStorage(STORAGE_KEY, books);
    return books;
}