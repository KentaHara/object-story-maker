import { KeyValue } from 'src/entity/KeyValue'
import { StepObject } from '../../../src/entity/StepObject'

export class Task extends StepObject {
  private memo: string
  readonly objectName = 'task'

  constructor(id: number, memo: string) {
    super(id)
    this.memo = memo
  }

  changeMemo(memo: string): this {
    this.memo = memo
    return this
  }

  clone(): Task {
    return new Task(this.id, this.memo)
  }

  get toKeyValueList(): KeyValue[] {
    return [{ key: 'メモ', value: this.memo }]
  }
}
