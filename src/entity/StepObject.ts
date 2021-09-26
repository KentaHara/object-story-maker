import { DiffKeyValue } from './DiffKeyValue'
import { KeyValue } from './KeyValue'

export abstract class StepObject {
  abstract readonly objectName: string
  readonly id: number
  readonly relation: StepObject[] | StepObject | undefined = undefined

  constructor(id: number) {
    this.id = id
  }

  get className(): string {
    return this.constructor.name
  }

  abstract clone(): StepObject
  abstract get toKeyValueList(): KeyValue[]

  toDiffKeyValueListPrev(prev: this): DiffKeyValue[] {
    return this.toDiffKeyValueList(prev, this)
  }
  toDiffKeyValueListNext(next: this): DiffKeyValue[] {
    return this.toDiffKeyValueList(this, next)
  }
  private toDiffKeyValueList(prev: this, next: this): DiffKeyValue[] {
    const res: DiffKeyValue[] = []
    const nextKeyValueList = next.toKeyValueList

    prev.toKeyValueList.forEach((p) => {
      const n = nextKeyValueList.find((v) => v.key === p.key)
      if (n && n?.value !== p.value) {
        res.push({
          key: p.key,
          from: p.value,
          to: n?.value,
        })
      }
    })
    return res
  }
}
