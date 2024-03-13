import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  async up() {
    this.schema.raw(`
      CREATE TABLE IF NOT EXISTS "${this.tableName}" (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "x" INTEGER NOT NULL,
        "y" INTEGER NOT NULL,
        "client_id" INTEGER REFERENCES clients(id) ON DELETE CASCADE,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NULL
     );
  `)
  }

  async down() {
    this.schema.raw(`DROP TABLE IF EXISTS "${this.tableName}"`)
  }
}
