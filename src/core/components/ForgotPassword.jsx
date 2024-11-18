import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Check the user email exists and send a password reset link via email
    if (email) {
      setMessage("Password reset link has been sent to your email.");
      
      // Redirect to the Reset Password page after submitting
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000); // Simulating 2 seconds before redirecting
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <section className="bg-gray-50  dark:bg-gray-900 min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col md:w-[400px] sm:w-[300px] items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Forgot Password
        </h1>
        
        <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter your email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {message && (
                <p className="text-sm text-green-500 dark:text-green-400">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
