// =============== Variables =============== //
const COLS = 18;
const ROWS = 13;

let crossword;

let timer;
let h;
let m;
let s;

// =============== Initialization =============== //

function main() {
    init();
    initTimer();
    drawGrid();
}

function init() {
    let data = getData();
    crossword = JSON.parse(data).crossword;
}

// =============== Draw =============== //

function drawGrid() {
    
    let grid = document.getElementById("grid");
    
    for (let i = 0; i < ROWS; i++) {
        let line = "<p>";
        for (let j = 0; j < COLS; j++) {

            if (crossword[i][j] == null) line += "<div id=\"empty\"></div>";
            else if (crossword[i][j].length > 0) {
                line += "<div id=\"hint\"";
                
                if (crossword[i][j].includes("/")) {
                    let hints = crossword[i][j].split("/");
                    line += "><div id=\"hint\" onmouseover=\"displayHint(this)\" onmouseout=\"hideHint(this)\" style=\"height: 30px; border: 0; border-bottom: 2.5px solid black;\">" + hints[0] + "</div>";
                    line += "<div id=\"hint\" onmouseover=\"displayHint(this)\" onmouseout=\"hideHint(this)\" style=\"height: 30px; top: 30px; border: 0;\">" + hints[1] + "</div>";
                }
                else {
                    line += " onmouseover=\"displayHint(this)\" onmouseout=\"hideHint(this)\">" + crossword[i][j];
                }
                line += "</div>";
            }else{
                line += `<input onchange="update(this, ${i}, ${j})" maxlength="1" type="text">`;
            }
        }
        line += "</p>";
        grid.innerHTML += line;
    }
    
}

function displayHint(e){
    document.getElementById("zoom").innerHTML = e.innerHTML;
}
function hideHint(e){
    document.getElementById("zoom").innerHTML = "";
}

// =============== Logic ================ //

function update(e, y, x) {
    crossword[y][x] = e.value.toUpperCase();
}

// ========= TIMER - DON'T LOOK ========= //
function initTimer(){
    timer = document.getElementById("timer");
    h=0;
    m=0;
    s=0;
    setInterval(updateTimer, 1000);
}

function updateTimer(){
    s++;
    if (s>=60){
        m++;
        s=0;
    }
    if (m>=60){
        h++;
        m=0;
    }
    let strh = h/10 < 1 ? "0"+h : h;
    let strm = m/10 < 1 ? "0"+m : m;
    let strs = s/10 < 1 ? "0"+s : s;
    timer.innerHTML = strh+":"+strm+":"+strs;
}


// =============== Server =============== //

function getData() {
   /*
    return `
    {
        "crossword":
            [
                [null, "Nadzorovati igro, tekmovanje", "F. Bevk: Peter ...", "Klic Občinstva", null, "Himalajski snežni človek", "Izvirnik", "Afriška država"],
                ["Slovenska banka", "", "", "", "Islandski pisatelj Svensson/Vegetirjanec (pog.)", "", "", ""],
                ["Srbska Igralka Markovič", "", "", "", "", "", "", ""],
                ["Kdor Molči, ... odogovori", "", "", "", "", "", "", ""],
                ["Irena Polanec/Napad na damo pri šahu (pog.)", "", "", "Ameriški muzikal/Slovenski kkolesar valjavec", "", "", "", ""],
                ["", "", "", "", "", "Ida Baš", "", ""]
            ]       
    
    }
    `;
   */  
   return `
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
   `;
   /*
   axios.get('/user',)
  .then(function (response) {
    return response;
  })

   */

}

function sendSolution() {
    let solution = `{"crossword":`;
    solution += JSON.stringify(crossword);
    solution += `}`;
    console.log(solution);
    // send solution to server

    if ( sendCheck(solution) ){
        // PRAVILNO, ZMAGA, blockchain magic
        console.log("ZMAGA");
    }else{
        //NAPAČNO

    }
    

}

function sendCheck(solution){
    axios.post('', solution)
      .then(function (response) {
        return response == "true";
      })
      .catch(function (error) {
        console.log(error);
      });
    
}










