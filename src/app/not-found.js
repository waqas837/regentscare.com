import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-16 mx-auto mb-6" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The page you're looking for doesn't exist. This could be an invalid booking link or a broken URL.
            </p>
          </div>

          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Home className="h-5 w-5" />
              Go to Homepage
            </Link>
            
            <div className="text-sm text-gray-500 space-y-2">
              <p>If you're trying to book an appointment, please check your booking link.</p>
              <p>If you're a healthcare provider, visit the <Link href="/seats" className="text-indigo-600 hover:underline font-medium">seat management page</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
