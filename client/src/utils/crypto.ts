import CryptoJS from "crypto-js";

const FRONTEND_SECRET =
  "resolute-solution-frontend";

export const encryptData = (
  data: unknown
) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    FRONTEND_SECRET
  ).toString();
};

export const decryptData = (
  encryptedData: string
) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    FRONTEND_SECRET
  );

  return JSON.parse(
    bytes.toString(CryptoJS.enc.Utf8)
  );
};