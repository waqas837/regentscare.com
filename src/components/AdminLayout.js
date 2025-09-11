'use client'

import { useState } from 'react'
import { 
  Users, 
  Settings, 
  BarChart3, 
  Mail, 
  CreditCard, 
  LogOut,
  Home,
  Shield
} from 'lucide-react'

export default function AdminLayout({ children, currentPage = 'seats' }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        alert('Invalid password')
      }
    } catch (error) {
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
  }

  const adminTabs = [
    {
      id: 'seats',
      name: 'Seat Management',
      icon: Users,
      href: '/admin/seats',
      description: 'Manage consultant seats'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      description: 'View booking statistics'
    },
    {
      id: 'emails',
      name: 'Email Logs',
      icon: Mail,
      href: '/admin/emails',
      description: 'Track sent emails'
    },
    {
      id: 'billing',
      name: 'Billing',
      icon: CreditCard,
      href: '/admin/billing',
      description: 'Manage subscriptions'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      description: 'System configuration'
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Admin Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Regents Care" className="h-10" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Regents Care Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="text-sm">View Site</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Admin Navigation Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Admin Tools
              </h2>
              
              <nav className="space-y-2">
                {adminTabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = currentPage === tab.id
                  
                  return (
                    <a
                      key={tab.id}
                      href={tab.href}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                      <div className="flex-1">
                        <div className="font-medium">{tab.name}</div>
                        <div className={`text-xs ${isActive ? 'text-indigo-100' : 'text-gray-500'}`}>
                          {tab.description}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Seats:</span>
                    <span className="font-medium text-gray-900">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">This Month:</span>
                    <span className="font-medium text-gray-900">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
