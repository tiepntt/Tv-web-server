const getDate = () => {
  return new Date();
};
const addDate = (date: Date, day: number) => {
  let newDate = new Date();
  newDate.setDate(date.getDate() + day);
  return newDate;
};
export const DateMap = { addDate };
