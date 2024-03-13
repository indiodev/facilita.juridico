import vine from '@vinejs/vine'

const CreateSchema = vine.object({
  x: vine.number(),
  y: vine.number(),
})

const CreateValidator = vine.compile(CreateSchema)

export const Location = {
  Create: {
    Validator: CreateValidator,
    Schema: CreateSchema,
  },
}
