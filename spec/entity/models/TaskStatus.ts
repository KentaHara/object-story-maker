import { KeyValue } from 'src/entity/KeyValue'
import { StepObject } from '../../../src/entity/StepObject'
import { Task } from './Task'

export class TaskStatus extends StepObject {
  private status: string
  readonly relation: Task
  readonly objectName = 'task_status'

  constructor(id: number, task: Task, status: string) {
    super(id)
    this.status = status
    this.relation = task
  }
  changeStatus(status: string): this {
    this.status = status
    return this
  }

  clone(): TaskStatus {
    return new TaskStatus(this.id, this.relation.clone(), this.status)
  }

  get toKeyValueList(): KeyValue[] {
    return [{ key: 'ステータス', value: this.status }]
  }
}
