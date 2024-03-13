/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { ClientRoute } from '#routes/client'
import { DistanceRoute } from '#routes/distance'
import router from '@adonisjs/core/services/router'

ClientRoute.prefix('/v1')
DistanceRoute.prefix('/v1')

router.get('/', async ({ response }) => {
  return response.redirect('/v1')
})

router
  .get('/', async ({ response }) => {
    return response.ok({ message: 'Welcome to Facilita. Jurídico API' })
  })
  .prefix('/v1')
