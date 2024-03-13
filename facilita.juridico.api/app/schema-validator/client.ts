import { Location } from '#schema-validator/location'
import vine from '@vinejs/vine'

const CreateSchema = vine.object({
  name: vine.string(),
  email: vine.string().email(),
  phone: vine.string(),
  location: Location.Create.Schema,
})

const QuerySchema = vine.object({
  search: vine.string().optional(),
})

const CreateValidator = vine.compile(CreateSchema)
const QueryValidator = vine.compile(QuerySchema)

export const Client = {
  Create: {
    Validator: CreateValidator,
    Schema: CreateSchema,
  },
  Query: {
    Validator: QueryValidator,
    Schema: QuerySchema,
  },
}
