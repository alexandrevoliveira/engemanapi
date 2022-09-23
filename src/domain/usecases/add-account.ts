import { HashGenerator } from '@/domain/contracts/gateways'
import { CheckUserAccountByEmail } from '@/domain/contracts/repos'

type Setup = (userAccountRepo: CheckUserAccountByEmail, hasher: HashGenerator) => AddAccount
type Input = { email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const setupAddAccount: Setup = (userAccountRepo, hasher) => async ({ email, password }) => {
  await userAccountRepo.checkByEmail({ email })
  await hasher.generate({ value: password })
}
