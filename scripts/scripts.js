'use strict';

console.log('Hello');

function load() {
    console.log('Loading');

    // Load table
    drawTable();

    // Open and close add book modal form
    const addBtn = document.getElementById("add-btn");
    const bgModal = document.querySelector('.bg-modal');
    console.log('addBtn', addBtn);
    console.log('bgModal', bgModal);

    // Open Modal action
    addBtn.addEventListener('click', function() {
        bgModal.style.display = "flex";
    });

    // Close modal action
    document.querySelector("#close").addEventListener("click", function() {
        bgModal.style.display = "none";
    });

    // Add Book form actions
    const addBookForm = document.getElementById("add-book");
    addBookForm.addEventListener('submit', (e) => {
        console.log('form submit');
        e.preventDefault();

        const formData = new FormData(addBookForm);

        const title = formData.get('title');
        const author = formData.get('author');
        const pageCount = formData.get('page-count');
        const isRead = formData.get('is-read');

        addBookToLibrary(title, author, pageCount, isRead);
        console.log(`title: ${title}\nauthor: ${author}\
        \nPage Count: ${pageCount}\n Read?: ${isRead}`);
        
        drawTable();
        bgModal.style.display = "none";
    });
} // End load()

let myLibrary = [
    {title: "hobbit", author: "tolkien", pageCount: 234, isRead: true},
    {title: "dragon", author: "smaug", pageCount: 43, isRead: false},
    {title: "Stuka", author: "Rudell", pageCount: 43, isRead: false},

];

load();

function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

function removeBook(title, array) {
    const index = array.findIndex(x => x.title === title);
    // findIndex returns -1 if item not found
    if (index >= 0) {
        array.splice(index, 1);
    }
}

function addBookToLibrary(title, author, pageCount, isRead) {
    myLibrary.push(new Book(title, author, pageCount, isRead));
}

function deleteChildNodes(parent) {
    while (parent.lastChild && parent.lastChild.nodeName !== 'THEAD') {
        parent.removeChild(parent.lastChild); // Also deletes the comments
                                              // and mysterious #texts
    }
}
function drawTable() {
    // Requires deleteChildNodes 
    //   consider moving out of function
    console.log("Drawing table");
    const table = document.getElementById("book-table");
    
    deleteChildNodes(table);
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
}
console.dir(myLibrary);