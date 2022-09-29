import { Controller, SignUpController } from '@/application/controllers'

describe('SignUpController', () => {
  let name: string
  let email: string
  let password: string
  let addAccount: jest.Mock
  let sut: SignUpController

  beforeAll(() => {
    name = 'any_name'
    email = 'any_email'
    password = 'any_password'
    addAccount = jest.fn()
  })

  beforeEach(() => {
    sut = new SignUpController(addAccount)
  })

  it('should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call AddAccount with correct input', async () => {
    await sut.perform({ name, email, password })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
  })
})
