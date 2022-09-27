import { BcryptAdapter } from '@/infra/gateways'

import bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('BcryptAdapter', () => {
  let salt: number
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let sut: BcryptAdapter

  beforeAll(() => {
    salt = 12
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
  })

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  it('should call hash with correct input', async () => {
    await sut.generate({ value: 'any_value' })

    expect(fakeBcrypt.hash).toHaveBeenCalledWith('any_value', salt)
  })
})
