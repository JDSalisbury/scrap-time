const app = require("express")();
const fs = require("fs");
const iko = require("./Output.json");
const fetch = require("node-fetch");
async function start() {
  //   console.log(iko);
  await fetch("./decklist.txt")
    .then((response) => response.text())
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
}

start();

app.get("/", async (req, res) => res.send({ cards }));

// app.listen(3000);
app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
