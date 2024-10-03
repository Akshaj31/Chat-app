import React, { useState } from "react";

const Login = () => {
  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle errors
  const [success, setSuccess] = useState(false); // State for success

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Send a POST request to the login API
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that you're sending JSON
        },
        body: JSON.stringify({ username, password }), // Send the username and password as the request body
      });

      // Parse the response
      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., save token, redirect, etc.)
        console.log("Login successful!", data);
        setSuccess(true); // Set success to true if login succeeds
        // Optionally, save a token or user info to localStorage
        // localStorage.setItem("token", data.token);
      } else {
        // Handle errors if login failed
        console.error("Login failed:", data.message);
        setError(data.message); // Show error message
      }
    } catch (error) {
      // Catch any errors that occur during the fetch process
      console.error("An error occurred during login:", error);
      setError("An error occurred, please try again."); // Show error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-9 rounded-lg shadow-md w-80">
        <h1 className="text-2xl mb-6 text-start text-purple-600">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update the username state
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update the password state
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full py-3 bg-fuchsia-400 text-white rounded">
            Submit
          </button>
        </form>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Display success message if login succeeds */}
        {success && <p className="text-green-500 mt-4">Login successful!</p>}
      </div>
    </div>
  );
};

export default Login;