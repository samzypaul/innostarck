'use client'
import React, {useEffect, useState} from "react";
import {Menu, X} from "lucide-react";
import {useActiveSection} from "@/app/hooks/useActiveSection";
import {Logo} from "@/app/components/ui/Logo";

export function Navbar({ activeSection }:{ activeSection: string}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'Services', id: 'services' },
        { name: 'The Standard', id: 'standard' },
        { name: 'Leadership', id: 'founder' },
        { name: 'Contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-inno backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Brand / Logo */}
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${!isScrolled && activeSection === 'home' ? 'bg-white/10' : 'bg-transparent'}`}>
                            <Logo className="h-10 w-10" />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-bold text-xl leading-tight ${isScrolled || activeSection !== 'home' ? 'text-slate-900' : 'text-[#f6f3ec]'}`}>Inno<span className="text-teal-700">Starck</span></span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            const isDarkHero = !isScrolled && activeSection === 'home';
                            return (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className={`text-sm font-semibold transition-all duration-300 py-2 relative group ${
                                        isDarkHero ? 'text-slate-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    {link.name}
                                    {/* Underline indicator */}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-teal-300 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex">
                        <a href="#contact" className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300">
                            Partner with Us
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`focus:outline-none ${!isScrolled && activeSection === 'home' ? 'text-white' : 'text-slate-900'}`}>
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-xl border-t border-slate-100 absolute w-full top-full">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-3 rounded-md text-base font-medium ${
                                    activeSection === link.id
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

