import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import pug from "pug";
import db from "./database/db.js";
import route from "./routes/route.js";

const app = express();
const PORT = 3000;
const upload = multer();


app.get('/',(req,res)=>{
    res.render('form')
})

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array())
app.use(express.static('public'));

app.post('/',(req,res)=>{
    //console.log(req.body);
    db.push(req.body);
    console.log(db);
    res.send('Received the data');   
})

app.use(route)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
