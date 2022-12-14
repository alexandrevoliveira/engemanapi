import { InvalidEmailError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Email implements Validator {
  constructor (private readonly email: string) {}

  validate (): Error | undefined {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    // RegExp
    // ^ ==> should start with something
    // $ ==> should end with it
    // n+ ==> 1 or more occurrences of n
    // () ==> group idea
    // [] ==> find any character between the brackets
    // n? ==> optional usage
    // n* ==> 0 or more occurrences of n
    // {2,3} ==> 2 or 3 items
    return (this.email !== '' && !emailRegex.test(this.email)) ? new InvalidEmailError() : undefined
  }
}
