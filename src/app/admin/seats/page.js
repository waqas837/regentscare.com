'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Save, Send } from 'lucide-react'

export default function AdminSeatsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingSeat, setEditingSeat] = useState(null)
  const [formData, setFormData] = useState({
    consultant_name: '',
    booking_email: '',
    specialty: '',
    hospitals: '',
    logo_url: ''
  })

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
        fetchSeats()
      } else {
        alert('Invalid password')
      }
    } catch (error) {
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const fetchSeats = async () => {
    try {
      const response = await fetch('/api/seats')
      if (response.ok) {
        const data = await response.json()
        setSeats(data.seats || data || [])
      }
    } catch (error) {
      console.error('Failed to fetch seats:', error)
      setSeats([])
    }
  }

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (e, action = 'save') => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const seatData = {
        ...formData,
        seat_id: generateSlug(formData.consultant_name)
      }

      const response = await fetch('/api/seats', {
        method: editingSeat ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSeat ? { ...seatData, id: editingSeat.id } : seatData)
      })

      if (response.ok) {
        if (action === 'test') {
          // Send test referral
          const testResponse = await fetch('/api/book-appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              seat_id: seatData.seat_id,
              name: 'Test Patient',
              dob: '1990-01-01',
              email: 'test@example.com',
              phone: '1234567890',
              insurer: 'Test Insurance',
              policy: 'TEST123',
              urgency: 'routine',
              summary: 'This is a test referral from the admin panel.',
              consent: true
            })
          })

          if (testResponse.ok) {
            alert('Seat saved and test email sent!')
          } else {
            alert('Seat saved but test email failed')
          }
        } else {
          alert('Seat saved successfully!')
        }

        setFormData({
          consultant_name: '',
          booking_email: '',
          specialty: '',
          hospitals: '',
          logo_url: ''
        })
        setEditingSeat(null)
        fetchSeats()
      } else {
        alert('Failed to save seat')
      }
    } catch (error) {
      alert('Error saving seat')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (seat) => {
    setEditingSeat(seat)
    setFormData({
      consultant_name: seat.consultant_name,
      booking_email: seat.booking_email,
      specialty: seat.specialty,
      hospitals: seat.hospitals,
      logo_url: seat.logo_url || ''
    })
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this seat?')) return

    try {
      const response = await fetch(`/api/seats?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Seat deleted successfully!')
        fetchSeats()
      } else {
        alert('Failed to delete seat')
      }
    } catch (error) {
      alert('Error deleting seat')
    }
  }

  const handleCancel = () => {
    setEditingSeat(null)
    setFormData({
      consultant_name: '',
      booking_email: '',
      specialty: '',
      hospitals: '',
      logo_url: ''
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Regents Care" className="h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter password to manage seats</p>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seat Management</h1>
              <p className="text-gray-600 mt-2">Add and manage consultant booking seats</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Add/Edit Form */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingSeat ? 'Edit Seat' : 'Add New Seat'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.consultant_name}
                    onChange={(e) => setFormData({ ...formData, consultant_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., Dr. John Smith"
                  />
                  {formData.consultant_name && (
                    <p className="text-sm text-gray-500 mt-1">
                      Slug: /c/{generateSlug(formData.consultant_name)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking Email *
                  </label>
                  <input
                    type="email"
                    value={formData.booking_email}
                    onChange={(e) => setFormData({ ...formData, booking_email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="booking@clinic.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty *
                  </label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., Cardiology, ENT"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospitals *
                  </label>
                  <input
                    type="text"
                    value={formData.hospitals}
                    onChange={(e) => setFormData({ ...formData, hospitals: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., The London Clinic"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {submitting ? 'Saving...' : 'Save'}
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'test')}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Saving...' : 'Save & Test'}
                </button>

                {editingSeat && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Seats List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Existing Seats</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Consultant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Specialty</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Hospitals</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Booking Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Slug</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {seats.map((seat) => (
                    <tr key={seat.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{seat.consultant_name}</td>
                      <td className="py-3 px-4">{seat.specialty}</td>
                      <td className="py-3 px-4">{seat.hospitals}</td>
                      <td className="py-3 px-4">{seat.booking_email}</td>
                      <td className="py-3 px-4">
                        <a
                          href={`/c/${seat.seat_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          /c/{seat.seat_id}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(seat)}
                            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(seat.id)}
                            className="p-2 text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
