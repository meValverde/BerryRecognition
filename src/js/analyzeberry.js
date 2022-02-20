const uri = 'https://gentle-forest-08ae55e03.azurestaticapps.net/api/BerryRecog';

function analyzeImage() {   
    var imageUrl = document.getElementById('imageUrlInput').value;
    var isValidUrl = validateUrl(imageUrl);
    
    

    if (isValidUrl == false) {
        document.getElementById('imageDescription').innerHTML = 'Invalid URL';
        return;
    }

    const jsonBodyItem = {
       imageUrl: imageUrl
    };

    fetch(uri,
        {
            method: 'POST',
            body:JSON.stringify(jsonBodyItem)
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
            

            fullTextResponse += '<p><b>Berry</b>: ' + data.predictions[0].tagName+ '.<p/> <br/>';
            switch(data.predictions[0].tagName){
                case "blåbær":
                case "havtorn":
                case "hindbær":
                case "tranebær":
                        fullTextResponse+='<b>Its edible!</b><br />'
                        break;
                case "havtorn":
                case "taks":
                    fullTextResponse+='<b>Its edible!</b><br />'
                    break;
              
                
             }
            /*
            if ( data.predictions[0].tagName == "blåbær"){
                fullTextResponse+='<b>Its edible!</b><br />';
            }

            else if ( data.predictions[0].tagName == "havtorn"){
                fullTextResponse+='<b>Its edible!</b><br />';
            }

            else if ( data.predictions[0].tagName == "hindbær"){
                fullTextResponse+='<b>Its edible!</b><br />';
            }

            else if ( data.predictions[0].tagName == "snebær"){
                fullTextResponse+='<b>DONT eat it!</b><br />';
            }

            else if ( data.predictions[0].tagName == "taks"){
                fullTextResponse+='<b>DONT eat it!</b><br />';
            }

            else if ( data.predictions[0].tagName == "tranebær"){
                fullTextResponse+='<b>Its edible!</b><br />';
            }

            document.getElementById('imageDescription').innerHTML = fullTextResponse;*/
     

           
        })
        .catch(err => {
            document.getElementById('imageDescription').innerHTML = err.message;
        })
}

function validateUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(str);
}