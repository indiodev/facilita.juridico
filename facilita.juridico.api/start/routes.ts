/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { ClientRoute } from '#routes/client'
import { Distance } from '#services/distance'
import router from '@adonisjs/core/services/router'

ClientRoute.prefix('/v1')

router.get('/', async ({ response }) => {
  return response.redirect('/v1')
})

router
  .get('/', async ({ response }) => {
    const d = new Distance()

    d.push({ identifier: 'Cliente 1', x: 2, y: 3 })
    d.push({ identifier: 'Cliente 2', x: 5, y: 7 })
    d.push({ identifier: 'Cliente 3', x: 8, y: 1 })
    d.push({ identifier: 'Cliente 4', x: 10, y: 5 })
    d.push({ identifier: 'Cliente 5', x: 3, y: 8 })
    d.push({ identifier: 'Cliente 6', x: 6, y: 4 })
    d.push({ identifier: 'Cliente 7', x: 9, y: 9 })
    d.push({ identifier: 'Cliente 8', x: 1, y: 2 })
    d.push({ identifier: 'Cliente 9', x: 4, y: 6 })
    d.push({ identifier: 'Cliente 10', x: 7, y: 10 })

    return response.ok({ route: d.tsp() })
  })
  .prefix('/v1')
