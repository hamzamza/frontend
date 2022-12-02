// ffc
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";

import FeaturedProperties from "../../components/featured/FeaturedProperties";
import PropertyList from "../../components/properties/PropertyList";
import MailList from "../../components/maillist/MailList";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import HotelsByGrid from "../../components/HotelsByGrid";
// import SearchItem from "../../components/searchItem/SearchItem";
function Home() {
  
  const [opendate, setOpenDate] = useState(false);
  const [openoptions, setOpenOptions] = useState(false);
  const closeall=()=>{
    setOpenDate(false)
    setOpenOptions(false)
  }
  return (
    <div className=" relative ">
      <div className="w-full h-full absolute z-0" onClick={closeall} >  </div>
      <Navbar />
      <Header search={true} cntrl={{opendate,setOpenDate,openoptions,setOpenOptions}}/>
      <HotelsByGrid/>
      <div className=" bg-slate-200  pt-20 ">
        <div className="bg-gray-700">
        <div className="w-fit m-auto ">

      
        <h2 className="">Browse by city</h2>
        <Featured />
        <h2 className="">Browse by property type</h2>
        <PropertyList />
       
        

         </div>
       
        </ div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
