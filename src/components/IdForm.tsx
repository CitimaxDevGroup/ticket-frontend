import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "./layout/sidebar";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

const schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    position: z.string().min(1, "Job Position is required"),
    cname: z.string().min(1, "Company Name is required"),
    company: z.string().min(1, "Company ID Number is required"),
    photo: z.custom<File>((file) => file instanceof File, {
        message: "Photo is required",
    }),
    esign: z.custom<File>((file) => file instanceof File, {
        message: "E-signature is required",
    }),
    sss: z.string().min(1, "SSS Number is required"),
    tin: z.string().min(1, "TIN Number is required"),
    philhealth: z.string().min(1, "PhilHealth Number is required"),
    pagibig: z.string().min(1, "Pag-IBIG Number is required"),
    emergency: z.string().min(1, "Emergency Contact Name is required"),
    emergencynum: z.string().min(1, "Emergency Contact Number is required"),
});


const blueColor = "#6491ba";

export default function SingleForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        reset,
    } = useForm({ resolver: zodResolver(schema), mode: "onTouched" });

    const section1Fields = ["fullName", "address", "email", "position", "cname", "company", "photo", "esign"];
    const section1Completed = section1Fields.every((field) => {
        const value = watch(field);
        const hasError = errors[field];
        if (field === "photo" || field === "esign") {
            return value instanceof File && !hasError;
        }
        return value && !hasError;
    });

    const section2Fields = ["sss", "tin", "philhealth", "pagibig"];
    const section2Completed = section2Fields.every(
        (field) => !!watch(field) && !errors[field]
    );

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"success" | "error">("success");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const confirmSubmit = () => {
        setShowConfirmModal(false);
        handleSubmit(onSubmit)();
    };

    const handlePreSubmit = (e) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = (reader.result as string).split(",")[1];
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
        });

    const onSubmit = async (data) => {
        try {
            const photoBase64 = data.photo ? await toBase64(data.photo) : "";
            const esignBase64 = data.esign ? await toBase64(data.esign) : "";

            const payload = {
                ...data,
                photo: photoBase64,
                esign: esignBase64,
            };

            await fetch(
                "https://script.google.com/macros/s/AKfycbyGCcQkf4t5RupTvZu2bijI6dtY-ZwSdENxd3Euk715JOZ7EtGIESkcylVQ3qLGxZin9Q/exec",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "no-cors",
                    body: JSON.stringify(payload),
                }
            );

            setSubmitStatus("success");
            setShowStatusModal(true);
            reset();
        } catch (error) {
            console.error("Submission failed:", error);
            setSubmitStatus("error");
            setShowStatusModal(true);
        }
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-4 md:p-10 md:ml-[250px]">
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center relative">
                            <HelpCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />

                            <h2 className="text-xl font-bold mb-2" style={{ color: blueColor }}>
                                Please Confirm!
                            </h2>
                            <p className="text-gray-700 mb-6">
                                Please ensure all information is accurate and complete. If you're confident with your answers, kindly click <strong>Submit</strong> to continue.
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSubmit}
                                    className="px-6 py-2 rounded text-white transition"
                                    style={{ backgroundColor: blueColor }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#507a9f")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = blueColor)}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showStatusModal && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                            {submitStatus === "success" ? (
                                <>
                                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                    <h2 className="text-lg font-bold mb-2">Success</h2>
                                    <p className="text-gray-700 mb-6">
                                        Your submission was successful! We will process your request and provide your Company I.D. as soon as possible.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                    <h2 className="text-lg font-bold mb-2">Error</h2>
                                    <p className="text-gray-700 mb-6">
                                        There was a problem submitting your ticket. Please try
                                        again.
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

                <h1 className="text-3xl font-bold tracking-tight text-foreground text-center mb-2">
                    Employee Information Form
                </h1>
                <p className="text-center text-md text-muted-foreground mb-4 max-w-2xl mx-auto">
                    If you wish to request a Company I.D., kindly complete the form below. Please make sure all information provided is correct and up-to-date, as it will be used for processing your identification. Inaccurate or incomplete submissions may cause delays or be rejected.
                </p>

                <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto w-full">
                    <form onSubmit={handlePreSubmit} noValidate>
                        <h2
                            className="text-2xl font-semibold text-center mb-2"
                            style={{ color: blueColor }}
                        >
                            Basic Information
                        </h2>
                        <InputField
                            label="Full Name"
                            id="fullName"
                            register={register}
                            error={errors.fullName?.message}
                            focusColor={blueColor}
                        />
                        <InputField
                            label="Address"
                            id="address"
                            register={register}
                            error={errors.address?.message}
                            focusColor={blueColor}
                        />
                        <InputField
                            label="Email"
                            id="email"
                            register={register}
                            error={errors.email?.message}
                            focusColor={blueColor}
                        />
                        <InputField
                            label="Job Position"
                            id="position"
                            register={register}
                            error={errors.position?.message}
                            focusColor={blueColor}
                        />
                        <InputField
                            label="Company Name"
                            id="cname"
                            register={register}
                            error={errors.cname?.message}
                            focusColor={blueColor}
                        />
                        <InputField
                            label="Company ID Number"
                            id="company"
                            register={register}
                            error={errors.company?.message}
                            focusColor={blueColor}
                        />
                        <p className="text-sm text-gray-600 mb-1 text-center">
                            Please upload clear, visible, and understandable image files.
                        </p>
                        <Controller
                            name="photo"
                            control={control}
                            render={({ field }) => (
                                <InputFile
                                    label="Upload your ID Photo"
                                    id="photo"
                                    field={field}
                                    error={errors.photo?.message}
                                />
                            )}
                        />
                        <Controller
                            name="esign"
                            control={control}
                            render={({ field }) => (
                                <InputFile
                                    label="Upload your E-Signature"
                                    id="esign"
                                    field={field}
                                    error={errors.esign?.message}
                                />
                            )}
                        />

                        <h2
                            className="text-2xl font-semibold text-center mt-6 mb-0"
                            style={{ color: blueColor }}
                        >
                            Government-issued IDs
                        </h2>
                        {!section1Completed && (
                            <div className="flex items-center justify-center text-sm text-yellow-700 border-yellow-300 rounded-md mb-4">
                                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                                <span>Kindly complete Section 1 before proceeding to Section 2.</span>
                            </div>
                        )}
                        <fieldset className={section1Completed ? "" : "pointer-events-none opacity-50"}>
                            <InputField
                                label="SSS Number"
                                id="sss"
                                register={register}
                                error={errors.sss?.message}
                                focusColor={blueColor}
                            />
                            <InputField
                                label="TIN Number"
                                id="tin"
                                register={register}
                                error={errors.tin?.message}
                                focusColor={blueColor}
                            />
                            <InputField
                                label="PhilHealth Number"
                                id="philhealth"
                                register={register}
                                error={errors.philhealth?.message}
                                focusColor={blueColor}
                            />
                            <InputField
                                label="Pag-IBIG Number"
                                id="pagibig"
                                register={register}
                                error={errors.pagibig?.message}
                                focusColor={blueColor}
                            />
                        </fieldset>

                        <h2
                            className="text-2xl font-semibold text-center mt-3 mb-0"
                            style={{ color: blueColor }}
                        >
                            Emergency Contact
                        </h2>
                        {!section2Completed && (
                            <div className="flex items-center justify-center text-sm text-yellow-700 border-yellow-300 rounded-md mb-4">
                                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                                <span>Kindly complete Section 2 before proceeding to Section 3.</span>
                            </div>
                        )}
                        <fieldset className={section2Completed ? "" : "pointer-events-none opacity-50"}>
                            <InputField
                                label="Emergency Contact Name"
                                id="emergency"
                                register={register}
                                error={errors.emergency?.message}
                                focusColor={blueColor}
                            />
                            <InputField
                                label="Emergency Contact Number"
                                id="emergencynum"
                                register={register}
                                error={errors.emergencynum?.message}
                                focusColor={blueColor}
                            />
                        </fieldset>

                        <div className="mt-4 text-center">
                            <button
                                type="submit"
                                className="px-6 py-2 text-white rounded-lg"
                                style={{ backgroundColor: blueColor }}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#507a9f")}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = blueColor)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, id, register, error, focusColor }) {
    return (
        <div className="mb-6">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                type="text"
                id={id}
                {...register(id)}
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${error ? "border-red-500" : "border-gray-300"
                    }`}
                style={{ outlineColor: focusColor }}
                onFocus={(e) => {
                    e.target.style.borderColor = focusColor;
                    e.target.style.boxShadow = `0 0 0 3px ${focusColor}66`;
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = error ? "#f87171" : "#d1d5db";
                    e.target.style.boxShadow = "none";
                }}
            />
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>
    );
}

function InputFile({ label, id, field, error }) {
    return (
        <div className="mb-6">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                type="file"
                id={id}
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        field.onChange(e.target.files[0]);
                    } else {
                        field.onChange(null);
                    }
                }}
                className={`block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${error ? "border-red-500" : "border-gray-300"
                    } cursor-pointer focus:outline-none`}
            />
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>
    );
}