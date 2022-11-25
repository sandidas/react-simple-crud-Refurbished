const generatePas4sword = () => {
    let characters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    const randomPassword = Math.random().toString(36).slice(10) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5) + "A";
    return randomPassword;
}


const keys = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    specialChar: "!@#$&*",
    symbol: "!@#$%^&*()_+~\\`|}{[]:;?><,./-="
}


const randomString = (length, type) => {
    var result = '';
    for (var i = 0; i < length; ++i) {
        result += type[Math.floor(Math.random() * type.length)];
    }
    return result;
}

const generatePassword = () => {
    const upper = randomString(2, keys?.upperCase);
    const lower = randomString(3, keys?.lowerCase);
    const num = randomString(2, keys?.number);
    const special = randomString(2, keys?.specialChar);
    const sym = randomString(2, keys?.symbol);
    const password = upper + special + lower + num + sym + upper + num;
    return password;
}


export default generatePassword;