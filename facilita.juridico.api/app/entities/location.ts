import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const Schema = vine.object({
  id: vine.number().positive(),
  x: vine.string(),
  y: vine.string().email(),
  created_at: vine.string(),
  updated_at: vine.string(),
})

export type Location = Infer<typeof Schema>
