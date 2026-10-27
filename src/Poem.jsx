import { useState } from 'react'
import { motion } from 'framer-motion'

// 👇 Edit the poem here. Each stanza has a title and lines.
// Each string in "lines" is one line of the poem.
const stanzas = [
  {
    title: 'البداية',
    lines: [
      'يا أغلى الناس على قلبي',
      'أنتِ الدفءُ حين يشتدّ البرد',
      'وأنتِ الحضنُ الذي أعود إليه مهما ابتعدت',
    ],
  },
  {
    title: 'الدعاء',
    lines: [
      'علّمتني أن أقف حين أتعثر',
      'وأن أحلم وأنا صغير',
      'ودعوتِ لي في كل سجدةٍ وكل فجر',
    ],
  },
  {
    title: 'العيد',
    lines: [
      'عيدكِ اليوم عيدٌ لكل الأيام',
      'فليكن عامكِ كله فرحاً ونوراً',
      'وليبقَ قلبكِ كما عرفتُه دائماً',
      'أجمل ما في الدنيا',
    ],
  },
]

const stanzaVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.5 } },
}

const lineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

function PoemLine({ text }) {
  const words = text.split(' ')
  return (
    <motion.p className="poem-line" variants={lineVariants}>
      {words.map((word, i) => (
        <motion.span key={i} className="poem-word" variants={wordVariants}>
          {word}{' '}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default function Poem() {
  // Changing this key replays the whole animation
  const [replay, setReplay] = useState(0)

  return (
    <section className="section poem-section" dir="rtl" lang="ar">
      <div className="poem-ornament">❀ ✦ ❀</div>
      <h2 className="poem-heading">قصيدة إلى أمي</h2>

      <motion.div
        key={replay}
        className="poem-body"
        variants={stanzaVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stanzas.map((stanza, si) => (
          <motion.div
            key={si}
            className="poem-stanza"
            variants={stanzaVariants}
          >
            <motion.h3 className="poem-stanza-title" variants={wordVariants}>
              ✦ {stanza.title} ✦
            </motion.h3>
            {stanza.lines.map((line, li) => (
              <PoemLine key={li} text={line} />
            ))}
          </motion.div>
        ))}

        <motion.p className="poem-closing" variants={wordVariants}>
          كل عامٍ وأنتِ بخير يا أمي 🌷
        </motion.p>
      </motion.div>

      <motion.button
        className="btn outline poem-replay"
        onClick={() => setReplay((r) => r + 1)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        أعد القراءة 🔁
      </motion.button>

      <div className="poem-ornament">❀ ✦ ❀</div>
    </section>
  )
}
