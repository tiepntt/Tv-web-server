export const getID = (url: string) => {
    var str = url.split('/')
    return str[5];
}