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
          el.num = parseInt(f.num);
          return true;
        }
      });
    });

    deck_min = 0;
    deck_max = 0;
    value_list.forEach((element) => {
      val = parseFloat(element.value) * element.num;
      if (element.value.length > 3) {
        deck_max +=
          parseFloat(element.value.split("//")[1]) * element.num - val;
      }
      deck_min += val;
    });

    const obj = {
      deck_value_min: deck_min,
      deck_value_max: deck_min + deck_max,
      deck_list: value_list,
    };
    console.log(obj);
  });
}

start();

app.get("/", async (req, res) => res.send({ decklist }));

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
