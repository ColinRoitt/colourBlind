"use strict";

document.getElementById('upload').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('#form_loading').classList.remove('is-hidden');
  var formData = new FormData();
  var file = document.getElementById('file').files[0];
  formData.append("sampleFile", file);
  fetch("/upload", {
    body: formData,
    method: "post"
  }).then(function (pathData) {
    pathData.json().then(function (pathJson) {
      if (pathJson.status != 'success') {
        document.querySelector('.error').hidden = false;
      }

      document.querySelector('#orig').src = pathJson.original;
      document.querySelector('#form').classList.add('is-hidden');
      document.querySelector("#cont").classList.remove('is-hidden');
      document.querySelectorAll('.output').forEach(function (el) {
        fetch("/convert/".concat(el.id, "/").concat(pathJson.path)).then(function (image) {
          image.json().then(function (imageJson) {
            el.setAttribute('src', imageJson);
            fetch("/delete/".concat(pathJson.path));
          });
        });
      });
    });
  });
});