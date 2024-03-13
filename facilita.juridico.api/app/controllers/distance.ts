import DistanceUseCase from '#usecases/distance'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DistanceController {
  constructor(private usecase: DistanceUseCase) {}

  async show({ response }: HttpContext): Promise<void> {
    const route = await this.usecase.show()
    return response.ok(route)
  }
}
