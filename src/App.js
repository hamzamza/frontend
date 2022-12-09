
import github from './assets/images/github.svg'
import { useState } from "react";
import { useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register";
import { Icon } from '@mui/material';
import About from './components/About';
const Notfound = () => {
  return (<div>
    <div style={{ display: "flex", justifyContent: "center" }} >
      <h1> not found error</h1>
    </div>


  </div>)
}

function App() {
 
return (
   <div className="relative">
    <a target={"_blank"} href="https://github.com/hamzamza/frontend" className=" fixed hidden md:block   top-10 right-10  z-50"> <img src={github } className="w-20 bg-gray-500  shadow-lg shadow-black  rounded-full p-3 " /> </a>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/hotels" element={<List />} />
        <Route path="/hotel/select/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
   </div>
  )
  /*
                   this code generating the location of your client but the problem is in the permission i can't handel it 
 const [location , setLocation  ] = useState(["",""]); 
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        setLocation( "Geolocation is not supported by this browser.");
      }
    }
    function showPosition(position) {
     setLocation( ["Latitude: " + position.coords.latitude ,
      "Longitude: " + position.coords.longitude]);
    }
return(<div>
<h1>wa merwan clicki 3la hadi</h1>
<button onClick={getLocation}>hna baliiz</button>
<h5>{location[0]}</h5>
<h5>{location[1]}</h5>
</div>)
  */
}

export default App;
