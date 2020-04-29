const app = require("express")();
const fs = require("fs");
const iko = require("./Output.json");
var obj = {};

async function start() {
  //   console.log(iko);
  const decklist = [];
  const sideboard = [];
  let deck_min = 0;
  let deck_max = 0;

  fs.readFile("./mtgdeck2.txt", "utf8", function (err, data) {
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

    function deckListWithSetValue(set, cardlist) {
      return set.filter((el) => {
        return cardlist.some((f) => {
          if (f.name.includes(el.name)) {
            el.num = f.num;
            return true;
          }
        });
      });
    }

    const main = deckListWithSetValue(iko, decklist);

    // const side = deckListWithSetValue(iko, sideboard);

    main.forEach((e) => {
      ev = e.value;
      val = parseFloat(ev) * e.num;
      if (ev.length > 3) {
        deck_max += parseFloat(ev.split("//")[1]) * e.num - val;
      }
      deck_min += val;
    });

    obj = {
      draft_min: deck_min,
      draft_max: deck_min + deck_max,
      drafted_cards: main,
    };
    console.log(obj);
  });
}

start();

app.get("/", async (req, res) => res.send({ obj }));

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
