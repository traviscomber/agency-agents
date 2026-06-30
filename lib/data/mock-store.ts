// Mock in-memory store for demo purposes (no Supabase required)
// Replace with real Supabase calls when keys are configured

import type { AgentRun, Project, SavedOutput, UserProfile } from '@/lib/types'

export const MOCK_USER: UserProfile = {
  id: 'user-demo-001',
  email: 'demo@agencyos.app',
  fullName: 'Demo User',
  company: 'Acme Inc.',
  role: 'Founder',
  plan: 'free',
  isAdmin: false,
  onboardingCompleted: true,
  createdAt: '2024-01-15T10:00:00Z',
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    userId: 'user-demo-001',
    name: 'AgencyOS MVP',
    description: 'Building the initial product launch for AgencyOS SaaS platform.',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    runCount: 8,
    savedCount: 3,
  },
  {
    id: 'proj-002',
    userId: 'user-demo-001',
    name: 'Q1 Sales Strategy',
    description: 'Outreach strategy and ICP definition for Q1 pipeline.',
    status: 'active',
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-22T11:00:00Z',
    runCount: 4,
    savedCount: 2,
  },
]

export const MOCK_RUNS: AgentRun[] = [
  {
    id: 'run-001',
    userId: 'user-demo-001',
    agentId: 'agent-005',
    agentName: 'Product Strategist',
    agentDivision: 'Product',
    projectId: 'proj-001',
    projectName: 'AgencyOS MVP',
    task: 'Define the MVP scope for AgencyOS, a SaaS platform with specialized AI agents',
    context: 'Target users are founders, developers, and consultants. Budget is limited.',
    desiredOutput: 'product_brief',
    detailLevel: 'detailed',
    output: {
      summary:
        'AgencyOS MVP should focus on a curated agent library with a seamless run-and-save workflow. Core value: specialized agents, not generic chat.',
      mainResult:
        'The MVP should include: (1) Public landing + pricing pages, (2) Auth + onboarding, (3) Agent library with 10-15 agents, (4) Run agent flow with structured output, (5) Save to project, (6) Basic usage metering, (7) Stripe checkout. Exclude: team features, custom agents, API access, mobile app.',
      actionSteps: [
        'Set up Supabase project with auth and schema',
        'Build agent library with seed data',
        'Implement run flow with mock AI provider',
        'Add Stripe checkout for Starter and Pro plans',
        'Launch with waitlist or direct signup',
      ],
      risksNotes: [
        'Risk: Users expect real AI, not mock responses — set clear expectations in onboarding',
        'Risk: Agent quality is critical to perceived value — curate carefully',
        'Note: Focus on 5-7 high-quality agents over 50 mediocre ones',
      ],
      suggestedNextStep: 'Run the Frontend Developer agent to plan the component architecture',
      relatedAgents: ['frontend-developer', 'backend-architect', 'ux-researcher'],
    },
    status: 'completed',
    modelUsed: 'mock-provider',
    creditsUsed: 1,
    createdAt: '2024-01-20T14:00:00Z',
  },
  {
    id: 'run-002',
    userId: 'user-demo-001',
    agentId: 'agent-001',
    agentName: 'Frontend Developer',
    agentDivision: 'Engineering',
    projectId: 'proj-001',
    projectName: 'AgencyOS MVP',
    task: 'Plan the component architecture for the agent library page',
    context: 'Using Next.js, Tailwind CSS, and shadcn/ui. Need search, filters, and agent cards.',
    desiredOutput: 'component_plan',
    detailLevel: 'standard',
    output: {
      summary:
        'The agent library should use a two-column layout with a filter sidebar and a responsive grid of agent cards.',
      mainResult:
        'Component tree: AgentLibraryPage → AgentFilters (sidebar), AgentGrid → AgentCard. Filters: division select, plan required, search input. AgentCard shows: name, division badge, short description, plan required badge, run button.',
      actionSteps: [
        'Create AgentCard component with skeleton loading state',
        'Build AgentFilters with URL-based filter state',
        'Implement search with debouncing (300ms)',
        'Add division color coding to badges',
        'Implement locked state for premium agents',
      ],
      risksNotes: [
        'Use URL params for filters to enable sharing and bookmarking',
        'Avoid heavy client-side state — prefer URL-based state',
      ],
      suggestedNextStep:
        'Run the UX Researcher agent to review the agent discovery flow',
      relatedAgents: ['ux-researcher', 'ui-designer', 'code-reviewer'],
    },
    status: 'completed',
    modelUsed: 'mock-provider',
    creditsUsed: 1,
    createdAt: '2024-01-20T15:30:00Z',
  },
  {
    id: 'run-003',
    userId: 'user-demo-001',
    agentId: 'agent-006',
    agentName: 'Sales Strategist',
    agentDivision: 'Sales',
    projectId: 'proj-002',
    projectName: 'Q1 Sales Strategy',
    task: 'Define the ICP for AgencyOS and build an outreach framework',
    context: 'B2B SaaS tool for founders, developers, and consultants. Pricing starts at $19/mo.',
    desiredOutput: 'sales_strategy',
    detailLevel: 'detailed',
    output: {
      summary:
        'Primary ICP: technical founders and solo consultants building products. Secondary ICP: dev agencies and product teams of 2-10.',
      mainResult:
        'ICP Definition: Technical founders (solo to 5-person teams), B2B SaaS builders, consultants running client projects. Pain: no structured AI workflow. Motivation: structured outputs they can save and share. Outreach angles: "stop using chatbots for professional work", "your AI specialist agency", "structured deliverables, not just answers".',
      actionSteps: [
        'Build targeted list of technical founders on X/LinkedIn',
        'Draft 3-email cold sequence emphasizing structured outputs',
        'Create case study showing agent run vs generic chatbot',
        'Set up free trial tracking to measure activation rate',
      ],
      risksNotes: [
        'Risk: Competing with ChatGPT Plus — must emphasize specialization and structure',
        'Note: Free plan is the best acquisition channel — make first run feel valuable',
      ],
      suggestedNextStep:
        'Run the Proposal Strategist to draft outreach templates',
      relatedAgents: ['proposal-strategist', 'product-strategist'],
    },
    status: 'completed',
    modelUsed: 'mock-provider',
    creditsUsed: 1,
    createdAt: '2024-01-22T10:00:00Z',
  },
]

export const MOCK_SAVED_OUTPUTS: SavedOutput[] = [
  {
    id: 'saved-001',
    userId: 'user-demo-001',
    projectId: 'proj-001',
    projectName: 'AgencyOS MVP',
    agentRunId: 'run-001',
    agentName: 'Product Strategist',
    title: 'AgencyOS MVP Scope — Product Brief',
    content: MOCK_RUNS[0].output?.mainResult || '',
    format: 'markdown',
    createdAt: '2024-01-20T14:05:00Z',
    updatedAt: '2024-01-20T14:05:00Z',
  },
  {
    id: 'saved-002',
    userId: 'user-demo-001',
    projectId: 'proj-001',
    projectName: 'AgencyOS MVP',
    agentRunId: 'run-002',
    agentName: 'Frontend Developer',
    title: 'Agent Library — Component Architecture',
    content: MOCK_RUNS[1].output?.mainResult || '',
    format: 'markdown',
    createdAt: '2024-01-20T15:35:00Z',
    updatedAt: '2024-01-20T15:35:00Z',
  },
  {
    id: 'saved-003',
    userId: 'user-demo-001',
    projectId: 'proj-002',
    projectName: 'Q1 Sales Strategy',
    agentRunId: 'run-003',
    agentName: 'Sales Strategist',
    title: 'Q1 ICP Definition & Outreach Framework',
    content: MOCK_RUNS[2].output?.mainResult || '',
    format: 'markdown',
    createdAt: '2024-01-22T10:05:00Z',
    updatedAt: '2024-01-22T10:05:00Z',
  },
]
