class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    // Grab book list from ui
    const bookList = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

    // Append
    bookList.appendChild(row);
  }

  showAlert(message, className) {
    // Create alert div
    const alertDiv = document.createElement("div");
    // Add classes
    alertDiv.className = `alert ${className}`;
    // Add text
    alertDiv.appendChild(document.createTextNode(message));
    // Get parentNode for alert div insertion
    const container = document.querySelector(".container");
    // Get referenceNode for div insertion
    const form = document.querySelector("#book-form");
    // Insert alert div
    container.insertBefore(alertDiv, form);

    // Disappear after 3 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBookFromLS(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// EVENT LISTENERS

// Display book event listener
document.addEventListener("DOMContentLoaded", Store.displayBooks());

// Add book event listener
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validation before submission
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Submission failed. Please fill in all form fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to Local Storage
    Store.addBook(book);
    // Success alert
    ui.showAlert("Book added successfully", "success");

    // Clear input fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Delete book event listener
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instantiate UI
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);
  // Remove from local storage
  Store.removeBookFromLS(
    e.target.parentElement.previousElementSibling.textContent
  );
  // Show delete alert
  ui.showAlert("Book removed", "success");

  e.preventDefault();
});
