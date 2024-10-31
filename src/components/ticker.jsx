import React, { useState } from "react";

const Ticker=()=>{
    const[spell,setSpell] = useState("")
    const[flag,setFlag] = useState(false)
    return(
        <div>
            <label htmlFor="">same</label>
            <input type="checkbox" onChange={()=>{setFlag(!flag)}}/>
            <label htmlFor="">address</label>
            <input type="text" onChange={(e)=>setSpell(e.target.value)}/>
            <label htmlFor="">permanent address</label>
            <input type="text" value={flag?spell:null}/>
            <label htmlFor="">permanent address</label>
            <input type="text" value={flag?spell:null}/>
        </div>
    )
}
export default Ticker