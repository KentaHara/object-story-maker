export interface Step {
  name: string
  notes: string[]
  objects: StepObjects
  steps: Step[]
}

export interface StepObjects {
  creates?: CreateObject[]
  updates?: UpdateObject[]
  deletes?: DeleteObject[]
}

export interface CreateObject {
  name: string
  key: string
  relationKeys: string[]
  values: Column[]
}
export interface UpdateObject {
  key: string
  values: Column[]
}
export interface DeleteObject {
  key: string
}

export interface Column {
  name: string
  value: string
}

export type RelationKeys = string[]
