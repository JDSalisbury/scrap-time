const app = require("express")();
const request = require("async-request");
const cheerio = require("cheerio");
const fs = require("fs");

async function start() {
  const imdb = await request("https://aetherhub.com/Apps/LimitedRatings/IKO");
  const html = imdb.body;
  const $ = cheerio.load(html);

  card_names = $("#table_card_rating > tbody > tr > td > div > div > a > b");
  card_values = $("#table_card_rating > tbody > tr > td > b");
  card_types = $("#table_card_rating > tbody > tr > td > div:nth-child(5)");

  name_list = [];
  value_list = [];
  type_list = [];

  card_names.each((index, element) => {
    name_list.push($(element).text());
  });

  card_values.each((index, element) => {
    value_list.push($(element).text());
  });

  card_types.each((index, element) => {
    type_list.push($(element).text().trim());
  });

  cards = [];
  name_list.forEach((key, i) =>
    cards.push({ name: key, value: value_list[i], type: type_list[i] })
  );

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  cards = getUniqueListBy(cards, "name");

  fs.writeFile("Output.json", JSON.stringify(cards), (err) => {
    if (err) throw err;
  });
}

start();

app.get("/", async (req, res) => res.send({ cards }));

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
