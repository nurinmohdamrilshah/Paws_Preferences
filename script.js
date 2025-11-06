

const startBtn = document.getElementById("startBtn")
const message = document.getElementById("message");

let started = CSSFontFeatureValuesRule

startBtn.addEventListener("click",function(){
    started = !started

    if (started) { //Start swiping
        // Instruction message
        message.textContent = "Swipe right if you like a kitty and left if not really! :)"
        startBtn.textContent = "Reset";
        startBtn.classList.add("reset");
    }
    else{
        message.textContent = ""
        startBtn.textContent = "Start";
        startBtn.classList.remove("reset");
    }
});






