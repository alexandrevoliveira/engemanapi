import { CompareFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Compare<T = string> implements Validator {
  constructor (
    private readonly field: T,
    private readonly fieldToCompare: T,
    private readonly fieldToCompareName?: string
  ) {}

  validate (): Error | undefined {
    if (this.field !== this.fieldToCompare) return new CompareFieldError(this.fieldToCompareName)
  }
}
