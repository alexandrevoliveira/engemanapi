import { HashGenerator, TokenGenerator } from '@/domain/contracts/gateways'
import { AddUserAccount, CheckUserAccountByEmail } from '@/domain/contracts/repos'
import { AccessToken, ItemInUseError } from '@/domain/entities'

type Setup = (userAccountRepo: CheckUserAccountByEmail & AddUserAccount, hasher: HashGenerator, crypto: TokenGenerator) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = { accessToken: string, id: string, name: string, email: string, isAdmin: boolean }
export type AddAccount = (input: Input) => Promise<Output>

export const setupAddAccount: Setup = (userAccountRepo, hasher, crypto) => async ({ name, email, password }) => {
  const userExists = await userAccountRepo.checkByEmail({ email })
  if (!userExists) {
    const hashedPassword = await hasher.generate({ value: password })
    const userAccount = await userAccountRepo.add({ name, email, password: hashedPassword })
    const accessToken = await crypto.generate({ key: userAccount.id, expirationInMs: AccessToken.expirationInMs })
    return { accessToken, ...userAccount }
  } else {
    throw new ItemInUseError('email')
  }
}
