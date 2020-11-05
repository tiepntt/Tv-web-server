export const parseIntArray = (input: any[]) => {
  let output = [];
  input.forEach((item) => {
    output.push(parseInt(item));
  });
  return output;
};
