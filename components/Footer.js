export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="gradient-bg p-2">
            <span className="material-icons text-white text-xl">bug_report</span>
          </div>
          <span className="text-2xl font-bold">Scraping Bee</span>
        </div>
        <p className="text-gray-400 mb-6">Powerful web scraping API for developers</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="material-icons">code</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="material-icons">telegram</span>
          </a>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400">&copy; 2024 Scraping Bee. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>
    </footer>
  )
}
