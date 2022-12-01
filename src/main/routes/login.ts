import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeFacebookLoginController, makeSignUpController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login/facebook', adapt(makeFacebookLoginController()))
  router.post('/signup', adapt(makeSignUpController()))
}
