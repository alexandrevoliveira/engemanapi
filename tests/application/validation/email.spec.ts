import { Email } from '@/application/validation'
import { InvalidEmailError } from '@/application/errors'

describe('Email', () => {
  it('should return InvalidEmailError if validation fails', () => {
    const sut = new Email('alexandre-@mail.brasil.com')

    const error = sut.validate()

    expect(error).toEqual(new InvalidEmailError())
  })

  it('should return undefined if validation succeeds', () => {
    const sut = new Email('1john1.1doe1@1my-company1.com')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if validation succeeds when email is empty', () => {
    const sut = new Email('')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
