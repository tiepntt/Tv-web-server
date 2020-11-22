const getDate = () => {
  return new Date();
};
const addDate = (date: Date, day: number) => {
  let newDate = new Date();
  newDate.setDate(date.getDate() + day);
  return newDate;
};
export const DateMap = { addDate };
export const transformer = {
  from: (date) => {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
  },
  to: (date) => {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
  },
};
