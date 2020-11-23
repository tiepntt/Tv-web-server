const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
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
export const checkPhoneNumer = (str: string) => regexPhoneNumber.test(str);
