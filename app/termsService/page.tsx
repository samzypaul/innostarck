// 1. Import the actual content component you created and give it an alias
import {TermsOfService} from "@/app/components/pages/TermOfService";

// 2. Rename the page function slightly to avoid naming collisions
export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <TermsOfService />
            </div>
        </div>
    );
}