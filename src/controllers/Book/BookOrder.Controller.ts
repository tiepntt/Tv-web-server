import { utimes } from "fs";
import { getRepository } from "typeorm";
import { Create } from "../../CRUD/Book/BookOder";

import { BookOrder } from "../../entity/Book/BookOrder";
import { genBorn } from "../../libs/Book";
import { getID } from "../../libs/Sheet";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";

import { HandelStatus } from "../HandelAction"


module.exports.CreateBySheet = async (req, res) => {
    if (!req.body.url) {
        res.send(HandelStatus(204));
    }
    let BookOrderRepo = getRepository(BookOrder)

    let Id = getID(req.body.url);

    let arr = await AddBySheet(Id);
    var data = (arr.result as any).data;
    await (data as any).forEach(async (item, index) => {
        if (index > 0) {

            let bookConfig = {
                studentId: item[0],
                BorrowDate: genBorn(item[2]),

                bookdetailId: item[1],

                userId1: item[3],

            }
            await Create(bookConfig);

        }
    });
    res.send(HandelStatus(200));
}
module.exports.BookOderPay = async (req, res) => {

}