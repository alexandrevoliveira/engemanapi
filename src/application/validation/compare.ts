import { CompareFieldError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class Compare<T = string> implements Validator {
  constructor (
    private readonly value: T,
    private readonly valueToCompare: T,
    private readonly fieldToCompareName?: string
  ) {}

  validate (): Error | undefined {
    if (this.value instanceof Object && this.valueToCompare instanceof Object) {
      if (Object.values(this.value)[0] !== Object.values(this.valueToCompare)[0]) return new CompareFieldError(this.fieldToCompareName)
    } else {
      if (this.value !== this.valueToCompare) return new CompareFieldError(this.fieldToCompareName)
    }
  }
}
