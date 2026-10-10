/**
 * Motion design tokens & choreography parameters for CKD Pharma
 * Award-winning editorial motion system
 */

export const easings = {
  // Expo for fast punchy reveals
  expo: [0.16, 1, 0.3, 1] as const,
  // Cinematic for sweeping camera and clip-path scale transitions
  cinematic: [0.76, 0, 0.24, 1] as const,
  // Editorial for subtle typography & masked line reveals
  editorial: [0.22, 1, 0.36, 1] as const,
  // Spring for tactile component interaction
  spring: {
    type: 'spring',
    stiffness: 260,
    damping: 30
  } as const
};

export const durations = {
  micro: 0.2,
  ui: 0.45,
  reveal: 1.0,
  page: 0.8,
  heroTransition: 1.4,
  slideAutoplay: 6.5
};

export const staggers = {
  words: 0.05,
  lines: 0.08,
  items: 0.06
};

// Masked line reveal animation variants for motion
export const maskedLineVariants = {
  hidden: {
    y: '110%',
    opacity: 0,
    transition: { duration: 0.4, ease: easings.editorial }
  },
  visible: (i: number = 0) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easings.editorial,
      delay: i * staggers.lines
    }
  }),
  exit: {
    y: '-110%',
    opacity: 0,
    transition: { duration: 0.5, ease: easings.cinematic }
  }
};

export const fadeScaleVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.ui, ease: easings.editorial }
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: durations.micro }
  }
};
