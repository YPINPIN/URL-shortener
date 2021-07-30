// 複製按鈕
const btnCopy = document.querySelector('.btnCopy')
// 短網址
const shortUrl = document.querySelector('#shortUrl')

// 複製短網址
function onCopyClicked() {
  /* Select the text field */
  shortUrl.select();
  /* For mobile devices */
  shortUrl.setSelectionRange(0, 99999);
  /* Copy the text inside the text field */
  document.execCommand("copy")
  /* Alert the copied text */
  alert("Copied the shortUrl: " + shortUrl.value)
}

btnCopy.addEventListener('click', onCopyClicked)