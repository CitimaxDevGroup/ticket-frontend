import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import companies from "./images/companies.jpg";
import Sidebar from "./layout/sidebar";
import { CheckCircle, AlertCircle } from "lucide-react";

const schema = z.object({
    name: z.string().min(1, "Please enter your name."),
    email: z.string().email("Enter a valid email address."),
    message: z.string().min(1, "Please enter your message."),
});

type FormData = z.infer<typeof schema>;

const MessageForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error">("success");

    const onSubmit = async (data: FormData) => {
        const formBody = new URLSearchParams();
        formBody.append("name", data.name);
        formBody.append("email", data.email);
        formBody.append("message", data.message);

        try {
            await fetch("https://script.google.com/macros/s/AKfycbziYXf2WXiBUKKmhkrMmRrWBgUaAAvG_gLoS7UaQ-50su_fnyOR9k7iSEpZZYDXbFfJSQ/exec", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formBody.toString(),
            });

            setSubmitStatus("success");
            setShowStatusModal(true);
            reset();
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
            setShowStatusModal(true);
        }
    };

    return (
        <section className="flex min-h-screen overflow-hidden">
            <Sidebar />
            <div
                className="wrapper image-wrapper bg-[center] md:bg-[15px_center] bg-image bg-overlay md:ml-[200px] min-h-screen flex-1 bg-no-repeat bg-cover relative z-0 bg-scroll before:content-[''] before:block before:absolute before:z-[1] before:w-full before:h-full before:left-0 before:top-0 before:bg-[rgba(30,34,40,.5)]"
                style={{
                    backgroundImage: `url(${companies})`,
                }}
            >
                {showStatusModal && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                            {submitStatus === "success" ? (
                                <>
                                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                    <h2 className="text-lg font-bold mb-2">Success</h2>
                                    <p className="text-gray-700 mb-6">
                                        Your message was submitted successfully! We'll get back to you as soon as possible.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                    <h2 className="text-lg font-bold mb-2">Error</h2>
                                    <p className="text-gray-700 mb-6">
                                        There was a problem submitting your ticket. Please try again.
                                    </p>
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

                <div className="relative z-[2] container flex items-center justify-center py-8 md:py-16">
                    <div className="flex flex-wrap mx-[-15px]">
                        <div className="xl:w-9/12 w-full flex-[0_0_auto] !px-[15px] max-w-full !mx-auto">
                            <div className="card rounded-lg !bg-[rgba(255,255,255,.9)] opacity-900">
                                <div className="card-body xl:pt-16 xl:pb-8 xl:px-24 pt-10 pb-6 px-[40px] min-h-[550px]">
                                    <h2 className="text-center text-4xl font-bold mb-1">Get in Touch</h2>
                                    <p className="text-center mb-6">
                                        Have any questions? Reach out to us using the form below.
                                    </p>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <div className="flex flex-wrap mx-[-10px]">
                                            <div className="w-full md:w-1/2 px-[15px] mb-4">
                                                <input
                                                    type="text"
                                                    placeholder="Name *"
                                                    {...register("name")}
                                                    className={`form-control w-full p-3 rounded border ${touchedFields.name
                                                        ? errors.name
                                                            ? "border-red-500"
                                                            : "border-green-500"
                                                        : "border-gray-300"
                                                        }`}
                                                    aria-invalid={!!errors.name}
                                                />
                                                <div className="min-h-[1.25rem] mt-1">
                                                    {touchedFields.name && errors.name ? (
                                                        <p className="text-sm text-red-500">{errors.name.message}</p>
                                                    ) : touchedFields.name && !errors.name ? (
                                                        <p className="text-sm text-green-600">Looks good!</p>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 px-[15px] mb-4">
                                                <input
                                                    type="email"
                                                    placeholder="Email *"
                                                    {...register("email")}
                                                    className={`form-control w-full p-3 rounded border ${touchedFields.email
                                                        ? errors.email
                                                            ? "border-red-500"
                                                            : "border-green-500"
                                                        : "border-gray-300"
                                                        }`}
                                                    aria-invalid={!!errors.email}
                                                />
                                                {touchedFields.email && errors.email && (
                                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                                )}
                                                {touchedFields.email && !errors.email && (
                                                    <p className="text-sm text-green-600 mt-1">Looks good!</p>
                                                )}
                                            </div>

                                            <div className="w-full px-[15px] mb-2">
                                                <textarea
                                                    placeholder="Message *"
                                                    {...register("message")}
                                                    className={`form-control w-full p-3 h-36 rounded border ${touchedFields.message
                                                        ? errors.message
                                                            ? "border-red-500"
                                                            : "border-green-500"
                                                        : "border-gray-300"
                                                        }`}
                                                    aria-invalid={!!errors.message}
                                                />
                                                <p className="text-sm mt-1 min-h-[1.25rem]">
                                                    {touchedFields.message && errors.message && (
                                                        <span className="text-red-500">{errors.message.message}</span>
                                                    )}
                                                    {touchedFields.message && !errors.message && (
                                                        <span className="text-green-600">Looks good!</span>
                                                    )}
                                                </p>
                                            </div>

                                            <div className="w-full text-center px-[15px] mt-5 mb-0">
                                                <button
                                                    type="submit"
                                                    disabled={!isValid}
                                                    className={`btn btn-primary px-8 py-3 text-white font-medium rounded-full ${isValid
                                                        ? "bg-[#6491ba] hover:bg-[#345fbb]"
                                                        : "bg-[#6491ba] cursor-not-allowed"
                                                        }`}
                                                >
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MessageForm;