'use strict';


function onInit() {
    renderBooks();
}

function onSortBooks(sortBy) {
    setSort(sortBy);
    sortBooks();
    renderBooks();
}

function onIncDecRate(bookId, upOrDown) {
    incDecRate(bookId, upOrDown);
    renderRateInModal(bookId);
}

function renderRateInModal(bookId) {
    var elModalRating = document.querySelector('.modal .rating-container');
    var book = getBookById(bookId);
    elModalRating.innerHTML = `<div>Rate Book: &nbsp; </div><button class="minus-btn" onclick="onIncDecRate('${book.id}', 'down')">-</button>
    <div class="rating-counter">${book.rate}</div>
    <button class="plus-btn" onclick="onIncDecRate('${book.id}', 'up')">+</button>`
}

function onExitBookDetails() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    elModal.style.opacity = '0';
}

function onBookDetails(bookId) {
    var elModal = document.querySelector('.modal');
    var book = getBookById(bookId);
    var img = bookImg(bookId);
    var txt = bookDetails(bookId)
    elModal.innerHTML = `<button class="exit-modal" onclick="onExitBookDetails()">X</button>`;
    elModal.innerHTML += `<img class="modal-img" src="${img}">`;
    elModal.innerHTML += `<p class="book-details-txt">${txt}</p>`;
    elModal.innerHTML += `<div class="rating-container">
    <div>Rate Book: &nbsp; </div>
    <button class="minus-btn" onclick="onIncDecRate('${book.id}', 'down')">-</button>
    <div class="rating-counter">${book.rate}</div>
    <button class="plus-btn" onclick="onIncDecRate('${book.id}', 'up')">+</button> </div>`
    elModal.style.display = 'block';
    elModal.style.opacity = '0.95';
    renderBooks();
}

function onUpdateBook(bookId) {
    var price = +prompt('Insert Book\'s New Price:');
    if (!price) return;
    updateBook(bookId, price);
    renderBooks();
}

function onAddBook() {
    var elNameInput = document.querySelector('.book-name-input');
    var elPriceInput = document.querySelector('.book-price-input');
    var name = elNameInput.value;
    var price = +elPriceInput.value;
    addBook(name, price);
    renderBooks();
    elNameInput.value = '';
    elPriceInput.value = '';
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks();
}

function renderBooks() {
    var elTableBody = document.querySelector('.books-table tbody')
    var books = getBooksList();
    var strHTML = '';
    books.forEach(function (book) {
        strHTML += `<tr><td>${book.id}</td><td>${book.name}</td><td>${book.price} $</td>
      <td><button class="read-btn action-btn" onclick="onBookDetails('${book.id}')">Read</button> |
      <button class="update-btn action-btn" onclick="onUpdateBook('${book.id}')">Update</button> |
      <button class="delete-btn action-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td></tr>`;
    })
    elTableBody.innerHTML = strHTML;
}