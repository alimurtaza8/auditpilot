'use client';

import React, { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { controlsData } from '../lib/controls';
import { Tab } from '@headlessui/react';

// --- Helper Types ---
type AnalysisResult = {
  justification: string;
  base_score: number;
  final_score?: number;
};

type PredictiveResult = {
  before_report: { overall_score: number; maturity_level: string; };
  after_report: { overall_score: number; maturity_level: string; };
};


// --- Main Dashboard Component ---
const AuditEngine = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            AuditPilot AI Governance Suite
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Your central hub for checking AI compliance, predicting future risks, and monitoring system activity.
          </p>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-slate-900/5 p-1 max-w-2xl mx-auto">
            {['Compliance Engine', 'Predictive Modeling', 'Behavioral Analytics'].map((category) => (
              <Tab as={Fragment} key={category}>
                {({ selected }: { selected: boolean }) => (
                  <button
                    className={`
                      w-full rounded-lg py-2.5 text-sm font-medium leading-5
                      ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2
                      ${selected
                        ? 'bg-white text-slate-900 shadow'
                        : 'text-slate-600 hover:bg-white/[0.12] hover:text-white'
                      }
                    `}
                  >
                    {category}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-8">
            <Tab.Panel><ComplianceEnginePanel /></Tab.Panel>
            <Tab.Panel><PredictiveModelingPanel /></Tab.Panel>
            <Tab.Panel><BehavioralAnalyticsPanel /></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

      </div>
    </section>
  );
};


// --- 1. Compliance Engine Panel ---
const ComplianceEnginePanel = () => {
  const [controlId, setControlId] = useState<string>('AC-6');
  const [evidence, setEvidence] = useState<string>('');
  const [enhancement, setEnhancement] = useState<string>('none');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleRunAssessment = async () => {
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await fetch('https://ai-compliance-backend-production.up.railway.app/api/analyze_and_score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ control_id: controlId, evidence, enhancement }),
      });
      if (!response.ok) throw new Error((await response.json()).details || 'API Error');
      setResult(await response.json());
    } catch {
      setError("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSample = () => {
      setControlId('AC-6');
      setEnhancement('moderate');
      setEvidence("Our official 'User Access Policy' states that AI assistants can only view anonymous patient information for their analysis tasks. To see any personal patient details, a special request must be submitted through our ticketing system. This request requires approval from two separate managers and is permanently recorded for security audits.");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input label="Control ID">
          <Select value={controlId} onChange={setControlId}>
            {Object.keys(controlsData)
              .filter(id => id !== 'BA-1') // Exclude behavioral control from this panel
              .map(id => (
              <option key={id} value={id}>{id}: {controlsData[id].question.substring(0, 40)}...</option>
            ))}
          </Select>
        </Input>
        <Input label="Enhancement Level">
          <Select value={enhancement} onChange={setEnhancement}>
            <option value="none">None</option>
            <option value="moderate">Moderate</option>
            <option value="significant">Significant</option>
            <option value="transformational">Transformational</option>
          </Select>
        </Input>
      </div>
      <Input label="Evidence">
        <TextArea value={evidence} onChange={setEvidence} placeholder="Paste your evidence here, like a policy document or system configuration..." rows={8} />
      </Input>
      <div className="mt-6 flex items-center justify-center space-x-4">
        <ActionButton onClick={handleRunAssessment} disabled={isLoading || !evidence}>
          {isLoading ? 'Analyzing...' : 'Run Analysis'}
        </ActionButton>
        <ActionButton secondary onClick={loadSample} disabled={isLoading}>
            Load User Access Policy Sample
        </ActionButton>
      </div>
      <AnimatePresence>
        {isLoading && <StatusIndicator>AI is thinking...</StatusIndicator>}
        {error && <StatusIndicator type="error">{error}</StatusIndicator>}
        {result && (
          <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScoreDisplay score={result.base_score} title="AI Base Score" />
              <ScoreDisplay score={result.final_score!} title="Final Calculated Score" />
            </div>
            <JustificationDisplay text={result.justification} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- 2. Predictive Modeling Panel ---
const PredictiveModelingPanel = () => {
    const [baselineJson, setBaselineJson] = useState('');
    const [remediationJson, setRemediationJson] = useState('');
    const [result, setResult] = useState<PredictiveResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLoadSample = () => {
        const sampleBaseline = {
            "Access Control (AC)": [{"control": "AC-1", "base_score": 20, "enhancement": "none"}],
            "Audit (AU)": [{"control": "AU-2", "base_score": 45, "enhancement": "none"}],
            "Identification (IA)": [{"control": "IA-1", "base_score": 55, "enhancement": "none"}]
        };
        const sampleRemediation = {
            "Audit (AU)": [{"control": "AU-2", "new_score": 90}]
        };
        setBaselineJson(JSON.stringify(sampleBaseline, null, 2));
        setRemediationJson(JSON.stringify(sampleRemediation, null, 2));
    };

    const handleRunPrediction = async () => {
        setIsLoading(true);
        setError('');
        setResult(null);
        try {
            // Backend expects the short family name (e.g., "AC"), so we need to convert back from the friendly name
            // const convertToBackendFormat = (data) => {
            //     const backendData: { [key: string]} = {};
            //     for (const key in data) {
            //         const shortName = key.match(/\(([^)]+)\)/);
            //         if (shortName && shortName[1]) {
            //             backendData[shortName[1]] = data[key];
            //         }
            //     }
            //     return backendData;
            // };


            const convertToBackendFormat = (data: { [key: string]: object }) => {
    const backendData: { [key: string]: object } = {};
    for (const key in data) {
        const shortName = key.match(/\(([^)]+)\)/);
        if (shortName && shortName[1]) {
            backendData[shortName[1]] = data[key];
        }
    }
    return backendData;
};


            const baseline_scores = convertToBackendFormat(JSON.parse(baselineJson));
            const remediation_plan = convertToBackendFormat(JSON.parse(remediationJson));

            const response = await fetch('https://ai-compliance-backend-production.up.railway.app/api/predictive_modeling', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ baseline_scores, remediation_plan }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.details || 'API Error');
            }
            setResult(await response.json());
        } catch {
            setError('Failed to run prediction. Please check your JSON data format.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-4xl mx-auto">
            <p className="text-center text-slate-600 mb-6">See how fixing a problem area can improve your overall compliance score. This tool lets you model a &apos;What-If&apos; scenario.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Input label="Current Scores (JSON)">
                    <TextArea value={baselineJson} onChange={setBaselineJson} placeholder="Paste your current scores here..." rows={10} />
                </Input>
                <Input label="Improvement Plan (JSON)">
                    <TextArea value={remediationJson} onChange={setRemediationJson} placeholder="Describe the improvement you want to model..." rows={10} />
                </Input>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-4">
                <ActionButton onClick={handleRunPrediction} disabled={isLoading || !baselineJson || !remediationJson}>
                    {isLoading ? 'Calculating...' : 'Run Prediction'}
                </ActionButton>
                <ActionButton secondary onClick={handleLoadSample} disabled={isLoading}>
                    Load &apos;Improve an Audit Control&apos; Sample
                </ActionButton>
            </div>
            <AnimatePresence>
                {isLoading && <StatusIndicator>AI is forecasting...</StatusIndicator>}
                {error && <StatusIndicator type="error">{error}</StatusIndicator>}
                {result && (
                    <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                       <ScoreDisplay score={result.before_report.overall_score} title="Score Before" subtitle={result.before_report.maturity_level} />
                       <ScoreDisplay score={result.after_report.overall_score} title="Score After" subtitle={result.after_report.maturity_level} isNew />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- 3. Behavioral Analytics Panel ---
const BehavioralAnalyticsPanel = () => {
    const [logEvidence, setLogEvidence] = useState('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const sampleLog = `Timestamp: 2:15 AM - User 'dr_anderson' logged in successfully from a hospital workstation.
Timestamp: 2:16 AM - User 'dr_anderson' viewed the record for patient 'PID-12345'.
Timestamp: 3:30 AM - WARNING: User 'dr_anderson' attempted to export 5,000 patient records to an external cloud drive.
Timestamp: 3:30 AM - ALERT: The firewall blocked the suspicious data export attempt.`;

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError('');
        setResult(null);
        try {
            const response = await fetch('https://ai-compliance-backend-production.up.railway.app/api/behavioral_analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ log_evidence: logEvidence }),
            });
            if (!response.ok) throw new Error((await response.json()).details || 'API Error');
            setResult(await response.json());
        } catch  {
            setError("Error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 max-w-4xl mx-auto">
            <Input label="System Activity Logs for Analysis">
                <TextArea value={logEvidence} onChange={setLogEvidence} placeholder="Paste system or user activity logs here to detect anomalies..." rows={8} />
            </Input>
            <div className="mt-6 flex items-center justify-center space-x-4">
                <ActionButton onClick={handleAnalyze} disabled={isLoading || !logEvidence}>
                    {isLoading ? 'Analyzing...' : 'Analyze Activity'}
                </ActionButton>
                <ActionButton secondary onClick={() => setLogEvidence(sampleLog)} disabled={isLoading}>
                    Load Sample Security Alert Log
                </ActionButton>
            </div>
            <AnimatePresence>
                {isLoading && <StatusIndicator>AI is monitoring...</StatusIndicator>}
                {error && <StatusIndicator type="error">{error}</StatusIndicator>}
                {result && (
                    <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y:0 }} className="mt-8">
                        <ScoreDisplay score={result.base_score} title="Anomaly Score" subtitle="Higher score = higher risk" />
                        <JustificationDisplay text={result.justification} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// --- Common UI Components ---
const Input = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        {children}
    </div>
);

const Select = ({ value, onChange, children }: { value: string, onChange: (val: string) => void, children: React.ReactNode }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none">
        {children}
    </select>
);

const TextArea = ({ value, onChange, placeholder, rows=6 }: { value: string, onChange: (val: string) => void, placeholder: string, rows?: number }) => (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className="w-full p-3 font-mono text-sm border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none" />
);

const ActionButton = ({ onClick, disabled, secondary=false, children }: { onClick: () => void, disabled: boolean, secondary?: boolean, children: React.ReactNode }) => (
    <button onClick={onClick} disabled={disabled} className={`px-6 py-3 font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50
        ${secondary ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:bg-slate-200' : 'bg-slate-800 text-white hover:bg-slate-700 disabled:bg-slate-800'}`}>
        {children}
    </button>
);

const ScoreDisplay = ({ score, title, subtitle, isNew=false }: { score: number; title: string; subtitle?: string; isNew?: boolean }) => {
    const getScoreColor = (s: number) => {
        if (s === undefined || s === null) return 'text-slate-500';
        if (s >= 86) return 'text-green-500';
        if (s >= 71) return 'text-yellow-500';
        if (s >= 51) return 'text-orange-500';
        return 'text-red-500';
    };
    return (
        <div className={`relative p-6 rounded-lg ${isNew ? 'bg-slate-50' : 'bg-transparent'}`}>
            {isNew && <div className="absolute top-2 right-2 text-xs font-bold bg-green-200 text-green-800 px-2 py-1 rounded-full">NEW</div>}
            <h3 className="text-lg font-medium text-slate-500 text-center mb-2">{title}</h3>
            <p className={`text-7xl font-bold text-center tracking-tighter ${getScoreColor(score)}`}>{score !== undefined ? score.toFixed(0) : 'N/A'}</p>
            {subtitle && <p className="text-center text-slate-500 mt-2">{subtitle}</p>}
        </div>
    );
};

const JustificationDisplay = ({ text }: { text: string }) => (
  <div className="bg-slate-100 border-l-4 border-slate-400 p-4 rounded-r-lg mt-6">
    <h4 className="font-bold text-slate-800 mb-2">AI Justification</h4>
    <p className="text-slate-700 italic">&quot;{text}&quot;</p>
  </div>
);

const StatusIndicator = ({ type = 'info', children }: { type?: 'info' | 'error', children: React.ReactNode }) => (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`text-center mt-8 p-4 rounded-lg ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'}`}>
        {children}
    </motion.div>
);

export default AuditEngine;