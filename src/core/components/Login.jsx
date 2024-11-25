import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cronLabsLogo from "../../assets/cron-labs-logo.jpeg";
import apiService from "../../api/apiService";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}accounts/login/`, { username, password});

      console.log("Login response:", response.data);

      const access_token = response.data.access_token;

      const decodedToken = jwtDecode(access_token);
      const userId = decodedToken.user_id; // Access the user_id from the token
      console.log(userId);
      const role = response.data.role;
      if (access_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("Role", role);

        toast.success('Login Successfull Redirecting...')
        
        setTimeout(() => {
          navigate("/home/myspace/overview?tab=activities");
        }, 1000);
        
      }
    } catch (error) {
      toast.error('Something went wrong...')
      console.error(error);
      
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img className="w-8 h-8 mr-2" src={cronLabsLogo} alt="logo" />

        <div className="max-w-full md:w-[400px] sm:w-[300px] bg-white rounded-lg shadow-md  dark:bg-gray-800 dark:border dark:border-gray-700 m-4 sm:m-0">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800 dark:focus:ring-indigo-600"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div> */}
                <Link
                  to="/forgot-password"
                  className="text-sm text-center font-medium text-indigo-500 hover:underline dark:text-indigo-400"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Sign in
              </button>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-indigo-500 hover:underline dark:text-indigo-400"
                >
                  Sign up
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
