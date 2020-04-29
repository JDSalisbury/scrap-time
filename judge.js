const app = require("express")();
const fs = require("fs");
const iko = require("./Output.json");
var obj = {};

async function start() {
  const decklist = [];
  const sideboard = [];

  fs.readFile("./mtgadecklist.txt", "utf8", function (err, data) {
    if (err) throw err;
    let main_board = true;
    data.split("\n").forEach((v) => {
      vt = v.trim();
      if (vt === "Sideboard") {
        main_board = false;
      }
      if (main_board) {
        if (parseInt(vt.slice(0, 1)) > 0) {
          decklist.push({ num: parseInt(vt.slice(0, 1)), name: vt.slice(2) });
        }
      } else {
        sideboard.push({ num: parseInt(vt.slice(0, 1)), name: vt.slice(2) });
      }
    });

    function getCardListWithSetValue(set, cardlist) {
      return set.filter((el) => {
        return cardlist.some((f) => {
          if (f.name.includes(el.name)) {
            el.num = f.num;
            return true;
          }
        });
      });
    }

    const main = getCardListWithSetValue(iko, decklist);

    const side = getCardListWithSetValue(iko, sideboard);

    function getMinMaxValues(list) {
      let max = 0;
      let min = 0;
      list.forEach((e) => {
        ev = e.value;
        val = parseFloat(ev) * e.num;
        if (ev.length > 3) {
          max += parseFloat(ev.split("//")[1]) * e.num - val;
        }
        min += val;
      });

      return { min: min, max: max };
    }

    const mainValues = getMinMaxValues(main);
    const sideValues = getMinMaxValues(side);

    obj = {
      total_min: mainValues.min + sideValues.min,
      total_max:
        mainValues.min + mainValues.max + sideValues.min + sideValues.max,
      main_min: mainValues.min,
      main_max: mainValues.min + mainValues.max,
      side_min: sideValues.min,
      side_max: sideValues.min + sideValues.max,
      mainboard: main,
      sideboard: side,
    };
    console.log(obj);
  });
}

start();

app.get("/", async (req, res) => res.send({ obj }));

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
