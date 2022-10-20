import { Email } from '@/application/validation'
import { EmailInvalidError } from '@/application/errors'

describe('Email', () => {
  it('should return EmailInvalidError if validation fails', () => {
    const sut = new Email()

    const error = sut.validate()

    expect(error).toEqual(new EmailInvalidError())
  })
})
