import { AddAccount, setupAddAccount } from '@/domain/usecases'
import { makeBcryptHashHandler, makeJwtTokenHandler } from '@/main/factories/infra/gateways'
import { makePgUserAccountRepo } from '@/main/factories/infra/repos/postgres'

export const makeAddAccount = (): AddAccount => {
  return setupAddAccount(makePgUserAccountRepo(), makeBcryptHashHandler(), makeJwtTokenHandler())
}
