const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
    "username": "username",
    "password": "password"
},{
    "username": "username2",
    "password": "password"
},{
    "username": "username3",
    "password": "password"
},];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid\
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
 let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    console.log("entered login endpoint");
    console.log(users);
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password, username: username,
      }, 'access', { expiresIn: 60 * 60 });

      req.session.authorization = {
        accessToken,username
    }

    // Store the username in the session
    //req.session.username = username;

    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
  });

 // Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    console.log("entered auth review endpoint")
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.user.username; // The username is stored in the req.user object
   
    // Check if the book exists in the database
    if (books.hasOwnProperty(isbn)) {
        const book = books[isbn];

        // Check if the user already has a review for the book
        if (book.reviews.hasOwnProperty(username)) {
            // Modify the existing review
            book.reviews[username].review = review;
            return res.status(200).json({ message: "Review modified successfully" });
        } else {
            // Add a new review for the user
            book.reviews[username] = { review: review };
            return res.status(200).json({ message: "Review added successfully" });
        }
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

regd_users.put("/auth/deletereview/:isbn", (req, res) => {
    console.log("entered delete review endpoint")
    const isbn = req.params.isbn;
    //const review = req.body.review;
    const username = req.user.username; // The username is stored in the req.user object

    // Check if the book exists in the database
    if (books.hasOwnProperty(isbn)) {
        const book = books[isbn];

        // Check if the user already has a review for the book
        if (book.reviews.hasOwnProperty(username)) {
            // Modify the existing review
            //console.log("username" + username)
            delete book.reviews.username;
            delete book.reviews['username'];
            const { username, ...rest } = book.reviews;
            return res.status(200).json({ message: "Review deleted successfully" });
        } else {
            // Add a new review fosr the user            
            return res.status(200).json({ message: "User hasn´t made a review so far" });
        }
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
