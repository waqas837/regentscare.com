'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, X } from 'lucide-react'

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Auto close after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'
  const borderColor = type === 'success' ? 'border-green-600' : 'border-red-600'
  const Icon = type === 'success' ? CheckCircle : AlertTriangle

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`
        ${bgColor} ${borderColor} border-2 text-white px-6 py-4 rounded-xl shadow-2xl
        flex items-center gap-3 min-w-[400px] max-w-[600px]
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'}
      `}>
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast
