//basic session storage 

import express from "express";
import session from "express-session";

const app = express();
const PORT=3000

app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 10000 // session will expire after 10 seconds
    }
}))

app.get('/',(req,res)=>{
    if(req.session.views){
        req.session.views++
        res.send(`you came on this page ${req.session.views} times, your session has ${req.session.cookie.maxAge/1000} seconds left.`)
    }else{
        req.session.views = 1
        res.send(`welcome to this page for first time`)
    }    console.log(req.session)

})

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`)
    
})