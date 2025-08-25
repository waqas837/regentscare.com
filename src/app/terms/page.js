export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-12 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Regents Care's appointment booking service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Regents Care provides an online appointment booking platform that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Facilitates appointment requests between patients and healthcare providers</li>
                <li>Generates PDF documents containing patient information</li>
                <li>Sends booking confirmations via email</li>
                <li>Maintains records of appointments and referrals</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Use the service only for legitimate healthcare appointments</li>
                <li>Not attempt to circumvent any security measures</li>
                <li>Respect the privacy and confidentiality of other users</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Healthcare Provider Responsibilities</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Healthcare providers using our service must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Maintain appropriate licenses and credentials</li>
                <li>Comply with healthcare privacy regulations (HIPAA, etc.)</li>
                <li>Respond to appointment requests in a timely manner</li>
                <li>Maintain the confidentiality of patient information</li>
                <li>Provide accurate practice information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
                which is incorporated into these Terms of Service by reference.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your data, but no method of transmission over the internet 
                is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Regents Care provides this service "as is" and makes no warranties about the accuracy, reliability, or availability of the service.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>The quality of healthcare services provided by healthcare providers</li>
                <li>Delays or cancellations of appointments</li>
                <li>Communication issues between patients and providers</li>
                <li>Technical issues beyond our reasonable control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Medical Disclaimer</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Regents Care is not a healthcare provider and does not provide medical advice, diagnosis, or treatment. 
                Our service is solely for facilitating appointment bookings.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Always consult with qualified healthcare professionals for medical concerns. In case of emergency, 
                contact emergency services immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Regents Care platform, including its design, content, and functionality, is protected by intellectual property laws. 
                You may not copy, modify, distribute, or create derivative works without our express written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may terminate or suspend your access to our service at any time, with or without cause, with or without notice.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the service will cease immediately, and we may delete your account and data 
                in accordance with our data retention policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of significant changes by posting 
                the new Terms of Service on this page and updating the "Last updated" date. Your continued use of the service 
                after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@regentscare.com<br />
                  <strong>Address:</strong> Regents Care, [Your Address]<br />
                  <strong>Phone:</strong> [Your Phone Number]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
