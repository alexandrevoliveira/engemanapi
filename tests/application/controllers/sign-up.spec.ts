import { Controller, SignUpController } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { Compare, Email, RequiredString } from '@/application/validation'
import { ItemInUseError } from '@/domain/entities'

describe('SignUpController', () => {
  let name: string
  let email: string
  let password: string
  let passwordConfirmation: string
  let sut: SignUpController
  let addAccount: jest.Mock

  beforeAll(() => {
    name = 'any_name'
    email = 'any_email@gmail.com'
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

  it('should extend Controller', () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ name, email, password, passwordConfirmation })

    expect(validators).toEqual([
      new RequiredString('any_name', 'name'),
      new RequiredString('any_email@gmail.com', 'email'),
      new Email('any_email@gmail.com'),
      new RequiredString('any_password', 'password'),
      new Compare('any_password', 'any_password', 'passwordConfirmation'),
      new RequiredString('any_password', 'passwordConfirmation')
    ])
  })

  it('should call AddAccount with correct input', async () => {
    await sut.handle({ name, email, password, passwordConfirmation })

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if signup fails when email is already in use', async () => {
    const error = new ItemInUseError('email')
    addAccount.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ name, email, password, passwordConfirmation })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    addAccount.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ name, email, password, passwordConfirmation })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ name, email, password, passwordConfirmation })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_token',
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@gmail.com',
        isAdmin: false
      }
    })
  })
})
