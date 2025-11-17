import { supabase } from '../../../lib/supabase'

// Proxies and User Agents
const proxies = [
  '',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://proxy.cors.sh/'
]

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
]

function generateApiKey() {
  const prefix = 'hasan_bro_'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = prefix
  for (let i = 0; i < 14 - prefix.length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

async function validateApiKey(apiKey) {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('api_key', apiKey)
    .single()
  
  return { valid: !!data, data, error }
}

async function updateApiStats(apiKeyId, success = true) {
  const { data } = await supabase
    .from('api_keys')
    .select('request_count, success_count')
    .eq('id', apiKeyId)
    .single()

  if (data) {
    await supabase
      .from('api_keys')
      .update({
        request_count: data.request_count + 1,
        success_count: success ? data.success_count + 1 : data.success_count
      })
      .eq('id', apiKeyId)
  }
}

async function logApiRequest(apiKeyId, url, status, responseTime, userAgent) {
  await supabase
    .from('api_requests')
    .insert({
      api_key_id: apiKeyId,
      url: url,
      status: status,
      response_time: responseTime,
      user_agent: userAgent
    })
}

async function scrapeWebsite(url) {
  const axios = (await import('axios')).default
  
  let lastError = ''
  
  for (let attempt = 0; attempt < proxies.length; attempt++) {
    const proxy = proxies[attempt]
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
    
    const targetUrl = proxy + (proxy ? encodeURIComponent(url) : url)
    
    const startTime = Date.now()
    
    try {
      const response = await axios.get(targetUrl, {
        headers: {
          'User-Agent': userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        },
        timeout: 10000
      })
      
      const responseTime = Date.now() - startTime
      
      // Clean HTML
      let cleanHtml = response.data.replace(/\s+/g, ' ').trim()
      
      return {
        success: true,
        html: cleanHtml,
        responseTime: responseTime,
        userAgent: userAgent,
        proxyUsed: proxy || 'direct'
      }
    } catch (error) {
      lastError = error.message
    }
  }
  
  return {
    success: false,
    error: lastError || 'All proxy attempts failed',
    userAgent: userAgents[0],
    proxyUsed: 'none'
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const startTime = Date.now()
  const { url, api_key } = req.query

  try {
    if (!api_key) {
      return res.json({
        status: 'error',
        message: 'API key is required'
      })
    }
    
    if (!url) {
      return res.json({
        status: 'error',
        message: 'URL parameter is required'
      })
    }

    // Validate URL
    try {
      new URL(url)
    } catch (e) {
      return res.json({
        status: 'error',
        message: 'Invalid URL format'
      })
    }

    // Validate API key
    const validation = await validateApiKey(api_key)
    if (!validation.valid) {
      return res.json({
        status: 'error',
        message: 'Invalid API key'
      })
    }

    // Scrape website
    const scrapeResult = await scrapeWebsite(url)
    const responseTime = Date.now() - startTime

    // Update stats
    await updateApiStats(validation.data.id, scrapeResult.success)
    await logApiRequest(validation.data.id, url, scrapeResult.success ? 'success' : 'failed', responseTime, scrapeResult.userAgent)

    if (scrapeResult.success) {
      res.json({
        status: 'success',
        tool: 'hasan',
        html_code: scrapeResult.html,
        response_time: responseTime + 'ms',
        user_agent: scrapeResult.userAgent,
        url: url,
        proxy_used: scrapeResult.proxyUsed
      })
    } else {
      res.json({
        status: 'error',
        tool: 'hasan',
        message: 'Failed to scrape website',
        error: scrapeResult.error,
        response_time: responseTime + 'ms',
        url: url,
        user_agent: scrapeResult.userAgent,
        proxy_used: scrapeResult.proxyUsed
      })
    }

  } catch (error) {
    const responseTime = Date.now() - startTime
    res.json({
      status: 'error',
      tool: 'hasan',
      message: 'Internal server error',
      error: error.message,
      response_time: responseTime + 'ms'
    })
  }
}

// Additional API endpoints
export async function getStats(req, res) {
  try {
    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('*')
    
    if (error) throw error
    
    const totalRequests = keys.reduce((sum, key) => sum + key.request_count, 0)
    const totalSuccess = keys.reduce((sum, key) => sum + key.success_count, 0)
    
    res.json({
      status: 'success',
      total_api_keys: keys.length,
      total_requests: totalRequests,
      total_success: totalSuccess,
      success_rate: totalRequests > 0 ? ((totalSuccess / totalRequests) * 100).toFixed(2) + '%' : '0%'
    })
    
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Failed to fetch stats',
      error: error.message
    })
  }
}

export async function generateKey(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name } = req.body
    
    if (!name) {
      return res.json({
        status: 'error',
        message: 'API name is required'
      })
    }
    
    const apiKey = generateApiKey()
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          api_key: apiKey,
          name: name,
          request_count: 0,
          success_count: 0
        }
      ])
      .select()
    
    if (error) throw error
    
    res.json({
      status: 'success',
      message: 'API key generated successfully',
      api_key: apiKey,
      data: data[0]
    })
    
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Failed to generate API key',
      error: error.message
    })
  }
}
