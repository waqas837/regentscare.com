import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function BillingSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Your RegentsCare subscription has been activated. You'll receive a confirmation email shortly.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/admin/seats"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Manage Your Seats
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
