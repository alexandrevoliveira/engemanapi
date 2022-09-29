import { CompareFieldError } from '@/application/errors'
import { Compare } from '@/application/validation'

describe('Compare', () => {
  it('should return CompareFieldError if validation fails', () => {
    const sut = new Compare('any_value', 'any_other_value', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new CompareFieldError('any_field'))
  })

  it('should return CompareFieldError if validation fails when fields are objects with different values', () => {
    const sut = new Compare<object>({ password: 'any_value' }, { passwordConfirmation: 'any_other_value' })

    const error = sut.validate()

    expect(error).toEqual(new CompareFieldError())
  })

  it('should return undefined if validation succeeds', () => {
    const sut = new Compare('any_value', 'any_value')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if validation succeeds when fields are objects with same values', () => {
    const sut = new Compare<object>({ password: 'any_value' }, { passwordConfirmation: 'any_value' }, 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
