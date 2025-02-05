import { Story } from '../../src/entity/Story'
import { ObjectHistoryMakerRepository } from '../../src/repository/ObjectHistoryMakerRepository'
import { Step } from '../../src/entity/Step'
import { Task } from './models/Task'
import { TaskStatus } from './models/TaskStatus'

describe('Create Step', () => {
  const task = new Task(1, 'first task')
  const taskStatus = new TaskStatus(1, task, 'todo')

  const step1 = new Step('Create Step', {
    create: [task, taskStatus],
  })
  const step2 = new Step('Update Task Memo', {
    update: [task.changeMemo('test')],
  })
  const step3 = new Step('Update Task Status', {
    update: [taskStatus.changeStatus('test')],
  })
  const step4 = new Step('Delete Task Status', {
    delete: [taskStatus],
  })

  const story = new Story(step1, [
    new Story(step2, [new Story(step3, [new Story(step4)])]),
  ])
  const rep = new ObjectHistoryMakerRepository()
  rep.save(story)
})
