console.log("Hello from Engine JS")
let count = 1;

let commentSubmitHandler = ()=>{
    let commentName = document.getElementById("commentName").value;
    let newComment = document.getElementById("newComment").value;
    if (commentName.length<3){
        alert("Enter valid name")
    }else if(newComment.length<10){
        alert("Comment has to be more than 10 letters")
    }else {
        let date = new Date()
        currentTime = {
            hours: date.getHours(),
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        }
        console.log("This is correct")
        let arg = {
            method: 'post',
            headers:{'Content-Type':'application/JSON'},
            body: JSON.stringify({
                name: commentName,
                comment: newComment,
                time: currentTime
            })
        }
        async function postComment(){
            res = await fetch('/newComment',arg);
            data = res.json();
            return data;
        }
        postComment().then((data)=>{
            alert(data)
        })

    }

    
}

function contactSubmitHandler(){
    let nameContact = document.querySelector("#nameContact").value;
    let emailContact = document.querySelector("#emailContact").value;
    let messageContact = document.querySelector("#messageContact").value;
    // let submitContact = document.querySelector("#submitContact");
    if (nameContact<3){
        alert("Enter Valid Name")
    }else if (messageContact<4){
        alert("Enter Valid message")
    }else{
        arg={
            method: 'post',
            headers: {"Content-Type":"application/JSON"},
            body: JSON.stringify({
                name: nameContact,
                email: emailContact,
                message : messageContact
            })
        }
        async function postMessage(){
            res = await fetch ('/newMessage',arg);
            data = res.json();
            return data;
        }
        postMessage().then((data)=>{
            alert(data);
            console.log(data);
            console.log(data)
        })
    }
    

}


function loadComments (){
    async function getData(){
        res = await fetch(`/getComment/${count}`)
        data = await res.json()
        return data
    }
    getData().then((data)=>{
        commentDomManipulator(data)
        count = count+1;
    })
}

function commentDomManipulator(data){
    document.getElementById("commentBy1").innerHTML = data[0].name
    document.getElementById("timeShower1").innerHTML = timeStringMaker(data[0].time)
    document.getElementById("comment1").innerHTML = data[0].message
    document.getElementById("commentBy2").innerHTML = data[1].name
    document.getElementById("timeShower2").innerHTML = timeStringMaker(data[1].time)
    document.getElementById("comment2").innerHTML = data[1].message
}
let timeStringMaker = (element)=>{return `${element.hours}:00 Hrs, ${element.day} - ${element.month} - ${element.year}`}


document.querySelector(".commentSubmit").addEventListener("click",commentSubmitHandler)
document.querySelector(".contactSubmit").addEventListener("click",contactSubmitHandler)
document.querySelector(".loadMoreComments").addEventListener("click",loadComments)

loadComments();



