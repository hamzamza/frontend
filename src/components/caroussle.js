import { faArrowLeft, faArrowRight, faCircle, faDotCircle, faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function Carousel({data , Body , height , autochange , period }) {
    // this is a carousel from scratch to implement it in every code i want
    const [cBody,setCBody] = useState(0)
   
    let dotes = []
       for (let i =0  ; i<data.length ; i++ ){
        if(i===cBody){
            dotes.push(<FontAwesomeIcon icon={faCircle}   key={i} className="w-2 text-yellow-500"/>) 
        
        }else
           dotes.push(<FontAwesomeIcon icon={faCircle}   key={i} className="w-2 text-gray-200"/>) 
        }
      const goright=()=>
    {
if( cBody > data.length-2  )
        {
            setCBody(0)
        }
        else{
setCBody(old=>old+1)
        }
    }
    const goLeft=()=>
    {
if(  cBody===0)
        {
            setCBody(data.length-1)
        }
        else{
setCBody(old=>old-1)
        }
    }
    return ( 
        <div className= "relative forhovering  min-h-40 ">
        <div className="absolute left-1 rounded-full h-5 cursor-pointer  w-5 flex items-center justify-center  glass top-1/2 intelhover text-gray-700  text-sm z-40" onClick={goLeft} ><FontAwesomeIcon icon={faArrowLeft}/></div>
        <div className="absolute right-1 rounded-full h-5 cursor-pointer   w-5  flex items-center justify-center glass top-1/2 intelhover text-gray-700 text-sm z-40" onClick={goright} ><FontAwesomeIcon icon={faArrowRight}/></div>
        <div className="absolute bottom-1  w-full">
        <div className="  h-4  m-auto w-fit text-xs p-1 flex justify-center items-center  gap-0.5"> {dotes}</div>
        </div>
        <div className="z-10">{<Body mapping={data[cBody]} />}</div> 
        </div>
     );
}


export default Carousel;