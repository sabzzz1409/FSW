import React, { useState } from "react";
import Name from "./name";

const Main=()=>{
    const[title,setTitle] = useState("")
    return(
        <div>
            <Name func={setTitle}/>
            {title}
        </div>
    )
}
export default Main