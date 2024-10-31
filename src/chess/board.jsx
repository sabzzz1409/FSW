import React, { useState } from "react";
import './board.css'

const Board = () =>{

    const[selected,setSelected] = useState([])
    const[moved,setMoved] = useState([])
    const[mode,setMode]=useState(true)
    const[color,setColor]=useState("w")
    const[coin,setCoin]=useState("")
    const[coinData,setCoinData] = useState([
        {name:"bpawn1", sym:<span> &#9823; </span>, pos:[6,0]},
        {name:"bpawn2", sym:<span> &#9823; </span>, pos:[6,1]},
        {name:"bpawn3", sym:<span> &#9823; </span>, pos:[6,2]},
        {name:"bpawn4", sym:<span> &#9823; </span>, pos:[6,3]},
        {name:"bpawn5", sym:<span> &#9823; </span>, pos:[6,4]},
        {name:"bpawn6", sym:<span> &#9823; </span>, pos:[6,5]},
        {name:"bpawn7", sym:<span> &#9823; </span>, pos:[6,6]},
        {name:"bpawn8", sym:<span> &#9823; </span>, pos:[6,7]},
        {name:"bknight1", sym:<span> &#9822; </span>, pos:[7,1]},
        {name:"bknight2", sym:<span> &#9822; </span>, pos:[7,6]},
        {name:"bbishop1", sym:<span> &#9821; </span>,pos:[7,2]},
        {name:"bbishop2", sym:<span> &#9821; </span>,pos:[7,5]},
        {name:"brook1", sym:<span> &#9820; </span>,pos:[7,0]},
        {name:"brook2", sym:<span> &#9820; </span>,pos:[7,7]},
        {name:"bqueen", sym:<span> &#9819; </span>,pos:[7,4]},
        {name:"bking", sym:<span> &#9818; </span>,pos:[7,3]},
        {name:"wpawn1", sym:<span> &#9817; </span>,pos:[1,0]},
        {name:"wpawn2", sym:<span> &#9817; </span>,pos:[1,1]},
        {name:"wpawn3", sym:<span> &#9817; </span>,pos:[1,2]},
        {name:"wpawn4", sym:<span> &#9817; </span>,pos:[1,3]},
        {name:"wpawn5", sym:<span> &#9817; </span>,pos:[1,4]},
        {name:"wpawn6", sym:<span> &#9817; </span>,pos:[1,5]},
        {name:"wpawn7", sym:<span> &#9817; </span>,pos:[1,6]},
        {name:"wpawn8", sym:<span> &#9817; </span>,pos:[1,7]},
        {name:"wknight1", sym:<span> &#9816; </span>,pos:[0,1]},
        {name:"wknight2", sym:<span> &#9816; </span>,pos:[0,6]},
        {name:"wbishop1", sym:<span> &#9815; </span>,pos:[0,2]},
        {name:"wbishop2", sym:<span> &#9815; </span>,pos:[0,5]},
        {name:"wrook1", sym:<span> &#9814; </span>,pos:[0,0]},
        {name:"wrook2", sym:<span> &#9814; </span>,pos:[0,7]},
        {name:"wqueen", sym:<span> &#9813; </span>,pos:[0,4]},
        {name:"wking", sym:<span> &#9812; </span>,pos:[0,3]}
    ]);

    const boarding = [];
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            boarding.push([i,j])
        }
    }

    const somefn=(e,ro)=>{
         if(mode){
            if(e.target.dataset.wow){    
                if(e.target.dataset.wow[0]==color){
                    setCoin(e.target.dataset.wow);
                    setSelected(ro);
                    setMode(!mode);
                    setMoved([]);
                }
                else{
                    alert("it is not your turn it is "+color+" turn")
                }
            }
         }
        else{
            // console.log(validMotion(coinData.find(item=>item.name===coin).pos,ro,coin))
            if(validMotion(coinData.find(item=>item.name===coin).pos,ro,coin)){
                setCoinData(prv=>prv.map(item=>item.name===coin?{...item,pos:ro}:item));
                setMode(!mode);
                setMoved(ro);
                setSelected([]);
                setCoin("");
                setColor(prv=>prv==="w"?"b":"w")
            }
            else{
                alert("invalid move!!!")
            }
        }
    }
    
    const validMotion=(i,j,k)=>{
        console.log(i,j,k)
        if(["wpawn1","wpawn2","wpawn3","wpawn4","wpawn5","wpawn6","wpawn7","wpawn8"].includes(k)){ //simple move of white pawn
            if(i[1]===j[1] && i[0]!==j[0]){
                if(i[0]==1 && j[0]-i[0]<3 && j[0]-i[0]>0){
                    for(let piece of coinData){
                        if(piece.pos[0]===j[0] && piece.pos[1]===j[1]){
                            return false
                        }
                    }
                    return true
                }
                else if(j[0]-i[0]<2){
                    if(Boolean(coinData.find(item=>item.pos[0]===j[0] && item.pos[1]===j[1]))){
                        return false
                    }
                    else{
                        for(let piece of coinData){
                            if(piece.pos[0]===j[0] && piece.pos[1]===j[1]){
                                return false
                            }
                        }    
                        return true
                    }
                }
                else{
                    return false
                }
            }
            else if(i[0]!==j[0]){
                if(coinData.find(item=>item.pos[0]===j[0] && item.pos[1]===j[1] && color!==item.name[0] && Math.abs(item.pos[0]-i[0])===1 && Math.abs(item.pos[1]-i[1])===1)){ //killing
                    setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==j[0] || item.pos[1]!==j[1])))
                    return true
                }
                else{
                    return false
                }
            }
            else{
                return false
            }
        }

        else if(["bpawn1","bpawn2","bpawn3","bpawn4","bpawn5","bpawn6","bpawn7","bpawn8"].includes(k)){ //simple move of black pawn
            if(i[1]===j[1] && i[0]!==j[0]){
                if(i[0]==6 && i[0]-j[0]<3 && i[0]-j[0]>0){
                    for(let piece of coinData){
                        if(piece.pos[0]===j[0] && piece.pos[1]===j[1]){
                            return false
                        }
                    }
                    return true
                }
                else if(i[0]-j[0]<2){
                    if(Boolean(coinData.find(item=>item.pos[0]===j[0] && item.pos[1]===j[1]))){
                        return false
                    }
                    else{
                        for(let piece of coinData){
                            if(piece.pos[0]===j[0] && piece.pos[1]===j[1]){
                                return false
                            }
                        }
                        return true
                    }
                }
                else{
                    return false
                }
            }
            else if(i[0]!==j[0]){
                if(coinData.find(item=>item.pos[0]===j[0] && item.pos[1]===j[1] && color!==item.name[0] && Math.abs(item.pos[0]-i[0])===1 && Math.abs(item.pos[1]-i[1])===1)){ //killing
                    setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==j[0] || item.pos[1]!==j[1])))
                    return true
                }
                else{
                    return false
                }
            }
            else{
                return false
            }
        }

        else if(["wrook1","wrook2","brook1","brook2"].includes(k)){ //simple move of white rook
            if((i[0]===j[0] && i[1]!==j[1]) || (i[0]!==j[0] && i[1]===j[1])){ 
                let path=[]
                if(i[0]===j[0]){
                    if(i[1]<j[1]){
                        for(let ind=1;ind<=Math.abs(i[1]-j[1]);ind++){
                            path.push([i[0],i[1]+ind])
                        }
                    }
                    else{
                        for(let ind=1;ind<=Math.abs(i[1]-j[1]);ind++){
                            path.push([i[0],i[1]-ind])
                        }
                    }
                }
                else if(i[1]===j[1]){
                    if(i[0]<j[0]){
                        for(let ind=1;ind<=Math.abs(i[0]-j[0]);ind++){
                            path.push([i[0]+ind,i[1]])
                        }
                    }
                    else{
                        for(let ind=1;ind<=Math.abs(i[0]-j[0]);ind++){
                            path.push([i[0]-ind,i[1]])
                        }
                    }
                }
                for(let count=0;count<path.length;count++){
                    if(count===path.length-1){
                        let obs = coinData.find(item=>(item.pos[0]===path[count][0] && item.pos[1]===path[count][1])) 
                        if(obs){
                            if(obs.name[0]!==color){
                                setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==j[0] || item.pos[1]!==j[1])))
                                return true
                            }
                            else{
                                return false
                            }
                        }
                    }
                    else{
                        if(coinData.find(item=>(item.pos[0]===path[count][0] && item.pos[1]===path[count][1]))){ 
                            return false
                        }    
                    }
                }
                console.log(path)
                return true
            }
            else{
                return false    
            }
        }

        else if(["wknight1","wknight2","bknight1","bknight2"].includes(k)){ // knight move
            let knightpatern = [[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]];
            let knightpath = knightpatern.map(coord=>[i[0]+coord[0],i[1]+coord[1]]);
            let knightpos = knightpath.filter(pos=>((pos[0]>-1 && pos[0]<8)&&(pos[1]>-1 && pos[1]<8)));
            let knightobsafter = []
            for(let il=0;il<knightpos.length;il++){ //knight kill
                if(coinData.find(piece=>(piece.pos[0]===knightpos[il][0] && piece.pos[1]===knightpos[il][1]))){
                    if(coinData.find(piece=>(piece.pos[0]===knightpos[il][0] && piece.pos[1]===knightpos[il][1])).name[0]!==color){
                        knightobsafter.push(knightpos[il])    
                    }
                }   
                else{
                    knightobsafter.push(knightpos[il])
                }
            }
            let knightfinal=knightobsafter.map(pos=>((pos[0]===j[0]&&pos[1]===j[1])? true : false))
            let knightindex = knightfinal.indexOf(true)
  
            if(knightindex>-1){
                let knightmove =  knightobsafter[knightindex]
                setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==knightmove[0] || item.pos[1]!==knightmove[1])))    
                return true
            }
        }

        else if(["wbishop1","wbishop2","bbishop1","bbishop2"].includes(k)){ // bishop moves
            if(Math.abs(i[0]-j[0])===Math.abs(i[1]-j[1]) && Math.abs(i[0]-j[0]!==0) && Math.abs(i[1]-j[1]!==0)){
                let path = []
                let temp =[]
                for(let ing=1;ing<=Math.abs(i[0]-j[0]);ing++){
                    if(i[0]-j[0]>0 && i[1]-j[1]>0){
                        temp = [i[0]-ing,i[1]-ing];
                    }
                    else if(i[0]-j[0]>0 && i[1]-j[1]<0){
                        temp = [i[0]-ing,i[1]+ing];
                    }
                    else if(i[0]-j[0]<0 && i[1]-j[1]>0){
                        temp = [i[0]+ing,i[1]-ing];
                    }
                    else if(i[0]-j[0]<0 && i[1]-j[1]<0){
                        temp = [i[0]+ing,i[1]+ing];
                    }
                    if(coinData.find(item=>item.pos[0]===temp[0] && item.pos[1]===temp[1] && item.name[0]===color)){
                        return false
                    }
                    else{
                        path.push(temp)
                    }
                }
                setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==j[0] || item.pos[1]!==j[1])))    // kill
                return true
            }

        }

        else if(["wqueen","bqueen"].includes(k)){ // queen moves
            
            if(Math.abs(i[0]-j[0])===Math.abs(i[1]-j[1]) && Math.abs(i[0]-j[0]!==0) && Math.abs(i[1]-j[1]!==0)){
                let path = []
                let temp =[]
                for(let ing=1;ing<=Math.abs(i[0]-j[0]);ing++){
                    if(i[0]-j[0]>0 && i[1]-j[1]>0){
                        temp = [i[0]-ing,i[1]-ing];
                    }
                    else if(i[0]-j[0]>0 && i[1]-j[1]<0){
                        temp = [i[0]-ing,i[1]+ing];
                    }
                    else if(i[0]-j[0]<0 && i[1]-j[1]>0){
                        temp = [i[0]+ing,i[1]-ing];
                    }
                    else if(i[0]-j[0]<0 && i[1]-j[1]<0){
                        temp = [i[0]+ing,i[1]+ing];
                    }
                    if(coinData.find(item=>item.pos[0]===temp[0] && item.pos[1]===temp[1] && item.name[0]===color)){
                        return false
                    }
                    else{
                        path.push(temp)
                    }
                }
                setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==j[0] || item.pos[1]!==j[1])))    // kill
                return true
            }

            if((i[0]===j[0] && i[1]!==j[1]) || (i[0]!==j[0] && i[1]===j[1])){ 
                let path=[]
                if(i[0]===j[0]){
                    if(i[1]<j[1]){
                        for(let ind=1;ind<=Math.abs(i[1]-j[1]);ind++){
                            path.push([i[0],i[1]+ind])
                        }
                    }
                    else{
                        for(let ind=1;ind<=Math.abs(i[1]-j[1]);ind++){
                            path.push([i[0],i[1]-ind])
                        }
                    }
                }
                else if(i[1]===j[1]){
                    if(i[0]<j[0]){
                        for(let ind=1;ind<=Math.abs(i[0]-j[0]);ind++){
                            path.push([i[0]+ind,i[1]])
                        }
                    }
                    else{
                        for(let ind=1;ind<=Math.abs(i[0]-j[0]);ind++){
                            path.push([i[0]-ind,i[1]])
                        }
                    }
                }
                for(let count=0;count<path.length;count++){
                    if(count===path.length-1){
                        let obs = coinData.find(item=>(item.pos[0]===path[count][0] && item.pos[1]===path[count][1])) 
                        if(obs){
                            if(obs.name[0]!==color){
                                setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==j[0] || item.pos[1]!==j[1])))
                                return true
                            }
                            else{
                                return false
                            }
                        }
                    }
                    else{
                        if(coinData.find(item=>(item.pos[0]===path[count][0] && item.pos[1]===path[count][1]))){ 
                            return false
                        }    
                    }
                }
                console.log(path)
                return true
            }

        }
        
        else if(["wking","bking"].includes(k)){ // king move
            let kingpatern = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
            let kingpath = kingpatern.map(coord=>[i[0]+coord[0],i[1]+coord[1]]);
            let kingpos = kingpath.filter(pos=>((pos[0]>-1 && pos[0]<8)&&(pos[1]>-1 && pos[1]<8)));
            let kingobsafter = []
            for(let il=0;il<kingpos.length;il++){ //king kill
                if(coinData.find(piece=>(piece.pos[0]===kingpos[il][0] && piece.pos[1]===kingpos[il][1]))){
                    if(coinData.find(piece=>(piece.pos[0]===kingpos[il][0] && piece.pos[1]===kingpos[il][1])).name[0]!==color){
                        kingobsafter.push(kingpos[il])    
                    }
                }   
                else{
                    kingobsafter.push(kingpos[il])
                }
            }
            let kingfinal=kingobsafter.map(pos=>((pos[0]===j[0]&&pos[1]===j[1])? true : false))
            let kingindex = kingfinal.indexOf(true)
  
            if(kingindex>-1){
                let kingmove =  kingobsafter[kingindex]
                setCoinData(coinData=>coinData.filter(item=>(item.pos[0]!==kingmove[0] || item.pos[1]!==kingmove[1])))    
                return true
            }
        }


    }

    var player = coinData.filter(item => item.name==="wking" || item.name==="bking")

    return(
        <div className="container">
            <div className={`${player.length===2?"row":" d-none"}`}>
                {
                    boarding.map(ro=>{
                        let val = coinData.filter(coinitem=>coinitem.pos[0]===ro[0] && coinitem.pos[1]===ro[1])[0]
                        let valsym = val?val.sym:""
                        let valnam = val?val.name:""
                        
                        return(
                            ro[1]!==7?
                            (ro[0]+ro[1])%2?
                                <span key={ro} onClick={(e)=>{somefn(e,ro)}} 
                                className="col-1 border border-1 bg-secondary" data-wow={valnam}>{valsym}</span>
                                :
                                <span key={ro} onClick={(e)=>{somefn(e,ro)}} 
                                className="col-1 border border-1 bg-light" data-wow={valnam}>{valsym}</span>
                            :
                            (ro[0]+ro[1])%2?
                                <span key={ro} style={{marginRight: 30+"%"}} 
                                className="col-1 border border-1 bg-secondary"
                                onClick={(e)=>{somefn(e,ro)}} data-wow={valnam}>
                                {valsym}</span>
                                :
                                <span key={ro} style={{marginRight: 30+"%"}} 
                                className="col-1 border border-1 bg-light"
                                onClick={(e)=>{somefn(e,ro)}} data-wow={valnam}>
                                {valsym}</span>
                        )
                    })
                }
        
            <button onClick={()=>(setCoin(""),setSelected([]),setMode(!mode))} className="btn btn-primary w-25">reset</button>
            <span>it is  : {color} turn</span>
            <span>coin selected at : {selected.length?(selected[0]+","+selected[1]):""}</span>
            <span>coin selected is : {coin}</span>
            <span>coin moved to : {moved.length?(moved[0]+","+moved[1]):""}</span>
            <span className="text-primary">Please Dont Click on Icon click on tiles of the coin</span>
            </div>
            <span className="h1 text-warning fw-bolder">{player.length===2?"":player[0].name+" is winner"}</span>
            <br/>
            <span className="h2 text-success">{player.length===2?"":"Refresh to play again"}</span>

        </div>
        
    )
}
export default Board