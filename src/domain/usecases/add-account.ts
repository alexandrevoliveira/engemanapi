import { HashGenerator } from '@/domain/contracts/gateways'
import { CheckUserAccountByEmail, SaveUserAccount } from '@/domain/contracts/repos'
import { ItemInUseError } from '@/domain/entities'

type Setup = (userAccountRepo: CheckUserAccountByEmail & SaveUserAccount, hasher: HashGenerator) => AddAccount
type Input = { name: string, email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const setupAddAccount: Setup = (userAccountRepo, hasher) => async ({ name, email, password }) => {
  const userExists = await userAccountRepo.checkByEmail({ email })
  if (!userExists) {
    const hashedPassword = await hasher.generate({ value: password })
    await userAccountRepo.save({ name, email, password: hashedPassword })
  } else {
    throw new ItemInUseError('email')
  }
}
