import { AllowedMimeTypes, Compare, Email, Extension, MaxFileSize, Required, RequiredBuffer, RequiredString, Validator } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: any, fieldName?: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): ValidationBuilder {
    if (this.value instanceof Buffer) {
      this.validators.push(new RequiredBuffer(this.value, this.fieldName))
    } else if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.fieldName))
    } else {
      this.validators.push(new Required(this.value, this.fieldName))
      if (this.value?.buffer !== undefined) {
        this.validators.push(new RequiredBuffer(this.value.buffer, this.fieldName))
      }
    }
    return this
  }

  image ({ allowed, maxSizeInMb }: { allowed: Extension[], maxSizeInMb: number }): ValidationBuilder {
    if (this.value.mimeType !== undefined) {
      this.validators.push(new AllowedMimeTypes(allowed, this.value.mimeType))
    }
    if (this.value.buffer !== undefined) {
      this.validators.push(new MaxFileSize(this.value.buffer, maxSizeInMb))
    }
    return this
  }

  compare ({ valueToCompare, fieldToCompareName }: { valueToCompare: any, fieldToCompareName?: string }): ValidationBuilder {
    this.validators.push(new Compare(this.value, valueToCompare, fieldToCompareName))
    return this
  }

  email (): ValidationBuilder {
    if (typeof this.value === 'string') {
      this.validators.push(new Email(this.value))
    }
    if (typeof this.value.email === 'string') {
      this.validators.push(new Email(this.value.email))
    }
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
