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
      location: {
        x: data.location.x,
        y: data.location.y,
        id: this.size() + 1,
        created_at: DateTime.now().toSQL(),
        updated_at: DateTime.now().toSQL(),
      },
    }

    this.items[created.id!] = created

    return this.items[created.id!]
  }

  async findBy(params: Find<QueryClientDTO>): Promise<Client | null> {
    const clients = Object.entries(this.items).flatMap(([_, client]) => client)
    const excluded = (client: Client) =>
      client.email === params.search ||
      client.phone === params.search ||
      client.name === params.search

    const client = clients.find(excluded)

    if (!client) return null
    return client
  }

  async list(params: QueryClientDTO): Promise<Client[]> {
    const clients = Object.values(this.items) || []
    return clients.filter((client) => {
      return (
        (params.search && client.email.includes(params.search)) ||
        (params.search && client.phone.includes(params.search)) ||
        (params.search && client.name.includes(params.search))
      )
    })
  }

  private size(): number {
    return Object.keys(this.items).length
  }
}
