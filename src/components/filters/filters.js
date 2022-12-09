import {
  faBowlFood,
  faCab,
  faChainBroken,
  faHotel,
  faHouse,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Fitlers() {
  return (
    <div className=" relative hidden md:block ">
          <div className="w-full absolute top-1/2 border-b-2 border-black  z-0"> </div>
      <div className=" grid md:grid-cols-5  grid-cols-2 sm:grid-cols-3 gap-3  p-1 py-3 w-fit m-auto z-30 ">
  
        <div className="p-3 px-10 flex items-center justify-center  gap-3  text-gray-200 font-bold uppercase text-sm  rounded-full cursor-pointer  bg-black shadow-2xl z-20 hover:bg-gray-800 ">
          <FontAwesomeIcon className="text-blue-800" icon={faHotel} />
          hotels
        </div>
        <div className="p-3 px-10  flex items-center justify-center  gap-3 text-gray-200 font-bold uppercase text-sm rounded-full cursor-pointer  bg-black shadow-2xl z-20 hover:bg-gray-800 ">
          <FontAwesomeIcon className="text-blue-800" icon={faHouse} />
          apartements
        </div>
        <div className="p-3 px-10 flex items-center justify-center  gap-3   text-gray-200 font-bold uppercase text-sm rounded-full cursor-pointer  bg-black shadow-2xl z-20 hover:bg-gray-800 ">
          <FontAwesomeIcon className="text-blue-800" icon={faBowlFood} />
          restorant
        </div>
        <div className="p-3 px-10 items-center justify-center   flex gap-3 text-gray-200 font-bold uppercase text-sm rounded-full cursor-pointer  bg-black shadow-2xl z-20 hover:bg-gray-800 ">
          <FontAwesomeIcon className="text-blue-800" icon={faHouseChimney} />
          villas
        </div>
        <div className="p-3 px-10 flex items-center justify-center  gap-3   text-gray-200 font-bold uppercase text-sm rounded-full cursor-pointer  bg-black shadow-2xl z-20 hover:bg-gray-800 ">
         <FontAwesomeIcon className="text-blue-800" icon={faCab} />
          cabins
        </div>
      </div>
    </div>
  );
}

export default Fitlers;
