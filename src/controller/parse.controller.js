const Joi = require('joi');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// set the temp storage for processing the file
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, './tmp'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

//check that file is mime type text
const filter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "text") {
    cb(null, true);
  } else {
    cb (new Error("File must be a text file!"), false);
  }
}

//set size limit to 1GB
const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: {fileSize:  1073741824}
}).single('file');


//main parse controller
const parse = async (req, res) => {
  //upload and validate the file  
  upload(req, res, async function (err) {
    if(err instanceof multer.MulterError) {
      res.status(400).send({message: `Could not upload the file: ${err.message}` })
      return;
    } else if (err) {
      res.status(400).send({message: `Could not upload the file: ${err.message}` })
      return;
    }

    const top_n = req.body.top_n;
    const file = req.file;

    //validate the post body and that a file was submitted
    const {error} = validateRequest(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      cleanup(file.path);
      return;
    }
    if(req.file == undefined) {
      return res.status(400).send({message: "A file is required!"});
    }

    try{
      parseFile(file.path, top_n)
      .then ((response) => {
        cleanup(file.path);
        res.status(200).send({frequency: response});
      });
    }
    catch (err) {
      return res.status(400).send({message: err.message});
    }
  });
}

//lets cleanup the directory
function cleanup(path){
  fs.unlink(path, function(err){
    if(err){
      throw new Error('Error occured removing the file');
    }
  });
}

function validateRequest(req){
  const schema = Joi.object({
    top_n: Joi.number().integer().min(1).required(),
  });
  return schema.validate(req);
}

//lets count the words
async function parseFile(path, top_n) {
  return new Promise((resolve, reject) => {
    let wordList = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(path, {encoding: 'utf8'})
    });

    rl.on('line', function (line) {
      //lets remove all punctuation, double blank spaces and make everything lower case
      text =  line.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toLowerCase();
      words = text.split(" ");
      words.forEach((word, index) => {
        //check null value
        if(words[index] == "") {
          return;
        }
        //check if alreadin in the list
        let wlIndex = wordList.findIndex(obj => {
          if(obj.word == word){
            return true;
          };
        })
        if (wlIndex === -1) {
          //mot in the list, so lets add it
          wordList.push({word: word, count: 1})
        } else {
          //in the list, so lets up the count
          wordList[wlIndex].count++;
        }
      })
    });

    rl.on('close', () => {
      //sort and return the top N
      wordList.sort((a, b) => b.count - a.count);
      (top_n <= wordList.length)
      let finalList = (top_n <= wordList.length) ? wordList.slice(0, top_n) : wordList;
      resolve(finalList);
    })
  })
 }
 

module.exports = {parse}


