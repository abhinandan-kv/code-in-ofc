import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");


app.get('/', function(req, res){
    res.render('content');
});

export default app;