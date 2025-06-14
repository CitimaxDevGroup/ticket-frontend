import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/ticketing");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter valid credentials");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/ticketing");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={handleGoogleSignIn}
        className="google-btn w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 mb-6"
      >
        <img
          src="https://logowik.com/content/uploads/images/985_google_g_icon.jpg"
          alt="Google logo"
          className="h-8 w-10 mr-3"
        />
        Continue with Google
      </button>
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="input-field bg-gray-50 border border-gray-300 rounded-lg transition-all duration-300">
          <label htmlFor="email" className="block text-xs text-gray-500 px-4 pt-3">
            Email Address
          </label>
          <div className="flex items-center px-4 pb-2">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <input
              type="email"
              id="email"
              className="w-full py-2 outline-none bg-transparent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-field bg-gray-50 border border-gray-300 rounded-lg transition-all duration-300">
          <label htmlFor="password" className="block text-xs text-gray-500 px-4 pt-3">
            Password
          </label>
          <div className="flex items-center px-4 pb-2">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full py-2 outline-none bg-transparent"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-blue-500"
            >
              <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
            Forgot password?
          </a>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#6491ba] hover:bg-[#507aa0] text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md"
        >
          Log In
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?
          <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline ml-1">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
