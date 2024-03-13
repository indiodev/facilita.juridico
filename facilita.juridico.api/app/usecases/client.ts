import { CreateClientDTO, QueryClientDTO } from '#dtos/client'
import { Client } from '#entities/client'
import ApplicationException from '#exceptions/application'
import ClientRepository from '#repositories/dababase/client'
import { inject } from '@adonisjs/core'

@inject()
export default class ClientUseCase {
  constructor(private repository: ClientRepository) {}

  async create(data: CreateClientDTO): Promise<Client> {
    const client = await this.repository.findBy({ email: data.email, phone: data.phone, op: 'OR' })
    if (client) throw new ApplicationException('Client already exists', { status: 409 })
    return await this.repository.create(data)
  }

  async show(id: number): Promise<Client | null> {
    const client = await this.repository.findBy({ id })
    if (!client) throw new ApplicationException('Client not found', { status: 409 })
    return client
  }

  async list({ search }: Partial<QueryClientDTO>): Promise<Client[]> {
    const clients = await this.repository.list({ search })
    return clients
  }
}
