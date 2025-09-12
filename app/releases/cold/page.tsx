'use client';

import { motion } from 'framer-motion';
import { FaSpotify, FaApple, FaSoundcloud, FaYoutube, FaAmazon } from 'react-icons/fa';
import { SiTidal } from 'react-icons/si';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function ColdRelease() {
  const platforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/album/4R1gg7t1YwYbpA7Poj1r40?trackId=28xOPIPw0joNPwYd0asIT5', Icon: FaSpotify },
    { name: 'Apple Music', url: 'https://music.apple.com/us/album/cold-feat-ofg-eddy-single/1726819247', Icon: FaApple },
    { name: 'SoundCloud', url: 'https://soundcloud.com/by_tranquility/cold-ft-ofg-eddy', Icon: FaSoundcloud },
    { name: 'YouTube Music', url: 'https://music.youtube.com/watch?v=Kgva2O0x6bs&si=dDZ85Xolcws28ASu', Icon: FaYoutube },
  { name: 'Amazon Music', url: 'https://music.amazon.com/albums/B0CSXPZTX1?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_Y2KUm2inGcu6kFrcDHvBjCiU5&trackAsin=B0CSXQKBFZ', Icon: FaAmazon },
  { name: 'TIDAL', url: 'https://tidal.com/album/340873476/track/340873477', Icon: SiTidal }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white pt-16">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Artist Info */}
            <Link href="/" className="text-sm text-gray-400 hover:text-white mb-8">
              TRANQUiLiTY
            </Link>

            {/* Cover Art */}
            <motion.div
              className="w-[300px] h-[300px] relative mb-8 hover:scale-[1.02] transition-transform"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/Cold Cover Art (1).png"
                alt="COLD"
                width={300}
                height={300}
                className="rounded-xl shadow-2xl"
                priority
                quality={100}
              />
            </motion.div>
            
            {/* Track Info */}
            <h1 className="text-4xl font-bold mb-2">COLD</h1>
            <p className="text-lg text-gray-400 mb-12">Single • 2024</p>

            {/* Streaming Platforms */}
            <div className="w-full max-w-md space-y-3">
      {platforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: platforms.indexOf(platform) * 0.1 }}
                >
                  <Link
        href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
        className="w-full bg-[#2286cc] hover:bg-[#1a6ba3] transition-colors rounded-full px-5 py-4 flex items-center justify-center shadow-lg group"
                  >
  <platform.Icon className="w-5 h-5 mr-3 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
        <span className="text-lg font-medium">Listen on {platform.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-16 mb-8 text-center">
              <p className="text-sm text-gray-500">
                © 2024 TRANQUiLiTY. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
