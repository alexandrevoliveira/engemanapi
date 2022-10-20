import { Email } from '@/application/validation'
import { EmailInvalidError } from '@/application/errors'

describe('Email', () => {
  it('should return EmailInvalidError if validation fails', () => {
    const sut = new Email('alexandre-@mail.brasil.com')

    const error = sut.validate()

    expect(error).toEqual(new EmailInvalidError())
  })

  it('should return undefined if validation succeeds', () => {
    const sut = new Email('1john1.1doe1@1my-company1.com')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
