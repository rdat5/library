// script.js
let myLibrary =[];

function Book(title, author, pages, haveRead)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.getInfo = function()
    {
        return `title: ${title}, author: ${author}, pages: ${pages}, haveRead: ${haveRead}`;
    }
}