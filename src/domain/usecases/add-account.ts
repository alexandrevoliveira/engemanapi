import { HashGenerator, TokenGenerator } from '@/domain/contracts/gateways'
import { CheckUserAccountByEmail, SaveUserAccount } from '@/domain/contracts/repos'
import { AccessToken, ItemInUseError } from '@/domain/entities'

type Setup = (userAccountRepo: CheckUserAccountByEmail & SaveUserAccount, hasher: HashGenerator, crypto: TokenGenerator) => AddAccount
type Input = { name: string, email: string, password: string }
export type AddAccount = (input: Input) => Promise<void>

export const setupAddAccount: Setup = (userAccountRepo, hasher, crypto) => async ({ name, email, password }) => {
  const userExists = await userAccountRepo.checkByEmail({ email })
  if (!userExists) {
    const hashedPassword = await hasher.generate({ value: password })
    const userAccount = await userAccountRepo.save({ name, email, password: hashedPassword })
    await crypto.generate({ key: userAccount.id, expirationInMs: AccessToken.expirationInMs })
  } else {
    throw new ItemInUseError('email')
  }
}
