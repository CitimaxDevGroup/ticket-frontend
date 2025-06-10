import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import LoginForm from "./auth/LoginForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import orelogo from "@/components/images/ore-logo-removebg.png"; 

export default function Login() {
  const navigate = useNavigate();

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <img
              src={orelogo}
              alt="Company Logo"
              className="w-[200px] pt-8 h-12 w-auto"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ORE Ticketing Systems
            </span>
          </div>
        </div>

        <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign in
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}