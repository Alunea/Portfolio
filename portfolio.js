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

const windows = document.querySelectorAll(".window"); 

let isDragging = false; 
let currentWindow = null; 
let offsetX, offsetY; 
let highestZ = 1000;

// ECRAN D'ACCUEIL
enterBtn.onclick = function(){
    mainMenuPage.style.display = "flex";
    welcomeScreen.style.display ="none";
}

// NAVIGATION MENU PRINCIPAL
aboutMeBtn.onclick = () => openWindow(aboutMePage);
projectsBtn.onclick = () => openWindow(projectsPage);
contactBtn.onclick = () => openWindow(contactPage);

// CLIC SUR LES PROJETS
if(projectIcon1) projectIcon1.onclick = () => openWindow(projectPage1);
if(projectIcon2) projectIcon2.onclick = () => openWindow(projectPage2);
// Tu pourras ajouter le 3 et 4 ici plus tard

// FONCTION UNIVERSELLE POUR OUVRIR UNE FENÊTRE
function openWindow(win) {
    if(!win) return; // Sécurité si la page n'existe pas
    win.style.display = "flex"; // Obligatoire pour le centrage CSS
    bringToFront(win);
    
    // Reset de la position au centre au cas où elle aurait été bougée
    win.classList.remove("full-screen");
    win.style.top = "50%";
    win.style.left = "50%";
    win.style.transform = "translate(-50%, -50%)";
}

// LOGIQUE COMMUNE (Fermeture, Maximisation, Drag)
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

    // Gestion du déplacement (Drag)
    window.addEventListener("mousedown", (event) => {
        // Ne pas draguer si on clique sur un bouton ou un input
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

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
    highestZ += 10;
    windowElement.style.zIndex = highestZ;
}