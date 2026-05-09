"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
const hashPassword = (password) => CryptoJS.SHA256(password).toString();
module.exports = {
    hashPassword,
};
//# sourceMappingURL=crypto.js.map