const CryptoJS = require("crypto-js");

const hashPassword = (
  password: string
) => CryptoJS.SHA256(password).toString();

module.exports = {
  hashPassword,
};