// src/components/auth/RegistrationForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (fullName && email && password) {
      navigate("/ticket");
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="animate-fade-in">
      <button className="google-btn w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 mb-6">
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
        {/* Full Name */}
        <div className="input-field bg-gray-50 border border-gray-300 rounded-lg transition-all duration-300">
          <label className="block text-xs text-gray-500 px-4 pt-3">Full Name</label>
          <div className="flex items-center px-4 pb-2">
            <i className="fas fa-user text-gray-400 mr-2"></i>
            <input
              type="text"
              className="w-full py-2 outline-none bg-transparent"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="input-field bg-gray-50 border border-gray-300 rounded-lg transition-all duration-300">
          <label className="block text-xs text-gray-500 px-4 pt-3">Email Address</label>
          <div className="flex items-center px-4 pb-2">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <input
              type="email"
              className="w-full py-2 outline-none bg-transparent"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="input-field bg-gray-50 border border-gray-300 rounded-lg transition-all duration-300">
          <label className="block text-xs text-gray-500 px-4 pt-3">Password</label>
          <div className="flex items-center px-4 pb-2">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <input
              type={showPassword ? "text" : "password"}
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

        {/* Confirm Password */}
        <div className="input-field bg-gray-50 border border-gray-300 rounded-lg transition-all duration-300">
          <label className="block text-xs text-gray-500 px-4 pt-3">Confirm Password</label>
          <div className="flex items-center px-4 pb-2">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full py-2 outline-none bg-transparent"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Agree to Terms */}
        

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#6491ba] hover:bg-[#507aa0] text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium hover:underline ml-1">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
