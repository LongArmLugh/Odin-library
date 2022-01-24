'use strict';
// TODO goto line 144
console.log('Hello');

function load() {
    console.log('Loading');

    // Load toggle
    // GIVEN that a page is loading the js file and eventlisteners are being assigned
    // WHEN it's time to load the isRead checks
    // THEN add the toggleReads function to the toggle read-check class elements
    const toggleReads = document.getElementsByClassName("read-check");
    for (const el of toggleReads) {
        console.log("isRead: " + el.checked);
    }
    
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
        console.table(formData);

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
    {title: "hobbit", author: "tolkien", pageCount: 234, isRead: "on"},
    {title: "dragon", author: "smaug", pageCount: 43, isRead: "on"},
    {title: "Stuka", author: "Rudell", pageCount: 43, isRead: null},
];

load();

//Function and Object definitions
// function toggleRead(event) {
//     console.log(event.currentTarget.firstChild.checked);
//     console.log(`click ${Object.entries(book)}`);
//     console.log(`td: ${event.currentTarget.firstChild.checked}`);
//     if (event.currentTarget.firstChild.checked) {
//         book.isRead = "on"; // to make this work refference myLibrary and search the appropriate object.
//     } else {
//         book.isRead = null;
//     }
//     console.log(`click ${Object.entries(book)}`);
// }

function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

function removeBook(event) {
    const index = event.currentTarget.firstChild.dataset.id;
    const rowHolder = document.getElementById('row-holder');
    console.log(index);
    if (index >= 0) {
    myLibrary.splice(index, 1);
    }
    console.log(myLibrary.length);
    if (myLibrary.length === 0) {
        rowHolder.style.display = 'block';
    }
    drawTable();
}

function addBookToLibrary(title, author, pageCount, isRead) {
    myLibrary.push(new Book(title, author, pageCount, isRead));
}

function formatTable(parent) {
    // Deletes table rows without deleting head, parent is the table element
    // while (parent.lastChild && parent.lastChild.nodeName !== 'THEAD') {
    //     parent.removeChild(parent.lastChild); // Also deletes the comments
    //                                           // and mysterious #texts
    // // }
    while (parent.lastChild && parent.lastChild !== 'row-holder' && parent.lastChild.nodeName !== 'THEAD') {
        parent.removeChild(parent.lastChild); // Also deletes the comments
                                              // and mysterious #texts
    }
}

// const rowHolder = document.getElementById('row-holder');
// rowHolder.style.display = 'none';

function drawTable() {


    console.log("Drawing table");
    const table = document.getElementById("book-table");

    formatTable(table);
    myLibrary.forEach( (book, index) => {
        const tr = document.createElement("tr");
        for (const [prop, val] of Object.entries(book)) {
            const td = document.createElement("td");
            if (prop === "isRead") {
                console.log(`reading isRead for ${book}`);
                td.innerHTML = `<input type="checkbox" class="read-check" data-id="${index}">`;
                td.addEventListener("click", (event) => { // Tried making this a seperate 
                                                            // handler but failed to pass more params
                    console.log(event.currentTarget.firstChild.checked);
                    console.log(`click ${Object.entries(book)}`);
                    console.log(`td: ${td.firstChild.checked}`);
                    if (td.firstChild.checked) {
                        book.isRead = "on";
                    } else {
                        book.isRead = null;
                    }
                    console.log("event: ", event);
                    console.log(`click ${Object.entries(book)}`);
                });
                tr.appendChild(td);
            } else {
                td.innerText = val;
                tr.appendChild(td);
            }
        }

        // Adding remove button and associated event listener
        const td = document.createElement("td");
        td.innerHTML = `<button class="remove-btn" data-id=\"${index}\">Remove</button>`;
        td.addEventListener("click", removeBook); // By using data-id we avoid duplicates
        tr.appendChild(td);

        table.appendChild(tr);
    });
}
console.dir(myLibrary);