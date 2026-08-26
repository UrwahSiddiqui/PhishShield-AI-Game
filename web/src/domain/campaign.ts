import type { CampaignDefinition } from './campaignEngine'

export const northstarCampaign: CampaignDefinition = {
  id: 'northstar-monday',
  name: 'Monday Morning Surge',
  incidents: [
    {
      id: 'invoice-recon',
      scenarioId: 'email-invoice-domain',
      stage: 1,
      correctClassification: 'suspicious',
      containmentActions: ['report', 'verify'],
      impact: 'medium',
      timeLimitSeconds: 90,
      threatImpact: 14,
      threatReduction: 10,
    },
    {
      id: 'mfa-escalation',
      scenarioId: 'login-mfa-fatigue',
      stage: 2,
      correctClassification: 'phishing',
      containmentActions: ['report', 'block'],
      impact: 'high',
      timeLimitSeconds: 75,
      threatImpact: 22,
      threatReduction: 16,
    },
    {
      id: 'executive-boss',
      scenarioId: 'ceo-travel-transfer',
      stage: 3,
      isBoss: true,
      correctClassification: 'phishing',
      containmentActions: ['verify', 'escalate'],
      impact: 'critical',
      timeLimitSeconds: 60,
      threatImpact: 40,
      threatReduction: 30,
    },
  ],
}
