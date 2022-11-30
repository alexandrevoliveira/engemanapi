import { AllowedMimeTypes, Compare, Email, MaxFileSize, Required, RequiredBuffer, RequiredString, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  it('should return RequiredString', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredString('any_value')])
  })

  it('should return RequiredBuffer', () => {
    const buffer = Buffer.from('any_buffer')

    const validators = ValidationBuilder
      .of({ value: buffer })
      .required()
      .build()

    expect(validators).toEqual([new RequiredBuffer(buffer)])
  })

  it('should return Required', () => {
    const validators = ValidationBuilder
      .of({ value: { any: 'any' } })
      .required()
      .build()

    expect(validators).toEqual([new Required({ any: 'any' })])
  })

  it('should return Required and RequiredBuffer', () => {
    const buffer = Buffer.from('any_buffer')

    const validators = ValidationBuilder
      .of({ value: { buffer } })
      .required()
      .build()

    expect(validators).toEqual([
      new Required({ buffer }),
      new RequiredBuffer(buffer)
    ])
  })

  it('should return correct image validators', () => {
    const buffer = Buffer.from('any_buffer')

    const validators = ValidationBuilder
      .of({ value: { buffer } })
      .image({ allowed: ['png'], maxSizeInMb: 6 })
      .build()

    expect(validators).toEqual([new MaxFileSize(buffer, 6)])
  })

  it('should return correct image validators', () => {
    const validators = ValidationBuilder
      .of({ value: { mimeType: 'image/png' } })
      .image({ allowed: ['png'], maxSizeInMb: 6 })
      .build()

    expect(validators).toEqual([new AllowedMimeTypes(['png'], 'image/png')])
  })

  it('should return correct image validators', () => {
    const buffer = Buffer.from('any_buffer')

    const validators = ValidationBuilder
      .of({ value: { buffer, mimeType: 'image/png' } })
      .image({ allowed: ['png'], maxSizeInMb: 6 })
      .build()

    expect(validators).toEqual([
      new AllowedMimeTypes(['png'], 'image/png'),
      new MaxFileSize(buffer, 6)
    ])
  })

  it('should return Compare', () => {
    const validators = ValidationBuilder
      .of({ value: { password: 'any_password' } })
      .compare({ valueToCompare: { passwordConfirmation: 'any_password' }, fieldToCompareName: 'passwordConfirmation' })
      .build()

    expect(validators).toEqual([new Compare<object>({ password: 'any_password' }, { passwordConfirmation: 'any_password' }, 'passwordConfirmation')])
  })
})

it('should return Email', () => {
  const validators = ValidationBuilder
    .of({ value: { email: 'any_email' } })
    .email()
    .build()

  expect(validators).toEqual([new Email('any_email')])
})

it('should return RequiredString and Email', () => {
  const validators = ValidationBuilder
    .of({ value: 'any_email' })
    .required()
    .email()
    .build()

  expect(validators).toEqual([new RequiredString('any_email'), new Email('any_email')])
})
