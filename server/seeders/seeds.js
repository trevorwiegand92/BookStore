const mongoose = require("mongoose");

const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://stephenson36:codingBootcamp123@cluster0.n8ie9.mongodb.net/mern_db?retryWrites=true&w=majority"
);

const bookSeed = [
  {
    id: 1,
    authors: ["JK Rowling"],
    description: "this is a description",
    image: "image.url",
    title: "Harry Potter",
    date: new Date(Date.now()),
  },
];

db.Book.remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then((data) => {
    console.log(data.result.n + "records inserted");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
