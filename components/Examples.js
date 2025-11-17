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
$
