import ClientRepository from '#repositories/dababase/client'
import { Distance, Point } from '#services/distance'
import { inject } from '@adonisjs/core'

@inject()
export default class DistanceUseCase {
  constructor(
    private service: Distance,
    private repository: ClientRepository
  ) {}

  async show(): Promise<Point[]> {
    const clients = await this.repository.list()

    for (const { name, location } of clients) {
      this.service.push({
        identifier: `${name.toUpperCase()} (${location?.x}, ${location?.y})`,
        x: location?.x,
        y: location?.y,
      })
    }

    return this.service.tsp()
  }
}
