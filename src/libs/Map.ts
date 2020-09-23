export const mapToArr = (arr : Array<object>) => {
  var res = [];
  arr.forEach(item => {
    let  peopleArray = Object.keys(item).map(i => item[i])
    res.push(peopleArray)
  });
  return res;
}
