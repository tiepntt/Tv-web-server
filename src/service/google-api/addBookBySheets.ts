import { HandelStatus } from "../../controllers/HandelAction";
import { getData } from "./api";

export const AddBooksBySheet = async (idSheet) => {
  let data = await getData(idSheet, "A1:Z1000000");
  return HandelStatus(200, null, { data: data });
};
