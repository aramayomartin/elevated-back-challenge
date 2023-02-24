var express = require("express");
var router = express.Router();
const { Book } = require("../db.js");

// ruta prueba
router.get("/state", async (req, res) => {
  return res.json({ state: "available :)" });
});
// LIST
router.get("/books", async (_, res) => {
  try {
      let books = await Book.findAll();
      books.length
        ? res.status(200).json(books)
        : res.status(404).send("There are not books yet.");
  } catch {
    res.status(400).send("Something went wrong! :(");
  }
});
// CRUD
// CREATE
router.post("/book/create", async (req, res) => {
  try {
    const { author, title, price } = req.body;
    console.log("entré")
    const newBook = await Book.create({
      author,
      title,
      price,
    });
    res.status(200).send("Succesful");
  } catch {
    res.status(400).send("Something went wrong! :(");
  }
});
// EDIT
router.put("/book/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { author, title, price } = req.body;
    await Book.update(
      { author, title, price },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("Succesful.");
  } catch {
    res.status(400).send("Something went wrong! :(");
  }
});
//DELETE
router.delete("/book/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Book.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Succesful.");
  } catch {
    res.status(400).send("Something went wrong! :(");
  }
});

module.exports = router;
