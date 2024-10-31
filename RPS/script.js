var turncount=0
var playerScore=0
var opponentScore=0
var winner="None"
const optionArray=[
    'assets/rock.png',
    'assets/paper.png',
    'assets/scissor.png', 
]


function play(){
    main.innerHTML=`
        <h1 id="tele">Lets Play</h1>
        <div class="playerOptions" id="player"></div>
        <div class="playerChoice" id="playerchoice">
            <p>Player Choice</p>
        </div>
        <div class="display">
            <p id="score">0:0</p>
            <p id="turn"></p>
        </div>
        <div class="opponentChoice" id="opponentchoice">
                <p>opponent Choice</p>
        </div>
        <div id="result"></div>
        <button onclick="done()">DONE</button>
    `
    optionArray.map((item,index)=>{
        player.innerHTML+=`
        <img src="${item}" data-index=${index}>  
        `
    })
    const playerInp = document.getElementById("player")

    playerInp.addEventListener('click',e=>{
        playerchoice.innerHTML=`
            <img src='${e.target.src}' alt="playerChoice"/>
        `
        let vnum=Math.floor(Math.random()*3)
        opponentchoice.innerHTML=`
            <img src='${optionArray[vnum]}' alt="playerChoice"/>
        `
        if(vnum===parseInt(e.target.dataset.index)){
        result.innerHTML=`
        <p>It's Draw</p>
        `
        }
        else if(vnum==0){
        if(parseInt(e.target.dataset.index)==1){
            playerScore++
            tele.innerHTML=`
            Paper beats Rock 
            `
            result.innerHTML=`
            <p> Player Wins</p>
            `
        }
        else{
            opponentScore++
            tele.innerHTML=`
            Rock beats Scissors
            `
            result.innerHTML=`
            <p> Opponent Wins</p>
            `
        }
        }
        else if(vnum==1){
        if(parseInt(e.target.dataset.index)==0){
            opponentScore++
            tele.innerHTML=`
            Paper beats Rock 
            `
            result.innerHTML=`
            <p> Opponent Wins</p>
            `
        }
        else{
            playerScore++
            tele.innerHTML=`
            Scissors beats Paper
            `
            result.innerHTML=`
            <p> Player Wins</p>
            `
        }
        }
        else if(vnum==2){
        if(parseInt(e.target.dataset.index)==0){
            playerScore++
            tele.innerHTML=`
            Rock beats Scissor
            `
            result.innerHTML=`
            <p> Player Wins</p>
            `
        }
        else{
            opponentScore++
            tele.innerHTML=`
            Scissors beats Paper
            `
            result.innerHTML=`
            <p> Opponent Wins</p>
            `
        }
        }
        turncount++
        score.innerHTML=`
            ${playerScore}:${opponentScore}
        `
        turn.innerText=`TURN ${turncount}`
        winner=playerScore==opponentScore?"Draw":playerScore>opponentScore?"Player":"Opponent"
    })
}

play()

function done(){
    main.innerHTML=`
    <div class="finale">
        <h1>Results</h1>
        <h3>Player Score : ${playerScore}</h3>
        <h3>Opponent Score : ${opponentScore}</h3>
        <h3>Winner is ${winner}</h3>
        <h3>Turns taken ${turncount}</h3>
        <button onclick="play()">Play Again</button>
    </div>
    `
    playerScore=0
    opponentScore=0
    turncount=0
    winner="None"
}
