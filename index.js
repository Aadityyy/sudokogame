var numSelected=null;
var tileSelected=null;

var errors=0;

var board= [
    "53--7----",
    "6--195---",
    "-98----6-",
    "8---6---3",
    "4--8-3--1",
    "7---2---6",
    "-6----28-",
    "---419--5",
    "----8--79",
]
var solution=[
    "534678912",
    "672195348",
    "198342567",
    "859761423",
    "426853791",
    "713924856",
    "961537284",
    "287419635",
    "345286179",
]
 window.onload=function() {
 setGame();
 }
 function setGame(){
    for(let i=1;i<=9;i++){
        //<div id="1" class="number">1</div>
        let number=document.createElement("div");
        number.id=i
        number.innerText=i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for(let a=0;a<9;a++){
        for(let b=0;b<9;b++)
        {
        let tile=document.createElement("div");
        tile.id=a.toString()+"-"+b.toString();
        if(board[a][b] != "-"){
            tile.innerText=board[a][b];
            tile.classList.add("tile-start");
        }
        if(a==2 || a==5){
            tile.classList.add("horizontal-line");
        }
        if(b==2 || b==5){
            tile.classList.add("vertical-line");
        }
        tile.addEventListener("click" , selectTile);
        tile.classList.add("tile");
        document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
     if (numSelected != null){
    numSelected.classList.remove("number-selected");
    }
    numSelected=this;
    numSelected.classList.add("number-selected");
}
function selectTile(){
    if (numSelected){
        if(this.innerText != ""){
            return;
        }


        let coords= this.id.split("-");
        let a=parseInt(coords[0]);
        let b=parseInt(coords[1]);

        if (solution[a][b]==numSelected.id){
            this.innerText=numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}
function checkWin() {
    for (let a = 0; a < 9; a++) {
        for (let b = 0; b < 9; b++) {
            let tile = document.getElementById(a.toString() + "-" + b.toString());
            if (tile.innerText !== solution[a][b]) {
                return false; // Return false if any tile doesn't match
            }
        }
    }
    displayWinMessage(); // Call the win message function if all tiles match
    return true; // Return true if the board matches the solution
}

function displayWinMessage() {
    const winMessage = document.createElement("div");
    winMessage.id = "win-message";
    winMessage.innerText = "Hurray, you won!";
    winMessage.classList.add("win-message"); // Add a class for styling
    document.getElementById("board").appendChild(winMessage);
}

 

function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        let coords = this.id.split("-");
        let a = parseInt(coords[0]);
        let b = parseInt(coords[1]);

        if (solution[a][b] === numSelected.id) {
            this.innerText = numSelected.id;
            checkWin(); 
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            
            
            if (errors >= 3) {
                displayLossMessage(); 
                stopGame(); 
            } else {
                this.classList.add("error"); 
            }
        }
    }
}

function displayLossMessage() {
    const lossMessage = document.createElement("div");
    lossMessage.id = "loss-message";
    lossMessage.innerText = "You lost, better luck next time!";
    lossMessage.classList.add("loss-message"); 
    document.getElementById("board").appendChild(lossMessage);
}

function stopGame() {
    
    const tiles = document.querySelectorAll(".tile"); 
    tiles.forEach(tile => {
        tile.onclick = null;  
    });
}
function resetGame() {
    document.getElementById("board").innerHTML = ""; 
    errors = 0; 
    document.getElementById("errors").innerText = errors;  
}
