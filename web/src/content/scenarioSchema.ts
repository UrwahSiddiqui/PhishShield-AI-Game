import { z } from 'zod'
import scenarioData from './scenarios.json'

export const scenarioSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  channel: z.enum(['email', 'sms', 'qr-code', 'login-page', 'social-engineering']),
  difficulty: z.enum(['guided', 'practice', 'challenge']),
  category: z.string().min(1),
  sender: z.string().min(1),
  subject: z.string(),
  content: z.string().min(1),
  evidence: z.array(z.object({
    label: z.string().min(1),
    value: z.string().min(1),
    kind: z.enum(['strong', 'context', 'safe']),
    explanation: z.string().min(1),
  })).min(1),
  correctClassification: z.enum(['safe', 'suspicious', 'phishing']),
  explanation: z.string().min(1),
  safeAction: z.string().min(1),
  objective: z.string().min(1),
  tags: z.array(z.string()).min(1),
})

export const scenariosSchema = z.array(scenarioSchema).min(1)
export type Scenario = z.infer<typeof scenarioSchema>

export const scenarios: Scenario[] = scenariosSchema.parse(scenarioData)
