import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | [INSERT NAME]',
  description: 'Read our Terms of Service regarding your use of [INSERT NAME].',
};

export default function TermsPage() {
  const lastUpdated = "[INSERT DATE]"; // Replace with dynamic date or static string

  return (
    <main className="min-h-screen bg-gray-50 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-sm rounded-4xl">
        {/* Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-sm text-gray-500 mt-2">Last Updated: {lastUpdated}</p>
        </div>

        {/* Disclaimer Content */}
        <div className="prose prose-slate max-w-none text-gray-700">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-700 italic">
              <strong>Disclaimer:</strong> The content provided below is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney to review these documents.
            </p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Introduction</h2>
          <p className="mb-4">
            Welcome to <strong>[INSERT NAME]</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; &quot;us&quot;). By accessing or using our website located at <strong>[INSERT URL]</strong> (the &quot;Site&quot;) and using our services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
          </p>
          <p className="mb-4">
            If you disagree with any part of these terms, you may not access the Service.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Eligibility</h2>
          <p className="mb-4">
            By using our Services, you represent and warrant that you are at least <strong>[INSERT AGE]</strong> years old and have the legal capacity to enter into a binding contract.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Accounts and Registration</h2>
          <p className="mb-4">
            To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Acceptable Use Policy</h2>
          <p className="mb-2">You agree not to use the Service for any unlawful purpose. You further agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Harass, abuse, or threaten others.</li>
            <li>Violate any intellectual property rights of the Company or any third party.</li>
            <li>Upload or disseminate computer viruses or other harmful software.</li>
            <li>Perpetrate any fraud.</li>
            <li>Engage in unlawful gambling, sweepstakes, or pyramid schemes.</li>
            <li>Publish or distribute obscene or defamatory material.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Intellectual Property</h2>
          <p className="mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property of <strong>[INSERT NAME]</strong> and its licensors. Our trademarks may not be used in connection with any product or service without the prior written consent of <strong>[INSERT NAME]</strong>.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Third-Party Links and Services</h2>
          <p className="mb-4">
            Our Service may contain links to third-party websites or services (such as <strong>[INSERT THIRD PARTIES]</strong>) that are not owned or controlled by <strong>[INSERT NAME]</strong>. We assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation a breach of the Terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall <strong>[INSERT NAME]</strong>, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws of <strong>[INSERT COUNTRY/STATE]</strong>, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at: <br />
            <a href="mailto:[INSERT EMAIL]" className="text-blue-600 hover:underline font-medium">[INSERT EMAIL]</a>
          </p>
        </div>
      </div>
    </main>
  );
}