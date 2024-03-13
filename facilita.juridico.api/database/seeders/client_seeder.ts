import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // const clients = await this.client.rawQuery('SELECT * FROM public.clients')

    // if (clients.rowCount > 1) return

    await this.client.rawQuery(`INSERT INTO public.clients (name, email, phone) VALUES (?, ?, ?)`, [
      'Jhollyfer Rodrigues',
      'jhollyferr@example.com',
      '1234567890',
    ])
  }
}
