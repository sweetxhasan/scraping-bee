import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="gradient-bg p-2 shadow-lg">
                <i className="ri-bug-2-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Scraping Bee</h1>
                <p className="text-xs text-gray-500 -mt-1">Premium API</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 group">
                <span className="group-hover:border-b-2 group-hover:border-primary-600 pb-1">Home</span>
              </a>
              <a href="#stats" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 group">
                <span className="group-hover:border-b-2 group-hover:border-primary-600 pb-1">Stats</span>
              </a>
              <a href="#test" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 group">
                <span className="group-hover:border-b-2 group-hover:border-primary-600 pb-1">Test API</span>
              </a>
              <a href="#examples" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 group">
                <span className="group-hover:border-b-2 group-hover:border-primary-600 pb-1">Examples</span>
              </a>
              <button 
                onClick={() => document.getElementById('generateKeyModal').classList.remove('hidden')}
                className="gradient-button text-white px-6 py-2.5 font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <i className="ri-key-2-line mr-2 group-hover:scale-110 transition-transform"></i>
                Generate Key
              </button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-700 hover:text-primary-600 transition-colors p-2"
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="gradient-bg p-2">
                    <i className="ri-bug-2-line text-white text-lg"></i>
                  </div>
                  <div>
                    <span className="font-bold gradient-text text-lg">Scraping Bee</span>
                    <p className="text-xs text-gray-500">Premium API</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <nav className="p-6 space-y-6">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 text-gray-700 hover:text-primary-600 font-medium text-lg transition-colors group"
              >
                <i className="ri-home-5-line text-xl group-hover:scale-110 transition-transform"></i>
                <span>Home</span>
              </a>
              
              <a 
                href="#stats" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 text-gray-700 hover:text-primary-600 font-medium text-lg transition-colors group"
              >
                <i className="ri-bar-chart-line text-xl group-hover:scale-110 transition-transform"></i>
                <span>Stats</span>
              </a>
              
              <a 
                href="#test" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 text-gray-700 hover:text-primary-600 font-medium text-lg transition-colors group"
              >
                <i className="ri-flask-line text-xl group-hover:scale-110 transition-transform"></i>
                <span>Test API</span>
              </a>
              
              <a 
                href="#examples" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 text-gray-700 hover:text-primary-600 font-medium text-lg transition-colors group"
              >
                <i className="ri-code-s-slash-line text-xl group-hover:scale-110 transition-transform"></i>
                <span>Examples</span>
              </a>
              
              <button 
                onClick={() => {
                  document.getElementById('generateKeyModal').classList.remove('hidden')
                  setMobileMenuOpen(false)
                }}
                className="w-full gradient-button text-white px-6 py-3 font-medium text-lg mt-8 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <i className="ri-key-2-line group-hover:scale-110 transition-transform"></i>
                <span>Generate API Key</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
