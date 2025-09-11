'use client'

import { useState } from 'react'

export default function SeatsPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleStripeCheckout = async () => {
    setCheckoutLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success_url: `${window.location.origin}/billing/success`,
          cancel_url: `${window.location.origin}/billing/cancel`,
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout process')
    } finally {
      setCheckoutLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Seat Management</h1>
            <p className="text-gray-600 mb-4 text-sm lg:text-base">One-tap "Request appointment" from Google/Maps & your site. Booking-ready email + 1-page PDF to your inbox (patient CC'd). No portal. £149/month per consultant · 14-day pilot · We install it for you.</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Works without website changes (hosted link)</p>
              <p>• Captures insurer, policy & urgency → book on first reply</p>
              <p>• Keep TopDoctors; this is an additional Appointment link</p>
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-indigo-700">
                <strong>Book a 5-min install:</strong> <a href="mailto:info@regentscare.com" className="text-indigo-600 hover:text-indigo-700 font-medium">info@regentscare.com</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full lg:w-auto">
            {/* <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full lg:w-auto justify-center"
            >
              <Plus className="h-5 w-5" />
              Add New Seat
            </button> */}
            
            <button
              onClick={handleStripeCheckout}
              disabled={checkoutLoading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full lg:w-auto justify-center"
            >
              {checkoutLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Loading...
                </>
              ) : (
                <>
                  💳 Start paid plan (£149/m)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Add/Edit Form - REMOVED FROM PUBLIC PAGE */}
        {/* Admin functions moved to /admin/seats */}

        {/* Pricing and Contact Info */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">Contact us to set up your practice booking system</p>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-2">£149/month</p>
              <p className="text-gray-600 text-sm">per consultant • 14-day free trial</p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:info@regentscare.com"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📧 Book a 5-min install: info@regentscare.com
              </a>
              
              <p className="text-sm text-gray-500">
                We'll set everything up for you - no technical knowledge required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
