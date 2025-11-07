

const startBtn = document.getElementById("startBtn")
const message = document.getElementById("message");
const imageContainer = document.getElementById("imageContainer")
const baseURL = "https://cataas.com/cat" //random image
const favImages = {};

let started = false
let currentIndex = 0;
let totalImages = 5; // change to 20
let nextImageSrc = null;

// preload first cat
window.addEventListener("load", preloadNextImg);


startBtn.addEventListener("click",function(){
    started = !started
    if (started) { //Start swiping
        // Instruction message
        message.textContent = "Swipe right if you like a kitty and left if not really! :)"
        startBtn.textContent = "Reset";
        startBtn.classList.add("reset");
        currentIndex = 0;

        //reset favourites
        Object.keys(favImages).forEach(key => delete favImages[key]);
        showNextImage();
    }
    else{
        message.textContent = ""
        startBtn.textContent = "Start";
        startBtn.classList.remove("reset");
        //remove image when reset
        imageContainer.innerHTML = "";
    }
});

function showNextImage(){
    imageContainer.innerHTML="";

    // check if reach limit
    if (currentIndex >= totalImages){
        message.textContent = "You've seen all the kitties! Here are your favs <3"
        
        //reset layout
        imageContainer.classList.add("favourites");
        imageContainer.innerHTML = "";

        // display fav images
        for (const src in favImages){
            const img = document.createElement("img");
            img.src = src;
            imageContainer.appendChild(img);
        }
        return;
        
    }

    // display new random cat and preload the next cat
    const currentSrc = nextImageSrc || `${baseURL}?random=${Date.now()}&nocache=${Math.random()}`;
    const img = document.createElement("img");
    img.src = currentSrc;
    img.draggable=false; //stop browser drag
    imageContainer.classList.remove("favourites");
    imageContainer.appendChild(img);
    preloadNextImg();

    // overlay and text to hint direction
    const overlay = document.createElement("div");
    overlay.classList.add("swipe-overlay");
    imageContainer.appendChild(overlay);

    let startX = 0;

    // swiping mechanism (MOUSE)
    let isDragging = false;

    img.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX; // 1st position of mouse
    });
    img.addEventListener("mousemove",(e)=>{ 
        if (!isDragging) return;

        const diffX = e.clientX - startX;
        if (Math.abs(diffX<15)) return;

        const rotation = diffX/20;
        img.style.transform = 'translateX(${diffX}px) rotate(${rotation}deg)';

        if (diffX > 0){
            overlay.textContent = "❤️";
            img.style.boxShadow = "0 0 30px 5px rgba(0,255,0,0.5)";
            overlay.style.color = "pink";
            overlay.style.opacity = Math.min(diffX/100,1);
        } else{
            overlay.textContent = "🫤";
            img.style.boxShadow = "0 0 30px 5px rgba(255,0,0,0.5)";
            overlay.style.color = "blue";
            overlay.style.opacity = Math.min(-diffX/100,1);
        }
    });
    img.addEventListener("mouseup",(e) =>{
        if(!isDragging) return;

        const diffX = e.clientX - startX;
        // reset overlay
        img.style.transform = "";
        img.style.boxShadow = "none";
        overlay.style.opacity = 0;
        checkSwipe(diffX,img,overlay);
    });
    img.addEventListener("mouseleave",()=>{
        if (isDragging){
            isDragging = false;
            img.style.transform ="";
            img.style.boxShadow ="none";
            overlay.style.opacity = 0;
        }
    })

    // swiping mechanism (TOUCH)
    img.addEventListener("touchstart", (e) =>{
        isDragging = true;
        startX = e.touches[0].clientX;
    });
    img.addEventListener("touchmove",(e)=>{
        if (!isDragging) return;
        const diffX = e.touches[0].clientX - startX;
        if (Math.abs(diffX)<15) return;

        const rotation = diffX/20;
        img.style.transform = 'translateX(${diffX}px) rotate(${rotation}deg)';
        if (diffX > 0){
            overlay.textContent = "❤️";
            img.style.boxShadow = "0 0 30px 5px rgba(0,255,0,0.5)";
            overlay.style.color = "pink";
            overlay.style.opacity = Math.min(diffX/100,1);
        } else{
            overlay.textContent = "🫤";
            img.style.boxShadow = "0 0 30px 5px rgba(255,0,0,0.5)";
            overlay.style.color = "blue";
            overlay.style.opacity = Math.min(-diffX/100,1);
        }
    });

    img.addEventListener("touchend",(e) =>{
        if (!isDragging) return;
        isDragging = false;

        const diffX = e.changedTouches[0].clientX - startX;
        img.style.transform = "";
        img.style.boxShadow = "none";
        overlay.style.opacity = 0;
        checkSwipe(diffX,img,overlay);
    });

    currentIndex++;
}

function checkSwipe(diffX,img,overlay){ //check direction and show visual feedback
    if (diffX>50){ // right swipe = like
        showFeedback("right",img,overlay)
        handleSwipe("right",img.src)
    }
    if (diffX<-50){ //left swipe = dislike
        showFeedback("left",img,overlay)
        handleSwipe("left",img.src)
    }
}


function handleSwipe(direction, imageSrc){ // add to fav if swiped right
    const img = imageContainer.querySelector("img")
    img.classList.add(direction === "right"? "swipe-right":"swipe-left");
    setTimeout(()=>{
        if (direction == "right")
            favImages[img.src] = true;
        showNextImage();
    }, 300);
}

function showFeedback(direction,img,overlay){
    if (direction==="right"){
        overlay.textContent = "❤️";
        img.style.boxShadow = "0 0 30px 5px rgba(0,255,0,0.5)";
        overlay.style.color = "pink";
    } else{
        overlay.textContent = "🫤";
        img.style.boxShadow = "0 0 30px 5px rgba(255,0,0,0.5)";
        overlay.style.color = "blue";
    }
    overlay.style.opacity = "1";
    overlay.style.transform = "scale(1.2)";

    //disappear overlay
    setTimeout(()=>{
        overlay.style.opacity="0";
        overlay.style.transform="scale(1)";
        img.style.boxShadow = "none";
    },300);
}

function preloadNextImg(){
    const preloadImg = new Image();
    //small random to avoid cache
    const newSrc = `${baseURL}?random=${Date.now()}&nocache=${Math.random()}`;
    preloadImg.src = newSrc;
    nextImageSrc = newSrc;
}


/////////////////////////////////





