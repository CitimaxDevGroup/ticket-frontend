import React from "react";
import TicketFormPage from "./TicketFormPage";
import Sidebar from "./layout/sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-background lg:ml-[200px]">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Support Ticket Submission
            </h1>
            <p className="mt-3 text-md text-muted-foreground">
              Please fill out the form below to submit a support ticket. We'll
              get back to you as soon as possible.
            </p>
          </div>
          <TicketFormPage />
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Need immediate assistance? Contact us directly at{" "}
              <a
                href="mailto:it@citimax.ph"
                className="text-blue-600 hover:underline"
              >
                <i>it@citimax.ph</i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
