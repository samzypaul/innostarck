"use client";

import React from "react";
import {Globe, Mail, MapPin} from "lucide-react";
import {Logo} from "@/app/components/ui/Logo";
import Link from "next/link";
export function Footer() {
    return (
        <footer id="contact" className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 mb-16">

                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Logo className="h-10 w-10" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-2xl leading-tight text-inno">Inno<span className="text-teal-700">Starck</span></span>
                                <span className="font-medium text-sm leading-tight text-slate-500 tracking-wider">SYSTEMS</span>
                            </div>
                        </div>
                        <p className="text-lg mb-10 max-w-md leading-relaxed text-slate-300">
                            Precision-Driven. Human-Centered. Engineering the digital future for your enterprise.
                        </p>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <MapPin className="text-cyan-400" size={20} />
                                </div>
                                <span className="text-slate-300">Dar es Salaam, Tanzania</span>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <Globe className="text-cyan-400" size={20} />
                                </div>
                                <a href="https://www.innostarck.com" className="text-slate-300 hover:text-white transition-colors">www.innostarck.com</a>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <Mail className="text-cyan-400" size={20} />
                                </div>
                                <a href="mailto:info@innostarck.com" className="text-slate-300 hover:text-white transition-colors">info@innostarck.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
                        {/* Subtle glow effect in the form card */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

                        <h3 className="text-2xl font-extrabold text-white mb-6 relative z-10">Start a Conversation</h3>
                        <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-300">Name</label>
                                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                                <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-300">Message</label>
                                <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} InnoStarck. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="privacyPolicy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <a href="termsService" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

