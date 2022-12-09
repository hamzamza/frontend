import * as freeSolidSvgIcons from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; //
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DateRange } from "react-date-range";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
//
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import "./list.css";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/searchContext";
import { server } from "../../Backedn";
import { Autocomplete, TextField } from "@mui/material";
import { Cities } from "../../assets/cities/cities";
function List() {
  const location = useLocation();
  const NEW_SEARCH = "NEW_SEARCH";
  //  const [search, setSearch] = useState(location.state);

  const [date, setDate] = useState(
    location.state
      ? location.state.date
      : [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ]
  );
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const [destination, setDestination] = useState(
    location.state ? location.state.destination : "everywhere"
  );
  const [opendate, setOpenDate] = useState(false);
  const [openoptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(
    location.state
      ? location.state.options
      : { adults: 0, childrens: 0, rooms: 0 }
  );
  const [danger, setDanger] = useState({
    adults: false,
    childrens: false,
    rooms: false,
  });
  const { data, loading, error, reFetch } = useFetch(
    server + `/api/hotel?city=${destination}&limit=10`
  );
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
  const handelchange = () => {
    console.log("clicked");
    reFetch(
      server + `/api/hotel?&limit=10&min=${min || 0}&max=${max || 10000}`
    );
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
    }
  };

  const setaverage =(average)=>{
    let maxP = 500 ; 
let   minP = 0 
    switch(average){
      case "1": 
      minP=10
      maxP=100
      break;
      case "2":
        minP=100
        maxP=200
    }
setMin(minP)
setMax(maxP)
  }
  const [cities, setcities] = useState(Cities.map((item) => item.ville));
  const closeall = () => {
    setOpenDate(false);
    setOpenOptions(false);
    setisallclose(false);
  };
  const [isallclose, setisallclose] = useState(false);

  return (
    <div>
      {isallclose && (
        <div className="w-full h-full absolute z-20" onClick={closeall}>
          {" "}
        </div>
      )}
      <div className="sticky top-0 left-0 z-20">
        {" "}
        <Navbar />
      </div>

      <div className="grid grid-cols-5 gap-4  bgzlij min-h-screen p-20 z-40 ">
        <div className="col-span-1 h-fit glass p-3 sticky z-30 top-24 text-gray-500 ">
          <div className=" grid-cols-2 grid lg:grid-cols-1 ">
            <h1 className=" text-xl font-bold font-nunito text-gray-500 pl-10">
              Search
            </h1>

            <div className="w-full">
              <div className="  flex gap-2 items-center  p-1   hover:bg-gray-200 rounded-xl">
                <FontAwesomeIcon
                  className=" text-blue-600 p-3 rounded-full  "
                  icon={freeSolidSvgIcons.faBed}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cities}
                  className="w-full"
                  renderInput={(params) => (
                    <TextField {...params} label="where do you want ??" />
                  )}
                  value={this}
                  onChange={(e, v) => {
                    setDestination(v);
                  }}
                />
              </div>
            </div>
            <div className=" p-2 ">
              <div className="  col-span-2 gap-2 items-center lg:flex relative  z-30">
                <div
                  className=" p-3  hover:bg-slate-300 bg-gray-100 rounded items-center cursor-pointer"
                  onClick={() => {
                    setOpenDate((old) => !old);
                    setOpenOptions(false);
                    setisallclose(true);
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    className="text-blue-600"
                    icon={freeSolidSvgIcons.faCalendarDays}
                  />
                </div>
                <div className="w-full p-1">
                  <div
                    onClick={() => {
                      setOpenDate((old) => !old);
                      setOpenOptions(false);
                      setisallclose(true);
                    }}
                    className=" p-2 bg-white rounded-lg  text-center font-bold text-gray-700 "
                  >
                    {format(date[0].startDate, "dd- MM- yyyy")}
                  </div>
                  <div className="text-center font-bold ">
                    <FontAwesomeIcon
                      className=""
                      icon={freeSolidSvgIcons.faArrowDown}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setOpenDate((old) => !old);
                      setOpenOptions(false);
                      setisallclose(true);
                    }}
                    className=" p-2 bg-white rounded-lg  text-center font-bold text-gray-700 "
                  >
                    {format(date[0].endDate, "dd- MM- yyyy")}
                  </div>
                </div>

                {opendate && (
                  <div className=" absolute top-20 -left-8 w-full ">
                    <div className="relative m-auto w-fit ">
                     
                        <DateRange
                          className="z-20 "
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                        />
                   
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className=" p-3 mt-2 cursor-pointer  bg-white rounded-lg ">
              <div className="flex justify-around relative items-center gap-3">
                <FontAwesomeIcon
                  className=""
                  onClick={() => {
                    setOpenOptions((d) => !d);
                  }}
                  icon={freeSolidSvgIcons.faPerson}
                />
                <span
                  className=""
                  onClick={() => {
                    setOpenOptions((d) => !d);
                    setisallclose(true);
                  }}
                >
                  {`${options.adults +'  '} adults ${options.childrens} childrens ${options.rooms} rooms `}
                </span>
                {openoptions && (
                  <div className="absolute w-full top-10">
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
            </div>
           
            <div className="bg-white rounded-lg p-2  mt-2">
             
               
<h3 class="mb-3  mt-1 font-semibold   ">Votre budget (par nuit)</h3>
<ul class="w-full  text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200"  onChange={(e) => setaverage(e.target.value)}>
    <li class="w-full rounded-t-lg border-b border-gray-200 " >
        <div class="flex items-center pl-3">
            <input id="list-radio-license" type="radio" value="1" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
            <label for="list-radio-license" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">Driver License </label>
        </div>
    </li>
    <li class="w-full rounded-t-lg border-b border-gray-200 ">
        <div class="flex items-center pl-3">
            <input id="list-radio-id" type="radio" value="2" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label for="list-radio-id" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">State ID</label>
        </div>
    </li>
    <li class="w-full rounded-t-lg border-b border-gray-200 ">
        <div class="flex items-center pl-3">
            <input id="list-radio-millitary" type="radio" value="3" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label for="list-radio-millitary" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">US Millitary</label>
        </div>
    </li>
    <li class="w-full rounded-t-lg border-b border-gray-200 ">
        <div class="flex items-center pl-3 ">
            <input id="list-radio-passport" type="radio" value="4" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label for="list-radio-passport" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 ">US Passport</label>
        </div>
    </li>
</ul>

                <input type="text" onChange={(e) => setMax(e.target.value)} />
             
            </div>
            <div className="ssch">
              <button className="searchBtn" onClick={handelchange}>
                <FontAwesomeIcon
                  className="search-btn-logo"
                  icon={freeSolidSvgIcons.faSearch}
                />
                <span className="searchBtnSpan">Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="   col-span-4 h-fit ">
          <div className=" glass p-10 ">
            <div className="  ">
             <div className="text-gray-400 mb-5 first-letter:uppercase font-extrabold font-mono text-center w-full text-2xl"> {destination}</div>
              {data.length > 0
                ? data.map((item) => <SearchItem item={item} key={item._id} />)
                : "no info for  " + destination}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
