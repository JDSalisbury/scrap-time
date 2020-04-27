const app = require("express")();
const fs = require("fs");
const iko = require("./Output.json");

async function start() {
  //   console.log(iko);
  const decklist = [];
  let deck_min = 0;
  let deck_max = 0;
  fs.readFile("./decklist.txt", "utf8", function (err, data) {
    if (err) throw err;

    data.split(",").forEach((v) => {
      vt = v.trim();
      decklist.push({ num: vt.slice(0, 1), name: vt.slice(2) });
    });

    const value_list = iko.filter((el) => {
      return decklist.some((f) => {
        if (f.name === el.name) {
          el.num = parseInt(f.num);
          return true;
        }
      });
    });

    value_list.forEach((e) => {
      ev = e.value;
      val = parseFloat(ev) * e.num;
      if (ev.length > 3) {
        deck_max += parseFloat(ev.split("//")[1]) * e.num - val;
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
