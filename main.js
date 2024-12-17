const myLibrary = [];

class Book {
  constructor(name, author, pages, read){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(library, name, author, pages, read) {
  library.push(new Book(name, author, pages, read));
}

function displayBooks(library){
  let display = document.querySelector("#library-display");
  while (display.firstChild){
    display.removeChild(display.lastChild);
  }
  for (let i = 0; i < library.length; i++){
    display.appendChild(makeHtmlBook(library[i], i));
  }

}


function makeHtmlBook(book, index){
  let currBook = document.createElement("div");
  currBook.dataset.index = index;
  currBook.classList.add("book");

  let bookName = document.createElement("div");
  bookName.textContent = book.name;
  bookName.classList.add("book-name");

  let bookAuthor = document.createElement("div");
  bookAuthor.textContent = book.author;
  bookAuthor.classList.add("book-author");

  let bookPages = document.createElement("div");
  bookPages.textContent = book.pages;
  bookPages.classList.add("book-pages");
 
  let bookIsRead = document.createElement("input");
  bookIsRead.setAttribute("type", "checkbox");
  bookIsRead.classList.add("book-read");
  bookIsRead.checked = book.read;

  let removeBook = document.createElement("button");
  removeBook.textContent = "Remove Book?";
  removeBook.classList.add("remove-book");
  removeBook.addEventListener("click", function() {
    deleteBook(myLibrary, currBook.dataset.index);
  });

  let readButton = document.createElement("button");
  readButton.textContent = "Read Book?";
  readButton.classList.add("read-book");
  readButton.addEventListener("click", function() {
    updateRead(myLibrary, currBook.dataset.index);
  });


  currBook.appendChild(bookName);
  currBook.appendChild(bookAuthor);
  currBook.appendChild(bookPages);
  currBook.appendChild(bookIsRead);
  currBook.appendChild(removeBook);
  currBook.appendChild(readButton);

  return currBook;
}

function deleteBook(library, index){
  library.splice(index, 1);

  let display = document.querySelector("#library-display");
  let children = display.children;
  for (var i = index; i < children.length; i++) {
    children[i].dataset.index = i-1;
  } 
  displayBooks(library);
}

function updateRead(library, index){
  library[index].read = !library[index].read;
  displayBooks(library);
}

addBookToLibrary(myLibrary, "Harry Potter and the Sorcerers Stone", "JK Rowling", 500, true);
addBookToLibrary(myLibrary, "Project Hail Mary", "Andy Weir", 600, false);
addBookToLibrary(myLibrary, "The Way of Kings", "Brandon Sanderson", 800, true);

displayBooks(myLibrary);

let newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", popupForm);

function popupForm(){
  let dialog = document.querySelector("dialog");
  dialog.showModal();
}

function controllerAddBook(book, library){
  let display = document.querySelector("#library-display");
  display.appendChild(makeHtmlBook(book, library.length));
  library.push(book);
}

let submit_book_button = document.querySelector("#submit-book");
submit_book_button.addEventListener("click", function (e) {
  e.preventDefault();

  let name = document.querySelector("#name");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let read = document.querySelector("#read");
  let submittedBook = new Book(name.value, author.value, pages.value, read.checked);
  controllerAddBook(submittedBook, myLibrary);

  let dialog = document.querySelector("dialog");
  dialog.close();

});
