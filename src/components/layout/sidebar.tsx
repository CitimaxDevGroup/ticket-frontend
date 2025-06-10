import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import orelogo from '../images/ore-logo-removebg.png';
import { Ticket, CreditCard, LogOut, Menu, X, Send } from "lucide-react";

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        {
            label: "Submit Support Ticket",
            icon: <Ticket className="w-[18px] h-[18px] mr-3 text-white" />,
            path: "/ticketing",
        },
        {
            label: "Request Company I.D.",
            icon: <CreditCard className="w-[18px] h-[18px] mr-3 text-white" />,
            path: "/ID",
            // path: "/PageInProgress",
        },
        {
            label: "Message Us",
            icon: <Send className="w-[18px] h-[18px] mr-2 text-white" />,
            path: "/Contact",
            // path: "/PageInProgress",
        },
        {
            label: "Logout",
            icon: <LogOut className="w-[18px] h-[18px] mr-2 text-white" />,
            path: "/PageInProgress",
        },
    ];

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 bg-[#6491ba]/60 hover:bg-[#6491ba] text-white p-2 rounded-md transition-opacity duration-300"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <nav
                className={`
        bg-[#6491ba] h-screen fixed top-0 left-0 w-[250px] py-6 px-4 z-40
        ${isOpen ? "block" : "hidden"} 
        md:block
        pt-10 md:pt-0
    `}
            >
                <div className="relative">
                    <a href="/">
                        <img src={orelogo} alt="logo" className="w-[200px] pt-8" />
                    </a>
                </div>

                <div className="overflow-auto py-6 h-full">
                    <ul className="space-y-2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className="text-white font-medium hover:text-white hover:bg-[#5279a0] text-[15px] flex items-center rounded px-4 py-2 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;