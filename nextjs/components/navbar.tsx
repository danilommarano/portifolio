import React from "react";

export default function Navbar(props: { children: React.ReactNode }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-20 text-gray-600 body-font bg-background border-b ">
            <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
                {props.children}
            </div>
        </header>
    );
}
