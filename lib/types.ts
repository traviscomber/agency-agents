export type PlanId = 'free' | 'starter' | 'pro' | 'team' | 'enterprise'

export interface Plan {
  id: PlanId
  name: string
  price: number | null
  priceLabel: string
  monthlyRunLimit: number
  maxProjects: number
  features: string[]
  cta: string
  highlighted: boolean
  stripePriceId?: string
}

export interface Agent {
  id: string
  slug: string
  name: string
  division: string
  category: string
  shortDescription: string
  longDescription: string
  role: string
  mission: string
  whenToUse: string
  inputRequirements: string[]
  outputFormat: string[]
  systemPrompt: string
  exampleTasks: string[]
  suggestedPrompts: string[]
  planRequired: PlanId
  isFeatured: boolean
  isActive: boolean
}

export interface Project {
  id: string
  userId: string
  name: string
  description: string
  status: 'active' | 'archived'
  createdAt: string
  updatedAt: string
  runCount?: number
  savedCount?: number
  operatingBrief?: ProjectOperatingBrief
  memory?: ProjectMemoryEntry[]
  workflow?: ProjectWorkflowStep[]
}

export interface ProjectOperatingBrief {
  objective: string
  audience: string
  tone: string
  successDefinition: string
  constraints: string[]
}

export interface ProjectMemoryEntry {
  id: string
  title: string
  note: string
  source: 'decision' | 'research' | 'deliverable' | 'run'
  createdAt: string
}

export interface ProjectWorkflowStep {
  id: string
  name: string
  owner: string
  status: 'next' | 'active' | 'done'
  detail: string
  linkedRunId?: string
  linkedRunLabel?: string
  completedAt?: string
}

export interface AgentRun {
  id: string
  userId: string
  agentId: string
  agentName: string
  agentDivision: string
  projectId?: string
  projectName?: string
  task: string
  context?: string
  desiredOutput?: string
  detailLevel?: string
  output?: AgentOutput
  status: 'pending' | 'running' | 'completed' | 'failed'
  errorMessage?: string
  modelUsed?: string
  creditsUsed: number
  createdAt: string
}

export interface ProjectOverlayState {
  projectId: string
  operatingBrief?: ProjectOperatingBrief
  memory: ProjectMemoryEntry[]
  workflow: ProjectWorkflowStep[]
  runs: AgentRun[]
  savedOutputs: SavedOutput[]
}

export interface AgentOutput {
  summary: string
  mainResult: string
  actionSteps: string[]
  risksNotes: string[]
  suggestedNextStep: string
  relatedAgents: string[]
}

export interface SavedOutput {
  id: string
  userId: string
  projectId?: string
  projectName?: string
  agentRunId: string
  agentName: string
  title: string
  content: string
  format: 'markdown' | 'text'
  createdAt: string
  updatedAt: string
}

export interface UsagePeriod {
  periodStart: string
  periodEnd: string
  runsUsed: number
  creditsUsed: number
}

export interface UserProfile {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  company?: string
  role?: string
  plan: PlanId
  isAdmin: boolean
  onboardingCompleted: boolean
  createdAt: string
}

export const PLAN_HIERARCHY: PlanId[] = ['free', 'starter', 'pro', 'team', 'enterprise']

export function canAccessAgent(userPlan: PlanId, agentPlan: PlanId): boolean {
  return PLAN_HIERARCHY.indexOf(userPlan) >= PLAN_HIERARCHY.indexOf(agentPlan)
}
