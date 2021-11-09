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
           // headers: {
              //  'Content-Type': 'application/json',
              //  'Prediction-Key':'c577dc58f5374413a3fea829c4938399'
             // },
            image: 'https://www.jespersplanteskole.dk/media/catalog/product/cache/1/image/450x450/9df78eab33525d08d6e5fb8d27136e95/s/y/symphoricarpos_doorenbosii_white_hedge_79_95_13.jpg'
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
            console.log(data)
            
            var fullTextResponse = '<h4>Analyze result</h4>';
            

            fullTextResponse += '<p><b>Berry</b>: ' + data.predictions[0].tagName.text+ '.<p/> <br/>';


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