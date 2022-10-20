import { EmailInvalidError } from '@/application/errors'

export class Email {
  validate (): Error {
    return new EmailInvalidError()
  }
}
