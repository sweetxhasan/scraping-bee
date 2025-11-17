import { useState } from 'react'

export default function TestAPI() {
  const [apiResponse, setApiResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    apiKey: '',
    url: ''
  })

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 p-4 rounded text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } z-50 fade-in`
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.remove()
    }, 3000)
  }

  const testApi = async () => {
    if (!formData.apiKey) {
      showToast('Please provide API key', 'error')
      return
    }
    if (!formData.url) {
      showToast('Please enter website URL', 'error')
      return
    }

    try {
      new URL(formData.url)
    } catch (e) {
      showToast('Please enter valid URL', 'error')
      return
    }

    setLoading(true)
    setApiResponse('Testing API...')

    try {
      const apiUrl = `/api/scraping/hasan-tool/?url=${encodeURIComponent(formData.url)}&api_key=${encodeURIComponent(formData.apiKey)}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      
      setApiResponse(JSON.stringify(data, null, 2))
      showToast('API test completed!', 'success')
    } catch (error) {
      setApiResponse(`Error: ${error.message}`)
      showToast('API test failed!', 'error')
    } finally {
      setLoading(false)
    }
  }

  const detectCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      setFormData(prev => ({ ...prev, url: window.location.href }))
      showToast('Current website URL detected!', 'success')
    }
  }

  return (
    <section id="test" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 gradient-text">Test API</h2>
        <p className="text-lg text-center text-gray-600 mb-8">Try the scraping API with your parameters</p>
        
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <input 
                type="text" 
                value={formData.apiKey}
                onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                placeholder="hasan_bro_..." 
                className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com" 
                  className="flex-1 px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button 
                  onClick={detectCurrentUrl}
                  className="gradient-button text-white px-3 py-2 font-medium text-sm"
                  title="Detect Current Website"
                >
                  <span className="material-icons text-sm">travel_explore</span>
                </button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={testApi} 
            disabled={loading}
            className="gradient-button text-white px-6 py-3 font-medium w-full mb-6 disabled:opacity-50"
          >
            <span className="material-icons mr-2 text-sm">play_circle</span>
            {loading ? 'Testing...' : 'Test Scraping API'}
          </button>
          
          {/* API Response Example */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">API Response Example:</h3>
            <div className="bg-gray-800 text-gray-100 p-4 border border-gray-700">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`{
  "status": "success",
  "tool": "hasan",
  "html_code": "<!DOCTYPE html><html>...</html>",
  "response_time": "245ms",
  "user_agent": "Mozilla/5.0...",
  "url": "https://example.com",
  "proxy_used": "direct"
}`}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Live API Response:</h3>
            <pre className="api-response bg-white p-4 border border-gray-300 text-sm overflow-auto max-h-80">
              {apiResponse}
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .api-response {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
        }
