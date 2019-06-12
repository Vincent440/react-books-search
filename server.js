const express = require("express");
const path = require("path");
const routes = require("./routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false  });

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on http://localhost:${PORT}!`);
});
