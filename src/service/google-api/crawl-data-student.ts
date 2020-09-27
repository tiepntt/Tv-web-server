import { HandelStatus } from "../../controllers/HandelAction";
import { IdData } from "../Id/id";
import { client, pushData } from "./api";

var request = require("request");
var cheerio = require("cheerio");

class Cache {
  speed;
  row;
  dataCache;
  constructor() {
    this.speed = 10;
    this.row = 0 - this.speed + 2;
    this.dataCache = [];
  }
}
var speed = 10;
export const getId = async () => {
  var url = `http://112.137.129.87/qldt/`;
  await request.get(url, (err, response, body) => {
    var content = cheerio.load(body);
    var result = content(body).find("select.target option")["1"];
    console.log(result.attribs.value);
  });
};

const getData = async (options, id, cache) => {
  var student;
  var url = `http://112.137.129.87/qldt/?SinhvienLmh%5BmasvTitle%5D=${options.msv}&SinhvienLmh%5Bterm_id%5D=${options.id}`;
  await request.get(url, (err, response, body) => {
    if (body) {
      var content = cheerio.load(body);
      var result = content(body).find("tbody tr.odd")["0"];
      if (result) {
        var context = result.children;
        student = {
          id: content(context[2]).text(),
          name: content(context[3]).text(),
          born: content(context[4]).text(),
          class: content(context[5]).text(),
        };

        var studentArray = [
          student.id,
          student.name,
          student.born,
          student.class,
        ];
        cache.dataCache.push(studentArray);
        cache.row++;
        if (cache.dataCache.length === cache.speed) {
          addToSheet(cache.dataCache, cache.row, id);

          cache.dataCache = [];
        }
      } else {
      }
    }
  });
};
export const getAllData = (id, k) => {
  var headerMsv = `${toMSV(k)}0000`;
  var msv = parseInt(headerMsv);
  var max = parseInt(`${toMSV(k)}9999`);
  let idSheet = IdData[k];

  if (!idSheet) return HandelStatus(404);
  var cache = new Cache();

  var loop = setInterval(() => {
    if (msv > max) {
      clearInterval(loop);
      cache = new Cache();
      return HandelStatus(200);
    } else {
      msv++;
      getData({ id: id, msv: msv }, idSheet, cache);
    }
  }, 100);
};
const toMSV = (k) => {
  var header = parseInt(k) - 64 + 19;
  return `${header}02`;
};
const addToSheet = async (data, row, id) => {
  var result = await pushData(`A${row}`, data, id);
};
