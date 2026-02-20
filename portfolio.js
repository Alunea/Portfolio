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
let highestZ = 1000;

enterBtn.onclick = function(){
    mainMenuPage.style.display = "flex";
    welcomeScreen.style.display ="none";
}

aboutMeBtn.onclick = () => openWindow(aboutMePage);
projectsBtn.onclick = () => openWindow(projectsPage);
contactBtn.onclick = () => openWindow(contactPage);

function openWindow(win) {
    win.style.display = "flex";
    bringToFront(win);
}

windows.forEach(window => {
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
                window.style.top = "0";
                window.style.left = "0";
                window.style.transform = "none";
            } else {
                window.style.top = "50%";
                window.style.left = "50%";
                window.style.transform = "translate(-50%, -50%)";
            }
        };
    }

    window.addEventListener("mousedown", (event) => {
        if (event.target.tagName === 'BUTTON') return;

        isDragging = true; 
        currentWindow = window;

        const rect = window.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        window.style.cursor = 'grabbing';
        bringToFront(window);
    });
});

document.addEventListener("mousemove", (event) => {
    if(isDragging && currentWindow && !currentWindow.classList.contains("full-screen")){
        currentWindow.style.left = (event.clientX - offsetX) + "px"; 
        currentWindow.style.top = (event.clientY - offsetY) + "px";
        currentWindow.style.transform = "none";
    }
});

document.addEventListener("mouseup", () => {
    if (currentWindow) {
        currentWindow.style.cursor = 'grab';
    }
    isDragging = false; 
    currentWindow = null; 
});

function bringToFront (windowElement) {
    highestZ++;
    windowElement.style.zIndex = highestZ;
}