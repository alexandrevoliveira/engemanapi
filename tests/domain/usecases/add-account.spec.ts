import { HashGenerator } from '@/domain/contracts/gateways'
import { CheckUserAccountByEmail, SaveUserAccount } from '@/domain/contracts/repos'
import { ItemInUseError } from '@/domain/entities'
import { AddAccount, setupAddAccount } from '@/domain/usecases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddAccount', () => {
  let name: string
  let email: string
  let password: string
  let userAccountRepo: MockProxy<CheckUserAccountByEmail & SaveUserAccount>
  let hasher: MockProxy<HashGenerator>
  let sut: AddAccount

  beforeAll(() => {
    email = 'any_email'
    name = 'any_name'
    password = 'any_password'
    userAccountRepo = mock()
    userAccountRepo.checkByEmail.mockResolvedValue(false)
    hasher = mock()
    hasher.generate.mockResolvedValue('hashed_password')
  })

  beforeEach(() => {
    sut = setupAddAccount(userAccountRepo, hasher)
  })

  it('should call CheckUserAccountByEmail with correct input', async () => {
    await sut({ name, email, password })

    expect(userAccountRepo.checkByEmail).toHaveBeenCalledWith({ email })
    expect(userAccountRepo.checkByEmail).toHaveBeenCalledTimes(1)
  })

  it('should call HashGenerator with correct input', async () => {
    await sut({ name, email, password })

    expect(hasher.generate).toHaveBeenCalledWith({ value: password })
    expect(hasher.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if HashGenerator throws', async () => {
    hasher.generate.mockRejectedValueOnce(new Error('hash_error'))

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new Error('hash_error'))
  })

  it('should throw ItemInUseError when CheckUserAccountByEmail returns true', async () => {
    userAccountRepo.checkByEmail.mockResolvedValueOnce(true)

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new ItemInUseError('email'))
  })

  it('should call SaveUserAccount with correct input', async () => {
    await sut({ name, email, password })

    expect(userAccountRepo.save).toHaveBeenCalledWith({ name, email, password: 'hashed_password' })
    expect(userAccountRepo.save).toHaveBeenCalledTimes(1)
  })
})
