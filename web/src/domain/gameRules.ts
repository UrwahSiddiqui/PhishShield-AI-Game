import type { Scenario } from '../content/scenarioSchema'

export type Classification = Scenario['correctClassification']

export type AnswerResult = {
  correct: boolean
  score: number
  nextStreak: number
}

export function scoreAnswer(scenario: Scenario, answer: Classification, streak: number): AnswerResult {
  const correct = scenario.correctClassification === answer
  return {
    correct,
    score: correct ? 100 + streak * 25 : 0,
    nextStreak: correct ? streak + 1 : 0,
  }
}

export function selectScenario(scenarioList: Scenario[], completedIds: string[], difficulty: string): Scenario | undefined {
  const candidates = scenarioList.filter((scenario) => scenario.difficulty === difficulty && !completedIds.includes(scenario.id))
  return candidates[0] ?? scenarioList.find((scenario) => !completedIds.includes(scenario.id)) ?? scenarioList[0]
}
