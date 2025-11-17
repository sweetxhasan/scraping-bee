import { useState, useContext } from 'react'
import { useToast } from './Layout'

const codeExamples = {
  javascript: `// Using Fetch API
const apiKey = 'hasan_bro_YOUR_API_KEY';
const url = 'https://example.com';

fetch(\`/api/scraping/hasan-tool/?url=\${encodeURIComponent(url)}&api_key=\${apiKey}\`)
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('HTML Content:', data.html_code);
      console.log('Response Time:', data.response_time);
    } else {
      console.error('Error:', data.message);
    }
  })
  .catch(error => console.error('Request failed:', error));`,

  nodejs: `// Using Node.js with axios
const axios = require('axios');

const apiKey = 'hasan_bro_YOUR_API_KEY';
const url = 'https://example.com';

axios.get('/api/scraping/hasan-tool/', {
  params: {
    url: url,
    api_key: apiKey
  }
})
.then(response => {
  const data = response.data;
  if (data.status === 'success') {
    console.log('HTML Content Length:', data.html_code.length);
    console.log('Proxy Used:', data.proxy_used);
  } else {
    console.error('API Error:', data.message);
  }
})
.catch(error => console.error('Request failed:', error));`,

  python: `# Using Python with requests
import requests

api_key = 'hasan_bro_YOUR_API_KEY'
url = 'https://example.com'

try:
    response = requests.get(
        '/api/scraping/hasan-tool/',
        params={
            'url': url,
            'api_key': api_key
        }
    )
    data = response.json()
    
    if data['status'] == 'success':
        print(f"Success! HTML length: {len(data['html_code'])}")
        print(f"Response time: {data['response_time']}")
        print(f"User agent: {data['user_agent']}")
    else:
        print(f"Error: {data['message']}")
        
except Exception as e:
    print(f"Request failed: {e}")`,

  php: `<?php
// Using PHP with cURL
$apiKey = 'hasan_bro_YOUR_API_KEY';
$url = 'https://example.com';

$ch = curl_init();
$requestUrl = '/api/scraping/hasan-tool/?url=' . urlencode($url) . '&api_key=' . $apiKey;

curl_setopt($ch, CURLOPT_URL, $requestUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    if ($data['status'] === 'success') {
        echo "Success! Proxy used: " . $data['proxy_used'];
        echo "HTML content length: " . strlen($data['html_code']);
    } else {
        echo "Error: " . $data['message'];
    }
} else {
    echo "HTTP Error: " . $httpCode;
}
?>`
}

export default function Examples() {
  const [activeLanguage, setActiveLanguage] = useState('javascript')
  const { showToast } = useToast()

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeExamples[activeLanguage])
      showToast('Code copied to clipboard!', 'success')
    } catch (err) {
      showToast('Failed to copy code', 'error')
    }
  }

  const LanguageTab = ({ language, icon }) => (
    <button
      onClick={() => setActiveLanguage(language)}
      className={`language-tab px-6 py-3 font-semibold text-lg flex items-center space-x-2 transition-all duration-300 ${
        activeLanguage === language ? 'active shadow-lg' : 'hover:bg-gray-100'
      }`}
    >
      <i className={icon}></i>
      <span className="capitalize">{language}</span>
    </button>
  )

  return (
    <section id="examples" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Integration Examples
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready-to-use code snippets for your favorite programming languages
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Language Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <LanguageTab language="javascript" icon="ri-javascript-line" />
            <LanguageTab language="nodejs" icon="ri-nodejs-line" />
            <LanguageTab language="python" icon="ri-python-line" />
            <LanguageTab language="php" icon="ri-php-line" />
          </div>
          
          {/* Code Example */}
          <div className="code-block bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-8 border-2 border-gray-700 shadow-2xl relative">
            <button
              onClick={copyCode}
              className="copy-btn gradient-button text-white px-4 py-2 font-medium hover:shadow-lg transition-all duration-300 group"
            >
              <i className="ri-file-copy-line mr-2 group-hover:scale-110 transition-transform"></i>
              Copy Code
            </button>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <i className="ri-code-s-slash-line text-xl text-green-400"></i>
                <span className="font-mono text-sm text-gray-400">{activeLanguage}.js</span>
              </div>
              <div className="text-xs text-gray-500">
                {activeLanguage === 'javascript' && 'Browser Compatible'}
                {activeLanguage === 'nodejs' && 'Node.js Runtime'}
                {activeLanguage === 'python' && 'Python 3.x'}
                {activeLanguage === 'php' && 'PHP 7.4+'}
              </div>
            </div>
            
            <pre className="text-sm leading-relaxed overflow-x-auto">
              <code className="font-mono">{codeExamples[activeLanguage]}</code>
            </pre>
          </div>

          {/* API Documentation */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-8">
            <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center">
              <i className="ri-book-open-line mr-3"></i>
              API Documentation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <i className="ri-settings-3-line mr-2 text-purple-600"></i>
                  Endpoint Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <code className="bg-purple-100 text-purple-800 px-2 py-1">GET</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Endpoint:</span>
                    <code className="bg-purple-100 text-purple-800 px-2 py-1">/api/scraping/hasan-tool/</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Required Params:</span>
                    <code className="bg-purple-100 text-purple-800 px-2 py-1">url, api_key</code>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <i className="ri-lightbulb-line mr-2 text-yellow-600"></i>
                  Quick Tips
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Always URL-encode the target URL</li>
                  <li>• Keep your API key secure</li>
                  <li>• Handle both success and error responses</li>
                  <li>• Implement retry logic for failed requests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
