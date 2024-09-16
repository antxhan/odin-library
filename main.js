// GLOBAL --------------------------------------------------

const LIBRARY = [
  new Book(
    "Harry Potter",
    "J. K. Rowling",
    "https://m.media-amazon.com/images/I/91eopoUCjLL._SX522_.jpg",
    1999,
    "Fantasy",
    329,
    false
  ),
  new Book(
    "The Two Towers: Lord of the Rings",
    "J. R. R. Tolkien",
    "https://m.media-amazon.com/images/I/51EgIMxu00L._SY445_SX342_QL70_FMwebp_.jpg",
    1983,
    "Adventure",
    541,
    true
  ),
];
const books = document.querySelector(".books");
const newButton = document.querySelector(".new-button");
const newBookDialog = document.querySelector(".new-book-dialog");
const newBookForm = document.querySelector(".new-book-form");
const confirmButton = document.querySelector(".confirm-button");
const closeButton = document.querySelector(".close-button");

// OBJECTS -------------------------------------------------

function Book(title, author, imageUrl, releaseYear, genre, pages, read) {
  this.title = title;
  this.author = author;
  this.imageUrl = imageUrl;
  this.releaseYear = releaseYear;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

// EVENT LISTENERS -----------------------------------------

// add new book on-click
newButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  newBookDialog.close();
  newBookForm.reset();
});

// new book dialog on-close
newBookDialog.addEventListener("close", (e) => {
  newBookForm.reset();
});

// cofirm new book button on-click
confirmButton.addEventListener("click", (e) => {
  if (newBookForm.checkValidity()) {
    e.preventDefault();
    const form = document.forms.newBookForm;
    const formData = new FormData(form);
    addBookToLibrary(formData);
    newBookDialog.close();
    newBookForm.reset();
  }
});

const nav = document.querySelector("nav");
const navButton = document.querySelector(".nav-button");
const navCloseButton = document.querySelector(".nav-close-button");

navButton.addEventListener("click", () => {
  nav.setAttribute("aria-expanded", "true");
});

navCloseButton.addEventListener("click", () => {
  nav.setAttribute("aria-expanded", "false");
});

// FUNCTIONS -----------------------------------------------

function resetLibrary() {
  books.innerHTML = "";
}

function createBooks() {
  if (LIBRARY.length === 0) {
    books.innerHTML = "<p>No books in library</p>";
    return;
  }
  LIBRARY.forEach((book, index) => {
    books.innerHTML += `
    <div class="book" data-index="${index}">
        <button class="remove-button">
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
         </button>
         <img src="${book.imageUrl}" alt="" />
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <div class="book__details">
            <p>${book.genre}</p>
            <p>${book.releaseYear}</p>
            <p>${book.pages}</p>
        </div>
        <button class="book__read-button">${
          book.read
            ? `
          <svg  xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24" 
            fill="currentColor" 
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12.088 4.82a10 10 0 0 1 9.412 .314a1 1 0 0 1 .493 .748l.007 .118v13a1 1 0 0 1 -1.5 .866a8 8 0 0 0 -8 0a1 1 0 0 1 -1 0a8 8 0 0 0 -7.733 -.148l-.327 .18l-.103 .044l-.049 .016l-.11 .026l-.061 .01l-.117 .006h-.042l-.11 -.012l-.077 -.014l-.108 -.032l-.126 -.056l-.095 -.056l-.089 -.067l-.06 -.056l-.073 -.082l-.064 -.089l-.022 -.036l-.032 -.06l-.044 -.103l-.016 -.049l-.026 -.11l-.01 -.061l-.004 -.049l-.002 -.068v-13a1 1 0 0 1 .5 -.866a10 10 0 0 1 9.412 -.314l.088 .044l.088 -.044z" />
          </svg>
          <p>Read</p>`
            : `
            <svg xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
              <path d="M3 6l0 13" />
              <path d="M12 6l0 13" />
              <path d="M21 6l0 13" />
            </svg>
            <p>Not read</p>`
        }</button>
    </div>
    `;
  });
}

function toggleReadStatus(index) {
  LIBRARY[index].read = LIBRARY[index].read ? false : true;
}

function handleReadButtons() {
  const readButtons = document.querySelectorAll(".book__read-button");
  Array.from(readButtons).forEach((button) => {
    button.addEventListener("click", () => {
      const bookIndex = button.parentElement.dataset.index;
      toggleReadStatus(bookIndex);
      updateLibrary();
    });
  });
}

function handleRemoveButtons() {
  const removeButton = document.querySelectorAll(".remove-button");
  Array.from(removeButton).forEach((button) => {
    button.addEventListener("click", (e) => {
      removeBookFromLibrary(e.currentTarget.parentElement.dataset.index);
    });
  });
}

function updateLibrary() {
  resetLibrary();
  createBooks();
  handleRemoveButtons();
  handleReadButtons();
}

function addBookToLibrary(formData) {
  LIBRARY.unshift(
    new Book(
      (this.title = formData.get("title")),
      (this.author = formData.get("author")),
      (this.imageUrl =
        formData.get("imageUrl") || "https://placehold.co/300x300"),
      (this.releaseYear = formData.get("releaseYear")),
      (this.genre = formData.get("genre") || "Unknown"),
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
