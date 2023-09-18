export function getDateString(){
    const currentDateTime = new Date();
    var date = `${currentDateTime.getFullYear()}${currentDateTime.getMonth()}${currentDateTime.getDate()}`;
    var time = `t${currentDateTime.getHours()}${currentDateTime.getMinutes()}${currentDateTime.getSeconds()}${ currentDateTime.getMilliseconds()}`;
    return `${date}${time}`;
}