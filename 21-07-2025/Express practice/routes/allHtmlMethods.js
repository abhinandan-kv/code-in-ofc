import express from 'express';

const app = express()
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("Get method is used here")
})

router.post('/', (req,res)=>res.send("Post method is used here"))

router.delete('/', (req,res)=> res.send("delete method called"))

router.patch('/', (req,res)=> res.send('patch method is used'))

router.put('/', function (req,res){
    res.send('Put method called here')
})

export default router