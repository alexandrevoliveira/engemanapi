import { CheckUserAccountByEmail } from '@/domain/contracts/repos'
import { AddAccount, setupAddAccount } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let email: string
  let userAccountRepo: MockProxy<CheckUserAccountByEmail>
  let sut: AddAccount

  beforeAll(() => {
    email = 'any_email'
    userAccountRepo = mock()
  })

  beforeEach(() => {
    sut = setupAddAccount(userAccountRepo)
  })

  it('Should call CheckUserAccountByEmail with correct input', async () => {
    await sut({ email })

    expect(userAccountRepo.checkByEmail).toHaveBeenCalledWith({ email })
    expect(userAccountRepo.checkByEmail).toHaveBeenCalledTimes(1)
  })
})
