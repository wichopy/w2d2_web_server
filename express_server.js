var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
var morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ entended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.set("view engine", "ejs");

function generateRandomString() {
  var randnum = function () { return Math.floor(Math.random() * 10); }; //random numbers
  var randLLet = function () { return Math.floor(Math.random() * (90 - 65 + 1) + 65); }; // random ascii letter upper case
  var randULet = function () { return Math.floor(Math.random() * (122 - 97 + 1) + 97); }; //random ascii letter lowercase
  var randArray = [randnum, randLLet, randULet]; ///Generate numbers 0-2 to select a random character.
  var randNum = function () { return Math.floor(Math.random() * 3); };
  var randString = "";
  for (var i = 0; i < 6; i++) {
    console.log("pick a random function");
    console.log(randNum())
    var char = randArray[randNum()];
    //console.log(char);
    console.log("run this random function to create a random number or letter");
    char = char();
    console.log(char);
    if (char >= 0 && char <= 9) {
      console.log("add number to randomString")
      randString += String(char);
    }
    if (char >= 65 && char <= 90) {
      console.log("add upper case letter to random String")
      randString += String.fromCharCode(char);
    }
    if (char >= 97 && char <= 122) {
      console.log("add lower case letter to random String")
      randString += String.fromCharCode(char);
    }
  }
  return randString;
}



var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL)
});
app.get("/urls", (req, res) => {
  var templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/", (req, res) => {
  res.end("Hello!");
});
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  console.log(req.body); // debug statement to see POST parameters
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
  };
  res.render("urls_show", templateVars);
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});



app.post("/urls", (req, res) => {
  console.log(req.body); // debug statement to see POST parameters
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});