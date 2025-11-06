

const startBtn = document.getElementById("startBtn")
const message = document.getElementById("message");
const imageContainer = document.getElementById("imageContainer")
const baseURL = "https://cataas.com/cat" //random image
const favImages = {};

let started = false
let currentIndex = 0;
let totalImages = 20;

startBtn.addEventListener("click",function(){
    started = !started

    if (started) { //Start swiping
        // Instruction message
        message.textContent = "Swipe right if you like a kitty and left if not really! :)"
        
        startBtn.textContent = "Reset";
        startBtn.classList.add("reset");
        currentIndex = 0;
        showNextImage();
    }
    else{
        message.textContent = ""
        startBtn.textContent = "Start";
        startBtn.classList.remove("reset");

        //remove image
        imageContainer.innerHTML = "";
    }
});

function showNextImage(){
    // check if reach limit
    if (currentIndex >= totalImages){
        message.textContent = "You've seen all the kitties! Here are your favs."
        imageContainer.innerHTML = "";
        return;
    }

    // display new cat and change when clicked
    const img = document.createElement("img")
    img.src = `${baseURL}?random=${Date.now()}`;
    img.addEventListener("click", showNextImage);

    imageContainer.innerHTML = "";
    imageContainer.appendChild(img);
    currentIndex++;
}






