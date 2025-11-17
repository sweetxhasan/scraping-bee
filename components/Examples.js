import { useState } from 'react'

const codeExamples = {
  javascript: `// Using Fetch API
const apiKey = 'your_api_key_here';
const url = 'https://example.com';

fetch(\`/api/scraping/hasan-tool/?url=\${encodeURIComponent(url)}&api_key=\${apiKey}\`)
  .then(response => response.json())
  .then(data => console.log(data));`,

  nodejs: `// Using Node.js with axios
const axios = require('axios');

const apiKey = 'your_api_key_here';
const url = 'https://example.com';

axios.get('/api/scraping/hasan-tool/', {
  params: { url, api_key: apiKey }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));`,

  python: `# Using Python with requests
import requests

api_key = 'your_api_key_here'
url = 'https://example.com'

response = requests.get(
    '/api/scraping/hasan-tool/',
    params={'url': url, 'api_key': api_key}
)

print(response.json())`,

  php: `<?php
// Using PHP with cURL
$apiKey = 'your_api_key_here';
$url = 'https://example.com';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '/api/scraping/hasan-tool/?url=' . urlencode($url) . '&api_key=' . $apiKey);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>`
}

export default function Examples() {
  const [activeLanguage, setActiveLanguage] = useState('javascript')

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeExamples[activeLanguage])
      showToast('Code copied to clipboard!', 'success')
    } catch (err) {
      showToast('Failed to copy code', 'error')
    }
  }

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

  return (
    <section id="examples" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 gradient-text">API Usage Examples</h2>
        <p className="text-lg text-center text-gray-600 mb-8">Code examples for different languages</p>
        
        <div className="max-w-4xl mx-auto">
          {/* Language Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {Object.keys(codeExamples).map(lang => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`language-tab px-4 py-2 font-medium capitalize ${
                  activeLanguage === lang ? 'active' : ''
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          
          {/* Code Example */}
          <div className="code-block bg-gray-800 text-gray-100 p-4 border border-gray-700 relative">
            <button
              onClick={copyCode}
              className="copy-btn bg-primary-600 text-white px-3 py-1 text-sm absolute top-2 right-2 opacity-0 transition-opacity"
            >
              <span className="material-icons mr-1 text-sm">content_copy</span>Copy
            </button>
            <pre className="text-sm overflow-x-auto">
              <code>{codeExamples[activeLanguage]}</code>
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
        .language-tab {
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        .language-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
        }
        .code-block:hover .copy-btn {
          opacity: 1;
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
