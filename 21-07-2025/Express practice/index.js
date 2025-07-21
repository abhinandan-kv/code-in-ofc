import express from "express";
import router from "./routes/router.js"; 
import allHtmlMethods from './routes/allHtmlMethods.js'
import dynamicRoute from './routes/dynamicRoute.js'
import template from "./routes/template.js";
import form from './routes/form.js'
import session from './routes/sessionStroage.js';

const app = express();


app.get("/", (req, res) => res.send("Hello World"));

app.post("/post", (req,res)=>res.send("Post method used."))

//app.all("/post", (req,res)=>res.send("Post method used."))

// calling router file
app.use('/router', router)

app.use('/allhtmlmethods', allHtmlMethods)

app.use('/dynamicRoute', dynamicRoute)

app.use('/template', template);

app.use('/form', form)

app.use('/session', session)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
});

