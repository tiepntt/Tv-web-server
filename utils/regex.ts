const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const regexEmail = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const dir = "localhost:3000/";
export const getUrl = (str: string) => {
  if (!str) return undefined;
  let check = regexUrl.test(str);
  if (check) return str;
  else {
    str = str.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, "/");
    let result = dir + str.split("/").pop();
    return result;
  }
};
export const checkEmail = (str: string) => regexEmail.test(str);
