const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// const fetch = require('node-fetch');

require('dotenv').config()  

const mongodbPassword = process.env.MONGODBPASSWORD  

const portNo = process.env.PORT || 80;    

//MIDDLEWARES:
app.use(express.json())
app.use(express.static(path.join(__dirname,"./static")));

//MONGOOSE:
main().then(error=>{;
}).catch(error=>console.log(error))
// async function main(){await mongoose.connect('mongodb://localhost:27017/portfolio')}
async function main(){await mongoose.connect(`mongodb+srv://krintanjan101mongo:${mongodbPassword}@myportfolioproject.py7jz.mongodb.net/portfolio?retryWrites=true&w=majority`)}


const commentSchema = mongoose.Schema({
    name: String,
    message: String,
    time: Object,
    review : Boolean,
})
const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message : String,
    time: Object
})

const Comment = mongoose.model("Comment",commentSchema)
const Contact = mongoose.model("Contact",contactSchema)


let docCount
Comment.find().count(function(err, count){
    docCount = count;
})

//APP. ROUTES

app.get('/getComment/:count',(req,res)=>{
    num = req.params.count;
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
                res.end().status(404)
            }else {
                res.send([response[docCount-num],response[docCount-num-1]])
            }
        })
})

app.post('/newComment', (req,res)=>{
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
            }
        })        
    } catch (error) {
        console.log(error)
    }
    docCount++;
    res.json("Your comment was posted")
})


app.post('/newMessage', (req,res)=>{
    try {
        let obj = new Contact({
            name: req.body.name,
            message: req.body.message,
            email: req.body.email,
            time: req.body.time,
        })
        obj.save((error,element)=>{
            if (error){
                console.log(error)
            } 
        })        
    } catch (error) {
        console.log(error)
    }
    res.json("Your message was posted.")
})


//LISTENER
app.listen(portNo,()=>{})