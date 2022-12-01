import * as freeSolidSvgIcons from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; //
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
//
import { AuthContext } from "../../context/authContext";
const NEW_SEARCH = "NEW_SEARCH";
//
function Header({ search }) {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState({});
  const [opendate, setOpenDate] = useState(false);
  const [openoptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adults: 1, childrens: 0, rooms: 1 });
  const [danger, setDanger] = useState({
    adults: false,
    childrens: false,
    rooms: false,
  });
  const [nav,setnav] = useState("absolute -bottom-7") // "fixed top-0"
  useEffect(()=>{
    window.onscroll = function () { 
      console.log(window.pageYOffset)
     
      if (window.pageYOffset >= 550 ) {
        setnav("fixed top-0 ")
         // myNav.classList.add("nav-colored");
          //myNav.classList.remove("nav-transparent");
      } 
      else {
        if(nav != "absolute -bottom-5" )
        setnav("absolute -bottom-5")
          //myNav.classList.add("nav-transparent");
         // myNav.classList.remove("nav-colored");
      }
  };


  },[])

  const handelOption = (name, operation) => {
    if ((options[name] === 0) & (operation === "d")) {
      setDanger((prev) => {
        return { ...prev, [name]: true };
      });

      setTimeout(() => {
        setDanger((prev) => {
          return { ...prev, [name]: false };
        });
      }, 500);
    }
    setOptions((pre) => {
      if ((options[name] === 0) & (operation === "d")) {
        return { ...pre };
      } else {
        return {
          ...pre,
          [name]:
            (operation === "d") & (options[name] >= 0)
              ? options[name] - 1
              : options[name] + 1,
        };
      }
    });
  };
  const { dispatch, ...others } = useContext(SearchContext);

  const navigate = useNavigate();
  const handelSearch = () => {
    if (destination.length > 0) {
      dispatch({
        type: NEW_SEARCH,
        payload: {
          city: destination,
          dates: date,
          options: options,
        },
      });

      // never run for a bus tran or girls when one leave anothter arrives !
      console.log(others);
      navigate("/hotels", { state: { destination, date, options } });
    }
  };

  return (
    <div className="w-full text-white bg-darkBlue handbackground relative ">
      <div
        className={!search ? "container m-auto listMode " : "headerContainer"}
      >
        {search && (
          <div>
            <div className="">
              <h1 className="text-center text-5xl uppercase ">
                A lifetime of discounts? it's genius
              </h1>
              <p className="text-lg mt-10 text-center">
                Get rewarded for your travels unlick instant savings of 10% or
                more with a free StrockBnB account
              </p>
            </div>

           
            <div className={"w-full z-10 "+nav}>

            <div className=" grid text-blue-500 grid-cols-7 w-2/3 m-auto gap-1 bg-gray-100 shadow-md rounded-xl " >
              <div className="  flex col-span-2 p-1">
                <FontAwesomeIcon
                  className="w-8 h-8 m-3"
                  icon={freeSolidSvgIcons.faBed}
                />
                <input
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                  type="text"
                  className="bg-gray-50 border  border-blue-400  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-bold dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                
                  placeholder="Where are you going ? ...."
                />
              </div>
              <div className="  col-span-2 " >
               <div className="w-full h-full p-3 gap-1  flex justify-center items-center cursor-pointer" onClick={() => {
                if (!opendate) setOpenDate( true);
                  }}> <FontAwesomeIcon icon={freeSolidSvgIcons.faCalendarDays} />
                <span
                  className=""
                >
                  {format(date[0].startDate, "MM/dd/yyyy")} to{" "}
                  {format(date[0].endDate, "MM/dd/yyyy")}
                </span></div>
                {opendate && (
                  <div className=" relative ">
                    <FontAwesomeIcon  className=" font-bold  w-6  text-gray-600" icon={freeSolidSvgIcons.faXmark} onClick={()=>setOpenDate(false)}/>
          <div>

                  <DateRange
                    className=""
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    />
                    </div>
                  </div>
                )}
              </div>
              <div className="    col-span-2" 
              onClick={() => {
                setOpenOptions( true );
              }}
                  >
                     <div className="w-full h-full p-3 gap-1  flex justify-center items-center cursor-pointer" >



                <FontAwesomeIcon
                  className=""
                  icon={freeSolidSvgIcons.faPerson}
                  />
                <span
                  className=""
                  
                  >
                  {`${options.adults} adults ${options.childrens} childrens ${options.rooms} rooms`}
                </span>
                  </div>
                {openoptions && (
                  <div className=" relative">
                    <div className=" absolute -top-3 -right-3 bg-slate-100 rounded-full p-1 shadow shadow-black">
                  <FontAwesomeIcon  className=" font-bold  w-6  text-gray-600" icon={freeSolidSvgIcons.faXmark} onClick={()=>setOpenOptions(false)}/>

                    </div>
                    <div className="">
                      <span className="">Adults</span>
                      <div className="">
                        <button
                          className=""
                          onClick={() => {
                            handelOption("adults", "d");
                          }}
                        >
                          -
                        </button>
                        <span
                          className={`optionCounterNumber ${
                            danger.adults ? "active" : " "
                          }`}
                        >
                          {options.adults}
                        </span>
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("adults", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionitem">
                      <span className="optiontext">Children</span>
                      <div className="counter">
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("childrens", "d");
                          }}
                        >
                          -
                        </button>
                        <span
                          className={`optionCounterNumber ${
                            danger.childrens ? "active" : " "
                          }`}
                        >
                          {options.childrens}
                        </span>
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("childrens", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionitem">
                      <span className="optiontext">rooms</span>
                      <div className="counter">
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("rooms", "d");
                          }}
                        >
                          -
                        </button>
                        <span
                          className={`optionCounterNumber ${
                            danger.rooms ? "active" : " "
                          }`}
                        >
                          {options.rooms}
                        </span>
                        <button
                          className="optionCounterbutton"
                          onClick={() => {
                            handelOption("rooms", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className=" col-span-1">
                
                <div className="w-full h-full p-3 gap-1  flex justify-center items-center cursor-pointer" onClick={handelSearch}>
                  <FontAwesomeIcon
                    className="search-btn-logo"
                    icon={freeSolidSvgIcons.faSearch}
                  />
                  <span className="searchBtnSpan">Search</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
