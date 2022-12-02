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
    <div className="bg-blue-500 relative ">
          <div className="w-full absolute top-1/2 border-b-2 border-gray-300  z-10"> </div>
      <div className=" grid md:grid-cols-5  grid-cols-2 sm:grid-cols-3 gap-3  p-1 py-3 w-fit m-auto z-30 border-t-2 border-gray-300 ">
  
        <div className="p-3 px-10 flex items-center justify-center  gap-3  text-gray-600 font-bold uppercase text-sm  rounded-full cursor-pointer bg-gray-300 shadow-2xl z-20 hover:bg-gray-400 ">
          <FontAwesomeIcon className="text-blue-800" icon={faHotel} />
          hotels
        </div>
        <div className="p-3 px-10  flex items-center justify-center  gap-3 text-gray-600 font-bold uppercase text-sm rounded-full cursor-pointer bg-gray-300 shadow-2xl z-20 hover:bg-gray-400 ">
          <FontAwesomeIcon className="text-blue-800" icon={faHouse} />
          apartements
        </div>
        <div className="p-3 px-10 flex items-center justify-center  gap-3   text-gray-600 font-bold uppercase text-sm rounded-full cursor-pointer bg-gray-300 shadow-2xl z-20 hover:bg-gray-400 ">
          <FontAwesomeIcon className="text-blue-800" icon={faBowlFood} />
          restorant
        </div>
        <div className="p-3 px-10 items-center justify-center   flex gap-3 text-gray-600 font-bold uppercase text-sm rounded-full cursor-pointer bg-gray-300 shadow-2xl z-20 hover:bg-gray-400 ">
          <FontAwesomeIcon className="text-blue-800" icon={faHouseChimney} />
          villas
        </div>
        <div className="p-3 px-10 flex gap-3 items-center justify-center  text-gray-600 font-bold uppercase text-sm rounded-full cursor-pointer bg-gray-300 shadow-2xl z-20 hover:bg-gray-400 ">
          <FontAwesomeIcon className="text-blue-800" icon={faCab} />
          cabins
        </div>
      </div>
    </div>
  );
}

export default Fitlers;
