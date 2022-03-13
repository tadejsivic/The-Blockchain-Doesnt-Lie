
let list = [];

let data = JSON.parse(`
   { 
        "crossword":
            [
                [null, null, null, null, "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "C"], 
                [null, null, null, null,"", "", "", "", "", "", "", "", "", "", "", "", "", ""], 
                [null, null, null, null,"", "", "", "", "", "", "", "", "", "", "", "France Prešeren", "", ""], 
                [null, null, null, null,"", "", "", "", "", "", "", "", "", "", "", "", "", ""], 
                ["X", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", ""], 
                ["X", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", ""], 
                ["X", "", "", "","", "", "ABC", "", "", "", "BOI", "", "", "", "", "", "", ""], 
                ["X", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", ""], 
                ["X", "", "", "","", "", "", "", "", "AVO", "", "", "", "", "", "", "", ""], 
                ["X", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", ""], 
                ["X", "", "", "","", "", "", "", "", "", "", "", "", "", "", "Tone Pavček/Miha Sivka", "", ""], 
                ["X", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", ""],  
                ["X", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", ""]
            ]
   }
   `);


function main(){
    init();
    getList();
    drawAll();
}

function init(){
    
}

function getList(){
    // Blockchain magic??
    list.push(data.crossword);

}

function drawAll(){
    for (let i=0; i<list.length; i++){
        addNFT(list[i]);
    }
}


function addNFT(cross, names){
    let content = document.getElementsByClassName("content");
    let result = `
    <div class="result">
            <canvas id="canvas" width="220" height="120"></canvas>
            <p id="solved"></p>
            <div id="winners_left"></div>
            <div id="winners_right"></div>
       </div>
    `;
    content.innerHTML = result;
    
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    console.log(canvas);

    let rows = cross.length;
    let cols = cross[0].length;
    let xoff = canvas.width/cols;
    let yoff = canvas.height/rows;
    ctx.moveTo(0,0);
    ctx.beginPath();
    ctx.rect(0,0,canvas.width, canvas.height);
    ctx.fillStyle="white";
    ctx.fill();
    ctx.lineWidth=1;
    ctx.strokeStyle="black";
    ctx.stroke();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            console.log(cross[i][j]);
            if (cross[i][j] == null || cross[i][j].length>0){
                ctx.fillStyle = "black";
                ctx.fillRect(j*xoff, i*yoff, xoff, yoff);
                ctx.strokeRect(j*xoff, i*yoff, xoff, yoff);
            }else{
                ctx.fillStyle = "white";
                ctx.fillRect(j*xoff, i*yoff, xoff, yoff);
                ctx.strokeRect(j*xoff, i*yoff, xoff, yoff);
            }
            
            }
        }
        let solved = document.getElementById("solved");
        solved.innerHTML = "Opravljeno dne 25.04.2022";
        let levi = document.getElementById("winners_left");
        let desni = document.getElementById("winners_right");
        for (let i=0; i<10; i++){
            if (i<5){
                levi.innerHTML += '<p>'+(i+1)+". "+names[i]+'</p>';
            }else{
                desni.innerHTML += '<p>'+(i+1)+". "+names[i]+'</p>';
            }
    }
        


}



















