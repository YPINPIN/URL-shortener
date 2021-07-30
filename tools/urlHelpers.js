const codeString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const codeLength = 5

// 驗證url：參考(https://stackoverflow.com/a/8234912)
function isValidation(url) {
  const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  return regex.test(url)
}

// urlCode
function randomUrlCode() {
  let urlCode = getRandomStr(codeString, codeLength)
  return urlCode
}

// 取亂數function[min(包括) ~ max(不包括)]
function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// 取隨機字符，預設長度一個
function getRandomStr(targetString, len = 1) {
  let randomString = ''
  for (let i = 0; i < len; i++) {
    randomString += targetString.charAt(getRandomIndex(0, targetString.length))
  }
  return randomString
}

module.exports = { isValidation, randomUrlCode }