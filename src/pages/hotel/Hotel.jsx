import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/maillist/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
// import Reserve from "../../components/reserve/Reserve";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../components/reserve/Reserve";
import { server } from "../../Backedn";
import Carousel from "../../components/caroussle";
import MultiCarousel from "../../components/multicarousel";

const Hotel = () => {
  const navigate = useNavigate();
  let { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [reserveopen, setReserveOpen] = useState(false);

  const [isopen, setIsopen] = useState(false);
  const locate = useLocation();
  const { data, loading, error } = useFetch(
    server+`/api${locate.pathname}`
  );



  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction, max) => {
    let newSlideNumber;

    if (max > 0) {
      if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? max : slideNumber - 1;
      } else {
        newSlideNumber = slideNumber === max ? 0 : slideNumber + 1;
      }

      setSlideNumber(newSlideNumber);
    }
  };

  const dif = (dates) => {
    return dates[0]
      ? (dates[0].endDate - dates[0].startDate) / (1000 * 60 * 60 * 24) + 1
      : 0;
  };
  const numrroms = () => {
    return options.room ? options.room : 1;
  };
  const handelBooking = () => {
    if (user) {
      setReserveOpen((old) => !old);
    } else {
      navigate("/login");
    }
  };
  const slideritem= (data) => <div className="sliderWrapper">
  <img
    src={data.photos[slideNumber]}
    alt=""
    className="sliderImg"
  />
</div>
const [issmallscreen , setIsSmallScreen] = useState(true)
const body =({mapping})=>{
  return <img src={mapping} alt="hamzadev" className="rounded-lg h-96 col-span-1 w-full  object-cover " />

}
function myFunction(x) {
  if (x.matches) { // If media query matches
    setIsSmallScreen(true)
  } else {
    setIsSmallScreen(false)
  }
}
useEffect(()=>{
  var x = window.matchMedia("(max-width: 1100px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction)
}
,
[])

  return (
    <div>
      
     
      {!loading && error.message ? (
        "ERROR IN THE URL"
      ) : (
        <div className="">
          <Navbar />
        
          {loading ? (
            "loading ........"
          ) : (
            <div className=" container m-auto bg-gray-300 rounded-xl p-2 relative">
              {open && (
               <div></div>
              )}
              {!open && (
                <div className="">
                  <button className="bookNow" onClick={handelBooking}>
                    Reserve or Book Now!
                  </button>
                  <h1 className="hotelTitle">Tower Street Apartments</h1>
                  <div className="hotelAddress">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>Elton St 125 New york</span>
                  </div>
                  <span className="hotelDistance">
                    Excellent location – 500m from center
                  </span>
                  <span className="hotelPriceHighlight">
                    Book a stay over $114 at this property and get a free
                    airport taxi
                  </span>
                  <div className=" px-10">
                {issmallscreen ? <Carousel Body= {body}  data={data.photos} /* you can't put 4 */ />: <MultiCarousel Body= {body}  data={data.photos} cols={3} /* you can't put 4 */ /> }  
   
                  </div>
                  <div className="hotelDetails ">
                    <div className="hotelDetailsTexts">
                      <h1 className="hotelTitle">Stay in the heart of City</h1>
                      <p className="hotelDesc">
                        Located a 5-minute walk from St. Florian's Gate in
                        Krakow, Tower Street Apartments has accommodations with
                        air conditioning and free WiFi. The units come with
                        hardwood floors and feature a fully equipped kitchenette
                        with a microwave, a flat-screen TV, and a private
                        bathroom with shower and a hairdryer. A fridge is also
                        offered, as well as an electric tea pot and a coffee
                        machine. Popular points of interest near the apartment
                        include Cloth Hall, Main Market Square and Town Hall
                        Tower. The nearest airport is John Paul II International
                        KrakówBalice, 16.1 km from Tower Street Apartments, and
                        the property offers a paid airport shuttle service.
                      </p>
                    </div>
                    <div className="hotelDetailsPrice">
                      <h1>
                        Perfect for a {dif(dates)}
                        -night stay!
                      </h1>
                      <span>
                        {}
                        Located in the real heart of Krakow, this property has
                        an excellent location score of 9.8!
                      </span>
                      <h2>
                        <b>
                          ${dif(dates) * data.cheapestPrice * numrroms()} for{" "}
                          {dif(dates)}
                          nights
                        </b>
                      </h2>
                      <button onClick={handelBooking}>
                        Reserve or Book Now!
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* 
       <button
          onClick={() => {
            console.log(
              (others.dates[0].endDate - others.dates[0].startDate) /
                (1000 * 60 * 60 * 24) +
                1
            );
          }}
        >
          {others.city}
        </button>
      */}
              
            </div>
          )}
        </div>
      )}
      {reserveopen && <Reserve hotelId={data._id} setOpen={setReserveOpen} />}
      <MailList />
              <Footer />
    </div>
  );
};

export default Hotel;
