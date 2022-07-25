const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// const fetch = require('node-fetch');

require('dotenv').config()  //requiring dotenv  
// remember to add the .env file to the .gitignore

const mongodbPassword = process.env.MONGODBPASSWORD      // storing the value of the password in a constant variable  

const portNo = process.env.PORT || 80;    // When we run the app on a server, the hosting platform will itself give us a port number that will be in the .env file, something we can't see pr specify 
 // By the `|| 80` I am telling the server, if there is not port given by the hosting platform, use 80.


//MIDDLEWARES:
app.use(express.json())
app.use(express.static(path.join(__dirname,"./static")));

//MONGOOSE:
main().then(error=>{
    console.log("running");
}).catch(error=>console.log(error))
// async function main(){await mongoose.connect('mongodb://localhost:27017/portfolio')}
async function main(){await mongoose.connect(`mongodb+srv://krintanjan101mongo:${mongodbPassword}@myportfolioproject.py7jz.mongodb.net/portfolio?retryWrites=true&w=majority`)}


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