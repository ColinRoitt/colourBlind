document.getElementById('upload').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.form_loading').hidden = false;

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
          document.querySelector('#form').hidden = true;
          document.querySelector(`.cont`).hidden = false;
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