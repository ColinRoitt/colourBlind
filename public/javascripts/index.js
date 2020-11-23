document.getElementById('upload').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#form_loading').classList.remove('is-hidden');

    let formData = new FormData();
    let file = document.getElementById('file').files[0];
    formData.append("sampleFile", file);

    fetch("/upload", {
      body: formData,
      method: "post"
    }
    ).then((pathData) => {
      pathData.json()
        .then(pathJson => {
          if (pathJson.status != 'success') {
            document.querySelector('.error').hidden = false;
          }
          document.querySelector('#orig').src = pathJson.original;
          document.querySelector('#form').classList.add('is-hidden');
          document.querySelector(`#cont`).classList.remove('is-hidden');
          document.querySelectorAll('.output').forEach(el => {
            fetch(`/convert/${el.id}/${pathJson.path}`).then(image => {
              image.json()
                .then(imageJson => {
                  el.setAttribute('src', imageJson);
                  fetch(`/delete/${pathJson.path}`);
                });
            });
          });
        });
    });
  });