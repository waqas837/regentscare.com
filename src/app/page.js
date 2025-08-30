import Link from 'next/link'
import { Calendar, Mail, Shield, Users, ArrowRight, CheckCircle, Star, Clock, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">Trusted by Healthcare Providers</span>
            </div>
            <img src="/logo.png" alt="Regents Care" className="h-20 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Google/Maps clicks into
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> booking-ready emails</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              £149/month per consultant · Free 14-day pilot · No per-lead fees · No new portal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="mailto:info@regentscare.com" 
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start free pilot
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                href="/c/demo" 
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 transform hover:-translate-y-1"
              >
                See live demo
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Install Contact */}
      <section className="py-8 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-gray-700">
            <strong>Book a 5-min install:</strong> <a href="mailto:info@regentscare.com" className="text-indigo-600 hover:text-indigo-700 font-medium">info@regentscare.com</a>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Secure, and
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Efficient</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes appointment booking effortless for both patients and healthcare providers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">1. Patient Clicks Link</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Patients click your unique booking link from Google, Maps, website, or social media bios.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">2. Form Submission</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Patients fill out a simple, professional form with their information and appointment details.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">3. Instant Email</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                A booking-ready email with PDF attachment is sent to your practice inbox with the patient CC'd.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="h-4 w-4" />
              Why Choose Regents Care?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Healthcare Providers Who
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Value Efficiency</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Skip the complexity of traditional booking systems and focus on what matters most - your patients.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                No Complex Portals
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Skip the hassle of patient portals and complex booking systems. 
                Our solution works with your existing email workflow.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant booking-ready emails</h4>
                    <p className="text-gray-600 text-sm">No waiting, no delays</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional PDF attachments</h4>
                    <p className="text-gray-600 text-sm">Ready for your records</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Patient automatically CC'd</h4>
                    <p className="text-gray-600 text-sm">Keep everyone informed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">GDPR-compliant data handling</h4>
                    <p className="text-gray-600 text-sm">Security you can trust</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Perfect For:</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Private medical practices</h5>
                    <p className="text-gray-600 text-sm">Streamline your workflow</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Specialist clinics</h5>
                    <p className="text-gray-600 text-sm">Focus on patient care</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Dental offices</h5>
                    <p className="text-gray-600 text-sm">Simplify scheduling</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Therapy practices</h5>
                    <p className="text-gray-600 text-sm">Professional booking</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Any healthcare provider</h5>
                    <p className="text-gray-600 text-sm">Universal solution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-indigo-100">Healthcare Providers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-indigo-100">Appointments Booked</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-indigo-100">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Streamline Your
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Booking Process?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get started with Regents Care today and transform how patients book appointments with your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/c/demo-doctor" 
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Try the Demo
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/seats" 
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Set Up Your Practice
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <img src="/logo.png" alt="Regents Care" className="h-10 brightness-0 invert" />
              <span className="text-gray-400">© 2024 Regents Care. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}