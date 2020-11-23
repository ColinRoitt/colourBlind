document.getElementById('upload').addEventListener('click', (e) => {
    e.preventDefault();
    
    let formData = new FormData();
    let file = document.getElementById('file').files[0];
    if(!file){
      alert('Please upload an image before continuing');
      return;
    }
    formData.append("sampleFile", file);
    
    document.querySelector('#form_loading').classList.remove('is-hidden');

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

          document.querySelector(`#mod_orig img`).setAttribute('src', pathJson.original);
          document.querySelector('#orig').addEventListener('click', () => {
            document.querySelector(`#mod_orig`).classList.add('is-active');
          });

          document.querySelectorAll('.output').forEach(el => {
            fetch(`/convert/${el.id}/${pathJson.path}`).then(image => {
              image.json()
                .then(imageJson => {
                  el.setAttribute('src', imageJson);
                  document.querySelector(`#mod_${el.id} img`).setAttribute('src', imageJson);
                  el.addEventListener('click', () => {
                    document.querySelector(`#mod_${el.id}`).classList.add('is-active');
                  });
                  fetch(`/delete/${pathJson.path}`);
                });
            });
          });
        });
    });
  });