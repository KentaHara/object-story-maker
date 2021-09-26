import fs from 'fs'
import { KeyValue } from 'src/entity/KeyValue'
import { Step } from 'src/entity/Step'
import { StepObject } from 'src/entity/StepObject'
import { Story } from 'src/entity/Story'
import * as Model from '../dao/ObjectHistoryMakerModel'

export class ObjectHistoryMakerRepository {
  save(story: Story): void {
    const modelStep = this.convert(story)
    fs.writeFileSync('./tmp/out.json', JSON.stringify(modelStep))
  }

  private convert(
    story: Story,
    currentStepObject: StepObject[] = []
  ): Model.Step {
    const step = story.step
    const stepObject = step.getNextStepObjectByStepObjectList(currentStepObject)
    const modelSteps = story.nextStoryList.map((nextStory) =>
      this.convert(nextStory, stepObject)
    )
    return {
      name: step.name,
      notes: [],
      objects: this.stepToModelStepObjects(step),
      steps: modelSteps,
    }
  }

  private stepToModelStepObjects(step: Step): Model.StepObjects {
    return {
      creates: this.stepToModelCreateObject(step),
      updates: this.stepToModelUpdateObject(step),
      deletes: this.stepToModelDeleteObject(step),
    }
  }

  private stepToModelCreateObject(step: Step): Model.CreateObject[] {
    return step.createObjectList.map((obj) => ({
      name: obj.objectName,
      key: this.stepObjectKey(obj),
      relationKeys: this.stepObjectToModelRelationKeys(obj),
      values: obj.toKeyValueList.map((kv) => this.keyValueToModelColum(kv)),
    }))
  }

  private stepToModelUpdateObject(step: Step): Model.UpdateObject[] {
    return step.updateObjectList.map((obj) => ({
      key: this.stepObjectKey(obj),
      values: obj.toKeyValueList.map((kv) => this.keyValueToModelColum(kv)),
    }))
  }

  private stepToModelDeleteObject(step: Step): Model.DeleteObject[] {
    return step.deleteObjectList.map((obj) => ({
      key: this.stepObjectKey(obj),
    }))
  }

  private stepObjectToModelRelationKeys(
    stepObject: StepObject
  ): Model.RelationKeys {
    if (stepObject.relation === undefined) {
      return []
    }
    if (Array.isArray(stepObject.relation)) {
      return stepObject.relation.map((obj) => this.stepObjectKey(obj))
    }
    return [this.stepObjectKey(stepObject.relation)]
  }

  private keyValueToModelColum(keyValue: KeyValue): Model.Column {
    return {
      name: keyValue.key,
      value: keyValue.value,
    }
  }

  private stepObjectKey(stepObject: StepObject): string {
    return `${stepObject.className}_${stepObject.id}`
  }
}
