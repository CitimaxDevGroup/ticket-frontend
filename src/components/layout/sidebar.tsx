import React from 'react';
import { Link } from 'react-router-dom';
import orelogo from '../images/ore-logo-removebg.png';
import { Ticket, CreditCard, LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
    return (
        <nav className="bg-[#6491ba] h-screen fixed top-0 left-0 min-w-[50px] py-6 px-4">
            <div className="relative">
                <a href="#">
                    <img src={orelogo} alt="logo" className="w-[200px]" />
                </a>
            </div>

            <div className="overflow-auto py-6 h-full mt-4 ">
                <ul className="space-y-2">
                    {[
                        {
                            label: "Submit Support Ticket",
                            icon: <Ticket className="w-[18px] h-[18px] mr-3 text-white" />,
                            path: "/",
                        },
                        {
                            label: "Request Company I.D.",
                            icon: <CreditCard className="w-[18px] h-[18px] mr-3 text-white" />,
                            path: "/ID",
                        },
                        {
                            label: "Logout",
                            icon: <LogOut className="w-[18px] h-[18px] mr-2 text-white" />,
                            path: "/",
                        },
                    ].map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className="text-white font-medium hover:text-white hover:bg-[#5279a0] text-[15px] flex items-center rounded px-4 py-2 transition-all"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;