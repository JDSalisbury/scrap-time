module.exports = {
  getCardListWithSetValue: function getCardListWithSetValue(set, cardlist) {
    return set.filter((el) => {
      return cardlist.some((f) => {
        if (f.name.includes(el.name)) {
          el.num = f.num;
          return true;
        }
      });
    });
  },

  getMinMaxValues: function getMinMaxValues(list) {
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
  },

  splitDataIntoMainAndSide: function splitDataIntoMainAndSide(data) {
    let main_board = true;
    const decklist = [];
    const sideboard = [];
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
    return { decklist: decklist, sideboard: sideboard };
  },

  createResponseBody: function createResponseBody(
    main,
    side,
    mainValues,
    sideValues
  ) {
    return {
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
  },
};
