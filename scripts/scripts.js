'use strict';

console.log('Hello');

function load() {
    console.log('Loading');
    const table = document.getElementById("book-table");
    myLibrary.forEach( (book) => {
        const tr = document.createElement("tr");
        for (const key in book) {
            const td = document.createElement("td");
            td.innerText = book[key];
            tr.appendChild(td);
        }
        // TODO
        // create checkbox
        // add associated event handler
        // append to row
        // remove prop from Book obj
        table.appendChild(tr);
    });

    const addBtn = document.getElementById("add-btn");
    const bgModal = document.querySelector('.bg-modal');
    console.log('addBtn', addBtn);
    console.log('bgModal', bgModal);
    addBtn.addEventListener('click', function() {
        bgModal.style.display = "flex";
    });

    document.querySelector("#close").addEventListener("click", function() {
        bgModal.style.display = "none";
    });
    //const tr = document.createElement("tr"); // in i loop
    //const td = document.createElement("td"); // in j loop
}

let myLibrary = [
    {title: "hobbit", author: "tolkien", pageCount: 234, isRead: true, remove: "x"},
    {title: "dragon", author: "smaug", pageCount: 43, isRead: false, remove: "x"},
    {title: "Stuka", author: "Rudell", pageCount: 43, isRead: false, remove: "x"},

];

load();

const Book = {
    init: function(title, author, pageCount, isRead) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.isRead = isRead;
        return this;
    },
}

function removeBook(title, array) {
    const index = array.findIndex(x => x.title === title);
    // findIndex returns -1 if item not found
    if (index >= 0) {
        array.splice(index, 1);
    }
}

function addBookToLibrary() {
    // TODO change input method
    const title = prompt("title");
    const author = prompt("author");
    const pageCount = prompt("page count");
    const isRead = prompt("Did you read it");
    myLibrary.push(Object.create(Book).init(title, author, pageCount, isRead));
}

console.dir(myLibrary);