import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

const upload = multer();
const app = express();

app.get('/' , function(req, res){
    res.render('form')
})

app.set('view engine', 'pug')
app.set('views', './views/form')

app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

export default app