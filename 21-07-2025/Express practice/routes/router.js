import express from 'express'

const app = express()
const router = express.Router()

router.post('/', function(req, res){
   res.send('POST route on things.');
});



export default router