import { HashGenerator } from '@/domain/contracts/gateways'
import { CheckUserAccountByEmail } from '@/domain/contracts/repos'
import { ItemInUseError } from '@/domain/entities'
import { AddAccount, setupAddAccount } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let email: string
  let password: string
  let userAccountRepo: MockProxy<CheckUserAccountByEmail>
  let hasher: MockProxy<HashGenerator>
  let sut: AddAccount

  beforeAll(() => {
    email = 'any_email'
    password = 'any_password'
    userAccountRepo = mock()
    userAccountRepo.checkByEmail.mockResolvedValue(false)
    hasher = mock()
  })

  beforeEach(() => {
    sut = setupAddAccount(userAccountRepo, hasher)
  })

  it('should call CheckUserAccountByEmail with correct input', async () => {
    await sut({ email, password })

    expect(userAccountRepo.checkByEmail).toHaveBeenCalledWith({ email })
    expect(userAccountRepo.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('should call HashGenerator with correct input', async () => {
    await sut({ email, password })

    expect(hasher.generate).toHaveBeenCalledWith({ value: password })
    expect(hasher.generate).toHaveBeenCalledTimes(1)
  })

  it('should throw ItemInUseError when CheckUserAccountByEmail returns true', async () => {
    userAccountRepo.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(new ItemInUseError('email'))
  })
})
