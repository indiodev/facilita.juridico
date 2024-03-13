import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.raw(`
      CREATE TABLE IF NOT EXISTS "${this.tableName}" (
        "id" SERIAL PRIMARY KEY NOT NULL,
        "name" varchar(255) NULL,
        "email" varchar(255) NOT NULL,
        "phone" varchar(255) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NULL
     );
  `)
  }

  async down() {
    this.schema.raw(`DROP TABLE IF EXISTS "${this.tableName}"`)
  }
}
