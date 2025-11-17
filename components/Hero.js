export default function Hero() {
  return (
    <section id="home" className="gradient-bg text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
          Web Scraping API
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-95 fade-in max-w-2xl mx-auto">
          Extract clean HTML from any website with our powerful and fast API
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center fade-in">
          <button onClick={() => document.getElementById('generateKeyModal').classList.remove('hidden')} 
                  className="bg-white text-primary-600 px-6 py-3 font-bold text-lg hover:shadow-xl transition-all">
            <span className="material-icons mr-2 text-sm">rocket_launch</span>Get Started Free
          </button>
          <a href="#test" className="border-2 border-white text-white px-6 py-3 font-bold text-lg hover:bg-white hover:text-primary-600 transition-all">
            <span className="material-icons mr-2 text-sm">science</span>Test API
          </a>
        </div>
      </div>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
