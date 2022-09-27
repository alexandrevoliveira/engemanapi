import { BcryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let value: string
  let salt: number
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let sut: BcryptAdapter

  beforeAll(() => {
    value = 'any_value'
    salt = 12
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
    fakeBcrypt.hash.mockImplementation(() => 'any_hashed_value')
  })

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  it('should call hash with correct input', async () => {
    await sut.generate({ value })

    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a valid hash on hash success', async () => {
    const hashedValue = await sut.generate({ value })

    expect(hashedValue).toBe('any_hashed_value')
  })
})
