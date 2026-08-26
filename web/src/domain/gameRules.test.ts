import { describe, expect, it } from 'vitest'
import { scenarios } from '../content/scenarioSchema'
import { scoreAnswer, selectScenario } from './gameRules'

describe('curated scenario content', () => {
  it('has unique ids and covers every supported channel', () => {
    const ids = scenarios.map((scenario) => scenario.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(scenarios.map((scenario) => scenario.channel))).toEqual(new Set(['email', 'sms', 'qr-code', 'login-page', 'social-engineering']))
  })

  it('gives every scenario evidence and an explainable safe action', () => {
    expect(scenarios.every((scenario) => scenario.evidence.length > 0 && scenario.explanation && scenario.safeAction)).toBe(true)
  })
})

describe('scoreAnswer', () => {
  it('rewards a correct answer and extends the streak', () => {
    const result = scoreAnswer(scenarios[0], scenarios[0].correctClassification, 2)
    expect(result).toEqual({ correct: true, score: 150, nextStreak: 3 })
  })

  it('resets the streak and gives no points for an incorrect answer', () => {
    const wrongAnswer = scenarios[0].correctClassification === 'safe' ? 'phishing' : 'safe'
    expect(scoreAnswer(scenarios[0], wrongAnswer, 4)).toEqual({ correct: false, score: 0, nextStreak: 0 })
  })
})

describe('selectScenario', () => {
  it('prefers an uncompleted scenario in the requested mode', () => {
    const selected = selectScenario(scenarios, [], 'guided')
    expect(selected?.difficulty).toBe('guided')
  })

  it('falls back to the next uncompleted scenario when a mode is exhausted', () => {
    const completed = scenarios.filter((scenario) => scenario.difficulty === 'guided').map((scenario) => scenario.id)
    const selected = selectScenario(scenarios, completed, 'guided')
    expect(selected?.id).not.toBeUndefined()
    expect(completed).not.toContain(selected?.id)
  })
})
