import { StepObject } from './StepObject'

export class Step {
  readonly name: string
  readonly createObjectList: StepObject[]
  readonly updateObjectList: StepObject[]
  readonly deleteObjectList: StepObject[]

  constructor(
    name: string,
    objects: {
      create?: StepObject[]
      update?: StepObject[]
      delete?: StepObject[]
    }
  ) {
    this.name = name
    this.createObjectList = objects.create?.map((obj) => obj.clone()) || []
    this.updateObjectList = objects.update?.map((obj) => obj.clone()) || []
    this.deleteObjectList = objects.delete?.map((obj) => obj.clone()) || []
  }

  getCreateObjectByIndex<T extends StepObject>(
    index: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor: { new (...args: any): T }
  ): T {
    const result = this.createObjectList.filter(
      (o) => o instanceof constructor
    )[index]
    if (!result) {
      throw new Error('Not Found Object')
    }
    return result as T
  }
}
