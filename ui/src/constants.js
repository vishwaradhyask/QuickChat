
let cmpType = {
    LOGIN: "LOGIN",
    SIGNIN: "SIGNIN",
    HOME: "HOME",
}


const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export { cmpType, validateEmail }