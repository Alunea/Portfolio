/* ========================================= 
    1. DÉCLARATION DES VARIABLES (DOM)
    ========================================= */

// Éléments de navigation principale
const enterBtn = document.getElementById("btn-enter");
const welcomeScreen = document.getElementById("welcome-screen");
const mainMenuPage = document.getElementById("main-page");

// Boutons du menu
const aboutMeBtn = document.getElementById("btn-about-me");
const projectsBtn = document.getElementById("btn-project");
const contactBtn = document.getElementById("btn-contact");
const resumeBtn = document.getElementById("btn-resume");

// Pages (Fenêtres)
const aboutMePage = document.getElementById("about-me-page");
const projectsPage = document.getElementById("projects-page");
const contactPage = document.getElementById("contact-page");
const resumePage = document.getElementById("resume-page");

// Icônes de projets (dans la grille)
const projectIcon1 = document.getElementById("project-1");
const projectIcon2 = document.getElementById("project-2");
const projectIcon3 = document.getElementById("project-3");
const projectIcon4 = document.getElementById("project-4");
const projectIcon5 = document.getElementById("project-5");
const projectIcon6 = document.getElementById("project-6");

// Pages de détails des projets
const projectPage1 = document.getElementById("project-1-page");
const projectPage2 = document.getElementById("project-2-page");
const projectPage3 = document.getElementById("project-3-page");
const projectPage4 = document.getElementById("project-4-page");
const projectPage5 = document.getElementById("project-5-page");
const projectPage6 = document.getElementById("project-6-page");

// Sélections globales
const allWindows = document.querySelectorAll(".window"); 
const nameElement = document.getElementById('name');

/* ========================================= 
    2. VARIABLES D'ÉTAT (LOGIQUE)
    ========================================= */

// Variables pour le décalage (Cascade)
let currentOffset = 0; 
const offsetStep = 250; 
const maxOffset = 300; 

// Variables pour le Drag & Drop
let isDragging = false; 
let currentWindow = null; 
let offsetX, offsetY; 
let highestZ = 5010;

/* ========================================= 
    3. GESTION DE L'OUVERTURE / NAVIGATION
    ========================================= */

// Entrée sur le site
enterBtn.onclick = function(){
    mainMenuPage.style.display = "flex";
    welcomeScreen.style.display ="none";
}

// Clics menu principal
aboutMeBtn.onclick = () => openWindow(aboutMePage);
projectsBtn.onclick = () => openWindow(projectsPage);
contactBtn.onclick = () => openWindow(contactPage);
resumeBtn.onclick = () => openWindow(resumePage);

// Clics icônes projets
// Clics icônes projets - Fermer le fullscreen projects avant d'ouvrir le détail
if(projectIcon1) projectIcon1.onclick = (event) => {
    event.stopPropagation();
    openWindow(projectPage1);
};
if(projectIcon2) projectIcon2.onclick = (event) => {
    event.stopPropagation();
    openWindow(projectPage2);
};
if(projectIcon3) projectIcon3.onclick = (event) => {
    event.stopPropagation();
    openWindow(projectPage3);
};
if(projectIcon4) projectIcon4.onclick = (event) => {
    event.stopPropagation();
    openWindow(projectPage4);
};
if(projectIcon5) projectIcon5.onclick = (event) => {
    event.stopPropagation();
    openWindow(projectPage5);
};
if(projectIcon6) projectIcon6.onclick = (event) => {
    event.stopPropagation();
    openWindow(projectPage6);
};

/* ========================================= 
    4. FONCTIONS SYSTÈME (WINDOWS)
    ========================================= */

function openWindow(win) {
    if(!win) return; 

    win.style.display = "flex"; 
    win.style.zIndex = 9999; // Toujours au-dessus du fullscreen
    win.classList.remove("full-screen");

    // Positionnement en cascade
    win.style.top = `calc(30% + ${currentOffset}px)`;
    win.style.left = `calc(40% + ${currentOffset}px)`;
    win.style.transform = "none";

    currentOffset += offsetStep;
    if (currentOffset > maxOffset) {
        currentOffset = 0;
    }
}

function bringToFront(windowElement) {
    highestZ = Math.max(highestZ + 10, 5001); // Minimum 5001 pour passer au-dessus du fullscreen
    windowElement.style.zIndex = highestZ;
}

function stopVideos(windowElement) {
    const iframes = windowElement.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const currentSrc = iframe.src;
        iframe.src = ''; 
        iframe.src = currentSrc; 
    });
}

/* ========================================= 
    5. LOGIQUE DRAG & DROP & BOUTONS UI
    ========================================= */

// Gestion du focus au clic n'importe où
document.addEventListener("mousedown", (event) => {
    const clickedWindow = event.target.closest(".window");
    if (clickedWindow) {
        bringToFront(clickedWindow);
    }
});

allWindows.forEach(windowElement => {
    const btnClose = windowElement.querySelector('.btn-close');
    const btnMax = windowElement.querySelector('.btn-max');

    // Bouton Fermer - PRIORITÉ HAUTE
    if(btnClose) {
        btnClose.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            windowElement.style.display = "none";
            stopVideos(windowElement);
            return false;
        }, true); // Capture phase pour priorité
    }

    // Bouton Agrandir - PRIORITÉ HAUTE
    if(btnMax) {
        btnMax.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            windowElement.classList.toggle("full-screen");
            if (windowElement.classList.contains("full-screen")) {
                windowElement.style.top = "0";
                windowElement.style.left = "0";
                windowElement.style.transform = "none";
            } else {
                windowElement.style.top = "50%";
                windowElement.style.left = "50%";
                windowElement.style.transform = "translate(-50%, -50%)";
            }
            return false;
        }, true); // Capture phase pour priorité
    }

    // Début du Drag - seulement si ce n'est pas un bouton
    windowElement.addEventListener("mousedown", (event) => {
        // Ne pas faire de drag si on clique sur un élément interactif
        if (event.target.tagName === 'BUTTON' || 
            event.target.tagName === 'INPUT' || 
            event.target.tagName === 'TEXTAREA' || 
            event.target.tagName === 'IFRAME' ||
            event.target.closest('.btn-close') ||
            event.target.closest('.btn-max')) {
            return;
        }

        isDragging = true; 
        currentWindow = windowElement;
        const rect = windowElement.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        windowElement.style.cursor = 'grabbing';
    });
});

// Mouvement du Drag
document.addEventListener("mousemove", (event) => {
    if(isDragging && currentWindow && !currentWindow.classList.contains("full-screen")){
        currentWindow.style.left = (event.clientX - offsetX) + "px"; 
        currentWindow.style.top = (event.clientY - offsetY) + "px";
        currentWindow.style.transform = "none";
    }
});

// Fin du Drag
document.addEventListener("mouseup", () => {
    isDragging = false; 
    if (currentWindow) currentWindow.style.cursor = 'grab';
    currentWindow = null; 
});

/* ========================================= 
    6. UI JUICE (EFFETS VISUELS)
    ========================================= */

// Effet de parallaxe/ombre sur les cartes projets
const cards = document.querySelectorAll('.project-container');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) / 5;
        const moveY = (y - rect.height / 2) / 5;
        
        card.style.boxShadow = `${-moveX}px ${-moveY}px 0px #ff1493`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '4px 4px 0px rgba(0,0,0,0.1)';
    });
});

// Gestion du Z-Index au survol des cartes
document.querySelectorAll('.project-container').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.zIndex = "999";
    });
    box.addEventListener('mouseleave', () => {
        setTimeout(() => { box.style.zIndex = "1"; }, 300);
    });
});


function initProjectHoverDetails() {
    const projectContainers = document.querySelectorAll('.project-container');
    
    projectContainers.forEach(container => {
        const name = container.dataset.name;
        const type = container.dataset.type;
        const description = container.dataset.description;
        
        const detailsHTML = `
            <div class="project-details">
                <div class="project-name">${name}</div>
                <div class="project-type">${type}</div>
                <div class="project-description">${description}</div>
            </div>
        `;
        
        container.innerHTML += detailsHTML;
    });
}

document.addEventListener('DOMContentLoaded', initProjectHoverDetails);

/* ========================================= 
    7. ANIMATIONS (PARTICULES POP)
    ========================================= */

function createPop() {
    const icons = ['✦', '★', '+', '◦', '✧'];
    const pop = document.createElement('span');
    
    pop.innerText = icons[Math.floor(Math.random() * icons.length)];
    pop.className = 'pop-particle';
    
    const rect = nameElement.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    pop.style.color = Math.random() > 0.5 ? '#ff1493' : '#B28DFF';
    
    nameElement.appendChild(pop);
    
    setTimeout(() => {
        pop.remove();
    }, 2000);
}

// Particules pop sur le body (fond noir)
function createBackgroundPop() {
    const icons = ['✦', '★', '+', '◦', '✧'];
    const pop = document.createElement('span');
    
    pop.innerText = icons[Math.floor(Math.random() * icons.length)];
    pop.className = 'pop-particle';
    
    // Position aléatoire sur tout le viewport
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    pop.style.position = 'fixed';
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    pop.style.color = Math.random() > 0.5 ? '#ff1493' : '#B28DFF';
    pop.style.fontSize = '3.5rem'; // GROS - visible sur tout l'écran
    pop.style.fontWeight = '800';
    pop.style.zIndex = '100'; // Au-dessus du body mais en arrière-plan
    pop.style.pointerEvents = 'none'; // Ne pas bloquer les clics
    pop.style.textShadow = '0 0 10px currentColor'; // Glow effect
    
    document.body.appendChild(pop);
    
    setTimeout(() => {
        pop.remove();
    }, 2000);
}

// Boucles d'animation
setInterval(createPop, 600); // Sur le nom
setInterval(createBackgroundPop,100); // Sur le background (décalé pour plus d'effet)