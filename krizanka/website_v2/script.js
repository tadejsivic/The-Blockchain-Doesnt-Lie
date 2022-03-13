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
        console.log(crossword);
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
                [null, null, null, null, null, null, "GLAVNO MESTO KORZIKE", "ŠPANSKI TENORIST (DVE BESEDI)", "ŠESTI JUDOVSKI MESEC", "NUŠA LESAR", "DOLGOPRSTNEŽ", "ITALIJANSKI PESNIK IN PAMFLETIST (PIETRO)", null, "PAVLIHA, ŠALJIVEC", "FRANCOSKI IGRALEC DELON", "SLAVKO IVANČIČ", "OČAK TURČIJE", "POMOTA"], 
                [null, null, null, null, null, "BUDISTIČNO JAMSKO SVETIŠČE V INDIJI", "", "", "", "", "", "", "MOHAMEDOV VNUK", "", "", "", "", ""], 
                [null, null, null, null, null, "PEVEC, KI JODLA", "", "", "", "", "", "", "SLOVENSKI ROKER MEGLIČ/VEDENJE (ZASTARELO)", "", "", "", "", ""], 
                [null, null, null, null, null, "STARO-JUDOVSKI KRALJ", "", "", "", "ALKALOID V OPIJU/TKANINA ZA PLENICE", "", "", "", "", "", "MADAGASKARSKA POLOPICA/ALEN PAJENK", "", ""], 
                [null, null, null, null, null, "NA STOLU UMRLI GEOGRAF IN JAMAR (JOSIP)", "", "", "", "", "VEJA ZA GRAH/LUKA NA MADAGASKARJU", "", "", "", "", "", "", "", ""], 
                [null, null, null, null, null, "KRAJEVNO BOŽANSTVO MEMFISA/CLAUDIA CARDINALE", "", "", "VZDEVEK BERTE BOJETU/IMENJAK", "", "", "", "", "", "", "", "", ""], 
                [null, null, null, null, null, "", "", "", "", "", "", "", "", "", "ZEMELJSKO OLJE/SEDMA GRŠKA ČRKA", "", "", ""], 
                [null, "AMERIŠKI IGRALEC GOLFA (TIGER)", "MODEL OPLOVEGA VOZILA", "SLOVENSKI BIATLONEC FAK", "ŽALOSTEN DOGODEK/KANADSKO VELEMESTO", "", "", "", "", "", "", "", "NEMŠKA PISATELJICA SEIDEL", "", "", "", "POTUJOČI PESNIK IN MUZIKANT V ZAHODNI AFRIKI", "JAPONSKI FILMSKI REŽISER KUROSAVA"], 
                ["POLJSKI FILMSKI REŽISER (ANDRZEJ)", "", "", "", "", "", "SLOVENSKA PEVKA KEVC/ČEŠKI ŠAHIST (RICHARD)", "", "", "", "", "EGIPČANSKI SVETI BIK", "OSTANEK VINA V SODU (NAREČNO)", "", "", "", "", ""], 
                ["PTICA UJEDA, SRŠENAR", "", "", "", "", "LOPATA ZA METANJE PESKA", "", "", "", "", "", "", "NAREČNI IZRAZ ZA KRAVICO", "KOŽA KOZLIČEV/NAŠA SMUČARKA (MARUŠA)", "", "", "", ""], 
                ["PALICA ZA ČIŠČENJE PLUGA, RATKA", "", "", "", "", "LOJZE LEBIČ/ARM. SKLADATELJ HAČATURJAN", "", "", "", "", "NADJA AUERMANN/PREDNIK ŠKOTOV", "", "", "", "", "TINE URNAUT/ION ILIESCU", "", ""], 
                ["USTNO LJUDSKO GLASBILO", "", "", "", "", "", "", "", "POBUDNIK, ZAČETNIK", "", "", "", "", "", "", "", "", ""],  
                ["UMRLI AMERIŠKI FILMSKI IGRALEC (TELLY)", "", "", "", "", "", "", "", "PLANTAŽA", "", "", "", "", "", "VRTNA HIŠKA", "", "", ""]
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

    if ( true ){ // sendCheck(solution) == "true"
        // PRAVILNO, ZMAGA, blockchain magic
        console.log("ZMAGA");
        setCookie("isFinished", true, 1);
        var inputs=document.getElementsByTagName('input');
        for(i=0;i<inputs.length;i++){
            inputs[i].disabled=true;
        }  
        let win = document.getElementById("victory_popup");
        win.style.zIndex="1";
        win.style.display="block";
        win.innerHTML += '<h1 style="position:absolute; top:5%; left:35%; font-size:250%">ČESTIKE!!!</h1>';
        // Preveri, če je izmed top 10
        if (false){
            win.innerHTML += `<p>STE ${place} NAJHITREJŠI, KI STE REŠILI KRIŽANKO.</p>`;
        }else{
            win.innerHTML += `<p style="position:absolute; top:30%; left:15%; font-size:200%;">USPEŠNO STE REŠILI KRIŽANKO.</p>`;
        }




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








