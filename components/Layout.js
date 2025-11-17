import { useState, createContext, useContext } from 'react'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default function Layout({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now()
    const toast = { id, message, type }
    
    setToasts(prev => [...prev, toast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {children}
        
        {/* Toast Container */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`p-4 min-w-80 max-w-sm text-white font-medium shadow-lg transform transition-all duration-300 slide-up ${
                toast.type === 'success' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : toast.type === 'error'
                  ? 'bg-gradient-to-r from-red-500 to-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <i className={`ri-${
                  toast.type === 'success' ? 'check-line' : 
                  toast.type === 'error' ? 'close-line' : 'information-line'
                } text-lg`}></i>
                <span>{toast.message}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
    }
