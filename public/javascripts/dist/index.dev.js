"use strict";

document.getElementById('upload').addEventListener('click', function (e) {
  e.preventDefault();
  var formData = new FormData();
  var file = document.getElementById('file').files[0];

  if (!file) {
    alert('Please upload an image before continuing');
    return;
  }

  formData.append("sampleFile", file);
  document.querySelector('#form_loading').classList.remove('is-hidden');
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
      document.querySelector("#mod_orig img").setAttribute('src', pathJson.original);
      document.querySelector('#orig').addEventListener('click', function () {
        document.querySelector("#mod_orig").classList.add('is-active');
      });
      document.querySelectorAll('.output').forEach(function (el) {
        fetch("/convert/".concat(el.id, "/").concat(pathJson.path)).then(function (image) {
          image.json().then(function (imageJson) {
            el.setAttribute('src', imageJson);
            document.querySelector("#mod_".concat(el.id, " img")).setAttribute('src', imageJson);
            el.addEventListener('click', function () {
              document.querySelector("#mod_".concat(el.id)).classList.add('is-active');
            });
            fetch("/delete/".concat(pathJson.path));
          });
        });
      });
    });
  });
});