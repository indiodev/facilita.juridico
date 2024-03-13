import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

import { Schema as Location } from '#entities/location'

export const Schema = vine.object({
  id: vine.number().positive(),
  name: vine.string(),
  email: vine.string().email(),
  phone: vine.string(),
  location: Location.optional(),
  created_at: vine.string(),
  updated_at: vine.string(),
})

export type Client = Infer<typeof Schema>
