import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    const currentTime = new Date()
    let currentSec = currentTime.getSeconds()
    const maxSec = currentSec + 10

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');

    const interValID = setInterval(()=>{
        currentSec++
        if(currentSec===maxSec){

            clearInterval(interValID)
            res.end()
        }
        res.write(`data: ${currentSec}\n\n`);
    },1000)

    res.on('close', () => {
        console.log('client dropped me');
        clearInterval(interValID);
        res.end();
    });
})

export default router