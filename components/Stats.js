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

  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="fade-in">
            <div className="text-3xl font-bold gradient-text">{stats.total_api_keys}</div>
            <div className="text-gray-600 text-sm md:text-base">API Keys</div>
          </div>
          <div className="fade-in">
            <div className="text-3xl font-bold gradient-text">{stats.total_requests}</div>
            <div className="text-gray-600 text-sm md:text-base">Total Requests</div>
          </div>
          <div className="fade-in">
            <div className="text-3xl font-bold gradient-text">{stats.total_success}</div>
            <div className="text-gray-600 text-sm md:text-base">Success Requests</div>
          </div>
          <div className="fade-in">
            <div className="text-3xl font-bold gradient-text">{stats.success_rate}</div>
            <div className="text-gray-600 text-sm md:text-base">Success Rate</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .fade-in {
          animation: fadeIn 0.6s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
    }
