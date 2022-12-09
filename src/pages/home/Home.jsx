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
import Fitlers from "../../components/filters/filters";
// import SearchItem from "../../components/searchItem/SearchItem";
function Home() {
  
  
  return (
    <div className=" relative ">
       <Navbar />
      <Header search={true} />
      <Fitlers/>
      <HotelsByGrid/>
      <div className=" bg-slate-200  pt-20 ">
        <div className="">
        <PropertyList />   
        </ div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
