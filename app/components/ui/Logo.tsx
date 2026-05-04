import Image from "next/image";
import React from "react";

export function Logo({ className = "h-10 w-10" }) {
    return (
        <Image
            src="/innostarck-logo.png"   // file should be in /public/logo.png
            alt="InnoStarck Logo"
            width={40}        // adjust dimensions to match your design
            height={40}
            className={className}
            priority          // ensures logo loads quickly
        />
    );
}
