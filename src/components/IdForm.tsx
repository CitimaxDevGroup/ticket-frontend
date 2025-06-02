import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "./layout/sidebar";
import { Controller } from "react-hook-form";

const step1Schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    address: z.string().min(1, "Address is required"),
    position: z.string().min(1, "Job Position is required"),
    cname: z.string().min(1, "Company Name is required"),
    company: z.string().min(1, "Company ID Number is required"),
    photo: z
        .custom<File>((file) => file instanceof File, {
            message: "Photo is required",
        }),
    esign: z
        .custom<File>((file) => file instanceof File, {
            message: "E-signature is required",
        }),
});

const step2Schema = z.object({
    sss: z.string().min(1, "SSS Number is required"),
    tin: z.string().min(1, "TIN Number is required"),
    philhealt: z.string().min(1, "PhilHealth Number is required"),
    pagibig: z.string().min(1, "Pag-IBIG Number is required"),
});

const step3Schema = z.object({
    emergency: z.string().min(1, "Emergency Contact Name is required"),
    emergencynum: z.string().min(1, "Emergency Contact Number is required"),
});

const schemaByStep = [step1Schema, step2Schema, step3Schema];

const blueColor = "#6491ba";
const blueColorLight = "#d1e2f0";

export default function MultiStepForm() {
    const [step, setStep] = useState(0);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: zodResolver(schemaByStep[step]),
        mode: "onTouched",
        defaultValues: {
            fullName: "",
            address: "",
            position: "",
            cname: "",
            company: "",
            photo: null,
            esign: null,
            sss: "",
            tin: "",
            philhealt: "",
            pagibig: "",
            emergency: "",
            emergencynum: "",
        },
    });

    const onNext = async () => {
        const valid = await trigger();
        if (valid) {
            setStep((s) => s + 1);
        }
    };

    const onPrev = () => setStep((s) => s - 1);

    const onSubmit = (data) => {
        alert("Form submitted successfully!\n" + JSON.stringify(data, null, 2));
    };

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-4 md:p-10 md:ml-[250px]">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-3xl mx-auto w-full">
                    <h1 className="text-3xl font-bold text-center mb-8">Employee Information Form</h1>
                    <div className="mb-8">
                        <div className="flex justify-between mb-2 text-center">
                            {["Employee Information", "Government-issued IDs", "Emergency Contact"].map((label, i) => (
                                <span
                                    key={i}
                                    className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black`}
                                    style={{
                                        backgroundColor: blueColorLight,
                                        opacity: i > step ? 0.5 : 1,
                                    }}
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded" style={{ backgroundColor: blueColorLight }}>
                            <div
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-in-out"
                                style={{ width: `${((step + 1) / 3) * 100}%`, backgroundColor: blueColor }}
                            ></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {step === 0 && (
                            <>
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
                                <Controller
                                    name="photo"
                                    control={control}
                                    render={({ field }) => (
                                        <InputFile
                                            label="Photo Upload"
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
                                            label="E-Signature Upload"
                                            id="esign"
                                            field={field}
                                            error={errors.esign?.message}
                                        />
                                    )}
                                />
                            </>
                        )}

                        {step === 1 && (
                            <>
                                <InputField label="SSS Number" id="sss" register={register} error={errors.sss?.message} focusColor={blueColor} />
                                <InputField label="TIN Number" id="tin" register={register} error={errors.tin?.message} focusColor={blueColor} />
                                <InputField
                                    label="PhilHealth Number"
                                    id="philhealt"
                                    register={register}
                                    error={errors.philhealt?.message}
                                    focusColor={blueColor}
                                />
                                <InputField
                                    label="Pag-IBIG Number"
                                    id="pagibig"
                                    register={register}
                                    error={errors.pagibig?.message}
                                    focusColor={blueColor}
                                />
                            </>
                        )}

                        {step === 2 && (
                            <>
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
                            </>
                        )}

                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={onPrev}
                                disabled={step === 0}
                                className={`px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline ${step === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                                    }`}
                            >
                                Previous
                            </button>

                            {step < 2 && (
                                <button
                                    type="button"
                                    onClick={onNext}
                                    className="px-4 py-2 text-white rounded-lg focus:outline-none focus:shadow-outline"
                                    style={{ backgroundColor: blueColor }}
                                    onMouseOver={e => (e.currentTarget.style.backgroundColor = "#507a9f")}
                                    onMouseOut={e => (e.currentTarget.style.backgroundColor = blueColor)}
                                >
                                    Next
                                </button>
                            )}

                            {step === 2 && (
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white rounded-lg focus:outline-none focus:shadow-outline"
                                    style={{ backgroundColor: blueColor }}
                                    onMouseOver={e => (e.currentTarget.style.backgroundColor = "#507a9f")}
                                    onMouseOut={e => (e.currentTarget.style.backgroundColor = blueColor)}
                                >
                                    Submit
                                </button>
                            )}
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
                style={{
                    outlineColor: focusColor,
                }}
                onFocus={e => {
                    e.target.style.borderColor = focusColor;
                    e.target.style.boxShadow = `0 0 0 3px ${focusColor}66`;
                }}
                onBlur={e => {
                    e.target.style.borderColor = error ? "#f87171" : "#d1d5db"; // red-500 or gray-300
                    e.target.style.boxShadow = "none";
                }}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
                    const file = e.target.files?.[0];
                    field.onChange(file);
                }}
                className={`block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border cursor-pointer focus:outline-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}