import { useState, useEffect } from 'react'

export default function Stats() {
  const [stats, setStats] = useState({
    total_api_keys: 0,
    total_requests: 0,
    total_success: 0,
    success_rate: '0%'
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      if (data.status === 'success') {
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const StatCard = ({ value, label, icon, delay }) => (
    <div 
      className={`bg-white/80 backdrop-blur-md border border-gray-200/60 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="gradient-bg p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <i className={`${icon} text-white text-2xl`}></i>
      </div>
      <div className="text-3xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  )

  return (
    <section id="stats" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time insights into our scraping performance and user activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <StatCard 
            value={stats.total_api_keys} 
            label="API Keys Generated" 
            icon="ri-key-2-line"
            delay={100}
          />
          <StatCard 
            value={stats.total_requests} 
            label="Total Requests" 
            icon="ri-download-cloud-line"
            delay={200}
          />
          <StatCard 
            value={stats.total_success} 
            label="Successful Requests" 
            icon="ri-checkbox-circle-line"
            delay={300}
          />
          <StatCard 
            value={stats.success_rate} 
            label="Success Rate" 
            icon="ri-trending-up-line"
            delay={400}
          />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button 
            onClick={() => document.getElementById('generateKeyModal').classList.remove('hidden')}
            className="gradient-button text-white px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <i className="ri-key-2-line mr-3 group-hover:scale-110 transition-transform"></i>
            Generate Your API Key
          </button>
        </div>
      </div>
    </section>
  )
}
