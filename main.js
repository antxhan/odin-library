// GLOBAL --------------------------------------------------

const library = [
  new Book(
    "harry potter",
    "jk rowling",
    "https://m.media-amazon.com/images/I/91eopoUCjLL._SX522_.jpg",
    1999,
    "fantasy",
    329
  ),
  new Book(
    "harry potter",
    "jk rowling",
    "https://m.media-amazon.com/images/I/91eopoUCjLL._SX522_.jpg",
    1999,
    "fantasy",
    329
  ),
];

// OBJECTS -------------------------------------------------

function Book(title, author, imageUrl, releaseYear, genre, pages) {
  this.title = title;
  this.author = author;
  this.imageUrl = imageUrl;
  this.releaseYear = releaseYear;
  this.genre = genre;
  this.pages = pages;
}

// FUNCTIONS -----------------------------------------------

function createLibrary() {
  const books = document.querySelector(".books");
  books.innerHTML = ""; // reset books
  library.forEach((book) => {
    books.innerHTML += `
    <div class="book">
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

function addBookToLibrary(formData) {
  library.push(
    new Book(
      (this.title = formData.get("title")),
      (this.author = formData.get("author")),
      (this.imageUrl = formData.get("imageUrl")),
      (this.releaseYear = formData.get("releaseYear")),
      (this.genre = formData.get("genre")),
      (this.pages = formData.get("pages"))
    )
  );
  createLibrary(); // update library
}

function handleNewBookForm() {
  const newButton = document.querySelector(".new-button");
  const newBookDialog = document.querySelector(".new-book-dialog");
  const newBookForm = document.querySelector(".new-book-form");
  const confirmButton = document.querySelector(".confirm-button");

  // opening dialog
  newButton.addEventListener("click", () => {
    newBookDialog.showModal();
  });

  // dialog on-close
  newBookDialog.addEventListener("close", (e) => {
    newBookForm.reset();
  });

  // cofirm button on-click
  confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.forms.newBookForm;
    const formData = new FormData(form);
    addBookToLibrary(formData);

    newBookDialog.close();
    newBookForm.reset();
  });
}

// INIT ----------------------------------------------------

function init() {
  createLibrary();
  handleNewBookForm();
}

init();
