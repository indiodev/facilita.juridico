export interface Insert<Entity> {
  rowCount: number
  rows: Entity[]
}

export interface Select<Entity> {
  rowCount: number
  rows: Entity[]
}
