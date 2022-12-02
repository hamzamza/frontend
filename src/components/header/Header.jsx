import * as freeSolidSvgIcons from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; //
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useFetch from "../../hooks/useFetch.js"
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
//
import { AuthContext } from "../../context/authContext";
import Fitlers from "../filters/filters";
import axios from "axios";
const NEW_SEARCH = "NEW_SEARCH";
//
function Header({ search ,cntrl }) {

    // auto compate section 
                              // get all morocan citys by git hub as ajson 
                            const {data, loading, error, reFetch, setLoading } = useFetch("https://raw.githubusercontent.com/alaouy/sql-moroccan-cities/master/json/ville.json")
                            if(!loading){
                              const cities = data.map(item=>item.ville)
                              console.log(cities);
                            }

  console.log(cntrl);
  const {opendate,setOpenDate ,openoptions ,setOpenOptions} = cntrl
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const closeall=()=>{
    setOpenDate(false)
    setOpenOptions(false)
  }
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState({});
 
  const [options, setOptions] = useState({ adults: 1, childrens: 0, rooms: 1 });
  const [danger, setDanger] = useState({
    adults: false,
    childrens: false,
    rooms: false,
  });
  const [nav, setnav] = useState("absolute -bottom-7"); // "fixed top-0"
  useEffect(() => {
    window.onscroll = function () {
      console.log(window.pageYOffset);

      if (window.pageYOffset >= 604.25) {
        setnav("fixed top-0   ");
        // myNav.classList.add("nav-colored");
        //myNav.classList.remove("nav-transparent");
      } else {
        if (nav != "absolute -bottom-5") setnav("absolute -bottom-5");
        //myNav.classList.add("nav-transparent");
        // myNav.classList.remove("nav-colored");
      }
    };
  }, []);

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
                  // best comment ever 
      // never run for a bus tran or girls when one leave anothter arrives !
      
      navigate("/hotels", { state: { destination, date, options } });
    }
  };

  return (<div className="">
    <Fitlers/>
  <div className="handbackground  sm:pt-20 w-full text-gray-700 bg-darkBlue relative">
    
    <div className="  lg:m-0 pb-20   font-nunito ">
      <div className="  m-auto  ">
      <div
        className={!search ? "container m-auto listMode " : "headerContainer"}
      >
        {search && (
          <div className="w-full">
            <div className=" flex items-center  glass w-fit m-auto flex-col">
              <h1 className=" lg:text-5xl text-2xl uppercase  p-2 ">
                Are you looking for a{" "}
                <span className="text-yellow-500 font-bold">hotel</span> ??
              </h1>
              <p className="text-lg mt-10 p-3 font-nunito ">
              Hotels with History in Morocco · La Mamounia, Marrakech · Palais Amani, Fes · Dar Ahlam, Ouazarzate · Kasbah du Toubkal, Imlil ...
              </p>
              <p className="text-lg w-full p-3 font-nunito ">
               they are all available in this website
               <span className="text-blue-300 text-lg"> Search down  </span>
              </p>
            </div>

            <div className={"w-full z-40 " + nav}>
              <div className=" grid text-blue-500 grid-cols-7  lg:w-fit m-auto  bg-gray-100 shadow-md rounded-xl ">
                <div className="  flex col-span-6 lg:col-span-2 p-1   hover:bg-gray-200 rounded-xl">
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
                <div className="  col-span-2  hidden lg:block relative hover:bg-gray-200 hover:rounded-md">
                  <div
                    className="w-full h-full p-3 gap-1   flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      setOpenDate((old) => !old);
                      setOpenOptions(false)
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={freeSolidSvgIcons.faCalendarDays} />
                    <span className="">
                      {format(date[0].startDate, "MM/dd/yyyy")} to{" "}
                      {format(date[0].endDate, "MM/dd/yyyy")}
                    </span>
                  </div>
                  {opendate && (
                    <div className=" absolute top-30 w-full ">
                      
                      <div className="relative m-auto w-fit ">
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
                    </div>
                  )}
                </div>
                <div className="  col-span-2 hover:bg-gray-200 hidden lg:block hover:rounded-md relative">
                  <div
                     className="w-full h-full p-3 gap-1   lg:flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      setOpenOptions((old) => !old);
                      setOpenDate(false)
                    }}
                  >
                    <FontAwesomeIcon
                      className=""
                      icon={freeSolidSvgIcons.faPerson}
                    />
                    <span className="">
                      {`${options.adults} adults ${options.childrens} childrens ${options.rooms} rooms`}
                    </span>
                  </div>
                  {openoptions && (
                    <div className="absolute w-full">
                      <div className="  m-auto bg-white shadow-lg w-5/6 rounded-md ">
                        <div className="p-4   flex justify-between">

                          <span className="">Adults</span>
                          <div className="grid grid-cols-3 items-center">
                            <button
                              className=" optionCounterbutton"
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
                        <div className="p-4  flex justify-between">

                          <span className="optiontext">Children</span>
                          <div className="grid  grid-cols-3 items-center">
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
                        <div className="p-4  flex justify-between">

                          <span className="optiontext">rooms</span>
                          <div className="grid  grid-cols-3 items-center">
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
                    </div>
                  )}
                </div>
                <div className=" col-span-1 hover:bg-gray-400 hover:text-white  rounded-ms rounded-r-xl p-2">
                  <div
                    className="  p-3 gap-1  flex justify-center items-center cursor-pointer "
                    onClick={handelSearch}
                  >
                    <FontAwesomeIcon
                      className=" w-10 h-6"
                      icon={freeSolidSvgIcons.faSearch}
                    />
                    <span className="searchBtnSpan hidden lg:inline-block">Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Header;
