export const getID = (url: string) => {
  if (!url) return;
  var str = url.split("/");
  return str[5];
};
export const getEmails = (emails) => {
  var res = [];

  for (var i = 1; i < emails.length; i++) {
    res.push(emails[i][0] + "@vnu.edu.vn");
  }
  return res;
};
