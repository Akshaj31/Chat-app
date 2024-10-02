import React from "react";

const Login = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-9 rounded-lg shadow-md w-80">
        <h1 className="text-2xl mb-6 text-start text-purple-600"> Login </h1>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <button className="w-full py-3 bg-fuchsia-400 text-white rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;