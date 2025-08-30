export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Regents Care's appointment booking service, you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Regents Care provides an online appointment booking platform that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Facilitates appointment requests between patients and healthcare providers</li>
                <li>Generates PDF documents containing patient information</li>
                <li>Sends booking confirmations and communications via email</li>
                <li>Maintains secure records of appointments and referrals</li>
                <li>Provides administrative tools for healthcare providers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide accurate, complete, and up-to-date information</li>
                <li>Use the service only for legitimate healthcare appointment requests</li>
                <li>Not attempt to circumvent any security measures or access controls</li>
                <li>Respect the privacy and confidentiality of other users</li>
                <li>Comply with all applicable UK laws and regulations</li>
                <li>Not use the service for any unlawful or fraudulent purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Healthcare Provider Obligations</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Healthcare providers using our service must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Maintain appropriate professional licenses and credentials</li>
                <li>Comply with UK healthcare privacy regulations (GDPR, Data Protection Act 2018)</li>
                <li>Respond to appointment requests in a timely and professional manner</li>
                <li>Maintain the confidentiality and security of patient information</li>
                <li>Provide accurate and current practice information</li>
                <li>Comply with relevant healthcare standards and guidelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Your privacy is paramount. Our collection, use, and protection of personal data is governed by our Privacy Policy, which is incorporated into these Terms by reference and complies with UK GDPR and the Data Protection Act 2018.
              </p>
              <p className="text-gray-700 leading-relaxed">
                While we implement appropriate security measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but commit to maintaining industry-standard protections.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Availability and Limitations</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We strive to provide reliable service but cannot guarantee uninterrupted availability. The service is provided "as is" and "as available" without warranties of any kind.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Modify, suspend, or discontinue the service at any time</li>
                <li>Limit access to certain features or functionality</li>
                <li>Perform maintenance that may temporarily affect service availability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                To the maximum extent permitted by law, Regents Care shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>The quality, accuracy, or outcomes of healthcare services provided by healthcare providers</li>
                <li>Delays, cancellations, or rescheduling of appointments</li>
                <li>Communication issues between patients and healthcare providers</li>
                <li>Technical issues beyond our reasonable control</li>
                <li>Indirect, incidental, or consequential damages</li>
              </ul>
              <p className="text-gray-700 mt-4 leading-relaxed">
                Our total liability shall not exceed the amount paid by you for our services in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Medical Disclaimer</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Regents Care is not a healthcare provider and does not provide medical advice, diagnosis, or treatment. Our service is solely for facilitating appointment bookings and administrative processes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Always consult with qualified healthcare professionals for medical concerns. In case of emergency, contact emergency services immediately by calling 999.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Regents Care platform, including its design, content, functionality, and underlying technology, is protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may terminate or suspend your access to our service at any time, with or without cause, with reasonable notice where practicable.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the service will cease immediately. We may retain and process your data in accordance with our Privacy Policy and legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or the use of our service shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of the service after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                For questions about these Terms of Service:
              </p>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@regentscare.com<br />
                  <strong>Address:</strong> Regents Care, [Your UK Address]<br />
                  <strong>Phone:</strong> [Your UK Phone Number]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

