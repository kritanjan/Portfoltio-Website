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
main().then(error=>{
    console.log("running");
}).catch(error=>console.log(error))
// async function main(){await mongoose.connect('mongodb://localhost:27017/portfolio')}
async function main(){await mongoose.connect('mongodb+srv://krintanjan101mongo:Oqp4PyX0h4TY5XBZ@myportfolioproject.py7jz.mongodb.net/portfolio?retryWrites=true&w=majority')}


const commentSchema = mongoose.Schema({
    name: String,
    message: String,
    time: Object,
    review : Boolean,
})

const Comment = mongoose.model("Comment",commentSchema)



//APP. ROUTES

app.get('/getComment/:count',(req,res)=>{
    num = req.params.count-1;
    console.log("From get:   ",num);
    Comment.find(
        {review: true},
        {
            name: 1,
            message: 1,
            time: 1
        },
        (error,response)=>{
            if (error){
                console.log(error)
            }else {
            for (;(response[num]);num--){
                console.log(response)
                res.send([response[num],response[num-1]])
                break;
            }}
        }) 
})

app.post('/newComment', (req,res)=>{
    console.log("From Post:   ",req.body.name)
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
            } else {console.log("saved to database\n\n",element)}
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