export type Find<Entity> = Partial<Entity & { op: 'AND' | 'OR' }>
