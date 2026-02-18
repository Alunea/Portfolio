const aboutMeBtn = document.getElementById("btn-about-me");
const aboutMePage = document.getElementById("about-me-page");
const projectsBtn = document.getElementById("btn-project");
const projectsPage = document.getElementById("projects-page");
const contactBtn = document.getElementById("btn-contact");
const contactPage = document.getElementById("contact-page");
const enterBtn = document.getElementById("btn-enter");
const mainMenuPage = document.getElementById("main-page");
const welcomeScreen = document.getElementById("welcome-screen");


const windows = document.querySelectorAll(".window"); 

let isDragging = false; 
let currentWindow = null; 
let offsetX, offsetY; 

enterBtn.onclick = function(){
    mainMenuPage.style.display = "block";
    welcomeScreen.style.display ="none";

}

aboutMeBtn.onclick = function() {
    aboutMePage.style.display = "block"; 
};

projectsBtn.onclick = function(){
    projectsPage.style.display ="block";
};

contactBtn.onclick = function(){
    contactPage.style.display = "block";
};

windows.forEach(window => {
    const header = window.querySelector('.window-header'); 
    const btnClose = window.querySelector('.btn-close');
    const btnMax = window.querySelector('.btn-max');

    if(btnClose) {
        btnClose.onclick = (event) => {
            event.stopPropagation();
            window.style.display = "none";
        };
    }

    if(btnMax) {
        btnMax.onclick = (event) => {
            event.stopPropagation();
            window.classList.toggle("full-screen");

            if (window.classList.contains("full-screen")) {
            window.style.top = "";
            window.style.left = "";
            } 
        };
    }

    if(header) {
        header.addEventListener("mousedown", (event) => {
            isDragging = true; 
            currentWindow = window;
            offsetX = event.clientX - window.offsetLeft;
            offsetY = event.clientY - window.offsetTop;
            header.style.cursor = 'grabbing';
        });
    }
});

document.addEventListener("mousemove", (event) => {
    if(isDragging && currentWindow && !currentWindow.classList.contains("full-screen")){
        currentWindow.style.left = (event.clientX - offsetX) + "px"; 
        currentWindow.style.top = (event.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false; 
    currentWindow = null; 
});
