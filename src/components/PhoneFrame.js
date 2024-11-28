// iPhoneFrame.js
import React from "react";

export default function PhoneFrame({ children }) {
    return (
        <div className="iphone-frame bg-black rounded-3xl border-[1px] ml-10 pb-4 mt-16 border-white mb-8 fixed w-[300px] h-[580px] shadow-lg overflow-hidden z-50">
            {/* Status Bar */}
            {/* Camera Cutout */}
           
            {/* Content */}
            <div className="iphone-content overflow-y-auto h-full pt-[4rem]">
                {children}
            </div>
        </div>
    );
}
