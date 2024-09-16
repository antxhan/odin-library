// GLOBAL --------------------------------------------------

const LIBRARY = [
  new Book(
    "harry potter",
    "jk rowling",
    "https://m.media-amazon.com/images/I/91eopoUCjLL._SX522_.jpg",
    1999,
    "fantasy",
    329
  ),
  new Book(
    "harry potter 222",
    "jk rowling",
    "https://m.media-amazon.com/images/I/91eopoUCjLL._SX522_.jpg",
    1999,
    "fantasy",
    329
  ),
];
const books = document.querySelector(".books");
const newButton = document.querySelector(".new-button");
const newBookDialog = document.querySelector(".new-book-dialog");
const newBookForm = document.querySelector(".new-book-form");
const confirmButton = document.querySelector(".confirm-button");

// OBJECTS -------------------------------------------------

function Book(title, author, imageUrl, releaseYear, genre, pages) {
  this.title = title;
  this.author = author;
  this.imageUrl = imageUrl;
  this.releaseYear = releaseYear;
  this.genre = genre;
  this.pages = pages;
}

// EVENT LISTENERS -----------------------------------------

// add new book on-click
newButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

// new book dialog on-close
newBookDialog.addEventListener("close", (e) => {
  newBookForm.reset();
});

// cofirm new book button on-click
confirmButton.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.forms.newBookForm;
  const formData = new FormData(form);
  addBookToLibrary(formData);

  newBookDialog.close();
  newBookForm.reset();
});

// FUNCTIONS -----------------------------------------------

function resetLibrary() {
  books.innerHTML = "";
}

function createBooks() {
  LIBRARY.forEach((book, index) => {
    books.innerHTML += `
    <div class="book" data-index="${index}">
        <button class="remove-button">Remove</button>
         <img src="${book.imageUrl}" alt="" />
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <div class="book__details">
            <p>${book.genre}</p>
            <p>${book.releaseYear}</p>
            <p>${book.pages}</p>
        </div>
    </div>
    `;
  });
}

function handleRemoveButtons() {
  const removeButton = document.querySelectorAll(".remove-button");
  Array.from(removeButton).forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("clicked remove button");
      console.log(e.target.parentElement.dataset.index);
      removeBookFromLibrary(e.target.parentElement.dataset.index);
    });
  });
}

function updateLibrary() {
  resetLibrary();
  createBooks();
  handleRemoveButtons();
}

function addBookToLibrary(formData) {
  LIBRARY.push(
    new Book(
      (this.title = formData.get("title")),
      (this.author = formData.get("author")),
      (this.imageUrl = formData.get("imageUrl")),
      (this.releaseYear = formData.get("releaseYear")),
      (this.genre = formData.get("genre")),
      (this.pages = formData.get("pages"))
    )
  );
  updateLibrary();
}

function removeBookFromLibrary(index) {
  LIBRARY.splice(index, 1);
  updateLibrary();
}

function init() {
  updateLibrary();
}

// ON LOAD ----------------------------------------------------

init();
