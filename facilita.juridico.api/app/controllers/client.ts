import ClientUseCase from '#usecases/client'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Client } from '../schema-validator/client.js'

@inject()
export default class ClientController {
  constructor(private usecase: ClientUseCase) {}

  async create({ request, response }: HttpContext): Promise<void> {
    const data = await request.validateUsing(Client.Create.Validator)
    const result = await this.usecase.create(data)
    return response.ok(result)
  }

  async show({ params, response }: HttpContext): Promise<void> {
    const client = await this.usecase.show(params.id)
    return response.ok(client)
  }

  async list({ response, request }: HttpContext): Promise<void> {
    const { search } = await request.validateUsing(Client.Query.Validator)
    const clients = await this.usecase.list({ search })
    return response.ok(clients)
  }
}
