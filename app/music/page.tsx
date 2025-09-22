'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';

type Track = {
  title: string;
  url: string;
};

type Genre = {
  name: string;
  description: string;
  services: string[];
  pricing: string;
  tracks: Track[];
};

function AudioPlayer({ tracks }: { tracks: Track[] }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - bounds.left) / bounds.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 space-y-4">
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      {/* Current Track Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {tracks[currentTrackIndex].title}
          </h3>
          <p className="text-sm text-gray-400">
            Track {currentTrackIndex + 1} of {tracks.length}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-red-500 transition-all duration-100"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          className="p-2 text-white hover:text-red-500 transition-colors"
          onClick={() => currentTrackIndex > 0 && setCurrentTrackIndex(prev => prev - 1)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
        <button
          className="p-2 text-white hover:text-red-500 transition-colors"
          onClick={() => currentTrackIndex < tracks.length - 1 && setCurrentTrackIndex(prev => prev + 1)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Playlist */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-2">Playlist</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentTrackIndex === index
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
              onClick={() => playTrack(index)}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  {currentTrackIndex === index && isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{track.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SAMPLE_TRACKS = {
  afrocarribean: [
  { title: 'OdeOde', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757547180/OdeOde_e7iruu.wav' },
  { title: 'Whine Pon It', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757547181/Whine_Pon_It_beat_vaxd0p.wav' },
  { title: 'Luv Ya Body', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757547183/Luv_Ya_Body_nz2kyn.wav' },
  { title: 'Fine Gyal', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757547185/Whine_Ya_Body_dviofl.wav' },
  { title: 'Look', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757547186/See_Ya_Body_prod._by_Tranquility_k4uj7w.wav' },
  { title: 'Movin', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757547189/Move_Ya_BODY_zgvpee.wav' }
  ],
  hiphop: [
  { title: 'Aye', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511038/Aye_prod_by_TRANQUiLiTY_qczhpr.wav' },
  { title: 'Call', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511037/Call_prod_by_TRANQUiLiTY_jhwrxw.wav' },
  { title: 'Float', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511036/Float_prod_by_TRANQUiLiTY_p4sue2.wav' },
  { title: 'B Side', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511035/B_Side_prod_by_TRANQUiLiTY_fogzk2.wav' },
  { title: 'Off White', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511038/OffWhite_prod_by_TRANQUiLiTY_xngzyt.wav' },
  { title: 'Lurkin', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511039/Lurkin_prod_by_TRANQUiLiTY_mapdsk.wav' },
  { title: 'Legit', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511043/Legit_prod_by_TRANQUiLiTY_kelvzd.wav' },
  { title: 'Lauryn', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511043/Lauryn_prod_by_TRANQUiLiTY_wi4cix.wav' },
  { title: 'Hourglass', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511045/Hourglass_prod_by_TRANQUiLiTY_vjrrl5.wav' },
  { title: 'Sheisty', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511045/Sheisty_prod._by_TRANQUiLiTY_zh7fk4.wav' },
  { title: 'Space', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511046/Space_prod_by_TRANQUiLiTY_e0taev.wav' },
  { title: 'Time', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511036/Time_prod_by_TRANQUiLiTY_hwvd0x.wav' },
  { title: 'Trippy Sins', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757511045/TrippySins_prod._by_TRANQUiLiTY_nkjl80.wav' }
  ],
  pop: [
  { title: 'With Me', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757622045/With_Me_uoqrar.wav' }
  ]
};

const genreDetails: Record<string, Genre> = {
   'Hip-Hop/Trap/Drill': {
    name: 'Hip-Hop/Trap/Drill Production',
    description: 'Professional hip hop production combining classic beats with modern trap elements.',
    services: ['Beat Making', 'Vocal Processing', 'Mix & Master'],
    pricing: 'Starting at $200 per track',
    tracks: SAMPLE_TRACKS.hiphop
  },
  'R&B': {
    name: 'R&B Production',
    description: 'Smooth R&B production with rich harmonies and professional vocal arrangements.',
    services: ['Vocal Arrangement', 'Live Instruments', 'Beat Production', 'Full Mix'],
    pricing: 'Starting at $300 per track',
    tracks: [
      { title: 'French Sermon', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546927/French_Sermon_exv8xl.wav' },
      { title: 'Late Nights', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546926/Late_Nites_vnaocq.wav' },
      { title: 'Give Me More', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546925/GiveMeMore_agagqu.wav' },
      { title: 'More Than Love', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546925/More_Than_Love_gglvfd.wav' },
      { title: 'Gone', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546923/GONE_syg895.wav' },
      { title: 'Belong To You', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546921/U_Too_Belongs_Heart_qtyvbk.wav' },
      { title: 'Missing', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546918/Missin_c3y09u.wav' },
      { title: 'Pieces', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546916/2slicesofpiSZA_dd0zq2.wav' },
      { title: 'Fully Loaded', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546914/FullyLoaded_prod_by_Tranquility_cji6zy.wav' },
      { title: 'Confessions', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546913/Confessions_csjgsd.wav' },
      { title: 'Way Too Long', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546912/TimeBeenWayTooLong_hv2ib1.wav' },
      { title: 'Wish I Knew', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546911/IWishIKnew_k2r2ys.wav' },
      { title: 'Shine Blue', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546909/ShineBlue_prod_by_Tranquility_amb88r.wav' },
      { title: 'Feels So Special', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546908/FeelsSoSpecial_prod_by_TRANQUiLiTY_ydvgak.wav' },
      { title: 'After Dark', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757546905/After_Dark_prod_by_TRANQUiLiTY_k7xbgu.wav' }
    ]
  },
  'Afrobeats/Caribbean': {
    name: 'Afro-Caribbean Music Production',
    description: 'Bringing the vibrant sounds of the African diaspora to life with modern production techniques.',
    services: ['Percussion Programming', 'Vocal Tuning', 'Mixing & Mastering'],
    pricing: 'Starting at $300 per track',
    tracks: SAMPLE_TRACKS.afrocarribean
  },
  'Pop': {
    name: 'Pop Music Production',
    description: 'Contemporary pop production with radio-ready sound quality.',
    services: ['Songwriting', 'Top-line Melody', 'Arrangement', 'Final Mix'],
    pricing: 'Starting at $200 per track',
    tracks: SAMPLE_TRACKS.pop
  },
  'Electronic': {
    name: 'Electronic Music Production',
    description: 'High-energy Electronic production with a focus on catchy melodies and driving beats.',
    services: ['Beat Programming', 'Sound Design', 'Arrangement', 'Mixdown'],
    pricing: 'Starting at $200 per track',
    tracks: [
      { title: 'Never Give Up', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757622106/NeverGIveUp_xxgtlm.wav' }
    ]
  },
  'Alternative Rock': {
    name: 'Alternative Rock Production',
    description: 'Edgy and innovative rock music production with a modern twist.',
    services: ['Songwriting', 'Arrangement', 'Mixing & Mastering'],
    pricing: 'Starting at $300 per track',
    tracks: [
      { title: 'This It', url: 'https://res.cloudinary.com/ddiie54mb/video/upload/v1757622261/This_It_tbbv9y.wav' }
    ]
  }
};

export default function MusicPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">My Music</h1>
          
          {/* Music Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Spotify Latest Release - enhanced frame */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2 leading-tight">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Latest Release
              </h2>
              <div className="group relative">
                <div className="rounded-xl p-[1.5px] bg-gradient-to-br from-red-700/40 via-pink-700/25 to-purple-700/40 shadow-lg shadow-black/40 group-hover:shadow-red-900/40 transition-shadow">
                  <div className="rounded-[11px] overflow-hidden bg-black">
                    <iframe
                      data-testid="embed-iframe"
                      title="Spotify Latest Release"
                      width="100%"
                      height="152"
                      style={{ border: '0' }}
                      src="https://open.spotify.com/embed/track/0d7Z105K4L8JDe6vIJz3no?utm_source=generator&theme=0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1 pr-0.5 text-[10px] text-gray-500">
                  <a
                    href="https://open.spotify.com/track/0d7Z105K4L8JDe6vIJz3no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >Open on Spotify →</a>
                </div>
              </div>
            </div>

            {/* SoundCloud Featured Tracks - restyled */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold leading-tight">Featured Tracks</h2>
              <div className="group relative">
                <div className="rounded-xl p-[1.5px] bg-gradient-to-br from-orange-600/40 via-amber-500/25 to-pink-600/40 shadow-lg shadow-black/40 group-hover:shadow-orange-900/40 transition-shadow">
                  <div className="rounded-[11px] overflow-hidden bg-black/90 backdrop-blur-sm">
                    <iframe
                      title="SoundCloud Featured Tracks"
                      width="100%"
                      height="360"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2068620114%3Fsecret_token%3Ds-c1unCnEYCco&color=%23201b15&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1 pr-0.5 text-[10px] text-gray-500 space-x-2">
                  <a
                    href="https://soundcloud.com/by_tranquility"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-300 transition-colors"
                  >Artist →</a>
                  <a
                    href="https://soundcloud.com/by_tranquility/sets/featured-tracks/s-c1unCnEYCco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-300 transition-colors"
                  >Open Playlist →</a>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">My Productions</h1>

          {/* Genre Categories (enhanced for higher click-through) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
            {Object.keys(genreDetails).map((genre, idx) => {
              const g = genreDetails[genre];
              return (
                <motion.button
                  key={genre}
                  type="button"
                  onClick={() => setSelectedGenre(genre)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="group relative rounded-xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {/* Glow / gradient frame */}
                  <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-red-600/30 via-pink-600/20 to-purple-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-red-400/40 transition-colors" />
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="mb-4 flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold leading-snug group-hover:text-white tracking-wide">
                        {genre}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-red-300 transition-colors">Open</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors">
                      {g.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 text-white shadow-lg shadow-red-900/30 group-hover:shadow-red-700/40 group-hover:from-red-500 group-hover:via-pink-500 group-hover:to-purple-600 transition-all duration-300">
                          View Tracks
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                        </span>
                      </div>
                    </div>
                    {/* Gradient overlay for subtle depth */}
                    <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
                    <span className="pointer-events-none absolute inset-0 rounded-xl bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-40 transition-opacity" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Modal */}
          <AnimatePresence>
            {selectedGenre && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                  onClick={() => setSelectedGenre(null)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed inset-0 m-auto w-[90%] max-w-[800px] h-[80vh] overflow-y-auto bg-gray-800 rounded-xl p-6 z-50 custom-scrollbar shadow-xl"
                >
                  {selectedGenre && (
                    <>
                      <button
                        onClick={() => setSelectedGenre(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <h2 className="text-2xl font-bold mb-4">{genreDetails[selectedGenre].name}</h2>
                      <div className="mb-6">
                        <AudioPlayer tracks={genreDetails[selectedGenre].tracks} />
                      </div>
                      <p className="text-gray-300 mb-6">{genreDetails[selectedGenre].description}</p>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Services Included:</h3>
                        <ul className="list-disc list-inside text-gray-300">
                          {genreDetails[selectedGenre].services.map((service) => (
                            <li key={service}>{service}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t border-gray-700 pt-4">
                        <p className="text-xl font-semibold text-red-500">{genreDetails[selectedGenre].pricing}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                        onClick={() => window.location.href = '/services'}
                        aria-label="Go to Services page"
                      >
                        Get Started
                      </motion.button>
                    </>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
