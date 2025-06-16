import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Brain, 
  TrendingDown, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

// --- More Specific Type Definitions ---

interface Agent {
  id: string;
  name: string;
  protocol: string;
  trust_score: number;
}

interface OrchestrationResultData {
  protocol?: string;
  agent?: Agent;
  task_id?: string;
  [key: string]: unknown;
}

interface OrchestrationResult {
  type: 'agent_selection' | 'task_created';
  data: OrchestrationResultData;
}

interface TrustDriftResult {
  task?: number;
  trust_score?: number;
  delta?: number;
  reason?: string;
  type?: 'reassignment';
  from_agent?: string;
  to_agent?: string;
}

type BillingTask = Record<string, unknown>;

interface BillingEvent {
  task_id: string;
  amount: number;
  fee_type: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  action_type: string;
  resource: string;
  [key: string]: unknown;
}

interface BillingResults {
  tasks: BillingTask[];
  billing_events: BillingEvent[][];
  audit_logs: AuditLog[];
}

interface DemoResults {
  scenario: string;
  data: OrchestrationResult[] | TrustDriftResult[] | BillingResults;
}

// --- Component Implementation ---

const DemoScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [scenarioProgress, setScenarioProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [demoResults, setDemoResults] = useState<DemoResults | null>(null);
  const { toast } = useToast();

  const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

  const { data: agents } = useQuery<Agent[]>({
    queryKey: ['demo-agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .order('trust_score', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const runOrchestrationDemo = useMutation({
    mutationFn: async (): Promise<OrchestrationResult[]> => {
      const steps = [
        { description: 'Parsing natural language input...', delay: 1000 },
        { description: 'Analyzing task requirements...', delay: 1500 },
        { description: 'Selecting best agent based on trust score...', delay: 1000 },
        { description: 'Assigning task to agent...', delay: 2000 },
        { description: 'Task execution complete!', delay: 1000 }
      ];

      const results: OrchestrationResult[] = [];
      
      for (let index = 0; index < steps.length; index++) {
        const step = steps[index];
        setScenarioProgress(((index + 1) / steps.length) * 100);
        
        if (index === 2) { // Step 3
          const protocol = naturalLanguageInput.toLowerCase().includes('web') ? 'nlweb' : 'mcp';
          const selectedAgent = agents?.find(agent => agent.protocol === protocol) || agents?.[0];
          results.push({ type: 'agent_selection', data: { protocol, agent: selectedAgent } });
        }
        
        if (index === 3) { // Step 4
          const { data, error } = await supabase.functions.invoke('assign-agent-task', {
            body: {
              protocol: 'nlweb',
              task_type: 'nlp_processing',
              input_data: { description: naturalLanguageInput },
              user_id: DEMO_USER_ID
            }
          });
          if (error) throw error;
          if (data) {
            results.push({ type: 'task_created', data });
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, step.delay));
      }
      return results;
    },
    onSuccess: (data) => {
      setDemoResults({ scenario: 'orchestration', data });
      toast({
        title: "Orchestration Demo Complete",
        description: "Natural language input successfully processed and assigned to agent",
      });
    },
  });

  const runTrustDriftDemo = useMutation({
    mutationFn: async (): Promise<TrustDriftResult[]> => {
       const targetAgent = agents?.[0];
      if (!targetAgent) throw new Error('No agents available');

      const results: TrustDriftResult[] = [];
      let currentTrustScore = targetAgent.trust_score;
      
      for (let i = 1; i <= 10; i++) {
        setScenarioProgress((i / 10) * 100);
        
        await supabase.functions.invoke('assign-agent-task', {
          body: {
            protocol: targetAgent.protocol,
            task_type: 'data_analysis',
            input_data: { description: `Demo task ${i} with simulated delay` },
            user_id: DEMO_USER_ID
          }
        });

        await new Promise(resolve => setTimeout(resolve, 500 + (i * 200)));
        
        const trustResponse = await supabase.functions.invoke('calculate-trust-score', {
          body: { agent_id: targetAgent.id }
        });

        if (trustResponse.data) {
          currentTrustScore = trustResponse.data.trust_score;
          results.push({
            task: i,
            trust_score: currentTrustScore,
            delta: trustResponse.data.delta,
            reason: trustResponse.data.reason
          });
        }

        if (currentTrustScore < 70 && i >= 5) {
          const backupAgent = agents?.find(agent => agent.id !== targetAgent.id && agent.trust_score > 80);
          if (backupAgent) {
            results.push({
              type: 'reassignment',
              from_agent: targetAgent.name,
              to_agent: backupAgent.name,
              reason: 'Trust score dropped below threshold'
            });
            break;
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      return results;
    },
     onSuccess: (data) => {
      setDemoResults({ scenario: 'trust_drift', data });
      toast({
        title: "Trust Drift Demo Complete",
        description: "Simulated trust degradation and agent reassignment",
      });
    },
  });

  const runBillingDemo = useMutation({
    mutationFn: async (): Promise<BillingResults> => {
       const results: BillingResults = { tasks: [], billing_events: [], audit_logs: [] };
      
      for (let i = 1; i <= 5; i++) {
        setScenarioProgress((i / 5) * 100);
        
        const taskResponse = await supabase.functions.invoke('assign-agent-task', {
          body: {
            protocol: 'mcp',
            task_type: 'verification',
            input_data: { description: `Billing demo task ${i}` },
            user_id: DEMO_USER_ID
          }
        });

        if (taskResponse.data) {
          results.tasks.push(taskResponse.data);
          
          const billingResponse = await supabase.functions.invoke('charge-usage', {
            body: {
              task_id: taskResponse.data.task_id,
              fee_types: ['per_task', 'compliance', 'verification']
            }
          });

          if (billingResponse.data) {
            results.billing_events.push(billingResponse.data);
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const { data: auditLogs, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', DEMO_USER_ID)
        .order('timestamp', { ascending: false })
        .limit(10);

        if(error) throw error;

      results.audit_logs = auditLogs || [];
      
      return results;
    },
     onSuccess: (data) => {
      setDemoResults({ scenario: 'billing', data });
      toast({
        title: "Billing & Logging Demo Complete",
        description: "Generated billing events and audit trail for 5 tasks",
      });
    },
  });

  const runScenario = (scenario: string) => {
    setSelectedScenario(scenario);
    setIsRunning(true);
    setScenarioProgress(0);
    setDemoResults(null);

    switch (scenario) {
      case 'orchestration':
        if (!naturalLanguageInput.trim()) {
          toast({ title: "Input Required", description: "Please enter a natural language task description", variant: "destructive" });
          setIsRunning(false);
          return;
        }
        runOrchestrationDemo.mutate();
        break;
      case 'trust_drift':
        runTrustDriftDemo.mutate();
        break;
      case 'billing':
        runBillingDemo.mutate();
        break;
    }
  };

  const resetDemo = () => {
    setSelectedScenario(null);
    setIsRunning(false);
    setScenarioProgress(0);
    setDemoResults(null);
    setNaturalLanguageInput('');
  };
  
  const renderResults = () => {
    if (!demoResults) return null;

    switch (demoResults.scenario) {
      case 'orchestration':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Orchestration Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(demoResults.data as OrchestrationResult[]).map((result, index) => {
                if (result.type === 'agent_selection') {
                  return (
                    <p key={index}>
                      ✅ Selected Agent: <strong>{result.data.agent?.name}</strong> for protocol <strong>{result.data.protocol}</strong>
                    </p>
                  );
                }
                if (result.type === 'task_created') {
                  return (
                    <p key={index}>
                      ✅ Task <strong>{result.data.task_id}</strong> created successfully.
                    </p>
                  );
                }
                return null;
              })}
            </CardContent>
          </Card>
        );
      case 'trust_drift':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Trust Drift Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(demoResults.data as TrustDriftResult[]).map((result, index) => {
                  if (result.type === 'reassignment') {
                    return (
                      <li key={index} className="text-yellow-400 font-bold">
                        <AlertTriangle className="inline-block mr-2" />
                        Reassigned from {result.from_agent} to {result.to_agent}
                      </li>
                    );
                  }
                  return (
                    <li key={index}>
                      Task {result.task}: Trust Score {result.trust_score?.toFixed(2)} 
                      ({(result.delta ?? 0) > 0 ? '+' : ''}{(result.delta ?? 0).toFixed(2)}) 
                      - <span className="text-slate-400">{result.reason}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        );
      case 'billing':
        const billingData = demoResults.data as BillingResults;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {billingData.billing_events.flat().map((event, index) => (
                    <li key={index}>
                      Task {event.task_id.substring(0, 8)}... charged ${event.amount.toFixed(2)} for {event.fee_type}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {billingData.audit_logs.map((log) => (
                    <li key={log.id}>
                      <span className="text-blue-400">{new Date(log.timestamp).toLocaleTimeString()}</span>: {log.action_type} - {log.resource}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-400" />
              <span>Intent-to-Agent Orchestration</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              Natural language input → agent selection → task execution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter a natural language task (e.g., 'Analyze web traffic data and generate insights')"
              value={naturalLanguageInput}
              onChange={(e) => setNaturalLanguageInput(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              rows={3}
            />
            <Button
              onClick={() => runScenario('orchestration')}
              disabled={isRunning || !naturalLanguageInput.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Run Orchestration Demo
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-red-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-400" />
              <span>Trust Drift Simulation</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              10 tasks with delays → trust drops → agent reassignment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-slate-300 space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span>Simulates increasing task delays</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span>Trust score degradation</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4 text-blue-400" />
                <span>Automatic agent reassignment</span>
              </div>
            </div>
            <Button
              onClick={() => runScenario('trust_drift')}
              disabled={isRunning}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Run Trust Drift Demo
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span>Billing + Logging</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              5 tasks → fee calculation → audit trail → billing summary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-slate-300 space-y-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span>Multiple fee types</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Complete audit trail</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-yellow-400" />
                <span>Billing event summary</span>
              </div>
            </div>
            <Button
              onClick={() => runScenario('billing')}
              disabled={isRunning}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Run Billing Demo
            </Button>
          </CardContent>
        </Card>
      </div>

      {isRunning && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Demo Progress</span>
              <Button
                variant="outline"
                size="sm"
                onClick={resetDemo}
                className="text-slate-300 border-slate-600"
              >
                <Pause className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={scenarioProgress} className="mb-2" />
            <div className="text-sm text-slate-400">
              Running {selectedScenario?.replace('_', ' ')} demo... {Math.round(scenarioProgress)}%
            </div>
          </CardContent>
        </Card>
      )}

      {renderResults()}

      {!isRunning && !demoResults && (
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-700/50">
          <CardHeader>
            <CardTitle className="text-white">Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-300 space-y-2">
              <p><strong>Intent-to-Agent Orchestration:</strong> Enter a natural language task description to see how the system analyzes, selects the best agent, and executes the task.</p>
              <p><strong>Trust Drift Simulation:</strong> Watch as simulated task delays cause trust scores to drop and trigger automatic agent reassignment.</p>
              <p><strong>Billing + Logging:</strong> See complete billing calculations and audit trail generation for multiple tasks.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DemoScenarios;