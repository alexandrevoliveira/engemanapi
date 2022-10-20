export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined
      ? 'Field required'
      : `The field ${fieldName} is required`
    super(message)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported file. Allowed extensions: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (maxSizeInMb: number) {
    super(`File upload limit is ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}

export class CompareFieldError extends Error {
  constructor (fieldToCompareName?: string) {
    const message = fieldToCompareName === undefined
      ? 'Values passed are not the same. Try again'
      : `Invalid ${fieldToCompareName}. Try again`
    super(message)
    this.name = 'CompareFieldError'
  }
}

export class EmailInvalidError extends Error {
  constructor () {
    super('The received email is invalid. Try again')
    this.name = 'EmailInvalidError'
  }
}
