// app/ticketform.tsx

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, AlertCircle } from "lucide-react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormDescription, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  priority: z.string().nonempty({ message: "Please select a priority level" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  issueType: z.string().nonempty({ message: "Please select the issue type" }),
  company: z.string().nonempty({ message: "Company name is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface TicketFormProps {
  onSubmit?: (data: FormValues) => void;
}

const TicketForm = ({ onSubmit }: TicketFormProps = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [priorityLevel, setPriorityLevel] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      priority: "",
      description: "",
      issueType: "",
      company: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setProgress(0);
    setSubmitStatus("idle");

    try {
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i);
        await new Promise((r) => setTimeout(r, 100));
      }

      const ticketData = {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
        userId: auth.currentUser?.uid || null,
      };

      await addDoc(collection(db, "tickets"), ticketData);

      setSubmitStatus("success");
      setShowStatusModal(true);
      form.reset();
      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error("Firestore submission error:", error);
      setSubmitStatus("error");
      setShowStatusModal(true);
    } finally {
      setIsSubmitting(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        form.setValue("email", user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full max-w-2xl p-0 bg-background border-0 shadow-none">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit a Support Ticket</h2>

      {showStatusModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            {submitStatus === "success" ? (
              <>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-lg font-bold mb-2">Success</h2>
                <p className="text-gray-700 mb-6">Your ticket was submitted successfully! We'll get back to you as soon as possible.</p>
              </>
            ) : (
              <>
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-lg font-bold mb-2">Error</h2>
                <p className="text-gray-700 mb-6">There was a problem submitting your ticket. Please try again.</p>
              </>
            )}
            <button
              onClick={() => setShowStatusModal(false)}
              className="mt-2 px-6 py-2 bg-[#6491ba] text-white rounded hover:bg-[#4f7aa0]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input placeholder="Please input your name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" readOnly className="bg-gray-100 cursor-not-allowed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Please select your company name" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CITIMAX">Citimax Group Inc.</SelectItem>
                  <SelectItem value="DND ORE">Dean and Deluca Ore</SelectItem>
                  <SelectItem value="DND ETON">Dean and Deluca Eton</SelectItem>
                  <SelectItem value="DND Rallos">Dean and Deluca Scout Rallos</SelectItem>
                  <SelectItem value="DND Vertis">Dean and Deluca Vertis North</SelectItem>
                  <SelectItem value="DND Cebu">Dean and Deluca Cebu</SelectItem>
                  <SelectItem value="DND Tanay">Dean and Deluca Tanay</SelectItem>
                  <SelectItem value="DND Commissary">Dean and Deluca Commissary</SelectItem>
                  <SelectItem value="Monte">Monte De Tesoro</SelectItem>
                  <SelectItem value="Compounding">Lifecore Compounding</SelectItem>
                  <SelectItem value="Laboratory">Lifecore Laboratory</SelectItem>
                  <SelectItem value="Oriental">Oriental Energy</SelectItem>
                  <SelectItem value="Hardrock">Hardrock</SelectItem>
                  <SelectItem value="Alishan">Alishan</SelectItem>
                  <SelectItem value="Citinickel">Citinickel Mines</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="subject" render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl><Input placeholder="Please provide brief description of your issue" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="issueType" render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  setIsOtherSelected(value === "Other");
                  field.onChange(value === "Other" ? "" : value);
                }}
                value={isOtherSelected ? "Other" : field.value}
                defaultValue=""
              >
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Please select the issue type" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Desktop">Desktop</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="Printer">Printer</SelectItem>
                  <SelectItem value="Wi-fi">Internet Connection</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {isOtherSelected && (
                <div className="mt-3">
                  <Input placeholder="Please specify the issue type" value={field.value} onChange={field.onChange} />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Please provide detailed information about your issue" className="min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="priority" render={({ field }) => {
            const currentValue = field.value;
            return (
              <FormItem>
                <FormLabel>Priority Level</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  onOpenChange={(open) => {
                    if (!open && currentValue) {
                      setPriorityLevel(currentValue);
                      setShowPriorityModal(true);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select priority level" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the priority level that best describes your issue.</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }} />

          {showPriorityModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-bold text-center mb-4 text-[#6491ba]">
                  Priority Level: {priorityLevel.charAt(0).toUpperCase() + priorityLevel.slice(1)}
                </h3>
                <p className="text-gray-700 text-center mb-6">
                  {{
                    low: "Low priority tickets will be resolved within 7 days.",
                    medium: "Medium priority tickets will be resolved within 3–5 days.",
                    high: "High priority tickets will be resolved within 1 day.",
                    critical: "Critical issues will be addressed as soon as possible (ASAP).",
                  }[priorityLevel]}
                </p>
                <div className="flex justify-center">
                  <button
                    className="px-6 py-2 bg-[#6491ba] text-white rounded hover:bg-[#4f7aa0] transition"
                    onClick={() => setShowPriorityModal(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSubmitting && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Submitting ticket...</div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            type="submit"
            className="w-full text-white font-semibold py-2 px-4 rounded transition duration-300 hover:brightness-90"
            style={{ backgroundColor: "#6491ba" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
