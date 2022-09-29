import { CompareFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Compare implements Validator {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (): Error | undefined {
    if (this.field !== this.fieldToCompare) return new CompareFieldError()
  }
}
