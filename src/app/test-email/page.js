'use client'

import { useState } from 'react'
import { Mail, CheckCircle, XCircle } from 'lucide-react'

export default function TestEmailPage() {
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState(null)

  const sendTestEmail = async () => {
    setIsSending(true)
    setResult(null)

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seat_id: 'demo-doctor',
          name: 'Test Patient',
          dob: '1990-01-01',
          email: 'waqaskhanbughlani1124@gmail.com',
          phone: '1234567890',
          insurer: 'Self-pay',
          policy: '',
          urgency: 'routine',
          summary: 'This is a test email to verify deliverability. Simple content to avoid spam filters.',
          consent: true
        }),
      })

      if (response.ok) {
        setResult({
          success: true,
          message: 'Test email sent successfully! Check your email (waqaskhanbughlani1124@gmail.com) - check both inbox and spam folder.'
        })
      } else {
        const errorData = await response.json()
        setResult({
          success: false,
          message: `Failed to send email: ${errorData.error || 'Unknown error'}`
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error.message}`
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Delivery Test</h1>
            <p className="text-gray-600">Test simple email delivery to avoid spam filters</p>
          </div>

          {/* Test Details */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Configuration</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>From:</strong> referrals@regentscare.com</p>
              <p><strong>To:</strong> info@regentscare.com (practice)</p>
              <p><strong>CC:</strong> waqaskhanbughlani1124@gmail.com (you)</p>
              <p><strong>Subject:</strong> Simple test email</p>
              <p><strong>Content:</strong> Minimal text to avoid spam triggers</p>
            </div>
          </div>

          {/* Test Button */}
          <div className="text-center mb-8">
            <button
              onClick={sendTestEmail}
              disabled={isSending}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none mx-auto"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending Test Email...
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Send Test Email
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className={`rounded-xl p-6 border ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {result.success ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <h3 className={`font-semibold ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? 'Test Email Sent!' : 'Test Failed'}
                </h3>
              </div>
              <p className={`text-sm ${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message}
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">What to Check:</h3>
            <div className="space-y-2 text-sm text-yellow-700">
              <p>1. Check your email: <strong>waqaskhanbughlani1124@gmail.com</strong></p>
              <p>2. Look in <strong>inbox</strong> first</p>
              <p>3. Check <strong>spam/junk</strong> folder</p>
              <p>4. If in spam → mark as "Not Junk" and move to inbox</p>
              <p>5. Add <strong>referrals@regentscare.com</strong> to contacts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
