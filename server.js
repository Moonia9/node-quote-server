const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json"); //this is our "memory" of the server
//console.log(quotes[1].author)

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)

app.get("/", function (request, response) {
  response.send(
    "Moonia's Quote Server!  Ask me for /quotes/random, or /quotes"
  );
});

//GET - Read all the quotes
app.get("/quotes", function (request, response) {
  console.log(quotes[0]);
  response.send(quotes);
});

//NODE AND EXPRESS EXERCISES week 1
app.get("/quotes/random", function (request, response) {
  const randomQuote = pickFromArray(quotes);
  response.send(randomQuote);
});

//Query parameters

// app.get("/quotes/search", function (request, response) {
//   let term = request.query.word;
//   response.send(term); //should return query param
// });

//search for quote with the word passed in the query parameter "term"
app.get("/quotes/search", function (request, response) {
  console.log("something else");
  //get the search term from the query parameters
  let term = request.query.term;

  //find all quotes containing the search term
  let matches = findQuotesContainingTerm(quotes, term);
  console.log(matches, "something");

  //respond with the matches

  response.send(matches); //should return query param
});

//START OF YOUR CODE...

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  const lengthOfArray = arr.length;
  const randomNumber = Math.random();
  const randomNumberTimesLength = randomNumber * lengthOfArray;
  const integer = Math.floor(randomNumberTimesLength);
  return arr[integer];
  //return arr[Math.floor()(Math.random()) * arr.length]
}

//accepts an array of quotes and a term, returns all quotes containing that term
//in the author name or quote text
function findQuotesContainingTerm(quotes, term) {
  let matches = [];
  let lowercasedTerm = term.toLowerCase();
  //look at each quote object :
  quotes.forEach((item) => {
    //if author or quote contains term, include it in the result
    if (
      item.quote.toLowerCase().includes(lowercasedTerm) ||
      item.author.toLowerCase().includes(lowercasedTerm)
    ) {
      matches.push(item);
    }
  });
  //return all matches
  return matches;
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
