"use client"

import { useAuth } from "@/Context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const router = useRouter();

    return (
        <div>
            {
                isLoggedIn && user ? (
                    <div className="p-5 mb-28 md:mb-0">{children}</div>
                ) : (
                    router.replace("/sign-in")
                )
            }

        </div>
    );
};

export default DashboardLayout;