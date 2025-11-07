

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
    // check if reach limit
    if (currentIndex >= totalImages){
        message.textContent = "You've seen all the kitties! Here are your favs <3"
        imageContainer.classList.remove("favourites");
        imageContainer.innerHTML = "";

        // favourites layout
        imageContainer.classList.add("favourites");

        // display fav images
        for (const src in favImages){
            const img = document.createElement("img")
            img.src = src;
            imageContainer.appendChild(img);
        }
        return;
    }

    // display new random cat and preload the next cat
    const currentSrc = nextImageSrc || `${baseURL}?random=${Date.now()}`;
    const img = document.createElement("img")
    img.src = currentSrc;
    img.draggable=false; //stop browser drag
    preloadNextImg();

    // swiping mechanism
    let startX = 0;
    img.addEventListener("mousedown", (e) => {
        startX = e.clientX; // 1st position of mouse
    })
    img.addEventListener("mouseup",(e) =>{
        const diffX = e.clientX - startX;

        // check swipe left or right, swipe must be large enough
        if (diffX>20){
            handleSwipe("right",img.src);
        }
        else if (diffX<-20){
            handleSwipe("left",img.src);
        }
    })

    // for mobile touch screen
    img.addEventListener("touchstart", (e) =>{
        startX = e.touches[0].clientX;
    })
    img.addEventListener("touchend",(e) =>{
        const diffX = e.changedTouches[0].clientX - startX;

        // check swipe left or right, swipe must be large enough
        if (diffX>20){
            handleSwipe("right",img.src);
        }
        else if (diffX<-20){
            handleSwipe("left",img.src);
        }
    })


    imageContainer.innerHTML = "";
    imageContainer.appendChild(img);
    currentIndex++;
}

function handleSwipe(direction, imageSrc){
    const img = imageContainer.querySelector("img")
    img.classList.add(direction === "right"? "swipe-right":"swipe-left");
    setTimeout(()=>{
        if (direction == "right"){
            favImages[imageSrc] = true;
        }
        showNextImage();
    }, 300);
}

function preloadNextImg(){
    const preloadImg = new Image();
    const newSrc = `${baseURL}?random=${Date.now()}`;
    preloadImg.src = newSrc;
    nextImageSrc = newSrc;
}








