var btnClose = document.getElementById('btnClose');
var overlay = document.getElementById('overlay');

btnClose.addEventListener('click',closePopup);

function closePopup(){
  overlay.style.display = 'none';
}
