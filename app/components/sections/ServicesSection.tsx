'use client'

import {Activity, ArrowRight, Bot, Cpu, LineChart, Server, Shield, Users} from "lucide-react";
import React from "react";

export function ServicesSection() {
    const services = [
        {
            icon: <Server className="text-teal-600" size={32} />,
            title: "High-Performance Web Systems",
            desc: "We design and develop bespoke web architectures tailored for complex business logic. Engineered for high-concurrency, security, and long-term scalability."
        },
        {
            icon: <Cpu className="text-teal-600" size={32} />,
            title: "Intelligent IoT & Hardware",
            desc: "We engineer the 'nervous system' of your business. Integrating physical hardware with digital platforms for real-time data collection and remote monitoring."
        },
        {
            icon: <Bot className="text-teal-600" size={32} />,
            title: "AI & Workflow Automation",
            desc: "The 'brain' for your operations. Intelligent automation systems that streamline repetitive tasks, eliminate human error, and transform manual workflows."
        },
        {
            icon: <LineChart className="text-teal-600" size={32} />,
            title: "Strategic Data Analytics",
            desc: "Turn raw data into a strategic asset. Advanced modeling and predictive analysis to identify growth opportunities before they arise."
        }
    ];

    return (
        <section id="services" className="py-24 bg-slate-50 relative">
            {/* Abstract decorative element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-extrabold text-teal-900 mb-6">Core Service Pillars</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-teal-600 to-cyan-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-slate-600">
                        Unlike standard web agencies, our solutions serve as the central, high-performance hub of your digital operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white border border-slate-200/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                                {React.cloneElement(service.icon, { className: 'text-teal-600 group-hover:text-white transition-colors duration-300' })}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

