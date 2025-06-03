import React from "react";
import { Loader2 } from "lucide-react";
import Sidebar from "./layout/sidebar";

const PageInProgress: React.FC = () => {
  return (
    <div
      className="min-h-screen md:ml-[200px] text-blue-900 p-4 relative"
      style={{
        backgroundImage:
          "url('https://cdn.dribbble.com/userupload/22866416/file/original-79954486027de6600487dfbc4eb0f7a1.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar />
      <div className="flex justify-center pt-12">
        <div className="bg-white/80 p-6 rounded-xl shadow-lg flex flex-col items-center w-full max-w-lg mx-auto">
          <div className="flex items-center space-x-4">
            <Loader2 className="animate-spin h-8 w-8 text-[#527ba0]" />
            <h1 className="text-2xl font-semibold text-[#527ba0]">Page in Progress</h1>
          </div>
          <p className="mt-4 text-center text-black">
            We’re currently working on this page to make it even better for you.
            Please check back soon. Thanks for your patience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageInProgress;
