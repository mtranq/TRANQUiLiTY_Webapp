'use client';

import Image from 'next/image';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import { FaSpotify, FaApple, FaSoundcloud, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="pt-24 min-h-screen px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">About Me</h1>

          <div className="grid gap-10 md:grid-cols-2 items-start">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-gray-800"
            >
              {/* Replace the src below with your personal headshot in /public (e.g. /me.jpg) */}
              <Image
                src="/about%20me%20pic.jpg"
                alt="Producer portrait"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center opacity-90 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-sm uppercase tracking-wider text-gray-300">TRANQUiLiTY</p>
                <p className="text-lg font-semibold">Artist / Producer / Engineer</p>
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-gray-300 leading-relaxed">
                Waddup I'm <span className="font-semibold text-white">TRANQUiLiTY</span>, a music producer, artist and audio engineer with a passion for crafting immersive soundscapes and impactful rhythms. Over the years I've developed a versatile skill set across <span className="text-white font-medium">Hip-Hop, Trap, Drill, R&B, Afrobeats, Pop, EDM, and Alternative</span>—blending organic textures with modern production techniques.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My journey started with experimenting in a simple home setup, evolving into a refined workflow focused on clarity, depth, and emotion. I specialize in <span className="text-white font-medium">beat production, vocal processing, arrangement, sound design, mixing, and mastering</span>. Every track is approached with intention—balancing technical precision with artistic feel.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I believe in building collaborative relationships with artists—helping shape ideas from raw demos to polished, release-ready records. Whether it's enhancing a performance, sculpting atmosphere, or delivering final masters, the goal is always the same: to make the music feel alive.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Alongside my studio work, I earned a <span className="text-white font-medium">minor in Music at Binghamton University</span>, strengthening my foundation in theory, ear training, and composition. I also served as president of a campus music club, organizing collaborative sessions, events, and peer development—an experience that sharpened both my leadership and creative direction.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-200 mb-2">Core Skills</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Production & Arrangement</li>
                    <li>Vocal Engineering</li>
                    <li>Mixing & Mastering</li>
                    <li>Sound Design</li>
                  </ul>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-200 mb-2">Genres</h3>
                  <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Hip-Hop / Trap / Drill</li>
                    <li>R&B / Afrobeats</li>
                    <li>Pop / EDM</li>
                    <li>Alternative</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/services"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Explore Services
                </a>
              </div>

              {/* Social / Connect Section */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="pt-4"
              >
                <h3 className="text-sm font-semibold tracking-wide text-gray-200 mb-3 uppercase">Connect / Follow</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { href: 'https://open.spotify.com/artist/2l97ZLqwMtUNlj44O1p7JF?si=bdzI5qDSQkqY9YT8Iu76jg', label: 'Spotify', icon: FaSpotify, color: 'hover:text-green-400' },
                    { href: 'https://music.apple.com/us/artist/tranquility/1615089862', label: 'Apple Music', icon: FaApple, color: 'hover:text-red-400' },
                    { href: 'https://soundcloud.com/by_tranquility', label: 'SoundCloud', icon: FaSoundcloud, color: 'hover:text-orange-400' },
                    { href: 'https://www.youtube.com/channel/UCf-Q6WLLL8iKtBP_4QO_zQg?view_as=subscriber', label: 'YouTube', icon: FaYoutube, color: 'hover:text-red-500' },
                    { href: 'https://www.instagram.com/by.tranquility/', label: 'Instagram', icon: FaInstagram, color: 'hover:text-pink-500' },
                    { href: 'https://www.tiktok.com/@by.tranquility', label: 'TikTok', icon: FaTiktok, color: 'hover:text-gray-300' }
                  ].map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`group relative flex items-center justify-center rounded-lg p-3 bg-gradient-to-b from-gray-800/70 to-gray-900/70 border border-gray-700/40 backdrop-blur-sm ${s.color} transition-colors`}
                    >
                      {/* Glow ring */}
                      <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
                      {/* Accent gradient bar */}
                      <span className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-red-600 via-fuchsia-600 to-[#702963] blur-[6px]" />
                      <s.icon className="relative z-10 w-5 h-5 text-gray-300 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]" />
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute -bottom-7 scale-75 group-hover:scale-100 origin-top rounded-md bg-black/80 px-2 py-1 text-[10px] font-medium text-gray-200 opacity-0 group-hover:opacity-100 transition-all">{s.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
