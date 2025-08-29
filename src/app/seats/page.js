'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Copy, CheckCircle, X } from 'lucide-react'

export default function SeatsPage() {
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSeat, setEditingSeat] = useState(null)
  const [formData, setFormData] = useState({
    seat_id: '',
    consultant_name: '',
    booking_email: '',
    specialty: '',
    hospitals: '',
    logo_url: ''
  })
  const [copiedId, setCopiedId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    fetchSeats()
  }, [])

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

  const fetchSeats = async () => {
    try {
      const response = await fetch('/api/seats')
      const data = await response.json()
      setSeats(data.seats || data || [])
    } catch (error) {
      console.error('Error fetching seats:', error)
      setSeats([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const url = editingSeat ? '/api/seats' : '/api/seats'
      const method = editingSeat ? 'PUT' : 'POST'
      const body = editingSeat ? { ...formData, id: editingSeat.id } : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setShowForm(false)
        setEditingSeat(null)
        setFormData({ seat_id: '', consultant_name: '', booking_email: '', specialty: '', hospitals: '', logo_url: '' })
        fetchSeats()
      }
    } catch (error) {
      console.error('Error saving seat:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (seat) => {
    setEditingSeat(seat)
    setFormData({
      seat_id: seat.seat_id,
      consultant_name: seat.consultant_name,
      booking_email: seat.booking_email,
      specialty: seat.specialty,
      hospitals: seat.hospitals,
      logo_url: seat.logo_url
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this seat?')) return

    setDeleting(id)
    try {
      const response = await fetch(`/api/seats?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchSeats()
      }
    } catch (error) {
      console.error('Error deleting seat:', error)
    } finally {
      setDeleting(null)
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(text)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingSeat(null)
    setFormData({ seat_id: '', consultant_name: '', booking_email: '', specialty: '', hospitals: '', logo_url: '' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
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
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full lg:w-auto justify-center"
            >
              <Plus className="h-5 w-5" />
              Add New Seat
            </button>
            
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

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-2xl p-4 lg:p-8 mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                {editingSeat ? 'Edit Seat' : 'Add New Seat'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seat ID *
                  </label>
                  <input
                    type="text"
                    value={formData.seat_id}
                    onChange={(e) => setFormData({ ...formData, seat_id: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="e.g., demo-doctor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.consultant_name}
                    onChange={(e) => setFormData({ ...formData, consultant_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Dr. John Smith"
                  />
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
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="practice@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="e.g., Cardiology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospitals
                  </label>
                  <input
                    type="text"
                    value={formData.hospitals}
                    onChange={(e) => setFormData({ ...formData, hospitals: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="e.g., St. Mary's Hospital"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {editingSeat ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingSeat ? 'Update Seat' : 'Add Seat'
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl transition-all duration-300 w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Seats List - Mobile Responsive */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Seat ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Logo</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Consultant Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Booking Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Specialty</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Hospitals</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Booking Link</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {seats.map((seat) => (
                  <tr key={seat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-mono font-medium">{seat.seat_id}</td>
                    <td className="px-6 py-4">
                      {seat.logo_url ? (
                        <img 
                          src={seat.logo_url} 
                          alt="Logo" 
                          className="h-8 w-8 object-contain rounded"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'block'
                          }}
                        />
                      ) : (
                        <div className="h-8 w-8 bg-indigo-100 rounded flex items-center justify-center">
                          <span className="text-xs text-indigo-600 font-medium">RC</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{seat.consultant_name}</td>
                    <td className="px-6 py-4 text-gray-600">{seat.booking_email}</td>
                    <td className="px-6 py-4 text-gray-600">{seat.specialty || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{seat.hospitals || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-600 font-mono text-sm bg-indigo-50 px-2 py-1 rounded-lg">
                          /c/{seat.seat_id}
                        </span>
                        <button
                          onClick={() => copyToClipboard(`/c/${seat.seat_id}`)}
                          className="text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          {copiedId === `/c/${seat.seat_id}` ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(seat.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(seat)}
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(seat.id)}
                          disabled={deleting === seat.id}
                          className="text-red-600 hover:text-red-700 disabled:text-gray-400 transition-colors"
                        >
                          {deleting === seat.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {seats.map((seat) => (
              <div key={seat.id} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    {seat.logo_url ? (
                      <img 
                        src={seat.logo_url} 
                        alt="Logo" 
                        className="h-8 w-8 object-contain rounded"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'block'
                        }}
                      />
                    ) : (
                      <div className="h-8 w-8 bg-indigo-100 rounded flex items-center justify-center">
                        <span className="text-xs text-indigo-600 font-medium">RC</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{seat.consultant_name}</h3>
                      <p className="text-gray-600 text-sm font-mono">{seat.seat_id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(seat)}
                      className="text-blue-600 hover:text-blue-700 transition-colors p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(seat.id)}
                      disabled={deleting === seat.id}
                      className="text-red-600 hover:text-red-700 disabled:text-gray-400 transition-colors p-2"
                    >
                      {deleting === seat.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-gray-900">{seat.booking_email}</span>
                  </div>
                  {seat.specialty && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Specialty:</span>
                      <span className="text-gray-900">{seat.specialty}</span>
                    </div>
                  )}
                  {seat.hospitals && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hospitals:</span>
                      <span className="text-gray-900">{seat.hospitals}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900">{new Date(seat.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-mono text-sm bg-indigo-50 px-2 py-1 rounded-lg">
                      /c/{seat.seat_id}
                    </span>
                    <button
                      onClick={() => copyToClipboard(`/c/${seat.seat_id}`)}
                      className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                    >
                      {copiedId === `/c/${seat.seat_id}` ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {seats.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="h-12 w-12 mx-auto opacity-50" />
              </div>
              <p className="text-gray-500">No seats found. Add your first seat to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
