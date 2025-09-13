<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import Navigation from '../components/Navigation';

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  genre: string;
  projectType: string;
  description: string;
  budget: string;
  timeframe: string;
};

export default function BookingPage() {
  // Initialize booking method based on URL parameter
  const [bookingMethod, setBookingMethod] = useState<'calendly' | 'form'>(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('method') === 'form' ? 'form' : 'calendly';
    }
    return 'calendly';
  });
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    genre: '',
    projectType: '',
    description: '',
    budget: '',
    timeframe: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const genres = ['Hip Hop', 'R&B', 'Pop', 'Electronic', 'House', 'Ambient'];
  const projectTypes = ['Single', 'EP', 'Album', 'Beat Production', 'Mixing & Mastering', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Here you would typically send the form data to your server
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Send email notification (you'll need to implement this on your server)
      // await fetch('/api/send-booking-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your booking request! We will contact you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        genre: '',
        projectType: '',
        description: '',
        budget: '',
        timeframe: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-syne tracking-wide">
            Book a Session
          </h1>

          {/* Booking Method Selection */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setBookingMethod('calendly')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                bookingMethod === 'calendly'
                  ? 'bg-[#702963] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Schedule Meeting
            </button>
            <button
              onClick={() => setBookingMethod('form')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                bookingMethod === 'form'
                  ? 'bg-[#702963] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Project Details
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {bookingMethod === 'calendly' ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <InlineWidget 
                  url="https://calendly.com/tranquilityproductions" 
                  styles={{ height: '700px' }} 
                />
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Genre */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="genre" className="block text-sm font-medium mb-2">
                        Genre *
                      </label>
                      <select
                        id="genre"
                        name="genre"
                        required
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                      >
                        <option value="">Select a genre</option>
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                    />
                  </div>

                  {/* Budget & Timeframe */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                      >
                        <option value="">Select budget range</option>
                        <option value="Under $500">Under $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeframe" className="block text-sm font-medium mb-2">
                        Timeframe *
                      </label>
                      <select
                        id="timeframe"
                        name="timeframe"
                        required
                        value={formData.timeframe}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-[#702963] focus:outline-none"
                      >
                        <option value="">Select timeframe</option>
                        <option value="ASAP">ASAP</option>
                        <option value="Within 2 weeks">Within 2 weeks</option>
                        <option value="Within a month">Within a month</option>
                        <option value="Within 3 months">Within 3 months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        isSubmitting
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-[#702963] hover:bg-[#5A2150]'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Booking Request'}
                    </button>
                  </div>

                  {/* Status Message */}
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 rounded-lg text-center ${
                        submitStatus.type === 'success' ? 'bg-green-900' : 'bg-red-900'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
                </form>
              </div>
            )}
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Studio Guidelines</h3>
              <ul className="text-gray-400 space-y-2 inline-block text-left">
                <li>• Please arrive 10 minutes early</li>
                <li>• Bring your own storage device</li>
                <li>• No food or drinks in the studio</li>
                <li>• Maximum 3 people per session</li>
              </ul>
            </div>


            {/* Cancellation Policy removed as requested */}
          </div>
        </div>
      </div>
    </>
  );
=======
export const metadata = {
	title: 'Booking',
	description: 'Booking information placeholder.'
};

export default function BookingPage() {
	return (
		<div className="pt-24 px-6 max-w-3xl mx-auto min-h-screen">
			<h1 className="text-4xl font-bold mb-6">Booking</h1>
			<p className="text-gray-300">Booking requests currently handled via direct email: <span className="font-semibold">tranquilityvibe@gmail.com</span></p>
		</div>
	);
>>>>>>> pre-restoration-base
}
