<<<<<<< HEAD
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaApple, FaSoundcloud, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import Navigation from '../components/Navigation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send');
      }
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
          
          <motion.div 
            className="bg-gray-800 rounded-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="production">Music Production</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-gradient-to-r from-red-600 via-fuchsia-600 to-purple-600 disabled:opacity-60 disabled:cursor-not-allowed hover:from-red-500 hover:via-fuchsia-500 hover:to-purple-500 text-white py-3 rounded-full text-lg font-semibold transition-all shadow relative"
                >
                  {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p className="mt-2 text-sm text-red-400">{errorMsg}</p>
                )}
                {status === 'sent' && (
                  <p className="mt-2 text-sm text-green-400">Message delivered. I\'ll get back to you soon.</p>
                )}
              </div>
            </form>
          </motion.div>

          <div className="mt-12 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-3">Contact Info</h3>
              <p className="text-gray-400 leading-relaxed">
                Email: tranquilityvibe@gmail.com
              </p>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-4 text-sm">Find me across platforms—tap in, follow, and stay tuned for new drops.</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { href: 'https://open.spotify.com/artist/2l97ZLqwMtUNlj44O1p7JF?si=bdzI5qDSQkqY9YT8Iu76jg', label: 'Spotify', icon: FaSpotify, hover: 'hover:text-green-400' },
                  { href: 'https://music.apple.com/us/artist/tranquility/1615089862', label: 'Apple Music', icon: FaApple, hover: 'hover:text-red-400' },
                  { href: 'https://soundcloud.com/by_tranquility', label: 'SoundCloud', icon: FaSoundcloud, hover: 'hover:text-orange-400' },
                  { href: 'https://www.youtube.com/channel/UCf-Q6WLLL8iKtBP_4QO_zQg?view_as=subscriber', label: 'YouTube', icon: FaYoutube, hover: 'hover:text-red-500' },
                  { href: 'https://www.instagram.com/by.tranquility/', label: 'Instagram', icon: FaInstagram, hover: 'hover:text-pink-500' },
                  { href: 'https://www.tiktok.com/@by.tranquility', label: 'TikTok', icon: FaTiktok, hover: 'hover:text-gray-300' }
                ].map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`group relative flex items-center justify-center rounded-lg p-3 bg-gradient-to-b from-gray-700/60 to-gray-900/70 border border-gray-700/40 backdrop-blur-sm ${s.hover} transition-colors`}
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
                    <span className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-red-600 via-fuchsia-600 to-[#702963] blur-md" />
                    <s.icon className="relative z-10 w-5 h-5 text-gray-300 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]" />
                    <span className="pointer-events-none absolute -bottom-7 scale-75 group-hover:scale-100 origin-top rounded-md bg-black/80 px-2 py-1 text-[10px] font-medium text-gray-200 opacity-0 group-hover:opacity-100 transition-all">{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
=======
import Navigation from '../components/Navigation';

export const metadata = {
  title: 'Contact',
  description: 'Reach TRANQUiLiTY for bookings, production or collaboration.'
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <div className="pt-24 min-h-screen px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact</h1>
          <div className="bg-gray-800/70 rounded-lg p-8 border border-gray-700/50">
            <p className="text-gray-300 leading-relaxed mb-4">
              The interactive email form has been removed.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              For bookings, production, collaboration or other inquiries, contact directly at:
            </p>
            <p className="text-lg font-semibold text-white mb-8 select-all">tranquilityvibe@gmail.com</p>
            <p className="text-sm text-gray-400">
              (No data is collected or sent from this page.)
            </p>
>>>>>>> pre-restoration-base
          </div>
        </div>
      </div>
    </>
  );
}
