'use strict';

/*
future>
  sessions
  catch duplicates
  sum books read
  sum pages read
  turn into cards
*/

console.log('Hello');

function load() {
    console.log('Loading');

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
        const firsInput = document.getElementById('add-book').firstElementChild.childNodes[1];
        console.log(firsInput);
        firsInput.select();
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

        addBookForm.reset();
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

let myLibrary = [];

load();

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
        rowHolder.style.display = 'contents';
    }
    drawTable();
}

function addBookToLibrary(title, author, pageCount, isRead) {
    myLibrary.push(new Book(title, author, pageCount, isRead));
}

function formatTable(parent) {
    // I was unintentionally deleting the table body
    // Deletes table rows without deleting head, parent is the table element
    if (myLibrary.length > 0) {
        document.getElementById('row-holder').style.display = 'none';
    }

    while (parent.lastChild && parent.lastElementChild.id !== 'row-holder') {
        parent.removeChild(parent.lastChild); // Also deletes the comments
                                              // and mysterious #texts
    }

}

function drawTable() {


    console.log("Drawing table");
    const tableBody = document.getElementById("book-table-body");

    formatTable(tableBody);
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

        tableBody.appendChild(tr);
    });
}
console.dir(myLibrary);