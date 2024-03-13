import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ApplicationException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ApplicationException extends Exception {
  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({ message: error.message })
  }
}
