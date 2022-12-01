import { SignUpController } from '@/application/controllers'
import { makeAddAccount } from '@/main/factories/domain/usecases'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeAddAccount())
}
