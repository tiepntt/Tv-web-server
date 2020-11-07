import * as uniqId from "uniqid";
export const generateId = (str) => {
  return uniqId(str || "file-");
};
export const generatePassword = (str) => {
  return uniqId();
};
