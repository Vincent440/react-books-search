const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false }, error =>{ 
  console.log( error ? error : "Mongoose connected to the DB successfully!");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, () => {
  console.log(`\nAPI server ON ==> http://localhost:${PORT}!\n`)
});