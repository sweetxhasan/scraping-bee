import { useState, useContext } from 'react'
import { useToast } from './Layout'

export default function TestAPI() {
  const [apiResponse, setApiResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    apiKey: '',
    url: ''
  })
  const { showToast } = useToast()

  const testApi = async () => {
    if (!formData.apiKey) {
      showToast('Please provide your API key', 'error')
      return
    }
    if (!formData.url) {
      showToast('Please enter a website URL', 'error')
      return
    }

    try {
      new URL(formData.url)
    } catch (e) {
      showToast('Please enter a valid URL format', 'error')
      return
    }

    setLoading(true)
    setApiResponse('🔄 Testing API... Please wait')

    try {
      const apiUrl = `/api/scraping/hasan-tool/?url=${encodeURIComponent(formData.url)}&api_key=${encodeURIComponent(formData.apiKey)}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      
      setApiResponse(JSON.stringify(data, null, 2))
      showToast('API test completed successfully!', 'success')
    } catch (error) {
      setApiResponse(`❌ Error: ${error.message}`)
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

  const clearFields = () => {
    setFormData({ apiKey: '', url: '' })
    setApiResponse('')
    showToast('Fields cleared!', 'success')
  }

  return (
    <section id="test" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Test API Live
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Try our scraping API in real-time with your own parameters
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Test Form */}
          <div className="bg-white/80 backdrop-blur-md border border-gray-200/60 shadow-2xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="ri-key-2-line mr-2"></i>
                  Your API Key
                </label>
                <input 
                  type="text" 
                  value={formData.apiKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="hasan_bro_ABCD1234..." 
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="ri-links-line mr-2"></i>
                  Website URL
                </label>
                <div className="flex gap-3">
                  <input 
                    type="url" 
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com" 
                    className="flex-1 px-4 py-3 border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  />
                  <button 
                    onClick={detectCurrentUrl}
                    className="gradient-button text-white px-4 py-3 font-medium hover:shadow-lg transition-all duration-300 group"
                    title="Detect Current Website"
                  >
                    <i className="ri-map-pin-line group-hover:scale-110 transition-transform"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={testApi} 
                disabled={loading}
                className="gradient-button text-white px-8 py-4 font-bold text-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300 group flex-1"
              >
                <i className={`ri-${loading ? 'loader-4-line animate-spin' : 'play-circle-line'} text-xl group-hover:scale-110 transition-transform`}></i>
                <span>{loading ? 'Testing API...' : 'Test Scraping API'}</span>
              </button>
              
              <button 
                onClick={clearFields}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center space-x-3 group flex-1"
              >
                <i className="ri-eraser-line group-hover:scale-110 transition-transform"></i>
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Live API Response */}
          <div className="bg-white/80 backdrop-blur-md border border-gray-200/60 shadow-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold gradient-text flex items-center">
                <i className="ri-terminal-line mr-3"></i>
                Live API Response
              </h3>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(apiResponse)
                  showToast('Response copied to clipboard!', 'success')
                }}
                className="gradient-button text-white px-4 py-2 text-sm font-medium hover:shadow-lg transition-all duration-300 group"
                disabled={!apiResponse}
              >
                <i className="ri-file-copy-line group-hover:scale-110 transition-transform"></i>
                Copy
              </button>
            </div>
            
            <pre className="api-response bg-gray-900 text-green-400 p-6 border-2 border-gray-800 font-mono text-sm leading-relaxed">
              {apiResponse || '// API response will appear here after testing...'}
            </pre>
          </div>

          {/* API Response Example - MOVED BELOW LIVE RESPONSE */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold gradient-text flex items-center">
                <i className="ri-code-s-slash-line mr-3"></i>
                API Response Example
              </h3>
              <div className="bg-blue-500 text-white px-3 py-1 text-sm font-medium">
                Sample
              </div>
            </div>
            
            <div className="bg-gray-900 text-gray-100 p-6 border-2 border-gray-800">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`{
  "status": "success",
  "tool": "hasan",
  "html_code": "<!DOCTYPE html><html><head>...</head><body>...</body></html>",
  "response_time": "245ms",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
  "url": "https://example.com",
  "proxy_used": "direct"
}`}
              </pre>
            </div>
            
            <div className="mt-4 p-4 bg-blue-100 border-2 border-blue-200">
              <div className="flex items-start space-x-3">
                <i className="ri-information-line text-blue-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Response Fields Explained</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li><strong>status</strong>: "success" or "error"</li>
                    <li><strong>html_code</strong>: Clean HTML content from the website</li>
                    <li><strong>response_time</strong>: Total request processing time</li>
                    <li><strong>user_agent</strong>: Random user agent used for request</li>
                    <li><strong>proxy_used</strong>: Proxy service used for scraping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
