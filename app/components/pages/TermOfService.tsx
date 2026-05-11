export function TermsOfService() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
            <p className="text-slate-500 mb-10 border-b border-slate-200 pb-6">Effective Date: May 2, 2026</p>

            <div className="space-y-8 text-slate-700 leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                    <p>By accessing or using the digital platforms and web systems provided by Path 9 Systems, you agree to be bound by these Terms of Service. If you do not agree, you must immediately cease use of our services.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Services</h2>
                    <p>Path 9 Systems provides custom web systems, IoT integration, AI-driven automation, and predictive data analytics. Our services are tailored for complex business logic and require the client to provide accurate operational constraints during the architectural phase.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. System Resilience and Availability</h2>
                    <p>{"While we architect systems with a 'Mission-Critical' mindset for zero margin of error, Path 9 Systems does not guarantee absolute, uninterrupted uptime due to factors beyond our control, including global network outages or hardware degradation outside our immediate oversight."}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property Rights</h2>
                    <p>All systemic architectures, underlying codebases, proprietary algorithms, and designs produced by Path 9 Systems remain our exclusive intellectual property, unless specifically transferred via a separate legal software licensing agreement with the client.</p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Governing Law</h2>
                    <p>These terms shall be governed by and construed in accordance with the laws of Tanzania. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Dar es Salaam.</p>
                </section>
            </div>
        </div>
    );
}
