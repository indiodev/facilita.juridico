import { Infer } from '@vinejs/vine/types'
import { Client } from '../schema-validator/client.js'

export type CreateClientDTO = Infer<typeof Client.Create.Schema>
export type QueryClientDTO = Infer<typeof Client.Query.Schema>
