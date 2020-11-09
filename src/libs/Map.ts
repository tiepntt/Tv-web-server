export const mapToArr = (arr: Array<object>) => {
  let res = [];
  arr.forEach((item) => {
    let peopleArray = Object.keys(item).map((i) => item[i]);
    res.push(peopleArray);
  });
  return res;
};
