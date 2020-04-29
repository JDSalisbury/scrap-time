const app = require("express")();
const fs = require("fs");
const iko = require("./Output.json");
const utils = require("./utils/cardlistfuncs");

async function start() {
  const data = fs.readFileSync("./decklists/mtgdeck2.txt", "utf8");

  const { decklist, sideboard } = utils.splitDataIntoMainAndSide(data);

  const main = utils.getCardListWithSetValue(iko, decklist);
  const side = utils.getCardListWithSetValue(iko, sideboard);

  const mainValues = utils.getMinMaxValues(main);
  const sideValues = utils.getMinMaxValues(side);

  const obj = utils.createResponseBody(main, side, mainValues, sideValues);

  console.log(obj);
}

start();

app.get("/", async (req, res) => res.send({ obj }));

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
