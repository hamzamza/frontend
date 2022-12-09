import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function MultiCarousel({ data, Body, height, cols }) {
  // this is a carousel from scratch to implement it in every code i want
  const init = () => {
    const initdata = [];
    for (let i = 0; i < cols; i++) {
      initdata.push(i);
    }
    return initdata
  };
  const [cBody, setCBody] = useState(init());
const [isclear , setClear] = useState(" opacity-100 ")
const changeClear=()=>{
    setTimeout(()=>{
            setClear(" opacity-100 ")
    },[200])
setClear(" opacity-0 ")

}
  const goright = () => {
    changeClear()
    setTimeout(()=> setCBody((old) =>
    old.map((item) => {
      if (item < data.length - 1) return item + 1;
      else return 0;
    })
  ),150)
  };
  const goLeft = () => {
    changeClear()
   setTimeout(()=>  setCBody((old) =>
   old.map((item) => {
     if (item > 0) return item - 1;
     else return data.length-1;
   })
 ), 150)
  };
  return (
    <div className="relative forhovering  min-h-40 overflow-auto">
      <div
        className="absolute left-1 rounded-full h-5 cursor-pointer  w-5 flex items-center justify-center  glass top-1/2 intelhover text-gray-700  text-sm z-40"
        onClick={goLeft}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div
        className="absolute right-1 rounded-full h-5 cursor-pointer   w-5  flex items-center justify-center glass top-1/2 intelhover text-gray-700 text-sm z-40"
        onClick={goright}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div className="absolute bottom-1 w-full"></div>
      <div className={"z-10 grid gap-1 mytransition  grid-cols-" + cols + isclear}>{
        cBody.map(b=> <Body mapping={data[b]}  />)}
        </div>
    </div>
  );
}

export default MultiCarousel;
