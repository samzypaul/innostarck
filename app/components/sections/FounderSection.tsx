import React from "react";

export function FounderSection() {
    return (
        <section id="founder" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-slate-50 rounded-[2.5rem] shadow-sm border border-slate-200 p-8 lg:p-16 mb-20 relative overflow-hidden">
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-100 to-transparent rounded-tr-full opacity-60"></div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <svg className="w-12 h-12 text-teal-500 mx-auto mb-8 opacity-40" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"/>
                        </svg>
                        <p className="text-2xl lg:text-3xl text-slate-800 font-medium leading-relaxed mb-10">
                            {"At InnoStarck, we believe that technology should be as resilient as the people it serves. My foundation in Biomedical Engineering taught me that excellence is not an accident; it is the result of disciplined architecture and a commitment to precision. We don't just build tools; we build the systemic intelligence that allows businesses to thrive."}
                        </p>
                        <div className="font-extrabold text-xl text-slate-900">Samuel Paul Mbano</div>
                        <div className="text-teal-600 font-semibold mt-1 tracking-wide text-sm uppercase">Managing Director</div>
                    </div>
                </div>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Why Partner with Us?</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { num: "01", title: "Systemic Thinking", desc: "We don't look at a website in isolation; we look at how it deeply integrates with your entire business ecosystem." },
                        { num: "02", title: "Hardware-Software Synergy", desc: "One of the few firms capable of reliably connecting physical operations directly to real-time digital dashboards." },
                        { num: "03", title: "Local Context, Global Standards", desc: "Based in Dar es Salaam, we build robust solutions for local infrastructure while meeting global performance benchmarks." }
                    ].map((item, i) => (
                        <div key={i} className="p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                            <div className="text-5xl font-black text-slate-100 mb-4">{item.num}</div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

