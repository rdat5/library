// script.js

class Book
{
    constructor(title, author, pages, haveRead)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }
}

let myLibrary =[];

const bookContainer = document.querySelector('.books');
const addBookBtn = document.querySelector('.add-book-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const formPopUp = document.querySelector('.form-popup');
const bookForm = document.querySelector('.form-container');

function getCardFromBook(book, id)
{
    let newCard = document.createElement('article');
    newCard.setAttribute('class', 'card');
    newCard.setAttribute('index', id);
    
    let newRMBtn = document.createElement('button');
    newRMBtn.textContent = 'X';
    newRMBtn.setAttribute('class', 'remove');
    newRMBtn.addEventListener("click", () =>
    {
        onRMBtnClick(id);
    });

    let newBookTitle = document.createElement('h3');
    newBookTitle.textContent = book.title;
    
    let newBookAuthor = document.createElement('p');
    newBookAuthor.textContent = book.author;
    
    let newBookPages = document.createElement('p');
    newBookPages.setAttribute('class', 'pages');
    newBookPages.textContent = book.pages + " pgs";
    
    let newBookRead = document.createElement('button');
    newBookRead.setAttribute('class', 'read-btn');
    newBookRead.addEventListener("click", () =>
    {
        onReadBtnClick(id);
    });
    if (book.haveRead)
    {
        newBookRead.textContent = "Read";
    }
    else
    {
        newBookRead.textContent = "Not yet read";
    }

    
    newCard.appendChild(newRMBtn);
    newCard.appendChild(newBookTitle);
    newCard.appendChild(newBookAuthor);
    newCard.appendChild(newBookPages);
    newCard.appendChild(newBookRead);

    return newCard;
}

function displayBooks()
{
    // Clear library display
    while (bookContainer.firstChild)
    {
        bookContainer.removeChild(bookContainer.firstChild);
    }
    
    // Populate libary display from array
    for (i in myLibrary)
    {
        bookContainer.appendChild(getCardFromBook(myLibrary[i], [i]));
    }

    // If empty tell user
    if (myLibrary.length === 0)
    {
        let emptyText = document.createElement('p');
        emptyText.textContent = "Library is empty! Add a book.";
        bookContainer.appendChild(emptyText);
    }
}

function onReadBtnClick(id)
{
    let clickedBook = myLibrary[id];
    clickedBook.haveRead = !clickedBook.haveRead;
    displayBooks();
}

function onRMBtnClick(id)
{
    let clickedBook = myLibrary[id];
    myLibrary.splice(id, 1);
    displayBooks();
}

addBookBtn.addEventListener("click", () =>
{
    formPopUp.style.display = "block";
    addBookBtn.style.display = "none";
});

cancelBtn.addEventListener("click", () =>
{
    addBookBtn.style.display = "block";
    formPopUp.style.display = "none";
});

bookForm.addEventListener("submit", function(event)
{
    event.preventDefault();
    let bookData = new FormData(bookForm);
    
    let submitTitle = bookData.get('title');
    let submitAuthor = bookData.get('author');
    let submitPages = bookData.get('pages');
    let submitRead = bookData.get('haveRead');

    myLibrary.push(new Book(submitTitle, submitAuthor, submitPages, 
                submitRead));
    
    bookForm.reset();
    displayBooks();
});
displayBooks();