var btnClose = document.getElementById('btnClose');
var overlay1 = document.getElementById('overlay1');

btnClose.addEventListener('click',closePopup);

function closePopup(){
  overlay1.style.display = 'none';
}
