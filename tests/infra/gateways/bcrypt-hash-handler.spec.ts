import { BcryptHashHandler } from '@/infra/gateways'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptHashHandler', () => {
  let value: string
  let salt: number
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let sut: BcryptHashHandler

  beforeAll(() => {
    value = 'any_value'
    salt = 12
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => 'any_hashed_value')
  })

  beforeEach(() => {
    sut = new BcryptHashHandler(salt)
  })

  it('should call hash with correct input', async () => {
    await sut.generate({ value })

    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a valid hash on hash success', async () => {
    const hashedValue = await sut.generate({ value })

    expect(hashedValue).toBe('any_hashed_value')
  })

  it('should rethrow if hash throws', async () => {
    fakeBcrypt.hash.mockImplementationOnce(() => { throw new Error('hash_error') })

    const promise = sut.generate({ value })

    await expect(promise).rejects.toThrow(new Error('hash_error'))
  })
})
