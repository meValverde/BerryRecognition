const uri = 'https://gentle-forest-08ae55e03.azurestaticapps.net/api/BerryRecog';

function analyzeImage() {   
    var imageUrl = document.getElementById('imageUrlInput').value;
    var isValidUrl = validateUrl(imageUrl);
    

    if (isValidUrl == false) {
        document.getElementById('imageDescription').innerHTML = 'Du har ikke angivet en valid url';
        return;
    }

   const jsonBodyItem = {
        imageUrl: imageUrl
   };

    fetch(uri,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Prediction-Key':'c577dc58f5374413a3fea829c4938399'
              },
            body: JSON.stringify(jsonBodyItem)
        })
        
        .then(response => {
            return response.json()
        })
        .then(data => {
            var imageDiv = document.getElementById('previewImageContainer');
            imageDiv.innerHTML = "";

            var imgTag = document.createElement('img');
            imgTag.src = imageUrl;
            imgTag.classList = 'img-fluid';

            imageDiv.appendChild(imgTag);
            
            var fullTextResponse = '<h4>Analyze result</h4>';
            

            fullTextResponse += '<p><b>Berry</b>: ' + data.predictions.tagName+ '.<p/> <br/>';


            document.getElementById('imageDescription').innerHTML = fullTextResponse;
     

            console.log(data)
        })
        .catch(err => {
            document.getElementById('imageDescription').innerHTML = err.message;
        })
}

function validateUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}