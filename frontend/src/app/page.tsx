'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award, 
  ArrowRight,
  Star,
  Activity,
  Target,
  Brain,
  Database,
  Settings,
  Eye,
  FileText,
  Lightbulb,
  Play
} from 'lucide-react'

import AuditEngine from '@/components/AuditEngine'
import AuditPilotTimeline from '@/components/AuditPilotTimeline'
import ContactModal from '@/components/ContactModal'


const Home = () => {
  const [,setIsScrolled] = useState(false)
  const [isContactModalOpen, setContactModalOpen] = useState(false)

  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)
  const comparisonRef = useRef(null)
  
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const isComparisonInView = useInView(comparisonRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
  
  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  const metrics = [
    { value: "83%", label: "Reduction in Compliance Documentation Workload", icon: FileText },
    { value: "67%", label: "Decrease in Audit Preparation Time", icon: Clock },
    { value: "91%", label: "Improvement in Real-time Compliance Visibility", icon: Eye },
    { value: "4.8x", label: "ROI Within First Year", icon: TrendingUp }
  ]

  const capabilities = [
    {
      title: "Compliance Orchestration Suite™",
      description: "Automatically coordinates and manages the entire compliance lifecycle, ensuring policy adherence and dynamic control management.",
      icon: Settings,
      gradient: "from-blue-50 to-indigo-50"
    },
    {
      title: "AI-Driven Readiness Framework™", 
      description: "Identifies compliance gaps with 87% accuracy and optimizes control selection based on your specific risk profile.",
      icon: Brain,
      gradient: "from-purple-50 to-pink-50"
    },
    {
      title: "Predictive Compliance Modeling™",
      description: "Creates digital twins of your compliance environment to simulate changes and forecast status.",
      icon: Target,
      gradient: "from-green-50 to-emerald-50"
    },
    {
      title: "Evidence Automation System™",
      description: "Collects and maintains compliance evidence in real-time, eliminating 83% of manual documentation tasks.",
      icon: Database,
      gradient: "from-orange-50 to-red-50"
    },
    {
      title: "Behavioral Analytics™",
      description: "Reduces false positive alerts by 76% through AI-driven policy, intent enforcement and anomaly detection.",
      icon: Activity,
      gradient: "from-teal-50 to-cyan-50"
    },
    {
      title: "Healthcare System Integration",
      description: "Pre-built connectors for Epic, Cerner, Meditech, and other healthcare platforms with 94% coverage.",
      icon: Shield,
      gradient: "from-yellow-50 to-amber-50"
    }
  ]

  const challenges = [
    "37% increase in healthcare data breaches",
    "Average breach cost: $12.3 million", 
    "5.8x RTLS dedicates to compliance",
    "5,000 pages per annual documentation",
    "12-17% of clinical time on compliance",
    "76% struggle to retain compliance staff"
  ]

  const solutions = [
    "AI-powered compliance automation",
    "Built specifically for healthcare", 
    "ARC-AMPER Framework based",
    "Predictive compliance modeling",
    "Real-time evidence collection",
    "Dynamic assurance monitoring"
  ]

  const traditionalVsAuditPilot = {
    traditional: [
      "Manual documentation processes",
      "Point-in-time assessments", 
      "Spreadsheet-based tracking",
      "23% error rate in documentation",
      "Reactive remediation approach",
      "Siloed and slow approvals",
      "1,200 hours annual documentation"
    ],
    auditpilot: [
      "Automated evidence collection",
      "Continuous dynamic assurance",
      "AI-powered orchestration", 
      "Real-time compliance visibility",
      "Proactive issue identification",
      "Integrated cross-functional workflow",
      "67% faster compliance achievement"
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {/* <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="relative w-40 h-10 md:w-44 md:h-12">
                <Image 
                  src="/images/logo.jpg" 
                  alt="AuditPilot Logo" 
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            {/* <div className="hidden md:flex items-center space-x-8 ml-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors">Solutions</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div> */}
            
            {/* Mobile Menu Button */}
            {/* <button 
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div> */}
          
          {/* Mobile Menu */}
          {/* {mobileMenuOpen && (
            <div className="md:hidden bg-white py-4 px-4 shadow-lg rounded-lg mt-2">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#features" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#solutions" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solutions
                </a>
                <a 
                  href="#pricing" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.nav> */} 



      {/* Navigation */}
{/* <motion.nav 
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
  }`}
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6 }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-center items-center h-24"> {/* Increased height */}
      {/* <div className="relative w- h-14"> {/* Larger logo size */}
        {/* <Image  
      //     src="/images/logo.jpg" 
      //     alt="AuditPilot Logo" 
      //     layout="fill"
      //     objectFit="contain"
      //     priority
      //     className="transition-all duration-300 hover:scale-105" // Subtle hover effect
      //   />
      {/* // </div> 
    // </div> */}
{/* // </motion.nav> */} 

<motion.div 
  className="absolute top-0 left-0 right-0 z-50 flex justify-center items-center py-6"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <div className="relative w-full max-w-[380px] h-16 md:max-w-[460px] md:h-40">
    <Image 
      src="/images/logo.jpg" 
      alt="AuditPilot Logo" 
      layout="fill"
      objectFit="contain"
      priority
      className="transition-all duration-500 hover:scale-[1.03]"
    />
  </div>
</motion.div>



      {/* Hero Section */}
      {/* <motion.section 
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-48 md:pb-28"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23f3f4f6'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          backgroundColor: '#020617'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div variants={fadeInUp}>
            <Badge className="bg-blue-900/50 border border-blue-400 text-blue-300 py-2 px-5 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Patent-Pending AI Technology
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mt-8 leading-tight"
          >
            Audit-Ready in Months, <br/> Not Years.
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-slate-300"
          >
            The only ARC-AMPE-native, AI agent that continuously maps 300+ controls to your environment, creating dynamic audit evidence for Medicaid, Medicare, and commercial payer organizations.
          </motion.p>
          
          <motion.div 
            variants={staggerContainer}
            animate="animate"
            initial="initial"
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button variants={fadeInUp} className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg transform transition-transform duration-300 hover:scale-105">
              <Play className="w-5 h-5 mr-3" />
              See Demo
            </motion.button>
            <motion.button 
              variants={fadeInUp} 
              onClick={() => setContactModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-100 bg-slate-800/50 hover:bg-slate-700/50 md:py-4 md:text-lg md:px-10 shadow-sm transform transition-transform duration-300 hover:scale-105"
            >
              Book a Consultation
            </motion.button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              <span>Enterprise Ready</span>
            </div>
          </motion.div>
        </div>
      </motion.section> */}



       <section ref={heroRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">About Us and Book a Consultation</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform
                <span className="block text-gray-600 mt-2">Healthcare</span>
                <span className="block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mt-2">
                  Compliance
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                AuditPilot delivers AI-powered compliance automation specifically designed for healthcare, 
                eliminating inefficiencies and transforming how you manage patient records and medical imaging.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="group bg-gray-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setContactModalOpen(true)}
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* <motion.button variants={fadeInUp} className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg transform transition-transform duration-300 hover:scale-105">
              <Play className="w-5 h-5 mr-3" />
              See Demo
            </motion.button>
            <motion.button 
              variants={fadeInUp} 
              onClick={() => setContactModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-100 bg-slate-800/50 hover:bg-slate-700/50 md:py-4 md:text-lg md:px-10 shadow-sm transform transition-transform duration-300 hover:scale-105"
            >
              Book a Consultation
            </motion.button>     */}

                <motion.button 
                  className="group border-2 border-gray-300 text-gray-700 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 pt-8">
                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">127+</div>
                  <div className="text-sm text-gray-600">Healthcare Organizations</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">94%</div>
                  <div className="text-sm text-gray-600">Reduced Compliance Stress</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
                <div className="text-center min-w-[120px]">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">$12.3M</div>
                  <div className="text-sm text-gray-600">Average Breach Cost Saved</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative mt-12 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-2xl border border-indigo-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl"></div>
                <div className="relative overflow-hidden rounded-xl">
                  <div className="relative aspect-video w-full">
                    <Image
                      src="/images/imagecheck.jpg" // Replace with your dashboard image
                      alt="AuditPilot Dashboard"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  {/* <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <Shield className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <div className="font-semibold text-gray-900">Healthcare Compliance Dashboard</div>
                        <div className="text-sm text-gray-600">Real-time monitoring and automation</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              
              {/* <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-700">
                    <div>Compliance Status</div>
                    <div className="text-green-600">100% Compliant</div>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section ref={statsRef} className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate={isStatsInView ? "animate" : "initial"}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform delivers measurable improvements across all compliance metrics
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={isStatsInView ? "animate" : "initial"}
          >
            {metrics.map((metric, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 transition-colors">
                  <metric.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-gray-600 text-sm md:text-base leading-relaxed">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Audit Engine */}

      <AuditEngine />




      {/* dashboard page */}


      {/* Dashboard Section */}


      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About AuditPilot</h2>
                <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
                  <p>
                    AuditPilot is at the forefront of developing AI solutions to help hospitals and healthcare 
                    providers eliminate inefficiencies and save time and money when managing patient health 
                    records and medical imaging with advanced automation.
                  </p>
                  <p>
                    We are pioneering the first AI Agent solution designed specifically for healthcare, 
                    delivering intelligent, automated solutions that enhance efficiency, streamline workflows, 
                    and improve patient outcomes.
                  </p>
                  <p>
                    At AuditPilot, we prioritize innovation, developing AI-driven healthcare solutions to meet 
                    the highest standards of accuracy, security, and reliability. Our core values are{' '}
                    <span className="font-semibold text-gray-900">integrity, innovation, and impact</span>, 
                    aiming to make AI integration in healthcare seamless, intuitive, and powerful.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 overflow-hidden">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/images/imagenew.png" // Replace with your team image
                    alt="Healthcare Team"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-xl shadow-md text-center">
                    <Award className="w-8 h-8 text-gray-900 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900">Integrity</div>
                    <div className="text-sm text-gray-600 mt-1">Highest ethical standards</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md text-center">
                    <Lightbulb className="w-8 h-8 text-gray-900 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900">Innovation</div>
                    <div className="text-sm text-gray-600 mt-1">Cutting-edge AI solutions</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md text-center col-span-2">
                    <Target className="w-8 h-8 text-gray-900 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900">Impact</div>
                    <div className="text-sm text-gray-600 mt-1">Transforming healthcare compliance</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Healthcare Compliance Crisis</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Healthcare organizations face unprecedented compliance challenges. AuditPilot provides the solution.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Challenge */}
            <motion.div 
              className="bg-gradient-to-br from-red-50 to-red-100 p-6 md:p-8 rounded-2xl border border-red-200"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                  <XCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">The Challenge</h3>
              </div>
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Solution */}
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-2xl border border-green-200"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">The Solution</h3>
              </div>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{solution}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section ref={featuresRef} id="features" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate={isFeaturesInView ? "animate" : "initial"}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Capabilities</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI-powered solutions designed specifically for healthcare compliance
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            animate={isFeaturesInView ? "animate" : "initial"}
          >
            {capabilities.map((capability, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${capability.gradient} p-6 md:p-8 rounded-2xl border border-gray-200 group hover:shadow-xl transition-all duration-300`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center mb-4 md:mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <capability.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{capability.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{capability.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section ref={comparisonRef} className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            animate={isComparisonInView ? "animate" : "initial"}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transform Your Compliance Journey</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              See the dramatic difference between traditional compliance methods and AuditPilot&apos;s AI-powered approach
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Traditional Approach */}
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200"
              initial={{ opacity: 0, x: -50 }}
              animate={isComparisonInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Traditional Approach</h3>
              </div>
              <div className="space-y-4">
                {traditionalVsAuditPilot.traditional.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isComparisonInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 mt-1 md:mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* AuditPilot Approach */}
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200"
              initial={{ opacity: 0, x: 50 }}
              animate={isComparisonInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">AuditPilot Approach</h3>
              </div>
              <div className="space-y-4">
                {traditionalVsAuditPilot.auditpilot.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isComparisonInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-1 md:mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Seamless Integration</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Pre-built connectors for all major healthcare platforms with 94% coverage
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Epic', 'Cerner', 'Meditech', 'Allscripts', 'athenahealth', 'NextGen'].map((platform, index) => (
              <motion.div 
                key={index}
                className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center h-20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-semibold text-gray-700">{platform}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




        {/* Time Line Section */}

            <AuditPilotTimeline />







      {/* CTA Section */}
    

      {/* Footer */}
      <footer className="bg-white py-12 md:py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="relative w-36 h-9 md:w-40 md:h-32">
                  <Image 
                    src="/images/logo.jpg" 
                    alt="AuditPilot Logo" 
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 max-w-md">
                Transforming healthcare compliance with AI-powered automation. 
                Helping healthcare organizations eliminate inefficiencies and improve patient outcomes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#features" className="hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#solutions" className="hover:text-gray-900 transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 AuditPilot. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  )
}

export default Home