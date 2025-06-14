import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegistrationForm";
import login from './images/login.png';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative">
      <div
        className="lg:hidden absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${login})` }}
      />

      <div className="lg:hidden absolute inset-0 z-0 bg-black bg-opacity-60" />

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="block lg:hidden text-center text-white mb-6">
          <h2 className="text-3xl font-bold">CITIMAX Support Ticketing System</h2>
          <p className="text-lg italic">“Efficient Tracking. Faster Resolution. Continuous Improvement.”</p>
        </div>

        <div className="relative w-full max-w-md h-[550px] perspective">
          <div
            className={`absolute w-full h-full transition-transform duration-700 transform preserve-3d ${isLogin ? "" : "rotate-y-180"
              }`}
          >
            <Card className="absolute w-full h-full rounded-2xl shadow-xl p-8 bg-white backface-hidden">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                <p className="text-gray-600 mt-2">Please sign in to continue</p>
              </div>
              <LoginForm />
              <p className="mt-5 text-center text-gray-600">
                Don’t have an account?
                <button
                  type="button"
                  className="ml-1 font-semibold hover:underline"
                  style={{ color: "#6491ba" }}
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </button>
              </p>
            </Card>

            <Card className="absolute w-full h-full rounded-2xl shadow-xl p-8 bg-white backface-hidden rotate-y-180">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-gray-600 mt-2">Get started with your account</p>
              </div>
              <RegisterForm />
              <p className="mt-5 text-center text-gray-600">
                Already have an account?
                <button
                  type="button"
                  className="ml-1 font-semibold hover:underline"
                  style={{ color: "#6491ba" }}
                  onClick={() => setIsLogin(true)}
                >
                  Sign in
                </button>
              </p>
            </Card>
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${login})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-4xl font-bold mb-3">CITIMAX Support Ticketing System</h2>
            <p className="text-xl italic">“Efficient Tracking. Faster Resolution. Continuous Improvement.”</p>
          </div>
        </div>
      </div>
    </div>
  );
}