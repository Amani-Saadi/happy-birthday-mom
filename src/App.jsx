import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Poem from './Poem.jsx'

// 👇 Edit these: your photos (files in public/photos) and captions
// BASE_URL makes the paths work both locally and on GitHub Pages
const photos = [
  { src: `${import.meta.env.BASE_URL}photos/1.jpg`, caption: 'Our day at the park' },
  { src: `${import.meta.env.BASE_URL}photos/2.jpg`, caption: 'Sunshine and smiles' },
  { src: `${import.meta.env.BASE_URL}photos/3.jpg`, caption: 'My favorite person' },
  { src: `${import.meta.env.BASE_URL}photos/4.jpg`, caption: 'A new little blessing' },
]

// 👇 Edit these: your messages
const wishes = [
  'You are the strongest, kindest person I know.',
  'Thank you for every sacrifice, every hug, every prayer.',
  'I hope this year brings you as much joy as you give us.',
]

const floaters = ['🌸', '💖', '🎈', '🌷', '✨', '🎉', '🦋', '💐']
const burstEmojis = ['🎉', '💖', '✨', '🌸', '🎈']

function FloatingItems() {
  return (
    <div className="floaters" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="floater"
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i * 0.7) % 8}s`,
            animationDuration: `${8 + (i % 5)}s`,
            fontSize: `${18 + (i % 4) * 8}px`,
          }}
        >
          {floaters[i % floaters.length]}
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [bursts, setBursts] = useState([])
  const [wishIndex, setWishIndex] = useState(0)

  const celebrate = () => {
    const id = Date.now()
    const pieces = Array.from({ length: 30 }).map((_, i) => ({
      id: `${id}-${i}`,
      x: (Math.random() - 0.5) * 500,
      y: -(Math.random() * 400 + 100),
      emoji: burstEmojis[i % burstEmojis.length],
    }))
    setBursts((b) => [...b, ...pieces])
    setTimeout(() => {
      setBursts((b) => b.filter((p) => !p.id.startsWith(`${id}-`)))
    }, 2500)
  }

  return (
    <main className="page">
      <FloatingItems />

      {/* HERO */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Happy Birthday, Mom! 💖
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          To the most beautiful heart in the world
        </motion.p>

        <motion.button
          className="btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={celebrate}
        >
          Click to celebrate 🎂
        </motion.button>

        <AnimatePresence>
          {bursts.map((p) => (
            <motion.span
              key={p.id}
              className="burst"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </section>

      {/* GALLERY */}
      <section className="section">
        <h2>Our Memories 📸</h2>
        <div className="gallery">
          {photos.map((photo, i) => (
            <motion.figure
              key={photo.src}
              className="card"
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* POEM */}
      <Poem />

      {/* WISHES */}
      <section className="section wishes">
        <h2>A Message From My Heart 💌</h2>
        <motion.p
          key={wishIndex}
          className="wish"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          “{wishes[wishIndex]}”
        </motion.p>
        <button
          className="btn outline"
          onClick={() => setWishIndex((i) => (i + 1) % wishes.length)}
        >
          Another wish 💕
        </button>
      </section>

      <footer className="footer">Made with love, just for you ❤️</footer>
    </main>
  )
}