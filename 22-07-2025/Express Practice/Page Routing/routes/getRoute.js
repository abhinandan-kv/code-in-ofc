import express from 'express'

const router = express.Router()

router.get('/',(req,res)=>{
    res.send('get method invoked')
    console.log('get method invoked')
})

router.post('/',(req,res)=>{
    res.send('post method invoked')
    console.log('post method invoked')
})

router.get('/:id', (req,res)=>{
    res.send(`get method with id : ${req.params.id}`)
})


export default router