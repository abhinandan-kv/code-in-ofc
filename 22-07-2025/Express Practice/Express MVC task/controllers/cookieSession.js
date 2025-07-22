import express from 'express';
import session from 'express-session';  

const router = express.Router();

router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

router.get('/',(req,res)=>{
    if(req.session.views){
        req.session.views++;
        res.send(`you came on this page ${req.session.views} times, your session has ${req.session.cookie.maxAge/1000} seconds left.`);
    }else{
        req.session.views = 1;
        res.send(`welcome to this page for first time`);
    }
})

export default router;