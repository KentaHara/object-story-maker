export abstract class StepObject {
  readonly id: number
  readonly relation: StepObject[] | StepObject | undefined = undefined

  constructor(id: number) {
    this.id = id
  }

  objectName(): string {
    return this.constructor.name
  }

  abstract clone(): StepObject
}
