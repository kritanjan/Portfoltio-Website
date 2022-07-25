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

showContact()