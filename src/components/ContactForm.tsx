import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import companies from "./images/companies.jpg";
import Sidebar from "./layout/sidebar";

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

    const onSubmit = (data: FormData) => {
        console.log("Submitted:", data);
        alert("Form submitted successfully!");
        reset();
    };

    return (
        <section className="flex min-h-screen overflow-hidden">
            <Sidebar />
            <div
                className="wrapper image-wrapper bg-image bg-overlay md:ml-[200px] flex-1 bg-no-repeat bg-cover relative z-0 bg-scroll before:content-[''] before:block before:absolute before:z-[1] before:w-full before:h-full before:left-0 before:top-0 before:bg-[rgba(30,34,40,.5)]"
                style={{
                    backgroundImage: `url(${companies})`,
                    backgroundPositionX: '15px',
                    backgroundPositionY: 'center',
                }}
            >
                <div className="relative z-[2] container min-h-screen flex items-center justify-center py-[5rem] xl:!py-[7rem]">
                    <div className="flex flex-wrap mx-[-15px]">
                        <div className="xl:w-9/12 w-full flex-[0_0_auto] !px-[15px] max-w-full !mx-auto">
                            <div className="card rounded-lg !bg-[rgba(255,255,255,.9)] opacity-900">
                                <div className="card-body xl:!py-16 xl:!px-24 p-[40px]">
                                    <h2 className="text-center text-xl font-bold mb-3">Get in Touch</h2>
                                    <p className="text-center mb-10">
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
                                                {touchedFields.name && errors.name && (
                                                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                                )}
                                                {touchedFields.name && !errors.name && (
                                                    <p className="text-sm text-green-600 mt-1">Looks good!</p>
                                                )}
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

                                            <div className="w-full px-[15px] mb-4">
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
                                                {touchedFields.message && errors.message && (
                                                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                                                )}
                                                {touchedFields.message && !errors.message && (
                                                    <p className="text-sm text-green-600 mt-1">Looks good!</p>
                                                )}
                                            </div>

                                            <div className="w-full text-center px-[15px]">
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