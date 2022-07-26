console.log("Hello from Style JS")

function showHome (){
    toMakeAllDisplayNone()
    eatHamBurger()
    document.querySelector(".homeLink").style.color = "orange"
    document.querySelector(".homeContent").style.display = "flex";
}
function showAbout (){
    toMakeAllDisplayNone()
    eatHamBurger()
    document.querySelector(".aboutLink").style.color = "orange";
    document.querySelector(".aboutContent").style.display = "flex";
}
function showWeb (){
    toMakeAllDisplayNone()
    eatHamBurger()
    document.querySelector(".webLink").style.color = "orange";
    document.querySelector(".webProjects").style.display = "flex";
}
function showWork (){
    toMakeAllDisplayNone()
    eatHamBurger()
    document.querySelector(".workLink").style.color = "orange";
    document.querySelector(".workContent").style.display = "flex";
}
function showComments (){
    toMakeAllDisplayNone()
    eatHamBurger()
    document.querySelector(".commentLink").style.color = "orange";
    document.querySelector(".commentContent").style.display = "flex";
}
function showContact (){
    toMakeAllDisplayNone()
    eatHamBurger()
    document.querySelector(".contactLink").style.color = "orange";
    document.querySelector(".contactContent").style.display = "flex";
}

let toMakeAllDisplayNone = ()=>{
    let count = document.querySelectorAll(".displayNone");
    for (i=0;i<count.length;i+=1){count[i].style.display = "none"}
    count = document.querySelectorAll(".navLinks");
    for (i=0;i<count.length;i+=1){count[i].style.color = "white"}    
    
}

let homeLink = document.querySelector(".homeLink")
let aboutLink = document.querySelector(".aboutLink")
let webLink = document.querySelector(".webLink")
let workLink = document.querySelector(".workLink")
let commentLink = document.querySelector(".commentLink")
let contactLink = document.querySelector(".contactLink")
let hamContent = document.querySelector(".hamContent")
let commIcon = document.querySelector("#commIcon")


homeLink.addEventListener("click", showHome)
aboutLink.addEventListener("click", showAbout)
webLink.addEventListener("click", showWeb)
workLink.addEventListener("click", showWork)
commentLink.addEventListener("click", showComments)
contactLink.addEventListener("click", showContact)
commIcon.addEventListener("click", showContact)


let hamImage = document.querySelector(".hamImage").addEventListener('click',cookHamBurger)

function cookHamBurger(){
    if (hamContent.style.display != "flex"){
        hamContent.setAttribute("style","z-index: 1");
        hamContent.appendChild(homeLink)
        hamContent.appendChild(aboutLink)
        hamContent.appendChild(workLink)
        hamContent.appendChild(webLink)
        hamContent.appendChild(commentLink)
        hamContent.style.display = "flex";
    }else{eatHamBurger();console.log("HAm")}
}
function eatHamBurger(){
    hamContent.style.display = "none";
    let navBar = document.querySelector(".navBar")
    navBar.appendChild(homeLink)
    navBar.appendChild(aboutLink)
    navBar.appendChild(workLink)
    navBar.appendChild(webLink)
    navBar.appendChild(commentLink)
}




//----------ALL REQUEST HANDLING PART----------


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
            count = 1
            loadComments();
        })

    }

    
}

function contactSubmitHandler(){
    let nameContact = document.querySelector("#nameContact").value;
    let emailContact = document.querySelector("#emailContact").value;
    let messageContact = document.querySelector("#messageContact").value;
    if (nameContact.length<3){
        alert("Enter Valid Name")      
    }else if (messageContact.length<4){
        alert("Enter Valid message")
    }else{
        let date = new Date()
        currentTime = {
            hours: date.getHours(),
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        }
        arg={
            method: 'post',
            headers: {"Content-Type":"application/JSON"},
            body: JSON.stringify({
                name: nameContact,
                email: emailContact,
                message : messageContact,
                time: currentTime
            })
        }
        async function postMessage(){
            res = await fetch ('/newMessage',arg);
            data = res.json();
            return data;
        }
        postMessage().then((data)=>{
            showHome();
            alert(data);
        })
    }
    

}


function loadComments (){
    async function getData(){
        res = await fetch(`/getComment/${count}`);
        data = await res.json();
        return data;
        
    }
    getData().then((data)=>{
        commentDomManipulator(data);
        count = count+1;
    })
}

function commentDomManipulator(data){
    try {
        document.getElementById("commentBy1").innerHTML = data[0].name
        document.getElementById("timeShower1").innerHTML = timeStringMaker(data[0].time)
        document.getElementById("comment1").innerHTML = data[0].message
    } catch(error){
        console.log(error)
    }
    try {
        document.getElementById("commentBy2").innerHTML = data[1].name
        document.getElementById("timeShower2").innerHTML = timeStringMaker(data[1].time)
        document.getElementById("comment2").innerHTML = data[1].message
    } catch (error) {
        console.log("No data to fetch",)
    }
    
}
let timeStringMaker = (element)=>{return `${element.hours}:00 Hrs, ${element.day} - ${element.month} - ${element.year}`}


document.querySelector(".commentSubmit").addEventListener("click",commentSubmitHandler)
document.querySelector(".contactSubmit").addEventListener("click",contactSubmitHandler)
document.querySelector(".loadMoreComments").addEventListener("click",loadComments)

loadComments();



