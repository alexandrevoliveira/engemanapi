import { CheckUserAccountByEmail } from '@/domain/contracts/repos'

type Setup = (userAccountRepo: CheckUserAccountByEmail) => AddAccount
type Input = { email: string }
export type AddAccount = (input: Input) => Promise<void>

export const setupAddAccount: Setup = (userAccountRepo) => async ({ email }) => {
  await userAccountRepo.checkByEmail({ email })
}
