// "use client";
//
// import { useState, useEffect } from 'react';
//
//
// export function useActiveSection({sectionIds}:{sectionIds: string[]}) {
//     const [activeSection, setActiveSection] = useState(sectionIds[0]);
//
//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY + 120;
//             let currentSection = sectionIds[0];
//
//             for (const id of sectionIds) {
//                 const element = document.getElementById(id);
//                 if (element && element.offsetTop <= scrollPosition) {
//                     currentSection = id;
//                 }
//             }
//             setActiveSection(currentSection);
//         };
//
//         window.addEventListener('scroll', handleScroll);
//         handleScroll();
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [sectionIds]);
//
//     return activeSection;
// }
//
"use client";

import { useState, useEffect } from "react";

export function useActiveSection(sectionIds: string[]): string {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition: number = window.scrollY + 120;
            let currentSection: string = sectionIds[0];

            for (const id of sectionIds) {
                const element: HTMLElement | null = document.getElementById(id);
                if (element && element.offsetTop <= scrollPosition) {
                    currentSection = id;
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionIds]);

    return activeSection;
}
