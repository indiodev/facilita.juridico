import { ClientContract } from '#contracts/client'
import { CreateClientDTO, QueryClientDTO } from '#dtos/client'
import { Find } from '#dtos/find'
import { Insert, Select } from '#dtos/sql'
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
      const {
        rows: [client],
        rowCount,
      } = await db.rawQuery<Select<Client & { x?: number; y?: number }>>(
        `SELECT c.*, l.* FROM clients c LEFT JOIN locations l ON c.id = l.client_id WHERE c.${key} = :${key}`,
        params
      )
      if (rowCount === 0 || !client) return null

      return { ...client, location: { x: client.x, y: client.y } as Location }
    }

    const rawKeys = Object.keys(params)
      .flatMap((key) => [`c.${key} = :${key}`])
      .join(` ${op} `)

    const {
      rowCount,
      rows: [client],
    } = await db.rawQuery<Select<Client & { x?: number; y?: number }>>(
      `SELECT c.*, l.* FROM clients c LEFT JOIN locations l ON c.id = l.client_id WHERE ${rawKeys}`,
      params
    )

    if (rowCount === 0 || !client) return null

    return { ...client, location: { x: client.x, y: client.y } as Location }
  }

  async list(params?: Partial<QueryClientDTO>): Promise<Client[]> {
    if (!params?.search) {
      const { rows: clients } = await db.rawQuery<Select<Client & { x?: number; y?: number }>>(
        `SELECT c.*, l.* FROM clients c LEFT JOIN locations l ON c.id = l.client_id`
      )

      return clients.map((client) => ({
        ...client,
        location: { x: client.x, y: client.y } as Location,
      }))
    }

    const { rows: clients } = await db.rawQuery<Select<Client & { x?: number; y?: number }>>(
      `SELECT c.*, l.* FROM clients c LEFT JOIN locations l ON c.id = l.client_id WHERE c.name ILIKE '%' || :search || '%' or c.email ILIKE '%' || :search || '%' or c.phone ILIKE '%' || :search || '%'`,
      { search: params.search }
    )

    return clients.map((client) => ({
      ...client,
      location: { x: client.x, y: client.y } as Location,
    }))
  }
}
