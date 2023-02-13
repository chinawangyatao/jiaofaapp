import CryptoJS from 'crypto-js';

export function decryptFunction(word, keyStr) {
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
