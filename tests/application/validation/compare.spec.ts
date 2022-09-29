import { CompareFieldError } from '@/application/errors'
import { Compare } from '@/application/validation'

describe('Compare', () => {
  it('should return CompareFieldError if validation fails', () => {
    const sut = new Compare('any_value', 'any_other_value', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new CompareFieldError('any_field'))
  })

  it('should return undefined if validation succeeds', () => {
    const sut = new Compare('any_value', 'any_value')

    const validation = sut.validate()

    expect(validation).toBeUndefined()
  })
})
