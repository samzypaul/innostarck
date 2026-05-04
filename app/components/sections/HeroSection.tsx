"use client"
import {Activity, ArrowRight, Bot, Cpu, LineChart, Server} from "lucide-react";
import React, {useState,useEffect} from "react";

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            subtitle: "Global Infrastructure",
            titleStart: "Precision for ",
            highlight: "Humanity.",
            titleEnd: "",
        },
        {
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
            subtitle: "Enterprise Security",
            titleStart: "Engineering-Grade ",
            highlight: "Resilience.",
            titleEnd: "",
        },
        {
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
            subtitle: "Intelligent Systems",
            titleStart: "Innovation for ",
            highlight: "Growth.",
            titleEnd: "",
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-slate-950">

            {/* Background Image Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={slide.image}
                        alt="Tech Background"
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            {/* Advanced Overlay Gradients for depth and readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40 z-10"></div>
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-20">
                <div className="max-w-3xl">

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-cyan-400 font-semibold text-sm mb-6 border border-blue-500/20 backdrop-blur-sm">
                        <Activity size={16} className="text-teal-500" /> Engineering-Led Technology Firm
                    </div>

                    <div className="min-h-[160px] lg:min-h-[200px]">
                        {slides.map((slide, index) => (
                            <h1
                                key={index}
                                className={`text-5xl lg:text-7xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 absolute top-0 left-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                                style={{ position: index === currentSlide ? 'relative' : 'absolute' }}
                            >
                                {slide.titleStart}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
                  {slide.highlight}
                </span>
                                {slide.titleEnd}
                            </h1>
                        ))}
                    </div>

                    <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                        We bridge the gap between complex engineering principles and scalable digital solutions.At InnoStarck we provideS the technical backbone for organizations requiring absolute reliability.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#services" className="inline-flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-lg hover:shadow-lg hover:shadow-blue-500/25">
                            Explore Our Solutions <ArrowRight size={20} />
                        </a>
                        <a href="#contact" className="inline-flex justify-center items-center gap-2 bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-lg backdrop-blur-sm">
                            Contact Our Engineers
                        </a>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide ? 'w-8 h-2 bg-cyan-400' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

