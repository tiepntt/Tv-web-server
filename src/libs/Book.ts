export const genBorn = (str) => {
  if (!str) {
    return new Date().toLocaleDateString();
  }
  var strArr = str.split( "/" );
  return `${strArr[2]}/${strArr[1]}/${strArr[0]}`;
};
export const getIdBook = (str) => {
  if (!str) {
    return "0000";
  }
  var strArr = str.split("-")
  return strArr[0];
}
export const GetDaysCompare = ( date1: Date, date2: Date ) =>  {
  return Math.floor(( date1.valueOf() - date1.valueOf() ) / ( 86400 ));
}