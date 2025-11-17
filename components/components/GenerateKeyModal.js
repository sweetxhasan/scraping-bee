import { useState, useContext } from 'react'
import { useToast } from './Layout'

export default function GenerateKeyModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiName, setApiName] = useState('')
  const [generatedKey, setGeneratedKey] = useState('')
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const generateApiKey = async () => {
    if (!apiName.trim()) {
      showToast('Please enter an API name', 'error')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/generate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: apiName.trim() })
      })
      
      const data = await response.json()
      
      if (data.status === 'success') {
        setGeneratedKey(data.api_key)
        showToast('API key generated successfully!', 'success')
        
        // Auto-fill the test API key field
        if (typeof window !== 'undefined') {
          const testApiKeyInput = document.getElementById('testApiKey')
          if (testApiKeyInput) {
            testApiKeyInput.value = data.api_key
          }
        }
      } else {
        showToast(data.message || 'Failed to generate key', 'error')
      }
    } catch (error) {
      showToast('Failed to generate API key', 'error')
      console.error('Error generating key:', error)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
    setApiName('')
    setGeneratedKey('')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey)
    showToast('API key copied to clipboard!', 'success')
  }

  // Add event listener to open modal
  if (typeof window !== 'undefined') {
    window.openGenerateKeyModal = () => setIsOpen(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200/60 shadow-2xl w-full max-w-md transform slide-up">
        {/* Header */}
        <div className="border-b border-gray-200/60 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold gradient-text flex items-center">
              <i className="ri-key-2-line mr-3"></i>
              Generate API Key
            </h3>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {!generatedKey ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="ri-pencil-line mr-2"></i>
                  API Key Name
                </label>
                <input 
                  type="text" 
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                  placeholder="e.g., My Project API Key" 
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && generateApiKey()}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Choose a descriptive name to identify your API key
                </p>
              </div>

              <button 
                onClick={generateApiKey}
                disabled={loading || !apiName.trim()}
                className="gradient-button text-white px-6 py-3 font-bold w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 group"
              >
                <i className={`ri-${loading ? 'loader-4-line animate-spin' : 'key-2-line'} text-xl group-hover:scale-110 transition-transform`}></i>
                <span>{loading ? 'Generating...' : 'Generate API Key'}</span>
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 border-2 border-green-200 p-4 mb-6">
                <i className="ri-checkbox-circle-line text-green-500 text-4xl mb-3"></i>
                <h4 className="font-bold text-green-800 text-lg mb-2">API Key Generated!</h4>
                <p className="text-green-700 text-sm">
                  Save this key securely - it won't be shown again!
                </p>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm mb-4 text-left break-all border-2 border-gray-800">
                {generatedKey}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={copyToClipboard}
                  className="gradient-button text-white px-6 py-3 font-bold flex-1 flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 group"
                >
                  <i className="ri-file-copy-line group-hover:scale-110 transition-transform"></i>
                  <span>Copy Key</span>
                </button>
                <button 
                  onClick={closeModal}
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 font-bold flex-1 hover:bg-gray-50 transition-all duration-300"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
                  }
