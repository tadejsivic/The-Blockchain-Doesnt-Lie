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
    if (getCookie("crossword") != "") {
        crossword = JSON.parse(getCookie("crossword")).crossword;
        
    }
    else init();
    initTimer();
    drawGrid();
    if (getCookie("isFinished") == "")setCookie("isFinished", false, 1);
    else if (getCookie("isFinished")=="true"){
        var inputs=document.getElementsByTagName('input');
        for(i=0;i<inputs.length;i++){
            inputs[i].disabled=true;
        }  
    }
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
                if (crossword[i][j].includes("/")) {
                    let hints = crossword[i][j].split("/");
                    line += "<div id=\"hint\"><div id=\"hint\" onmouseover=\"displayHint(this)\" onmouseout=\"hideHint(this)\" style=\"height: 30px; border: 0; border-bottom: 2.5px solid black;\">" + hints[1] + "</div>";
                    line += "<div id=\"hint\" onmouseover=\"displayHint(this)\" onmouseout=\"hideHint(this)\" style=\"height: 30px; top: 30px; border: 0;\">" + hints[0] + "</div></div>";
                }
                else {
                    if (crossword[i][j].includes("$")) line += `<input onchange="update(this, ${i}, ${j})" maxlength="1" type="text" value="${crossword[i][j].charAt(0)}">`; 
                    else line += "<div id=\"hint\" onmouseover=\"displayHint(this)\" onmouseout=\"hideHint(this)\">" + crossword[i][j] + "</div>";
                }
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
    crossword[y][x] = e.value.toUpperCase() + "$";
    let solution = `{"crossword":`;
    solution += JSON.stringify(crossword);
    solution += `}`;
    setCookie("crossword", solution, 1);
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
    return `
    { 
        "crossword":
            [
                [null, null, null, null, null, null, "GLAVNO MESTO KORZIKE", "??PANSKI TENORIST (DVE BESEDI)", "??ESTI JUDOVSKI MESEC", "NU??A LESAR", "DOLGOPRSTNE??", "ITALIJANSKI PESNIK IN PAMFLETIST (PIETRO)", null, "PAVLIHA, ??ALJIVEC", "FRANCOSKI IGRALEC DELON", "SLAVKO IVAN??I??", "O??AK TUR??IJE", "POMOTA"], 
                [null, null, null, null, null, "BUDISTI??NO JAMSKO SVETI????E V INDIJI", "", "", "", "", "", "", "MOHAMEDOV VNUK", "", "", "", "", ""], 
                [null, null, null, null, null, "PEVEC, KI JODLA", "", "", "", "", "", "", "SLOVENSKI ROKER MEGLI??/VEDENJE (ZASTARELO)", "", "", "", "", ""], 
                [null, null, null, null, null, "STARO-JUDOVSKI KRALJ", "", "", "", "ALKALOID V OPIJU/TKANINA ZA PLENICE", "", "", "", "", "", "MADAGASKARSKA POLOPICA/ALEN PAJENK", "", ""], 
                [null, null, null, null, null, "NA STOLU UMRLI GEOGRAF IN JAMAR (JOSIP)", "", "", "", "", "VEJA ZA GRAH/LUKA NA MADAGASKARJU", "", "", "", "", "", "", "", ""], 
                [null, null, null, null, null, "KRAJEVNO BO??ANSTVO MEMFISA/CLAUDIA CARDINALE", "", "", "VZDEVEK BERTE BOJETU/IMENJAK", "", "", "", "", "", "", "", "", ""], 
                [null, null, null, null, null, "", "", "", "", "", "", "", "", "", "ZEMELJSKO OLJE/SEDMA GR??KA ??RKA", "", "", ""], 
                [null, "AMERI??KI IGRALEC GOLFA (TIGER)", "MODEL OPLOVEGA VOZILA", "SLOVENSKI BIATLONEC FAK", "??ALOSTEN DOGODEK/KANADSKO VELEMESTO", "", "", "", "", "", "", "", "NEM??KA PISATELJICA SEIDEL", "", "", "", "POTUJO??I PESNIK IN MUZIKANT V ZAHODNI AFRIKI", "JAPONSKI FILMSKI RE??ISER KUROSAVA"], 
                ["POLJSKI FILMSKI RE??ISER (ANDRZEJ)", "", "", "", "", "", "SLOVENSKA PEVKA KEVC/??E??KI ??AHIST (RICHARD)", "", "", "", "", "EGIP??ANSKI SVETI BIK", "OSTANEK VINA V SODU (NARE??NO)", "", "", "", "", ""], 
                ["PTICA UJEDA, SR??ENAR", "", "", "", "", "LOPATA ZA METANJE PESKA", "", "", "", "", "", "", "NARE??NI IZRAZ ZA KRAVICO", "KO??A KOZLI??EV/NA??A SMU??ARKA (MARU??A)", "", "", "", ""], 
                ["PALICA ZA ??I????ENJE PLUGA, RATKA", "", "", "", "", "LOJZE LEBI??/ARM. SKLADATELJ HA??ATURJAN", "", "", "", "", "NADJA AUERMANN/PREDNIK ??KOTOV", "", "", "", "", "TINE URNAUT/ION ILIESCU", "", ""], 
                ["USTNO LJUDSKO GLASBILO", "", "", "", "", "", "", "", "POBUDNIK, ZA??ETNIK", "", "", "", "", "", "", "", "", ""],  
                ["UMRLI AMERI??KI FILMSKI IGRALEC (TELLY)", "", "", "", "", "", "", "", "PLANTA??A", "", "", "", "", "", "VRTNA HI??KA", "", "", ""]
            ]
    }
   `;

}
function sendSolution() {
    
    let solution = (crossword);

    console.log(solution);
    axios.post("/solution", solution).then(function (response) {
        console.log(response.data);
        if ( response.data ){ 
            // PRAVILNO, ZMAGA, blockchain magic
            
            setCookie("isFinished", true, 1);
            var inputs=document.getElementsByTagName('input');
            for(i=0;i<inputs.length;i++){
                inputs[i].disabled=true;
            }  
            window.alert("??ESTITKE!\nZMAGALI STE");
    
        }else{
            window.alert("Napa??no");
    
        }

  })
  .catch(function (error) {
    console.log(error);
  });

    

   
    

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

// ====================== Cookies ====================== //

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }








