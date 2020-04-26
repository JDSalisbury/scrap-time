const app = require("express")();
const fs = require("fs");
const iko = require("./Output.json");

async function start() {
  //   console.log(iko);
  let decklist = [];
  fs.readFile("./decklist.txt", "utf8", function (err, data) {
    if (err) throw err;
    let cleanDeckList = [];

    data.split(",").forEach((value) => {
      cleanDeckList.push(value.trim());
    });

    cleanDeckList.forEach((i) => {
      decklist.push({ num: i.slice(0, 1), name: i.slice(2) });
    });

    value_list = iko.filter((el) => {
      return decklist.some((f) => {
        if (f.name === el.name) {
          el.num = f.num;
          return true;
        }
      });
    });

    console.log({ value_list: value_list });
  });
}

start();

app.get("/", async (req, res) => res.send({ decklist }));

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
