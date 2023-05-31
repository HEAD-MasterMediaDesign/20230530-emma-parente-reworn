
var container = document.getElementById('container-grille');
var camera = document.getElementById('camera');
var cameraX = 0;
var cameraY = 0;

const width = window.innerWidth;
const height = window.innerHeight;

window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log(`The viewport's width is ${width} and the height is ${height}.`);
});

function updateCamera() {
    camera.style.transform = 'translateX(' + cameraX + 'px) translateY(' + cameraY + 'px)';
    Array.from(document.getElementsByClassName('item')).forEach(function(item) {
        item.style.transform = 'translateZ(' + Math.abs(parseInt(item.style.transform.split('(')[1])) + 'px)';
    });

    if (cameraX <= -805.1555555555556) { // loop quand on scroll a droite
        cameraX = 0;
    }

    if (cameraX >= 0.0001) { // loop quand on scroll a droite
        cameraX = -805.15; // change cette valeur pour avoir exactement ou le dernier objet a droit est pour que se soi smoooth
    }

     if (cameraY <= -2766.2735042735044) { // loop quand on scroll de haut en bas
         cameraY = 0;
    }

    if (cameraY >= 0.0001) { // loop quand on scroll de haut en bas
        cameraY = -2766.2735042735044; //change cette valeur pour avoir exactement ou le dernier objet a droit est pour que se soi smoooth
   }

   
}



// scroll avec flèches
document.addEventListener('keydown', function(event) {
    var key = event.key.toLowerCase();
    if (key === 'arrowup') {
        cameraY -= 20;
    } else if (key === 'arrowdown') {
        cameraY += 20;
    } 
    if (key === 'arrowleft') {
        cameraX -= 20;
    }
    if (key === 'arrowright') {
        cameraX += 20;
    }
    
    console.log(cameraX);

    


    updateCamera();
});





