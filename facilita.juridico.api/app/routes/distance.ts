const DistanceController = () => import('#controllers/distance')
import router from '@adonisjs/core/services/router'

export const DistanceRoute = router
  .group(() => {
    router.get('/', [DistanceController, 'show'])
  })
  .prefix('/distance')
