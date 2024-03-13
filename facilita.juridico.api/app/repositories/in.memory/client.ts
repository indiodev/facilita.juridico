import { ClientContract } from '#contracts/client'
import { CreateClientDTO, QueryClientDTO } from '#dtos/client'
import { Find } from '#dtos/find'
import { Client } from '#entities/client'
import { DateTime } from 'luxon'

export default class ClientRepositoryInMemory implements ClientContract {
  private items: Record<number, Client> = {}

  async create(data: CreateClientDTO): Promise<Client> {
    const created: Client = {
      ...data,
      id: this.size() + 1,
      created_at: DateTime.now().toSQL(),
      updated_at: DateTime.now().toSQL(),
    }

    this.items[created.id!] = created

    return this.items[created.id!]
  }

  async findBy(params: Find<QueryClientDTO>): Promise<Client | null> {
    const clients = Object.entries(this.items).flatMap(([_, client]) => client)
    const excluded = (client: Client) =>
      client.email === params.email || client.phone === params.phone || client.name === params.name

    const client = clients.find(excluded)

    if (!client) return null
    return client
  }

  async list(params: QueryClientDTO): Promise<Client[]> {
    const clients = Object.values(this.items) || []
    return clients.filter((client) => {
      return (
        (params.email && client.email.includes(params.email)) ||
        (params.phone && client.phone.includes(params.phone)) ||
        (params.name && client.name.includes(params.name))
      )
    })
  }

  private size(): number {
    return Object.keys(this.items).length
  }
}
