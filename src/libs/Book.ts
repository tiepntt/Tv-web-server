export const genBorn = (str) => {
  if (!str) {
    return "2000/01/01";
  }
  var strArr = str.split("/");
  return `${strArr[2]}/${strArr[1]}/${strArr[0]}`;
};
export const getIdBook = (str) => {
  if (!str) {
    return "0000";
  }
  var strArr = str.split("-")
  return strArr[0];
}