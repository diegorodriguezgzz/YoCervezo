$(document).ready(function () {
  $('.multiselect-cervezo').select2({
    placeholder: "Escribe tus cervezas aquí...",
    allowClear: true
  });
  
  $(".multiselect-cervezo-limit3").select2({
    placeholder: "Escribe tus cervezas aquí...",
    maximumSelectionLength: 3
  });
});
