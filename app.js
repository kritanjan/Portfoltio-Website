const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// const fetch = require('node-fetch');


const portNo = 80;

//MIDDLEwARES:
app.use(express.json())
app.use(express.static(path.join(__dirname,"./static")));

//MONGOOSE:
main().catch(error=>console.log(error))
async function main(){await mongoose.connect('mongodb://localhost:27017/portfolio')}

const commentSchema = mongoose.Schema({
    name: String,
    message: String,
    time: Object,
    review : Boolean,
})

const Comment = mongoose.model("Comment",commentSchema)

let count = 2;


// //RETRIEVING WEATHER DATA
// const key = '703e6fb84c33bb2899f9280e4abed880'
// async function getWeather (){
//     let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=23.8&lon=91.2&appid=${key}&units=metric`);
//     let data = res.json()
//     return data;
// }
// getWeather().then((data)=>{
//     console.log(data);
// })


//APP. ROUTES

app.get('/getComment/:count',(req,res)=>{
    num = req.params.count;
    console.log(num);
    Comment.find(
        {review: true},
        {
            name: 1,
            message: 1,
            time: 1
        },
        (error,response)=>{
            for (;(response[num]);num--){
                res.send([response[num],response[num-1]])
                break;
            }
        }) 
})

app.post('/newComment', (req,res)=>{
    console.log(req.body.name)
    try {
        let obj = new Comment({
            name: req.body.name,
            message: req.body.comment,
            time: req.body.time,
            review: true,
        })
        obj.save((error,element)=>{
            if (error){
                console.log(error)
            } else {console.log(element)}
        })        
    } catch (error) {
        console.log(error)
    }
    res.json("Done")
})


app.post('/newMessage', (req,res)=>{
    console.log(req.body.name)
    res.json("Done")
})


//LISTENER
app.listen(portNo,()=>{
    console.log(`Server running at http://127.0.0.1:${portNo}`)
})