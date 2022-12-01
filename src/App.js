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
const Notfound = () => {
  return (<div>
    <div style={{ display: "flex", justifyContent: "center" }} >
      <h1> not found error</h1>
    </div>


  </div>)
}

function App() {
 
return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotel/select/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
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
