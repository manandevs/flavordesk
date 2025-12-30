import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | [INSERT NAME]',
  description: 'Understand how [INSERT NAME] collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  const lastUpdated = "[INSERT DATE]"; // Replace with dynamic date or static string

  return (
    <main className="min-h-screen bg-gray-50 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-sm rounded-4xl">
        {/* Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-2">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-gray-700">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-700 italic">
              <strong>Disclaimer:</strong> The content provided below is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney to review these documents.
            </p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Introduction</h2>
          <p className="mb-4">
            <strong>[INSERT NAME]</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website <strong>[INSERT URL]</strong> (the &quot;Service&quot;). We are committed to protecting your personal information and your right to privacy.
          </p>
          <p className="mb-4">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Information We Collect</h2>
          
          <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">A. Personal Data</h3>
          <p className="mb-2">While using our Service, we may ask you to provide us with certain personally identifiable information, including but not limited to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">B. Usage Data</h3>
          <p className="mb-4">
            We may also collect information on how the Service is accessed and used (&quot;Usage Data&quot;). This may include your computer&#39;s Internet Protocol address (e.g., IP address), browser type, browser version, and the pages of our Service that you visit.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. How We Use Your Information</h2>
          <p className="mb-2">We use the collected data for various purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>To provide and maintain the Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To provide customer care and support.</li>
            <li>To provide analysis or valuable information so that we can improve the Service.</li>
            <li>To monitor the usage of the Service.</li>
            <li>To detect, prevent, and address technical issues.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Sharing Your Data with Third Parties</h2>
          <p className="mb-4">
            We may employ third-party companies and individuals to facilitate our Service. These third parties have access to your Personal Data only to perform these tasks on our behalf. We use services such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Analytics:</strong> [e.g., Google Analytics]</li>
            <li><strong>Payment Processing:</strong> [e.g., Stripe]</li>
            <li><strong>Advertising:</strong> [e.g., Google Ads]</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Your Data Protection Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict the use of your personal data. To exercise these rights, please contact us at <strong>[INSERT EMAIL]</strong>.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Children&#39;s Privacy</h2>
          <p className="mb-4">
            Our Service does not address anyone under the age of <strong>[INSERT AGE]</strong>. We do not knowingly collect personally identifiable information from children.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>By email: <a href="mailto:[INSERT EMAIL]" className="text-blue-600 hover:underline">[INSERT EMAIL]</a></li>
            <li>By visiting this page on our website: <a href="#" className="text-blue-600 hover:underline">[INSERT CONTACT URL]</a></li>
          </ul>
        </div>
      </div>
    </main>
  );
}