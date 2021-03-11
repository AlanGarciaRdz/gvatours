const imageToBase64 = require('image-to-base64');

const UploadImage = (req, res) => {
  
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.files; 

  if(sampleFile.size > 500 * 1024) { //500kb 
     return res.status(406).send('Imagen mayor a 500kb :(');
  }
  
  uploadPath = '/var/www/html/logos/' +  sampleFile.name;
  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, async function(err) {
    if (err)
      return res.status(500).send(err);

    ImageBase64(uploadPath).then(base64 => {
        res.send({ status: 'Logo Cargado!' , 'logo': sampleFile.name, base64} );
    })
  });
}

const ImageBase64 =  Path => {
    return new Promise(async (res, rej) => {
        imageToBase64(Path) // Path to the image
        .then(
            (response) => {
                res(response); // "cGF0aC90by9maWxlLmpwZw=="
        })
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    })
}

 


module.exports = {
    UploadImage
  }