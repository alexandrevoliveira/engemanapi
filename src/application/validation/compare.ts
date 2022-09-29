import { CompareFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Compare<T = string> implements Validator {
  constructor (
    private readonly field: T,
    private readonly fieldToCompare: T,
    private readonly fieldToCompareName?: string
  ) {}

  validate (): Error | undefined {
    if (this.field instanceof Object && this.fieldToCompare instanceof Object) {
      if (Object.values(this.field)[0] !== Object.values(this.fieldToCompare)[0]) return new CompareFieldError(this.fieldToCompareName)
    } else {
      if (this.field !== this.fieldToCompare) return new CompareFieldError(this.fieldToCompareName)
    }
  }
}
