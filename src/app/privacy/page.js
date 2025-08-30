export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Regents Care ("we", "our", "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data Controller</h2>
              <p className="text-gray-700 leading-relaxed">
                For the purposes of UK GDPR, Regents Care is the data controller of your personal data. You can contact us at privacy@regentscare.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Personal Data We Collect</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We collect the following categories of personal data:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Identity Data:</strong> Full name, date of birth</li>
                <li><strong>Contact Data:</strong> Email address, phone number</li>
                <li><strong>Health Data:</strong> Medical information related to appointment requests</li>
                <li><strong>Insurance Data:</strong> Insurance provider and policy details</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We process your personal data under the following legal bases:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Consent:</strong> When you explicitly consent to data processing</li>
                <li><strong>Contract:</strong> To fulfil our service obligations</li>
                <li><strong>Legitimate Interest:</strong> To provide and improve our services</li>
                <li><strong>Legal Obligation:</strong> To comply with healthcare regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. How We Use Your Data</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use your personal data to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Process and manage appointment booking requests</li>
                <li>Generate PDF documents for healthcare providers</li>
                <li>Send booking confirmations and communications</li>
                <li>Maintain accurate records of appointments</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing and Transfers</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may share your personal data with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Healthcare Providers:</strong> To facilitate your appointment booking</li>
                <li><strong>Service Providers:</strong> Postmark (email delivery), Supabase (data storage)</li>
                <li><strong>Legal Authorities:</strong> When required by law or regulation</li>
              </ul>
              <p className="text-gray-700 mt-4 leading-relaxed">
                We do not sell, trade, or rent your personal data to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We implement appropriate technical and organisational measures to protect your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure hosting with industry-standard security</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Staff training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights Under UK GDPR</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, or reporting requirements. Healthcare appointment data is typically retained for 7 years to comply with healthcare record requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your personal data may be transferred to and processed in countries outside the UK. We ensure appropriate safeguards are in place, including adequacy decisions, standard contractual clauses, or other approved transfer mechanisms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use essential cookies to ensure the proper functioning of our website. We do not use tracking cookies or analytics that collect personal information without your explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Complaints</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have concerns about how we handle your personal data, you have the right to make a complaint to the Information Commissioner's Office (ICO) at ico.org.uk or by calling 0303 123 1113.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                To exercise your rights or for any privacy-related questions:
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@regentscare.com<br />
                  <strong>Address:</strong> Regents Care, [Your UK Address]<br />
                  <strong>Phone:</strong> [Your UK Phone Number]
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
