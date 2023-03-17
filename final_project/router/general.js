const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  console.log(author);

  const authorBook = [];

  Object.values(books).forEach((book) => {
    if (book.author === author) {
      authorBook.push(book.title);
    }
  });

  return res.status(300).json({
    message: 'Here are the books from your author',
    authorBook: authorBook,
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
