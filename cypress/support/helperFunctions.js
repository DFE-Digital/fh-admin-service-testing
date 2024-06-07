export function getDateString(){
    const currentDateTime = new Date();
    var date = `${currentDateTime.getFullYear()}${currentDateTime.getMonth() + 1}${currentDateTime.getDate()}`;
    var time = `t${currentDateTime.getHours()}${currentDateTime.getMinutes()}${currentDateTime.getSeconds()}${ currentDateTime.getMilliseconds()}`;
    return `${date}${time}`;
}

export function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function getRandomLetter() {
    const randomLetter = ('abcdefghijklmnoprstuv').split('')[(Math.floor(Math.random() * 21 ))];

    return randomLetter;
}
