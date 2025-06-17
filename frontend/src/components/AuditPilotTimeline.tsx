import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Settings, 
  Brain, 
  BarChartBig, 
  Shield, 
  Target, 
  Lightbulb, 
  RefreshCw, 
  Eye, 
  FileText, 
  Database, 
  Clock, 
  ArrowRight,
  Zap,
  TrendingUp
} from 'lucide-react';

const AuditPilotTimeline = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full mb-6">
            <Activity className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-800">Agent-Based Acceleration Model</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AuditPilot <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">FastTrack™</span> ARC-AMPE Timeline
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Traditional compliance takes months. AuditPilot gets you audit-ready in days.
          </p>
          
          {/* Strategic Advantage Callout */}
          <div className="max-w-4xl mx-auto bg-white border-2 border-gray-300 rounded-xl p-6 mb-12 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-gray-700 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Strategic Advantage</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              AuditPilot is not a consulting service — it&apos;s an AI agent. Where they sell hours, you sell automated, always-on intelligence.
            </p>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div 
          className="mb-16 bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-900 text-white p-6">
            <h3 className="text-2xl font-bold text-center">AuditPilot vs Traditional Consulting</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Stage</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">NuHarbor Timeline</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">AuditPilot Advantage</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Kickoff & Onboarding</td>
                  <td className="px-6 py-4 text-gray-600">Week 1</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">Day 1 - Instant deployment</td>
                  <td className="px-6 py-4 text-gray-600">AI agent auto-ingests org data</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Policy & Control Mapping</td>
                  <td className="px-6 py-4 text-gray-600">Weeks 2–4</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">Day 2–3 - Auto-mapped via AI</td>
                  <td className="px-6 py-4 text-gray-600">Agent maps assets to ARC-AMPE & NIST 800-53</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Risk Assessment</td>
                  <td className="px-6 py-4 text-gray-600">Weeks 4–6</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">Day 4–5 - Real-time risk scoring</td>
                  <td className="px-6 py-4 text-gray-600">Continuous AI scanning flags control gaps</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Remediation Strategy</td>
                  <td className="px-6 py-4 text-gray-600">Weeks 6–8</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">Day 5–10 - Smart Playbook Generator</td>
                  <td className="px-6 py-4 text-gray-600">Tailored remediation roadmap with role-specific tasks</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Ongoing Monitoring</td>
                  <td className="px-6 py-4 text-gray-600">After Week 8</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">Always-on</td>
                  <td className="px-6 py-4 text-gray-600">Daily compliance scoring, automated evidence collection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12 pl-8 md:pl-0">
            {/* Timeline Item 1 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-4 h-4 rounded-full bg-white animate-ping absolute opacity-75"></div>
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div className="ml-6 md:ml-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">DAY 0</span>
                      <h3 className="text-xl font-bold text-gray-900">Onboarding</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Kickoff AuditPilot deployment</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Instant deployment - AI agent auto-ingests org data</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Where others take weeks, we take minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Item 2 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-4 h-4 rounded-full bg-white animate-ping absolute opacity-75"></div>
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="ml-6 md:ml-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">DAY 1-2</span>
                      <h3 className="text-xl font-bold text-gray-900">AI-Ingest & Control Mapping</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Automatically identify and map organizational controls</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <BarChartBig className="w-4 h-4 mr-2" />
                      <span>Agent maps assets to ARC-AMPE & NIST 800-53 using pre-trained logic</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">87% faster than traditional methods</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Item 3 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-4 h-4 rounded-full bg-white animate-ping absolute opacity-75"></div>
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div className="ml-6 md:ml-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">DAY 3-4</span>
                      <h3 className="text-xl font-bold text-gray-900">Risk Scoring & Evidence Scan</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Assess compliance posture and collect audit evidence</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Shield className="w-4 h-4 mr-2" />
                      <span>Continuous AI scanning flags control gaps, classifies risks</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Real-time risk scoring with 94% accuracy</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Item 4 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-4 h-4 rounded-full bg-white animate-ping absolute opacity-75"></div>
                <Target className="w-4 h-4 text-white" />
              </div>
              <div className="ml-6 md:ml-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">DAY 5-6</span>
                      <h3 className="text-xl font-bold text-gray-900">Gap Analysis + Remediation Path</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Generate actionable steps to address control gaps</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      <span>Generates tailored remediation roadmap with role-specific tasks</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Smart Playbook Generator reduces remediation time by 67%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Item 5 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-4 h-4 rounded-full bg-white animate-ping absolute opacity-75"></div>
                <RefreshCw className="w-4 h-4 text-white" />
              </div>
              <div className="ml-6 md:ml-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">DAY 7+</span>
                      <h3 className="text-xl font-bold text-gray-900">Continuous Monitoring + Reporting</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Provide ongoing audit readiness tracking</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-2" />
                      <span>Daily compliance scoring, automated evidence collection</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Always-on compliance cockpit with real-time alerts</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline Item 6 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-8 top-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-4 h-4 rounded-full bg-white animate-ping absolute opacity-75"></div>
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="ml-6 md:ml-12 md:pl-12">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">WEEKLY</span>
                      <h3 className="text-xl font-bold text-gray-900">Auto-generated CMS/Auditor Evidence Packs</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Prepare compliance documentation packages</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Database className="w-4 h-4 mr-2" />
                      <span>Automated documentation with 83% reduction in manual work</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-600 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700">Audit-ready packages generated in minutes, not days</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Strategic Differentiators */}
        <motion.div 
          className="mb-16 bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Strategic Differentiators to Emphasize
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Speed to Compliance = Speed to Revenue</h4>
                  <p className="text-gray-600">&quot;Where others take 90 days to get you audit-ready, AuditPilot gets you actionable insight in 5. That&apos;s not just compliance — that&apos;s momentum.&quot;</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Agent-Led, Not Consultant-Led</h4>
                  <p className="text-gray-600">&quot;AuditPilot doesn&apos;t send a team of consultants. It sends a tireless, adaptive AI agent that learns your systems and maps your compliance in real-time.&quot;</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compliance as a Service (CaaS)</h4>
                  <p className="text-gray-600">&quot;We don&apos;t do one-time assessments. We give you a continuously running compliance cockpit — daily scores, alerts, and readiness tracking.&quot;</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Visual Dashboards vs. PDFs</h4>
                  <p className="text-gray-600">&quot;NuHarbor delivers reports. We deliver dashboards. Control health, audit status, and remediations are one click away — not buried in a binder.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Strategic Messaging Lines */}
        <motion.div 
          className="mb-16 bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Strategic Messaging Lines
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-lg font-medium text-center">
                &quot;Traditional compliance takes months. AuditPilot gets you audit-ready in days.&quot;
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-lg font-medium text-center">
                &quot;Consultants check. Agents track. AuditPilot lives in your systems, not your inbox.&quot;
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-lg font-medium text-center">
                &quot;ARC-AMPE compliance shouldn&apos;t be a project — it should be your platform.&quot;
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-lg font-medium text-center">
                &quot;NuHarbor delivers reports. We deliver real-time.&quot;
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Still using a consultant? Compare your last ARC-AMPE audit to our 7-day AI scorecard.
          </p>
          <motion.button 
            className="group bg-gray-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all duration-300 mx-auto shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Compare Your Timeline</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditPilotTimeline;