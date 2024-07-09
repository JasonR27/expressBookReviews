const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let users2 = [];

//public_users.use(express.json);
const app = express();

app.use(express.json());

public_users.post("/register", (req,res) => {
    console.log("entered register endpoint");
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        console.log("found username and password");
      if (!isValid(username)) { 
        console.log("username is valid");
        users.push({"username":username,"password":password});
        console.log(users);
        return res.status(300).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {  
  //Write your code here
  let booklist = JSON.stringify(books);
  let titles = [];  
  titles.push(Object.values(books).map(objVal => objVal.title + ' by ' + objVal.author))   

  return res.status(300).json({message: 'This are the Books available', titles});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const bookId = req.params.isbn;
  console.log(bookId);

  const book = books[bookId];

  const isbnBook = [books[bookId].title + ' ' + 'by' + ' ' + books[bookId].author]
  
  return res.status(300).json({message: "Here is the book for your isbn: ", isbnBook: isbnBook});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    console.log(author);
  
    const authorBooks = [];
  
    Object.values(books).forEach((book) => {
      if (book.author.toLowerCase() === author) {
        authorBooks.push(book.title + ' ' + 'by' + ' ' + book.author);
      }
    });
  
    return res.status(300).json({
      message: 'Here are the books from your author',
      Books: authorBooks,
    });
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  console.log(title);
  
  const titleBooks = [];
  
  Object.values(books).forEach((book) => {
      if (book.title.toLowerCase() === title) {
        titleBooks.push(book.title + ' ' + 'by' + ' ' + book.author);
      }
    });
  
  return res.status(300).json({
      message: 'Here are the books from your title',
      Books: titleBooks,
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const bookId = req.params.isbn;
  console.log(bookId);

  //const reviews2 = {};
  const reviews = books[bookId].reviews;

//  let count = 1;
//  for (let key in books[bookId].reviews) {
//    console.log("review" + count + books[bookId].reviews[key].review);
//    reviews.count = books[bookId].reviews[key].review;
   // count++;
//}

  const isbnBook = [books[bookId].title]
  
  return res.status(300).json({
      message: 'Here is the review for your book: ' + books[bookId].title + ' ' + 'by' + ' ' + books[bookId].author,
      reviews: reviews,
      //sreviews2: reviews2,
    });
});

module.exports.general = public_users;
