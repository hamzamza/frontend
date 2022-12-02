import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as freeSolidSvgIcons from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";


function HotelsByGrid() {
    
    const fakehotel = {
        name: "hoet name"
        , title : "hotel title "
        , city: "agadir "
        ,rating : 4.4 ,
        imgUrl:"https://a0.muscache.com/im/pictures/miso/Hosting-37416633/original/97f6748c-dde7-47ae-a012-cabf37cccdf6.jpeg?im_w=720"
    }
    const fakehotelsarray = [
        fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel,fakehotel
    ] 
    return ( 
<div className=" grid xl:grid-cols-6  lg:grid-cols-4 md:grid-cols-3  grid-cols-1 sm:grid-cols-2 gap-6 lg:p-20 p-5 pt-14   " >
   
        {fakehotelsarray.map((hotel,index)=>  { 
             let rat = []
             
            
             if(hotel.rating%1 != 0 ){
               
                for (let i =0  ; i<hotel.rating-1 ; i++ ){
                    rat.push(<FontAwesomeIcon icon={freeSolidSvgIcons.faStar}   key={i} className="w-2"/>) 
                 }
                 rat.push(<FontAwesomeIcon icon={freeSolidSvgIcons.faStarHalf} key={100} className="w-2"/>)
             }
             else{
                for (let i =0  ; i<hotel.rating ; i++ ){
                    rat.push(<FontAwesomeIcon icon={freeSolidSvgIcons.faStar} key={i} className="w-2"/>) 
                 }
             }
          
             return ( <div className=" col-span-1 rounded-xl hover:shadow z-10  " key={index}>
<img src={hotel.imgUrl} alt="" className="w-full rounded-xl " />
            <div className=" pt-3 p-1">
     <div className="flex justify-between pe-2">       <p className=" first-letter:uppercase">{hotel.name}</p><div className="text-blue-500" > {rat.map((itm,index)=>itm)}</div> </div>
            <p className="text-gray-600 text-sm"> some details and some text over here you already know what i'm saying </p>
            <div className=" py-2">
                <Link to={"./#"} className={"text-blue-500 flex items-center gap-2 w-fit p-1 text-sm font-bold"}>Let's Visit  <FontAwesomeIcon icon={freeSolidSvgIcons.faArrowRight}  />   </Link>
                </div>
            </div>
                    </div>)}
        )}
        
</div>

     );
}

export default HotelsByGrid;