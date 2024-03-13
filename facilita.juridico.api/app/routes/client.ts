const ClientController = () => import('#controllers/client')
import router from '@adonisjs/core/services/router'

export const ClientRoute = router
  .group(() => {
    router.post('/', [ClientController, 'create'])
    router.get('/:id', [ClientController, 'show'])
    router.get('/', [ClientController, 'list'])
  })
  .prefix('/client')
