import { CompareFieldError } from '@/application/errors'
import { Compare } from '@/application/validation'

describe('Compare', () => {
  it('should return CompareFieldError if validation fails', () => {
    const sut = new Compare('any_value', 'any_other_value')

    const error = sut.validate()

    expect(error).toEqual(new CompareFieldError())
  })
})
