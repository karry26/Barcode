
/* Ist Install : Body-Parser and Multer modules */
var express=require("express");
var bodyParser=require("body-parser");//npm install body-parser
var multer=require("multer"); //npm install multer

var app=express();
app.use(bodyParser.urlencoded({extended: true}));

//Setting storage space
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"-"+ file.originalname );
    }
  });
   var upload = multer({ storage: storage });

   app.post('/getpic', upload.single('pic'), (req, res) => {
    
    if (!req.file)
     {
      const error = new Error('Please upload a file')
      
      return error;
    }
    res.setHeader('Content-Type','text/html');
    //Accessing text box data
       res.write(req.body.uid+"<br>");
    
       //reading full file details
      res.write(JSON.stringify(req.file));
     res.end();
     //console.log(JSON.stringify(req.body))
     //console.log("------------------------------");
     //console.log(JSON.stringify(file));
     console.log("Original File name:"+req.file.originalname);//used for saving in database
     
   });

   //-----------------


app.get("/",(req,resp)=>{
    resp.sendFile(__dirname+"/post-file.html");
});
            

app.listen(3000,()=>{
    console.log("server started");
});


/*
        SAVE IMAGE IN MONGODB
app.post('/uploadphoto', upload.single('picture'), (req, res) => {
    var img = fs.readFileSync(req.file.path);
 var encode_image = img.toString('base64');
 // Define a JSONobject for the image attributes for saving to database
  
 var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };
db.collection('quotes').insertOne(finalImg, (err, result) => {
    console.log(result)
 
    if (err) return console.log(err)
 
    console.log('saved to database')
    res.redirect('/')
   
     
  })
})
*/

/*
        FETCH IMAGES FROM MONGO DB
app.get('/photos', (req, res) => {
db.collection('mycollection').find().toArray((err, result) => {
 
      const imgArray= result.map(element => element._id);
            console.log(imgArray);
 
   if (err) return console.log(err)
   res.send(imgArray)
 
  })
});

*/

/*
Since we already know the id's of the images, we can view an 
image by passing its id in the browser, as illustrated below.    
VIEW IMAGE IN BROWSER

app.get('/photo/:id', (req, res) => {
var filename = req.params.id;
 
db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
 
    if (err) return console.log(err)
 
   res.contentType('image/jpeg');
   res.send(result.image.buffer)
   
    
  })
})


*/