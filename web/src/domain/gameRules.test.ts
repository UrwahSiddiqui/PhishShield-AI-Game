import { describe, expect, it } from 'vitest'
import { scenarios } from '../content/scenarioSchema'
import { scoreAnswer, selectScenario } from './gameRules'

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
