'use client'

import { useState } from 'react'
import { Calendar, Mail, Phone, User, Shield, AlertTriangle, FileText, CheckCircle } from 'lucide-react'
import Toast from './Toast'

const BookingForm = ({ seatId, seatData }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: '',
    insurer: '',
    policy: '',
    selfPay: false,
    urgency: 'routine',
    summary: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          seat_id: seatId
        }),
      })

      if (response.ok) {
        setToast({
          show: true,
          message: seatId === 'demo' ? 'Thanks — we\'ll contact you within 2 hours. A confirmation has been emailed (you\'re CC\'d).' : 'Appointment request sent successfully! Check your email for confirmation.',
          type: 'success'
        })
        setFormData({
          name: '',
          dob: '',
          email: '',
          phone: '',
          insurer: '',
          policy: '',
          selfPay: false,
          urgency: 'routine',
          summary: '',
          consent: false
        })
      } else {
        setToast({
          show: true,
          message: 'Something went wrong. Please try again.',
          type: 'error'
        })
      }
    } catch (error) {
      setToast({
        show: true,
        message: 'Something went wrong. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {seatId === 'demo' ? 'Request appointment — Prof Demo Consultant (ENT · The London Clinic)' : 'Request Appointment'}
            </h1>
            {seatData && seatId !== 'demo' && (
              <p className="text-gray-600">
                {seatData.consultant_name} ({seatData.specialty} · {seatData.hospitals})
              </p>
            )}
          </div>

          {/* Toast Notification */}
          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.show}
            onClose={() => setToast({ ...toast, show: false })}
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                Insurance Information
              </h2>
              
              {/* Self Pay Option */}
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <input
                  type="checkbox"
                  name="selfPay"
                  checked={formData.selfPay}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      selfPay: e.target.checked,
                      insurer: e.target.checked ? 'Self-pay' : '',
                      policy: e.target.checked ? '' : prev.policy
                    }))
                  }}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">
                  <span className="font-semibold text-green-700">Self Pay</span> - I will be paying for this appointment myself
                </label>
              </div>

              {/* Insurance Provider Fields - Only show if not self-pay */}
              {!formData.selfPay && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Provider
                    </label>
                    <select
                      name="insurer"
                      value={formData.insurer}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select insurance provider</option>
                      <option value="Blue Cross">Blue Cross</option>
                      <option value="Aetna">Aetna</option>
                      <option value="Cigna">Cigna</option>
                      <option value="UnitedHealth">UnitedHealth</option>
                      <option value="Humana">Humana</option>
                      <option value="Kaiser Permanente">Kaiser Permanente</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      name="policy"
                      value={formData.policy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Policy number"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Appointment Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                Appointment Details
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="routine">Routine</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary of Symptoms/Reason for Visit *
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                  placeholder="Please describe your symptoms or reason for the appointment..."
                />
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">
                  I consent to Regents Care processing my personal information for appointment booking purposes. 
                  I understand that my information will be shared with the healthcare provider and used according to 
                  the <a href="/privacy" className="text-indigo-600 hover:underline font-medium">Privacy Policy</a>.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending Request...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Send Appointment Request
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
