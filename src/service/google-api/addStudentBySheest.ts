import { HandelStatus } from "../../controllers/HandelAction";
import { getData, pushData } from "./api";


export const AddBySheet = async (idSheet) => {
  var data = await getData(idSheet, "A1:Z1000000");
  return HandelStatus(200, null, { data: data });
};
export const pushToSheet = async (idSheet, data) => {
  var data = await pushData("A1:", data, idSheet);
  return HandelStatus(200, null, { data: data });
}