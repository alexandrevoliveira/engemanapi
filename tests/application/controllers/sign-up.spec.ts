import { Controller, SignUpController } from '@/application/controllers'
import { Compare, Email, RequiredString } from '@/application/validation'

describe('SignUpController', () => {
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let addAccount: jest.Mock
  let sut: SignUpController

  beforeAll(() => {
    name = 'any_name'
    email = 'any_email'
    password = 'any_password'
    passwordConfirmation = 'any_password'
    addAccount = jest.fn()
  })

  beforeEach(() => {
    sut = new SignUpController(addAccount)
  })

  it('should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call AddAccount with correct input', async () => {
    await sut.perform({ name, email, password, passwordConfirmation })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ name, email, password, passwordConfirmation })

    expect(validators).toEqual([
      new RequiredString('any_name', 'name'),
      new RequiredString('any_email', 'email'),
      new Email('any_email'),
      new RequiredString('any_password', 'password'),
      new Compare('any_password', 'any_password', 'passwordConfirmation'),
      new RequiredString('any_password', 'passwordConfirmation')
    ])
  })
})
