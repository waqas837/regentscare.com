'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Save, Send, Eye, Copy, CheckCircle } from 'lucide-react'
import AdminLayout from '../../../components/AdminLayout'

export default function AdminSeatsPage() {
  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingSeat, setEditingSeat] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [formData, setFormData] = useState({
    consultant_name: '',
    booking_email: '',
    specialty: '',
    hospitals: '',
    logo_url: ''
  })

  useEffect(() => {
    fetchSeats()
  }, [])

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

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(text)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <AdminLayout currentPage="seats">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seat Management</h1>
          <p className="text-gray-600 mt-2">Add and manage consultant booking seats</p>
        </div>
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
                <th className="text-left py-3 px-4 font-medium text-gray-700">Seat ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Logo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Consultant Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Booking Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Specialty</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Hospitals</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Booking Link</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {seats.map((seat) => (
                <tr key={seat.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{seat.seat_id}</span>
                      <button
                        onClick={() => copyToClipboard(seat.seat_id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy Seat ID"
                      >
                        {copiedId === seat.seat_id ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4 font-medium">{seat.consultant_name}</td>
                  <td className="py-3 px-4">{seat.booking_email}</td>
                  <td className="py-3 px-4">{seat.specialty}</td>
                  <td className="py-3 px-4">{seat.hospitals}</td>
                  <td className="py-3 px-4">
                    <a
                      href={`/c/${seat.seat_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View
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
    </AdminLayout>
  )
}
