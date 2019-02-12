$(document).ready(function() {
  $('.multiselect-cervezo').select2({
    placeholder : "Escribe tus cervezas aquí...",
    allowClear : true
  });
});

const beerBtn = document.getElementById('btn-consumed-beers')

beerBtn.onclick = () => {
  const userid = document.URL.split('/')[document.URL.split('/').length-1]
  const beers = ($('#consumed-beers').select2('data')).map(el => el.id)
  const url = `/seleccion/${userid}`
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhr.send(JSON.stringify({
    "beers": beers
  }));
  window.location.href = `/onboarding/${userid}`;
}
