export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="gradient-bg p-2 shadow-lg">
                <i className="ri-bug-2-line text-white text-xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Scraping Bee</h2>
                <p className="text-gray-400 text-sm">Premium Web Scraping API</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The most reliable and fastest web scraping API for developers. 
              Extract clean HTML from any website with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10">
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10">
                <i className="ri-telegram-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <i className="ri-arrow-right-s-line text-sm"></i>
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#test" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <i className="ri-arrow-right-s-line text-sm"></i>
                  <span>Test API</span>
                </a>
              </li>
              <li>
                <a href="#examples" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <i className="ri-arrow-right-s-line text-sm"></i>
                  <span>Examples</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <i className="ri-question-line text-sm"></i>
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <i className="ri-discord-fill text-sm"></i>
                  <span>Community</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <i className="ri-mail-line text-sm"></i>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Scraping Bee. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
