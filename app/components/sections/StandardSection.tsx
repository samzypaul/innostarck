import React from "react";
import Link from "next/link";
import { Activity, ArrowRight, Shield, Users } from "lucide-react";

export function StandardSection() {
    return (
        <section id="standard" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 tracking-tight">InnoStarck Standard:<br/><span className="text-cyan-400">Engineering Rigor</span></h2>
                        <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                            Our approach is rooted in the rigorous standards of Biomedical Engineering. In a field where precision is a matter of life and death, we learned that the most resilient systems are those built with zero margin for error.
                        </p>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            We bring this <strong className="text-white">Mission-Critical</strong> mindset to every project—whether we are architecting a corporate website or a nationwide logistics tracker.
                        </p>
                        <Link href="#founder" className="text-cyan-400 font-semibold flex items-center gap-2 hover:text-cyan-300 transition-colors group">
                            Read the Founders Statement <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {[
                            { icon: Activity, title: "Architectural Resilience", desc: "Systems specifically designed to handle rapid growth and immense pressure without faltering." },
                            { icon: Shield, title: "Security-First Logic", desc: "Protecting your data from the ground up with military and engineering-grade protocols." },
                            { icon: Users, title: "User-Centric Design", desc: "Translating complex technological capabilities into highly intuitive interfaces for human use." }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl flex gap-5 hover:bg-slate-800 transition-colors backdrop-blur-sm">
                                <div className="mt-1">
                                    <item.icon className="text-cyan-400 flex-shrink-0" size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

