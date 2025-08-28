export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-12 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Regents Care collects personal information that you provide when using our appointment booking service, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Full name and date of birth</li>
                <li>Email address and phone number</li>
                <li>Insurance information (provider and policy number)</li>
                <li>Medical information related to your appointment request</li>
                <li>Consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use the information you provide to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Process your appointment booking requests</li>
                <li>Send booking confirmations and related communications</li>
                <li>Generate PDF documents for healthcare providers</li>
                <li>Maintain records of appointments and referrals</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Your personal information is shared with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>The healthcare provider you are booking with</li>
                <li>Our email service provider (Postmark) for sending communications</li>
                <li>Our database provider (Supabase) for secure data storage</li>
                <li>Authorized personnel within Regents Care for service provision</li>
              </ul>
              <p className="text-gray-700 mt-4 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure hosting and database management</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. GDPR Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                GDPR-compliant. Email delivered via Postmark (DKIM/SPF/DMARC configured). Data sent securely; removal on request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
                Appointment booking data is typically retained for 7 years to comply with healthcare record requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use essential cookies to ensure the proper functioning of our website. We do not use tracking cookies or analytics 
                that collect personal information without your explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@regentscare.com<br />
                  <strong>Address:</strong> Regents Care, [Your Address]<br />
                  <strong>Phone:</strong> [Your Phone Number]
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
