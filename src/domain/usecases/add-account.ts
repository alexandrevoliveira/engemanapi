import { HashGenerator } from '@/domain/contracts/gateways'
import { CheckUserAccountByEmail } from '@/domain/contracts/repos'
import { ItemInUseError } from '@/domain/entities'

type Setup = (userAccountRepo: CheckUserAccountByEmail, hasher: HashGenerator) => AddAccount
type Input = { email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const setupAddAccount: Setup = (userAccountRepo, hasher) => async ({ email, password }) => {
  const userExists = await userAccountRepo.checkByEmail({ email })
  if (!userExists) {
    await hasher.generate({ value: password })
  } else {
    throw new ItemInUseError('email')
  }
}
