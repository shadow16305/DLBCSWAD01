# 📚 Book Management System

A modern, responsive web application for managing a collection of books using JSON data. Built with vanilla JavaScript, HTML5, and CSS3.

## ✨ Features

### Core Functionality

- **Display Books**: View all books in a clean, responsive table format
- **Add Books**: Add new books with validation
- **Update Books**: Modify existing book details
- **Remove Books**: Delete books from the collection
- **Data Validation**: Comprehensive input validation with user feedback

### Technical Features

- **JSON Data Structure**: Books stored as JSON objects with title, author, year, and genre
- **Dynamic Table Updates**: Real-time table updates when data changes
- **Form Validation**: Client-side validation for all inputs
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations
- **XSS Protection**: HTML escaping to prevent security vulnerabilities

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Start Managing** your book collection!

No server setup required - this is a client-side application that runs entirely in the browser.

## 📖 How to Use

### Adding a Book

1. Fill out the "Add New Book" form
2. Enter the book's title, author, year, and genre
3. Click "Add Book"
4. The book will appear in the table below

### Updating a Book

1. In the "Update Book" section, enter the exact title of the book you want to update
2. Fill in the new details (title, author, year, genre)
3. Click "Update Book"
4. The book's information will be updated in the table

### Removing a Book

1. In the "Remove Book" section, enter the exact title of the book you want to remove
2. Click "Remove Book"
3. The book will be deleted from the collection

## 🔧 Data Structure

Each book is represented as a JSON object:

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "year": 2024,
  "genre": "Genre"
}
```

## ✅ Validation Rules

### Title

- Required field
- 1-200 characters
- Must be unique (case-insensitive)

### Author

- Required field
- 1-100 characters

### Year

- Required field
- Must be a number between 1000 and 2024

### Genre

- Required field
- 1-50 characters

## 🎨 Design Features

- **Modern Gradient Background**: Beautiful purple-blue gradient
- **Card-based Layout**: Clean, organized sections
- **Hover Effects**: Interactive elements with smooth transitions
- **Responsive Grid**: Adapts to different screen sizes
- **Notification System**: Real-time feedback for user actions
- **Color-coded Buttons**: Different colors for different actions

## 🛠️ Technical Implementation

### JavaScript Functions

#### Core Functions

- `displayBooks()`: Renders books in the table
- `handleAddBook()`: Processes new book additions
- `handleUpdateBook()`: Processes book updates
- `handleRemoveBook()`: Processes book deletions

#### Utility Functions

- `validateBookData()`: Validates book information
- `showNotification()`: Displays user feedback
- `escapeHtml()`: Prevents XSS attacks
- `exportBooksData()`: Exports current data as JSON
- `importBooksData()`: Imports data from JSON

#### Bonus Features

- `searchBooks()`: Search functionality across all fields
- `displayFilteredBooks()`: Shows filtered results
- `showAllBooks()`: Resets to show all books

### CSS Features

- **CSS Grid**: Responsive layout system
- **Flexbox**: Flexible component layouts
- **CSS Variables**: Consistent color scheme
- **Media Queries**: Mobile-first responsive design
- **Animations**: Smooth transitions and hover effects

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔍 Console Features

Open the browser console to access additional functions:

```javascript
// Export current books data
exportBooksData();

// Import books from JSON string
importBooksData(jsonString);

// Search books
searchBooks("search term");

// Show all books
showAllBooks();
```

## 📋 Sample Data

The application comes with three sample books:

- "The Great Gatsby" by F. Scott Fitzgerald (1925)
- "To Kill a Mockingbird" by Harper Lee (1960)
- "1984" by George Orwell (1949)

## 🎯 Future Enhancements

Potential improvements for the application:

- Local storage persistence
- Advanced search and filtering
- Book cover images
- Categories and tags
- Export to CSV/PDF
- User authentication
- Cloud storage integration

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using vanilla JavaScript, HTML5, and CSS3**
