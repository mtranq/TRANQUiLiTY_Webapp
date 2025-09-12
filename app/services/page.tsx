'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';

const mixingOptions = [
  {
    title: 'Mixing (Full Stems)',
    description: 'Professional mixing service for projects with full stem separation. Perfect for complex productions requiring detailed control over each element.',
    price: 'Starting at $200',
    bookingUrl: '/booking?service=mixing-stems'
  },
  {
    title: 'Mixing (2-Track)',
    description: 'Mixing service for pre-mixed tracks or simple productions. Ideal for basic mixing needs or final adjustments to a stereo file.',
    price: 'Starting at $100',
    bookingUrl: '/booking?service=mixing-2track'
  }
];

const services = [
  {
    title: 'Music Production',
    description: 'Professional music production services for artists and bands. The help to bring your vision to life. ',
    price: 'Starting at $200',
  },
  {
    title: 'Mixing',
    description: 'Get your tracks sounding leveled and meshed with our mixing services.',
    price: 'Starting at $100',
    hasMixingOptions: true
  },
  {
    title: 'Recording Sessions',
  description: '<strong>MUST KNOW ME PERSONALLY</strong> High-quality recording sessions in my professional studio with state-of-the-art equipment.',
    price: '$100/hour',
  },
  {
    title: 'Mastering',
    description: 'Final polishing step where audio is balanced, optimized, and prepared for distribution.',
    price: 'Starting at $50',
  },
];

export default function ServicesPage() {
  const [showMixingModal, setShowMixingModal] = useState(false);
  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Services</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                
                <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>
                <p className="text-gray-400 mb-2" dangerouslySetInnerHTML={{ __html: service.description }} />
                <p className="text-gray-300 text-sm mb-4">Book to setup a consultation for the service.</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#702963] font-semibold">{service.price}</span>
                  {service.hasMixingOptions ? (
                    <button 
                      onClick={() => setShowMixingModal(true)}
                      className="bg-[#702963] hover:bg-[#5A2150] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Book Now
                    </button>
                  ) : (
                    <Link href="/booking">
                      <button className="bg-[#702963] hover:bg-[#5A2150] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                        Book Now
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mixing Options Modal */}
          <AnimatePresence>
            {showMixingModal && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                  onClick={() => setShowMixingModal(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-0 m-auto w-[90%] max-w-[600px] h-fit bg-gray-800 rounded-xl p-6 z-50 shadow-xl"
                >
                  <button
                    onClick={() => setShowMixingModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <h2 className="text-2xl font-bold mb-6">Select Mixing Service</h2>
                  
                  <div className="space-y-4">
                    {mixingOptions.map((option) => (
                      <div key={option.title} className="bg-gray-700 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                        <p className="text-gray-300 mb-2">{option.description}</p>
                        <p className="text-gray-400 text-sm mb-4">Book to setup a consultation for this mixing option.</p>
                        <div className="flex justify-between items-center">
                          <span className="text-[#702963] font-semibold">{option.price}</span>
                          <Link href={option.bookingUrl}>
                            <button className="bg-[#702963] hover:bg-[#5A2150] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                              Book Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Custom Packages Section */}
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Package/Project?</h2>
            <p className="text-gray-400 mb-6">
              Offering of tailored solutions to meet your specific needs. Get in touch with us to discuss your project.
            </p>
            <p className="font-bold">
              SELECT PROJECT DETAILS TAB ON BOOKING FORM
            </p>

            <Link href="/booking?method=form">
              <button className="bg-[#702963] hover:bg-[#5A2150] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
