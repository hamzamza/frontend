import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../Backedn";

import { AuthContext } from "../../context/authContext";
import logo from "../../assets/images/logo3.png"

function Login() {
  const LOGIN_START = "LOGIN_START";
  const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  const LOGIN_FAILER = "LOGIN_FAILER";
  const LOGOUT = "logout";
  const navigagte = useNavigate();
  //

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  /*const handelChange = (e) => {
    switch (e.taget.id) {
      case "username":
        setCredentials({ username: e.taget.value });
        break;
      case "password":
        setCredentials({ password: e.taget.value });
        break;
      default:
        break;
    }
  };*/
  const handelChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handelClick = async (e) => {
    e.preventDefault();

    dispatch({ type: LOGIN_START });
    try {
      const response = await axios.post(
       server+ "/api/auth/login",
        credentials
      );
      await dispatch({ type: LOGIN_SUCCESS, payload: response.data.details });
      console.log("loged in");
      navigagte("/");
    } catch (er) {
      console.log(er);
      dispatch({ type: LOGIN_FAILER, payload: er.response.data });
    }
  };
  return (
    <div className="">
      <section class="bg-gray-50   ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
      <img class=" h-20 rounded-lg " src={logo} alt="logo"/>
        
      </a>
      <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input id="username" onChange={handelChange} value={credentials.username} name="email"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 " >Password</label>
                      <input type="password" id="password" onChange={handelChange} value={credentials.password} name="password"  placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 ">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                  </div>
                  <button  onClick={handelClick} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{loading? "loaidng ..." :"sign in" }</button>
                  <p class="text-sm font-light text-gray-500 ">
                      Don’t have an account yet? <Link to={"/register"} class="font-medium text-primary-600 hover:underline">Sign up</Link>
                  </p>
                  {error && <p className="text-red-500 text-center font-bold"> {error.msg}</p>}
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  );
}

export default Login;


