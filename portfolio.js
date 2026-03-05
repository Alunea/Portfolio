const aboutMeBtn = document.getElementById("btn-about-me");
const aboutMePage = document.getElementById("about-me-page");
const projectsBtn = document.getElementById("btn-project");
const projectsPage = document.getElementById("projects-page");
const contactBtn = document.getElementById("btn-contact");
const contactPage = document.getElementById("contact-page");
const enterBtn = document.getElementById("btn-enter");
const mainMenuPage = document.getElementById("main-page");
const welcomeScreen = document.getElementById("welcome-screen");

// Les icônes de projets (dans la grille)
const projectIcon1 = document.getElementById("project-1");
const projectIcon2 = document.getElementById("project-2");
const projectIcon3 = document.getElementById("project-3");
const projectIcon4 = document.getElementById("project-4");

// Les pages de détails
const projectPage1 = document.getElementById("project-1-page");
const projectPage2 = document.getElementById("project-2-page");
const projectPage3 = document.getElementById("project-3-page");
const projectPage4 = document.getElementById("project-4-page");

// On récupère toutes les fenêtres (y compris les projets)
const allWindows = document.querySelectorAll(".window"); 

let isDragging = false; 
let currentWindow = null; 
let offsetX, offsetY; 
let highestZ = 1000;

// --- 1. GESTION DU PREMIER PLAN (FOCUS) ---
// On écoute n'importe quel clic sur le document
document.addEventListener("mousedown", (event) => {
    // On cherche si l'élément cliqué est une fenêtre ou se trouve dans une fenêtre
    const clickedWindow = event.target.closest(".window");
    if (clickedWindow) {
        bringToFront(clickedWindow);
    }
});

// --- 2. OUVERTURE DES FENÊTRES ---
enterBtn.onclick = function(){
    mainMenuPage.style.display = "flex";
    welcomeScreen.style.display ="none";
}

aboutMeBtn.onclick = () => openWindow(aboutMePage);
projectsBtn.onclick = () => openWindow(projectsPage);
contactBtn.onclick = () => openWindow(contactPage);

if(projectIcon1) projectIcon1.onclick = () => openWindow(projectPage1);
if(projectIcon2) projectIcon2.onclick = () => openWindow(projectPage2);
if(projectIcon3) projectIcon3.onclick = () => openWindow(projectPage3);
if(projectIcon4) projectIcon4.onclick = () => openWindow(projectPage4);

function openWindow(win) {
    if(!win) return; 
    win.style.display = "flex"; 
    bringToFront(win);
    
    win.classList.remove("full-screen");
    // On garde le centrage initial
    win.style.top = "50%";
    win.style.left = "50%";
    win.style.transform = "translate(-50%, -50%)";
}

// --- 3. LOGIQUE BOUTONS ET DRAG ---
allWindows.forEach(window => {
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

    // Détection du début du drag (uniquement sur le header ou la fenêtre elle-même)
    window.addEventListener("mousedown", (event) => {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.tagName === 'IFRAME') return;

        isDragging = true; 
        currentWindow = window;
        const rect = window.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        window.style.cursor = 'grabbing';
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
    isDragging = false; 
    if (currentWindow) currentWindow.style.cursor = 'grab';
    currentWindow = null; 
});

function bringToFront (windowElement) {
    highestZ += 10;
    windowElement.style.zIndex = highestZ;
}