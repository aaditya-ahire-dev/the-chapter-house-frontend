import React from 'react'

function Footer() {
  return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-16 transform hover:shadow-xl transition-all duration-300">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Stay Updated</h3>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest book releases and special offers</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>
  )
}

export default Footer
