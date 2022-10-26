import { Controller, SignUpController } from '@/application/controllers'
import { Compare, Email, RequiredString } from '@/application/validation'

describe('SignUpController', () => {
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let sut: SignUpController
  let addAccount: jest.Mock

  beforeAll(() => {
    name = 'any_name'
    email = 'any_email'
    password = 'any_password'
    passwordConfirmation = 'any_password'
    addAccount = jest.fn().mockResolvedValue({
      accessToken: 'any_token',
      id: 'any_id',
      name,
      email,
      isAdmin: false
    })
  })

  beforeEach(() => {
    sut = new SignUpController(addAccount)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call AddAccount with correct input', async () => {
    await sut.perform({ name, email, password, passwordConfirmation })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
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

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.perform({ name, email, password, passwordConfirmation })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_token',
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        isAdmin: false
      }
    })
  })
})
