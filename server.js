const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

const PORT = process.env.PORT || 3001;
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false  }, err => {
  if (err) {
      console.log(err);
  } else {
      console.log("Mongoose connected successfully!");
  }
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);


app.listen(PORT, ()=> console.log(`🌎 ==> API server now on http://localhost:${PORT}!`));