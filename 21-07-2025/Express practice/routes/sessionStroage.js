import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(cookieParser());

app.use(session({
   secret: 'sample-secret',
   resave: false,
   saveUninitialized: false
}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});


export default app;