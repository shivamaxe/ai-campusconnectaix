import './landing.css';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Play,
  BrainCircuit,
  Target,
  BarChart3,
  FileText,
  MessageSquare,
  Workflow,
  UserPlus,
  ScanSearch,
  Award,
  ChevronRight,
  Quote,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  GraduationCap,
  Building2,
  Users,
  Heart,
  Star,
  Zap,
  TrendingUp,
  Bot,
} from 'lucide-react';
import { Button } from '../../components/common/Button';

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}

interface Stat {
  label: string;
  value: string;
  numericEnd: number;
  suffix: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  university: string;
}

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */
const NAV_LINKS = ['Features', 'How It Works', 'Stats', 'Testimonials'] as const;

const FEATURES: Feature[] = [
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: 'AI Career Coach',
    description:
      'Get personalised career guidance powered by deep learning models trained on millions of successful career trajectories.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Smart Placement Engine',
    description:
      'Our AI matches students with the perfect roles based on skills, aspirations, and company culture fit — in real time.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Real-time Analytics',
    description:
      'Actionable dashboards for placement cells to track offer rates, salary trends, and diversity metrics at a glance.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Resume AI Builder',
    description:
      'Generate ATS-optimised, role-specific resumes with one click. AI highlights strengths recruiters care about.',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Interview Prep',
    description:
      'Practice with AI mock interviews, get instant feedback on answers, body language cues, and confidence scoring.',
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: 'Automated Workflows',
    description:
      'Automate scheduling, notifications, and offer-letter generation — let the platform handle the logistics.',
  },
];

const STEPS: Step[] = [
  {
    icon: <UserPlus className="w-7 h-7 text-blue-400" />,
    number: '01',
    title: 'Create Profile',
    description:
      'Students build a rich profile with skills, projects, and aspirations. Our AI auto-suggests missing info.',
  },
  {
    icon: <ScanSearch className="w-7 h-7 text-purple-400" />,
    number: '02',
    title: 'AI Analysis',
    description:
      'The engine analyses your profile against 500+ company requirements and ranks your best-fit opportunities.',
  },
  {
    icon: <Award className="w-7 h-7 text-cyan-400" />,
    number: '03',
    title: 'Get Placed',
    description:
      'Apply with one click, prepare with AI coaching, and land your dream role — all on one platform.',
  },
];

const STATS: Stat[] = [
  { label: 'Placement Rate', value: '95%', numericEnd: 95, suffix: '%' },
  { label: 'Avg Package', value: '₹12 LPA', numericEnd: 12, suffix: ' LPA' },
  { label: 'Companies', value: '500+', numericEnd: 500, suffix: '+' },
  { label: 'AI Interactions', value: '1M+', numericEnd: 1, suffix: 'M+' },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'CampusConnect AI transformed our placement process. We went from 72% to 96% placement rate in a single year. The AI matching is scarily accurate.',
    name: 'Dr. Priya Sharma',
    role: 'Director of Placements',
    university: 'IIT Delhi',
  },
  {
    quote:
      'The resume builder and mock interview feature helped me crack my dream role at Google. I felt 10× more prepared than my peers at other colleges.',
    name: 'Arjun Mehta',
    role: 'SDE at Google',
    university: 'NIT Trichy',
  },
  {
    quote:
      'As a recruiter, CampusConnect gives me a curated shortlist of perfectly matched candidates. It cut our campus hiring time by 60%.',
    name: 'Sarah Chen',
    role: 'Talent Acquisition Lead',
    university: 'Microsoft India',
  },
];

const UNIVERSITIES = [
  'IIT Delhi',
  'IIT Bombay',
  'IIT Madras',
  'NIT Trichy',
  'NIT Warangal',
  'BITS Pilani',
  'IIIT Hyderabad',
  'DTU',
  'VIT Vellore',
  'SRM Chennai',
  'NSUT Delhi',
  'IIIT Bangalore',
];

const HERO_STATS = [
  { icon: <GraduationCap className="w-5 h-5 text-blue-400" />, value: '50+', label: 'Universities' },
  { icon: <Users className="w-5 h-5 text-purple-400" />, value: '10K+', label: 'Students Placed' },
  { icon: <Building2 className="w-5 h-5 text-cyan-400" />, value: '500+', label: 'Companies' },
  { icon: <Star className="w-5 h-5 text-amber-400" />, value: '98%', label: 'Satisfaction' },
];

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'API Docs'],
  Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
  Resources: ['Documentation', 'Help Centre', 'Community', 'Webinars', 'Case Studies'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

/* ──────────────────────────────────────────────
   ANIMATION PRESETS
   ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ──────────────────────────────────────────────
   COUNTER HOOK
   ────────────────────────────────────────────── */
function useCounter(end: number, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, startCounting]);
  return count;
}

/* ──────────────────────────────────────────────
   SECTION HEADING COMPONENT
   ────────────────────────────────────────────── */
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <motion.p
        variants={fadeUp}
        className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Outfit'] landing-gradient-text mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="text-slate-400 text-lg">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN LANDING PAGE COMPONENT
   ══════════════════════════════════════════════ */
const LandingPage = () => {
  const navigate = useNavigate();

  /* ── Navbar scroll state ── */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Parallax for hero ── */
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  /* ── Section refs for inView ── */
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: '-100px' });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  /* ── Counter values ── */
  const counter0 = useCounter(STATS[0].numericEnd, 2000, statsInView);
  const counter1 = useCounter(STATS[1].numericEnd, 2000, statsInView);
  const counter2 = useCounter(STATS[2].numericEnd, 2000, statsInView);
  const counter3 = useCounter(STATS[3].numericEnd, 2000, statsInView);
  const counters = [counter0, counter1, counter2, counter3];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ══════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white overflow-x-hidden">
      {/* ─────── NAVBAR ─────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
            >
              <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Sparkles className="w-4 h-4 text-white" />
              </span>
              <span className="text-lg font-bold font-['Outfit'] tracking-tight">
                Campus<span className="landing-gradient-text">Connect AI</span>
              </span>
            </button>

            {/* Center links — hidden on mobile */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const id = link.toLowerCase().replace(/\s+/g, '-');
                return (
                  <button
                    key={link}
                    onClick={() => scrollTo(id)}
                    className="px-3 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {link}
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/register')}
                className="glow-btn"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─────── HERO ─────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] orb-1" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-6"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>AI-Powered Campus Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-['Outfit'] leading-tight tracking-tight"
            >
              The Future of{' '}
              <span className="landing-gradient-text">Campus Intelligence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0"
            >
              Transform your university&apos;s placement cell with AI-driven matching, real-time
              analytics, and automated workflows — all in one beautiful platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
                className="glow-btn"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Play className="w-5 h-5" />}
                onClick={() => alert('Demo video coming soon!')}
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {HERO_STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5"
                >
                  {s.icon}
                  <div>
                    <p className="text-lg font-bold font-['Outfit']">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 60 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="glass rounded-2xl p-6 border border-white/10 shimmer">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">AI Placement Dashboard</p>
                      <p className="text-xs text-slate-500">Live · 2 min ago</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>

                {/* Mini stat row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Placed', val: '1,284', color: 'text-blue-400' },
                    { label: 'Pending', val: '326', color: 'text-amber-400' },
                    { label: 'Offers', val: '2,190', color: 'text-emerald-400' },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl bg-white/5 p-3 text-center">
                      <p className={`text-lg font-bold font-['Outfit'] ${m.color}`}>{m.val}</p>
                      <p className="text-[11px] text-slate-500">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mock chart bars */}
                <div className="flex items-end gap-1.5 h-24">
                  {[40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 95, 68].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.07 }}
                      className="flex-1 rounded-t bg-gradient-to-t from-blue-500/60 to-purple-500/60"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-slate-600">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Floating notification pill */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 80 }}
                className="absolute -bottom-6 -left-6 glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Placement rate up</p>
                  <p className="text-[11px] text-emerald-400 font-medium">+12.4% this month</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent" />
      </section>

      {/* ─────── TRUST / LOGO BAR ─────── */}
      <section className="relative py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-sm text-slate-500 uppercase tracking-widest">
            Trusted by leading universities across India
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="logo-scroll-track">
            {[...UNIVERSITIES, ...UNIVERSITIES].map((name, i) => (
              <span
                key={i}
                className="flex-shrink-0 mx-4 px-5 py-2.5 rounded-lg bg-white/5 border border-white/5 text-sm text-slate-400 font-medium whitespace-nowrap hover:border-blue-500/30 hover:text-white transition-all"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── FEATURES ─────── */}
      <section id="features" className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need"
            description="A comprehensive AI platform that handles every aspect of campus placements — from student profiling to final offer letters."
          />

          <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="feature-card glass rounded-2xl p-6 border border-white/10 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold font-['Outfit'] mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── HOW IT WORKS ─────── */}
      <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
        {/* Subtle bg orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            eyebrow="How It Works"
            title="Three steps to success"
            description="Getting started takes less than 5 minutes. Our AI does the heavy lifting so you can focus on what matters."
          />

          <motion.div
            ref={stepsRef}
            initial="hidden"
            animate={stepsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={stepsInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50 origin-left"
              />
            </div>

            {STEPS.map((s, idx) => (
              <motion.div
                key={s.number}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative text-center"
              >
                {/* Circle */}
                <div className="relative mx-auto w-20 h-20 rounded-full bg-[var(--color-surface)] border-2 border-white/10 flex items-center justify-center mb-6 z-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  {s.icon}
                </div>
                {/* Number badge */}
                <span className="absolute top-0 right-1/2 translate-x-12 -translate-y-1 text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white z-20">
                  {s.number}
                </span>
                <h3 className="text-xl font-bold font-['Outfit'] mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────── STATS / SOCIAL PROOF ─────── */}
      <section id="stats" className="relative py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="gradient-border rounded-2xl p-10 sm:p-14"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((stat, i) => (
                <div key={stat.label}>
                  <p className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] landing-gradient-text counter-value">
                    {stat.label === 'Avg Package' ? '₹' : ''}
                    {counters[i]}
                    {stat.suffix}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────── TESTIMONIALS ─────── */}
      <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by students & educators"
            description="Hear from the people who use CampusConnect AI every day to transform their campus hiring experience."
          />

          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div className="testimonial-track flex w-full">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <div className="gradient-border rounded-2xl p-8 sm:p-10 h-full">
                    <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
                    <p className="text-lg text-slate-300 leading-relaxed mb-8 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold font-['Outfit']">{t.name}</p>
                        <p className="text-sm text-slate-400">
                          {t.role} · {t.university}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────── CTA SECTION ─────── */}
      <section className="relative py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ctaRef}
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative animated-gradient-bg rounded-3xl py-16 sm:py-24 px-6 text-center overflow-hidden"
          >
            {/* Decorative floating elements */}
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-white/10 animate-float" />
            <div className="absolute bottom-10 right-14 w-14 h-14 rounded-full border border-white/10 animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 right-10 w-8 h-8 rounded-lg bg-white/5 rotate-45 animate-float" style={{ animationDelay: '4s' }} />
            <div className="absolute top-16 right-1/3 w-6 h-6 rounded-full bg-white/5 animate-float" style={{ animationDelay: '1s' }} />

            <Sparkles className="w-10 h-10 text-blue-300 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Outfit'] text-white mb-4 leading-tight">
              Ready to transform
              <br />
              your campus?
            </h2>
            <p className="text-lg text-blue-100/70 max-w-xl mx-auto mb-8">
              Join 50+ universities already using CampusConnect AI to revolutionise their placement
              processes and student outcomes.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/register')}
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8"
              rightIcon={<ChevronRight className="w-5 h-5" />}
            >
              Get Started for Free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─────── FOOTER ─────── */}
      <footer className="border-t border-white/5 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <Sparkles className="w-4 h-4 text-white" />
                </span>
                <span className="text-lg font-bold font-['Outfit']">
                  Campus<span className="landing-gradient-text">Connect</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                AI-powered campus intelligence for the modern university.
              </p>
              <div className="flex gap-3">
                {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-500 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} CampusConnect AI. All rights reserved.
            </p>
            <p className="text-sm text-slate-600 flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
