export const getID = (url: string) => {
  if (!url) return;
  let str = url.split("/");
  return str[5];
};
export const getEmails = (emails) => {
  let res = [];

  for (let i = 1; i < emails.length; i++) {
    res.push(emails[i][0] + "@vnu.edu.vn");
  }
  return res;
};
