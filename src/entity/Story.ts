import { Step } from './Step'

export class Story {
  readonly step: Step
  readonly nextStoryList: Story[]

  constructor(step: Step, nextStoryList: Story[] = []) {
    this.step = step
    this.nextStoryList = nextStoryList
  }
}
