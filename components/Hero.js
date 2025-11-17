export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 animate-pulse delay-700"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-white/10 animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
        {/* Main Heading */}
        <div className="fade-in mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Scraping
            <span className="block bg-white/20 px-4 py-2 mt-2 text-4xl md:text-6xl lg:text-7xl">
              Bee
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium Web Scraping API - Extract clean HTML from any website with lightning speed and reliability
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
          <button 
            onClick={() => document.getElementById('generateKeyModal').classList.remove('hidden')}
            className="bg-white text-primary-600 px-8 py-4 font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <i className="ri-rocket-2-line mr-3 group-hover:scale-110 transition-transform"></i>
            Start Free Today
          </button>
          
          <a 
            href="#test" 
            className="border-2 border-white/80 text-white px-8 py-4 font-bold text-lg backdrop-blur-sm hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <i className="ri-flask-line mr-3 group-hover:scale-110 transition-transform"></i>
            Test Live API
          </a>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto fade-in">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
            <div className="text-white/70 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">&lt;500ms</div>
            <div className="text-white/70 text-sm">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
            <div className="text-white/70 text-sm">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">∞</div>
            <div className="text-white/70 text-sm">Scalability</div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  )
}
