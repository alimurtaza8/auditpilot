
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Types ---
type Report = {
  assessment_date: string;
  overall_score: number;
  maturity_level: string;
  family_scores: Record<string, number>;
  recommendations: string[];
};

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
};

// --- React Components ---
const ScoreCard = ({ score, level }: { score: number; level: string }) => {
  const getScoreColor = () => {
    if (score >= 86) return 'text-green-500';
    if (score >= 71) return 'text-yellow-500';
    if (score >= 51) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      variants={fadeIn}
    >
      <h3 className="text-gray-500 text-lg font-medium mb-4 text-center">Compliance Score</h3>
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#2a7de1"
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor()}`}>{score.toFixed(0)}%</span>
          <span className="text-sm text-gray-500 mt-1">{level}</span>
        </div>
      </div>
    </motion.div>
  );
};

const FamilyScores = ({ scores }: { scores: Record<string, number> }) => (
  <motion.div 
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    variants={fadeIn}
  >
    <h3 className="text-xl font-bold text-gray-800 mb-6">Control Family Scores</h3>
    <div className="space-y-5">
      {Object.entries(scores).map(([family, score], index) => (
        <motion.div 
          key={family}
          className="flex flex-col"
          variants={slideIn}
          custom={index}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between mb-1">
            <span className="font-medium text-gray-700">{family}</span>
            <span className="font-semibold text-gray-600">{score.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <motion.div 
              className="bg-gray-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Recommendations = ({ recommendations }: { recommendations: string[] }) => (
  <motion.div 
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    variants={fadeIn}
  >
    <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
    <ul className="space-y-3">
      {recommendations.map((rec, index) => (
        <motion.li 
          key={index}
          className="flex items-start p-3 bg-gray-50 rounded-lg"
          variants={scaleUp}
          custom={index}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.2 }}
        >
          <div className="flex-shrink-0 mt-1 mr-3">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-700">{rec}</p>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

// AI Text Animation Component
const AnimatedText = ({ phrases }: { phrases: string[] }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed,] = useState(100);
  
  useEffect(() => {
    const handleTyping = () => {
      const fullText = phrases[currentPhrase];
      
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase, phrases, typingSpeed]);

  return (
    <div className="inline-block">
      <span className="text-gray-600 font-bold">{text}</span>
      <span className="ml-1 inline-block w-2 h-8 bg-gray-500 align-bottom animate-pulse"></span>
    </div>
  );
};

const AuditEngine = () => {
  const [assessmentData, setAssessmentData] = useState('');
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const phrases = [
    "AI-Powered Compliance Engine",
    "Automated Risk Analysis",
    "Intelligent Scoring",
    "Smart Recommendations"
  ];

  const handleRunAssessment = async () => {
    setIsLoading(true);
    setError('');
    setReport(null);

    try {
      const parsedData = JSON.parse(assessmentData);
      
      // Use an environment variable for the API URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api/assess';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const reportData: Report = await response.json();
      setReport(reportData);
    } catch  {
      setError('Failed to run assessment. Please check your JSON data and ensure the backend server is running.');
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedText phrases={phrases} />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Transform healthcare compliance with our intelligent scoring engine
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Panel */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
            variants={fadeIn}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Compliance Evaluation</h3>
              <p className="text-gray-600">
                Enter your audit data to receive instant compliance scoring and recommendations
              </p>
            </div>

            <div className="relative">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <textarea
                  className="w-full h-64 p-4 text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none font-mono text-sm resize-none bg-white"
                  value={assessmentData}
                  onChange={(e) => setAssessmentData(e.target.value)}
                  placeholder="Paste your JSON audit data here..."
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setAssessmentData(JSON.stringify({
                    'AC': [{'control': 'AC-1', 'base_score': 75, 'enhancement': 'moderate'}, {'control': 'AC-2', 'base_score': 70, 'enhancement': 'moderate'}],
                    'IA': [{'control': 'IA-1', 'base_score': 60, 'enhancement': 'none'}, {'control': 'IA-5', 'base_score': 65, 'enhancement': 'none'}],
                    'SC': [{'control': 'SC-7', 'base_score': 70, 'enhancement': 'moderate'}, {'control': 'SC-8', 'base_score': 75, 'enhancement': 'moderate'}],
                    'RA': [{'control': 'RA-3', 'base_score': 40, 'enhancement': 'none'}, {'control': 'RA-5', 'base_score': 50, 'enhancement': 'none'}],
                    'IR': [{'control': 'IR-4', 'base_score': 55, 'enhancement': 'none'}, {'control': 'IR-6', 'base_score': 60, 'enhancement': 'none'}]
                  }, null, 2))}
                  className="text-gray-600 font-medium hover:text-gray-800 transition-colors"
                >
                  Load Sample Data
                </button>
                
                <button
                  onClick={handleRunAssessment}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-colors duration-300 disabled:opacity-50"
                  disabled={isLoading || !assessmentData}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </div>
                  ) : 'Run Assessment'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <div className="space-y-8">
            {error && (
              <motion.div 
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}

            {isLoading && (
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-xl text-gray-700 font-medium">
                  <AnimatedText phrases={[
                    "Analyzing compliance patterns...",
                    "Evaluating security controls...",
                    "Assessing risk maturity...",
                    "Generating recommendations..."
                  ]} />
                </p>
                <p className="text-gray-500 mt-4">This usually takes 15-30 seconds...</p>
              </motion.div>
            )}

            <AnimatePresence>
              {report && (
                <>
                  <ScoreCard score={report.overall_score} level={report.maturity_level} />
                  <FamilyScores scores={report.family_scores} />
                  <Recommendations recommendations={report.recommendations} />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditEngine;