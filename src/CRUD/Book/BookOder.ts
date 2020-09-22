import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { BookDetail } from "../../entity/Book/BookDetails";
import { BookOrder, BookOrderConfig } from "../../entity/Book/BookOrder";
import { Student } from "../../entity/Student/Student";
import { User } from "../../entity/User/User";

export const Create = async (bookOrderConfig: BookOrderConfig) => {
    let BookOrderRepo = getRepository(BookOrder);
    let UserRepo = getRepository(User);
    let BookDetailRepo = getRepository(BookDetail);
    let StudentRepo = getRepository(Student)
    if (!bookOrderConfig.bookdetailId || !bookOrderConfig.studentId || !bookOrderConfig.userId1) {
        return HandelStatus(204)
    }
    let user = await UserRepo.findOne(bookOrderConfig.userId1);
    let bookdetail = await BookDetailRepo.findOne(bookOrderConfig.bookdetailId);
    let student = await StudentRepo.findOne(bookOrderConfig.studentId);
    if (!user || !bookdetail || !student) {
        return HandelStatus(500)
    }
    let bookOrder = new BookOrder();
    bookOrder.student = student;
    bookOrder.User1 = user;
    bookOrder.bookdetail = bookdetail;
    bookOrder.BorrowDate = new Date(bookOrderConfig.BorrowDate) || new Date();
    await BookOrderRepo.save(bookOrder);
    return HandelStatus(200);
}