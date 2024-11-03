let speed = 3,
  gravity = 0.5;
let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");
let soundout = new Audio("soundeffects/soundout.mp3");
let soundplay = new Audio("soundeffects/soundplay.mp3");
//bird element properties for left , right,top,bottom,x,y,width and height
let birdprops = bird.getBoundingClientRect();

//background properities for left ,right,top,bottom
let backround = document.querySelector(".background").getBoundingClientRect();

let scorevalue = document.querySelector(".value");
let message = document.querySelector(".message");
let scoreTitle = document.querySelector(".titile");

let gameStatus = "start";
img.style.display = "none";
message.classList.add("msgstyle");

// Game start logic on 'Enter' key press

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && gameStatus != "Play") {
    document.querySelectorAll(".pipe").forEach((e) => {
      e.remove();
    });
    img.style.display = "block";
    bird.style.top = "40vh";
    gameStatus = "Play";
    message.innerHTML = "";
    scoreTitle.innerHTML = "score: ";
    scorevalue.innerHTML = "0";
    message.classList.remove("msgstyle");
    Play();
  }
});

//play function

function Play() {
  function move() {
    //move function
    if (gameStatus != "Play") return;

    let pipe = document.querySelectorAll(".pipe");
    pipe.forEach((element) => {
      let pipeprops = element.getBoundingClientRect();
      birdprops = bird.getBoundingClientRect();

      if (pipeprops.right <= 0) {
        element.remove();
      } else {
        //conditions for collision detection
        if (
          birdprops.left < pipeprops.left + pipeprops.width &&
          birdprops.left + birdprops.width > pipeprops.left &&
          birdprops.top < pipeprops.top + pipeprops.height &&
          birdprops.top + birdprops.height > pipeprops.top
        ) {
          gameStatus = "End";
          message.innerHTML = "Game over " + "<br><b>Enter to restart the Game";
          message.classList.add("msgstyle");
          img.style.display = "none";
          soundout.play();
          return;
        } else {
            // Increase score if the bird passes the pipe
          if (
            pipeprops.right < birdprops.left &&
            pipeprops.right + speed >= birdprops.left &&
            element.increase_score == 1
          ) {
            scorevalue.innerHTML = +scorevalue.innerHTML + 1;
            soundplay.play();
          }
          element.style.left = pipeprops.left - speed + "px";
        }
      }
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  //gravity function

  let bid = 0;
  function applygravity(){
    if(gameStatus!= 'Play') return;

    bid = bid + gravity;
    document.addEventListener('keydown', (e) =>{
        if(e.key=='ArrowUp' || e.key == ' '){
            img.src = "images/Bird-2.png";
            bid= -7.6;
        }
    });
    document.addEventListener('keyup' , (e)=>{
        if(e.key== 'ArrowUp' || e.key == " "){
            img.src = "images/Bird.png";
        }
        
    });
    if(birdprops.top <=0 || birdprops.bottom >= backround.bottom){
        gameStatus= 'End';
        message.style.left = '28vw';
        window.location.reload();
        message.classList.remove('msgstyle');
        return;
    }
    bird.style.top = birdprops.top + bid + "px";
    birdprops = bird.getBoundingClientRect();
    requestAnimationFrame(applygravity);
  }
  requestAnimationFrame(applygravity);

  //pipe creation function

  let space = 0 ;// Space counter to control when to create a new set of pipes
  let pipeGap = 35;// Gap between top and bottom pipes

  function createPipe(){
    if(gameStatus != 'Play') return;
    // Check if enough space has passed to create a new pipe
    if (space > 115){
        space=0;// Reset space counter after creating pipes

        // Generate a random position for the pipes within a range
        let pipePosition = Math.floor(Math.random() * 43) + 8;

        // Top pipe (pipeinverse)
        let pipeinverse = document.createElement('div');
        pipeinverse.className = 'pipe';
        pipeinverse.style.top = pipePosition - 70 +"vh";
        pipeinverse.style.left = "100vw";
        document.body.appendChild(pipeinverse);
        
        // Bottom pipe
        let pipe =document.createElement("div");
        pipe.className='pipe';
        pipe.style.top = pipePosition + pipeGap + "vh";
        pipe.style.left = "100vw";
        pipe.increase_score= '1';
        document.body.appendChild(pipe);

        console.log("Pipes created at position:", pipePosition); //Debugging Log
    }
    space++;// Increment space counter
    requestAnimationFrame(createPipe);
  }
  requestAnimationFrame(createPipe);
}
