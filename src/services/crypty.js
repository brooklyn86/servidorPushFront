import CryptoJS from 'crypto-js';
const DADOS_CRIPTOGRAFAR = {
    key : '986431hash'
};
  
export function criptografarBearer(senha) {
    return CryptoJS.AES.encrypt(senha,DADOS_CRIPTOGRAFAR.key);
};

export async function descriptografarBearer(senha) {
    return await CryptoJS.AES.decrypt(senha,DADOS_CRIPTOGRAFAR.key).toString(CryptoJS.enc.Utf8);
};

