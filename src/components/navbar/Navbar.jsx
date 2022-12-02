
import { Link } from "react-router-dom";
import logo from "../../assets/images/picwishnoname.png";
import { useContext, useReducer } from "react";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className=" bg-blue-500 ">
      <div className="flex justify-between p-3 items-center z-20 container m-auto">
        <Link to={"/"}>
          <span className="logo">
            <img src={logo} alt="" className=" rounded-lg  h-20" />
          </span>
        </Link>
        {!user ? (
          <div className="grid grid-cols-2 gap-1 z-20 ">
            <Link to={"/login"}>
              <div className="p-2 rounded-sm  text-white hover:text-darkBlue hover:bg-white px-3 text-center font-bold">
                login
              </div>
            </Link>
            <Link to={"/register"}>
              <div className="p-2 rounded-sm text-white hover:text-darkBlue hover:bg-white px-3 text-center font-bold">
                register
              </div>
            </Link>
          </div>
        ) : (
        //  <div className="">{user.username}</div>
        <div >  
            {user.img ? <img src={user.img } className=" w-10 h-10" alt="no image"/>:<FontAwesomeIcon icon={faUser}  className=" w-8 h-8 bg-gray-400 rounded-full p-3 "/>}


        </div>
        
        )}
      </div>
    </div>
  );
}

export default Navbar;
