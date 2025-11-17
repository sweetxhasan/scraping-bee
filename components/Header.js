import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="gradient-bg p-2">
                <span className="material-icons text-white text-xl">bug_report</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">Scraping Bee</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-gray-700 hover:text-primary-600 font-medium">Home</a>
              <a href="#test" className="text-gray-700 hover:text-primary-600 font-medium">Test API</a>
              <a href="#examples" className="text-gray-700 hover:text-primary-600 font-medium">Examples</a>
              <button onClick={() => document.getElementById('generateKeyModal').classList.remove('hidden')} 
                      className="gradient-button text-white px-4 py-2 font-medium">
                <span className="material-icons mr-2 text-sm">vpn_key</span>Generate Key
              </button>
            </nav>
            
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-gray-700">
              <span className="material-icons text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="gradient-bg p-2">
                    <span className="material-icons text-white text-lg">bug_report</span>
                  </div>
                  <span className="font-bold gradient-text">Scraping Bee</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-600">
                  <span className="material-icons">close</span>
                </button>
              </div>
            </div>
            <nav className="p-4 space-y-4">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium">
                <span className="material-icons">home</span>
                <span>Home</span>
              </a>
              <a href="#test" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium">
                <span className="material-icons">science</span>
                <span>Test API</span>
              </a>
              <a href="#examples" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium">
                <span className="material-icons">code</span>
                <span>Examples</span>
              </a>
              <button onClick={() => {
                document.getElementById('generateKeyModal').classList.remove('hidden')
                setMobileMenuOpen(false)
              }} className="w-full gradient-button text-white px-4 py-2 font-medium flex items-center space-x-2 justify-center">
                <span className="material-icons">vpn_key</span>
                <span>Generate Key</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
