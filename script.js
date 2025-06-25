// Books data array - will be loaded from JSON file
let books = [];

// DOM Elements
const booksTableBody = document.getElementById("booksTableBody");
const addBookForm = document.getElementById("addBookForm");
const updateBookForm = document.getElementById("updateBookForm");
const removeBookForm = document.getElementById("removeBookForm");
const notification = document.getElementById("notification");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  loadBooksData();
  setupEventListeners();
});

// Load books data from JSON file
async function loadBooksData() {
  try {
    const response = await fetch("books.json");
    if (!response.ok) {
      throw new Error("Failed to load books data");
    }
    books = await response.json();
    displayBooks();
    console.log("Books data loaded successfully:", books);
  } catch (error) {
    console.error("Error loading books data:", error);
    showNotification(
      "Error loading books data. Using default data.",
      "warning"
    );
    // Fallback to default data if JSON file fails to load
    books = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        genre: "Classic Fiction",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Southern Gothic",
      },
      {
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian Fiction",
      },
    ];
    displayBooks();
  }
  setupEventListeners();
}

// Setup event listeners for all forms
function setupEventListeners() {
  addBookForm.addEventListener("submit", handleAddBook);
  updateBookForm.addEventListener("submit", handleUpdateBook);
  removeBookForm.addEventListener("submit", handleRemoveBook);
}

// Display books in the table
function displayBooks() {
  booksTableBody.innerHTML = "";

  books.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${escapeHtml(book.title)}</td>
            <td>${escapeHtml(book.author)}</td>
            <td>${book.year}</td>
            <td>${escapeHtml(book.genre)}</td>
        `;
    booksTableBody.appendChild(row);
  });
}

// Add new book
function handleAddBook(event) {
  event.preventDefault();

  const formData = new FormData(addBookForm);
  const bookData = {
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    year: parseInt(formData.get("year")),
    genre: formData.get("genre").trim(),
  };

  // Validation
  const validation = validateBookData(bookData);
  if (!validation.isValid) {
    showNotification(validation.message, "error");
    return;
  }
  // Check if book already exists
  if (
    books.some(
      (book) => book.title.toLowerCase() === bookData.title.toLowerCase()
    )
  ) {
    showNotification("A book with this title already exists!", "error");
    return;
  }
  // Add book to array
  books.push(bookData);
  // Update display
  displayBooks();
  // Reset form
  addBookForm.reset();
  // Show success message
  showNotification("Book added successfully!", "success");
}

// Update existing book
function handleUpdateBook(event) {
  event.preventDefault();

  const formData = new FormData(updateBookForm);
  const updateTitle = formData.get("updateTitle").trim();
  const bookData = {
    title: formData.get("newTitle").trim(),
    author: formData.get("newAuthor").trim(),
    year: parseInt(formData.get("newYear")),
    genre: formData.get("newGenre").trim(),
  };

  // Validation
  const validation = validateBookData(bookData);
  if (!validation.isValid) {
    showNotification(validation.message, "error");
    return;
  }

  // Find book to update
  const bookIndex = books.findIndex(
    (book) => book.title.toLowerCase() === updateTitle.toLowerCase()
  );

  if (bookIndex === -1) {
    showNotification("Book not found! Please check the title.", "error");
    return;
  }

  // Check if new title conflicts with existing book (excluding the book being updated)
  const titleConflict = books.some(
    (book, index) =>
      index !== bookIndex &&
      book.title.toLowerCase() === bookData.title.toLowerCase()
  );

  if (titleConflict) {
    showNotification("A book with the new title already exists!", "error");
    return;
  }

  // Update book
  books[bookIndex] = bookData;

  // Update display
  displayBooks();

  // Reset form
  updateBookForm.reset();

  // Show success message
  showNotification("Book updated successfully!", "success");
}

// Remove book
function handleRemoveBook(event) {
  event.preventDefault();

  const formData = new FormData(removeBookForm);
  const removeTitle = formData.get("removeTitle").trim();

  // Validation
  if (!removeTitle) {
    showNotification("Please enter a book title to remove.", "error");
    return;
  }

  // Find book to remove
  const bookIndex = books.findIndex(
    (book) => book.title.toLowerCase() === removeTitle.toLowerCase()
  );

  if (bookIndex === -1) {
    showNotification("Book not found! Please check the title.", "error");
    return;
  }

  // Remove book
  const removedBook = books.splice(bookIndex, 1)[0];
  // Update display
  displayBooks();
  // Reset form
  removeBookForm.reset();

  // Show success message
  showNotification(
    `"${removedBook.title}" has been removed successfully!`,
    "success"
  );
}

// Validation function
function validateBookData(bookData) {
  // Check for empty fields
  if (!bookData.title || !bookData.author || !bookData.genre) {
    return {
      isValid: false,
      message: "All fields are required!",
    };
  }

  // Check year validation
  if (isNaN(bookData.year) || bookData.year < 1000 || bookData.year > 2024) {
    return {
      isValid: false,
      message: "Year must be a valid number between 1000 and 2024!",
    };
  }

  // Check title length
  if (bookData.title.length < 1 || bookData.title.length > 200) {
    return {
      isValid: false,
      message: "Title must be between 1 and 200 characters!",
    };
  }

  // Check author length
  if (bookData.author.length < 1 || bookData.author.length > 100) {
    return {
      isValid: false,
      message: "Author name must be between 1 and 100 characters!",
    };
  }

  // Check genre length
  if (bookData.genre.length < 1 || bookData.genre.length > 50) {
    return {
      isValid: false,
      message: "Genre must be between 1 and 50 characters!",
    };
  }

  return { isValid: true };
}

// Show notification
function showNotification(message, type = "success") {
  notification.textContent = message;
  notification.className = `notification ${type} show`;

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Export books data (for demonstration purposes)
function exportBooksData() {
  return JSON.stringify(books, null, 2);
}

// Import books data (for demonstration purposes)
function importBooksData(jsonData) {
  try {
    const importedBooks = JSON.parse(jsonData);
    if (Array.isArray(importedBooks)) {
      books = importedBooks;
      displayBooks();
      showNotification("Books data imported successfully!", "success");
      return true;
    } else {
      showNotification("Invalid data format!", "error");
      return false;
    }
  } catch (error) {
    showNotification("Error parsing JSON data!", "error");
    return false;
  }
}

// Search functionality (bonus feature)
function searchBooks(query) {
  const searchTerm = query.toLowerCase().trim();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm) ||
      book.year.toString().includes(searchTerm)
  );

  displayFilteredBooks(filteredBooks);
}

// Display filtered books
function displayFilteredBooks(filteredBooks) {
  booksTableBody.innerHTML = "";

  if (filteredBooks.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML =
      '<td colspan="4" style="text-align: center; color: #666;">No books found</td>';
    booksTableBody.appendChild(row);
    return;
  }

  filteredBooks.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${escapeHtml(book.title)}</td>
            <td>${escapeHtml(book.author)}</td>
            <td>${book.year}</td>
            <td>${escapeHtml(book.genre)}</td>
        `;
    booksTableBody.appendChild(row);
  });
}

// Reset to show all books
function showAllBooks() {
  displayBooks();
}

// Console logging for debugging
console.log("Book Management System loaded!");
console.log("Initial books data:", books);
console.log("Available functions:");
console.log("- exportBooksData(): Export current books as JSON");
console.log("- importBooksData(jsonString): Import books from JSON");
console.log(
  "- searchBooks(query): Search books by title, author, genre, or year"
);
console.log("- showAllBooks(): Display all books");
