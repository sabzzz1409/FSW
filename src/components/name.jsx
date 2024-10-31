import React, { useState } from "react";


const Name=(props)=>{
    const[data,setData]=useState({firstname:"",lastname:""})
    return(
        <div>
            <label>First Name</label>
            <input type="text" onChange={(e)=>setData({...data,firstname:e.target.value})}/>
            <label>Last Name</label>
            <input type="text" onChange={(e)=>setData({...data,lastname:e.target.value})}/>
            {
                props.func(prvs=>prvs=data.firstname+" "+data.lastname)
            }
        </div>
    )
}
export default Name