import { useState } from "react";
import { register } from "../utils/api"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // For displaying errors

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  // Function to validate password complexity
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error before new attempt

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const res = await register(username, email, password);
      console.log(res); // Handle success (e.g., redirect to login or show success message)
      navigate("/login"); // Navigate to login page on successful registration
    } catch (err) {
      setError(err.message); // Display the error message returned from the backend
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-screen">
      <h1 className="text-4xl font-bold text-white">Register</h1>

      <form onSubmit={handleSubmit} className="w-full mt-10 flex flex-col gap-5 max-w-md">
        <input
          className="w-full p-2 border-2 rounded-md border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border-2 rounded-md border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border-2 rounded-md border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border-2 rounded-md border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="w-full p-2 bg-violet-500 text-white rounded-md" type="submit">
          Register
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      <button
        className="navbar-toggler text-white p-2 rounded-xl bg-violet-600"
        onClick={handleHome}
        type="button"
      >
        Have a <span className="font-bold">Loop</span> 
      </button>
    </div>
  );
};

export default Register;


