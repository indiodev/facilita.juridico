import { CreateClientDTO, QueryClientDTO } from '#dtos/client'
import { Find } from '#dtos/find'
import { Client } from '#entities/client'

export interface ClientContract {
  create(data: CreateClientDTO): Promise<Client>
  findBy(params: Find<QueryClientDTO>): Promise<Client | null>
  list(params: Partial<QueryClientDTO>): Promise<Client[]>
}
