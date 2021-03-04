

const UploadImage = (req, res) => {
  
    let sampleFile;
  let uploadPath;
  
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile; 

  if(sampleFile.size > 500 * 1024) { //500kb 
     return res.send('Imagen mayor a 500kb :(');
  }
  console.log(req.files)

  
  uploadPath = '/var/www/html/logos/' +  sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('Logo Cargado!');
  });
}

 


module.exports = {
    UploadImage
    //,    convertImage
  }