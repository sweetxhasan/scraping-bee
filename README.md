# Scraping Bee - Web Scraping API

A powerful web scraping API built with Next.js for Vercel deployment.

## Features

- 🚀 Super fast web scraping
- 🔑 Secure API key system
- 🌐 Universal compatibility
- 📱 Mobile-friendly design
- 🎨 0 border radius design
- 🔄 Auto URL detection
- 📊 Usage statistics

## Deployment

1. Fork this repository
2. Connect to Vercel
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
4. Deploy!

## API Usage

```javascript
fetch('/api/scraping/hasan-tool/?url=https://example.com&api_key=your_key')
  .then(response => response.json())
  .then(data => console.log(data))
