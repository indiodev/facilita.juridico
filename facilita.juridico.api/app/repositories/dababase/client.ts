import { ClientContract } from '#contracts/client'
import { CreateClientDTO, QueryClientDTO } from '#dtos/client'
import { Find } from '#dtos/find'
import { Insert } from '#dtos/sql'
import { Client } from '#entities/client'
import { Location } from '#entities/location'
import { inject } from '@adonisjs/core'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class ClientRepository implements ClientContract {
  async create({ location: location_data, ...client_data }: CreateClientDTO): Promise<Client> {
    const {
      rows: [client],
    } = await db.rawQuery<Insert<Client>>(
      `INSERT INTO clients (name, email, phone) VALUES (:name, :email, :phone) RETURNING *`,
      client_data
    )

    const {
      rows: [location],
    } = await db.rawQuery<Insert<Location>>(
      `INSERT INTO locations (x, y, client_id) VALUES (:x, :y, :client_id) RETURNING *`,
      { ...location_data, client_id: client.id }
    )

    return { ...client, location }
  }

  async findBy({
    op,
    ...params
  }: Find<Omit<Client, 'created_at' | 'updated_at'>>): Promise<Client | null> {
    const keys = Object.keys(params)
    if (keys.length === 0) return null

    if (keys.length === 1) {
      const [key] = keys
      const client = await db.rawQuery(`SELECT * FROM clients WHERE ${key} = :${key}`, params)
      if (client.rowCount === 0) return null
      return client.rows[0]
    }

    const rawKeys = Object.keys(params)
      .flatMap((key) => [`${key} = :${key}`])
      .join(` ${op} `)

    const client = await db.rawQuery(`SELECT * FROM clients WHERE ${rawKeys}`, params)
    if (client.rowCount === 0) return null
    return client.rows[0]
  }

  async list({ search }: Partial<QueryClientDTO>): Promise<Client[]> {
    if (!search) {
      const clients = await db.rawQuery(`SELECT * FROM clients`)
      return clients.rows
    }

    const clients = await db.rawQuery(
      `SELECT * FROM clients WHERE name ILIKE '%' || :search || '%' or email ILIKE '%' || :search || '%' or phone ILIKE '%' || :search || '%'`,
      { search }
    )

    return clients.rows
  }
}
